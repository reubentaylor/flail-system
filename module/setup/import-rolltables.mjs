import { FLAIL_ROLLTABLES } from "./rolltables-data.mjs";
import { FLAIL_MACROS } from "./macros-data.mjs";

/**
 * Version stamps for the bundled rolltables and macros. Bump each
 * whenever its data file changes meaningfully so existing worlds
 * re-import the updated entries on next load. Same version-aware
 * sync pattern used elsewhere.
 *
 *   Rolltables:
 *     1 — initial bundle (Death Table).
 *
 *   Rolltables:
 *     1 — initial bundle (Death Table).
 *     2 — added Crossing a Hex, Reactions, Weather (all 2d6).
 *     3 — added Dungeons (5 d6 columns from p.80).
 *     4 — added Puzzle, Obstacle, Trap (d10), Anomaly (d12) from p.81.
 *     5 — added Wizard Towers (4 d10 columns from p.84).
 *     6 — added Caves (5 d6 theme columns + Chamber Contents + Tunnel
 *         Encounter tables from p.86).
 *
 *   Macros:
 *     1 — initial bundle (Roll Death Table).
 *     2 — added Build Session Events Table macro.
 *     3 — new icon on Build Session Events, plus three simple
 *         rollers (Crossing a Hex, Reactions, Weather).
 *     4 — added Build Dungeon macro.
 *     5 — added Roll Puzzle / Obstacle / Trap / Anomaly macros.
 *     6 — added Build Wizard Tower macro.
 *     7 — extended Build Wizard Tower: adds wizard stats
 *         (level/HP/mana), 5 random spells, and 5-7 floor stack.
 *     8 — added Build Cave, Roll Cave Chamber, Roll Cave Tunnel.
 */
export const FLAIL_ROLLTABLES_VERSION = 6;
export const FLAIL_MACROS_VERSION = 8;

const ROLLTABLES_SETTING = "rolltablesVersion";
const MACROS_SETTING = "macrosVersion";
const ROLLTABLES_PACK_NAME = "flail-rolltables";
const ROLLTABLES_PACK_LABEL = "FLAIL Rolltables";
const MACROS_PACK_NAME = "flail-macros";
const MACROS_PACK_LABEL = "FLAIL Macros";

async function ensurePack(name, label, type) {
  const fullKey = `world.${name}`;
  let pack = game.packs.get(fullKey)
    ?? [...game.packs].find(p => p.metadata?.name === name && p.metadata?.packageType === "world");
  if (!pack) {
    try {
      pack = await CompendiumCollection.createCompendium({
        name, label, type, package: "world"
      });
      console.log(`FLAIL | Created world compendium ${pack.collection}`);
    } catch (err) {
      console.error(`FLAIL | Failed to create ${name} compendium`, err);
      return null;
    }
  }
  return pack;
}

/**
 * On `ready`, ensure a world-level compendium exists with the FLAIL
 * rolltables imported. Currently just the Death Table.
 */
export async function ensureFlailRollTables() {
  if (!game.user?.isGM) return;

  const pack = await ensurePack(ROLLTABLES_PACK_NAME, ROLLTABLES_PACK_LABEL, "RollTable");
  if (!pack) return;

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", ROLLTABLES_SETTING);
  const upToDate = index.size >= FLAIL_ROLLTABLES.length
                && storedVersion >= FLAIL_ROLLTABLES_VERSION;
  if (upToDate) return;

  try {
    const existingIds = new Set(index.map(i => i.id ?? i._id));
    const toCreate = FLAIL_ROLLTABLES.filter(t => !existingIds.has(t._id));
    const toUpdate = FLAIL_ROLLTABLES.filter(t => existingIds.has(t._id));
    if (toCreate.length) {
      await RollTable.createDocuments(toCreate, { pack: pack.collection, keepId: true });
    }
    if (toUpdate.length) {
      const docs = await pack.getDocuments();
      const byId = new Map(docs.map(d => [d.id, d]));
      const updates = [];
      for (const t of toUpdate) {
        if (!byId.has(t._id)) continue;
        // For a full rolltable refresh, delete + recreate is safer
        // than trying to update nested results in place — the
        // Results collection uses embedded documents with their own
        // IDs that may drift across versions.
        await byId.get(t._id).delete();
        updates.push(t);
      }
      if (updates.length) {
        await RollTable.createDocuments(updates, { pack: pack.collection, keepId: true });
      }
    }
    await game.settings.set("flail", ROLLTABLES_SETTING, FLAIL_ROLLTABLES_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced rolltables (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync rolltables compendium", err);
    ui.notifications?.error("FLAIL: rolltables sync failed — see console.");
  }
}

/**
 * On `ready`, ensure a world-level compendium exists with the FLAIL
 * macros imported. Users drag them from the compendium to their
 * hotbar.
 */
export async function ensureFlailMacros() {
  if (!game.user?.isGM) return;

  const pack = await ensurePack(MACROS_PACK_NAME, MACROS_PACK_LABEL, "Macro");
  if (!pack) return;

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", MACROS_SETTING);
  const upToDate = index.size >= FLAIL_MACROS.length
                && storedVersion >= FLAIL_MACROS_VERSION;
  if (upToDate) return;

  try {
    const existingIds = new Set(index.map(i => i.id ?? i._id));
    const toCreate = FLAIL_MACROS.filter(m => !existingIds.has(m._id));
    const toUpdate = FLAIL_MACROS.filter(m => existingIds.has(m._id));
    if (toCreate.length) {
      await Macro.createDocuments(toCreate, { pack: pack.collection, keepId: true });
    }
    if (toUpdate.length) {
      const docs = await pack.getDocuments();
      const byId = new Map(docs.map(d => [d.id, d]));
      const updates = [];
      for (const m of toUpdate) {
        if (!byId.has(m._id)) continue;
        updates.push({
          _id: m._id,
          name: m.name,
          img: m.img,
          command: m.command,
          flags: m.flags ?? {}
        });
      }
      if (updates.length) {
        await Macro.updateDocuments(updates, { pack: pack.collection });
      }
    }
    await game.settings.set("flail", MACROS_SETTING, FLAIL_MACROS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced macros (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync macros compendium", err);
    ui.notifications?.error("FLAIL: macros sync failed — see console.");
  }
}
