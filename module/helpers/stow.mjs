import { FLAIL } from "./config.mjs";

/**
 * Stow items into a character's inventory slots (shared utility).
 *
 * Finds a free slot for each given item and writes its `location` +
 * `slotIndex`, so items that arrive unslotted (e.g. looted via Item Piles,
 * or any programmatic add) can be auto-placed instead of sitting in the
 * loose/unequipped tray. Exposed on `game.flail.stowItems` so optional
 * modules can call it without duplicating the slot rules.
 *
 * Honours everything the drag-drop logic does: STR/level-locked slots
 * (via `actor.system.slotAvailability`), per-zone type and flag
 * restrictions, and two-slot items (which must find a free slot directly
 * below the primary). Items that don't occupy slots, that are already
 * slotted, or that can't fit anywhere are left untouched (so a full
 * inventory simply leaves the item loose — loot is never discarded).
 *
 * @param {Actor}   actor                 the recipient (expects a character)
 * @param {Item[]}  items                 items to place
 * @param {object}  [opts]
 * @param {string[]}[opts.order]          zone search order (default
 *                                        stashed → worn → carried)
 * @returns {Promise<Item[]>}             the items actually placed
 */
export async function stowItems(actor, items, { order = ["satchel", "body", "hands"] } = {}) {
  if (!actor || !Array.isArray(items) || !items.length) return [];

  const zonesCfg = FLAIL.inventory?.zones ?? {};
  const avail = actor.system?.slotAvailability ?? {};

  // Current occupancy per zone, mutated as we place each item so two
  // items in the same batch never claim the same slot.
  const occ = {};
  for (const zone of Object.keys(zonesCfg)) occ[zone] = new Set();
  for (const it of actor.items) {
    const loc = it.system?.location;
    if (!loc || !(loc in zonesCfg)) continue;
    const cols = zonesCfg[loc].columns ?? 1;
    const start = it.system?.slotIndex ?? 0;
    const span = it.system?.slotsRequired ?? 1;
    for (let i = 0; i < span; i++) occ[loc].add(start + i * cols);
  }

  const updates = [];
  const placed = [];
  for (const item of items) {
    const sys = item?.system;
    if (!sys || !("location" in sys)) continue;                 // not a slot item
    if (sys.location && sys.location !== "unequipped") continue; // already stowed
    const span = sys.slotsRequired ?? 1;
    const slot = findSlot(item, span, zonesCfg, avail, occ, order);
    if (!slot) continue;                                        // no room → leave loose
    const cols = zonesCfg[slot.zone].columns ?? 1;
    for (let i = 0; i < span; i++) occ[slot.zone].add(slot.index + i * cols);
    updates.push({ _id: item.id, "system.location": slot.zone, "system.slotIndex": slot.index });
    placed.push(item);
  }

  if (updates.length) await actor.updateEmbeddedDocuments("Item", updates);
  return placed;
}

/** First free slot for `item` (span-aware) across `order`, or null. */
function findSlot(item, span, zonesCfg, avail, occ, order) {
  for (const zone of order) {
    const def = zonesCfg[zone];
    if (!def) continue;
    // Per-zone type restriction (e.g. instruments zone only takes instruments).
    if (def.allowedTypes?.length && !def.allowedTypes.includes(item.type)) continue;
    // Per-zone flag requirement (e.g. adornment only takes flagged adornments).
    if (def.requireFlag && !item.getFlag?.("flail", def.requireFlag)) continue;

    const cols = def.columns ?? 1;
    const slots = avail[zone] ?? [];
    for (const s of slots) {
      if (s.locked || occ[zone].has(s.index)) continue;
      // Two-slot items need the slot(s) below the primary free and unlocked.
      let fits = true;
      for (let i = 1; i < span; i++) {
        const nextIdx = s.index + i * cols;
        const nextSlot = slots.find(x => x.index === nextIdx);
        if (!nextSlot || nextSlot.locked || occ[zone].has(nextIdx)) { fits = false; break; }
      }
      if (fits) return { zone, index: s.index };
    }
  }
  return null;
}
