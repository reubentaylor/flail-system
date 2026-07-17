import { FLAIL_POTIONS } from "./potions-data.mjs";

/**
 * Version stamp — bump when the potions data changes so existing
 * worlds re-sync on next load.
 *
 *   1 — initial bundle (25 ingredients + 34 potions from FLAIL v0.2 pp.112-113).
 *   2 — assigned Foundry core potion-bottle icons: alchemical flasks
 *       for ingredients (coloured by category theme), corked bottles
 *       for Weak potions, labelled bottles for Strong/Mighty tiers.
 *   3 — corrected icon paths to Foundry's actual convention
 *       (bottle-bulb-corked-<colour>.webp under icons/consumables/potions/).
 *       All items now use the same bulb shape, varying only by colour.
 *   4 — resolved each colour to its actual Foundry filename after
 *       auditing the folder. Nine distinct shape/colour combinations
 *       now in use (bulb / conical / stopper / labelled / flask /
 *       vial / jug) — the palette varies by shape as well as hue.
 */
export const FLAIL_POTIONS_VERSION = 4;

const SETTING_KEY = "potionsVersion";
const PACK_NAME   = "flail-potions";
const PACK_LABEL  = "FLAIL Potions";

/**
 * On `ready`, ensure a world-level Item compendium exists with the
 * bundled potions and ingredients imported. Same delete-and-recreate
 * pattern used by the other Item compendia for updates.
 */
export async function ensureFlailPotions() {
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
      console.error("FLAIL | Failed to create potions compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", SETTING_KEY);
  const upToDate = index.size >= FLAIL_POTIONS.length
                && storedVersion >= FLAIL_POTIONS_VERSION;
  if (upToDate) return;

  try {
    const existingIds = new Set(index.map(i => i.id ?? i._id));
    const toCreate = FLAIL_POTIONS.filter(a => !existingIds.has(a._id));
    const toUpdate = FLAIL_POTIONS.filter(a =>  existingIds.has(a._id));

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

    await game.settings.set("flail", SETTING_KEY, FLAIL_POTIONS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced potions (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync potions compendium", err);
    ui.notifications?.error("FLAIL: potions sync failed — see console.");
  }
}
