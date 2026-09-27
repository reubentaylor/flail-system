/**
 * Combat Tree seed data (v0.4.95, Ship 1).
 * Generates 4 canonical trees + Custom Tree template.
 */

import { FLAIL } from "../helpers/config.mjs";
import { stableCombatTalentId } from "./combat-talents-data.mjs";

const TREE_IMG = "icons/skills/melee/weapons-crossed-swords-yellow.webp";

function talentUuid(sourceKey) {
  const id = stableCombatTalentId(sourceKey);
  return `Compendium.world.flail-combat-talents.Item.${id}`;
}

export function stableCombatTreeId(treeKey) {
  const src = `flail-ctree-${treeKey}`;
  let h1 = 0x811c9dc5;
  let h2 = 0xcbf29ce4;
  for (let i = 0; i < src.length; i++) {
    h1 ^= src.charCodeAt(i);
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= src.charCodeAt(i);
    h2 = Math.imul(h2, 0x100000001b3 & 0xffffffff);
  }
  h1 = h1 >>> 0;
  h2 = h2 >>> 0;
  return (h1.toString(36).padStart(8, "0")
        + h2.toString(36).padStart(8, "0")).slice(0, 16).padEnd(16, "0");
}

function blankTreeSystem() {
  return {
    description: "", weaponRestrictionHint: "", isCustomTemplate: false,
    basicUuid: "", basicName: "", basicSourceKey: "",
    expert1Uuid: "", expert1Name: "", expert1SourceKey: "",
    master1aUuid: "", master1aName: "", master1aSourceKey: "",
    master1bUuid: "", master1bName: "", master1bSourceKey: "",
    expert2Uuid: "", expert2Name: "", expert2SourceKey: "",
    master2aUuid: "", master2aName: "", master2aSourceKey: "",
    master2bUuid: "", master2bName: "", master2bSourceKey: "",
    basicPicked: false, expert1Picked: false,
    master1aPicked: false, master1bPicked: false,
    expert2Picked: false, master2aPicked: false, master2bPicked: false
  };
}

export function buildCombatTreesData() {
  const items = [];

  items.push({
    _id: stableCombatTreeId("custom"),
    name: "Custom Combat Tree (Template)",
    type: "combatTree",
    img: TREE_IMG,
    system: {
      ...blankTreeSystem(),
      description: "<p><em>Duplicate this tree and rewrite it to author your own.</em></p><p>Drag talents from the <em>Combat Talents</em> compendium onto each of the seven slots.</p>",
      isCustomTemplate: true
    },
    folder: null,
    sort: 0
  });

  let sort = 100;
  const trees = FLAIL?.combatTalents?.trees ?? [];
  for (const tree of trees) {
    const basic = tree.basic;
    const expert1 = tree.experts?.[0];
    const expert2 = tree.experts?.[1];
    const master1a = expert1?.masters?.[0];
    const master1b = expert1?.masters?.[1];
    const master2a = expert2?.masters?.[0];
    const master2b = expert2?.masters?.[1];

    items.push({
      _id: stableCombatTreeId(tree.key),
      name: tree.label,
      type: "combatTree",
      img: TREE_IMG,
      system: {
        ...blankTreeSystem(),
        description: `<p>${tree.hint ?? ""}</p>`,
        weaponRestrictionHint: tree.hint ?? "",
        basicUuid: basic ? talentUuid(basic.key) : "",
        basicName: basic?.label ?? "",
        basicSourceKey: basic?.key ?? "",
        expert1Uuid: expert1 ? talentUuid(expert1.key) : "",
        expert1Name: expert1?.label ?? "",
        expert1SourceKey: expert1?.key ?? "",
        master1aUuid: master1a ? talentUuid(master1a.key) : "",
        master1aName: master1a?.label ?? "",
        master1aSourceKey: master1a?.key ?? "",
        master1bUuid: master1b ? talentUuid(master1b.key) : "",
        master1bName: master1b?.label ?? "",
        master1bSourceKey: master1b?.key ?? "",
        expert2Uuid: expert2 ? talentUuid(expert2.key) : "",
        expert2Name: expert2?.label ?? "",
        expert2SourceKey: expert2?.key ?? "",
        master2aUuid: master2a ? talentUuid(master2a.key) : "",
        master2aName: master2a?.label ?? "",
        master2aSourceKey: master2a?.key ?? "",
        master2bUuid: master2b ? talentUuid(master2b.key) : "",
        master2bName: master2b?.label ?? "",
        master2bSourceKey: master2b?.key ?? ""
      },
      folder: null,
      sort: sort++
    });
  }

  return items;
}
