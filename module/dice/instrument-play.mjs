import { FLAIL } from "../helpers/config.mjs";

/**
 * Play a Bard's instrument.
 *
 * Mechanics:
 *   1. Make a CHA save (roll-under d20 vs CHA).
 *   2. Branch on the save outcome:
 *      - **CRIT (nat 1)** — player chooses any entry from the d10 table.
 *        No follow-up roll; the chat card invites them to pick.
 *      - **Success (≤ CHA, not 1)** — roll 1d4 and consult that row of
 *        the table. The best four entries are accessible on a success.
 *      - **Fail (> CHA, not 20)** — roll 1d10 and consult that row.
 *        The whole table is in play; some entries can backfire.
 *      - **Fumble (nat 20)** — roll 1d6+4 (range 5-10) and consult.
 *        The bottom half of the table — the worst outcomes only.
 *
 * Both rolls (d20 and the follow-up dN) are attached to a single chat
 * message so DSN animates them together and the GM only has to read
 * one card.
 *
 * @param {object} options
 * @param {Actor} options.actor          Bard performing the play.
 * @param {Item}  options.instrument     The instrument Item being played.
 * @param {number}[options.advantage]    Save advantage (+/-) — same convention
 *                                       as `rollSave`. Pass via shift / ctrl
 *                                       from the sheet, or omit.
 * @returns {Promise<ChatMessage|null>}
 */
export async function rollInstrumentPlay({ actor, instrument, advantage = 0 } = {}) {
  if (!actor || !instrument) return null;
  if (instrument.type !== "instrument") {
    ui.notifications?.warn("FLAIL: rollInstrumentPlay requires an instrument item.");
    return null;
  }

  /* ---------- Guard 1: Bard must be carrying the instrument. -------- */
  // Per FLAIL v0.2: "to perform, Bards must carry the instrument." The
  // sheet already hides the play button when the instrument sits
  // outside the dedicated `instruments` zone, but this defensive
  // check catches macro / console invocations that would bypass the
  // UI. Anything stashed in the satchel or unequipped is refused.
  const location = instrument.system?.location ?? "unequipped";
  const CARRIED_LOCATIONS = new Set(["instruments", "hands", "body", "adornment"]);
  if (!CARRIED_LOCATIONS.has(location)) {
    ui.notifications?.warn(
      game.i18n.format("FLAIL.Notify.InstrumentNotCarried", { name: instrument.name })
    );
    return null;
  }

  /* ---------- Guard 2: Instrument must not be "used out". ----------- */
  // Per FLAIL v0.2: "on a fail or fumble, the instrument cannot be
  // played again in the same combat or social situation." Tracked
  // per-instrument via a flag set on the item after a fail or fumble
  // outcome. Cleared on any rest (short / long / full) and via an
  // explicit reset button on the sheet, so a Bard can play again
  // once the group narratively moves to a new scene.
  if (instrument.getFlag("flail", "usedOut")) {
    ui.notifications?.warn(
      game.i18n.format("FLAIL.Notify.InstrumentUsedOut", { name: instrument.name })
    );
    return null;
  }

  const attribute = "cha";
  const attrValue = actor.system.attributes?.[attribute]?.current
                 ?? actor.system.attributes?.[attribute]?.value
                 ?? 0;

  /* ---------- 1. CHA save (d20 roll-under) ---------- */
  const advAbs = Math.min(Math.abs(advantage), 2);
  const numDice = 1 + advAbs;
  let saveFormula;
  if (advantage > 0) saveFormula = `${numDice}d20kl1`;
  else if (advantage < 0) saveFormula = `${numDice}d20kh1`;
  else saveFormula = "1d20";

  const saveRoll = new Roll(saveFormula);
  await saveRoll.evaluate();
  const saveResult = saveRoll.total;

  let outcome;
  if (saveResult === 1) outcome = "crit";
  else if (saveResult === 20) outcome = "fumble";
  else if (saveResult <= attrValue) outcome = "success";
  else outcome = "fail";

  /* ---------- 2. Follow-up table-lookup roll (or none for crit) ---------- */
  let lookupRoll = null;
  let lookupFormula = null;
  let lookupResult = null;
  let entryIndex = null;
  let entryText = null;

  if (outcome !== "crit") {
    if (outcome === "success") {
      lookupFormula = "1d4";   // entries 1–4 (best of the table)
    } else if (outcome === "fail") {
      lookupFormula = "1d10";  // entries 1–10 (whole table in play)
    } else { // fumble
      lookupFormula = "1d6+4"; // entries 5–10 (worst of the table)
    }
    lookupRoll = new Roll(lookupFormula);
    await lookupRoll.evaluate();
    lookupResult = lookupRoll.total;
    entryIndex = lookupResult;
    entryText = (instrument.system.effectTable ?? [])[entryIndex] ?? "";
  }

  /* ---------- 2b. On fail/fumble, mark the instrument used-out. ---------- */
  // Per FLAIL v0.2 the instrument can't be played again in this same
  // combat or social situation. The flag is cleared on any rest via
  // rest.mjs, or manually from the sheet with the reset button.
  if (outcome === "fail" || outcome === "fumble") {
    await instrument.setFlag("flail", "usedOut", true);
  }

  /* ---------- 3. Build chat card ---------- */
  const attrLabel = game.i18n.localize(FLAIL.attributes[attribute].label);
  const templateData = {
    actor: { name: actor.name, img: actor.img, uuid: actor.uuid },
    instrument: {
      id: instrument.id,
      name: instrument.name,
      img: instrument.img,
      effectTable: instrument.system.effectTable ?? []
    },
    attribute,
    attrLabel,
    attrValue,
    advantage,
    saveFormula,
    saveResult,
    saveDice: saveRoll.dice[0].results.map(r => ({ result: r.result, discarded: !!r.discarded })),
    outcome,
    outcomeLabel: game.i18n.localize(FLAIL.saveOutcome?.[outcome]?.label
                                  ?? `FLAIL.SaveOutcome.${outcome}`),
    lookupFormula,
    lookupResult,
    entryIndex,
    entryText,
    // Band the resolved entry landed in — success (1-4) or chaos
    // (5-10). Used by the chat card to tint the entry box so players
    // can see at a glance which side of the table the roll produced.
    // On a crit the player picks any entry, so no band is set.
    entryBand: entryIndex == null ? null : (entryIndex <= 4 ? "success" : "chaos"),
    usedOut: outcome === "fail" || outcome === "fumble"
  };

  const content = await foundry.applications.handlebars.renderTemplate(
    "systems/flail/templates/chat/instrument-play.hbs",
    templateData
  );

  // Both rolls go on the message so DSN animates them together (when
  // present) and the formulas show in the rolls drawer.
  const rolls = lookupRoll ? [saveRoll, lookupRoll] : [saveRoll];

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls,
    content,
    sound: CONFIG.sounds.dice,
    flags: {
      flail: {
        instrumentPlay: {
          instrumentId: instrument.id,
          actorUuid: actor.uuid,
          attribute,
          attrValue,
          saveResult,
          outcome,
          lookupResult,
          entryIndex
        }
      }
    }
  });
}
