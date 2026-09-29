import { FLAIL } from "../helpers/config.mjs";
import { analyzePool } from "./poker.mjs";
import { runEffects } from "./effects-runner.mjs";

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

  const message = await ChatMessage.create({
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

  /* ---------- 6. Auto-apply Drained on exactly one six (RAW) ---------- */
  if (sideEffect?.kind === "drained") {
    await applyDrainedCondition(actor);
  }

  /* ---------- 7. Run automatable effects (Ship B) ----------
   * Spells that carry effects (Magic Missile damage, Shield temp-hp, …)
   * resolve through the shared effects-runner, with @DICE / @SUM bound
   * to this cast so magnitudes scale correctly. Text-only spells (no
   * effects authored) skip this — the substituted description card
   * above is the whole result. */
  const effects = spell.system?.effects ?? [];
  if (Array.isArray(effects) && effects.length > 0) {
    try {
      await runEffects({
        actor,
        source: spell,
        effects,
        activation: spell.system?.activation ?? {},
        rollData: { DICE: mana, SUM: sumValue },
        chatContext: {
          headerIcon: "fa-wand-magic-sparkles",
          headerLabel: spell.name,
          flavor: spell.system?.chatBlurb ?? ""
        }
      });
    } catch (err) {
      console.error("FLAIL | wizard spell effects failed:", err);
    }
  }

  return message;
}

/**
 * Apply the Drained condition to the caster (RAW: one 6 in the cast pool
 * → gain Drained). No-op if the caster already carries Drained (we don't
 * stack). Resolves the condition from the world conditions compendium.
 */
async function applyDrainedCondition(actor) {
  try {
    // Don't stack — if the caster already carries Drained, leave it.
    const already = actor.items?.some(i =>
      i.type === "condition" && (i.name ?? "").toLowerCase() === "drained"
    );
    if (already) {
      ui.notifications?.info(`FLAIL: ${actor.name} rolled a 6 — already Drained, not stacking.`);
      return;
    }
    const pack = game.packs.get("world.flail-conditions");
    if (!pack) {
      ui.notifications?.warn("FLAIL: conditions compendium missing — add Drained manually (one 6 rolled).");
      return;
    }
    const idx = await pack.getIndex();
    const entry = [...idx].find(e => (e.name ?? "").toLowerCase() === "drained");
    if (!entry) {
      ui.notifications?.warn("FLAIL: 'Drained' not found in the conditions compendium — add it manually.");
      return;
    }
    const source = await pack.getDocument(entry._id);
    if (!source) {
      ui.notifications?.warn("FLAIL: could not load the Drained condition — add it manually.");
      return;
    }
    const data = source.toObject();
    delete data._id;
    data.system = data.system ?? {};
    data.system.slotsRequired = 1;

    // Place the Drained condition into an inventory slot. Preference order
    // (RAW: conditions occupy slots): stashed (satchel) → worn (body) →
    // carried (hands). Only zones whose config allows conditions are
    // considered, so with the stock config this is satchel → body; hands
    // is skipped unless its `allowConditions` flag is turned on.
    const slot = findFreeConditionSlot(actor);
    if (slot) {
      data.system.location  = slot.zone;
      data.system.slotIndex = slot.index;
      await actor.createEmbeddedDocuments("Item", [data]);
      ui.notifications?.info(
        `FLAIL: ${actor.name} gains Drained — placed in the ${slot.zoneLabel} (slot ${slot.index + 1}).`
      );
    } else {
      // No free slot anywhere conditions are allowed. Apply it unplaced
      // and signal (persistently) that the player must discard an item
      // to make room, then move Drained into the freed slot.
      data.system.location = "unequipped";
      await actor.createEmbeddedDocuments("Item", [data]);
      ui.notifications?.warn(
        `FLAIL: ${actor.name} gains Drained but every eligible inventory slot is full — ` +
        `discard an item, then drag Drained into the freed slot.`,
        { permanent: true }
      );
    }
    // Defensive re-render so the inventory grid + conditions strip refresh.
    actor.sheet?.render(false);
  } catch (err) {
    console.error("FLAIL | failed to auto-apply Drained:", err);
    ui.notifications?.error("FLAIL: failed to auto-apply Drained — see console.");
  }
}

/**
 * Find the first free inventory slot for a condition, honouring the
 * preference order stashed (satchel) → worn (body) → carried (hands).
 * Only zones whose config sets `allowConditions` are eligible (adornment
 * and, by default, hands are excluded), and locked / occupied slots are
 * skipped. Multi-slot items are accounted for via their column spans.
 *
 * @param {Actor} actor
 * @returns {{zone:string, index:number, zoneLabel:string}|null}
 */
function findFreeConditionSlot(actor) {
  const ORDER = ["satchel", "body", "hands"]; // stashed → worn → carried
  const zonesCfg = FLAIL.inventory?.zones ?? {};
  const avail = actor.system?.slotAvailability ?? {};

  for (const zone of ORDER) {
    const zdef = zonesCfg[zone];
    if (!zdef || zdef.allowConditions === false) continue; // conditions not permitted here
    const slots = avail[zone] ?? [];
    const cols = zdef.columns ?? 1;

    // Build the set of occupied slot indices in this zone, including the
    // extension slots taken by any multi-slot items (idx + i*cols).
    const occupied = new Set();
    for (const it of actor.items) {
      if (it.system?.location !== zone) continue;
      const start = it.system?.slotIndex ?? 0;
      const span  = it.system?.slotsRequired ?? 1;
      for (let i = 0; i < span; i++) occupied.add(start + i * cols);
    }

    for (const s of slots) {
      if (s.locked) continue;
      if (occupied.has(s.index)) continue;
      return { zone, index: s.index, zoneLabel: game.i18n.localize(zdef.label) };
    }
  }
  return null;
}
