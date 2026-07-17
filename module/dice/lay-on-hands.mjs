import { FLAIL } from "../helpers/config.mjs";

/**
 * Lay on Hands (Cleric special skill).
 *
 * Mechanics (from FLAIL rules — Cleric class skills):
 *   - Cleric spends a round touching the target.
 *   - Make a LUCK save (roll-under d20 vs LUCK).
 *   - The fumble threshold is the SAME tracker as prayer casts —
 *     `system.resource.value` — because "Lay on Hands is a Divine
 *     Prayer for fumbling purposes". So fails and fumbles bump the
 *     threshold down by one, just like prayers, until long rest.
 *
 * Outcomes:
 *   • Success / Crit (roll ≤ LUCK, roll < threshold)
 *       → target heals d6 + cleric's current level.
 *       → no threshold change.
 *   • Fail (roll > LUCK, roll < threshold)
 *       → no heal; threshold drops by 1.
 *   • Fumble (roll ≥ threshold)
 *       → no heal; threshold drops by 1; the religion-specific Lay on
 *         Hands fumble effect is announced. UNLIKE prayer fumbles,
 *         this does NOT trigger God's Wrath — each religion has its
 *         own LoH fumble entry (defined in FLAIL.religions[k].layOnHandsFumble).
 *
 * Why no God's Wrath here: the rule "On a fumble, they suffer
 * consequences as per the Cleric's religion" points at each religion's
 * own LoH fumble text. Three of the four religions have non–God's-Wrath
 * consequences (lost coins, mutton transformation, vine entanglement);
 * only Shadow Demon's LoH-fumble entry happens to say "roll on God's
 * Wrath". So the religion's text IS the authoritative consequence,
 * already including the God's Wrath cross-reference where appropriate.
 *
 * @param {object} options
 * @param {Actor} options.actor          Casting Cleric.
 * @param {Actor} options.target         Target actor receiving the touch.
 * @returns {Promise<ChatMessage|null>}
 */
export async function rollLayOnHands({ actor, target } = {}) {
  if (!actor || !target) return null;

  /* ---------- 1. Resolve cleric + threshold ---------- */
  const luck = actor.system.attributes?.luck?.current
            ?? actor.system.attributes?.luck?.value
            ?? 0;
  const storedThreshold = actor.system.resource?.value ?? 0;
  const threshold = (storedThreshold >= 1 && storedThreshold <= 20)
    ? storedThreshold
    : 20;
  const level = actor.system.level ?? 1;
  const religionKey = actor.system.classOptions?.religion ?? "";
  const religion    = FLAIL.religions[religionKey] ?? null;

  /* ---------- 2. Roll the LUCK save ---------- */
  const saveRoll = new Roll("1d20");
  await saveRoll.evaluate();
  const result = saveRoll.total;

  let outcome;
  if (result === 1)             outcome = "crit";
  else if (result >= threshold)  outcome = "fumble";
  else if (result <= luck)      outcome = "success";
  else                           outcome = "fail";

  /* ---------- 3. Threshold bump on fail/fumble ---------- */
  const newThreshold = (outcome === "fail" || outcome === "fumble")
    ? Math.max(1, threshold - 1)
    : threshold;
  if (newThreshold !== threshold) {
    await actor.update({ "system.resource.value": newThreshold });
  }

  /* ---------- 4. On success, roll the heal and apply ---------- */
  let healRoll = null;
  let healAmount = 0;
  let targetHpBefore = null;
  let targetHpAfter  = null;
  if (outcome === "success" || outcome === "crit") {
    healRoll = new Roll(`1d6 + ${level}`);
    await healRoll.evaluate();
    healAmount = healRoll.total;
    targetHpBefore = target.system?.hp?.value ?? 0;
    // Use the actor's heal() helper if available (clamps at max HP).
    if (typeof target.heal === "function") {
      await target.heal(healAmount);
    } else {
      const max = target.system?.hp?.max ?? targetHpBefore;
      await target.update({
        "system.hp.value": Math.min(max, targetHpBefore + healAmount)
      });
    }
    targetHpAfter = target.system?.hp?.value ?? targetHpBefore;
  }

  /* ---------- 5. Build chat card ---------- */
  const templateData = {
    actor:  { name: actor.name, img: actor.img, uuid: actor.uuid },
    target: { name: target.name, img: target.img, uuid: target.uuid },
    luck,
    level,
    threshold,
    newThreshold,
    thresholdDropped: newThreshold !== threshold,
    result,
    outcome,
    heal: healRoll ? {
      formula: `1d6 + ${level}`,
      amount: healAmount,
      hpBefore: targetHpBefore,
      hpAfter:  targetHpAfter
    } : null,
    fumbleText: outcome === "fumble"
      ? (religion?.layOnHandsFumble ?? "Suffer consequences as per the Cleric's religion.")
      : null,
    religionLabel: religion?.label ?? ""
  };

  const content = await foundry.applications.handlebars.renderTemplate(
    "systems/flail/templates/chat/lay-on-hands.hbs",
    templateData
  );

  const rolls = healRoll ? [saveRoll, healRoll] : [saveRoll];

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls,
    content,
    sound: CONFIG.sounds.dice,
    flags: {
      flail: {
        layOnHands: {
          actorUuid: actor.uuid,
          targetUuid: target.uuid,
          result,
          outcome,
          threshold,
          newThreshold,
          healAmount
        }
      }
    }
  });
}
