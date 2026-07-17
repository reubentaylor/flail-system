import { DARK_SPELLS } from "./dark-spells-data.mjs";

/**
 * Version stamp for the bundled dark spells. Bump whenever the data file
 * changes meaningfully (new spells, corrected text, suggested-dice tweaks)
 * so existing worlds re-import the updated entries on next load.
 *
 *   1 — initial bundle (20 spells from FLAIL v0.2 page 16).
 */
export const DARK_SPELLS_VERSION = 1;

const VERSION_SETTING = "darkSpellsVersion";
const PACK_NAME = "flail-dark-spells";
const PACK_LABEL = "FLAIL Dark Spells";

/**
 * On `ready`, ensure a world-level compendium exists with all FLAIL dark
 * spells imported. Mirrors `ensureCommonItemsCompendium` exactly — same
 * version-aware sync, same idempotent guards, same GM-only restriction.
 * Players (Bone Whisperers) drag entries from the compendium onto their
 * sheet to populate the Known Spells list on the Class tab.
 */
export async function ensureDarkSpellsCompendium() {
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
      console.error("FLAIL | Failed to create dark-spells compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= DARK_SPELLS.length
                && storedVersion >= DARK_SPELLS_VERSION;
  if (upToDate) return;

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = DARK_SPELLS.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < DARK_SPELLS_VERSION
    ? DARK_SPELLS.filter(it => existingIds.has(it._id))
    : [];

  console.log(
    `FLAIL | Sync dark spells: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${DARK_SPELLS_VERSION}, ` +
    `stored v${storedVersion}).`
  );

  try {
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
          system: it.system
        });
      }
      if (updates.length) {
        await Item.updateDocuments(updates, { pack: pack.collection });
      }
    }
    await game.settings.set("flail", VERSION_SETTING, DARK_SPELLS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced dark spells (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync dark spells", err);
    ui.notifications?.error(
      "FLAIL: failed to sync dark spells — see console."
    );
  }
}
