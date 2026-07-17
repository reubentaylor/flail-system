import { FLAIL } from "../helpers/config.mjs";

const { fields } = foundry.data;

/**
 * Build the schema for a single attribute (STR/DEX/CHA/INT/LUCK).
 * `base` is the rolled score, `mod` is any temporary modifier (from
 * conditions, magic items). `current` is computed in prepareDerivedData.
 */
function attributeSchema() {
  return new fields.SchemaField({
    base: new fields.NumberField({ integer: true, min: 0, initial: 8 }),
    mod:  new fields.NumberField({ integer: true, initial: 0 }),
    current: new fields.NumberField({ integer: true, min: 0, initial: 8 })
  });
}

/**
 * Class-specific resource pool (mana, spirit, miracle calls,
 * guild tokens, construct points). Not all classes have one.
 */
function resourceSchema() {
  return new fields.SchemaField({
    value: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
    max:   new fields.NumberField({ integer: true, min: 0, initial: 0 }),
    label: new fields.StringField({ blank: true, initial: "" })
  });
}

export class FlailCharacterModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const attributes = {};
    for (const k of FLAIL.attributeKeys) attributes[k] = attributeSchema();

    return {
      class: new fields.StringField({
        choices: FLAIL.classKeys, initial: "warrior"
      }),
      level: new fields.NumberField({ integer: true, min: 1, max: 6, initial: 1 }),
      xp: new fields.NumberField({ integer: true, min: 0, initial: 0 }),

      attributes: new fields.SchemaField(attributes),

      hp: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, min: 0, initial: 9 }),
        max:   new fields.NumberField({ integer: true, min: 0, initial: 9 })
      }),

      // Class-specific resource (Wizard mana, Bone Whisperer spirit, etc.).
      // We keep a single generic slot rather than five named ones — the class
      // setting determines what it represents and what label to show.
      resource: resourceSchema(),

      // Reputation track from -6 to +6 (with badges at -6/+6).
      reputation: new fields.NumberField({
        integer: true, min: -6, max: 6, initial: 0
      }),

      coins: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
      maxCoins: new fields.NumberField({ integer: true, min: 1, initial: 250 }),

      // Persistent attack-pool modifiers. `toHitBonus` is targeted by Active
      // Effects (e.g. the Bard's Witness Me! +1 die buff). `toHitPenalty`
      // is computed from condition items in prepareDerivedData; both fold
      // into the dice pool inside FlailActor#rollAttack.
      toHitBonus: new fields.NumberField({ integer: true, initial: 0 }),

      // Background — d6 result key from FLAIL.backgrounds[<class>].
      // Stored as "1".."6" or blank. The dropdown in the sheet resolves
      // this against the current class to surface the descriptive label
      // and mechanical perk.
      background: new fields.StringField({ blank: true, initial: "" }),

      // Class-specific picks. Religion (Cleric) is constrained to one of
      // the keys in FLAIL.religions; the chosen religion derives deity,
      // weapons, holy symbol, armour, lay-on-hands fumble, and the divine
      // prayer list — none of which are persisted. Guild and puppet remain
      // free-form.
      classOptions: new fields.SchemaField({
        guild:    new fields.StringField({ blank: true, initial: "" }),
        religion: new fields.StringField({ blank: true, initial: "",
          // Allow "" (unset) plus every religion key. Foundry's StringField
          // `choices` accepts arrays for enum-style validation.
          choices: ["", "brotherhood", "crusade", "shadowDemon", "verdantGrove"]
        }),
        puppet:   new fields.StringField({ blank: true, initial: "" }),
        // Wizard — which Master the character apprenticed under. Empty
        // means unset; otherwise one of the four canonical Masters,
        // each mapping to a spell tradition:
        //   flakumeg   → flame
        //   ukraal     → shadow
        //   oozzeborne → ooze
        //   chooChoo   → illusion
        // A wizard can drop any arcane spell freely; master-specific
        // spells (flame/shadow/ooze/illusion) are only accepted when
        // their tradition matches the chosen Master.
        wizardMaster: new fields.StringField({ blank: true, initial: "",
          choices: ["", "flakumeg", "ukraal", "oozzeborne", "chooChoo"]
        }),
        // Wizard — once true, the Master picker is disabled for
        // non-GM users. Anyone who owns the actor can flip this from
        // false to true (lock in the choice); only a GM can flip it
        // back to false (unlock for re-selection).
        wizardMasterLocked: new fields.BooleanField({ initial: false }),
        // Wizard — once the Master has been set for the first time,
        // three random arcane spells are auto-added to the spellbook
        // and this flag flips to true so re-selecting a Master (after
        // a GM-authored unlock) does NOT re-seed. GMs can flip this
        // back to false manually if they want to re-roll starter spells.
        wizardSpellbookSeeded: new fields.BooleanField({ initial: false })
      }),

      // Free-form HTML notes.
      biography:    new fields.HTMLField({ required: false, blank: true, initial: "" }),
      notes:        new fields.HTMLField({ required: false, blank: true, initial: "" }),
      adventureLog: new fields.HTMLField({ required: false, blank: true, initial: "" }),

      // ----- Class-specific data fields -----
      // Each is only meaningful for one class but the field always exists
      // so the schema is stable across class changes.

      // Warrior — Combat Talents picked at each level (5 strings, one per level slot).
      combatTalents: new fields.ArrayField(
        new fields.StringField({ required: false, blank: true }),
        { initial: () => ["", "", "", "", ""] }      ),

      // Warrior — Weathered special skill session flag. Starts true
      // (available) each session. Manually toggled between available
      // and unavailable via the button on the class tab; there's no
      // auto-reset, so the player/GM should flip it back to
      // "Available" at the start of each session.
      weatheredAvailable: new fields.BooleanField({ initial: true }),

      // Wizard — 15-line spellbook.
      spellbook: new fields.ArrayField(
        new fields.StringField({ required: false, blank: true }),
        { initial: () => Array(15).fill("") }
      ),

      // Bone Whisperer — 10-line known spells list + an Undead Puppet stat block.
      knownSpells: new fields.ArrayField(
        new fields.StringField({ required: false, blank: true }),
        { initial: () => Array(10).fill("") }
      ),
      undeadPuppet: new fields.SchemaField({
        name:   new fields.StringField({ required: false, blank: true, initial: "" }),
        hp:     new fields.NumberField({ integer: true, min: 0, initial: 0 }),
        morale: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
        th:     new fields.NumberField({ integer: true, min: 0, initial: 0 }),
        damage: new fields.NumberField({ integer: true, min: 0, initial: 0 })
      }),

      // Cleric — 6-line divine prayers list.
      divinePrayers: new fields.ArrayField(
        new fields.StringField({ required: false, blank: true }),
        { initial: () => Array(6).fill("") }
      ),

      // Cutthroat — boolean checklist of thieving talents (loose object, keys defined in config).
      thievingTalents: new fields.ObjectField({ initial: () => ({}) }),

      // Druid — Animal Companion + Primal Gifts boolean grid.
      animalCompanion: new fields.SchemaField({
        species:    new fields.StringField({ required: false, blank: true, initial: "" }),
        name:       new fields.StringField({ required: false, blank: true, initial: "" }),
        bonusSkill: new fields.StringField({ required: false, blank: true, initial: "" })
      }),
      primalGifts: new fields.ObjectField({ initial: () => ({}) }),

      // Druid — Shapeshift state. Set on a successful transformation
      // and cleared when the Druid reverts to human. `onesCount` feeds
      // system.toHitBonus in prepareDerivedData while active.
      // `sixesCount` records the mutation risks accrued at shift time;
      // resolved individually on revert with player-chosen saves.
      shapeshift: new fields.SchemaField({
        active:      new fields.BooleanField({ initial: false }),
        kingdom:     new fields.StringField({ required: false, blank: true, initial: "" }),
        beastForm:   new fields.StringField({ required: false, blank: true, initial: "" }),
        diceRolled:  new fields.NumberField({ integer: true, min: 0, initial: 0 }),
        onesCount:   new fields.NumberField({ integer: true, min: 0, initial: 0 }),
        sixesCount:  new fields.NumberField({ integer: true, min: 0, initial: 0 }),
        // Kept for chat-card display after the fact.
        rollResults: new fields.ArrayField(new fields.NumberField({ integer: true }), { initial: () => [] }),
        // Pre-shift HP snapshot — restored verbatim on revert. The
        // beast form runs with its own HP pool during the shift.
        preShiftHp:    new fields.NumberField({ integer: true, min: 0, initial: 0 }),
        preShiftHpMax: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
        // Pre-shift token image snapshot — while shapeshifted, the
        // actor's prototype token and any placed tokens on scenes
        // display the appropriate kingdom graphic from
        // FLAIL.druidKingdomTokens. On revert this path is restored
        // to whatever the Druid was using before the shift.
        preShiftTokenImg: new fields.StringField({ required: false, blank: true, initial: "" })
      }),

      // Tinkerer — Gadget Belt boolean grid.
      gadgetBelt: new fields.ObjectField({ initial: () => ({}) }),

      // Bard — Jack of All Trades: 5 entries (name + usedToday).
      jackOfAllTrades: new fields.ArrayField(
        new fields.SchemaField({
          name:      new fields.StringField({ required: false, blank: true, initial: "" }),
          usedToday: new fields.BooleanField({ initial: false })
        }),
        { initial: () => [
          { name: "", usedToday: false },
          { name: "", usedToday: false },
          { name: "", usedToday: false },
          { name: "", usedToday: false },
          { name: "", usedToday: false }
        ] }
      ),

      // Cleric — Miracle Call (once per session). Player resets manually
      // via the Reset button on the Cleric's abilities tab when a new
      // session starts.
      miracleCallUsed: new fields.BooleanField({ initial: false }),

      // Cutthroat — Mark of the Guild. Tokens equal to character level
      // at session start; spent on guild actions when the sigil is worn;
      // one is recouped on each critical hit or Death Blow. Player
      // resets manually via the Cutthroat tracker on the abilities tab.
      // Max is derived from level, so we store only the current count.
      guildTokens: new fields.NumberField({ integer: true, min: 0, initial: 0 })
    };
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  prepareBaseData() {
    super.prepareBaseData();
    try {
      // Reset current attribute scores to base + mod each prep cycle.
      for (const key of FLAIL.attributeKeys) {
        const attr = this.attributes?.[key];
        if (!attr) continue;
        attr.current = (attr.base ?? 0) + (attr.mod ?? 0);
      }
      this.toHitPenalty = 0;
      // Condition-derived runtime flags. Reset each prep — recomputed in
      // prepareDerivedData from the actor's condition items.
      //   physicalDisadvantage: stacks of Exhausted; -1 die on STR / DEX
      //     saves and To Hit rolls (capped at 3 by the dice helpers).
      //   incapacitated:        true if Petrified; blocks rolls entirely.
      this.physicalDisadvantage = 0;
      this.incapacitated = false;
    } catch (err) {
      console.error("FLAIL | prepareBaseData failed:", err);
    }
  }

  /** @inheritdoc */
  prepareDerivedData() {
    super.prepareDerivedData();
    try {
      // Apply condition penalties — each Injured, Drained, etc. takes a slice.
      if (this.parent?.items) {
        for (const item of this.parent.items) {
          if (item.type !== "condition") continue;
          applyConditionEffect(this, item);
        }
      }
      // Class metadata convenience accessors.
      this.classData = FLAIL.classes[this.class];
      // Compute available inventory slots given current STR and level.
      this.slotAvailability = computeSlotAvailability(
        this.attributes?.str?.current ?? 0,
        this.level ?? 1
      );
      // Druid Primal Gifts — passive effects. Only compute for a Druid;
      // other classes keep sensible defaults so template lookups don't
      // hit undefined.
      applyPrimalGiftPassives(this);

      // Wizard mana pool — max = INT + level per FLAIL v0.2. Applied
      // as a derived cap; the current `value` clamps down to the new
      // max if it happened to be higher (e.g. after a level-down).
      if (this.class === "wizard") {
        const intScore = this.attributes?.int?.current ?? 0;
        const level    = this.level ?? 1;
        const manaMax  = Math.max(0, intScore + level);
        if (this.resource) {
          this.resource.max = manaMax;
          if (this.resource.value > manaMax) this.resource.value = manaMax;
          if (!this.resource.label) this.resource.label = "Mana";
        }
      }

      // Tinkerer Gadget Belt — flat `system.gadgetBelt.<type>.<key>`
      // object derived from owned gadget items so the sheet grid and
      // to-hit hooks (triplet-free-release, etc.) can keep reading
      // the same shape they always did without knowing about the
      // item layer. Home-brew gadgets without a gadgetKey are ignored.
      if (this.class === "tinkerer" && this.parent?.items) {
        const derived = {};
        for (const item of this.parent.items) {
          if (item.type !== "gadget") continue;
          const t = item.system?.gadgetType;
          const k = item.system?.gadgetKey;
          if (!t || !k) continue;
          derived[t] ??= {};
          derived[t][k] = true;
        }
        this.gadgetBelt = derived;
      }

      // Cutthroat Thieving Talents — flat `system.thievingTalents.<key>`
      // object derived from owned talent items so the existing rollTalent
      // action, save advantage tests, and downstream reads keep working.
      // Legacy schema state on the actor stays intact until it's
      // overwritten by an item drop (so pre-item-based characters don't
      // lose their marks on first render — the derived object OR's over
      // whatever was there).
      if (this.class === "cutthroat" && this.parent?.items) {
        const derived = { ...(this.thievingTalents ?? {}) };
        for (const item of this.parent.items) {
          if (item.type !== "talent") continue;
          const key = item.system?.action;
          if (!key) continue;
          derived[key] = true;
        }
        this.thievingTalents = derived;
      }
    } catch (err) {
      console.error("FLAIL | prepareDerivedData failed:", err);
    }
  }

  /**
   * Convenience: find all items occupying a specific zone.
   * @param {string} zone   "hands" | "body" | "adornment" | "satchel" | "unequipped"
   * @returns {Item[]}
   */
  itemsInZone(zone) {
    if (!this.parent) return [];
    return this.parent.items.filter(i => i.system.location === zone);
  }
}

/* -------------------------------------------- */
/*  Helpers                                     */
/* -------------------------------------------- */

/**
 * Apply a single condition's mechanical penalty to the actor's attributes.
 * Most conditions impose a fixed -1 to specific attributes; persistent
 * injuries are -1 STR and -1 DEX, etc.
 *
 * @param {FlailCharacterModel} model
 * @param {Item} cond
 */
function applyConditionEffect(model, cond) {
  switch (cond.system.conditionType) {
    case "drained":
      model.attributes.int.current = Math.max(0, model.attributes.int.current - 1);
      break;
    case "persistentInjury":
      model.attributes.str.current = Math.max(0, model.attributes.str.current - 1);
      model.attributes.dex.current = Math.max(0, model.attributes.dex.current - 1);
      break;
    case "injured": {
      // Player chose the variant on application; honour it.
      const v = cond.system.injuredVariant;
      if (v === "str") model.attributes.str.current = Math.max(0, model.attributes.str.current - 1);
      else if (v === "dex") model.attributes.dex.current = Math.max(0, model.attributes.dex.current - 1);
      // -1 TH variant: surfaced via system.toHitPenalty so the rollAttack flow can pick it up.
      else if (v === "th") model.toHitPenalty = (model.toHitPenalty ?? 0) + 1;
      break;
    }
    case "exhausted":
      // Disadvantage on physical tasks (STR / DEX saves, To Hit). Stacks
      // increase the disadvantage step; the dice helpers cap at 3 dice.
      model.physicalDisadvantage = (model.physicalDisadvantage ?? 0) + 1;
      break;
    case "petrified":
      // Cannot act — rollAttack and rollSave check this before rolling.
      model.incapacitated = true;
      break;
    // poisoned, starved: tracked but no auto attribute reduction. Poisoned
    // spreads over time (rules concern); Starved has no stat penalty per
    // the rulebook ("eat grub" is the clear, not a penalty).
  }
}

/**
 * Compute which inventory slots are available given a STR value and
 * character level. Returns a structure the sheet can iterate to render
 * the grid with locked / unlocked slots.
 *
 * @param {number} str
 * @param {number} level
 * @returns {object} keyed by zone, each entry an array of {index, locked, requiresStr, requiresLevel}.
 */
function computeSlotAvailability(str, level = 1) {
  const out = {};
  for (const [zone, def] of Object.entries(FLAIL.inventory.zones)) {
    const slots = [];
    for (let i = 0; i < def.count; i++) {
      slots.push({ index: i, locked: false, requiresStr: null, requiresLevel: null });
    }
    // STR-locked overrides for this zone.
    const strLocks = FLAIL.inventory.strLocked[zone] ?? [];
    for (const lock of strLocks) {
      const slot = slots[lock.slotIndex];
      if (slot) {
        slot.requiresStr = lock.requiresStr;
        slot.locked = slot.locked || str < lock.requiresStr;
      }
    }
    // Level-locked overrides for this zone (e.g., Bard instrument slots).
    const lvlLocks = FLAIL.inventory.levelLocked?.[zone] ?? [];
    for (const lock of lvlLocks) {
      const slot = slots[lock.slotIndex];
      if (slot) {
        slot.requiresLevel = lock.requiresLevel;
        slot.locked = slot.locked || level < lock.requiresLevel;
      }
    }
    out[zone] = slots;
  }
  return out;
}

/**
 * Apply Druid Primal Gift passive effects to the character model.
 *
 * Only three gifts have purely-passive mechanical effects; the rest
 * are either activated (Regeneration → click), situational reminders
 * (Pack Mentality, Viper's Agility → attack chat cards, handled in
 * to-hit.mjs), or reactive (Toxic Secretion / Slimy Skin → hooked
 * into the relevant flow elsewhere).
 *
 *   Crocodile Skin  → +2 Defence (reduces damage taken).
 *   Falcon's Grace  → DEX saves rolled with advantage (flag consumed
 *                     by actor.rollSave).
 *
 * `defence` is added to the derived model even though the character
 * schema has no defence field — the damage resolver reads
 * `system.defence ?? 0` so setting it here Just Works. Non-Druids
 * get `defence = 0` for a stable read.
 *
 * @param {FlailCharacterModel} model
 */
function applyPrimalGiftPassives(model) {
  // Sync the flat `system.primalGifts` object from owned gift items so
  // downstream consumers (this function, chat-listeners, sheet actions
  // that read `system.primalGifts.<kingdom>.<key>`) don't need to
  // know about the item layer. Home-brew gifts without a `giftKey`
  // are ignored — a plain "cool druid trick" gift item exists but
  // doesn't fire any of the mechanical hooks.
  if (model.class === "druid" && model.parent?.items) {
    const derived = {};
    for (const item of model.parent.items) {
      if (item.type !== "gift") continue;
      const k = item.system?.kingdom;
      const g = item.system?.giftKey;
      if (!k || !g) continue;
      derived[k] ??= {};
      derived[k][g] = true;
    }
    model.primalGifts = derived;
  }

  let defence = 0;
  let dexSaveAdvantage = false;

  if (model.class === "druid") {
    const gifts = model.primalGifts ?? {};
    if (gifts.reptile?.crocodileSkin) defence += 2;
    if (gifts.bird?.falconsGrace)     dexSaveAdvantage = true;
  }

  // Druid Shapeshift — while active, add the "ones rolled" count to
  // toHitBonus so all attacks benefit. Uses += to stack with any
  // other transient bonuses (e.g. Witness Me from an ally Bard).
  if (model.class === "druid" && model.shapeshift?.active) {
    const onesBonus = model.shapeshift.onesCount ?? 0;
    if (onesBonus > 0) {
      model.toHitBonus = (model.toHitBonus ?? 0) + onesBonus;
    }
    // While transformed, defence IS the beast's defence — direct
    // replacement, not a max. The Druid takes on the beast's tough
    // hide (or lack thereof) for the duration. On revert, shapeshift
    // becomes inactive and this override no longer applies, so
    // defence recomputes from the PC's normal sources (armour,
    // Crocodile Skin, etc.).
    const beast = model.shapeshift.kingdom
      ? FLAIL.druidBeastForms?.[model.shapeshift.kingdom]
      : null;
    if (beast?.defence !== undefined) {
      defence = beast.defence;
    }
  }

  model.defence = defence;
  model.dexSaveAdvantage = dexSaveAdvantage;
}
