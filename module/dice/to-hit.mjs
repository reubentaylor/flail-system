import { analyzePool } from "./poker.mjs";
import { FLAIL } from "../helpers/config.mjs";

/**
 * Execute a FLAIL "To Hit" roll.
 *
 * Mechanically: roll N d6 (a regular Foundry `Roll`, so DSN works), pull the
 * raw dice values, hand them to the poker analyzer, and post a custom chat
 * card showing the hit tier, every combination, and clickable damage / effect
 * triggers.
 *
 * @param {object} options
 * @param {number} options.dicePool                 Number of d6 to roll (after all modifiers).
 * @param {number} options.damage                   Weapon DMG (flat).
 * @param {string} [options.label]                  Title to show in the chat card.
 * @param {string} [options.weaponId]               UUID of the weapon Item used.
 * @param {Actor}  [options.actor]                  Actor performing the attack.
 * @param {number} [options.advantage]              Signed integer added to the dice pool (min 1).
 *                                                   +N = extra dice, -N = fewer dice. 0/undefined = pool unchanged.
 * @param {string} [options.flavor]                 Optional flavor / situation text.
 * @returns {Promise<ChatMessage|null>}
 */
export async function rollToHit({
  dicePool,
  damage,
  label,
  weaponId,
  actor,
  advantage,
  flavor,
  slimySkinTarget
} = {}) {
  if (!Number.isInteger(dicePool) || dicePool < 1) {
    ui.notifications?.warn("FLAIL: invalid dice pool for To Hit roll.");
    return null;
  }

  // Advantage / disadvantage: signed integer added to the dice pool.
  // Positive = extra dice (more chances to score ones = better outcomes).
  // Negative = fewer dice. Pool is clamped to a minimum of 1 die so
  // the roll can always resolve. Non-integer / undefined = pool unchanged.
  let pool = dicePool;
  if (Number.isInteger(advantage) && advantage !== 0) {
    pool = Math.max(1, pool + advantage);
  }

  const roll = new Roll(`${pool}d6`);
  await roll.evaluate();

  // Raw dice values for analysis.
  const dieResults = roll.dice[0]?.results.map(r => r.result) ?? [];
  const analysis = analyzePool(dieResults);

  /* ----- compute damage based on tier ----- */
  let damageDealt = 0;
  if (analysis.tier === "minor") damageDealt = damage;
  else if (analysis.tier === "major") damageDealt = damage * 2;
  // deathBlow / fail / fumble: no flat damage; deathBlow is instant kill,
  // fumble has its own consequence, both handled in the card.

  /* ----- Bard "Witness Me!" trigger -----
   * Triggers when:
   *   1. The actor is a Bard.
   *   2. The attack hit (minor / major / deathBlow — anything that did damage).
   *   3. The dice pool contains three of the same face. We treat any
   *      `triplet`, `fourKind`, or `fullHouse` combo as a triple — all
   *      three contain three matching dice and a player would describe
   *      any of them as "rolling a triple".
   * Effects: extra d6 of damage rolled here (added to damageDealt and
   * surfaced separately on the card), and a +1 TH die buff broadcast to
   * every player-controlled character via `applyWitnessMeBuff` after the
   * card renders.
   */
  let witnessMe = null;
  const isHit = ["minor", "major", "deathBlow"].includes(analysis.tier);

  /*
   * Armour Negation (character defenders).
   *
   * The FLAIL armour rule: "Characters can mark usage on any worn
   * piece of armour to negate one 1 from a To Hit roll made against
   * them." When an attack hits AND the roll contains at least one 1
   * AND any of the currently-declared targets is a Character (not an
   * NPC or Construct), collect their UUIDs so the chat card can
   * offer the "Negate with Armour" button to their owner.
   */
  let armourNegate = null;
  if (isHit && analysis.ones > 0) {
    const characterTargets = [];
    const targets = game.user?.targets;
    if (targets && targets.size > 0) {
      for (const token of targets) {
        const t = token.actor;
        if (t?.type === "character") {
          characterTargets.push({ uuid: t.uuid, name: t.name });
        }
      }
    }
    if (characterTargets.length > 0) {
      armourNegate = {
        targets: characterTargets,
        ones: analysis.ones,
        sixes: analysis.sixes ?? 0,
        weaponDamage: damage,
        originalTier: analysis.tier
      };
    }
  }

  /*
   * Warrior — Combat Talent basic-tier triggers.
   *
   * Fine Cuts (Blade Freak Basic) — successful hit + 3+ number
   *   sequence → extra damage equal to the highest die in the
   *   sequence. Rulebook restricts to 1H weapons; not gated here
   *   since the weapon schema doesn't track hand count. The chat
   *   banner surfaces a reminder.
   *
   * Raw Force (Brawler Mauler Basic) — successful hit + triplet →
   *   extra damage equal to the triplet's face value. Rulebook says
   *   2H weapons only; same reminder pattern.
   *
   * Precision Mark (Archer Master Basic) — successful hit + two
   *   pair → target actor(s) get a `precisionMark` flag. Consumed
   *   in actor.rollAttack on the next attack against them, adding
   *   +2 dice to that pool. Rulebook says bows only.
   */
  let fineCuts = null, rawForce = null, precisionMark = null;
  const isWarriorActor = actor?.type === "character" && actor.system?.class === "warrior";
  const warriorTalents = isWarriorActor ? (actor.system.combatTalents ?? []) : [];

  if (isHit && isWarriorActor) {
    // Fine Cuts — pick the longest sequence available (sequence5
    // dominates sequence4 dominates sequence3), then use the max
    // face of that sequence as the bonus damage.
    if (warriorTalents.includes("bladeFreak.basic")) {
      const seq = analysis.combinations.find(c =>
        c.key === "sequence5" || c.key === "sequence4" || c.key === "sequence3"
      );
      if (seq) {
        const bonus = Math.max(...seq.dice);
        damageDealt += bonus;
        fineCuts = { bonus, sequence: seq.dice };
      }
    }

    // Raw Force — the triplet combo's dice array is [face, face, face],
    // so the face value is dice[0]. That value is both the count of
    // matching dice AND the bonus per the rulebook example.
    if (warriorTalents.includes("brawlerMauler.basic")) {
      const triplet = analysis.combinations.find(c => c.key === "triplet");
      if (triplet) {
        const bonus = triplet.dice[0];
        damageDealt += bonus;
        rawForce = { bonus, face: triplet.dice[0] };
      }
    }

    // Precision Mark — apply the flag to every currently-declared
    // target of the acting user. Consumed in actor.rollAttack next
    // time anyone attacks a marked target.
    if (warriorTalents.includes("archerMaster.basic")) {
      const twoPair = analysis.combinations.find(c => c.key === "twoPair");
      if (twoPair) {
        const markedNames = [];
        const targets = game.user?.targets;
        if (targets && targets.size > 0) {
          for (const token of targets) {
            const t = token.actor;
            if (!t) continue;
            try {
              await t.setFlag("flail", "precisionMark", {
                markedBy: actor.uuid,
                timestamp: Date.now()
              });
              markedNames.push(t.name);
            } catch (err) {
              console.error("FLAIL: failed to set Precision Mark on", t.name, err);
            }
          }
        }
        precisionMark = { markedTargets: markedNames };
      }
    }
  }

  const isBardActor = actor?.type === "character" && actor.system?.class === "bard";
  const tripleCombo = analysis.combinations.find(c =>
    c.key === "triplet" || c.key === "fourKind" || c.key === "fullHouse"
  );
  if (isBardActor && isHit && tripleCombo) {
    const bonusRoll = new Roll("1d6");
    await bonusRoll.evaluate();
    witnessMe = {
      bonusFormula: bonusRoll.formula,
      bonusDamage: bonusRoll.total,
      tripleFace: tripleCombo.dice[0]
    };
    damageDealt += bonusRoll.total;
    // Push the bonus damage roll onto the message's roll array below so it
    // gets DSN animation and shows up in the rolls drawer.
    roll._flailWitnessRoll = bonusRoll;
  }

  /*
   * Celestial Aid (Cleric special skill) — triggered on a Full House combo
   * regardless of whether the attack hit. The player chooses one of three
   * effects via buttons on the chat card; selection is handled by the
   * shared chat-listener dispatcher, not here. We just flag the trigger.
   */
  let celestialAid = null;
  const isClericActor = actor?.type === "character" && actor.system?.class === "cleric";
  const fullHouseCombo = analysis.combinations.find(c => c.key === "fullHouse");
  if (isClericActor && fullHouseCombo) {
    celestialAid = {
      actorUuid: actor.uuid,
      // `chosen` is set when the player picks one of the three buttons on
      // the chat card; the listener re-renders the message at that point.
      chosen: null
    };
  }

  /*
   * Mark of the Guild — Cutthroat token recoup on Death Blow. The other
   * recoup trigger (a critical hit on a save) is handled in save.mjs.
   * "Critical hit" in FLAIL is the natural-1 result on a d20 save —
   * not a To Hit tier — so the To Hit half of Mark of the Guild only
   * recoups on a Death Blow (the top hit tier, 3+ ones in the pool).
   * Recoup happens regardless of whether the sigil is worn — the rule
   * gates *spending* on the sigil, not the recoup itself.
   */
  let guildRecoup = null;
  const isCutthroatActor = actor?.type === "character" && actor.system?.class === "cutthroat";
  if (isCutthroatActor && analysis.tier === "deathBlow") {
    const current = actor.system.guildTokens ?? 0;
    const max = actor.system.level ?? 1;
    if (current < max) {
      await actor.update({ "system.guildTokens": current + 1 });
      guildRecoup = {
        before: current,
        after:  current + 1,
        max,
        trigger: analysis.tier
      };
    } else {
      // Tokens already full — still surface the trigger so the player
      // sees the recoup *would have* happened but had nowhere to go.
      guildRecoup = {
        before: current,
        after:  current,
        max,
        trigger: analysis.tier,
        full:    true
      };
    }
  }

  /*
   * Tinkerer Gadget Belt recovery — when a Tinkerer scores a hit
   * (any tier) AND the dice pool contains a triplet, one mark of
   * usage on the physical "Gadget Belt" gear item in their inventory
   * is automatically removed. Represents the Tinkerer scavenging
   * usable components from the fight.
   *
   * The belt is identified by name — the compendium-issued item is
   * "Gadget Belt". Case-insensitive substring match so mild renames
   * (e.g. "Master's Gadget Belt") still qualify. If the belt isn't
   * on the sheet, the trigger fires visibly for the player's benefit
   * but nothing changes.
   */
  const isTinkererActor = actor?.type === "character" && actor.system?.class === "tinkerer";
  const tripletCombo = analysis.combinations.find(c => c.key === "triplet");
  const isSuccessfulHit = ["minor", "major", "deathBlow"].includes(analysis.tier);
  let gadgetBeltRecovery = null;
  if (isTinkererActor && isSuccessfulHit && tripletCombo) {
    const belt = actor.items?.find(i =>
      i.type === "gear" && (i.name?.toLowerCase().includes("gadget belt"))
    );
    if (!belt) {
      gadgetBeltRecovery = { missing: true };
    } else {
      const before = belt.system?.usage?.value ?? 0;
      const max    = belt.system?.usage?.max   ?? 0;
      if (before > 0) {
        const next = before - 1;
        await belt.update({ "system.usage.value": next });
        gadgetBeltRecovery = {
          beltName: belt.name,
          before,
          after: next,
          max
        };
      } else {
        // Belt has no marks to remove — surface the trigger anyway.
        gadgetBeltRecovery = { beltName: belt.name, clean: true, max };
      }
    }
  }

  /*
   * Opportunistic Strike — Cutthroat special skill. When the dice pool
   * contains a Two Pair combination, the Cutthroat may immediately make
   * a new attack. The chat card surfaces a button; the listener resolves
   * actor + weapon and calls rollAttack again. Chains are allowed — if
   * the follow-up itself rolls Two Pair, it gets its own button.
   */
  let opportunisticStrike = null;
  const twoPairCombo = analysis.combinations.find(c => c.key === "twoPair");
  if (isCutthroatActor && twoPairCombo) {
    opportunisticStrike = {
      actorUuid: actor.uuid,
      weaponId,
      // `resolved` is set when the player clicks the button on the chat
      // card; the listener re-renders the banner at that point.
      resolved: false
    };
  }

  /*
   * Druid Primal Gift reminders and follow-up-attack option. Three
   * gifts affect a Druid's To Hit chat card:
   *
   *   Pack Mentality (Mammal) — reminder that the Druid may add +1
   *     to hit if an ally is Nearby. Not auto-applied; the rulebook
   *     framing is a fictional-position judgement so we surface it as
   *     a banner rather than silently modifying the pool.
   *
   *   Viper's Agility (Reptile) — reminder that the Druid may make a
   *     second attack this round, at disadvantage. Card offers a
   *     "Second attack" button that fires rollAttack again with -1
   *     to the pool and marks the option resolved.
   *
   * These fire on any Druid attack roll — not gated by hit/miss —
   * because the mechanics apply to the *decision* to attack, not
   * the outcome.
   */
  const isDruidActor = actor?.type === "character" && actor.system?.class === "druid";
  const druidGifts = isDruidActor ? (actor.system.primalGifts ?? {}) : {};
  const packMentality = (isDruidActor && druidGifts.mammal?.packMentality) ? true : false;
  let vipersAgility = null;
  if (isDruidActor && druidGifts.reptile?.vipersAgility) {
    vipersAgility = {
      actorUuid: actor.uuid,
      weaponId,
      resolved: false
    };
  }

  /* ----- build chat data ----- */
  const tierData = FLAIL.hitTier[analysis.tier];
  const comboLabels = analysis.combinations.map(c => ({
    key: c.key,
    label: game.i18n.localize(FLAIL.combination[c.key]?.label ?? c.key),
    dice: c.dice,
    priority: c.priority
  }));

  const templateData = {
    label: label ?? game.i18n.localize("FLAIL.Roll.ToHit"),
    flavor,
    actor: actor ? { name: actor.name, img: actor.img, uuid: actor.uuid } : null,
    weaponId,
    pool,
    advantage,
    dice: dieResults,
    analysis,
    tier: { key: analysis.tier, label: game.i18n.localize(tierData.label), icon: tierData.icon },
    damageDealt,
    weaponDamage: damage,
    combos: comboLabels,
    witnessMe,
    celestialAid,
    guildRecoup,
    opportunisticStrike,
    packMentality,
    vipersAgility,
    slimySkinTarget,
    gadgetBeltRecovery,
    fineCuts,
    rawForce,
    precisionMark,
    armourNegate
  };

  const content = await foundry.applications.handlebars.renderTemplate(
    "systems/flail/templates/chat/attack-roll.hbs",
    templateData
  );

  // If Witness Me fired, attach the bonus d6 to the message rolls so DSN
  // animates it alongside the main pool and the rolls drawer reflects both.
  const messageRolls = roll._flailWitnessRoll
    ? [roll, roll._flailWitnessRoll]
    : [roll];

  const message = await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: messageRolls,
    content,
    sound: CONFIG.sounds.dice,
    flags: {
      flail: {
        attackRoll: {
          analysis,
          damageDealt,
          weaponId,
          actorUuid: actor?.uuid ?? null,
          armourNegate,
          witnessMe: witnessMe ? {
            bonusDamage: witnessMe.bonusDamage,
            sourceActorUuid: actor.uuid
          } : null,
          celestialAid: celestialAid ? {
            actorUuid: celestialAid.actorUuid,
            chosen: null
          } : null,
          guildRecoup,
          opportunisticStrike: opportunisticStrike ? {
            actorUuid: opportunisticStrike.actorUuid,
            weaponId:  opportunisticStrike.weaponId,
            resolved:  false
          } : null,
          vipersAgility: vipersAgility ? {
            actorUuid: vipersAgility.actorUuid,
            weaponId:  vipersAgility.weaponId,
            resolved:  false
          } : null
        }
      }
    }
  });

  // Apply the +1 TH die buff to all PC allies (after the chat card so the
  // narrative order reads correctly: roll → narrate → grant). Only the GM
  // can write effects to other actors; if a player triggered this we
  // socket-defer to the GM.
  if (witnessMe) {
    await applyWitnessMeBuff({ source: actor });
  }

  return message;
}

/**
 * Grant +1 attack die to every player-controlled character on the scene.
 * Created as an Active Effect that targets `system.toHitBonus` and is
 * flagged `consumeOnAttack: true` so `FlailActor#rollAttack` removes it
 * after the next attack regardless of hit/miss. Also carries
 * `duration.rounds = 1` so it auto-expires at the end of the next round
 * if combat is active and nobody attacks with it first.
 *
 * @param {object} opts
 * @param {Actor}  opts.source   The Bard who triggered Witness Me.
 */
async function applyWitnessMeBuff({ source }) {
  // Find every player-controlled character. We deliberately include the
  // Bard themselves — "all allies" reads inclusively, and if the GM doesn't
  // want self-application they can delete the effect manually. PC = an
  // actor whose ownership map includes a non-default OWNER level for any
  // non-GM user.
  const targets = game.actors.filter(a => {
    if (a.type !== "character") return false;
    return a.hasPlayerOwner;
  });
  if (!targets.length) return;

  const effectData = {
    name: game.i18n.localize("FLAIL.Effect.WitnessMe.Name"),
    icon: "icons/skills/social/diplomacy-handshake.webp",
    origin: source.uuid,
    duration: { rounds: 1 },
    changes: [{
      key: "system.toHitBonus",
      mode: CONST.ACTIVE_EFFECT_MODES.ADD,
      value: "1",
      priority: 20
    }],
    flags: {
      flail: {
        consumeOnAttack: true,
        witnessMe: { sourceUuid: source.uuid }
      }
    }
  };

  // GM applies directly. Players have to socket-route since they can't
  // create effects on actors they don't own.
  if (game.user.isGM) {
    for (const target of targets) {
      // Skip if target already has an active Witness Me — don't stack.
      const existing = target.effects.find(e => e.getFlag("flail", "witnessMe"));
      if (existing) continue;
      await target.createEmbeddedDocuments("ActiveEffect", [effectData]);
    }
    return;
  }

  // Non-GM caller: emit a socket so a connected GM applies the buff.
  game.socket.emit("system.flail", {
    op: "applyWitnessMe",
    sourceUuid: source.uuid
  });
}

/**
 * Socket entry point — called on the GM client when a player-controlled
 * Bard fires Witness Me. Delegates to the same internal applier so the
 * effect is identical regardless of which client originated the trigger.
 * @param {Actor} source
 */
export async function applyWitnessMeBuffFromSocket(source) {
  if (!game.user.isGM) return;
  await applyWitnessMeBuff({ source });
}
