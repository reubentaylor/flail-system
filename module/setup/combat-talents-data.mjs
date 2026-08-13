/**
 * Combat Talent item data — bundled trees per Warrior specialty.
 *
 * Extracted from FLAIL.combatTalents.trees in helpers/config.mjs.
 * The importer creates a world compendium ("Combat Talents") at
 * world init and populates it with one Item per talent, so players
 * can drag them onto characters and GMs can create homebrew talents.
 *
 * Each entry becomes an Item document of type "combatTalent" with:
 *   - name              the talent label ("Fine Cuts")
 *   - system.description  rules text (rich HTML)
 *   - system.tree, treeLabel, tier, prerequisite, sourceKey
 *
 * Also includes a "Custom Combat Talent" template at the top for
 * homebrew — copies are embedded on the actor and edited freely.
 */
import { FLAIL } from "../helpers/config.mjs";

const TIER_ICONS = {
  basic:  "icons/skills/melee/weapons-crossed-swords-yellow.webp",
  expert: "icons/skills/melee/weapons-crossed-swords-purple.webp",
  master: "icons/skills/melee/weapons-crossed-swords-black-gray.webp"
};

export function buildCombatTalentsData() {
  const items = [];

  // Custom template
  items.push({
    _id: stableCombatTalentId("custom"),
    name: "Custom Combat Talent",
    type: "combatTalent",
    img: TIER_ICONS.basic,
    system: {
      description: "<p><em>Define your own combat talent.</em> Set the tree, tier, and prerequisite on the item sheet, then rename + rewrite freely.</p>",
      tree: "custom",
      treeLabel: "Custom",
      tier: "basic",
      prerequisite: "",
      sourceKey: "custom",
      slotIndex: 0,
      isCustomTemplate: true
    },
    effects: [],
    folder: null,
    sort: 0
  });

  let sort = 100;
  for (const tree of FLAIL.combatTalents?.trees ?? []) {
    // Basic
    items.push({
      _id: stableCombatTalentId(tree.basic.key),
      name: tree.basic.label,
      type: "combatTalent",
      img: TIER_ICONS.basic,
      system: {
        description: `<p>${tree.basic.desc ?? ""}</p>`,
        tree: tree.key,
        treeLabel: tree.label,
        tier: "basic",
        prerequisite: "",
        sourceKey: tree.basic.key,
        slotIndex: 0,
        isCustomTemplate: false
      },
      effects: [],
      folder: null,
      sort: sort++
    });

    for (const expert of tree.experts ?? []) {
      items.push({
        _id: stableCombatTalentId(expert.key),
        name: expert.label,
        type: "combatTalent",
        img: TIER_ICONS.expert,
        system: {
          description: `<p>${expert.desc ?? ""}</p>`,
          tree: tree.key,
          treeLabel: tree.label,
          tier: "expert",
          prerequisite: tree.basic.key,
          sourceKey: expert.key,
          slotIndex: 0,
          isCustomTemplate: false
        },
        effects: [],
        folder: null,
        sort: sort++
      });

      for (const master of expert.masters ?? []) {
        items.push({
          _id: stableCombatTalentId(master.key),
          name: master.label,
          type: "combatTalent",
          img: TIER_ICONS.master,
          system: {
            description: `<p>${master.desc ?? ""}</p>`,
            tree: tree.key,
            treeLabel: tree.label,
            tier: "master",
            prerequisite: expert.key,
            sourceKey: master.key,
            slotIndex: 0,
            isCustomTemplate: false
          },
          effects: [],
          folder: null,
          sort: sort++
        });
      }
    }
  }

  return items;
}

/**
 * Deterministic 16-char alphanumeric ID from a stable source key.
 */
export function stableCombatTalentId(sourceKey) {
  const src = `flail-ct-${sourceKey}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < src.length; i++) {
    hash ^= src.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  hash = hash >>> 0;
  let hash2 = 0xcbf29ce4;
  for (let i = 0; i < src.length; i++) {
    hash2 ^= src.charCodeAt(i);
    hash2 = Math.imul(hash2, 0x100000001b3 & 0xffffffff);
  }
  hash2 = hash2 >>> 0;
  const s = hash.toString(36).padStart(8, "0") + hash2.toString(36).padStart(8, "0");
  return s.slice(0, 16).padEnd(16, "0");
}
