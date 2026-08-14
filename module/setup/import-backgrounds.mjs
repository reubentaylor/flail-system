import { buildBackgroundsData } from "./backgrounds-data.mjs";

/**
 * Version stamp for the bundled backgrounds. Bump when the data
 * (perk text, class assignment, grants, etc.) changes so existing
 * worlds re-sync updated entries instead of sticking with stale copies.
 *
 *   1 — initial bundle. 48 stock backgrounds + Custom template.
 *   2 — added `system.grants` records to backgrounds with clear
 *       mechanical hooks (Cleric 1/2/3/4/5/6, Bard 3/4/5/6,
 *       Bone Whisperer 1-6). Others remain grant-free (perk text only).
 */
export const BACKGROUNDS_VERSION = 2;

const VERSION_SETTING = "backgroundsVersion";
const PACK_NAME  = "flail-backgrounds";
const PACK_LABEL = "Backgrounds";

/**
 * Create/refresh the Backgrounds compendium at world init. GM-only
 * because compendium mutation is a permissioned operation.
 */
export async function ensureBackgroundsCompendium() {
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
      console.error("FLAIL | Failed to create backgrounds compendium", err);
      return;
    }
  }

  const bundle = buildBackgroundsData();
  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= bundle.length && storedVersion >= BACKGROUNDS_VERSION;
  if (upToDate) return;

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = bundle.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < BACKGROUNDS_VERSION
    ? bundle.filter(it => existingIds.has(it._id))
    : [];

  console.log(
    `FLAIL | Sync backgrounds: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${BACKGROUNDS_VERSION}, ` +
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
    await game.settings.set("flail", VERSION_SETTING, BACKGROUNDS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced backgrounds (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync backgrounds", err);
    ui.notifications?.error("FLAIL: failed to sync backgrounds — see console.");
  }
}
