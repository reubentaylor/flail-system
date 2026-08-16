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
  ],

  // Cutthroat
  "cutthroat:1": [
    { type: "note",
      description: "May use Quick Craft (Tinkerer) once per session. Track use manually." }
  ],
  "cutthroat:2": [
    { type: "crossClass", crossClassSource: "wizard", crossClassType: "spell",
      description: "Pick one random Wizard spell (use LUCK as mana to cast)." },
    { type: "crossClass", crossClassSource: "wizard", crossClassType: "spell",
      description: "Pick a second random Wizard spell (use LUCK as mana to cast)." }
  ],
  "cutthroat:3": [
    { type: "note",
      description: "Start with a random magic ring (GM: pick from ring compendium)." }
  ],
  "cutthroat:4": [
    { type: "crossClass", crossClassSource: "boneWhisperer", crossClassType: "spell",
      description: "Pick one Bone Whisperer spell (use STR as spirit to cast)." },
    { type: "note",
      description: "Start with a little hireling (GM: define with player)." }
  ],
  "cutthroat:5": [
    { type: "item", itemName: "The Dragon Skull",
      description: "Start with The Dragon Skull (rulebook p. 107)." },
    { type: "note",
      description: "Start with a dragon egg (GM: define stats and hatching conditions)." }
  ],
  "cutthroat:6": [
    { type: "note",
      description: "Start with +2d20 coins (roll now) and a monkey familiar (GM: define)." }
  ],

  // Druid
  "druid:1": [
    { type: "crossClass", crossClassSource: "druid", crossClassType: "gift",
      description: "Pick one mammal primal gift." },
    { type: "crossClass", crossClassSource: "druid", crossClassType: "gift",
      description: "Pick a second mammal primal gift." },
    { type: "attribute", attrKey: "dex", attrDelta: 1,
      description: "+1 DEX (adjusts DEX base modifier)." },
    { type: "note",
      description: "Start with a wolf companion (GM: define stats)." }
  ],
  "druid:2": [
    { type: "note",
      description: "May heal self or others d4 hp when surrounded by nature, twice per day. Track uses manually." }
  ],
  "druid:3": [
    { type: "attribute", attrKey: "str", attrDelta: 2,
      description: "+2 STR (adjusts STR base modifier)." },
    { type: "item", itemName: "Speak with Plants",
      description: "May cast Speak with Plants prayer (Cleric)." }
  ],
  "druid:4": [
    { type: "note",
      description: "Start with a plant as companion (hp, TH, dmg equal to Druid level + 3)." }
  ],
  "druid:5": [
    { type: "note",
      description: "Tattoos glow faintly in the presence of unknown magic items. Apply narratively." }
  ],
  "druid:6": [
    { type: "note",
      description: "May stand still and camouflage as plant at will. Apply narratively." }
  ],

  // Tinkerer
  "tinkerer:1": [
    { type: "note",
      description: "Start with an additional 3 construct points (adjust construct sheet manually)." }
  ],
  "tinkerer:2": [
    { type: "note",
      description: "Immune to Exhausted conditions; must oil clockwork heart regularly." }
  ],
  "tinkerer:3": [
    { type: "crossClass", crossClassSource: "cutthroat", crossClassType: "talent",
      description: "Pick one thieving talent (Cutthroat)." }
  ],
  "tinkerer:4": [
    { type: "note",
      description: "Add battle axes to weapon specialty. +2 max hit points (adjust hp track manually)." }
  ],
  "tinkerer:5": [
    { type: "note",
      description: "The construct starts with speech and a built-in bard instrument of choice. Note on the construct sheet." }
  ],
  "tinkerer:6": [
    { type: "item", itemName: "Buzzing Volt",
      description: "Start with Buzzing Volt (rulebook p. 102)." },
    { type: "note",
      description: "Take half damage from electrical sources. Apply manually when relevant." }
  ],

  // Warrior
  "warrior:1": [
    { type: "item", itemName: "Bless",
      description: "May cast Bless prayer (Cleric) once per day." },
    { type: "item", itemName: "Locate Object",
      description: "May cast Locate Object prayer (Cleric) once per day." }
  ],
  "warrior:2": [
    { type: "attribute", attrKey: "str", attrDelta: 1,
      description: "+1 STR (adjusts STR base modifier)." },
    { type: "note",
      description: "+2 hit points (adjust hp track manually). Show loathing for goblins — narrate at the table." }
  ],
  "warrior:3": [
    { type: "note",
      description: "Convert any amount of INT into hit points (adjust manually at any time)." }
  ],
  "warrior:4": [
    { type: "note",
      description: "Start with a random Legendary Weapon inherited from deceased master (GM: pick from unique-items compendium)." },
    { type: "note",
      description: "+2 TH vs Trolls. Apply manually when attacking one." }
  ],
  "warrior:5": [
    { type: "note",
      description: "Start with +50 coins (add to money)." },
    { type: "attribute", attrKey: "cha", attrDelta: 1,
      description: "Signet ring: +1 CHA (adjusts CHA base modifier)." }
  ],
  "warrior:6": [
    { type: "attribute", attrKey: "cha", attrDelta: 2,
      description: "+2 CHA (adjusts CHA base modifier)." },
    { type: "note",
      description: "Start with a map to an ancient arena (GM: define location)." }
  ],

  // Wizard
  "wizard:1": [
    { type: "note",
      description: "May ooze through gaps a human child could fit through. Apply narratively." }
  ],
  "wizard:2": [
    { type: "note",
      description: "Start with a random magic ring (GM: pick from ring compendium)." },
    { type: "attribute", attrKey: "str", attrDelta: -1,
      description: "-1 STR (adjusts STR base modifier)." }
  ],
  "wizard:3": [
    { type: "attribute", attrKey: "luck", attrDelta: 2,
      description: "+2 LUCK (adjusts LUCK base modifier)." },
    { type: "note",
      description: "Take half damage from fire sources. Apply manually when relevant." }
  ],
  "wizard:4": [
    { type: "note",
      description: "May breathe underwater; heal d6 hit points when in water. Track uses manually." }
  ],
  "wizard:5": [
    { type: "note",
      description: "May use one Shadow Arcanum (Cutthroat) guild ability per session. Track use manually." }
  ],
  "wizard:6": [
    { type: "note",
      description: "Start with an expert Brawler Mauler talent of choice (Mighty Clasp or Crushing Blow — Warrior tree). Drag from the Combat Talents compendium onto your character." },
    { type: "note",
      description: "Add axes to weapon specialty." }
  ]
  // All 48 backgrounds now have seed grants (Custom Background remains
  // empty — homebrewers define their own via the item sheet editor).
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
