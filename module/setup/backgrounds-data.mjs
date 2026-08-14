/**
 * Background item data — bundled Instant Backstory entries per class.
 *
 * Extracted from FLAIL.backgrounds in helpers/config.mjs. The
 * importer creates a world compendium ("Backgrounds") at world init
 * and populates it with one Item per entry, so players can drag them
 * onto characters and GMs can duplicate + edit for homebrew variants.
 *
 * Each entry becomes an Item document of type "background" with:
 *   - name        the "N. label" formatted for the picker
 *   - system.description  perk text (rich HTML)
 *   - system.classKey     "bard", "warrior", etc. (or "" = neutral)
 *   - system.sourceKey    "1"-"6" from the rulebook, or "custom"
 *   - system.isCustomTemplate  true only for the Custom card
 *
 * Also includes a single "Custom Background" template item at the
 * top of the array — picked by players who want to define their
 * own origin. Copies are embedded on the actor and edited freely.
 */
import { FLAIL } from "../helpers/config.mjs";

/**
 * Grant seeds — hand-authored records keyed by "classKey:sourceKey".
 * Each entry is the `system.grants` array for that background. Only
 * populated for backgrounds with clear mechanical hooks; others fall
 * back to the empty array (perk text alone).
 *
 * This is the ONLY place bundled grants live. When the rulebook adds
 * or clarifies a background's mechanics, add/edit entries here and
 * bump BACKGROUNDS_VERSION in import-backgrounds.mjs.
 */
const GRANTS_SEED = {
  // Bard
  "bard:3": [
    { type: "crossClass", crossClassSource: "cleric", crossClassType: "prayer",
      description: "Pick one divine prayer (Cleric)." }
  ],
  "bard:4": [
    { type: "crossClass", crossClassSource: "druid", crossClassType: "gift",
      description: "Pick one bird primal gift (Druid)." }
  ],
  "bard:5": [
    { type: "item", itemName: "Pick Pocket",
      description: "Start with the Pick Pocket talent (Cutthroat)." }
  ],
  "bard:6": [
    { type: "note",
      description: "Add +50 coins to your money. GM: define a family heirloom with the player." }
  ],

  // Bone Whisperer
  "boneWhisperer:1": [
    { type: "note",
      description: "Your Undead Puppets roll Morale saves with advantage — apply when rolling." }
  ],
  "boneWhisperer:2": [
    { type: "note",
      description: "May turn into a bat once per day for a number of turns equal to your level. Track use manually." }
  ],
  "boneWhisperer:3": [
    { type: "crossClass", crossClassSource: "wizard", crossClassType: "spell",
      description: "Pick one Wizard spell (cast using spirit)." }
  ],
  "boneWhisperer:4": [
    { type: "note",
      description: "Start with a mask (define with the GM)." },
    { type: "crossClass", crossClassSource: "druid", crossClassType: "gift",
      description: "Pick one reptile primal gift (Druid)." }
  ],
  "boneWhisperer:5": [
    { type: "note",
      description: "May summon your Undead Puppet at any time once per day. Track use manually." }
  ],
  "boneWhisperer:6": [
    { type: "note",
      description: "Add +1 max spirit at every level (including current). GM: adjust the spirit maximum manually per level-up." }
  ],

  // Cleric
  "cleric:1": [
    { type: "attribute", attrKey: "luck", attrDelta: 1,
      description: "+1 LUCK (adjusts LUCK base modifier)." },
    { type: "item", itemName: "Helm of Mettle",
      description: "Start with Helm of Mettle (rulebook p. 105)." }
  ],
  "cleric:2": [
    { type: "attribute", attrKey: "cha", attrDelta: -1,
      description: "-1 CHA (adjusts CHA base modifier)." },
    { type: "crossClass", crossClassSource: "cleric", crossClassType: "prayer",
      description: "Pick one prayer from a religion other than your own." }
  ],
  "cleric:3": [
    { type: "note",
      description: "TH 5, DMG 2 when attacking bare-handed. Apply manually on unarmed attacks." }
  ],
  "cleric:4": [
    { type: "note",
      description: "Start with darkvision (permanent). Cannot equip iron weapons or armour." },
    { type: "item", itemName: "Listen",
      description: "Start with the Listen talent (Cutthroat)." }
  ],
  "cleric:5": [
    { type: "attribute", attrKey: "luck", attrDelta: -1,
      description: "-1 LUCK (adjusts LUCK base modifier)." },
    { type: "note",
      description: "Ignore the first 6 rolled when performing a Miracle Call. Apply manually." }
  ],
  "cleric:6": [
    { type: "note",
      description: "Start with one basic combat talent (Warrior). Use the Combat Talents picker on the Class tab." }
  ]
  // Other classes: no grants seeded yet — perk text describes what to do.
  // Add entries here as they get playtested.
};

/**
 * Build the compendium content array at load time by reading from
 * FLAIL.backgrounds. Keeps a single source of truth — if the rulebook
 * entries change, they get updated in config.mjs and re-flow here.
 * Grants are pulled from GRANTS_SEED above (keyed by classKey:sourceKey).
 */
export function buildBackgroundsData() {
  const items = [];

  // Custom Background template — appears at the top of every class's
  // picker. Picking it embeds a copy which the player renames + rewrites.
  items.push({
    _id: stableBackgroundId("_custom", "custom"),
    name: "Custom Background",
    type: "background",
    img: "icons/skills/trades/academics-book-study-purple.webp",
    system: {
      description: "<p><em>Define your own origin here.</em> Rename this item and rewrite the perk to match your character's story.</p>",
      classKey: "",
      sourceKey: "custom",
      isCustomTemplate: true
    },
    effects: [],
    folder: null,
    sort: 0
  });

  for (const [classKey, entries] of Object.entries(FLAIL.backgrounds ?? {})) {
    for (const bg of entries) {
      if (bg.key === "custom") continue; // shared template already added above
      const name = `${bg.key}. ${bg.label}`;
      const seed = GRANTS_SEED[`${classKey}:${bg.key}`] ?? [];
      // Every grant needs the full field set (Foundry SchemaField
      // strict-validates). Fill in defaults for anything the seed omits.
      const grants = seed.map(g => ({
        type: g.type ?? "note",
        itemName: g.itemName ?? "",
        attrKey: g.attrKey ?? "",
        attrDelta: g.attrDelta ?? 0,
        crossClassSource: g.crossClassSource ?? "",
        crossClassType: g.crossClassType ?? "",
        description: g.description ?? "",
        applied: false
      }));
      items.push({
        _id: stableBackgroundId(classKey, bg.key),
        name,
        type: "background",
        img: "icons/skills/trades/academics-book-study-purple.webp",
        system: {
          description: `<p>${bg.perk ?? ""}</p>`,
          classKey,
          sourceKey: bg.key,
          isCustomTemplate: false,
          grants
        },
        effects: [],
        folder: null,
        sort: 100 + parseInt(bg.key, 10)
      });
    }
  }
  return items;
}

/**
 * Deterministic 16-char alphanumeric ID from a stable source key.
 * We need stable IDs across imports so the update path can locate
 * previous copies of an entry rather than duplicating them.
 * FNV-1a hash → base36, padded/truncated to 16 chars.
 */
export function stableBackgroundId(classKey, sourceKey) {
  const src = `flail-bg-${classKey}-${sourceKey}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < src.length; i++) {
    hash ^= src.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  hash = hash >>> 0;
  // Two rounds of the hash to fill 16 chars with entropy.
  let hash2 = 0xcbf29ce4;
  for (let i = 0; i < src.length; i++) {
    hash2 ^= src.charCodeAt(i);
    hash2 = Math.imul(hash2, 0x100000001b3 & 0xffffffff);
  }
  hash2 = hash2 >>> 0;
  const s = hash.toString(36).padStart(8, "0") + hash2.toString(36).padStart(8, "0");
  return s.slice(0, 16).padEnd(16, "0");
}
