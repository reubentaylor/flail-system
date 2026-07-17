import { FLAIL } from "../helpers/config.mjs";

/**
 * Cast a dark spell.
 *
 * Mechanics (from FLAIL rules — Dark Arts):
 *   - Spend N spirit, where 1 ≤ N ≤ min(INT, current spirit). N is the
 *     number of d6 to roll for the cast.
 *   - Resolve the cast as the spell text describes: [DICE] = N,
 *     [SUM] = sum of all d6 rolled.
 *   - Side effects scale with the count of natural 6s in the pool:
 *       • 1 six   → caster gains the **Drained** condition.
 *       • 2 sixes → roll d10 on the Bone Whisperer Side Effects table
 *                   and resolve that entry.
 *       • 3+ sixes → caster becomes an undead monster and is retired.
 *
 * The function rolls the cast pool, deducts the spirit, builds a chat
 * card, and (if applicable) rolls the side-effects d10. Drained gains
 * are NOT applied automatically — the chat card surfaces a "Gain
 * Drained" button instead, since condition application is a deliberate
 * GM choice in this system. Retire is also surfaced as a notification
 * for the GM rather than auto-deleting the actor.
 *
 * @param {object} options
 * @param {Actor} options.actor          Casting Bone Whisperer.
 * @param {Item}  options.spell          Spell Item being cast.
 * @param {number} options.spirit        Amount of spirit to spend (= dice rolled).
 * @returns {Promise<ChatMessage|null>}
 */
export async function rollDarkSpell({ actor, spell, spirit } = {}) {
  if (!actor || !spell) return null;
  if (!Number.isInteger(spirit) || spirit < 1) {
    ui.notifications?.warn("FLAIL: invalid spirit amount.");
    return null;
  }

  // Cap spirit at what's available right now — defensive against stale UI.
  const available = Math.min(
    actor.system.attributes?.int?.current ?? 0,
    actor.system.resource?.value ?? 0
  );
  if (spirit > available) {
    ui.notifications?.warn(
      game.i18n.format("FLAIL.Notify.NotEnoughSpirit", { available })
    );
    return null;
  }

  /* ---------- 1. Roll the cast pool ---------- */
  const castRoll = new Roll(`${spirit}d6`);
  await castRoll.evaluate();
  const dieResults = castRoll.dice[0]?.results.map(r => r.result) ?? [];
  const sumValue = dieResults.reduce((a, b) => a + b, 0);
  const sixCount = dieResults.filter(r => r === 6).length;

  /* ---------- 2. Determine side effect ---------- */
  // 0 sixes  → no side effect (cast resolves cleanly).
  // 1 six    → Drained (the caster gains a stack of the condition).
  // 2 sixes  → roll d10 on the side-effects table.
  // 3+ sixes → caster becomes undead and is retired.
  let sideEffect = null;
  let sideEffectRoll = null;
  if (sixCount === 1) {
    sideEffect = { kind: "drained" };
  } else if (sixCount === 2) {
    sideEffectRoll = new Roll("1d10");
    await sideEffectRoll.evaluate();
    const idx = sideEffectRoll.total;
    const entry = FLAIL.boneWhispererSideEffects[idx - 1] ?? null;
    sideEffect = {
      kind: "table",
      result: idx,
      entry
    };
  } else if (sixCount >= 3) {
    sideEffect = { kind: "retire" };
  }

  /* ---------- 3. Spend the spirit ---------- */
  const newSpirit = Math.max(0, (actor.system.resource?.value ?? 0) - spirit);
  await actor.update({ "system.resource.value": newSpirit });

  /* ---------- 4. Build chat card ---------- */
  const templateData = {
    actor: { name: actor.name, img: actor.img, uuid: actor.uuid },
    spell: {
      id: spell.id,
      name: spell.name,
      img: spell.img,
      description: spell.system?.description ?? "",
      formula: spell.system?.effectFormula ?? ""
    },
    spirit,
    spiritRemaining: newSpirit,
    dice: dieResults,
    sum: sumValue,
    sixCount,
    sideEffect
  };

  const content = await foundry.applications.handlebars.renderTemplate(
    "systems/flail/templates/chat/cast-dark-spell.hbs",
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
        darkSpellCast: {
          spellId: spell.id,
          actorUuid: actor.uuid,
          spirit,
          sum: sumValue,
          sixCount,
          sideEffect
        }
      }
    }
  });
}
