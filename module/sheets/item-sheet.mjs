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
    actions: {}
  };

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
}
