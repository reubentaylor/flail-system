const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Background Grants Apply Dialog.
 *
 * Opened from the character banner's "Apply Grants (N)" button. Lists
 * every unapplied grant on the embedded background item as a checkbox
 * (default checked). Player confirms → each checked grant executes,
 * one at a time, with type-appropriate side effects:
 *
 *   attribute → mutates system.attributes.<key>.mod by attrDelta
 *   item      → searches all Item compendiums for a document whose
 *               name matches itemName, embeds a copy on the actor
 *   crossClass→ opens a sub-picker listing items of the target
 *               class+type from compendiums (spells for wizard,
 *               prayers for cleric, etc.), player picks one, embed
 *   note      → no side-effect, just marks applied
 *
 * Each successful grant application flips its `applied` flag to true
 * on the embedded background item, so re-clicking the button surfaces
 * only remaining work.
 */
export class BackgroundGrantsDialog extends HandlebarsApplicationMixin(ApplicationV2) {

  static DEFAULT_OPTIONS = {
    id: "flail-background-grants-dialog-{id}",
    tag: "form",
    classes: ["flail", "background-grants-dialog"],
    position: { width: 520, height: "auto" },
    window: {
      icon: "fa-solid fa-scroll",
      resizable: true
    },
    actions: {
      applyGrants: BackgroundGrantsDialog.#onApply
    }
  };

  static PARTS = {
    body: { template: "systems/flail/templates/apps/background-grants-dialog.hbs" }
  };

  constructor(actor, backgroundItem, options = {}) {
    super(options);
    this.actor = actor;
    this.backgroundItem = backgroundItem;
  }

  get title() {
    return game.i18n.localize("FLAIL.Background.ApplyDialogTitle");
  }

  async _prepareContext(options) {
    const grants = (this.backgroundItem.system?.grants ?? [])
      .map((g, i) => ({ ...g, index: i, typeLabel: this.#typeLabel(g.type) }));
    const unapplied = grants.filter(g => !g.applied);
    return {
      backgroundName: this.backgroundItem.name,
      unapplied,
      hasUnapplied: unapplied.length > 0
    };
  }

  #typeLabel(type) {
    switch (type) {
      case "attribute":  return game.i18n.localize("FLAIL.Background.GrantTypeAttribute");
      case "item":       return game.i18n.localize("FLAIL.Background.GrantTypeItem");
      case "crossClass": return game.i18n.localize("FLAIL.Background.GrantTypeCrossClass");
      default:           return game.i18n.localize("FLAIL.Background.GrantTypeNote");
    }
  }

  /**
   * Click handler for Apply Selected. Reads checkbox states, executes
   * each checked grant in order, updates the background's grants array
   * with `applied: true` for anything successful.
   */
  static async #onApply(event, target) {
    const form = this.element.querySelector("form") ?? this.element;
    const checked = new Set();
    form.querySelectorAll("input.bg-grant-check").forEach(el => {
      if (el.checked) checked.add(Number(el.dataset.grantIndex));
    });
    if (checked.size === 0) { this.close(); return; }

    const grants = [...(this.backgroundItem.system.grants ?? [])];
    let appliedCount = 0;

    for (const idx of checked) {
      const g = grants[idx];
      if (!g || g.applied) continue;
      const ok = await BackgroundGrantsDialog.#executeGrant(this.actor, g);
      if (ok) {
        grants[idx] = { ...g, applied: true };
        appliedCount++;
      }
    }

    if (appliedCount > 0) {
      await this.backgroundItem.update({ "system.grants": grants });
      ui.notifications?.info(
        game.i18n.format("FLAIL.Background.AppliedToast",
          { n: appliedCount, name: this.backgroundItem.name })
      );
    }
    this.close();
  }

  /**
   * Execute a single grant against the actor. Returns true iff the
   * grant was actually applied (item found, dialog confirmed, etc.).
   * Returning false leaves `applied` at its current value so the
   * player can retry.
   */
  static async #executeGrant(actor, grant) {
    try {
      switch (grant.type) {
        case "note":
          // Nothing to do; marking applied is the whole action.
          return true;

        case "attribute": {
          const key = grant.attrKey;
          const delta = grant.attrDelta ?? 0;
          if (!key || !delta) return true; // treat as ack
          // Respect the per-attribute padlock (v0.4.27) — the write
          // to `.mod` bypasses the lock at the actor level (it only
          // gates the sheet's +/- buttons and base input readonly),
          // but toggling the lock around the write makes the change
          // feel consistent with how a player would do it by hand:
          // unlock → adjust → re-lock. Preserves the original lock
          // state so the padlock UI doesn't shift after apply.
          const locks = { ...(actor.getFlag("flail", "attrLocks") ?? {}) };
          const wasLocked = !!(locks[key] ?? true);
          if (wasLocked) {
            await actor.setFlag("flail", "attrLocks",
              { ...locks, [key]: false });
          }
          const cur = actor.system.attributes?.[key]?.mod ?? 0;
          await actor.update({ [`system.attributes.${key}.mod`]: cur + delta });
          if (wasLocked) {
            await actor.setFlag("flail", "attrLocks",
              { ...locks, [key]: true });
          }
          return true;
        }

        case "item": {
          const found = await BackgroundGrantsDialog.#findItemInCompendiums(grant.itemName);
          if (!found) {
            ui.notifications?.warn(
              game.i18n.format("FLAIL.Background.ItemNotFound", { name: grant.itemName })
            );
            return false;
          }
          const data = found.toObject();
          delete data._id;
          // If the item can occupy an inventory slot (has a `location`
          // field — weapons, armour, gear, conditions all do), try to
          // slot it into the first empty satchel position so it appears
          // in the character's stashed row rather than being lost in
          // the unequipped pile. Falls back to unequipped if the
          // satchel is full.
          if (data.system && "location" in data.system) {
            const slotIdx = BackgroundGrantsDialog.#findEmptySatchelSlot(actor, data.system.slotsRequired ?? 1);
            if (slotIdx >= 0) {
              data.system.location = "satchel";
              data.system.slotIndex = slotIdx;
            } else {
              ui.notifications?.warn(
                game.i18n.format("FLAIL.Background.SatchelFull",
                  { name: data.name ?? grant.itemName })
              );
            }
          }
          await actor.createEmbeddedDocuments("Item", [data]);
          return true;
        }

        case "crossClass": {
          const items = await BackgroundGrantsDialog.#loadCrossClassItems(
            grant.crossClassSource, grant.crossClassType
          );
          if (items.length === 0) {
            ui.notifications?.warn(
              game.i18n.format("FLAIL.Background.CrossClassEmpty", {
                source: grant.crossClassSource, type: grant.crossClassType
              })
            );
            return false;
          }
          const picked = await BackgroundGrantsDialog.#promptCrossClassPick(
            items, grant.crossClassSource, grant.crossClassType
          );
          if (!picked) return false;
          const data = picked.toObject();
          delete data._id;
          // Tag as a cross-class background grant. The character
          // sheet's class-actions panel surfaces items with this flag
          // in a dedicated "Background Grants" section so the player
          // can click them from the Abilities tab. Source class is
          // remembered for potential UI hints (e.g. tier badge).
          data.flags = data.flags ?? {};
          data.flags.flail = data.flags.flail ?? {};
          data.flags.flail.fromBackgroundGrant = true;
          data.flags.flail.backgroundGrantSource = grant.crossClassSource ?? "";
          await actor.createEmbeddedDocuments("Item", [data]);
          return true;
        }
      }
    } catch (err) {
      console.error("FLAIL | grant execution failed", grant, err);
      ui.notifications?.error(`Grant failed: ${err.message}`);
      return false;
    }
    return false;
  }

  /**
   * Find the first empty slot index in the actor's satchel (stashed
   * inventory zone). Accounts for multi-slot items via slotsRequired:
   * a 2-slot item at index 0 also occupies index 2 (satchel is
   * 2-column, spans go vertically per FLAIL's inventory layout).
   *
   * @param {Actor}  actor          the character
   * @param {number} slotsRequired  how many contiguous slots the new
   *                                item needs (usually 1)
   * @returns {number}              slot index (0-7) or -1 if no space
   */
  static #findEmptySatchelSlot(actor, slotsRequired = 1) {
    const SATCHEL_COUNT = 8;
    const SATCHEL_COLUMNS = 2;
    const occupied = new Set();
    const items = actor.items.filter(i => i.system?.location === "satchel");
    for (const it of items) {
      const idx = it.system?.slotIndex ?? 0;
      const span = it.system?.slotsRequired ?? 1;
      for (let i = 0; i < span; i++) {
        occupied.add(idx + i * SATCHEL_COLUMNS);
      }
    }
    // Look for the first index where the item can fit — for a span=1
    // item this is any unoccupied slot; for span=2 the slot AND the
    // slot at idx+columns must both be free.
    for (let i = 0; i < SATCHEL_COUNT; i++) {
      let fits = true;
      for (let j = 0; j < slotsRequired; j++) {
        const check = i + j * SATCHEL_COLUMNS;
        if (check >= SATCHEL_COUNT || occupied.has(check)) {
          fits = false;
          break;
        }
      }
      if (fits) return i;
    }
    return -1;
  }

  /**
   * Search every Item compendium for a document whose name matches
   * (case-insensitive). Returns the first hit or null.
   */
  static async #findItemInCompendiums(name) {
    if (!name) return null;
    const target = name.trim().toLowerCase();
    for (const pack of game.packs) {
      if (pack.metadata.type !== "Item") continue;
      const index = await pack.getIndex();
      const hit = [...index].find(e => (e.name ?? "").toLowerCase() === target);
      if (hit) {
        const doc = await pack.getDocument(hit._id);
        if (doc) return doc;
      }
    }
    return null;
  }

  /**
   * Load candidate items for a cross-class grant. Right now this is
   * "any Item compendium containing items of the requested type".
   * For finer filtering (e.g. only "wizard" spells vs "dark" spells),
   * expand this logic per source-class conventions.
   */
  static async #loadCrossClassItems(source, type) {
    const items = [];
    for (const pack of game.packs) {
      if (pack.metadata.type !== "Item") continue;
      const docs = await pack.getDocuments();
      for (const doc of docs) {
        if (doc.type !== type) continue;
        // Wizard-source: prefer non-dark spells (tradition set on the item).
        if (source === "wizard" && type === "spell") {
          if (doc.system?.tradition === "dark") continue;
        }
        if (source === "boneWhisperer" && type === "spell") {
          if (doc.system?.tradition !== "dark") continue;
        }
        items.push(doc);
      }
    }
    return items;
  }

  /**
   * Simple picker dialog for cross-class grants. Uses Foundry's
   * built-in DialogV2 for one-off selects — no need for a full
   * ApplicationV2 window here.
   */
  static async #promptCrossClassPick(items, source, type) {
    const options = items
      .map(it => `<option value="${it.uuid}">${it.name}</option>`)
      .join("");
    const html = `
      <p style="margin-top:0">Choose one item to add:</p>
      <select name="itemUuid" style="width:100%">${options}</select>
    `;
    const uuid = await foundry.applications.api.DialogV2.prompt({
      window: {
        title: game.i18n.format("FLAIL.Background.CrossClassPickTitle", { source, type })
      },
      content: html,
      ok: {
        label: game.i18n.localize("FLAIL.Background.ApplyConfirm"),
        callback: (event, button, dialog) => {
          const el = dialog.element.querySelector("[name='itemUuid']");
          return el?.value ?? null;
        }
      },
      rejectClose: false
    });
    if (!uuid) return null;
    return await fromUuid(uuid);
  }
}
