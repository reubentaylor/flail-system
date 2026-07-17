import { GUILDS } from "./guilds-data.mjs";

/**
 * Version stamp for the bundled guilds. Bump whenever the data file
 * changes meaningfully (entries added, text corrected, action keys
 * renamed) so existing worlds re-import the updated entries on next
 * load.
 *
 *   1 — initial bundle (4 guilds from FLAIL v0.2 page 24).
 *   2 — guild icons switched from the generic aura placeholder to
 *       the per-guild sigil icons in icons/items/ (crimson-coin,
 *       eye-ring, hand-brooch, tentacle-clasp).
 */
export const GUILDS_VERSION = 2;

const VERSION_SETTING = "guildsVersion";
const PACK_NAME = "flail-guilds";
const PACK_LABEL = "FLAIL Cutthroat Guilds";

/**
 * On `ready`, ensure a world-level compendium exists with all FLAIL
 * Cutthroat guilds imported. Same shape as the other version-aware
 * importers — GM-only, idempotent, re-runs on version bump.
 */
export async function ensureGuildsCompendium() {
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
      console.error("FLAIL | Failed to create guilds compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= GUILDS.length
                && storedVersion >= GUILDS_VERSION;
  if (upToDate) return;

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = GUILDS.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < GUILDS_VERSION
    ? GUILDS.filter(it => existingIds.has(it._id))
    : [];

  console.log(
    `FLAIL | Sync guilds: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${GUILDS_VERSION}, ` +
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
        updates.push({ _id: it._id, name: it.name, img: it.img, system: it.system });
      }
      if (updates.length) {
        await Item.updateDocuments(updates, { pack: pack.collection });
      }
    }
    await game.settings.set("flail", VERSION_SETTING, GUILDS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced guilds (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync guilds", err);
    ui.notifications?.error("FLAIL: failed to sync guilds — see console.");
  }
}
