import { FLAIL_BESTIARY } from "./bestiary-data.mjs";

/**
 * Version stamp — bump when the bestiary data changes so existing
 * worlds re-sync on next load. Same pattern used by the other
 * compendia (common-items, wizard-spells, primal-gifts, gadgets,
 * thieving-talents, rolltables, macros).
 *
 *   1 — initial bundle (Aerial category, 7 monsters).
 *   2 — full bestiary pass — 64 monsters across 10 categories
 *       (Aerial, Insects, Aquatic, Dragons, Elementals, Giants,
 *       Monstrosities, Oozes, Reptiles, Undead).
 *   3 — per-monster token art wired at systems/flail/icons/monsters/
 *       <key>.png; monsterKey stashed on flags.flail for future
 *       lookups.
 *   4 — token art bundled into the system distribution as 512×512
 *       WebP (10× smaller than PNG, still crisp at token size);
 *       paths flipped from .png to .webp.
 *   5 — added the missing Cockatrice WebP; all 64 monsters now
 *       have bundled art.
 */
export const FLAIL_BESTIARY_VERSION = 5;

const BESTIARY_SETTING = "bestiaryVersion";
const BESTIARY_PACK_NAME = "flail-bestiary";
const BESTIARY_PACK_LABEL = "FLAIL Bestiary";

/**
 * On `ready`, ensure a world-level Actor compendium exists with the
 * bundled bestiary imported. Actors are created with their embedded
 * weapon Items in-place (attacks), so the compendium entries drop
 * onto a scene as fully-configured monsters.
 */
export async function ensureFlailBestiary() {
  if (!game.user?.isGM) return;

  const fullKey = `world.${BESTIARY_PACK_NAME}`;
  let pack = game.packs.get(fullKey)
    ?? [...game.packs].find(p =>
         p.metadata?.name === BESTIARY_PACK_NAME &&
         p.metadata?.packageType === "world"
       );
  if (!pack) {
    try {
      pack = await CompendiumCollection.createCompendium({
        name: BESTIARY_PACK_NAME,
        label: BESTIARY_PACK_LABEL,
        type: "Actor",
        package: "world"
      });
      console.log(`FLAIL | Created world compendium ${pack.collection}`);
    } catch (err) {
      console.error("FLAIL | Failed to create bestiary compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", BESTIARY_SETTING);
  const upToDate = index.size >= FLAIL_BESTIARY.length
                && storedVersion >= FLAIL_BESTIARY_VERSION;
  if (upToDate) return;

  try {
    const existingIds = new Set(index.map(i => i.id ?? i._id));
    const toCreate = FLAIL_BESTIARY.filter(a => !existingIds.has(a._id));
    const toUpdate = FLAIL_BESTIARY.filter(a =>  existingIds.has(a._id));

    if (toCreate.length) {
      await Actor.createDocuments(toCreate, { pack: pack.collection, keepId: true });
    }

    // For updates, delete + recreate is safer than trying to patch
    // nested Item collections in place — embedded Item _ids may
    // drift across bestiary versions and Foundry's compendium
    // update paths for nested collections are finicky. Same trick
    // used for rolltable Results elsewhere.
    if (toUpdate.length) {
      const docs = await pack.getDocuments();
      const byId = new Map(docs.map(d => [d.id, d]));
      const recreate = [];
      for (const a of toUpdate) {
        if (!byId.has(a._id)) continue;
        await byId.get(a._id).delete();
        recreate.push(a);
      }
      if (recreate.length) {
        await Actor.createDocuments(recreate, { pack: pack.collection, keepId: true });
      }
    }

    await game.settings.set("flail", BESTIARY_SETTING, FLAIL_BESTIARY_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced bestiary (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync bestiary compendium", err);
    ui.notifications?.error("FLAIL: bestiary sync failed — see console.");
  }
}
