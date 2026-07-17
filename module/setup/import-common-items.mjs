import { COMMON_ITEMS } from "./common-items-data.mjs";

/**
 * Version stamp for the bundled common items. Bump whenever the data file
 * changes meaningfully (new weapons, retagged categories, corrected stats)
 * so existing worlds re-import the updated entries on next load instead of
 * sticking with their stale copies. The importer compares this to the
 * value stored in the world's settings.
 *
 *   2 — added per-weapon `tags` array for class-specialty matching.
 *   3 — appended "Sigil" to the four Cutthroat guild sigil items
 *       (Crimson Coin, Eye Ring, Hand Brooch, Tentacle Clasp) so the
 *       sheet's sigil presence check picks them up automatically.
 *   1 — initial bundle.
 */
export const COMMON_ITEMS_VERSION = 10;

const VERSION_SETTING = "commonItemsVersion";

/**
 * On `ready`, ensure a world-level compendium exists with all
 * FLAIL common items imported. We can't ship a pre-built LevelDB
 * pack at install time, so we create a world-level pack and seed
 * it from bundled JSON on first run. Subsequent loads are a no-op
 * unless `COMMON_ITEMS_VERSION` has been bumped — then we re-sync
 * each item using `keepId`, overwriting the world's stored copy.
 */
const PACK_NAME = "flail-common-items";
const PACK_LABEL = "FLAIL Common Items";

export async function ensureCommonItemsCompendium() {
  // Guard: only the GM should create/populate world compendiums.
  if (!game.user?.isGM) return;

  // Look up by world-scoped collection key first, then fall back
  // to scanning by name (different Foundry minors disagree slightly
  // on the exact collection prefix).
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
      console.error("FLAIL | Failed to create common-items compendium", err);
      return;
    }
  }

  // If already populated to the expected count AND the stored version
  // matches the bundled one, nothing to do.
  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= COMMON_ITEMS.length
                && storedVersion >= COMMON_ITEMS_VERSION;
  if (upToDate) return;

  // Build a set of already-imported _ids. New entries get `createDocuments`,
  // existing entries get re-written via `updateDocuments` so changes to
  // bundled stats / tags propagate without losing the per-id reference.
  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = COMMON_ITEMS.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < COMMON_ITEMS_VERSION
    ? COMMON_ITEMS.filter(it => existingIds.has(it._id))
    : [];

  console.log(
    `FLAIL | Sync common items: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${COMMON_ITEMS_VERSION}, ` +
    `stored v${storedVersion}).`
  );

  try {
    if (toCreate.length) {
      await Item.createDocuments(toCreate, { pack: pack.collection, keepId: true });
    }
    if (toUpdate.length) {
      // Pack documents need updates via the pack's API so the LevelDB
      // backing store stays consistent.
      const documents = await pack.getDocuments();
      const byId = new Map(documents.map(d => [d.id, d]));
      const updates = [];
      for (const it of toUpdate) {
        if (!byId.has(it._id)) continue;
        // Only push fields that have actually changed to keep diffs small;
        // the simplest correct version just overwrites system + name + img.
        // Flags are also pushed so system-wide flag conventions (e.g.
        // `flail.adornment` on sigils and holy items) sync to worlds on
        // version bump.
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
    await game.settings.set("flail", VERSION_SETTING, COMMON_ITEMS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced common items (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync common items", err);
    ui.notifications?.error(
      "FLAIL: failed to sync common items — see console."
    );
  }
}
