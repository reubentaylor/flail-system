/**
 * FLAIL initiative flow (rulebook page 54):
 *   "Characters roll a DEX save. Those who succeed act before
 *    adversaries, those who fail act after."
 *
 * Foundry's Combat model sorts combatants by a numeric initiative
 * value, so we map the FLAIL binary outcome to three tiers:
 *
 *   PASS (crit or success on DEX save) → INIT_PASS (high, act first)
 *   NPC / adversary                    → INIT_NPC  (middle)
 *   FAIL (fail or fumble on DEX save)  → INIT_FAIL (low, act last)
 *
 * Sub-ordering within a tier falls back to Foundry's secondary sort
 * (typically actor name / creation order), which is fine — the rule
 * only cares about the three tiers.
 *
 * Surprise (also page 54) is a GM-arbitrated adjustment: on surprise,
 * the surprising side simply attacks first, no initiative rolled.
 * Handle this by not clicking Roll All / Roll NPC on that round —
 * or by manually adjusting the numeric initiative post-facto if you
 * want token strip ordering to reflect it.
 */
const INIT_PASS = 20;
const INIT_NPC  = 10;
const INIT_FAIL = 0;

export class FlailCombat extends Combat {
  /**
   * Roll (or set) initiative for the given combatant IDs.
   * Overrides Foundry's default which evaluates a Roll formula and
   * sorts by numeric total.
   *
   * Characters go through actor.rollSave("dex", ...) so all the usual
   * save modifiers apply automatically — Falcon's Grace advantage,
   * Exhausted disadvantage, Petrified blocking. If the save flow
   * refuses (e.g. Petrified returns null), the character is stamped
   * with FAIL initiative — a petrified character can't act, so slotting
   * them at the bottom of the order is correct.
   */
  async rollInitiative(ids, options = {}) {
    if (!Array.isArray(ids)) ids = [ids];

    const updates = [];
    for (const id of ids) {
      const combatant = this.combatants.get(id);
      if (!combatant) continue;
      const actor = combatant.actor;
      if (!actor) continue;

      let initiative;

      if (actor.type === "character") {
        // Roll the DEX save — actor.rollSave posts its own chat card
        // and returns the ChatMessage; we read the outcome flag it
        // wrote to decide the tier. Wrapped in try/catch so a rollSave
        // error doesn't break the whole batch.
        let outcome = null;
        try {
          const message = await actor.rollSave("dex", {
            flavor: game.i18n.localize("FLAIL.Initiative.SaveFlavor")
          });
          outcome = message?.flags?.flail?.saveRoll?.outcome ?? null;
        } catch (err) {
          console.error("FLAIL | initiative save failed for", actor.name, err);
        }
        initiative = (outcome === "crit" || outcome === "success")
          ? INIT_PASS
          : INIT_FAIL;
      } else {
        // NPCs and adversaries slot into the middle tier. No roll —
        // the rule locates them by fiat between passing and failing
        // characters.
        initiative = INIT_NPC;
      }

      updates.push({ _id: combatant.id, initiative });
    }

    if (updates.length) {
      await this.updateEmbeddedDocuments("Combatant", updates);
    }

    // Preserve Foundry's default: if updateTurn wasn't explicitly
    // suppressed and combat has started, reset to the top so the
    // sort takes effect immediately.
    if (options.updateTurn !== false && this.started) {
      await this.update({ turn: 0 });
    }

    return this;
  }
}

/**
 * Belt-and-braces override. If, for any reason, the FlailCombat.
 * rollInitiative override doesn't fire — module load timing, class
 * caching on pre-existing Combat documents, Foundry version drift —
 * the base Combat.rollInitiative will iterate combatants and call
 * `combatant.getInitiativeRoll(formula)` on each. Its default
 * implementation substitutes actor rollData into the formula, and
 * some actor rollData paths (or system defaults on the base class
 * bleeding through) resolve to `StringTerm undefined` and crash the
 * evaluator.
 *
 * This override *always* returns a plain 1d20 Roll with no rollData
 * substitution — no variables, no undefined lookups, guaranteed to
 * evaluate cleanly. Foundry's sort will be by that d20 total, which
 * isn't the FLAIL rule but at least it doesn't crash. The FLAIL
 * mechanic is preserved via FlailCombat above whenever it fires.
 */
export class FlailCombatant extends Combatant {
  getInitiativeRoll(formula) {
    // Ignore any incoming formula and any actor rollData — return a
    // known-safe roll that always evaluates.
    return new Roll("1d20");
  }
}

