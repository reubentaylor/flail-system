import { FLAIL } from "../helpers/config.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

const BACKGROUNDS_PACK = "world.flail-backgrounds";

/**
 * Background Picker (item-based).
 *
 * Reads from the world Backgrounds compendium (populated by the
 * ensureBackgroundsCompendium importer). Each entry in the compendium
 * is a first-class Item of type "background" — no config lookups.
 *
 * Two commit paths:
 *   A. Drag a card onto the background slot on the banner. The
 *      sheet's drop handler reads the compendium reference from the
 *      payload, fetches the item, embeds a copy on the actor.
 *   B. Click a card in the picker. Same result — embeds a copy.
 *
 * Also supports the "Custom Background" template item: picking it
 * embeds a copy which the player can rename + rewrite freely via
 * the item sheet (double-click on the banner).
 *
 * Extensibility: any Item of type "background" in ANY compendium
 * or in the world Items directory can be dragged onto a character —
 * the sheet's drop handler accepts item drops of type "background"
 * regardless of source. The picker just surfaces the bundled ones
 * conveniently, filtered by class.
 */
export class BackgroundPicker extends HandlebarsApplicationMixin(ApplicationV2) {

  static DEFAULT_OPTIONS = {
    id: "flail-background-picker-{id}",
    tag: "div",
    classes: ["flail", "background-picker"],
    position: { width: 560, height: 640 },
    window: {
      icon: "fa-solid fa-scroll",
      resizable: true
    },
    actions: {
      chooseBackground: BackgroundPicker.#onChoose,
      clearBackground:  BackgroundPicker.#onClear
    }
  };

  static PARTS = {
    body: { template: "systems/flail/templates/apps/background-picker.hbs" }
  };

  /** @param {Actor} actor */
  constructor(actor, options = {}) {
    super(options);
    this.actor = actor;
    this._items = []; // compendium items, loaded in _prepareContext
  }

  /** @inheritdoc */
  get title() {
    return game.i18n.format("FLAIL.BackgroundPicker.Title", { actor: this.actor.name });
  }

  /* -------------------------------------------- */
  /*  Data                                        */
  /* -------------------------------------------- */

  /** @inheritdoc */
  async _prepareContext(options) {
    const sys = this.actor.system;
    const classKey = sys.class ?? "";

    // Which background item is currently embedded on the actor?
    const embedded = this.actor.items.find(i => i.type === "background");
    const currentId = embedded?.id ?? null;
    const currentSourceKey = embedded?.system?.sourceKey ?? "";

    // Load all backgrounds from the compendium. Fall back to empty
    // list if the pack doesn't exist yet (world init not complete).
    const pack = game.packs.get(BACKGROUNDS_PACK);
    const packItems = pack ? await pack.getDocuments() : [];
    this._items = packItems;

    // Custom template appears first, then class-filtered stock entries.
    const custom = packItems.find(it => it.system?.isCustomTemplate);
    const stock = packItems.filter(it =>
      !it.system?.isCustomTemplate
      && (!it.system?.classKey || !classKey || it.system.classKey === classKey)
    );

    const cardFor = (item) => ({
      id:         item.id,
      uuid:       item.uuid,
      name:       item.name,
      sourceKey:  item.system?.sourceKey ?? "",
      classKey:   item.system?.classKey ?? "",
      description: item.system?.description ?? "",
      isCustom:   !!item.system?.isCustomTemplate,
      current:    item.system?.sourceKey === currentSourceKey && !!currentSourceKey
    });

    return {
      classKey,
      className:   game.i18n.localize(FLAIL.classes?.[classKey]?.label ?? classKey),
      currentId,
      hasCurrent:  !!currentId,
      customCard:  custom ? cardFor(custom) : null,
      backgrounds: stock.sort((a, b) => a.sort - b.sort).map(cardFor),
      packMissing: !pack
    };
  }

  /* -------------------------------------------- */
  /*  Render                                      */
  /* -------------------------------------------- */

  _onRender(context, options) {
    super._onRender?.(context, options);

    // Wire dragstart on every card. Payload uses Foundry's standard
    // item-drag format so the sheet's drop handler can accept both
    // picker drags and stock item drops from the compendium browser.
    const cards = this.element.querySelectorAll(".bg-card");
    for (const card of cards) {
      card.addEventListener("dragstart", ev => {
        const uuid = card.dataset.itemUuid;
        if (!uuid) return;
        const payload = {
          type: "Item",
          uuid
        };
        ev.dataTransfer.setData("text/plain", JSON.stringify(payload));
        ev.dataTransfer.effectAllowed = "copy";
        card.classList.add("bg-dragging");
      });
      card.addEventListener("dragend", () => {
        card.classList.remove("bg-dragging");
      });
    }
  }

  /* -------------------------------------------- */
  /*  Actions                                     */
  /* -------------------------------------------- */

  /**
   * Click-to-commit shortcut. Copies the compendium item onto the
   * actor. If the actor already has a background item embedded,
   * remove it first — one background per character.
   */
  static async #onChoose(event, target) {
    const uuid = target.dataset.itemUuid;
    if (!uuid) return;
    const source = await fromUuid(uuid);
    if (!source) return;

    // Remove existing background(s) first.
    const existing = this.actor.items.filter(i => i.type === "background").map(i => i.id);
    if (existing.length) {
      await this.actor.deleteEmbeddedDocuments("Item", existing);
    }

    // Embed a fresh copy. toObject strips the pack reference so it
    // becomes an owned item on the actor with its own id.
    const data = source.toObject();
    delete data._id; // let Foundry assign a new id on the actor
    await this.actor.createEmbeddedDocuments("Item", [data]);
    this.close();
  }

  /**
   * Clear the background — remove any embedded background items.
   */
  static async #onClear(event, target) {
    const existing = this.actor.items.filter(i => i.type === "background").map(i => i.id);
    if (existing.length) {
      await this.actor.deleteEmbeddedDocuments("Item", existing);
    }
    this.close();
  }
}
