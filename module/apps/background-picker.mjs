import { FLAIL } from "../helpers/config.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Background Picker.
 *
 * Floating window opened when the player clicks the "Background:"
 * header on the character banner. Renders every Instant Backstory
 * entry for the character's current class as a draggable card, plus
 * a "Custom Background" card at the top for player-defined origins.
 *
 * Two commit paths:
 *   A. Drag a card onto the background slot on the banner — the
 *      sheet's `[data-flail-drop-target='background']` handler reads
 *      the JSON payload and writes the background key.
 *   B. Click a card in the picker — same result.
 *
 * If the picked background is "custom", the sheet shows the inline
 * label + perk editor beneath the slot (unchanged from the previous
 * dropdown-based UX). Otherwise the perk text is displayed as-is.
 *
 * Extensibility: backgrounds are read from `FLAIL.backgrounds[classKey]`,
 * an array of `{ key, label, perk }`. A homebrew module can push more
 * entries onto that array before rendering the picker to add custom
 * backgrounds per class.
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
    const currentKey = sys.background ?? "";
    const list = FLAIL.backgrounds?.[classKey] ?? [];

    // "custom" is always in the list (appended by config.mjs's setup
    // loop). We surface it first in the picker so it reads as the
    // "opt out" option rather than a numbered background.
    const custom = list.find(b => b.key === "custom");
    const numbered = list.filter(b => b.key !== "custom");

    const cardFor = (bg) => ({
      key:     bg.key,
      label:   bg.label,
      perk:    bg.perk,
      current: bg.key === currentKey,
      isCustom: bg.key === "custom"
    });

    return {
      classKey,
      className:   game.i18n.localize(FLAIL.classes?.[classKey]?.label ?? classKey),
      currentKey,
      hasCurrent:  !!currentKey,
      customCard:  custom ? cardFor(custom) : null,
      backgrounds: numbered.map(cardFor)
    };
  }

  /* -------------------------------------------- */
  /*  Render                                      */
  /* -------------------------------------------- */

  /** @inheritdoc */
  _onRender(context, options) {
    super._onRender?.(context, options);

    // Wire dragstart on every card. Payload carries the background
    // key and the actor UUID so the sheet's drop handler can verify
    // the drag targets this actor.
    const cards = this.element.querySelectorAll(".bg-card");
    for (const card of cards) {
      card.addEventListener("dragstart", ev => {
        const payload = {
          type:            "flail-background",
          backgroundKey:   card.dataset.backgroundKey,
          actorUuid:       this.actor.uuid
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
   * Click-to-commit shortcut. Writes the picked background key to
   * `system.background`. If the pick is a numbered background (not
   * custom), we do NOT touch `system.customBackground` — the player
   * may later switch to custom and want their previous custom text
   * to still be there. Same rule for the drop-handler path.
   */
  static async #onChoose(event, target) {
    const key = target.dataset.backgroundKey;
    if (!key) return;
    await this.actor.update({ "system.background": key });
    this.close();
  }

  /**
   * Clear the background slot — sets it back to empty. Useful for
   * "no background yet" state, e.g. right after class change when
   * the previous class's background is stale.
   */
  static async #onClear(event, target) {
    await this.actor.update({ "system.background": "" });
    this.close();
  }
}
