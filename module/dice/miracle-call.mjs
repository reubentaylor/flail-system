import { FLAIL } from "../helpers/config.mjs";

/**
 * Miracle Call (Cleric special skill).
 *
 * Mechanics (from FLAIL rules — Cleric class skills):
 *   - Once per session, the Cleric speaks a wish aloud, thematically
 *     appropriate for their deity.
 *   - Roll d6s equal to the number of words used.
 *   - The miracle always occurs — there's no save, no failure path.
 *   - For each natural 6 rolled, the Cleric must also roll for God's
 *     Wrath (1d10 on FLAIL.godsWrath, the same table used for prayer
 *     fumbles). Multiple 6s mean multiple separate Wrath rolls.
 *
 * Caller is expected to have:
 *   - Verified the Cleric hasn't already used Miracle Call this session
 *     (system.miracleCallUsed === false).
 *   - Collected the word count from the player via a dialog.
 *
 * On success this function flips `system.miracleCallUsed = true` so the
 * sheet shows the button as spent until the player clicks Reset.
 *
 * @param {object} options
 * @param {Actor}  options.actor      Casting Cleric.
 * @param {number} options.wordCount  Number of words in the spoken wish.
 * @returns {Promise<ChatMessage|null>}
 */
export async function rollMiracleCall({ actor, wordCount } = {}) {
  if (!actor) return null;
  if (!Number.isInteger(wordCount) || wordCount < 1) {
    ui.notifications?.warn("FLAIL: Miracle Call needs a word count of 1 or more.");
    return null;
  }

  /* ---------- 1. Roll the Nd6 dice pool ---------- */
  const poolRoll = new Roll(`${wordCount}d6`);
  await poolRoll.evaluate();
  const dieResults = poolRoll.dice[0]?.results.map(r => r.result) ?? [];
  const sixCount = dieResults.filter(r => r === 6).length;

  /* ---------- 2. For each 6, roll one God's Wrath d10 ---------- */
  // Each six = one independent Wrath roll. Duplicates allowed (the GM
  // resolves them in narrative order). Collected as separate Roll
  // instances so DSN animates each one and the rolls drawer shows them.
  const wrathRolls = [];
  const wrathResults = [];
  for (let i = 0; i < sixCount; i++) {
    const wr = new Roll("1d10");
    await wr.evaluate();
    const entry = FLAIL.godsWrath[wr.total - 1] ?? null;
    wrathRolls.push(wr);
    wrathResults.push({
      roll: wr.total,
      name: entry?.name ?? "?",
      text: entry?.text ?? ""
    });
  }

  /* ---------- 3. Mark Miracle Call as spent ---------- */
  await actor.update({ "system.miracleCallUsed": true });

  /* ---------- 4. Build chat card ---------- */
  const templateData = {
    actor: { name: actor.name, img: actor.img, uuid: actor.uuid },
    wordCount,
    dice: dieResults,
    sixCount,
    wrathResults
  };

  const content = await foundry.applications.handlebars.renderTemplate(
    "systems/flail/templates/chat/miracle-call.hbs",
    templateData
  );

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: [poolRoll, ...wrathRolls],
    content,
    sound: CONFIG.sounds.dice,
    flags: {
      flail: {
        miracleCall: {
          actorUuid: actor.uuid,
          wordCount,
          sixCount,
          wrathResults
        }
      }
    }
  });
}
