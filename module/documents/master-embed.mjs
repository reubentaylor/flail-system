/**
 * Wizard Master (patron) embed/delete lifecycle (Ship A).
 *
 * Mirrors the Cleric Religion lifecycle (religion-embed.mjs), with one
 * RAW difference: a Religion imports ALL its prayers, whereas a Master
 * grants only the apprentice's STARTING spells — "three random spells,
 * plus two of their choice from their Master's repertoire" (rulebook
 * p.38). The repertoire itself is the pool the Wizard may draw from on
 * level-up; it is NOT imported wholesale.
 *
 * Starting-spell grant is gated by `system.classOptions.wizardSpellbookSeeded`
 * so re-embedding / swapping a Master later never re-seeds the spellbook.
 *
 * Granted spells are flagged `flags.flail.fromMaster = true` +
 * `flags.flail.masterItemId = <master.id>` so swap/delete cleanup can
 * find them, exactly like the religion prayers.
 */

/**
 * Seed the Wizard's starting spells from a freshly-embedded Master:
 * 3 random arcane (common) spells + 2 chosen from the Master's
 * repertoire. No-op if the spellbook was already seeded.
 *
 * @param {Actor} actor   the Wizard
 * @param {Item}  master  the embedded Master Item
 * @returns {Promise<{imported:number, skipped:number, seeded:boolean}>}
 */
export async function importMasterStartingSpells(actor, master) {
  // Respect the one-time seed gate — a Wizard's starting spellbook is
  // seeded once, on first Master embed. Later swaps change the
  // repertoire they draw from, not the already-granted spells.
  if (actor.system?.classOptions?.wizardSpellbookSeeded) {
    return { imported: 0, skipped: 0, seeded: false };
  }

  const existingByName = new Map();
  for (const item of actor.items) {
    if (item.type !== "spell") continue;
    existingByName.set((item.name ?? "").toLowerCase(), item);
  }

  const toEmbed = [];
  const skipped = [];
  const seen = new Set();

  const pushSpellData = (data) => {
    const nameKey = (data.name ?? "").toLowerCase();
    if (!nameKey || seen.has(nameKey) || existingByName.has(nameKey)) return;
    seen.add(nameKey);
    delete data._id;
    data.flags = data.flags ?? {};
    data.flags.flail = data.flags.flail ?? {};
    data.flags.flail.fromMaster = true;
    data.flags.flail.masterItemId = master.id;
    toEmbed.push(data);
  };

  /* ----- 3 random arcane (common) spells ----- */
  try {
    const { WIZARD_SPELLS } = await import("../setup/wizard-spells-data.mjs");
    const pool = WIZARD_SPELLS.filter(s => s.system?.tradition === "arcane");
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    for (const s of pool.slice(0, 3)) {
      pushSpellData(foundry.utils.deepClone(s));
    }
  } catch (err) {
    console.error("FLAIL | Master seed: arcane pool load failed:", err);
  }

  /* ----- 2 chosen from the Master's repertoire ----- */
  const repertoire = master.system?.spells ?? [];
  const chosen = await pickRepertoireSpells(master, 2);
  for (const ref of chosen) {
    if (!ref.uuid) { skipped.push(ref.name || "(unnamed)"); continue; }
    try {
      const source = await fromUuid(ref.uuid);
      if (!source) { skipped.push(ref.name || ref.uuid); continue; }
      pushSpellData(source.toObject());
    } catch (err) {
      console.error(`FLAIL | Master seed: failed to resolve ${ref.uuid}:`, err);
      skipped.push(ref.name || ref.uuid);
    }
  }

  if (toEmbed.length) {
    await actor.createEmbeddedDocuments("Item", toEmbed);
  }
  // Flip the seed gate so the spellbook is never re-seeded.
  await actor.update({ "system.classOptions.wizardSpellbookSeeded": true });

  if (skipped.length) {
    ui.notifications?.warn(
      `FLAIL: ${skipped.length} starting spell(s) could not be granted: ${skipped.join(", ")}`
    );
  }
  return { imported: toEmbed.length, skipped: skipped.length, seeded: true };
}

/**
 * Choose `count` spells from a Master's repertoire. If the repertoire
 * holds `count` or fewer, all are taken. Otherwise a checkbox dialog
 * asks the player to pick exactly `count`; cancelling or a headless
 * context falls back to the first `count`.
 *
 * @param {Item}   master
 * @param {number} count
 * @returns {Promise<Array<{uuid:string,name:string}>>}
 */
async function pickRepertoireSpells(master, count) {
  const repertoire = (master.system?.spells ?? []).filter(r => r.uuid);
  if (repertoire.length <= count) return repertoire;

  const rows = repertoire.map((r, i) => `
    <label style="display:flex;align-items:center;gap:0.4em;padding:0.15em 0;">
      <input type="checkbox" name="pick" value="${i}" />
      <span>${foundry.utils.escapeHTML?.(r.name) ?? r.name}</span>
    </label>`).join("");

  const chosenIdx = await foundry.applications.api.DialogV2.wait({
    window: { title: `${master.name} — choose ${count} starting spells` },
    classes: ["flail-bw-dialog"],
    content: `
      <p style="margin:0 0 0.5em 0;">Pick <strong>${count}</strong> spells from your Master's repertoire to start with:</p>
      <div class="flail-master-pick">${rows}</div>`,
    buttons: [
      {
        action: "ok", label: "Grant selected", default: true,
        callback: (event, button, dialog) => {
          const root = dialog?.element ?? button?.form ?? null;
          if (!root) return [];
          return Array.from(root.querySelectorAll('input[name="pick"]:checked'))
            .map(el => Number(el.value));
        }
      },
      { action: "cancel", label: "Use first two" }
    ],
    rejectClose: false,
    submit: v => v
  }).catch(() => null);

  let picks;
  if (Array.isArray(chosenIdx) && chosenIdx.length > 0) {
    picks = chosenIdx.slice(0, count).map(i => repertoire[i]).filter(Boolean);
    // If they under-picked, top up from the front.
    if (picks.length < count) {
      for (const r of repertoire) {
        if (picks.length >= count) break;
        if (!picks.includes(r)) picks.push(r);
      }
    }
  } else {
    picks = repertoire.slice(0, count);
  }
  return picks;
}

/**
 * Delete all embedded spells granted by the given Master.
 */
export async function deleteMasterSpells(actor, masterItemId) {
  const ids = actor.items
    .filter(i => i.getFlag?.("flail", "fromMaster")
              && i.getFlag?.("flail", "masterItemId") === masterItemId)
    .map(i => i.id);
  if (ids.length === 0) return 0;
  await actor.deleteEmbeddedDocuments("Item", ids);
  return ids.length;
}

/**
 * Strip the fromMaster flag so master-granted spells "unmoor" and
 * become manually-authored (kept on the sheet, no longer tied to the
 * Master).
 */
export async function unmoorMasterSpells(actor, masterItemId) {
  const updates = actor.items
    .filter(i => i.getFlag?.("flail", "fromMaster")
              && i.getFlag?.("flail", "masterItemId") === masterItemId)
    .map(i => ({
      _id: i.id,
      "flags.flail.fromMaster": false,
      "flags.flail.masterItemId": null
    }));
  if (updates.length === 0) return 0;
  await actor.updateEmbeddedDocuments("Item", updates);
  return updates.length;
}

/**
 * Three-choice dialog when a Master is dropped onto a Wizard who
 * already has one. Replace-and-keep unmoors the old grants; the new
 * Master's createItem hook seeds nothing (spellbook already seeded).
 */
export async function handleMasterSwap(actor, existingMaster, newMasterData) {
  const oldName = existingMaster.name;
  const newName = newMasterData.name ?? "the new Master";
  const oldSpellCount = actor.items.filter(i =>
    i.getFlag?.("flail", "fromMaster")
    && i.getFlag?.("flail", "masterItemId") === existingMaster.id
  ).length;

  const choice = await foundry.applications.api.DialogV2.wait({
    window: { title: `Change Master — ${actor.name}` },
    classes: ["flail-bw-dialog"],
    content: `
      <p><strong>${oldName}</strong> is already this Wizard's Master.</p>
      <p>Replace with <strong>${newName}</strong>?</p>
      ${oldSpellCount > 0
        ? `<p>${oldSpellCount} spell(s) were granted by the old Master. What should happen to them?</p>`
        : `<p>The old Master granted no tracked spells.</p>`}
    `,
    buttons: [
      { action: "replaceClean", label: `Replace + delete granted spells${oldSpellCount > 0 ? ` (${oldSpellCount})` : ""}`, default: true, icon: "fas fa-broom" },
      { action: "replaceKeep",  label: "Replace + keep granted spells (unmoor them)", icon: "fas fa-anchor" },
      { action: "cancel",       label: "Cancel" }
    ],
    rejectClose: false
  });

  if (choice === "cancel" || !choice) return false;

  if (choice === "replaceClean" && oldSpellCount > 0) {
    await deleteMasterSpells(actor, existingMaster.id);
  } else if (choice === "replaceKeep" && oldSpellCount > 0) {
    await unmoorMasterSpells(actor, existingMaster.id);
  }
  await existingMaster.delete({ flailSwap: true });

  const cloneData = foundry.utils.deepClone(newMasterData);
  delete cloneData._id;
  await actor.createEmbeddedDocuments("Item", [cloneData]);
  return true;
}

/**
 * Cleanup dialog when a Master is removed. Skipped when options.flailSwap
 * is set (the swap flow already handled cleanup).
 */
export async function handleMasterDelete(masterItem, options) {
  if (options?.flailSwap) return true;
  const actor = masterItem.parent;
  if (!actor || actor.documentName !== "Actor") return true;

  const spellCount = actor.items.filter(i =>
    i.getFlag?.("flail", "fromMaster")
    && i.getFlag?.("flail", "masterItemId") === masterItem.id
  ).length;

  if (spellCount === 0) return true; // clean delete, no dialog

  const choice = await foundry.applications.api.DialogV2.wait({
    window: { title: `Remove Master — ${actor.name}` },
    classes: ["flail-bw-dialog"],
    content: `
      <p>Removing <strong>${masterItem.name}</strong> from ${actor.name}.</p>
      <p>${spellCount} spell(s) were granted by this Master. What should happen to them?</p>
    `,
    buttons: [
      { action: "keep",   label: "Keep spells (unmoor them)", default: true, icon: "fas fa-anchor" },
      { action: "delete", label: `Delete all ${spellCount} spell(s)`, icon: "fas fa-trash" },
      { action: "cancel", label: "Cancel removal" }
    ],
    rejectClose: false
  });

  if (choice === "cancel" || !choice) return false;
  if (choice === "delete") {
    await deleteMasterSpells(actor, masterItem.id);
  } else {
    await unmoorMasterSpells(actor, masterItem.id);
  }
  return true;
}
