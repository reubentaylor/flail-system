import { PRIMAL_GIFTS, PRIMAL_GIFT_FOLDERS } from "./primal-gifts-data.mjs";

/**
 * Version stamp for the bundled Primal Gifts. Bump whenever the data
 * file changes meaningfully (new gifts, corrected text, image path
 * fixes) so existing worlds re-import the updated entries on next
 * load. Follows the same pattern as the common-items and dark-spells
 * imports.
 *
 *   1 — initial bundle (25 gifts across 5 kingdoms).
 *   2 — icon-path fixes for 21 gifts whose paths returned 404s (the
 *       four confirmed working — Incubator, Natural Swimmer, Cheetah
 *       Velocity, Viper's Agility — were left untouched).
 *   3 — Slimy Skin + Axolotl Form remapped (their v2 slime-face-eyes
 *       path also 404'd; switched to slime-movement paths that are
 *       already in use elsewhere).
 */
export const PRIMAL_GIFTS_VERSION = 3;

const VERSION_SETTING = "primalGiftsVersion";
const PACK_NAME = "flail-primal-gifts";
const PACK_LABEL = "FLAIL Druid Primal Gifts";

/**
 * On `ready`, ensure a world-level compendium exists with all FLAIL
 * Primal Gifts imported into their kingdom folders. Mirrors the
 * ensureDarkSpellsCompendium flow but adds folder-per-kingdom
 * organization. Druids drag gifts from here onto their character
 * sheet to populate the Primal Gifts panel.
 */
export async function ensurePrimalGiftsCompendium() {
  if (!game.user?.isGM) return;

  const fullKey = `world.${PACK_NAME}`;
  let pack = game.packs.get(fullKey)
    ?? [...game.packs].find(p => p.metadata?.name === PACK_NAME && p.metadata?.packageType === "world");

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
      console.error("FLAIL | Failed to create primal-gifts compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const folderIndex = pack.folders;   // Foundry auto-populates this on getIndex.
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= PRIMAL_GIFTS.length
                && folderIndex.size >= PRIMAL_GIFT_FOLDERS.length
                && storedVersion >= PRIMAL_GIFTS_VERSION;
  if (upToDate) return;

  try {
    // Ensure folders exist. Folders inside a compendium are created
    // via Folder.create with the pack option; existing ones matched by
    // stable _id are updated.
    const existingFolderIds = new Set(folderIndex.map(f => f.id));
    const foldersToCreate = PRIMAL_GIFT_FOLDERS.filter(f => !existingFolderIds.has(f._id));
    const foldersToUpdate = PRIMAL_GIFT_FOLDERS.filter(f => existingFolderIds.has(f._id));
    if (foldersToCreate.length) {
      await Folder.createDocuments(foldersToCreate, { pack: pack.collection, keepId: true });
    }
    if (foldersToUpdate.length) {
      await Folder.updateDocuments(foldersToUpdate, { pack: pack.collection });
    }

    // Then items. Same pattern as dark-spells / common-items: create
    // anything the index doesn't have, update anything it does. Both
    // paths use keepId: true to keep folder references stable across
    // syncs.
    const existingItemIds = new Set(index.map(i => i.id ?? i._id));
    const toCreate = PRIMAL_GIFTS.filter(i => !existingItemIds.has(i._id));
    const toUpdate = PRIMAL_GIFTS.filter(i => existingItemIds.has(i._id));
    if (toCreate.length) {
      await Item.createDocuments(toCreate, { pack: pack.collection, keepId: true });
    }
    if (toUpdate.length) {
      const documents = await pack.getDocuments();
      const byId = new Map(documents.map(d => [d.id, d]));
      const updates = [];
      for (const it of toUpdate) {
        if (!byId.has(it._id)) continue;
        updates.push({
          _id: it._id,
          name: it.name,
          img: it.img,
          system: it.system,
          folder: it.folder,
          flags: it.flags ?? {}
        });
      }
      if (updates.length) {
        await Item.updateDocuments(updates, { pack: pack.collection });
      }
    }

    await game.settings.set("flail", VERSION_SETTING, PRIMAL_GIFTS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced primal gifts (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync primal-gifts compendium", err);
    ui.notifications?.error("FLAIL: primal-gifts sync failed — see console.");
  }
}
