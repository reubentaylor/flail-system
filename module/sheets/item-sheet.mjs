import { FLAIL } from "../helpers/config.mjs";

const { ItemSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Single Item sheet that picks a body template based on item type.
 * Keeps the implementation simple — most items just want a name, image,
 * description, plus a handful of type-specific fields.
 */
export class FlailItemSheet extends HandlebarsApplicationMixin(ItemSheetV2) {

  static DEFAULT_OPTIONS = {
    classes: ["flail", "sheet", "item"],
    position: { width: 480, height: 540 },
    form: { submitOnChange: true, closeOnSubmit: false },
    actions: {
      removeGuildEntry: FlailItemSheet.#onRemoveGuildEntry,
      editImage:        FlailItemSheet.#onEditImage,
      bgGrantAdd:       FlailItemSheet.#onBgGrantAdd,
      bgGrantRemove:    FlailItemSheet.#onBgGrantRemove
    }
  };

  /**
   * Background item — add a blank grant row. Grants are per-item;
   * write the full array back (Foundry ArrayField dotted-path updates
   * don't merge cleanly, see character-sheet.mjs notes).
   */
  static async #onBgGrantAdd(event, target) {
    if (this.item.type !== "background") return;
    const grants = [...(this.item.system.grants ?? [])];
    grants.push({
      type: "note",
      itemName: "",
      attrKey: "",
      attrDelta: 0,
      crossClassSource: "",
      crossClassType: "",
      description: "",
      applied: false
    });
    await this.item.update({ "system.grants": grants });
  }

  /**
   * Background item — remove a grant row by index.
   */
  static async #onBgGrantRemove(event, target) {
    if (this.item.type !== "background") return;
    const idx = Number(target.dataset.grantIndex);
    if (!Number.isFinite(idx)) return;
    const grants = [...(this.item.system.grants ?? [])];
    if (idx < 0 || idx >= grants.length) return;
    grants.splice(idx, 1);
    await this.item.update({ "system.grants": grants });
  }

  /**
   * Remove an entry from a guild item's talentItems or actionItems
   * array. Wired by the row's "x" button. Reads the list name and
   * index from the button's data attributes.
   */
  static async #onRemoveGuildEntry(event, target) {
    if (this.item.type !== "guild") return;
    const list = target.dataset.guildList;
    const idx = Number(target.dataset.idx);
    if (!list || Number.isNaN(idx)) return;
    const field = list === "talent" ? "talentItems" : "actionItems";
    const current = [...(this.item.system[field] ?? [])];
    if (idx < 0 || idx >= current.length) return;
    current.splice(idx, 1);
    await this.item.update({ [`system.${field}`]: current });
  }

  /**
   * Click on the item image → opens Foundry's FilePicker so the user
   * can pick a new image path. Same behaviour as the character sheet's
   * portrait click, minus the Tokenizer branch (Tokenizer targets
   * actors, not items). Prefers the modern applications namespace and
   * falls back to the legacy global if that's not available.
   */
  static async #onEditImage(event, target) {
    if (!this.isEditable) return;
    const current = this.item.img ?? "";
    const FilePickerImpl = foundry.applications?.apps?.FilePicker?.implementation
      ?? globalThis.FilePicker;
    if (!FilePickerImpl) {
      ui.notifications?.warn("FilePicker unavailable in this environment.");
      return;
    }
    const fp = new FilePickerImpl({
      type: "image",
      current,
      callback: (path) => this.item.update({ img: path })
    });
    fp.browse();
  }

  /**
   * Per-type sizing override. The instrument sheet has a 10-row d10 effect
   * table that doesn't fit the default 540px-tall window. Catch this at
   * application init so the window opens at a usable size; the user can
   * still resize after.
   * @inheritdoc
   */
  _initializeApplicationOptions(options) {
    options = super._initializeApplicationOptions(options);
    const itemType = options.document?.type;
    if (itemType === "instrument") {
      options.position = {
        ...(options.position ?? {}),
        width:  Math.max(options.position?.width  ?? 0, 520),
        height: Math.max(options.position?.height ?? 0, 760)
      };
    }
    return options;
  }

  static PARTS = {
    header: { template: "systems/flail/templates/item/parts/header.hbs" },
    body:   { template: "systems/flail/templates/item/parts/body.hbs" }
  };

  /** @inheritdoc */
  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    ctx.item = this.item;
    ctx.system = this.item.system;
    ctx.editable = this.isEditable;
    ctx.config = FLAIL;
    ctx.bodyPartial = `systems/flail/templates/item/types/${this.item.type}.hbs`;
    // Magical flag — used by the header checkbox and by mechanics
    // that filter non-magical items (Tinkerer repair, Fix Construct).
    ctx.isMagical = !!this.item.getFlag("flail", "magical");
    // Adornment flag — used by the item-sheet header checkbox (only
    // shown on gear items) and by the adornment inventory zone's
    // drop check. Rings, amulets, sigils, talismans, charms, and
    // similar worn trinkets qualify.
    ctx.isAdornment = !!this.item.getFlag("flail", "adornment");
    // Pre-format weapon specialty tags as a comma-separated string for the
    // single-line input. Submission parses it back into an array.
    if (this.item.type === "weapon") {
      ctx.tagsCsv = (this.item.system.tags ?? []).join(", ");
    }
    return ctx;
  }

  /**
   * Hook into form submission to translate the CSV tags input into the
   * ArrayField the schema expects. Foundry's form binder hands us a string;
   * the model would reject it.
   * @inheritdoc
   */
  _prepareSubmitData(event, form, formData, updateData) {
    const data = super._prepareSubmitData(event, form, formData, updateData);

    // Magical flag — HTML checkboxes don't submit when unchecked, so
    // FormData alone would leave the flag stuck at whatever it was.
    // Read the checkbox's DOM state directly and write the boolean
    // into flags.flail.magical on every save, so unchecking actually
    // takes effect.
    const magicalInput = form.querySelector('input[name="isMagical"]');
    if (magicalInput) {
      foundry.utils.setProperty(data, "flags.flail.magical", magicalInput.checked);
    }

    // Adornment flag — same pattern as isMagical. Unchecked checkboxes
    // don't submit their state via FormData, so we read the DOM
    // directly and always write the flag.
    const adornmentInput = form.querySelector('input[name="isAdornment"]');
    if (adornmentInput) {
      foundry.utils.setProperty(data, "flags.flail.adornment", adornmentInput.checked);
    }

    if (this.item.type === "weapon") {
      const csv = foundry.utils.getProperty(data, "system.tagsCsv");
      if (csv !== undefined) {
        const tags = String(csv)
          .split(",")
          .map(t => t.trim())
          .filter(Boolean);
        foundry.utils.setProperty(data, "system.tags", tags);
        delete data.system.tagsCsv;
      }
    }

    // Instrument effect table — the banded editor renders three
    // range rows (5-6, 7-8, 9-10) whose textareas bind to the FIRST
    // index of each range (5, 7, 9). On submit we mirror each
    // range's canonical index across to its pair so the stored
    // effectTable has matching text at both indices — that way
    // any lookup roll lands on the same entry regardless of which
    // side of the range came up.
    //
    // Note: because Foundry re-submits ALL fields on every change
    // (submitOnChange: true), any distinct value manually written
    // into index 6, 8, or 10 will get overwritten the next time
    // the sheet is edited. This matches the rulebook — every
    // canonical instrument treats 5-6, 7-8, 9-10 as identical
    // pairs. Advanced users who genuinely want split entries
    // would need to bypass this sheet entirely.
    if (this.item.type === "instrument") {
      const et = foundry.utils.getProperty(data, "system.effectTable");
      if (et && typeof et === "object") {
        const RANGE_PAIRS = [[5, 6], [7, 8], [9, 10]];
        for (const [src, dst] of RANGE_PAIRS) {
          if (src in et) et[dst] = et[src];
        }
      }
    }
    return data;
  }

  _onRender(context, options) {
    super._onRender?.(context, options);
    const root = this.element;
    if (!root) return;

    // Weapon range checkboxes — plain change listener. Now that
    // flail-includes handles Set values correctly, we don't need any
    // interception tricks. Browser toggles the box naturally on click,
    // change fires, we gather the new state and update. Foundry's
    // submitOnChange also fires but with FormData that has no
    // system.range key (the inputs have data-range instead of name),
    // so its document.update merges without touching the range field —
    // no race, no clear.
    root.querySelectorAll('input[type="checkbox"][data-range]').forEach(cb => {
      cb.addEventListener("change", async () => {
        const current = [...root.querySelectorAll('input[type="checkbox"][data-range]:checked')]
          .map(el => el.dataset.range);
        await this.document.update({ "system.range": current });
      });
    });

    // Guild drop zones — one for talent items, one for feature items.
    // On drop, snapshot the dropped item's data and append to the
    // matching schema array. The character-sheet guild-drop handler
    // then materialises these as embedded items on the actor.
    if (this.item.type === "guild") {
      root.querySelectorAll("[data-guild-drop]").forEach(zone => {
        zone.addEventListener("dragover", ev => {
          ev.preventDefault();
          if (ev.dataTransfer) ev.dataTransfer.dropEffect = "copy";
          zone.classList.add("drop-active");
        });
        zone.addEventListener("dragleave", () => zone.classList.remove("drop-active"));
        zone.addEventListener("drop", async ev => {
          ev.preventDefault();
          ev.stopPropagation();
          zone.classList.remove("drop-active");
          const kind = zone.dataset.guildDrop;   // "talent" | "action"
          const expectedType = kind === "talent" ? "talent" : "feature";
          let payload;
          try { payload = JSON.parse(ev.dataTransfer.getData("text/plain")); }
          catch { return; }
          const dropped = await Item.implementation.fromDropData(payload);
          if (!dropped) return;
          if (dropped.type !== expectedType) {
            ui.notifications?.warn(
              kind === "talent"
                ? game.i18n.localize("FLAIL.Notify.GuildExpectTalent")
                : game.i18n.localize("FLAIL.Notify.GuildExpectFeature")
            );
            return;
          }
          const snapshot = dropped.toObject();
          const field = kind === "talent" ? "talentItems" : "actionItems";
          const current = [...(this.item.system[field] ?? [])];
          current.push(snapshot);
          await this.item.update({ [`system.${field}`]: current });
        });
      });
    }

    // Editor pencil click — Foundry v13's HandlebarsApplicationMixin does
    // NOT auto-wire the {{editor}} helper's edit button for HTMLField
    // editors on ApplicationV2 sheets. Wire it ourselves. Same fix as
    // the character and NPC sheets.
    root.querySelectorAll(".editor a.editor-edit, .editor button.editor-edit").forEach(btn => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        await this.#activateEditor(btn);
      });
    });
  }

  /**
   * Activate a ProseMirror editor in place of an {{editor}} helper's
   * view mode. Same helper as on the actor sheets.
   */
  async #activateEditor(btn) {
    const editorEl = btn.closest(".editor");
    if (!editorEl) return;
    const contentEl = editorEl.querySelector("[data-edit], [name]");
    if (!contentEl) return;
    const field = contentEl.dataset.edit ?? contentEl.getAttribute("name");
    if (!field) return;
    if (editorEl.classList.contains("prosemirror-editing")) return;

    const currentValue = foundry.utils.getProperty(this.document, field) ?? "";

    const PM = globalThis.ProseMirror ?? foundry?.prosemirror;
    if (!PM?.ProseMirrorEditor) {
      contentEl.setAttribute("contenteditable", "true");
      contentEl.style.outline = "2px solid var(--flail-rule, #b58b3e)";
      contentEl.focus();
      const original = contentEl.innerHTML;
      const stop = async (save) => {
        contentEl.setAttribute("contenteditable", "false");
        contentEl.style.outline = "";
        if (save) await this.document.update({ [field]: contentEl.innerHTML });
        else contentEl.innerHTML = original;
        this.render(false);
      };
      contentEl.addEventListener("blur", () => stop(true), { once: true });
      contentEl.addEventListener("keydown", ev => {
        if (ev.key === "Escape") { ev.preventDefault(); stop(false); }
      });
      return;
    }

    editorEl.classList.add("prosemirror-editing");

    try {
      const schema = PM.defaultSchema;
      const menu = PM.ProseMirrorMenu.build(schema, {
        destroyOnSave: true,
        onSave: async () => {
          setTimeout(() => this.render(false), 100);
        }
      });
      const keyMaps = PM.ProseMirrorKeyMaps.build(schema, { onSave: () => {} });

      await PM.ProseMirrorEditor.create(contentEl, currentValue, {
        document:  this.document,
        fieldName: field,
        plugins:   { menu, keyMaps }
      });
    } catch (err) {
      console.error("FLAIL | Failed to activate ProseMirror editor", err);
      editorEl.classList.remove("prosemirror-editing");
      ui.notifications?.error("Editor failed to open — see console.");
    }
  }
}
