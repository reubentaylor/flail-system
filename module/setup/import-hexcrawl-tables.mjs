import { HEXCRAWL_TABLES } from "./hexcrawl-tables-data.mjs";

/**
 * Version stamp for the bundled hexcrawl tables. Bump whenever the data
 * file changes meaningfully (entries renamed, columns split or merged,
 * new tables added) so existing worlds re-import the updated entries on
 * next load.
 *
 *   1 — initial bundle (15 RollTables from FLAIL v0.2 pages 65-67).
 *       Locations × 5 columns, Landmarks × 5 columns, Rumours, Events,
 *       Factions × 3 columns.
 *   2 — migrated TableResult content from `text` to `name` for Foundry
 *       v13+ compatibility (the `text` field was deprecated in v13 and
 *       removed in v15).
 */
export const HEXCRAWL_TABLES_VERSION = 2;

const VERSION_SETTING = "hexcrawlTablesVersion";
const PACK_NAME = "flail-hexcrawl-tables";
const PACK_LABEL = "FLAIL Hexcrawl Tables";

/**
 * On `ready`, ensure a world-level RollTable compendium exists with all
 * FLAIL hexcrawl tables imported. Mirrors `ensureDarkSpellsCompendium`
 * but uses the RollTable document class.
 */
export async function ensureHexcrawlTablesCompendium() {
  if (!game.user?.isGM) return;

  const fullKey = `world.${PACK_NAME}`;
  let pack = game.packs.get(fullKey)
    ?? [...game.packs].find(p => p.metadata?.name === PACK_NAME && p.metadata?.packageType === "world");

  if (!pack) {
    try {
      pack = await CompendiumCollection.createCompendium({
        name: PACK_NAME,
        label: PACK_LABEL,
        type: "RollTable",
        package: "world"
      });
      console.log(`FLAIL | Created world compendium ${pack.collection}`);
    } catch (err) {
      console.error("FLAIL | Failed to create hexcrawl-tables compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= HEXCRAWL_TABLES.length
                && storedVersion >= HEXCRAWL_TABLES_VERSION;
  if (upToDate) return;

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = HEXCRAWL_TABLES.filter(t => !existingIds.has(t._id));
  const toUpdate = storedVersion < HEXCRAWL_TABLES_VERSION
    ? HEXCRAWL_TABLES.filter(t => existingIds.has(t._id))
    : [];

  console.log(
    `FLAIL | Sync hexcrawl tables: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${HEXCRAWL_TABLES_VERSION}, ` +
    `stored v${storedVersion}).`
  );

  try {
    if (toCreate.length) {
      await RollTable.createDocuments(toCreate, { pack: pack.collection, keepId: true });
    }
    if (toUpdate.length) {
      const documents = await pack.getDocuments();
      const byId = new Map(documents.map(d => [d.id, d]));
      const updates = [];
      for (const t of toUpdate) {
        if (!byId.has(t._id)) continue;
        updates.push({
          _id: t._id,
          name: t.name,
          description: t.description,
          img: t.img,
          formula: t.formula,
          // Replace the results array wholesale so column edits propagate
          // cleanly. RollTable.results is an embedded collection; passing
          // the full array via update() replaces existing entries.
          results: t.results
        });
      }
      if (updates.length) {
        await RollTable.updateDocuments(updates, { pack: pack.collection });
      }
    }
    await game.settings.set("flail", VERSION_SETTING, HEXCRAWL_TABLES_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced hexcrawl tables (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync hexcrawl tables", err);
    ui.notifications?.error(
      "FLAIL: failed to sync hexcrawl tables — see console."
    );
  }
}
