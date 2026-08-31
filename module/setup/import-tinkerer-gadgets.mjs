import { TINKERER_GADGETS, TINKERER_GADGET_FOLDERS } from "./tinkerer-gadgets-data.mjs";

/**
 * Version stamp for the bundled Tinkerer Gadgets. Bump whenever the
 * data file changes meaningfully so existing worlds re-import the
 * updated entries on next load. Same version-aware sync pattern
 * used for primal-gifts, wizard-spells, dark-spells, common-items.
 *
 *   1 — initial bundle (20 gadgets across 4 categories).
 *   2 — FLAIL v1 rulebook (p.35) mechanical rewrites:
 *       • Buzzsaw Disk: d6 → d8, ricochet trigger 6 → 8.
 *       • Clockwork Toy: d8 single-target → 3d6 to all Near it.
 *       • Fire Spitter: d4 → d10.
 *       • Goo Blast: d8 → 2d8.
 *       • Shock Bolas: d4 → d6, stun trigger 4 → 4-6.
 *       • Sticky Net: removed the save (direct immobilise).
 *       • Magnetic Orb: "all metal" → "all small metal objects".
 *       • Healing Injector: added "self or ally" clarification.
 *   3 — (reserved — no external changes; version bumped inadvertently
 *       during v0.4.83 debugging).
 *   4 — v0.4.85: authored `activation` + `effects` primitives on all
 *       15 non-damage canonicals so they get automation out of the
 *       box (Flash Bomb save-vs-Blinded, Sticky Net save-vs-Immobilised,
 *       Repulsor Blast push, Healing Injector 1d4 heal, Repair Drone
 *       1d4 heal to construct, Adrenaline Booster suppress
 *       Injured/Exhausted, etc.). Environmental/narrative gadgets
 *       (Magnetic Orb, Smoke Screen, Liquid Rope, etc.) use `custom`
 *       HTML effects so the chat card still surfaces the rulebook
 *       text. Five damage canonicals unchanged — they keep the
 *       legacy releaseDamageGadget dispatch path (bespoke ricochet /
 *       delayed-AoE mechanics not yet in the shared primitives).
 *       Also added a "Custom Gadget (Template)" seed entry with
 *       `isCustomTemplate: true` for GMs to duplicate + rewrite.
 */
export const TINKERER_GADGETS_VERSION = 4;

const VERSION_SETTING = "tinkererGadgetsVersion";
const PACK_NAME = "flail-tinkerer-gadgets";
const PACK_LABEL = "FLAIL Tinkerer Gadgets";

/**
 * On `ready`, ensure a world-level compendium exists with all FLAIL
 * Tinkerer Gadgets imported into their category folders. Tinkerers
 * drag gadgets from here onto their character sheet to populate the
 * Gadget Belt panel on the class tab.
 */
export async function ensureTinkererGadgetsCompendium() {
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
      console.error("FLAIL | Failed to create tinkerer-gadgets compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const folderIndex = pack.folders;
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= TINKERER_GADGETS.length
                && folderIndex.size >= TINKERER_GADGET_FOLDERS.length
                && storedVersion >= TINKERER_GADGETS_VERSION;
  if (upToDate) return;

  try {
    // Folder setup — created/updated by stable _id.
    const existingFolderIds = new Set(folderIndex.map(f => f.id));
    const foldersToCreate = TINKERER_GADGET_FOLDERS.filter(f => !existingFolderIds.has(f._id));
    const foldersToUpdate = TINKERER_GADGET_FOLDERS.filter(f => existingFolderIds.has(f._id));
    if (foldersToCreate.length) {
      await Folder.createDocuments(foldersToCreate, { pack: pack.collection, keepId: true });
    }
    if (foldersToUpdate.length) {
      await Folder.updateDocuments(foldersToUpdate, { pack: pack.collection });
    }

    // Items — same pattern.
    const existingItemIds = new Set(index.map(i => i.id ?? i._id));
    const toCreate = TINKERER_GADGETS.filter(i => !existingItemIds.has(i._id));
    const toUpdate = TINKERER_GADGETS.filter(i => existingItemIds.has(i._id));
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

    await game.settings.set("flail", VERSION_SETTING, TINKERER_GADGETS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced tinkerer gadgets (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync tinkerer-gadgets compendium", err);
    ui.notifications?.error("FLAIL: tinkerer-gadgets sync failed — see console.");
  }
}
