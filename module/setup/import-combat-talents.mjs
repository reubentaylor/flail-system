import { buildCombatTalentsData } from "./combat-talents-data.mjs";

/**
 * Version stamp for the bundled combat talents. Bump when the data
 * (descriptions, tier assignments, prerequisites) changes so existing
 * worlds re-sync updated entries.
 *
 *   1 — initial bundle. All Warrior tree talents (Basic + Expert +
 *       Master per tree) plus a Custom Combat Talent template.
 */
export const COMBAT_TALENTS_VERSION = 1;

const VERSION_SETTING = "combatTalentsVersion";
const PACK_NAME  = "flail-combat-talents";
const PACK_LABEL = "Combat Talents";

/**
 * Create/refresh the Combat Talents compendium at world init.
 * GM-only. Matches the pattern used by ensureCommonItemsCompendium
 * and ensureBackgroundsCompendium.
 */
export async function ensureCombatTalentsCompendium() {
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
      console.error("FLAIL | Failed to create combat-talents compendium", err);
      return;
    }
  }

  const bundle = buildCombatTalentsData();
  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= bundle.length && storedVersion >= COMBAT_TALENTS_VERSION;
  if (upToDate) return;

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = bundle.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < COMBAT_TALENTS_VERSION
    ? bundle.filter(it => existingIds.has(it._id))
    : [];

  console.log(
    `FLAIL | Sync combat talents: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${COMBAT_TALENTS_VERSION}, ` +
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
    await game.settings.set("flail", VERSION_SETTING, COMBAT_TALENTS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced combat talents (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync combat talents", err);
    ui.notifications?.error("FLAIL: failed to sync combat talents — see console.");
  }
}
