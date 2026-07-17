const { fields } = foundry.data;

/**
 * Tinkerer's Construct Companion.
 *
 * A construct is the Tinkerer's mechanical ally. It has its own stat
 * block modelled after the printed Construct Sheet: level, attacking
 * stats (TH and DMG), surviving stats (Defence, single Saves value,
 * HP with a base/current split), a set of eight boolean abilities,
 * and a small inventory. Improvement points (5 per level) are spent
 * to buy upgrades, though the spend mechanics are up to the GM to
 * arbitrate — the sheet just tracks the pool.
 *
 * The construct only functions when the Sparkle of Life card sits in
 * one of its carried inventory slots. The sheet surfaces this as a
 * flag but doesn't currently gate any behaviour on it — that's a
 * follow-up mechanic if you want it enforced.
 */
export class FlailConstructModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      level: new fields.NumberField({ integer: true, min: 1, initial: 1 }),

      // Attacking: TH is the To Hit dice pool the construct can raise;
      // DMG is per-die damage. Both start at 0 — everything comes
      // from purchased improvements (rulebook p. 32).
      th:     new fields.NumberField({ integer: true, min: 0, initial: 0 }),
      damage: new fields.NumberField({ integer: true, min: 0, initial: 0 }),

      // Surviving — Defence and HP start at 0; Saves starts at 6.
      defence: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
      saves:   new fields.NumberField({ integer: true, min: 0, initial: 6 }),
      hp: new fields.SchemaField({
        base:  new fields.NumberField({ integer: true, min: 0, initial: 0 }),
        value: new fields.NumberField({ integer: true, min: 0, initial: 0 }),
        max:   new fields.NumberField({ integer: true, min: 0, initial: 0 })
      }),

      // Abilities — booleans, purchased with improvement points.
      abilities: new fields.SchemaField({
        camouflage:   new fields.BooleanField({ initial: false }),
        climbing:     new fields.BooleanField({ initial: false }),
        darkvision:   new fields.BooleanField({ initial: false }),
        frogLeaping:  new fields.BooleanField({ initial: false }),
        illumination: new fields.BooleanField({ initial: false }),
        hovering:     new fields.BooleanField({ initial: false }),
        swimming:     new fields.BooleanField({ initial: false }),
        speech:       new fields.BooleanField({ initial: false })
      }),

      // Improvements ledger — each entry records one purchase, with
      // the level it was bought at. The sheet uses this to enforce
      // the "max 2 per improvement per level" rule and to compute
      // total spent points. When a construct is broken and an
      // improvement is chosen for loss, the entry is FLAGGED as lost
      // (not removed) — its effect is reversed, but its point cost
      // remains sunk so the Tinkerer can't reclaim those points.
      improvements: new fields.ArrayField(
        new fields.SchemaField({
          key:   new fields.StringField({ required: true, blank: false }),
          level: new fields.NumberField({ integer: true, min: 1, initial: 1 }),
          lost:  new fields.BooleanField({ initial: false })
        }),
        { initial: () => [] }
      ),

      // Reassembling tax — the rulebook charges 1 improvement point
      // permanently every time a Tinkerer uses the Reassemble ability
      // to reshape the construct. That point never comes back. The
      // sheet's pool cap is `level * 5 - permanentPointsLost`.
      permanentPointsLost: new fields.NumberField({ integer: true, min: 0, initial: 0 }),

      // Session flag — when true, the Improvements tab is in
      // "reassemble mode" and removals cost 100 coins each (deducted
      // from the linked Tinkerer). Persists on the actor so mid-
      // reassembly state survives sheet closes.
      reassembleMode: new fields.BooleanField({ initial: false }),

      // Locked by default — the Improvements tab requires an explicit
      // unlock to make changes, preventing accidental modifications.
      improvementsLocked: new fields.BooleanField({ initial: true }),

      // Broken state — set to true when HP hits 0 and an improvement
      // has been chosen for loss. While broken, the construct refuses
      // attacks and saves and shows a red banner across the sheet.
      // Cleared by a Rebuild action from the linked Tinkerer.
      broken: new fields.BooleanField({ initial: false }),

      // Inventory slot configuration. Starts at 1 carried slot per
      // rulebook p. 32; +1 Inventory Slot improvements unlock more,
      // carried filling to 4 first, then stashed filling to 6.
      inventorySlots: new fields.SchemaField({
        unlockedCarried: new fields.NumberField({ integer: true, min: 1, max: 4, initial: 1 }),
        unlockedStashed: new fields.NumberField({ integer: true, min: 0, max: 6, initial: 0 })
      }),

      // UUID of the Tinkerer actor this construct belongs to. Filled
      // in when the construct is created / claimed. Purely
      // informational for now.
      ownerUuid: new fields.StringField({ required: false, blank: true, initial: "" }),

      // Free-form description / sketch notes (the "Draw the construct"
      // box on the printed sheet is represented as a text field —
      // players can also drop an image on the actor's own portrait).
      description: new fields.HTMLField({ required: false, blank: true, initial: "" })
    };
  }

  /** Default token configuration for new Constructs. */
  static getDefaultArtwork(actorData) {
    return {
      img: "icons/svg/mystery-man-black.svg",
      texture: { src: "icons/svg/mystery-man-black.svg" }
    };
  }
}
