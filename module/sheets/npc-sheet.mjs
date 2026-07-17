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
      adjustHp:   FlailNpcSheet.#onAdjustHp
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
}
