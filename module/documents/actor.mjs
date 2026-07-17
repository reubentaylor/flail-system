import { rollSave } from "../dice/save.mjs";
import { rollToHit } from "../dice/to-hit.mjs";
import { rollInstrumentPlay } from "../dice/instrument-play.mjs";

/**
 * The FlailActor extends the base Actor with system-aware methods —
 * rolling saves, applying damage, and rolling attacks with a weapon
 * Item. Schema details live in the data models (character / npc).
 */
export class FlailActor extends Actor {

  /* -------------------------------------------- */
  /*  Rolls                                       */
  /* -------------------------------------------- */

  /**
   * Roll a save against the named attribute.
   * Wraps the save module so callers don't have to import it directly.
   * @param {string} attribute
   * @param {object} [options]
   * @returns {Promise<ChatMessage|null>}
   */
  async rollSave(attribute, options = {}) {
    // Petrified — no actions, no saves.
    if (this.type === "character" && this.system.incapacitated) {
      ui.notifications?.warn(
        game.i18n.localize("FLAIL.Notify.Incapacitated")
      );
      return null;
    }

    // Exhausted disadvantage applies only to physical attribute saves
    // (STR and DEX) — INT, CHA, LUCK are mental / social / fortune.
    let netAdvantage = options.advantage ?? 0;
    if (this.type === "character" && (attribute === "str" || attribute === "dex")) {
      netAdvantage -= (this.system.physicalDisadvantage ?? 0);
    }

    // Falcon's Grace (Druid Primal Gift, Bird) — DEX saves are always
    // rolled with advantage. Floor the modifier at +1 rather than
    // simply adding, so an already-advantaged roll doesn't stack up
    // beyond intent, and a Ctrl-clicked disadvantage attempt is
    // upgraded to a normal (still-advantaged) roll.
    if (this.type === "character"
        && attribute === "dex"
        && this.system.dexSaveAdvantage) {
      netAdvantage = Math.max(1, netAdvantage);
    }

    return rollSave({ actor: this, attribute, ...options, advantage: netAdvantage });
  }

  /**
   * Roll a To Hit with a weapon Item belonging to this actor.
   * Applies weapon specialty (-1 TH if not in class specialty list),
   * collects modifiers, then defers to the To Hit roller.
   *
   * @param {Item} weapon       Owned weapon Item.
   * @param {object} [options]
   * @returns {Promise<ChatMessage|null>}
   */
  async rollAttack(weapon, options = {}) {
    if (!weapon || weapon.type !== "weapon") {
      ui.notifications?.warn("FLAIL: invalid weapon for attack roll.");
      return null;
    }

    // Petrified — cannot take actions. Block the roll entirely.
    if (this.type === "character" && this.system.incapacitated) {
      ui.notifications?.warn(
        game.i18n.localize("FLAIL.Notify.Incapacitated")
      );
      return null;
    }

    // Broken construct — inert until rebuilt.
    if (this.type === "construct" && this.system.broken) {
      ui.notifications?.warn(
        game.i18n.localize("FLAIL.Notify.ConstructBroken")
      );
      return null;
    }

    // Two-handed weapon check. Firing a two-handed weapon (long bow,
    // great sword, short bow, crossbow, etc.) requires both hands
    // free — any OTHER item occupying the hands zone (a shield, a
    // dagger, a second weapon) blocks the attack. The weapon being
    // fired is exempted from the check by ID. Multi-slot two-handed
    // weapons already fill both hand slots via their own span so
    // the check trivially passes.
    if (this.type === "character" && weapon.system.twoHanded) {
      const otherHandsItems = this.items.filter(i =>
        i.system?.location === "hands"
        && i.id !== weapon.id
      );
      if (otherHandsItems.length > 0) {
        const names = otherHandsItems.map(i => i.name).join(", ");
        ui.notifications?.warn(
          game.i18n.format("FLAIL.Notify.TwoHandedNeedsFreeHand", {
            weapon: weapon.name,
            blocker: names
          })
        );
        return null;
      }
    }

    let pool = weapon.system.th;

    // Class weapon specialty: -1 TH for non-specialty weapons (characters only).
    if (this.type === "character") {
      const classData = this.system.classData;
      const speciality = classData?.weaponSpecialty ?? [];
      // Empty specialty list means "all weapons OK" (Warrior).
      if (speciality.length > 0) {
        // Match against both the tags array (preferred — multi-valued so a
        // weapon can be both "longBow" and "bow") and the legacy single
        // `category` field (kept for back-compat / GM-authored items).
        const tags = weapon.system.tags ?? [];
        const cat = weapon.system.category;
        const hasMatch = tags.some(t => speciality.includes(t))
                      || (cat && speciality.includes(cat));
        if (!hasMatch) {
          pool = Math.max(1, pool - 1);
        }
      }
      // Apply Injured -1 TH penalty stacks (one per Injured-TH card).
      const thPenalty = this.system.toHitPenalty ?? 0;
      if (thPenalty > 0) pool = Math.max(1, pool - thPenalty);
      // Apply transient TH bonuses (e.g. Witness Me! +1 die from a Bard ally).
      const thBonus = this.system.toHitBonus ?? 0;
      if (thBonus > 0) pool += thBonus;
    }

    // Exhausted stacks add disadvantage to To Hit (physical task).
    // Stacks fold into the existing advantage parameter — the dice
    // helper caps the net at three dice in either direction.
    const exhaustDisadv = (this.type === "character"
      ? (this.system.physicalDisadvantage ?? 0)
      : 0);
    let netAdvantage = (options.advantage ?? 0) - exhaustDisadv;

    // Slimy Skin (Druid Primal Gift, Amphibian) — attackers targeting
    // a Druid with this gift take -1 to their To Hit pool. Checked
    // against the current user's declared Foundry targets; if multiple
    // targets are declared, one -1 is applied (matching the rulebook
    // wording of a single defender's effect).
    let slimySkinTarget = null;
    const targets = game.user?.targets;
    if (targets && targets.size > 0) {
      for (const token of targets) {
        const targetActor = token.actor;
        if (targetActor?.type === "character"
            && targetActor.system.class === "druid"
            && targetActor.system.primalGifts?.amphibian?.slimySkin) {
          slimySkinTarget = { name: token.name ?? targetActor.name };
          break;
        }
      }
    }
    if (slimySkinTarget) {
      netAdvantage -= 1;
    }

    // Damage — normally the weapon's own DMG. For constructs, the
    // rulebook says damage is the higher of the weapon's DMG or the
    // construct's own DMG score. Sockets naturally with the sheet
    // note "DMG is either the weapon's or the construct's DMG score
    // — whichever is higher."
    let damage = weapon.system.damage;
    if (this.type === "construct") {
      damage = Math.max(damage ?? 0, this.system.damage ?? 0);
    }

    // Precision Mark (Warrior — Archer Master Basic). If any current
    // target actor carries the `precisionMark` flag, add +2 dice to
    // the pool for this attack, then clear the flag after the roll
    // fires. Applies to attacks from ANY actor — the mark is a
    // property of the target, not the attacker.
    let precisionMarkedTargets = [];
    const targetsForMark = game.user?.targets;
    if (targetsForMark && targetsForMark.size > 0) {
      for (const token of targetsForMark) {
        const t = token.actor;
        if (t?.getFlag?.("flail", "precisionMark")) {
          precisionMarkedTargets.push(t);
        }
      }
    }
    if (precisionMarkedTargets.length > 0) {
      netAdvantage += 2;
    }

    const message = await rollToHit({
      actor: this,
      weaponId: weapon.id,
      dicePool: pool,
      damage,
      label: weapon.name,
      flavor: options.flavor,
      advantage: netAdvantage,
      slimySkinTarget
    });

    // Consume any "next attack" buff effects regardless of hit/miss — the
    // attack happened, the buff was used. Currently only Witness Me uses
    // this consume-on-fire flag; others may follow.
    if (this.type === "character") {
      const consumable = this.effects.filter(e =>
        e.getFlag("flail", "consumeOnAttack")
      );
      if (consumable.length) {
        await this.deleteEmbeddedDocuments(
          "ActiveEffect",
          consumable.map(e => e.id)
        );
      }
    }

    // Precision Mark consumption — clear the flag on every marked
    // target we picked up above. The +2 dice bonus was applied once;
    // the mark is now spent.
    for (const t of precisionMarkedTargets) {
      try {
        await t.unsetFlag("flail", "precisionMark");
      } catch (err) {
        console.error("FLAIL: failed to clear Precision Mark on", t.name, err);
      }
    }

    return message;
  }

  /**
   * Construct inherent attack — every construct has a built-in attack
   * using its own TH as the dice pool and its own DMG per die. No
   * weapon reference (so no usage marking, no weapon-specialty logic,
   * no per-weapon flavour). Used by the "Attack" button in the
   * Attacking panel on the construct sheet.
   *
   * @param {object} [options]
   * @param {number} [options.advantage=0]  Signed advantage modifier.
   * @param {string} [options.flavor]       Chat flavour text override.
   * @returns {Promise<ChatMessage|null>}
   */
  async rollInherentAttack(options = {}) {
    if (this.type !== "construct") {
      ui.notifications?.warn("Only constructs have an inherent attack.");
      return null;
    }
    if (this.system.broken) {
      ui.notifications?.warn(
        game.i18n.localize("FLAIL.Notify.ConstructBroken")
      );
      return null;
    }
    const pool = this.system.th ?? 0;
    const damage = this.system.damage ?? 0;
    if (pool <= 0) {
      ui.notifications?.warn(
        game.i18n.localize("FLAIL.Notify.ConstructNoInherentAttack")
      );
      return null;
    }
    return rollToHit({
      actor: this,
      dicePool: pool,
      damage,
      label: game.i18n.localize("FLAIL.Construct.InherentAttack"),
      flavor: options.flavor,
      advantage: options.advantage ?? 0
    });
  }

  /**
   * Warrior — Iron Fist (Martial Artist Basic).
   *
   * Bare-handed strike granted by the Martial Artist Basic talent.
   *
   *   Base:                       TH 5, DMG 2
   *   Any Martial Artist Expert:  DMG becomes 3
   *   Any Martial Artist Master:  TH becomes 6
   *
   * These are flat overrides, not increments — taking two Experts
   * still leaves DMG at 3; taking a Master still leaves TH at 6
   * regardless of how many Masters have been picked.
   *
   * @param {object} [options]
   * @param {number} [options.advantage=0]  Signed advantage modifier.
   * @param {string} [options.flavor]       Chat flavour text override.
   * @returns {Promise<ChatMessage|null>}
   */
  async rollIronFistAttack(options = {}) {
    if (this.type !== "character" || this.system.class !== "warrior") {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.IronFistWarriorOnly"));
      return null;
    }
    const stats = this.getIronFistStats();
    if (!stats) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.IronFistRequiresTalent"));
      return null;
    }
    if (this.system.incapacitated) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.Incapacitated"));
      return null;
    }

    return rollToHit({
      actor: this,
      dicePool: stats.th,
      damage: stats.dmg,
      label: game.i18n.localize("FLAIL.Warrior.IronFistLabel"),
      flavor: options.flavor ?? game.i18n.localize("FLAIL.Warrior.IronFistFlavor"),
      advantage: options.advantage ?? 0
    });
  }

  /**
   * Compute current Iron Fist TH / DMG based on which Martial Artist
   * talents are picked. Returns null when Iron Fist itself hasn't
   * been picked (its Basic — `martialArtist.basic`).
   *
   * @returns {{ th: number, dmg: number, hasExpertBonus: boolean, hasMasterBonus: boolean } | null}
   */
  getIronFistStats() {
    if (this.type !== "character" || this.system.class !== "warrior") return null;
    const talents = this.system.combatTalents ?? [];
    if (!talents.includes("martialArtist.basic")) return null;
    const hasExpert = talents.some(k => k === "martialArtist.exp1" || k === "martialArtist.exp2");
    const hasMaster = talents.some(k => k?.startsWith("martialArtist.mas"));
    return {
      th:  hasMaster ? 6 : 5,
      dmg: hasExpert ? 3 : 2,
      hasExpertBonus: hasExpert,
      hasMasterBonus: hasMaster
    };
  }

  /**
   * Warrior — Extraordinary Feat.
   *
   * Player narrates a consequence at the table (no in-sheet text
   * input — kept as a spoken declaration by design). The system then
   * rolls the attack and a save, using STR for melee weapons and DEX
   * for missile weapons based on `weapon.system.weaponType`. Outcomes:
   *
   *   - Both attack succeeds AND save succeeds → hit + feat works;
   *     apply damage from the normal attack card.
   *   - Either fails → attack fails entirely; damage does NOT apply
   *     even if the attack roll would have hit.
   *   - Both fail → standard attack fumble treatment applies
   *     (already fired by rollAttack), AND the GM narrates an
   *     additional consequence tied to the failed feat.
   *
   * Implementation: fires rollAttack + rollSave as separate chat
   * cards to preserve their existing side effects (Cutthroat recoup,
   * Witness Me damage, Mailed Fist, save-crit recoups, etc.), then
   * posts a verdict card that reads outcomes from both messages'
   * flags and tells the player whether to apply the attack's damage.
   *
   * @param {Item} weapon  Weapon Item to swing.
   * @param {object} [options]
   * @param {number} [options.attackAdvantage=0]  Signed To-Hit modifier
   *   (net advantage). Same semantics as rollAttack's `advantage`.
   * @param {number} [options.saveAdvantage=0]    Signed advantage on
   *   the STR/DEX save (GMs may grant this in fiction).
   * @returns {Promise<ChatMessage|null>}
   */
  async rollExtraordinaryFeat(weapon, options = {}) {
    if (this.type !== "character") {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.FeatWarriorOnly"));
      return null;
    }
    if (this.system.class !== "warrior") {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.FeatWarriorOnly"));
      return null;
    }
    if (!weapon || weapon.type !== "weapon") {
      ui.notifications?.warn("FLAIL: invalid weapon for Extraordinary Feat.");
      return null;
    }
    if (this.system.incapacitated) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.Incapacitated"));
      return null;
    }

    // Auto-detect save attribute from weapon type. `weaponType` is
    // schema-constrained to "melee" | "missile", so this is safe.
    const isRanged = weapon.system.weaponType === "missile";
    const saveAttr = isRanged ? "dex" : "str";

    // Fire the attack — preserves all normal side effects (usage,
    // Cutthroat recoup on Death Blow, Witness Me, Celestial Aid,
    // Mailed Fist, weapon specialty, etc.).
    const attackMsg = await this.rollAttack(weapon, {
      advantage: options.attackAdvantage ?? 0,
      flavor: game.i18n.localize("FLAIL.Warrior.FeatAttackFlavor")
    });
    if (!attackMsg) return null;

    const attackTier = attackMsg.flags?.flail?.attackRoll?.analysis?.tier ?? "fail";
    const attackSuccess = ["minor", "major", "deathBlow"].includes(attackTier);
    const attackFumbleTier = attackTier === "fumble";

    // Fire the save — preserves normal side effects (Cutthroat crit
    // recoup, Falcon's Grace advantage on DEX, exhausted disadv, etc.).
    const attrCapitalised = saveAttr.charAt(0).toUpperCase() + saveAttr.slice(1);
    const saveAttrLabel = game.i18n.localize(`FLAIL.Attribute.${attrCapitalised}.abbr`);
    const saveMsg = await this.rollSave(saveAttr, {
      advantage: options.saveAdvantage ?? 0,
      flavor: game.i18n.format("FLAIL.Warrior.FeatSaveFlavor", { attr: saveAttrLabel })
    });
    const saveOutcome = saveMsg?.flags?.flail?.saveRoll?.outcome ?? "fail";
    const saveSuccess = ["crit", "success"].includes(saveOutcome);

    // Compute verdict — the three-way outcome from the rulebook.
    let verdict;
    if (attackSuccess && saveSuccess) verdict = "success";
    else if (!attackSuccess && !saveSuccess) verdict = "fumble";
    else verdict = "fail";

    // Localise outcome labels for display in the verdict card.
    const attackTierLabel = game.i18n.localize(`FLAIL.Warrior.FeatAttackTier.${attackTier}`);
    const saveOutcomeLabel = game.i18n.localize(`FLAIL.Warrior.FeatSaveOutcome.${saveOutcome}`);

    // Damage note — appears in the verdict body under the banner.
    // For fumble, we also surface the STANDARD attack fumble
    // consequence (`FLAIL.Hit.FumbleDesc` — "Hit an ally for d8 OR
    // mark usage on a carried item"). That prompt only shows on
    // the attack card when the attack roll itself was a fumble tier
    // (2+ sixes). But under Extraordinary Feat rules, a feat fumble
    // fires whenever both rolls fail — including when the attack
    // was a plain miss. So we re-surface it here to guarantee the
    // player sees the consequence regardless of underlying tiers.
    let damageGuidance = "";
    let fumbleConsequence = "";
    if (verdict === "success") {
      damageGuidance = game.i18n.localize("FLAIL.Warrior.FeatDamageApply");
    } else if (verdict === "fail") {
      damageGuidance = game.i18n.localize("FLAIL.Warrior.FeatDamageNoApply");
    } else if (verdict === "fumble") {
      damageGuidance = game.i18n.localize("FLAIL.Warrior.FeatFumbleGuidance");
      fumbleConsequence = game.i18n.localize("FLAIL.Hit.FumbleDesc");
    }

    const bannerLabel = game.i18n.localize(`FLAIL.Warrior.FeatVerdict.${verdict}`);

    const fumbleBanner = fumbleConsequence ? `
          <div class="feat-fumble-consequence">
            <i class="fas fa-triangle-exclamation"></i>
            <span>${fumbleConsequence}</span>
          </div>` : "";

    const content = `
      <div class="flail-chat-card feat-verdict-card feat-verdict-${verdict}">
        <header class="flail-chat-header">
          <i class="fas fa-star"></i>
          <span>${game.i18n.format("FLAIL.Warrior.FeatCardTitle", { name: this.name })}</span>
        </header>
        <div class="flail-chat-body">
          <p class="feat-weapon">
            <img src="${weapon.img}" alt="" /> <strong>${weapon.name}</strong>
            <span class="feat-attr">— ${saveAttrLabel} ${game.i18n.localize("FLAIL.Field.Saves")}</span>
          </p>
          <div class="feat-rolls">
            <div class="feat-roll feat-roll-${attackSuccess ? "ok" : "no"}">
              <span class="feat-roll-label">${game.i18n.localize("FLAIL.Warrior.FeatRollAttack")}:</span>
              <span class="feat-roll-value">${attackTierLabel}</span>
            </div>
            <div class="feat-roll feat-roll-${saveSuccess ? "ok" : "no"}">
              <span class="feat-roll-label">${saveAttrLabel} ${game.i18n.localize("FLAIL.Warrior.FeatRollSave")}:</span>
              <span class="feat-roll-value">${saveOutcomeLabel}</span>
            </div>
          </div>
          <div class="feat-verdict-banner feat-verdict-banner-${verdict}">
            ${bannerLabel}
          </div>${fumbleBanner}
          <p class="feat-damage-note">${damageGuidance}</p>
        </div>
      </div>
    `;

    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content
    });
  }

  /**
   * Play an instrument: CHA save, then a table-lookup roll branching off
   * the save outcome. Defers to the dedicated dice module.
   * @param {Item} instrument   Owned instrument Item.
   * @param {object} [options]
   * @returns {Promise<ChatMessage|null>}
   */
  async rollInstrument(instrument, options = {}) {
    return rollInstrumentPlay({ actor: this, instrument, ...options });
  }

  /* -------------------------------------------- */
  /*  Damage / Healing                            */
  /* -------------------------------------------- */

  /**
   * Apply damage, accounting for Defence (flat reduction).
   *
   * @param {number} amount
   * @param {object} [options]
   * @param {boolean} [options.ignoreDefence] If true, Defence is bypassed.
   * @returns {Promise<this>}
   */
  async applyDamage(amount, { ignoreDefence = false } = {}) {
    if (!Number.isFinite(amount) || amount <= 0) return this;
    const defence = ignoreDefence ? 0 : (this.system.defence ?? 0);
    const final = Math.max(0, amount - defence);
    const newHp = Math.max(0, (this.system.hp.value ?? 0) - final);
    await this.update({ "system.hp.value": newHp });

    // Hit of 6+ damage triggers an Injured condition — but we leave creating
    // the condition Item to the GM to decide on slot placement, since that's
    // a player decision in FLAIL. Just notify.
    if (final >= 6 && this.type === "character") {
      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `<p><strong>${this.name}</strong> took ${final} damage in one hit — gain an <em>Injured</em> condition.</p>`
      });
    }

    return this;
  }

  /**
   * Heal HP up to max.
   * @param {number} amount
   */
  async heal(amount) {
    if (!Number.isFinite(amount) || amount <= 0) return this;
    const newHp = Math.min(this.system.hp.max, (this.system.hp.value ?? 0) + amount);
    await this.update({ "system.hp.value": newHp });
    return this;
  }

  /* -------------------------------------------- */
  /*  Conditions                                  */
  /* -------------------------------------------- */

  /**
   * Add a condition to the character (creates a condition Item, occupying
   * a slot). The caller specifies which zone & slotIndex to place it in.
   * If no slots are free, the operation throws.
   *
   * @param {string} conditionType   Key from FLAIL.conditions.
   * @param {object} [options]
   * @param {string} [options.zone]
   * @param {number} [options.slotIndex]
   * @returns {Promise<Item>}
   */
  async addCondition(conditionType, { zone = "satchel", slotIndex = 0 } = {}) {
    const data = {
      name: game.i18n.localize(`FLAIL.Condition.${conditionType.charAt(0).toUpperCase()}${conditionType.slice(1)}`) || conditionType,
      type: "condition",
      system: {
        conditionType,
        location: zone,
        slotIndex,
        slotsRequired: 1
      }
    };
    return this.createEmbeddedDocuments("Item", [data]).then(docs => docs[0]);
  }

  /* -------------------------------------------- */
  /*  Inventory queries                           */
  /* -------------------------------------------- */

  /**
   * @param {string} zone
   * @returns {Item[]}
   */
  itemsInZone(zone) {
    return this.items.filter(i =>
      ["weapon", "armour", "gear", "instrument", "condition"].includes(i.type)
      && i.system.location === zone
    );
  }
}
