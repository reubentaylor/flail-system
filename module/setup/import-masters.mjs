import { buildMastersData } from "./masters-data.mjs";

/**
 * Version stamp for the bundled Wizard Masters. Bump when the data
 * (repertoires, flavour, stats) changes so existing worlds re-sync.
 *
 *   1 — initial bundle (Ship A). 4 canonicals (Flakumeg, Û-Kraal,
 *       Oozzeborne, Choo-Choo) + Custom Master template.
 */
export const MASTERS_VERSION = 1;

const VERSION_SETTING = "mastersVersion";
const PACK_NAME  = "flail-masters";
const PACK_LABEL = "Wizard Masters";
const SPELLS_PACK = "flail-wizard-spells";

/**
 * Resolve repertoire spell name references to concrete UUIDs against
 * the wizard-spells compendium (falling back to any Item pack). Called
 * at sync time so the Master Items ship with resolved UUIDs. A name
 * that can't be resolved leaves uuid = "" and the starting-spell import
 * skips it with its own warning.
 */
async function resolveReferences(bundle) {
  const spellsPack = game.packs.get(`world.${SPELLS_PACK}`);
  const spellByName = new Map();
  if (spellsPack) {
    const idx = await spellsPack.getIndex();
    for (const e of idx) {
      spellByName.set((e.name ?? "").toLowerCase(),
        { uuid: `Compendium.${spellsPack.collection}.Item.${e._id}` });
    }
  } else {
    console.warn(`FLAIL | Masters sync: spells compendium '${SPELLS_PACK}' not found — repertoire refs left unresolved.`);
  }

  // Fallback index across every Item pack (for signature items, homebrew).
  const anyItemByName = new Map();
  for (const pack of game.packs) {
    if (pack.metadata.type !== "Item") continue;
    const idx = await pack.getIndex();
    for (const e of idx) {
      const key = (e.name ?? "").toLowerCase();
      if (!anyItemByName.has(key)) {
        anyItemByName.set(key, { uuid: `Compendium.${pack.collection}.Item.${e._id}` });
      }
    }
  }

  for (const master of bundle) {
    const sys = master.system;

    // Repertoire spells
    for (const s of sys.spells ?? []) {
      if (!s.name || s.uuid) continue;
      const hit = spellByName.get(s.name.toLowerCase()) ?? anyItemByName.get(s.name.toLowerCase());
      if (hit) s.uuid = hit.uuid;
      else console.warn(`FLAIL | Masters sync: spell "${s.name}" not found for Master "${master.name}".`);
    }

    // Signature item (single ref, optional — usually a unique weapon
    // not in any pack, so it commonly stays name-only for display).
    const sig = sys.signatureItem;
    if (sig?.name && !sig.uuid) {
      const hit = anyItemByName.get(sig.name.toLowerCase());
      if (hit) sig.uuid = hit.uuid;
      // No warning — signature items are display-only and rarely packed.
    }
  }
}

/**
 * Create/refresh the Wizard Masters compendium at world init. GM-only.
 * Must run AFTER `ensureWizardSpellsCompendium` so repertoire UUIDs
 * resolve during data prep.
 */
export async function ensureMastersCompendium() {
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
      console.error("FLAIL | Failed to create masters compendium", err);
      return;
    }
  }

  const bundle = buildMastersData();
  await resolveReferences(bundle);

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= bundle.length && storedVersion >= MASTERS_VERSION;
  if (upToDate) return;

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = bundle.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < MASTERS_VERSION
    ? bundle.filter(it => existingIds.has(it._id))
    : [];

  console.log(
    `FLAIL | Sync masters: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${MASTERS_VERSION}, stored v${storedVersion}).`
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
    await game.settings.set("flail", VERSION_SETTING, MASTERS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced Wizard Masters (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync masters", err);
    ui.notifications?.error("FLAIL: failed to sync Wizard Masters — see console.");
  }
}
