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
 * Build the compendium content array at load time by reading from
 * FLAIL.backgrounds. Keeps a single source of truth — if the rulebook
 * entries change, they get updated in config.mjs and re-flow here.
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
      items.push({
        _id: stableBackgroundId(classKey, bg.key),
        name,
        type: "background",
        img: "icons/skills/trades/academics-book-study-purple.webp",
        system: {
          description: `<p>${bg.perk ?? ""}</p>`,
          classKey,
          sourceKey: bg.key,
          isCustomTemplate: false
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
