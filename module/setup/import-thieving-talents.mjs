import { THIEVING_TALENTS } from "./thieving-talents-data.mjs";

/**
 * Cutthroat Thieving Talents bundle. Flat compendium (no folder
 * structure) — all 12 talents live at the top level.
 *
 *   1 — initial bundle (12 talents from FLAIL v0.2 p.24).
 */
export const THIEVING_TALENTS_VERSION = 1;

const VERSION_SETTING = "thievingTalentsVersion";
const PACK_NAME = "flail-thieving-talents";
const PACK_LABEL = "FLAIL Cutthroat Thieving Talents";

/**
 * On `ready`, ensure a world-level compendium exists with all FLAIL
 * Thieving Talents imported. Cutthroats drag talents from here onto
 * their character sheet; Bards can also drop them onto the Jack of
 * All Trades panel.
 */
export async function ensureThievingTalentsCompendium() {
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
      console.error("FLAIL | Failed to create thieving-talents compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= THIEVING_TALENTS.length
                && storedVersion >= THIEVING_TALENTS_VERSION;
  if (upToDate) return;

  try {
    const existingIds = new Set(index.map(i => i.id ?? i._id));
    const toCreate = THIEVING_TALENTS.filter(i => !existingIds.has(i._id));
    const toUpdate = THIEVING_TALENTS.filter(i => existingIds.has(i._id));
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
          flags: it.flags ?? {}
        });
      }
      if (updates.length) {
        await Item.updateDocuments(updates, { pack: pack.collection });
      }
    }
    await game.settings.set("flail", VERSION_SETTING, THIEVING_TALENTS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced thieving talents (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync thieving-talents compendium", err);
    ui.notifications?.error("FLAIL: thieving-talents sync failed — see console.");
  }
}
