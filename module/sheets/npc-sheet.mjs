import { rollSave } from "../dice/save.mjs";
import { FLAIL } from "../helpers/config.mjs";

const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Compact NPC sheet: stat block + attack list.
 */
export class FlailNpcSheet extends HandlebarsApplicationMixin(ActorSheetV2) {

  static DEFAULT_OPTIONS = {
    classes: ["flail", "sheet", "actor", "npc"],
    position: { width: 520, height: 600 },
    actions: {
      rollSave:   FlailNpcSheet.#onRollSave,
      rollAttack: FlailNpcSheet.#onRollAttack,
      rollMorale: FlailNpcSheet.#onRollMorale,
      itemEdit:   FlailNpcSheet.#onItemEdit,
      itemDelete: FlailNpcSheet.#onItemDelete,
      itemCreate: FlailNpcSheet.#onItemCreate,
      adjustHp:   FlailNpcSheet.#onAdjustHp,
      editImage:  FlailNpcSheet.#onEditImage
    },
    form: { submitOnChange: true, closeOnSubmit: false }
  };

  static PARTS = {
    main: { template: "systems/flail/templates/actor/npc.hbs" }
  };

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    ctx.actor = this.actor;
    ctx.system = this.actor.system;
    ctx.config = FLAIL;
    ctx.editable = this.isEditable;
    ctx.attacks = this.actor.items.filter(i => i.type === "weapon");
    return ctx;
  }

  /* -------------------------------------------- */

  _onRender(context, options) {
    super._onRender?.(context, options);
    const root = this.element;
    if (!root) return;

    // Editor pencil click — Foundry v13's HandlebarsApplicationMixin does
    // NOT auto-wire the {{editor}} helper's edit button for HTMLField
    // editors on ApplicationV2 sheets, so we activate the ProseMirror
    // editor ourselves. Same fix as the character sheet's Notes tab.
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
   * view mode. Copied from the character sheet — same DOM shape, same
   * fix. Save writes back to the actor and a follow-up re-render
   * restores view mode.
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

    // Foundry v13 exposes the ProseMirror module as a global.
    const PM = globalThis.ProseMirror ?? foundry?.prosemirror;
    if (!PM?.ProseMirrorEditor) {
      // Fallback: temporary contenteditable + submit-on-blur, so text
      // can still be entered even if ProseMirror is unreachable.
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

  /* -------------------------------------------- */

  static async #onRollSave(event, target) {
    // NPCs have a single Saves value — roll d20 vs that.
    const actor = this.actor;
    const saves = actor.system.saves;
    const roll = await new Roll("1d20").evaluate();
    const success = roll.total <= saves;
    const flavor = `<strong>${actor.name}</strong> Saves vs ${saves}: ${success ? "<span class='success'>Success</span>" : "<span class='fail'>Fail</span>"}`;
    return roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor }), flavor });
  }

  static async #onRollMorale(event, target) {
    const actor = this.actor;
    const morale = actor.system.morale;
    const roll = await new Roll("1d20").evaluate();
    const success = roll.total <= morale;
    const flavor = `<strong>${actor.name}</strong> Morale vs ${morale}: ${success ? "<span class='success'>Holds</span>" : "<span class='fail'>Flees</span>"}`;
    return roll.toMessage({ speaker: ChatMessage.getSpeaker({ actor }), flavor });
  }

  static async #onRollAttack(event, target) {
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    // Numeric advantage: Shift = +1 die, Ctrl/Meta = -1 die, plain = 0.
    // No dialog on NPC To Hit rolls (GM-controlled, so shortcuts are
    // enough — if this changes, mirror the character sheet's Alt path).
    const adv = event.shiftKey ? 1
              : (event.ctrlKey || event.metaKey) ? -1
              : 0;
    return this.actor.rollAttack(item, { advantage: adv });
  }

  static async #onItemEdit(event, target) {
    const itemId = target.dataset.itemId ?? target.closest("[data-item-id]")?.dataset.itemId;
    this.actor.items.get(itemId)?.sheet.render(true);
  }

  static async #onItemDelete(event, target) {
    const itemId = target.dataset.itemId ?? target.closest("[data-item-id]")?.dataset.itemId;
    this.actor.items.get(itemId)?.delete();
  }

  static async #onItemCreate(event, target) {
    const type = target.dataset.itemType ?? "weapon";
    const docs = await this.actor.createEmbeddedDocuments("Item", [{
      name: game.i18n.format("FLAIL.Item.New", { type }), type
    }]);
    docs[0]?.sheet.render(true);
  }

  static async #onAdjustHp(event, target) {
    const delta = Number(target.dataset.delta ?? 0);
    if (!delta) return;
    if (delta < 0) return this.actor.applyDamage(-delta, { ignoreDefence: true });
    return this.actor.heal(delta);
  }

  /**
   * Click on the NPC portrait — opens Foundry's FilePicker so the GM
   * can pick a new image path. If Tokenizer is active, this handler
   * no-ops: Tokenizer's own document-level click listener fires (via
   * `data-edit="img"`) and opens its dialog. That's why the portrait
   * carries both `data-edit="img"` and `data-action="editImage"`.
   *
   * Shift-click forces FilePicker even when Tokenizer is active.
   */
  static async #onEditImage(event, target) {
    if (!this.isEditable) return;
    const forceFilePicker = event?.shiftKey === true;
    const tokenizerActive = !!game.modules?.get("vtta-tokenizer")?.active;
    if (tokenizerActive && !forceFilePicker) return;
    const current = this.actor.img ?? "";
    const FilePickerImpl = foundry.applications?.apps?.FilePicker?.implementation
      ?? globalThis.FilePicker;
    if (!FilePickerImpl) {
      ui.notifications?.warn("FilePicker unavailable in this environment.");
      return;
    }
    const fp = new FilePickerImpl({
      type: "image",
      current,
      callback: (path) => this.actor.update({ img: path })
    });
    fp.browse();
  }
}
