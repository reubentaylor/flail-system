/**
 * Cleric Religion embed/delete lifecycle (v0.4.62).
 *
 * When a religion Item is dropped onto a Cleric character:
 *   - If the actor has no religion embedded → embed + import the
 *     religion's 6 prayers (flagged `fromReligion`).
 *   - If the actor already has a religion → block the create + open
 *     a three-choice dialog (replace-and-clean / replace-and-keep /
 *     cancel) that handles cleanup + re-embed.
 *
 * When a religion Item is deleted from a Cleric:
 *   - Open a delete-cleanup dialog (three choices matching the
 *     background delete pattern: keep prayers / delete prayers /
 *     cancel).
 *
 * Non-Cleric actors that embed a religion get a soft warning but
 * the embed is allowed (the item just sits on the sheet inertly).
 *
 * Design references: D10, D11 from the v0.4.58 planning conversation.
 */

/**
 * Import the religion's 6 (or however many) prayers onto the actor.
 * Each imported item carries flags.flail.fromReligion = true and
 * flags.flail.religionItemId = <religionItem.id> so we can find them
 * again on delete-cleanup or on religion swap.
 *
 * Skips entries with blank UUID (log warning + notify).
 */
export async function importReligionPrayers(actor, religionItem) {
  const prayerRefs = religionItem.system?.prayers ?? [];
  if (prayerRefs.length === 0) return { imported: 0, adopted: 0, skipped: 0 };

  // Build a case-insensitive index of existing prayer names on the
  // actor. Dedupe strategy: if the actor already has an item with the
  // same name, don't import a duplicate — instead adopt the existing
  // one by flagging it with `fromReligion`, so subsequent religion
  // swaps/deletes treat it as part of this religion. If the existing
  // one is already flagged (from a prior swap-and-keep), leave alone.
  const existingByName = new Map();
  for (const item of actor.items) {
    if (item.type !== "prayer") continue;
    existingByName.set((item.name ?? "").toLowerCase(), item);
  }

  const toEmbed = [];
  const toAdopt = [];
  const skipped = [];
  for (const ref of prayerRefs) {
    const name = ref.name ?? "";
    const existing = existingByName.get(name.toLowerCase());
    if (existing) {
      // Already present on the actor — adopt if unflagged, else skip.
      const alreadyFlagged = !!existing.getFlag?.("flail", "fromReligion");
      if (!alreadyFlagged) {
        toAdopt.push({
          _id: existing.id,
          "flags.flail.fromReligion": true,
          "flags.flail.religionItemId": religionItem.id
        });
      }
      continue;
    }
    if (!ref.uuid) {
      skipped.push(name || "(unnamed)");
      continue;
    }
    try {
      const source = await fromUuid(ref.uuid);
      if (!source) {
        skipped.push(name || ref.uuid);
        continue;
      }
      const data = source.toObject();
      delete data._id;
      data.flags = data.flags ?? {};
      data.flags.flail = data.flags.flail ?? {};
      data.flags.flail.fromReligion = true;
      data.flags.flail.religionItemId = religionItem.id;
      toEmbed.push(data);
    } catch (err) {
      console.error(`FLAIL | Failed to resolve prayer ${ref.uuid}:`, err);
      skipped.push(name || ref.uuid);
    }
  }

  if (toEmbed.length) {
    await actor.createEmbeddedDocuments("Item", toEmbed);
  }
  if (toAdopt.length) {
    await actor.updateEmbeddedDocuments("Item", toAdopt);
  }
  if (skipped.length) {
    ui.notifications?.warn(
      `FLAIL: ${skipped.length} religion prayer(s) could not be imported: ${skipped.join(", ")}`
    );
  }
  return { imported: toEmbed.length, adopted: toAdopt.length, skipped: skipped.length };
}

/**
 * Delete all embedded prayer items that came from the given religion
 * (matched via flags.flail.religionItemId). Used by the delete-cleanup
 * dialog and the religion-swap flow.
 */
export async function deleteReligionPrayers(actor, religionItemId) {
  const ids = actor.items
    .filter(i => i.getFlag?.("flail", "fromReligion")
              && i.getFlag?.("flail", "religionItemId") === religionItemId)
    .map(i => i.id);
  if (ids.length === 0) return 0;
  await actor.deleteEmbeddedDocuments("Item", ids);
  return ids.length;
}

/**
 * Strip the fromReligion flag from prayers that came from the given
 * religion so they "unmoor" from it (become manually-authored). Used
 * when the player chooses "keep prayers" during a religion swap.
 */
export async function unmoorReligionPrayers(actor, religionItemId) {
  const updates = actor.items
    .filter(i => i.getFlag?.("flail", "fromReligion")
              && i.getFlag?.("flail", "religionItemId") === religionItemId)
    .map(i => ({
      _id: i.id,
      "flags.flail.fromReligion": false,
      "flags.flail.religionItemId": null
    }));
  if (updates.length === 0) return 0;
  await actor.updateEmbeddedDocuments("Item", updates);
  return updates.length;
}

/**
 * Open the three-choice dialog when a religion is being dropped onto
 * a Cleric who already has one embedded. Handles the cleanup + re-
 * embed based on the player's choice.
 *
 * @param {Actor} actor            The Cleric character
 * @param {Item}  existingReligion Currently-embedded religion Item
 * @param {object} newReligionData Data of the new religion being dropped
 * @returns {Promise<boolean>}     true if the swap completed, false if cancelled
 */
export async function handleReligionSwap(actor, existingReligion, newReligionData) {
  const oldName = existingReligion.name;
  const newName = newReligionData.name ?? "the new religion";
  const oldPrayerCount = actor.items.filter(i =>
    i.getFlag?.("flail", "fromReligion")
    && i.getFlag?.("flail", "religionItemId") === existingReligion.id
  ).length;

  const choice = await foundry.applications.api.DialogV2.wait({
    window: { title: `Change religion — ${actor.name}` },
    classes: ["flail-bw-dialog"],
    content: `
      <p><strong>${oldName}</strong> is already embedded on ${actor.name}.</p>
      <p>Replace it with <strong>${newName}</strong>?</p>
      ${oldPrayerCount > 0
        ? `<p>${oldPrayerCount} prayer(s) came from the old religion. What should happen to them?</p>`
        : `<p>The old religion has no imported prayers to worry about.</p>`}
    `,
    buttons: [
      { action: "replaceClean", label: `Replace + delete old prayers${oldPrayerCount > 0 ? ` (${oldPrayerCount})` : ""}`, default: true, icon: "fas fa-broom" },
      { action: "replaceKeep",  label: "Replace + keep old prayers (unmoor them)", icon: "fas fa-anchor" },
      { action: "cancel",       label: "Cancel" }
    ],
    rejectClose: false
  });

  if (choice === "cancel" || !choice) return false;

  // Delete the OLD religion first (this cascades to its cleanup hook,
  // but we're going to opt out of the delete-cleanup dialog via a
  // marker flag on the options — the swap already handles it).
  if (choice === "replaceClean" && oldPrayerCount > 0) {
    await deleteReligionPrayers(actor, existingReligion.id);
  } else if (choice === "replaceKeep" && oldPrayerCount > 0) {
    await unmoorReligionPrayers(actor, existingReligion.id);
  }
  await existingReligion.delete({ flailSwap: true });

  // Create the NEW religion Item on the actor. The createItem hook
  // will then handle prayer import.
  const cloneData = foundry.utils.deepClone(newReligionData);
  delete cloneData._id;
  await actor.createEmbeddedDocuments("Item", [cloneData]);
  return true;
}

/**
 * Open the delete-cleanup dialog when a religion is being removed
 * from an actor. Called from preDeleteItem hook — returns true to
 * allow delete, false to cancel.
 *
 * Skipped when options.flailSwap is set (the swap flow already
 * handled prayer cleanup).
 */
export async function handleReligionDelete(religionItem, options) {
  if (options?.flailSwap) return true;
  const actor = religionItem.parent;
  if (!actor || actor.documentName !== "Actor") return true;

  const prayerCount = actor.items.filter(i =>
    i.getFlag?.("flail", "fromReligion")
    && i.getFlag?.("flail", "religionItemId") === religionItem.id
  ).length;

  if (prayerCount === 0) return true; // clean delete, no dialog needed

  const choice = await foundry.applications.api.DialogV2.wait({
    window: { title: `Remove religion — ${actor.name}` },
    classes: ["flail-bw-dialog"],
    content: `
      <p>Removing <strong>${religionItem.name}</strong> from ${actor.name}.</p>
      <p>${prayerCount} prayer(s) were imported from this religion. What should happen to them?</p>
    `,
    buttons: [
      { action: "keep",   label: "Keep prayers (unmoor them)", default: true, icon: "fas fa-anchor" },
      { action: "delete", label: `Delete all ${prayerCount} prayer(s)`, icon: "fas fa-trash" },
      { action: "cancel", label: "Cancel removal" }
    ],
    rejectClose: false
  });

  if (choice === "cancel" || !choice) return false;
  if (choice === "delete") {
    await deleteReligionPrayers(actor, religionItem.id);
  } else {
    await unmoorReligionPrayers(actor, religionItem.id);
  }
  return true;
}
