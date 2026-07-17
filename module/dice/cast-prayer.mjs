import { FLAIL } from "../helpers/config.mjs";

/**
 * Cast a divine prayer.
 *
 * Mechanics (from FLAIL rules — Religions / Prayers):
 *   - Caller must already have verified the cleric is carrying or
 *     wearing their holy symbol; this function assumes that gate has
 *     passed.
 *   - The cast is resolved by a LUCK save (roll-under d20 vs the
 *     cleric's current LUCK).
 *   - Fumble threshold starts at 20 (only natural 20 fumbles) and
 *     drops by 1 each time a prayer falters. A long rest resets it
 *     to 20 — the player manages that via the +/- buttons on the
 *     Fumble Range tracker.
 *
 * Outcomes:
 *   • Success (roll ≤ LUCK, but roll < threshold)
 *       → the prayer takes effect; chat card displays the prayer
 *         description verbatim (substituting [LEVEL] with the
 *         cleric's current level).
 *   • Fail (roll > LUCK, but roll < threshold)
 *       → prayer falters; the fumble threshold drops by 1.
 *   • Fumble (roll ≥ threshold)
 *       → prayer fumbles spectacularly; rolls 1d10 on the God's Wrath
 *         table, AND the threshold drops by 1 (fumbles are still fails).
 *
 * Threshold persistence: stored on `actor.system.resource.value`, which
 * the Cleric character sheet already exposes as a d20 tracker labelled
 * "Fumble Range". The value represents the LOWEST roll that fumbles.
 *
 * @param {object} options
 * @param {Actor} options.actor       Casting Cleric.
 * @param {Item}  options.prayer      Prayer Item being cast.
 * @returns {Promise<ChatMessage|null>}
 */
export async function rollPrayer({ actor, prayer } = {}) {
  if (!actor || !prayer) return null;

  /* ---------- 1. Resolve cleric stats ---------- */
  const luck = actor.system.attributes?.luck?.current
            ?? actor.system.attributes?.luck?.value
            ?? 0;
  // Threshold defaults to 20 if unset / out-of-range — protects against
  // legacy characters with resource.value still at 0 from before this
  // feature existed, and against the player accidentally setting it
  // outside the 1-20 band.
  const storedThreshold = actor.system.resource?.value ?? 0;
  const threshold = (storedThreshold >= 1 && storedThreshold <= 20)
    ? storedThreshold
    : 20;
  const level = actor.system.level ?? 1;

  /* ---------- 2. Roll the LUCK save ---------- */
  const saveRoll = new Roll("1d20");
  await saveRoll.evaluate();
  const result = saveRoll.total;

  // Outcome classification. Fumble takes precedence over fail.
  let outcome;
  if (result === 1)            outcome = "crit";
  else if (result >= threshold) outcome = "fumble";
  else if (result <= luck)     outcome = "success";
  else                          outcome = "fail";

  /* ---------- 3. Apply threshold bump if needed ---------- */
  // Fails AND fumbles both bump the threshold (a fumble is itself a fail
  // per the FLAIL save mechanics — the rulebook's "after three failed
  // prayers" example treats them uniformly).
  const newThreshold = (outcome === "fail" || outcome === "fumble")
    ? Math.max(1, threshold - 1)
    : threshold;
  if (newThreshold !== threshold) {
    await actor.update({ "system.resource.value": newThreshold });
  }

  /* ---------- 4. On fumble, roll God's Wrath ---------- */
  let wrathRoll = null;
  let wrathEntry = null;
  if (outcome === "fumble") {
    wrathRoll = new Roll("1d10");
    await wrathRoll.evaluate();
    wrathEntry = FLAIL.godsWrath[wrathRoll.total - 1] ?? null;
  }

  /* ---------- 5. Substitute [LEVEL] in prayer description ---------- */
  const rawDesc = prayer.system?.description ?? "";
  // The rulebook embeds [LEVEL] tokens that mean "the cleric's current
  // level". Substitute at cast time so the chat card shows concrete
  // numbers — e.g. "[LEVEL] allies Nearby get +1 To Hit" → "2 allies".
  const filledDesc = rawDesc.replace(/\[LEVEL\]/g, String(level));

  /* ---------- 6. Build chat card ---------- */
  const religionKey = prayer.system?.religion ?? "";
  const religion    = FLAIL.religions[religionKey] ?? null;

  const templateData = {
    actor: { name: actor.name, img: actor.img, uuid: actor.uuid },
    prayer: {
      id: prayer.id,
      name: prayer.name,
      img: prayer.img,
      description: filledDesc,
      religionLabel: religion?.label ?? religionKey
    },
    luck,
    level,
    threshold,
    newThreshold,
    thresholdDropped: newThreshold !== threshold,
    result,
    outcome,
    wrath: wrathEntry ? {
      roll: wrathRoll.total,
      name: wrathEntry.name,
      text: wrathEntry.text
    } : null
  };

  const content = await foundry.applications.handlebars.renderTemplate(
    "systems/flail/templates/chat/cast-prayer.hbs",
    templateData
  );

  // Attach both rolls (save + wrath if any) to the same chat message so
  // DSN animates both and the rolls drawer shows both formulas.
  const rolls = wrathRoll ? [saveRoll, wrathRoll] : [saveRoll];

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls,
    content,
    sound: CONFIG.sounds.dice,
    flags: {
      flail: {
        prayerCast: {
          prayerId: prayer.id,
          actorUuid: actor.uuid,
          result,
          outcome,
          threshold,
          newThreshold,
          wrath: wrathEntry ? { roll: wrathRoll.total, name: wrathEntry.name } : null
        }
      }
    }
  });
}
