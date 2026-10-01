/**
 * Hireling type grants (Ship H1).
 *
 * Applying a Type to a hireling seeds its Ability text + Allowance and
 * auto-applies the type's starting package, mirroring how background
 * grants embed items and adjust attributes:
 *   - hpBonus            → +max HP (and top up current)
 *   - attrSet            → set an attribute's base (e.g. Cutpurse 8 DEX)
 *   - itemsByName        → embed weapons/armour/gear from any Item pack,
 *                          placed into a free inventory slot
 *   - talentsByName      → embed thieving talents (Pick Lock / Pick Pocket)
 *   - randomArcaneSpell  → embed one random arcane Wizard spell (Apprentice)
 *
 * Embedded grant items are stamped flags.flail.fromHirelingGrant so a
 * later type change / cleanup ship can find them. Guarded by
 * system.grantsApplied so a type's grants apply only once.
 */

import { FLAIL } from "../helpers/config.mjs";

/**
 * Apply a hireling type to an actor: set type/ability/allowance and, on
 * first application, its starting grants.
 * @param {Actor}  actor
 * @param {string} typeKey  key into FLAIL.hirelingTypes
 * @param {object} [opts]
 * @param {boolean} [opts.force]  re-apply grants even if grantsApplied
 */
export async function applyHirelingType(actor, typeKey, { force = false } = {}) {
  const def = FLAIL.hirelingTypes?.[typeKey];
  if (!def) {
    ui.notifications?.warn(`FLAIL: unknown hireling type "${typeKey}".`);
    return false;
  }

  // Always update the type / ability / allowance headline fields.
  await actor.update({
    "system.hirelingType": typeKey,
    "system.ability":      def.ability ?? "",
    "system.allowance":    def.allowance ?? 0
  });

  if (actor.system?.grantsApplied && !force) {
    ui.notifications?.info(`FLAIL: ${actor.name} is now a ${def.label}. (Starting grants already applied — not repeated.)`);
    return true;
  }

  const grants = def.grants ?? {};
  const summary = [];

  // --- hpBonus ---
  if (Number.isInteger(grants.hpBonus) && grants.hpBonus !== 0) {
    const curMax = actor.system?.hp?.max ?? 0;
    const newMax = curMax + grants.hpBonus;
    await actor.update({ "system.hp.max": newMax, "system.hp.value": newMax });
    summary.push(`+${grants.hpBonus} HP`);
  }

  // --- attrSet (set an attribute's base) ---
  if (grants.attrSet && typeof grants.attrSet === "object") {
    const updates = {};
    for (const [attr, val] of Object.entries(grants.attrSet)) {
      if (!FLAIL.attributeKeys.includes(attr)) continue;
      updates[`system.attributes.${attr}.base`] = val;
    }
    if (Object.keys(updates).length) {
      await actor.update(updates);
      summary.push(Object.entries(grants.attrSet).map(([a, v]) => `${a.toUpperCase()} ${v}`).join(", "));
    }
  }

  // --- itemsByName (slotted: weapons/armour/gear) ---
  const toEmbed = [];
  for (const name of grants.itemsByName ?? []) {
    const src = await findItemInPacks(name);
    if (!src) { ui.notifications?.warn(`FLAIL: grant item "${name}" not found in any compendium.`); continue; }
    const data = src.toObject();
    delete data._id;
    stampGrant(data);
    // Assign a free inventory slot if the item carries inventory fields.
    if (data.system && "location" in data.system) {
      const slot = findFreeHirelingSlot(actor, toEmbed, data.system.slotsRequired ?? 1);
      if (slot) { data.system.location = slot.zone; data.system.slotIndex = slot.index; }
    }
    toEmbed.push(data);
    summary.push(name);
  }

  // --- talentsByName (unslotted thieving talents) ---
  for (const name of grants.talentsByName ?? []) {
    const src = await findItemInPack("world.flail-thieving-talents", name)
             ?? await findItemInPacks(name);
    if (!src) { ui.notifications?.warn(`FLAIL: talent "${name}" not found.`); continue; }
    const data = src.toObject();
    delete data._id;
    stampGrant(data);
    toEmbed.push(data);
    summary.push(name);
  }

  // --- randomArcaneSpell (Apprentice) ---
  if (grants.randomArcaneSpell) {
    const spell = await pickRandomArcaneSpell();
    if (spell) {
      const data = spell.toObject();
      delete data._id;
      stampGrant(data);
      toEmbed.push(data);
      summary.push(`spell: ${spell.name}`);
    } else {
      ui.notifications?.warn("FLAIL: no arcane Wizard spell available to grant.");
    }
  }

  if (toEmbed.length) {
    await actor.createEmbeddedDocuments("Item", toEmbed);
  }

  await actor.update({ "system.grantsApplied": true });
  ui.notifications?.info(
    `FLAIL: ${actor.name} hired as a ${def.label}` +
    (summary.length ? ` — ${summary.join(", ")}.` : ".")
  );
  return true;
}

/* --------------------------- helpers --------------------------- */

function stampGrant(data) {
  data.flags = data.flags ?? {};
  data.flags.flail = data.flags.flail ?? {};
  data.flags.flail.fromHirelingGrant = true;
}

/** First free hireling slot (order: hands → body → satchel), accounting
 *  for both already-embedded items and pending ones in `pending`. */
function findFreeHirelingSlot(actor, pending, span = 1) {
  const ORDER = ["hands", "body", "satchel"];
  const zonesCfg = FLAIL.hirelingInventory?.zones ?? {};
  for (const zone of ORDER) {
    const def = zonesCfg[zone];
    if (!def) continue;
    const cols = def.columns ?? 1;
    const occupied = new Set();
    const mark = (loc, start, sp) => {
      if (loc !== zone) return;
      for (let i = 0; i < (sp ?? 1); i++) occupied.add(start + i * cols);
    };
    for (const it of actor.items) mark(it.system?.location, it.system?.slotIndex ?? 0, it.system?.slotsRequired ?? 1);
    for (const p of pending) mark(p.system?.location, p.system?.slotIndex ?? 0, p.system?.slotsRequired ?? 1);
    for (let idx = 0; idx < (def.count ?? 0); idx++) {
      let fits = true;
      for (let i = 0; i < span; i++) if (occupied.has(idx + i * cols)) { fits = false; break; }
      if (fits && (idx + (span - 1) * cols) < (def.count ?? 0)) return { zone, index: idx };
    }
  }
  return null; // no room — item embeds unslotted
}

async function findItemInPack(packKey, name) {
  const pack = game.packs.get(packKey);
  if (!pack) return null;
  const idx = await pack.getIndex();
  const hit = [...idx].find(e => (e.name ?? "").toLowerCase() === name.trim().toLowerCase());
  return hit ? pack.getDocument(hit._id) : null;
}

async function findItemInPacks(name) {
  const target = name.trim().toLowerCase();
  for (const pack of game.packs) {
    if (pack.metadata.type !== "Item") continue;
    const idx = await pack.getIndex();
    const hit = [...idx].find(e => (e.name ?? "").toLowerCase() === target);
    if (hit) { const doc = await pack.getDocument(hit._id); if (doc) return doc; }
  }
  return null;
}

export async function pickRandomArcaneSpell() {
  const pack = game.packs.get("world.flail-wizard-spells");
  if (!pack) return null;
  const idx = await pack.getIndex();
  // getIndex doesn't include system.tradition by default; load docs to filter.
  const docs = await pack.getDocuments();
  const arcane = docs.filter(d => d.type === "spell" && d.system?.tradition === "arcane");
  if (arcane.length === 0) return null;
  return arcane[Math.floor(Math.random() * arcane.length)];
}
