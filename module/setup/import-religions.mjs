import { buildReligionsData } from "./religions-data.mjs";

/**
 * Version stamp for the bundled religions. Bump when the data
 * (perk text, prayer lists, etc.) changes so existing worlds
 * re-sync updated entries.
 *
 *   1 — initial bundle. 4 canonicals (Brotherhood, Crusade, Shadow
 *       Demon, Verdant Grove) + Custom Religion template (v0.4.58).
 *   2 — icon fixes: mutton_tunic.webp → mutton-tunic.png; oak_leaf.webp
 *       → oakleaf_medallion.webp; custom → mystery-man.svg placeholder.
 *   3 — SCHEMA CHANGE (v0.4.60). Replaced string-token fields with
 *       item-reference objects:
 *         holySymbolItem + holySymbolTags → holySymbol { uuid, name }
 *         weaponSpecialty (string[])       → weaponSpecialty ({uuid,name}[])
 *         armourSpecialty (string[])       → armourSpecialty ({uuid,name}[])
 *       Any customised religion Items on user worlds will lose data
 *       in the removed fields (Foundry drops them silently).
 *   4 — Fix Verdant Grove weapon name: "Longbow" → "Long Bow" (matches
 *       common-items compendium naming convention with "Short Bow").
 */
export const RELIGIONS_VERSION = 4;

const VERSION_SETTING = "religionsVersion";
const PACK_NAME  = "flail-religions";
const PACK_LABEL = "Religions";
const PRAYERS_PACK = "flail-divine-prayers";

/**
 * Resolve item name references in the bundled data to concrete UUIDs.
 * Covers four fields:
 *   - system.prayers[]            → divine-prayers compendium
 *   - system.holySymbol           → any Item compendium (single ref)
 *   - system.weaponSpecialty[]    → any Item compendium (weapons)
 *   - system.armourSpecialty[]    → any Item compendium (armour)
 *
 * Called at sync time so the religion Items ship with resolved UUIDs.
 * A name that can't be resolved leaves uuid = "" and the character-
 * side wiring (v0.4.60) will skip it with its own warning.
 */
async function resolveReferences(bundle) {
  // Build a single by-name index across every Item compendium once.
  // Prayer refs prefer the divine-prayers pack, but we fall back to
  // the global index if not found there (handles homebrew authored
  // in a different pack).
  const prayersPack = game.packs.get(`world.${PRAYERS_PACK}`);
  const prayerByName = new Map();
  if (prayersPack) {
    const idx = await prayersPack.getIndex();
    for (const e of idx) {
      prayerByName.set((e.name ?? "").toLowerCase(),
        { uuid: `Compendium.${prayersPack.collection}.Item.${e._id}` });
    }
  } else {
    console.warn(`FLAIL | Religions sync: prayers compendium '${PRAYERS_PACK}' not found — prayer refs left unresolved.`);
  }

  const anyItemByName = new Map();
  for (const pack of game.packs) {
    if (pack.metadata.type !== "Item") continue;
    const idx = await pack.getIndex();
    for (const e of idx) {
      const key = (e.name ?? "").toLowerCase();
      // First match wins — canonical items in earlier-loaded packs win.
      if (!anyItemByName.has(key)) {
        anyItemByName.set(key, { uuid: `Compendium.${pack.collection}.Item.${e._id}` });
      }
    }
  }

  for (const religion of bundle) {
    const sys = religion.system;

    // Prayers
    for (const p of sys.prayers ?? []) {
      if (!p.name || p.uuid) continue;
      const hit = prayerByName.get(p.name.toLowerCase());
      if (hit) p.uuid = hit.uuid;
      else console.warn(`FLAIL | Religions sync: prayer "${p.name}" not found for religion "${religion.name}".`);
    }

    // Holy symbol (single ref, any Item type — weapons can be symbols)
    const hs = sys.holySymbol;
    if (hs?.name && !hs.uuid) {
      const hit = anyItemByName.get(hs.name.toLowerCase());
      if (hit) hs.uuid = hit.uuid;
      else console.warn(`FLAIL | Religions sync: holy symbol "${hs.name}" not found for religion "${religion.name}".`);
    }

    // Weapon specialty (list)
    for (const w of sys.weaponSpecialty ?? []) {
      if (!w.name || w.uuid) continue;
      const hit = anyItemByName.get(w.name.toLowerCase());
      if (hit) w.uuid = hit.uuid;
      else console.warn(`FLAIL | Religions sync: weapon "${w.name}" not found for religion "${religion.name}".`);
    }

    // Armour specialty (list)
    for (const a of sys.armourSpecialty ?? []) {
      if (!a.name || a.uuid) continue;
      const hit = anyItemByName.get(a.name.toLowerCase());
      if (hit) a.uuid = hit.uuid;
      else console.warn(`FLAIL | Religions sync: armour "${a.name}" not found for religion "${religion.name}".`);
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
  await resolveReferences(bundle);

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
