import { buildInvocationsData } from "./invocations-data.mjs";

/**
 * Version stamp for the bundled Warlock invocations. Bump when the data
 * changes so existing worlds re-sync.
 *
 *   1 — initial bundle. 40 invocations (4 Dark Pacts × d10) from the
 *       Warlock Player Reference Booklet.
 */
export const INVOCATIONS_VERSION = 1;

const VERSION_SETTING = "invocationsVersion";
const PACK_NAME  = "flail-invocations";
const PACK_LABEL = "Warlock Invocations";

/**
 * Create/refresh the Warlock Invocations compendium at world init.
 * GM-only. Mirrors ensureDivinePrayersCompendium. Must run BEFORE
 * ensureDarkPactsCompendium so pact invocation refs resolve.
 */
export async function ensureInvocationsCompendium() {
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
      console.error("FLAIL | Failed to create invocations compendium", err);
      return;
    }
  }

  const bundle = buildInvocationsData();
  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= bundle.length && storedVersion >= INVOCATIONS_VERSION;
  if (upToDate) return;

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = bundle.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < INVOCATIONS_VERSION
    ? bundle.filter(it => existingIds.has(it._id))
    : [];

  console.log(
    `FLAIL | Sync invocations: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${INVOCATIONS_VERSION}, stored v${storedVersion}).`
  );

  try {
    if (toCreate.length) {
      await Item.createDocuments(toCreate, { pack: pack.collection, keepId: true });
    }
    if (toUpdate.length) {
      const updates = toUpdate.map(it => ({ _id: it._id, name: it.name, img: it.img, system: it.system }));
      await Item.updateDocuments(updates, { pack: pack.collection });
    }
    await game.settings.set("flail", VERSION_SETTING, INVOCATIONS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced Warlock invocations (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync invocations", err);
    ui.notifications?.error("FLAIL: failed to sync Warlock invocations — see console.");
  }
}
