import { DIVINE_PRAYERS } from "./prayers-data.mjs";

/**
 * Version stamp for the bundled divine prayers. Bump whenever the data
 * file changes meaningfully (entries added, text corrected, religion
 * keys renamed) so existing worlds re-import the updated entries on
 * next load.
 *
 *   1 — initial bundle (24 prayers from FLAIL v0.2 page 20).
 *       Six prayers each for Brotherhood, Crusade, Shadow Demon, Verdant Grove.
 */
export const DIVINE_PRAYERS_VERSION = 1;

const VERSION_SETTING = "divinePrayersVersion";
const PACK_NAME = "flail-divine-prayers";
const PACK_LABEL = "FLAIL Divine Prayers";

/**
 * On `ready`, ensure a world-level compendium exists with all FLAIL
 * divine prayers imported. Mirrors `ensureDarkSpellsCompendium`. The
 * Cleric drags prayer entries from this compendium onto their sheet;
 * the sheet filters drops by religion.
 */
export async function ensureDivinePrayersCompendium() {
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
      console.error("FLAIL | Failed to create divine-prayers compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= DIVINE_PRAYERS.length
                && storedVersion >= DIVINE_PRAYERS_VERSION;
  if (upToDate) return;

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = DIVINE_PRAYERS.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < DIVINE_PRAYERS_VERSION
    ? DIVINE_PRAYERS.filter(it => existingIds.has(it._id))
    : [];

  console.log(
    `FLAIL | Sync divine prayers: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${DIVINE_PRAYERS_VERSION}, ` +
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
    await game.settings.set("flail", VERSION_SETTING, DIVINE_PRAYERS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced divine prayers (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync divine prayers", err);
    ui.notifications?.error(
      "FLAIL: failed to sync divine prayers — see console."
    );
  }
}
