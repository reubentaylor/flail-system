/**
 * Bundled Warlock Invocations — first-class Foundry Items seeded into
 * the `world.flail-invocations` compendium at world init.
 *
 * Four Dark Pacts × a d10 table each = 40 invocations. Text is verbatim
 * from the Warlock Player Reference Booklet (Andre Novoa, Games
 * Omnivorous, 2026). [DICE] = hit points spent, [SUM] = total rolled;
 * the cast card substitutes them at cast time, exactly like spells.
 *
 * Text-only for now: `effects` is empty, so casting will post the
 * substituted description. Automatable effects can be authored later
 * through the shared effects editor on each item.
 */

/**
 * FNV-1a 32-bit hash → 16-char hex ID. Stable across runs for the same
 * seed, so re-syncing updates the same document. (Identical to
 * stableReligionId / stableMasterId.)
 */
export function stableInvocationId(seed) {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  const first = h.toString(16).padStart(8, "0");
  let h2 = 0x811c9dc5;
  for (let i = 0; i < first.length; i++) {
    h2 ^= first.charCodeAt(i);
    h2 = (h2 + ((h2 << 1) + (h2 << 4) + (h2 << 7) + (h2 << 8) + (h2 << 24))) >>> 0;
  }
  return (first + h2.toString(16).padStart(8, "0")).slice(0, 16);
}

/** Per-pact icon for its invocations. */
const PACT_ICONS = {
  infernalBargain: "icons/magic/fire/explosion-embers-orange.webp",
  voidCovenant:    "icons/magic/perception/eye-tendrils-web-purple.webp",
  draconicAccord:  "icons/magic/fire/projectile-fireball-smoke-orange.webp",
  deathBond:       "icons/magic/death/skull-energy-light-purple.webp"
};

/**
 * The four d10 invocation tables, in booklet order. Each entry is
 * [name, text] or [name, text, suggestedDice] where the text calls for
 * a minimum pool.
 */
export const INVOCATION_TABLES = {
  infernalBargain: [
    ["Black Pyre",            "make a corpse erupt in hellfire dealing [SUM] damage to all Near it."],
    ["Blood Transfer",        "caster recoups [DICE] + [SUM] hit points; chosen ally takes that much in damage."],
    ["Burning Shadow",        "target’s shadow ignites for half [SUM] damage per round, when exposed to light."],
    ["Demonhide",             "conjure a shield that can absorb [SUM] fire damage."],
    ["Devil’s Mark",          "branded target suffers extra half [SUM] damage from all attacks for [DICE] rounds."],
    ["Hellmouth",             "infernal jaws emerge from the ground causing [SUM] damage to one target Nearby."],
    ["Hellbound",             "target cannot flee, teleport or leave the area Near to them for [DICE] rounds."],
    ["Infernal Hunger",       "eat one condition (remove from inventory) if [DICE] + [SUM] is 15 or higher."],
    ["Infernal Resurrection", "return a dead target to life for [SUM] turns (use only once per target)."],
    ["Unholy Form",           "grow horns/claws gaining +[DICE] TH for a third of [DICE] rounds (minimum 3 dice).", 3]
  ],
  voidCovenant: [
    ["Astral Bond",        "all damage taken by caster is transferred to chosen ally for [DICE] rounds."],
    ["Astral Projection",  "caster’s body becomes ethereal for up to [DICE] rounds."],
    ["Black Hole",         "everyone within Distance must save or is pulled to a chosen point for [DICE] rounds."],
    ["Cosmic Horror",      "chosen target of [DICE] level must save or flees in terror."],
    ["Dead Space",         "all sound ceases within Far-Away range for [DICE] rounds."],
    ["Event Horizon",      "chosen object implodes in exactly [SUM] rounds."],
    ["Floating Stones",    "encircle caster causing half [SUM] damage to all Nearby for [DICE] rounds."],
    ["Gravity Disappears", "gravity disperses for [DICE] rounds within Distant range."],
    ["Meteor Shower",      "causes [SUM] damage to all Near impact zone; can be cast from [DICE] x 20’."],
    ["Void Star",          "create a moveable sphere dealing [SUM] damage to all it touches; lasts [DICE] rounds."]
  ],
  draconicAccord: [
    ["Ancient Greed",   "[DICE] chosen targets become obsessed with a chosen object for [DICE] rounds."],
    ["Dragon Pact",     "one ally gains +[DICE] TH for [DICE] rounds; caster loses [SUM] LUCK (recoup 1 per day)."],
    ["Drakeform",       "caster can fly for [DICE] turns, but takes [SUM] damage."],
    ["Fire Breath",     "deal [SUM] damage to all targets in a cone that is [DICE] x 10’ long."],
    ["Flametongue",     "engulf sword in dragonfire granting it +[DICE] DMG for [DICE] rounds."],
    ["Golden Hunger",   "consume [DICE] coins to restore half [SUM] hit points."],
    ["Hoard Radar",     "detect gold within [DICE] x 100’."],
    ["Treasure Sense",  "learn the exact path to the most valuable object within [DICE] x 100’."],
    ["Tyrant’s Roar",   "all adversaries of level [DICE] or less must make a Morale save or flee in dread."],
    ["Wyrmhide",        "caster grows scales that grant Defence [DICE] for [DICE] rounds."]
  ],
  deathBond: [
    ["Corpse Passage",     "enter a corpse and emerge from another within [SUM] × 10’."],
    ["Dead Memories",      "touch a corpse to witness its last [SUM] seconds of life."],
    ["Death’s Reach",      "make an immediate melee attack on any target up to [DICE] × 20’ away."],
    ["Death’s Vessel",     "mutate into Fiend for [DICE] rounds, take [SUM] damage afterwards."],
    ["Faceless One",       "caster may assume the appearance of any target they killed for [DICE] turns."],
    ["False Death",        "appear dead for [SUM] turns; remain aware and wake at will."],
    ["Knowledge of Death", "learn the current hit points of [DICE] creatures in sight."],
    ["Marked for Death",   "target glows silver and takes +[DICE] damage from all attacks for [DICE] rounds."],
    ["The Wager",          "flip coin; on heads, target takes [SUM] x 2 damage; on tails, caster takes [SUM] damage."],
    ["Wake the Undying",   "conjure half [DICE] Skeletons that obey basic commands."]
  ]
};

/** Build the 40 bundled invocation Items. */
export function buildInvocationsData() {
  const out = [];
  for (const [pact, rows] of Object.entries(INVOCATION_TABLES)) {
    rows.forEach(([name, text, minDice], i) => {
      out.push({
        _id: stableInvocationId(`invocation:${pact}:${name}`),
        name,
        type: "invocation",
        img: PACT_ICONS[pact],
        system: {
          description: `<p>${text}</p>`,
          pact,
          tableIndex: i + 1,
          effectFormula: "",
          suggestedDice: minDice ?? 2,
          effects: []
        },
        effects: [],
        folder: null,
        sort: (i + 1) * 100,
        ownership: { default: 0 },
        flags: {}
      });
    });
  }
  return out;
}
