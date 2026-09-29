const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

const COMBAT_TALENTS_PACK = "world.flail-combat-talents";

/**
 * Combat Talent Picker (item-based).
 *
 * Reads from the world Combat Talents compendium. Each entry is a
 * first-class Item of type "combatTalent" with schema fields for
 * tree / tier / prerequisite / sourceKey.
 *
 * Two commit paths:
 *   A. Drag a card onto the target slot on the sheet — payload uses
 *      Foundry's standard `{ type: "Item", uuid }` shape plus a
 *      slotIndex hint (via the drop handler's slot data attribute).
 *   B. Click a card in the picker — embeds a copy immediately.
 *
 * Prerequisite gating (unchanged from the pre-item picker):
 *   * Basic: valid in any unlocked slot.
 *   * Expert: requires the SAME tree's Basic in an earlier slot.
 *   * Master: requires the specific parent Expert in an earlier slot.
 *
 * The picker matches prerequisites by comparing the compendium item's
 * sourceKey against the sourceKeys of embedded combatTalent items
 * already on the actor (in prior slots).
 *
 * Custom template: picking the "Custom Combat Talent" item embeds an
 * editable copy that the player can fully rewrite via the item sheet
 * (tree, tier, prerequisite, description all editable there).
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
   * @param {number} slotIndex   0-based (level 1 → 0, ..., level 5 → 4)
   */
  constructor(actor, slotIndex, options = {}) {
    super(options);
    this.actor = actor;
    this.slotIndex = slotIndex;
    this._items = [];
  }

  get title() {
    return game.i18n.format("FLAIL.CombatTalentPicker.Title", {
      level: this.slotIndex + 1,
      actor: this.actor.name
    });
  }

  /* -------------------------------------------- */
  /*  Data                                        */
  /* -------------------------------------------- */

  async _prepareContext(options) {
    const level = this.slotIndex + 1;

    // What talents are already embedded, and which slot does each fill?
    const embedded = this.actor.items.filter(i => i.type === "combatTalent");
    // Talents in slots STRICTLY less than this one (already chosen at earlier levels).
    const priorSourceKeys = embedded
      .filter(i => (i.system?.slotIndex ?? 0) < this.slotIndex)
      .map(i => i.system?.sourceKey)
      .filter(Boolean);
    // Talents in slots OTHER than this one (used to prevent duplicates).
    const otherSourceKeys = embedded
      .filter(i => (i.system?.slotIndex ?? -1) !== this.slotIndex)
      .map(i => i.system?.sourceKey)
      .filter(Boolean);
    // What's currently in THIS slot?
    const currentInSlot = embedded.find(i => (i.system?.slotIndex ?? -1) === this.slotIndex);
    const currentSourceKey = currentInSlot?.system?.sourceKey ?? "";

    // Load compendium items.
    const pack = game.packs.get(COMBAT_TALENTS_PACK);
    const packItems = pack ? await pack.getDocuments() : [];
    this._items = packItems;

    // Per-item availability calculation.
    const status = (item) => {
      const sourceKey = item.system?.sourceKey ?? "";
      const tier = item.system?.tier ?? "basic";
      const prereq = item.system?.prerequisite ?? "";
      const isCustom = !!item.system?.isCustomTemplate;

      if (sourceKey && sourceKey === currentSourceKey) {
        return { available: true, current: true };
      }
      if (sourceKey && otherSourceKeys.includes(sourceKey)) {
        return { available: false, reason: game.i18n.localize("FLAIL.CombatTalentPicker.ReasonDuplicate") };
      }
      // Custom is always available in any slot — the player edits the
      // tier + prerequisite on the item sheet after embedding.
      if (isCustom) return { available: true };
      if (level === 1 && tier !== "basic") {
        return { available: false, reason: game.i18n.localize("FLAIL.CombatTalentPicker.ReasonLevel1Basic") };
      }
      if (tier === "basic") {
        // Duplicate check upstream covers "same basic in earlier slot".
        return { available: true };
      }
      if (tier === "expert") {
        if (!priorSourceKeys.includes(prereq)) {
          // Find the prereq item's name for the reason string.
          const prereqItem = packItems.find(i => i.system?.sourceKey === prereq);
          return {
            available: false,
            reason: game.i18n.format("FLAIL.CombatTalentPicker.ReasonExpertNeedsBasic",
              { basic: prereqItem?.name ?? prereq })
          };
        }
        return { available: true };
      }
      if (tier === "master") {
        if (!priorSourceKeys.includes(prereq)) {
          const prereqItem = packItems.find(i => i.system?.sourceKey === prereq);
          return {
            available: false,
            reason: game.i18n.format("FLAIL.CombatTalentPicker.ReasonMasterNeedsExpert",
              { expert: prereqItem?.name ?? prereq })
          };
        }
        return { available: true };
      }
      return { available: false };
    };

    // Group by tree, sorted so custom template appears first, then
    // stock trees alphabetically. Basic → Experts → Masters within each.
    const customItem = packItems.find(i => i.system?.isCustomTemplate);
    const stockItems = packItems.filter(i => !i.system?.isCustomTemplate);

    const trees = new Map();
    for (const item of stockItems) {
      const treeKey = item.system?.tree ?? "unknown";
      if (!trees.has(treeKey)) {
        trees.set(treeKey, {
          key: treeKey,
          label: item.system?.treeLabel ?? treeKey,
          basic: null,
          experts: new Map()
        });
      }
      const tree = trees.get(treeKey);
      const cardData = {
        uuid: item.uuid,
        sourceKey: item.system?.sourceKey ?? "",
        key: item.system?.sourceKey ?? item.id,
        label: item.name,
        desc: item.system?.description ?? "",
        tier: item.system?.tier ?? "basic",
        ...status(item)
      };
      if (item.system?.tier === "basic") {
        tree.basic = cardData;
      } else if (item.system?.tier === "expert") {
        if (!tree.experts.has(item.system.sourceKey)) {
          tree.experts.set(item.system.sourceKey, { ...cardData, masters: [] });
        } else {
          Object.assign(tree.experts.get(item.system.sourceKey), cardData);
        }
      } else if (item.system?.tier === "master") {
        // Attach to parent Expert by prerequisite sourceKey.
        const parentKey = item.system?.prerequisite ?? "";
        if (!tree.experts.has(parentKey)) {
          // Placeholder in case master appears before its expert.
          tree.experts.set(parentKey, { masters: [] });
        }
        tree.experts.get(parentKey).masters.push(cardData);
      }
    }

    // Serialize trees for the template.
    const treeList = [...trees.values()].map(t => ({
      key: t.key,
      label: t.label,
      basic: t.basic,
      experts: [...t.experts.values()].filter(e => e.uuid).map(e => ({
        ...e,
        masters: e.masters ?? []
      }))
    }));

    return {
      slotIndex: this.slotIndex,
      slotLevel: level,
      currentSourceKey,
      hasCurrent: !!currentSourceKey,
      customCard: customItem ? {
        uuid: customItem.uuid,
        label: customItem.name,
        desc: customItem.system?.description ?? "",
        ...status(customItem)
      } : null,
      trees: treeList,
      packMissing: !pack
    };
  }

  /* -------------------------------------------- */
  /*  Render                                      */
  /* -------------------------------------------- */

  _onRender(context, options) {
    super._onRender?.(context, options);
    // Draggable cards use Foundry's standard item drag format plus a
    // custom `slotIndex` field that the sheet's drop handler reads.
    const cards = this.element.querySelectorAll(".ct-card.ct-available");
    for (const card of cards) {
      card.addEventListener("dragstart", ev => {
        const uuid = card.dataset.itemUuid;
        if (!uuid) return;
        const payload = {
          type: "Item",
          uuid,
          flailTalentSlotIndex: this.slotIndex
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
   * Click-to-commit shortcut. Removes any existing talent in the
   * target slot, then embeds a fresh copy of the compendium item
   * with slotIndex set.
   */
  static async #onChooseTalent(event, target) {
    if (target.classList.contains("ct-unavailable")) return;
    const uuid = target.dataset.itemUuid;
    if (!uuid) return;
    const source = await fromUuid(uuid);
    if (!source) return;

    // Remove anything currently in this slot.
    const existingInSlot = this.actor.items
      .filter(i => i.type === "combatTalent" && (i.system?.slotIndex ?? -1) === this.slotIndex)
      .map(i => i.id);
    if (existingInSlot.length) {
      await this.actor.deleteEmbeddedDocuments("Item", existingInSlot);
    }

    // Embed a copy with slotIndex set.
    const data = source.toObject();
    delete data._id;
    data.system = { ...(data.system ?? {}), slotIndex: this.slotIndex };
    await this.actor.createEmbeddedDocuments("Item", [data]);
    this.close();
  }

  /**
   * Clear this slot — deletes the embedded combatTalent item(s)
   * marked with slotIndex === this.slotIndex.
   */
  static async #onClearSlot(event, target) {
    const toDelete = this.actor.items
      .filter(i => i.type === "combatTalent" && (i.system?.slotIndex ?? -1) === this.slotIndex)
      .map(i => i.id);
    if (toDelete.length) {
      await this.actor.deleteEmbeddedDocuments("Item", toDelete);
    }
    this.close();
  }
}
