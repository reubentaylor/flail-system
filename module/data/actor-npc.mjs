const { fields } = foundry.data;

/**
 * NPCs in FLAIL use a flat statblock: level, hp, single Saves value,
 * Defence (flat damage reduction), Morale, Type, optional Mana/Spirit.
 * Their attacks are stored as Item documents (subtype: weapon).
 */
export class FlailNpcModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      level: new fields.NumberField({ integer: true, min: 1, initial: 1 }),

      hp: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, min: 0, initial: 6 }),
        max:   new fields.NumberField({ integer: true, min: 0, initial: 6 })
      }),

      saves: new fields.NumberField({ integer: true, min: 0, initial: 6 }),
      defence: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
      morale: new fields.NumberField({ integer: true, min: 0, initial: 8 }),

      // "A" = average, "F" = fast, "S" = slow per the bestiary's Mov column.
      movement: new fields.StringField({
        choices: ["S", "A", "F"], initial: "A"
      }),

      // Free-form type tag (humanoid, undead, beast, fey, dragon, ...).
      creatureType: new fields.StringField({ blank: true, initial: "" }),

      // Optional mana/spirit pools for spellcasting NPCs.
      mana: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
        max:   new fields.NumberField({ integer: true, min: 0, initial: 0 })
      }),

      // For minion / hireling templates — XP value awarded when slain.
      xp: new fields.NumberField({ integer: true, min: 0, initial: 0 }),

      description: new fields.HTMLField({ required: false, blank: true, initial: "" }),

      // Actor-level rulebook "Special:" text — the top-level rule
      // that isn't tied to a specific attack (Roc: makes two
      // attacks per round; Phoenix: reawakens in two turns; Rust
      // Monster: mark usage on metal that touches it; swarms:
      // TH = current HP). Rendered as a bordered box at the top
      // of the NPC sheet when non-empty. HTMLField so GMs can
      // format multi-clause rules with lists or emphasis.
      specialRules: new fields.HTMLField({ required: false, blank: true, initial: "" }),

      // Some bestiary entries make more than one attack per round
      // (e.g. Roc — beak then talons). Default 1; sheet shows a
      // small badge when > 1 so the GM doesn't forget.
      attacksPerRound: new fields.NumberField({ integer: true, min: 1, initial: 1 }),

      // Tag fields for filtering / encounter-building.
      tags: new fields.SetField(new fields.StringField())
    };
  }

  /** Default token configuration for new NPCs. */
  static getDefaultArtwork(actorData) {
    return {
      img: "icons/svg/mystery-man.svg",
      texture: { src: "icons/svg/mystery-man.svg" }
    };
  }
}
