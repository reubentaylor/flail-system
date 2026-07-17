import { CONDITIONS } from "./conditions-data.mjs";

/**
 * Version stamp for the bundled conditions. Bump whenever the data file
 * changes meaningfully (new variants, corrected text, schema changes)
 * so existing worlds re-import the updated entries on next load.
 *
 *   1 — initial bundle (9 conditions from FLAIL v0.2 page 57: Drained,
 *       Exhausted, Injured ×3 variants, Persistent Injury, Starved,
 *       Poisoned, Petrified).
 *   2 — switched icons from generic Foundry SVGs to per-condition
 *       card-style SVGs at systems/flail/icons/conditions/<slug>.svg
 *       (parchment-card layout matching the printed rulebook cards).
 *   3 — restyled icons: red background, black text, larger fonts for
 *       better legibility at small sizes.
 */
export const CONDITIONS_VERSION = 3;

const VERSION_SETTING = "conditionsVersion";
const PACK_NAME = "flail-conditions";
const PACK_LABEL = "FLAIL Conditions";

/**
 * On `ready`, ensure a world-level compendium exists with all FLAIL
 * conditions imported. Same shape as the dark-spells and divine-prayers
 * importers — version-aware sync, GM-only, idempotent.
 */
export async function ensureConditionsCompendium() {
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
      console.error("FLAIL | Failed to create conditions compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= CONDITIONS.length
                && storedVersion >= CONDITIONS_VERSION;
  if (upToDate) return;

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = CONDITIONS.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < CONDITIONS_VERSION
    ? CONDITIONS.filter(it => existingIds.has(it._id))
    : [];

  console.log(
    `FLAIL | Sync conditions: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${CONDITIONS_VERSION}, ` +
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
    await game.settings.set("flail", VERSION_SETTING, CONDITIONS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced conditions (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync conditions", err);
    ui.notifications?.error(
      "FLAIL: failed to sync conditions — see console."
    );
  }
}
