/**
 * Compendium organization (v0.4.75).
 *
 * Sidebar folder structure: 4 top-level folders + per-class nesting
 * under "FLAIL Class Features". Each of the system's 19 world
 * compendia is assigned to the correct sidebar folder.
 *
 * In-pack folder structure: for packs where an obvious data axis
 * exists (backgrounds → classKey, divine prayers → religion,
 * common-items → item.type), items in the pack root get sorted
 * into named folders. Items already in a folder are left alone —
 * the GM's manual organization is preserved.
 *
 * Contract:
 *   - GM-only, one-shot per version bump
 *   - Version-gated via game.settings "compendiumOrgVersion"
 *   - "Don't clobber" — packs with an existing folder assignment
 *     are skipped; items already in an in-pack folder are skipped
 *   - Failures on any single pack are logged, not thrown; a failure
 *     never blocks world load
 */

export const ORGANIZATION_VERSION = 4;

const VERSION_SETTING = "compendiumOrgVersion";

/* -------------------------------------------------------------------- */
/*  Sidebar folder structure                                             */
/* -------------------------------------------------------------------- */

/**
 * Declarative sidebar folder tree. Each entry: { path, color }.
 * The path is slash-separated; parents are created first.
 */
const SIDEBAR_FOLDERS = [
  { path: "FLAIL Rules Content",                       color: "#6a4d0e" },
  { path: "FLAIL Class Features",                      color: "#2f4e21" },
  { path: "FLAIL Class Features/Any Class",            color: "#4c7d3a" },
  { path: "FLAIL Class Features/Bard",                 color: "#4c7d3a" },
  { path: "FLAIL Class Features/Bone Whisperer",       color: "#4c7d3a" },
  { path: "FLAIL Class Features/Cleric",               color: "#4c7d3a" },
  { path: "FLAIL Class Features/Cutthroat",            color: "#4c7d3a" },
  { path: "FLAIL Class Features/Druid",                color: "#4c7d3a" },
  { path: "FLAIL Class Features/Tinkerer",             color: "#4c7d3a" },
  { path: "FLAIL Class Features/Warrior",              color: "#4c7d3a" },
  { path: "FLAIL Class Features/Wizard",               color: "#4c7d3a" },
  { path: "FLAIL Bestiary",                            color: "#7a2626" },
  { path: "FLAIL GM Tools",                            color: "#4a2470" }
];

/**
 * Pack short-name → sidebar folder path. Every world compendium
 * listed here gets assigned to that folder if not already placed.
 */
const PACK_FOLDER_ASSIGNMENTS = {
  "flail-common-items":     "FLAIL Rules Content",
  "flail-unique-items":     "FLAIL Rules Content",
  "flail-potions":          "FLAIL Rules Content",
  "flail-scrolls":          "FLAIL Rules Content",
  "flail-conditions":       "FLAIL Rules Content",
  "flail-backgrounds":      "FLAIL Class Features/Any Class",
  "flail-dark-spells":      "FLAIL Class Features/Bone Whisperer",
  "flail-religions":        "FLAIL Class Features/Cleric",
  "flail-divine-prayers":   "FLAIL Class Features/Cleric",
  "flail-guilds":           "FLAIL Class Features/Cutthroat",
  "flail-thieving-talents": "FLAIL Class Features/Cutthroat",
  "flail-primal-gifts":     "FLAIL Class Features/Druid",
  "flail-tinkerer-gadgets": "FLAIL Class Features/Tinkerer",
  "flail-combat-talents":   "FLAIL Class Features/Warrior",
  "flail-wizard-spells":    "FLAIL Class Features/Wizard",
  "flail-bestiary":         "FLAIL Bestiary",
  "flail-hexcrawl-tables":  "FLAIL GM Tools",
  "flail-rolltables":       "FLAIL GM Tools",
  "flail-macros":           "FLAIL GM Tools"
};

/* -------------------------------------------------------------------- */
/*  In-pack folder specs                                                 */
/* -------------------------------------------------------------------- */

/**
 * Per-pack in-compendium folder specifications.
 * Each spec:
 *   pack     — compendium short name
 *   deriveFolder(item) — returns folder name (or null to skip)
 *   folderNames — canonical list of expected folder names (created upfront)
 */
const IN_PACK_FOLDER_SPECS = [
  {
    pack: "flail-backgrounds",
    docType: "Item",
    folderNames: [
      "Bard", "Bone Whisperer", "Cleric", "Cutthroat",
      "Druid", "Tinkerer", "Warrior", "Wizard"
    ],
    deriveFolder(item) {
      const classKey = item.system?.classKey ?? "";
      const map = {
        bard: "Bard", boneWhisperer: "Bone Whisperer", cleric: "Cleric",
        cutthroat: "Cutthroat", druid: "Druid", tinkerer: "Tinkerer",
        warrior: "Warrior", wizard: "Wizard"
      };
      return map[classKey] ?? null;
    }
  },
  {
    pack: "flail-divine-prayers",
    docType: "Item",
    folderNames: [
      "Brotherhood of Saint Mendicant",
      "Crusade of the Mutton Chalice",
      "Cult of the Shadow Demon",
      "Order of the Verdant Grove"
    ],
    deriveFolder(item) {
      const religion = item.system?.religion ?? "";
      const map = {
        brotherhood:  "Brotherhood of Saint Mendicant",
        crusade:      "Crusade of the Mutton Chalice",
        shadowDemon:  "Cult of the Shadow Demon",
        verdantGrove: "Order of the Verdant Grove"
      };
      return map[religion] ?? null;
    }
  },
  {
    pack: "flail-common-items",
    docType: "Item",
    folderNames: [
      "Weapons", "Armour", "Gear", "Adornments", "Instruments", "Other"
    ],
    deriveFolder(item) {
      switch (item.type) {
        case "weapon":     return "Weapons";
        case "armour":     return "Armour";
        case "gear":       return "Gear";
        case "instrument": return "Instruments";
        default:           return "Other";
      }
    }
  },
  {
    // Phase 2 (v0.4.76): bestiary by category. Categories are
    // dynamic — homebrew NPCs may introduce new category names, so
    // folderNames is empty here and enumerated live from items.
    // NOTE: category lives on `flags.flail.category` (not
    // system.category — that's on weapon items embedded on actors).
    pack: "flail-bestiary",
    docType: "Actor",
    folderNames: [],
    dynamicFolderNames: true,
    deriveFolder(item) {
      const cat = (item.getFlag?.("flail", "category") ?? item.flags?.flail?.category ?? "").trim();
      return cat || "Other";
    }
  },
  {
    // Phase 2: combat talents by tree. Warrior specialty schools.
    pack: "flail-combat-talents",
    docType: "Item",
    folderNames: [
      "Blade Freak", "Brawler Mauler", "Archer Master",
      "Martial Artist", "Custom Template"
    ],
    deriveFolder(item) {
      const tree = item.system?.tree ?? "";
      const map = {
        bladeFreak:    "Blade Freak",
        brawlerMauler: "Brawler Mauler",
        archerMaster:  "Archer Master",
        martialArtist: "Martial Artist",
        custom:        "Custom Template"
      };
      return map[tree] ?? null;
    }
  },
  {
    // Phase 2: wizard spells by tradition. Traditions currently seen:
    // arcane, flame, illusion, ooze, shadow. Dynamic so homebrew
    // traditions get their own folder.
    pack: "flail-wizard-spells",
    docType: "Item",
    folderNames: [],
    dynamicFolderNames: true,
    deriveFolder(item) {
      const t = (item.system?.tradition ?? "").trim();
      if (!t) return "Other";
      // Title-case the tradition key.
      return t.charAt(0).toUpperCase() + t.slice(1);
    }
  },
  {
    // Phase 2: rolltables grouped by domain (name-based heuristic).
    pack: "flail-rolltables",
    docType: "RollTable",
    folderNames: [
      "Core", "Dungeons", "Dungeon Rooms", "Caves",
      "Wizard Towers", "Cities", "Potions"
    ],
    deriveFolder(item) {
      const n = item.name ?? "";
      if (n.startsWith("Dungeons:")) return "Dungeons";
      if (["Puzzle", "Obstacle", "Trap", "Anomaly"].includes(n)) return "Dungeon Rooms";
      if (n.startsWith("Wizard Towers:")) return "Wizard Towers";
      if (n.startsWith("Caves:") || n.startsWith("Cave Chamber") || n.startsWith("Cave Tunnel")) return "Caves";
      if (n.startsWith("City ") || n.startsWith("Tavern ") || n.endsWith("Buildings")) return "Cities";
      if (n.endsWith("Potions")) return "Potions";
      if (["Death Table", "Crossing a Hex", "Reactions", "Weather"].includes(n)) return "Core";
      return null;
    }
  },
  {
    // Phase 2: hexcrawl tables grouped by section.
    pack: "flail-hexcrawl-tables",
    docType: "RollTable",
    folderNames: ["Locations", "Landmarks", "Factions", "Events & Rumours"],
    deriveFolder(item) {
      const n = item.name ?? "";
      if (n.startsWith("Hexcrawl Locations:")) return "Locations";
      if (n.startsWith("Hexcrawl Landmarks:")) return "Landmarks";
      if (n.startsWith("Hexcrawl Factions:"))  return "Factions";
      if (n.startsWith("Hexcrawl:"))           return "Events & Rumours";
      return null;
    }
  },
  {
    // Phase 2: macros grouped by domain (Roll/Build/Brew are the
    // three verbs — grouping by DOMAIN not verb, so a GM finds "all
    // the potion tools" together instead of "all rolls" scattered).
    pack: "flail-macros",
    docType: "Macro",
    folderNames: [
      "Core Rolls", "Dungeons", "Caves", "Wizard Towers",
      "Cities", "Potions", "Session"
    ],
    deriveFolder(item) {
      const n = item.name ?? "";
      if (["Roll Death Table", "Roll Crossing a Hex", "Roll Reactions", "Roll Weather"].includes(n)) return "Core Rolls";
      // Dungeon-adjacent: dedicated builder + the four dungeon-room rollers
      if (n.includes("Dungeon") || ["Roll Puzzle", "Roll Obstacle", "Roll Trap", "Roll Anomaly"].includes(n)) return "Dungeons";
      if (n.includes("Cave"))         return "Caves";
      if (n.includes("Wizard Tower")) return "Wizard Towers";
      if (n.includes("City") || n.includes("Tavern") || n.includes("Building")) return "Cities";
      if (n.includes("Potion") || n.includes("Recipe")) return "Potions";
      if (n.includes("Session"))      return "Session";
      return null;
    }
  }
];

/* -------------------------------------------------------------------- */
/*  Sidebar folder ensure                                                */
/* -------------------------------------------------------------------- */

/**
 * Find or create a compendium (sidebar) folder at the given path.
 * Returns the leaf Folder document. Parents created recursively.
 * "Compendium" is the Foundry type for sidebar folders that hold
 * compendium packs.
 */
async function ensureSidebarFolder(path, color) {
  const parts = path.split("/");
  let parent = null;
  let folder = null;
  for (const part of parts) {
    folder = game.folders.find(f =>
      f.type === "Compendium"
      && f.name === part
      && (parent ? f.folder?.id === parent.id : !f.folder)
    );
    if (!folder) {
      folder = await Folder.create({
        name: part,
        type: "Compendium",
        folder: parent?.id ?? null,
        color: color ?? "#8b691"
      });
    }
    parent = folder;
  }
  return folder;
}

/**
 * Assign a pack to a sidebar folder, only if it doesn't already
 * have one (don't clobber user changes).
 */
async function assignPackToFolder(packName, folder) {
  const pack = game.packs.get(`world.${packName}`);
  if (!pack) return { skipped: "not-found" };
  if (pack.folder) return { skipped: "already-assigned" };
  try {
    await pack.configure({ folder: folder.id });
    return { assigned: true };
  } catch (err) {
    console.warn(`FLAIL | Failed to assign ${packName} to folder ${folder.name}:`, err);
    return { skipped: "error" };
  }
}

/* -------------------------------------------------------------------- */
/*  In-pack folder ensure                                                */
/* -------------------------------------------------------------------- */

/**
 * Ensure a set of named folders exists inside a compendium pack.
 * Returns a Map<name, Folder>.
 */
async function ensurePackFolders(pack, folderNames, docType) {
  const existing = new Map();
  for (const f of pack.folders) {
    existing.set(f.name, f);
  }
  const toCreate = folderNames
    .filter(name => !existing.has(name))
    .map(name => ({ name, type: docType, folder: null }));
  if (toCreate.length) {
    const created = await Folder.createDocuments(toCreate, { pack: pack.collection });
    for (const f of created) existing.set(f.name, f);
  }
  return existing;
}

/**
 * Move loose items in a pack (folder === null) into their derived
 * folders. Items already in a folder are skipped — the GM's manual
 * placement wins.
 */
/**
 * One-off rescue for the buggy v2 bestiary pass (which put every
 * NPC in "Other" because it read `system.category` instead of
 * `flags.flail.category`). Any NPC with a valid category flag gets
 * unfoldered regardless of which folder it's currently in — the
 * subsequent standard pass then places it correctly.
 *
 * This one is intentionally aggressive: a NPC with a category flag
 * that was manually placed in some other folder WILL be moved. If
 * you had homebrew NPCs placed manually, re-move them after the
 * v3 run completes.
 */
async function rescueBestiaryOtherFolder() {
  const pack = game.packs.get("world.flail-bestiary");
  if (!pack) {
    console.warn("FLAIL | Bestiary rescue: pack not found");
    return;
  }
  const docs = await pack.getDocuments();
  console.log(`FLAIL | Bestiary rescue: scanning ${docs.length} NPC(s).`);
  let unfolded = 0;
  let alreadyRoot = 0;
  let noCategory = 0;
  for (const doc of docs) {
    const realCat = (doc.flags?.flail?.category ?? "").trim();
    if (!realCat) { noCategory++; continue; }
    // doc.folder can be a Folder document (v11+) OR null/undefined.
    // Read the raw source field for reliability.
    const folderId = doc._source?.folder ?? doc.folder?.id ?? null;
    if (!folderId) { alreadyRoot++; continue; }
    try {
      await doc.update({ folder: null });
      unfolded++;
    } catch (err) {
      console.warn(`FLAIL | Bestiary rescue: failed to unfold ${doc.name}:`, err);
    }
  }
  console.log(`FLAIL | Bestiary rescue done: unfolded ${unfolded}, already-root ${alreadyRoot}, no-category ${noCategory}.`);

  // Also clean up empty "Other" folder if it was auto-created and is
  // now empty. Not fatal if this fails.
  try {
    const otherFolder = pack.folders.find(f => f.name === "Other");
    if (otherFolder) {
      const refreshedDocs = await pack.getDocuments();
      const stillInOther = refreshedDocs.some(d =>
        (d._source?.folder ?? d.folder?.id) === otherFolder.id
      );
      if (!stillInOther) {
        await otherFolder.delete();
        console.log("FLAIL | Bestiary rescue: removed empty 'Other' folder.");
      }
    }
  } catch (err) {
    console.warn("FLAIL | Bestiary rescue: cleanup of Other folder failed:", err);
  }
}

async function organizeInPackItems(spec) {
  const pack = game.packs.get(`world.${spec.pack}`);
  if (!pack) return { skipped: "not-found" };

  const docs = await pack.getDocuments();

  // Discover folder names — either use the spec's static list, or
  // derive from the documents themselves (dynamic mode, for packs
  // where homebrew content may introduce new categories: bestiary,
  // wizard-spells traditions).
  let folderNames = spec.folderNames ?? [];
  if (spec.dynamicFolderNames) {
    const found = new Set();
    for (const doc of docs) {
      if (doc.folder) continue;
      const name = spec.deriveFolder(doc);
      if (name) found.add(name);
    }
    folderNames = [...folderNames, ...found].filter((v, i, a) => a.indexOf(v) === i);
  }

  const foldersByName = await ensurePackFolders(pack, folderNames, spec.docType);

  const updates = [];
  let placed = 0;
  let skippedInFolder = 0;
  let skippedNoMap = 0;
  for (const doc of docs) {
    // Don't clobber: skip if the doc is already in a folder.
    if (doc.folder) { skippedInFolder++; continue; }
    const folderName = spec.deriveFolder(doc);
    if (!folderName) { skippedNoMap++; continue; }
    const targetFolder = foldersByName.get(folderName);
    if (!targetFolder) { skippedNoMap++; continue; }
    updates.push({ _id: doc.id, folder: targetFolder.id });
    placed++;
  }
  if (updates.length) {
    const DocClass = CONFIG[spec.docType].documentClass;
    await DocClass.updateDocuments(updates, { pack: pack.collection });
  }
  return { placed, skippedInFolder, skippedNoMap };
}

/* -------------------------------------------------------------------- */
/*  Main entry point                                                     */
/* -------------------------------------------------------------------- */

export async function ensureCompendiumOrganization() {
  if (!game.user?.isGM) return;
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  if (storedVersion >= ORGANIZATION_VERSION) return;

  console.log(`FLAIL | Organizing compendia (v${ORGANIZATION_VERSION}, was v${storedVersion}).`);

  // Phase A: build the sidebar folder tree.
  const foldersByPath = new Map();
  for (const { path, color } of SIDEBAR_FOLDERS) {
    try {
      const folder = await ensureSidebarFolder(path, color);
      foldersByPath.set(path, folder);
    } catch (err) {
      console.warn(`FLAIL | Failed to ensure sidebar folder "${path}":`, err);
    }
  }

  // Phase B: assign packs to sidebar folders.
  let assigned = 0, skippedAssigned = 0;
  for (const [packName, folderPath] of Object.entries(PACK_FOLDER_ASSIGNMENTS)) {
    const folder = foldersByPath.get(folderPath);
    if (!folder) continue;
    const result = await assignPackToFolder(packName, folder);
    if (result.assigned) assigned++;
    else if (result.skipped === "already-assigned") skippedAssigned++;
  }

  // Phase C: in-pack folders.
  const inPackSummary = [];
  for (const spec of IN_PACK_FOLDER_SPECS) {
    try {
      // v2 bestiary spec used the wrong field (system.category —
      // always empty on the actor; the real value is on
      // flags.flail.category). v3 attempted a rescue but the folder
      // updates didn't take. v4 uses per-doc update, aggressive
      // unfolding of any NPC with a valid category flag, and
      // cleanup of the empty Other folder.
      if (storedVersion < 4 && spec.pack === "flail-bestiary") {
        await rescueBestiaryOtherFolder();
      }
      const r = await organizeInPackItems(spec);
      inPackSummary.push({ pack: spec.pack, ...r });
    } catch (err) {
      console.warn(`FLAIL | Failed to organize in-pack items for ${spec.pack}:`, err);
    }
  }

  try {
    await game.settings.set("flail", VERSION_SETTING, ORGANIZATION_VERSION);
  } catch (err) {
    console.warn("FLAIL | Failed to save compendium org version:", err);
  }

  const summary = [
    `${assigned} pack(s) assigned to sidebar folders`,
    `${skippedAssigned} skipped (already placed)`,
    ...inPackSummary
      .filter(s => s.placed > 0)
      .map(s => `${s.pack}: placed ${s.placed}, kept ${s.skippedInFolder} in existing folders`)
  ];
  console.log(`FLAIL | Compendium organization done. ${summary.join(" · ")}`);
  ui.notifications?.info(`FLAIL: compendium organization applied (${assigned} packs).`);
}
