/**
 * Combat Tree runtime helpers (Ship 2).
 *
 * The tree slots reference talents in the `flail-combat-talents`
 * COMPENDIUM by UUID. `fromUuidSync` cannot load full `system` data
 * from a compendium (it returns only the index entry), so we cannot
 * rely on it for sourceKey / trigger reads. Instead:
 *
 *   - `sourceKey` is DENORMALISED onto each tree slot at author /
 *     seed time (`<slot>SourceKey`), so the sync hook path
 *     (getIronFistStats, to-hit Fine Cuts / Raw Force / Precision
 *     Mark) works without resolving any document.
 *
 *   - Full talent documents (needed for reminder trigger metadata)
 *     are loaded ASYNC via `fromUuid` in the async attack pipeline.
 */

const SLOT_KEYS = ["basic", "expert1", "master1a", "master1b", "expert2", "master2a", "master2b"];

/** All embedded combatTree items on the actor. */
export function getCombatTrees(actor) {
  if (!actor?.items) return [];
  return actor.items.filter(i => i.type === "combatTree");
}

/**
 * SourceKeys of every picked talent across all embedded trees.
 * Reads the DENORMALISED `<slot>SourceKey` fields — fully sync, no
 * document resolution. Falls back to the legacy
 * `system.combatTalents: string[]` for Warriors with no embedded
 * trees (pre-Ship-2 characters).
 */
export function collectPickedSourceKeys(actor) {
  const trees = getCombatTrees(actor);
  if (trees.length === 0) {
    return actor?.system?.combatTalents ?? [];
  }
  const keys = [];
  for (const tree of trees) {
    const s = tree.system ?? {};
    for (const slot of SLOT_KEYS) {
      if (!s[`${slot}Picked`]) continue;
      const key = s[`${slot}SourceKey`];
      if (key) keys.push(key);
    }
  }
  return keys;
}

/**
 * References ({ uuid, sourceKey }) for every picked slot across all
 * embedded trees. Sync — does NOT resolve the documents.
 */
export function getPickedTalentRefs(actor) {
  const refs = [];
  for (const tree of getCombatTrees(actor)) {
    const s = tree.system ?? {};
    for (const slot of SLOT_KEYS) {
      if (!s[`${slot}Picked`]) continue;
      const uuid = s[`${slot}Uuid`];
      if (uuid) refs.push({ uuid, sourceKey: s[`${slot}SourceKey`] ?? "" });
    }
  }
  return refs;
}

/**
 * Async — load the full talent documents for every picked slot.
 * Uses `fromUuid` (async) so compendium docs are fully loaded with
 * their `system` trigger + reminder fields. Skips any UUID that
 * can't be resolved.
 */
export async function loadPickedTalents(actor) {
  const refs = getPickedTalentRefs(actor);
  const out = [];
  for (const ref of refs) {
    try {
      const doc = await fromUuid(ref.uuid);
      if (doc) out.push(doc);
    } catch { /* dead ref — skip */ }
  }
  return out;
}

/** Hardcoded prereq gate for the fixed 1+2+4 shape. */
export function slotEligible(treeSys, slot) {
  switch (slot) {
    case "basic":     return true;
    case "expert1":   return !!treeSys.basicPicked;
    case "expert2":   return !!treeSys.basicPicked;
    case "master1a":  return !!treeSys.expert1Picked;
    case "master1b":  return !!treeSys.expert1Picked;
    case "master2a":  return !!treeSys.expert2Picked;
    case "master2b":  return !!treeSys.expert2Picked;
    default:          return false;
  }
}

/** Slots that depend on the given slot (for cascading un-pick). */
export function dependentSlots(slot) {
  if (slot === "basic")   return ["expert1", "expert2", "master1a", "master1b", "master2a", "master2b"];
  if (slot === "expert1") return ["master1a", "master1b"];
  if (slot === "expert2") return ["master2a", "master2b"];
  return [];
}

/** Count of picked slots across all embedded trees. */
export function countPickedSlots(actor) {
  let n = 0;
  for (const tree of getCombatTrees(actor)) {
    for (const slot of SLOT_KEYS) {
      if (tree.system?.[`${slot}Picked`]) n++;
    }
  }
  return n;
}

export { SLOT_KEYS };
