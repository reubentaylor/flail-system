import { FLAIL } from "../helpers/config.mjs";
import { analyzePool } from "./poker.mjs";

/**
 * Cast a wizard spell (FLAIL v0.2 Master Spellbook).
 *
 * Mechanics:
 *   - Spend M mana, where 1 ≤ M ≤ current mana pool.
 *   - Roll M d6 for the cast.
 *   - Spell effect: `[DICE]` in the spell text is replaced with M;
 *     `[SUM]` is replaced with the sum of the M dice.
 *   - Risks scale with the count of natural 6s in the pool:
 *       • 0 sixes → clean cast, no risk.
 *       • 1 six   → caster gains the Drained condition (chat card
 *                   surfaces a hint for the player to drag Drained
 *                   into their inventory themselves — not auto-applied).
 *       • 2 sixes → auto-roll d10 on the Side Effects table (p. 41)
 *                   and post the entry in the chat card.
 *       • 3+ sixes → Glorious Death. Chat card announces it; no
 *                    mechanical HP/status change is applied
 *                    automatically — GM narrates the end.
 *
 * The spell always resolves regardless of dice — the effect fires as
 * described, risks land on the caster afterwards.
 *
 * @param {object} options
 * @param {Actor}  options.actor   Casting Wizard character.
 * @param {Item}   options.spell   Spell Item being cast.
 * @param {number} options.mana    Amount of mana to spend (= dice rolled).
 * @returns {Promise<ChatMessage|null>}
 */
export async function rollWizardSpell({ actor, spell, mana, skipManaPool = false } = {}) {
  if (!actor || !spell) return null;
  if (!Number.isInteger(mana) || mana < 1) {
    ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.InvalidManaSpend"));
    return null;
  }

  // Bards casting a Jack-of-All-Trades spell have no mana pool — the
  // caller provides the die count directly (capped at their level).
  // Everyone else spends mana from their resource pool.
  const available = skipManaPool
    ? mana
    : (actor.system.resource?.value ?? 0);
  if (!skipManaPool) {
    if (available < 1) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NoManaAvailable"));
      return null;
    }
    if (mana > available) {
      ui.notifications?.warn(
        game.i18n.format("FLAIL.Notify.NotEnoughMana", { available })
      );
      return null;
    }
  }

  /* ---------- 1. Roll the cast pool ---------- */
  const castRoll = new Roll(`${mana}d6`);
  await castRoll.evaluate();
  const dieResults = castRoll.dice[0]?.results.map(r => r.result) ?? [];
  const sumValue   = dieResults.reduce((a, b) => a + b, 0);
  const sixCount   = dieResults.filter(r => r === 6).length;

  /* ---------- 2. Determine risk outcome ---------- */
  let sideEffect = null;
  let sideEffectRoll = null;
  if (sixCount === 1) {
    sideEffect = { kind: "drained" };
  } else if (sixCount === 2) {
    sideEffectRoll = new Roll("1d10");
    await sideEffectRoll.evaluate();
    const idx = sideEffectRoll.total;
    const entry = FLAIL.wizardSideEffects[idx - 1] ?? null;
    sideEffect = { kind: "table", result: idx, entry };
  } else if (sixCount >= 3) {
    sideEffect = { kind: "death" };
  }

  /* ---------- 2b. Arcane Resonance — Wizard special skill ----------
   *
   * "If Wizards roll a pair while spellcasting, they recover mana of
   * the same value of the pair (e.g. a pair of 3s recoups 3 mana)."
   *
   * SUBSET SEMANTICS (per Andre Novoa): larger matches also count as
   * pairs. A triplet of 3s recoups 3 mana (contains one pair of 3s).
   * A four-of-a-kind of 3s recoups 6 mana (contains TWO non-overlapping
   * pairs of 3s). Same logic scales — a six-of-a-kind of 3s = 9 mana.
   *
   * Example rolls (mana spent = dice rolled):
   *   [2,2,5]     → pair of 2s → +2 mana
   *   [3,3,4,4]   → pair of 3s + pair of 4s → +7 mana
   *   [5,5,5,2,2] → pair of 5s (from triplet) + pair of 2s → +7 mana
   *   [3,3,3,3]   → two pairs of 3s (from fourKind) → +6 mana
   *   [6,6,3]     → pair of 6s → +6 mana AND Side Effect trigger fires
   *
   * Uses analyzePool's pairFaces list which is subset-inclusive: a
   * face with N dice contributes floor(N/2) entries to pairFaces.
   *
   * The recouped mana is applied AFTER spending, so it can partially
   * or fully offset the cast cost. Total mana is still capped at max.
   */
  const analysis = analyzePool(dieResults);
  const pairFaces = [...analysis.pairFaces].sort((a, b) => a - b);
  const arcaneResonance = pairFaces.length ? {
    pairs:    pairFaces,
    recouped: pairFaces.reduce((sum, f) => sum + f, 0)
  } : null;

  /* ---------- 3. Substitute [DICE] and [SUM] in the spell text ---------- */
  const rawDesc = spell.system?.description ?? "";
  const substituted = rawDesc
    .replaceAll("[DICE]", `<strong>${mana}</strong>`)
    .replaceAll("[SUM]",  `<strong>${sumValue}</strong>`);

  /* ---------- 4. Spend the mana, then apply any Resonance recoup ---------- */
  const manaMax   = actor.system.resource?.max ?? 0;
  const recouped  = arcaneResonance?.recouped ?? 0;
  let newMana = manaMax;
  if (!skipManaPool) {
    newMana = Math.min(manaMax, Math.max(0, available - mana + recouped));
    await actor.update({ "system.resource.value": newMana });
  }

  /* ---------- 5. Build chat card ---------- */
  const templateData = {
    actor: { name: actor.name, img: actor.img, uuid: actor.uuid },
    spell: {
      id:          spell.id,
      name:        spell.name,
      img:         spell.img,
      tradition:   spell.system?.tradition ?? "arcane",
      description: substituted
    },
    mana,
    manaRemaining: newMana,
    manaMax,
    dice:          dieResults,
    sum:           sumValue,
    sixCount,
    sideEffect,
    arcaneResonance
  };

  const content = await foundry.applications.handlebars.renderTemplate(
    "systems/flail/templates/chat/cast-wizard-spell.hbs",
    templateData
  );

  // Both rolls (cast pool + optional side-effects d10) attach to the same
  // message for DSN animation and rolls-drawer visibility.
  const rolls = sideEffectRoll ? [castRoll, sideEffectRoll] : [castRoll];

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls,
    content,
    sound: CONFIG.sounds.dice,
    flags: {
      flail: {
        wizardSpellCast: {
          spellId:   spell.id,
          actorUuid: actor.uuid,
          mana,
          sum:       sumValue,
          sixCount,
          sideEffect,
          arcaneResonance
        }
      }
    }
  });
}
