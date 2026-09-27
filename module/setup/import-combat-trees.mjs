/**
 * Combat Trees importer (v0.4.95, Ship 1) — verbose logging.
 */

import { buildCombatTreesData } from "./combat-trees-data.mjs";

export const COMBAT_TREES_VERSION = 2;

const VERSION_SETTING = "combatTreesVersion";
const PACK_NAME  = "flail-combat-trees";
const PACK_LABEL = "Combat Trees";

export async function ensureCombatTreesCompendium() {
  console.log("FLAIL | ensureCombatTreesCompendium — START");

  if (!game.user?.isGM) {
    console.log("FLAIL | ensureCombatTreesCompendium — SKIP (not GM)");
    return;
  }

  const fullKey = `world.${PACK_NAME}`;
  let pack = game.packs.get(fullKey)
    ?? [...game.packs].find(p => p.metadata?.name === PACK_NAME
                              && p.metadata?.packageType === "world");
  console.log(`FLAIL | ensureCombatTreesCompendium — pack ${fullKey}: ${pack ? "EXISTS" : "MISSING"}`);

  if (!pack) {
    try {
      pack = await CompendiumCollection.createCompendium({
        name: PACK_NAME,
        label: PACK_LABEL,
        type: "Item",
        package: "world"
      });
      console.log(`FLAIL | ensureCombatTreesCompendium — CREATED ${pack.collection}`);
      ui.notifications?.info(`FLAIL: created ${PACK_LABEL} compendium.`);
    } catch (err) {
      console.error("FLAIL | ensureCombatTreesCompendium — CREATE FAILED", err);
      ui.notifications?.error(`FLAIL: could not create ${PACK_LABEL} compendium (see console).`);
      return;
    }
  }

  let bundle;
  try {
    bundle = buildCombatTreesData();
    console.log(`FLAIL | ensureCombatTreesCompendium — bundle size: ${bundle.length}`);
  } catch (err) {
    console.error("FLAIL | ensureCombatTreesCompendium — buildCombatTreesData THREW", err);
    return;
  }

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING) ?? 0;
  console.log(`FLAIL | ensureCombatTreesCompendium — index size: ${index.size}, stored version: ${storedVersion}, bundle version: ${COMBAT_TREES_VERSION}`);

  const upToDate = index.size >= bundle.length && storedVersion >= COMBAT_TREES_VERSION;
  if (upToDate) {
    console.log("FLAIL | ensureCombatTreesCompendium — UP TO DATE");
    return;
  }

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = bundle.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < COMBAT_TREES_VERSION
    ? bundle.filter(it => existingIds.has(it._id))
    : [];

  console.log(`FLAIL | ensureCombatTreesCompendium — plan: ${toCreate.length} create, ${toUpdate.length} update`);

  try {
    if (toCreate.length) {
      await Item.createDocuments(toCreate, { pack: pack.collection, keepId: true });
      console.log(`FLAIL | ensureCombatTreesCompendium — CREATED ${toCreate.length} items`);
    }
    if (toUpdate.length) {
      const documents = await pack.getDocuments();
      const byId = new Map(documents.map(d => [d.id, d]));
      const updates = [];
      for (const it of toUpdate) {
        if (!byId.has(it._id)) continue;
        updates.push({ _id: it._id, name: it.name, img: it.img, system: it.system });
      }
      if (updates.length) {
        await Item.updateDocuments(updates, { pack: pack.collection });
        console.log(`FLAIL | ensureCombatTreesCompendium — UPDATED ${updates.length} items`);
      }
    }
    await game.settings.set("flail", VERSION_SETTING, COMBAT_TREES_VERSION);
    ui.notifications?.info(
      `FLAIL: synced Combat Trees (${toCreate.length} new, ${toUpdate.length} updated).`
    );
    console.log("FLAIL | ensureCombatTreesCompendium — COMPLETE");
  } catch (err) {
    console.error("FLAIL | ensureCombatTreesCompendium — SYNC FAILED", err);
    ui.notifications?.error("FLAIL: Combat Trees sync failed (see console).");
  }
}
