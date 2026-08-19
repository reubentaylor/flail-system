/**
 * God's Wrath — d10 divine consequences table (FLAIL rulebook p.21).
 *
 * Invoked automatically for:
 *   - Each 6 rolled on a Miracle Call (per word spoken)
 *   - Every fumble on a Divine Prayer roll
 *   - Shadow Demon Lay on Hands fumble
 *
 * The 10 entries are shared across all religions (not religion-specific).
 * v0.4.58 provides the roll helper as a standalone utility; the
 * character-sheet integrations wire it up in v0.4.59.
 */

const GODS_WRATH_TABLE = [
  { roll: 1,  name: "Focus Break",           text: "Lose next round of combat." },
  { roll: 2,  name: "Repentance",            text: "Self-inflict d4 damage." },
  { roll: 3,  name: "Divine Silence",        text: "Cannot cast more prayers today." },
  { roll: 4,  name: "Praying Hands",         text: "Cannot carry weapons today." },
  { roll: 5,  name: "Penitent Donation",     text: "Discard one random item." },
  { roll: 6,  name: "Stiffening Contrition", text: "Cannot move for d6 rounds." },
  { roll: 7,  name: "Atonement",             text: "Self-inflict d8 damage." },
  { roll: 8,  name: "Zealotry",              text: "Must attack nearest ally immediately." },
  { roll: 9,  name: "Blinding Light",        text: "Cannot see for d6 rounds." },
  { roll: 10, name: "Divine Calling",        text: "Roll on the Death Table." }
];

/**
 * Roll God's Wrath and return just the roll + outcome data. Doesn't
 * post a chat card — for callers that render God's Wrath INSIDE
 * their own chat card (cast-prayer, miracle-call). Standalone
 * "roll a Wrath and show it" callers use `rollGodsWrath` below.
 *
 * @returns {Promise<{ roll: Roll, outcome: { roll:number, name:string, text:string } }>}
 */
export async function rollGodsWrathDice() {
  const roll = new Roll("1d10");
  await roll.evaluate();
  const idx = Math.max(1, Math.min(10, roll.total));
  const outcome = GODS_WRATH_TABLE[idx - 1];
  return { roll, outcome };
}

/**
 * Roll on God's Wrath and post a chat card. Returns the outcome so
 * callers can post-process (e.g. entry 10 triggers a separate Death
 * Table roll — currently GM-adjudicated).
 *
 * @param {object} opts
 * @param {Actor|null} opts.actor    Speaker for the chat card (optional).
 * @param {string}     opts.reason   Short label — "Prayer fumble", "Miracle Call (6)", etc.
 * @returns {Promise<{ roll: Roll, outcome: { roll:number, name:string, text:string } }>}
 */
export async function rollGodsWrath({ actor = null, reason = "God's Wrath" } = {}) {
  const { roll, outcome } = await rollGodsWrathDice();
  const idx = outcome.roll;

  const flavor = `
    <div class="flail-chat-card gods-wrath-chat">
      <p><i class="fas fa-bolt"></i> <strong>God's Wrath</strong>${reason ? ` — <em>${reason}</em>` : ""}</p>
      <p>Rolled <strong>${idx}</strong> → <strong>${outcome.name}</strong></p>
      <p>${outcome.text}</p>
      ${idx === 10
        ? `<p class="gods-wrath-death"><i class="fas fa-skull-crossbones"></i> <em>Roll on the Death Table.</em></p>`
        : ""}
    </div>
  `;

  const speaker = actor
    ? ChatMessage.getSpeaker({ actor })
    : ChatMessage.getSpeaker();
  await roll.toMessage({ speaker, flavor });

  return { roll, outcome };
}

/** Exposed for read-only inspection (e.g. by an item sheet reference). */
export function getGodsWrathTable() {
  return [...GODS_WRATH_TABLE];
}
