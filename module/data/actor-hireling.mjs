/**
 * Hireling actor model (Ship H1).
 *
 * A lightweight retainer (rulebook pp. 56-57): five attributes, HP, a
 * level, its own 8-slot inventory (2 carried / 2 worn / 4 stashed), a
 * Type + Ability, an Allowance, and a link to its patron. Modelled on
 * the construct companion, but using the character's 5-attribute shape
 * so saves and attacks work through the shared FlailActor methods.
 *
 * Starting stats (RAW): 6 HP, 6 in every attribute, 8 slots, unequipped.
 * Level-up (with the patron): +1 to three attributes of choice, +1 max HP.
 */

import { FLAIL } from "../helpers/config.mjs";

const { fields } = foundry.data;

function attributeSchema() {
  return new fields.SchemaField({
    base:    new fields.NumberField({ integer: true, min: 0, initial: 6 }),
    mod:     new fields.NumberField({ integer: true, initial: 0 }),
    current: new fields.NumberField({ integer: true, min: 0, initial: 6 })
  });
}

export class FlailHirelingModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const attributes = {};
    for (const k of FLAIL.attributeKeys) attributes[k] = attributeSchema();
    return {
      level: new fields.NumberField({ integer: true, min: 1, max: 6, initial: 1 }),
      attributes: new fields.SchemaField(attributes),
      hp: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, min: 0, initial: 6 }),
        max:   new fields.NumberField({ integer: true, min: 0, initial: 6 })
      }),
      // Flat defence (RAW hirelings have none by default; some gear grants it).
      defence: new fields.NumberField({ integer: true, min: 0, initial: 0 }),

      // Type key from FLAIL.hirelingTypes, or "" / "custom" for homebrew.
      hirelingType: new fields.StringField({ blank: true, initial: "" }),
      // The Ability text (seeded from the type, editable for homebrew).
      ability: new fields.StringField({ blank: true, initial: "" }),
      // Allowance in coins, paid at hire and each session.
      allowance: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
      // Whether this session's allowance has been paid (H2).
      allowancePaid: new fields.BooleanField({ initial: false }),

      // --- H2 daily-ability tracking ---
      // A once-per-day ability (Armourer / Blacksmith) has been used today.
      abilityDailyUsed: new fields.BooleanField({ initial: false }),
      // A per-level ability (Healer: uses = level per day) — charges left today.
      abilityUsesLeft: new fields.NumberField({ integer: true, min: 0, initial: 0 }),

      // The patron (hiring PC) this hireling follows — UUID for resolution.
      patronUuid: new fields.StringField({ blank: true, initial: "" }),
      patronName: new fields.StringField({ blank: true, initial: "" }),

      // One-time guard so type starting-grants aren't re-applied.
      grantsApplied: new fields.BooleanField({ initial: false }),

      description: new fields.HTMLField({ required: false, blank: true, initial: "" })
    };
  }

  /** Derive each attribute's `current` (base + mod) every prep cycle. */
  prepareBaseData() {
    super.prepareBaseData();
    for (const key of FLAIL.attributeKeys) {
      const attr = this.attributes?.[key];
      if (!attr) continue;
      attr.current = (attr.base ?? 0) + (attr.mod ?? 0);
    }
  }

  /** Fixed hireling slot layout (no STR/level locks). */
  prepareDerivedData() {
    super.prepareDerivedData();
    this.slotAvailability = computeHirelingSlots();
  }

  static getDefaultArtwork() {
    return {
      img: "icons/svg/mystery-man.svg",
      texture: { src: "icons/svg/mystery-man.svg" }
    };
  }
}

/**
 * Build the hireling's fixed slot availability from FLAIL.hirelingInventory.
 * Every slot is always unlocked (hirelings have no STR/level gating).
 * @returns {object} keyed by zone → array of { index, locked:false }
 */
function computeHirelingSlots() {
  const out = {};
  const zones = FLAIL.hirelingInventory?.zones ?? {};
  for (const [zone, def] of Object.entries(zones)) {
    const slots = [];
    for (let i = 0; i < (def.count ?? 0); i++) slots.push({ index: i, locked: false });
    out[zone] = slots;
  }
  return out;
}
