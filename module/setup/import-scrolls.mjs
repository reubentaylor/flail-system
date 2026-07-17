import { FLAIL_SCROLLS } from "./scrolls-data.mjs";

/**
 * Version stamp — bump when the scrolls data changes so existing
 * worlds re-sync on next load.
 *
 *   1 — initial bundle (18 scrolls from FLAIL v0.2 p.111).
 */
export const FLAIL_SCROLLS_VERSION = 1;

const SETTING_KEY = "scrollsVersion";
const PACK_NAME   = "flail-scrolls";
const PACK_LABEL  = "FLAIL Magic Scrolls";

/**
 * On `ready`, ensure a world-level Item compendium exists with the
 * bundled scrolls imported. Same delete-and-recreate pattern used
 * by the other Item compendia for updates.
 */
export async function ensureFlailScrolls() {
  if (!game.user?.isGM) return;

  const fullKey = `world.${PACK_NAME}`;
  let pack = game.packs.get(fullKey)
    ?? [...game.packs].find(p =>
         p.metadata?.name === PACK_NAME &&
         p.metadata?.packageType === "world"
       );
  if (!pack) {
    try {
      pack = await CompendiumCollection.createCompendium({
        name: PACK_NAME,
        label: PACK_LABEL,
        type: "Item",
        package: "world"
      });
      console.log(`FLAIL | Created world compendium ${pack.collection}`);
    } catch (err) {
      console.error("FLAIL | Failed to create scrolls compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", SETTING_KEY);
  const upToDate = index.size >= FLAIL_SCROLLS.length
                && storedVersion >= FLAIL_SCROLLS_VERSION;
  if (upToDate) return;

  try {
    const existingIds = new Set(index.map(i => i.id ?? i._id));
    const toCreate = FLAIL_SCROLLS.filter(a => !existingIds.has(a._id));
    const toUpdate = FLAIL_SCROLLS.filter(a =>  existingIds.has(a._id));

    if (toCreate.length) {
      await Item.createDocuments(toCreate, { pack: pack.collection, keepId: true });
    }

    if (toUpdate.length) {
      const docs = await pack.getDocuments();
      const byId = new Map(docs.map(d => [d.id, d]));
      const recreate = [];
      for (const item of toUpdate) {
        if (!byId.has(item._id)) continue;
        await byId.get(item._id).delete();
        recreate.push(item);
      }
      if (recreate.length) {
        await Item.createDocuments(recreate, { pack: pack.collection, keepId: true });
      }
    }

    await game.settings.set("flail", SETTING_KEY, FLAIL_SCROLLS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced scrolls (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync scrolls compendium", err);
    ui.notifications?.error("FLAIL: scrolls sync failed — see console.");
  }
}
