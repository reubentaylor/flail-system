import { WIZARD_SPELLS } from "./wizard-spells-data.mjs";

/**
 * Version stamp for the bundled wizard spells. Bump whenever the data
 * file changes meaningfully (new spells, corrected text, suggested-dice
 * tweaks) so existing worlds re-import the updated entries on next
 * load.
 *
 *   1 — initial bundle (43 spells from FLAIL v0.2 pages 40, 42-43).
 *   2 — icon-path fixes for 19 spells whose Foundry icon references
 *       404'd (broken links). Rules text unchanged.
 */
export const WIZARD_SPELLS_VERSION = 2;

const VERSION_SETTING = "wizardSpellsVersion";
const PACK_NAME = "flail-wizard-spells";
const PACK_LABEL = "FLAIL Wizard Spells";

/**
 * On `ready`, ensure a world-level compendium exists with all FLAIL
 * wizard spells imported. Mirrors ensureDarkSpellsCompendium exactly
 * — same version-aware sync, same idempotent guards, same GM-only
 * restriction. Players (Wizards) drag entries from the compendium
 * onto their sheet to populate their Master Spellbook.
 *
 * Traditions used to categorise entries:
 *   arcane   — 20 common spells from page 40 d20 table
 *   flame    — 5 spells from Flakumeg the Flame Whisperer
 *   shadow   — 6 spells from Û-Kraal the Shadow Manipulator
 *   ooze     — 6 spells from OooOozey Oozzeborne
 *   illusion — 6 spells from Choo-Choo Master of Deceit
 *
 * Compendium browser can filter on these traditions to help wizards
 * find their Master's repertoire quickly.
 */
export async function ensureWizardSpellsCompendium() {
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
      console.error("FLAIL | Failed to create wizard-spells compendium", err);
      return;
    }
  }

  const index = await pack.getIndex();
  const storedVersion = game.settings.get("flail", VERSION_SETTING);
  const upToDate = index.size >= WIZARD_SPELLS.length
                && storedVersion >= WIZARD_SPELLS_VERSION;
  if (upToDate) return;

  const existingIds = new Set([...index].map(e => e._id));
  const toCreate = WIZARD_SPELLS.filter(it => !existingIds.has(it._id));
  const toUpdate = storedVersion < WIZARD_SPELLS_VERSION
    ? WIZARD_SPELLS.filter(it => existingIds.has(it._id))
    : [];

  console.log(
    `FLAIL | Sync wizard spells: ${toCreate.length} new, ` +
    `${toUpdate.length} updated (bundle v${WIZARD_SPELLS_VERSION}, ` +
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
    await game.settings.set("flail", VERSION_SETTING, WIZARD_SPELLS_VERSION);
    if (toCreate.length || toUpdate.length) {
      ui.notifications?.info(
        `FLAIL: synced wizard spells (${toCreate.length} new, ${toUpdate.length} updated).`
      );
    }
  } catch (err) {
    console.error("FLAIL | Failed to sync wizard spells", err);
    ui.notifications?.error(
      "FLAIL: failed to sync wizard spells — see console."
    );
  }
}
