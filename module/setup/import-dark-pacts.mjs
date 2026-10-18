import { buildDarkPactsData } from "./dark-pacts-data.mjs";

/**
 * Version stamp for the bundled Dark Pacts. Bump when the data
 * (invocation tables, boons, fiends, flavour) changes so existing
 * worlds re-sync.
 *
 *   1 — initial bundle. 4 canonicals (Infernal Bargain, Void Covenant,
 *       Draconic Accord, Death Bond) + Custom Pact template.
 */
export const DARK_PACTS_VERSION = 1;

const VERSION_SETTING   = "darkPactsVersion";
const PACK_NAME         = "flail-dark-pacts";
const PACK_LABEL        = "Warlock Dark Pacts";
const INVOCATIONS_PACK  = "flail-invocations";
const BESTIARY_PACK     = "flail-bestiary";

/** name(lowercase) → Compendium UUID for every entry in a world pack. */
async function indexByName(packName, docType) {
  const map = new Map();
  const pack = game.packs.get(`world.${packName}`);
  if (!pack) {
    console.warn(`FLAIL | Dark Pacts sync: compendium '${packName}' not found — refs left unresolved.`);
    return map;
  }
  const idx = await pack.getIndex();
  for (const e of idx) {
    const key = (e.name ?? "").toLowerCase();
    if (!map.has(key)) map.set(key, `Compendium.${pack.collection}.${docType}.${e._id}`);
  }
  return map;
}

/**
 * Resolve invocation names → invocation-pack UUIDs and fiend names →
 * bestiary Actor UUIDs. Unresolved refs keep uuid "" (display-only).
 */
async function resolveReferences(bundle) {
  const invByName   = await indexByName(INVOCATIONS_PACK, "Item");
  const beastByName = await indexByName(BESTIARY_PACK, "Actor");

  for (const pact of bundle) {
    const sys = pact.system;
    for (const ref of sys.invocations ?? []) {
      if (!ref.name || ref.uuid) continue;
      const uuid = invByName.get(ref.name.toLowerCase());
      if (uuid) ref.uuid = uuid;
      else console.warn(`FLAIL | Dark Pacts sync: invocation "${ref.name}" not found for "${pact.name}".`);
    }
    const f = sys.fiend;
    if (f?.name && !f.uuid) {
      const uuid = beastByName.get(f.name.toLowerCase());
      if (uuid) f.uuid = uuid;
      else console.warn(`FLAIL | Dark Pacts sync: fiend "${f.name}" not found in bestiary for "${pact.name}".`);
    }
  }
}

/**
 * Create/refresh the Dark Pacts compendium at world init. GM-only.
 * Must run AFTER ensureInvocationsCompendium and ensureFlailBestiary.
 */
export async function ensureDarkPactsCompendium() {
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
      console.error("FLAIL | Failed to create dark-pacts compendium", err);
      return;
    }
  }

  const bundle = buildDarkPactsData();
  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= bundle.length && storedVersion >= DARK_PACTS_VERSION;
  if (upToDate) return;

  await resolveReferences(bundle);

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = bundle.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < DARK_PACTS_VERSION
    ? bundle.filter(it => existingIds.has(it._id))
    : [];

  console.log(
    `FLAIL | Sync dark pacts: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${DARK_PACTS_VERSION}, stored v${storedVersion}).`
  );

  try {
    if (toCreate.length) {
      await Item.createDocuments(toCreate, { pack: pack.collection, keepId: true });
    }
    if (toUpdate.length) {
      const updates = toUpdate.map(it => ({ _id: it._id, name: it.name, img: it.img, system: it.system }));
      await Item.updateDocuments(updates, { pack: pack.collection });
    }
    await game.settings.set("flail", VERSION_SETTING, DARK_PACTS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced Warlock Dark Pacts (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync dark pacts", err);
    ui.notifications?.error("FLAIL: failed to sync Warlock Dark Pacts — see console.");
  }
}
