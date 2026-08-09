import { FLAIL } from "../helpers/config.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Combat Talent Picker.
 *
 * Floating window opened when the player clicks a Warrior combat-talent
 * slot on the Class tab. Presents every talent from every tree grouped
 * by tree — Basic on top, its Experts underneath, each Expert's two
 * Masters as leaves. Talents that are legal picks for the target slot
 * (per the slot's index and the prior picks) are highlighted and
 * draggable. Talents that fail a prerequisite are shown greyed with a
 * short reason.
 *
 * Two commit paths:
 *   A. Drag a card onto the slot — the sheet's talent-slot drop
 *      handler reads the JSON payload and writes the talent key into
 *      `system.combatTalents[slotIndex]`.
 *   B. Click a card — same result, useful for keyboard/screen-reader
 *      accessibility. The picker closes itself on click.
 *
 * The picker doesn't own any state; it reads from the actor at
 * render time and writes back via `actor.update`. Reopening always
 * shows the current picture.
 *
 * Extensibility: talent trees are read from `FLAIL.combatTalents.trees`.
 * A world macro or module can push additional trees onto that array
 * before rendering the picker to introduce custom trees. Each tree
 * needs the shape `{ key, label, hint, basic, experts: [...] }` — see
 * `helpers/config.mjs` for the reference structure.
 */
export class CombatTalentPicker extends HandlebarsApplicationMixin(ApplicationV2) {

  static DEFAULT_OPTIONS = {
    id: "flail-combat-talent-picker-{id}",
    tag: "div",
    classes: ["flail", "combat-talent-picker"],
    position: { width: 640, height: 700 },
    window: {
      icon: "fa-solid fa-shield-halved",
      resizable: true
    },
    actions: {
      chooseTalent: CombatTalentPicker.#onChooseTalent,
      clearSlot:    CombatTalentPicker.#onClearSlot
    }
  };

  static PARTS = {
    body: { template: "systems/flail/templates/apps/combat-talent-picker.hbs" }
  };

  /**
   * @param {Actor}  actor
   * @param {number} slotIndex   0-based slot index (level 1 → 0, level 2 → 1, …)
   * @param {object} [options]
   */
  constructor(actor, slotIndex, options = {}) {
    super(options);
    this.actor = actor;
    this.slotIndex = slotIndex;
  }

  /** @inheritdoc */
  get title() {
    return game.i18n.format("FLAIL.CombatTalentPicker.Title", {
      level:  this.slotIndex + 1,
      actor:  this.actor.name
    });
  }

  /* -------------------------------------------- */
  /*  Data                                        */
  /* -------------------------------------------- */

  /** @inheritdoc */
  async _prepareContext(options) {
    const sys = this.actor.system;
    const rawTalents = [...(sys.combatTalents ?? [])];
    while (rawTalents.length < 5) rawTalents.push("");

    const priorPicks = rawTalents.slice(0, this.slotIndex).filter(Boolean);
    const otherPicks = rawTalents.filter((k, i) => i !== this.slotIndex && k);
    const currentKey = rawTalents[this.slotIndex];
    const level = this.slotIndex + 1;

    // Return { available, reason } for each candidate.
    const status = (key, tier) => {
      if (key === currentKey) return { available: true, current: true };
      if (otherPicks.includes(key)) {
        return { available: false, reason: game.i18n.localize("FLAIL.CombatTalentPicker.ReasonDuplicate") };
      }
      if (level === 1 && tier !== "basic") {
        return { available: false, reason: game.i18n.localize("FLAIL.CombatTalentPicker.ReasonLevel1Basic") };
      }
      if (tier === "basic") {
        if (priorPicks.includes(key)) {
          return { available: false, reason: game.i18n.localize("FLAIL.CombatTalentPicker.ReasonBasicPriorSlot") };
        }
        return { available: true };
      }
      if (tier === "expert") {
        const info = FLAIL.getCombatTalent(key);
        if (!info) return { available: false, reason: "Unknown talent." };
        if (!priorPicks.includes(info.tree.basic.key)) {
          return { available: false, reason: game.i18n.format("FLAIL.CombatTalentPicker.ReasonExpertNeedsBasic", { basic: info.tree.basic.label }) };
        }
        return { available: true };
      }
      if (tier === "master") {
        const info = FLAIL.getCombatTalent(key);
        if (!info) return { available: false, reason: "Unknown talent." };
        if (!priorPicks.includes(info.parent.key)) {
          return { available: false, reason: game.i18n.format("FLAIL.CombatTalentPicker.ReasonMasterNeedsExpert", { expert: info.parent.label }) };
        }
        return { available: true };
      }
      return { available: false };
    };

    const trees = FLAIL.combatTalents.trees.map(tree => {
      const basic = {
        key:   tree.basic.key,
        label: tree.basic.label,
        desc:  tree.basic.desc,
        tier:  "basic",
        ...status(tree.basic.key, "basic")
      };
      const experts = tree.experts.map(expert => ({
        key:     expert.key,
        label:   expert.label,
        desc:    expert.desc,
        tier:    "expert",
        ...status(expert.key, "expert"),
        masters: expert.masters.map(master => ({
          key:   master.key,
          label: master.label,
          desc:  master.desc,
          tier:  "master",
          ...status(master.key, "master")
        }))
      }));
      return {
        key:     tree.key,
        label:   tree.label,
        hint:    tree.hint,
        basic,
        experts
      };
    });

    return {
      slotIndex:   this.slotIndex,
      slotLevel:   level,
      currentKey,
      hasCurrent:  !!currentKey,
      trees,
      actorId:     this.actor.id,
      actorUuid:   this.actor.uuid
    };
  }

  /* -------------------------------------------- */
  /*  Render                                       */
  /* -------------------------------------------- */

  /** @inheritdoc */
  _onRender(context, options) {
    super._onRender?.(context, options);

    // Wire up dragstart on every available talent card. The dataTransfer
    // payload is a JSON object with a distinctive `type` string so the
    // sheet's drop handler can filter for talent drops specifically and
    // ignore any other document/text drags landing on the same slot.
    const cards = this.element.querySelectorAll(".ct-card.ct-available");
    for (const card of cards) {
      card.addEventListener("dragstart", ev => {
        const payload = {
          type:       "flail-combat-talent",
          talentKey:  card.dataset.talentKey,
          slotIndex:  this.slotIndex,
          actorUuid:  this.actor.uuid
        };
        ev.dataTransfer.setData("text/plain", JSON.stringify(payload));
        ev.dataTransfer.effectAllowed = "copy";
        card.classList.add("ct-dragging");
      });
      card.addEventListener("dragend", () => {
        card.classList.remove("ct-dragging");
      });
    }
  }

  /* -------------------------------------------- */
  /*  Actions                                     */
  /* -------------------------------------------- */

  /**
   * Click-to-commit shortcut. Same result as dragging a card onto the
   * slot, but always available and works with keyboard/screen readers.
   */
  static async #onChooseTalent(event, target) {
    const key = target.dataset.talentKey;
    if (!key) return;
    if (target.classList.contains("ct-unavailable")) return;
    await this.actor.update({
      [`system.combatTalents.${this.slotIndex}`]: key
    });
    this.close();
  }

  /**
   * Clear the slot — sets it back to empty string. Useful for
   * "undo my pick" without needing to pick something else first.
   */
  static async #onClearSlot(event, target) {
    await this.actor.update({
      [`system.combatTalents.${this.slotIndex}`]: ""
    });
    this.close();
  }
}
