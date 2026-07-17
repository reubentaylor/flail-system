import { FLAIL_UNIQUE_ITEMS } from "./unique-items-data.mjs";

/**
 * Version stamp — bump when the unique-items data changes so existing
 * worlds re-sync on next load. Same pattern used by the other
 * compendia (common-items, wizard-spells, primal-gifts, gadgets,
 * thieving-talents, rolltables, macros, bestiary).
 *
 *   1 — initial bundle (99 items across legendary weapons,
 *       amulets/rings, body armour, headgear, shields, boots, misc
 *       gear, and 8 class item sets).
 *   2 — per-item art imported from the FLAIL unique items reference
 *       PDF (white-background pages), extracted with alpha masks
 *       and composited onto solid white. All 99 items now carry
 *       distinctive artwork at systems/flail/icons/unique-items/.
 */
export const FLAIL_UNIQUE_ITEMS_VERSION = 2;

const SETTING_KEY = "uniqueItemsVersion";
const PACK_NAME   = "flail-unique-items";
const PACK_LABEL  = "FLAIL Unique Items";

/**
 * On `ready`, ensure a world-level Item compendium exists with the
 * bundled unique items imported. Delete-and-recreate on version bumps
 * (same trick used for the bestiary) — embedded flags collections
 * can drift across versions and are fragile to patch in place.
 */
export async function ensureFlailUniqueItems() {
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
      console.error("FLAIL | Failed to create unique-items compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", SETTING_KEY);
  const upToDate = index.size >= FLAIL_UNIQUE_ITEMS.length
                && storedVersion >= FLAIL_UNIQUE_ITEMS_VERSION;
  if (upToDate) return;

  try {
    const existingIds = new Set(index.map(i => i.id ?? i._id));
    const toCreate = FLAIL_UNIQUE_ITEMS.filter(a => !existingIds.has(a._id));
    const toUpdate = FLAIL_UNIQUE_ITEMS.filter(a =>  existingIds.has(a._id));

    if (toCreate.length) {
      await Item.createDocuments(toCreate, { pack: pack.collection, keepId: true });
    }

    // Delete-and-recreate for updates — embedded flags/effects
    // collections carry their own IDs that may drift across versions,
    // and Foundry's in-place update on nested collections is finicky.
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

    await game.settings.set("flail", SETTING_KEY, FLAIL_UNIQUE_ITEMS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced unique items (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync unique-items compendium", err);
    ui.notifications?.error("FLAIL: unique items sync failed — see console.");
  }
}
