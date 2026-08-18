import { buildReligionsData } from "./religions-data.mjs";

/**
 * Version stamp for the bundled religions. Bump when the data
 * (perk text, prayer lists, etc.) changes so existing worlds
 * re-sync updated entries.
 *
 *   1 — initial bundle. 4 canonicals (Brotherhood, Crusade, Shadow
 *       Demon, Verdant Grove) + Custom Religion template (v0.4.58).
 */
export const RELIGIONS_VERSION = 1;

const VERSION_SETTING = "religionsVersion";
const PACK_NAME  = "flail-religions";
const PACK_LABEL = "Religions";
const PRAYERS_PACK = "flail-divine-prayers";

/**
 * Resolve prayer names in the bundled data to concrete { uuid, name }
 * pairs pointing into the divine-prayers compendium. Called at sync
 * time so the religion Items ship with resolved references — the
 * character-side wiring (v0.4.59) then just clones by UUID.
 *
 * If a name doesn't resolve (missing prayer), logs a warning and
 * leaves the entry with only a name (uuid empty), which the
 * character-side code will skip with its own warning.
 */
async function resolvePrayerReferences(bundle) {
  const pack = game.packs.get(`world.${PRAYERS_PACK}`);
  if (!pack) {
    console.warn(`FLAIL | Religions sync: prayers compendium '${PRAYERS_PACK}' not found — prayer references left unresolved.`);
    return;
  }
  const index = await pack.getIndex();
  const byName = new Map([...index].map(e => [(e.name ?? "").toLowerCase(), e]));

  for (const religion of bundle) {
    const prayers = religion.system?.prayers ?? [];
    for (const p of prayers) {
      if (!p.name || p.uuid) continue;
      const hit = byName.get(p.name.toLowerCase());
      if (hit) {
        p.uuid = `Compendium.${pack.collection}.Item.${hit._id}`;
      } else {
        console.warn(`FLAIL | Religions sync: prayer "${p.name}" not found in ${PRAYERS_PACK} for religion "${religion.name}".`);
      }
    }
  }
}

/**
 * Create/refresh the Religions compendium at world init. GM-only.
 * Must run AFTER `ensureDivinePrayersCompendium` so prayer UUIDs
 * resolve during data prep.
 */
export async function ensureReligionsCompendium() {
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
      console.error("FLAIL | Failed to create religions compendium", err);
      return;
    }
  }

  const bundle = buildReligionsData();
  await resolvePrayerReferences(bundle);

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= bundle.length && storedVersion >= RELIGIONS_VERSION;
  if (upToDate) return;

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = bundle.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < RELIGIONS_VERSION
    ? bundle.filter(it => existingIds.has(it._id))
    : [];

  console.log(
    `FLAIL | Sync religions: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${RELIGIONS_VERSION}, ` +
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
    await game.settings.set("flail", VERSION_SETTING, RELIGIONS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced religions (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync religions", err);
    ui.notifications?.error("FLAIL: failed to sync religions — see console.");
  }
}
