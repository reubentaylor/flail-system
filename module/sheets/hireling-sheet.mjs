import { FLAIL } from "../helpers/config.mjs";
import { applyHirelingType } from "../documents/hireling-grants.mjs";
import {
  getPatron, linkPatron, unlinkPatron, payAllowance, rollMorale,
  levelUpHireling, useHirelingAbility, resetDaily, hasRepeatableAbility,
  promoteToCharacter
} from "../documents/hireling-ops.mjs";

const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Hireling sheet (Ship H1, tabbed in v0.4.113).
 *
 * Three tabs:
 *   - Abilities: attributes (clickable saves) + vitals.
 *   - Inventory: the 8-slot grid, using the SAME inventory-slot partial as
 *     the character sheet — identical dimensions, two-slot spanning, and
 *     clickable usage pips.
 *   - Type: type picker + ability/allowance + patron + granted talents/spells
 *     + notes.
 *
 * Attribute saves and weapon attacks run through the shared FlailActor
 * methods; the inventory drag-drop and usage-pip logic are ported from
 * the character sheet (pointed at FLAIL.hirelingInventory.zones).
 */
export class FlailHirelingSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
  _activeTab = "abilities";

  static DEFAULT_OPTIONS = {
    classes: ["flail", "sheet", "actor", "hireling"],
    position: { width: 680, height: 780 },
    window: { resizable: true, contentClasses: ["flail-hireling"] },
    actions: {
      rollSave:          FlailHirelingSheet.#onRollSave,
      rollAttack:        FlailHirelingSheet.#onRollAttack,
      adjustHp:          FlailHirelingSheet.#onAdjustHp,
      applyHirelingType: FlailHirelingSheet.#onApplyHirelingType,
      itemEdit:          FlailHirelingSheet.#onItemEdit,
      itemDelete:        FlailHirelingSheet.#onItemDelete,
      itemCreate:        FlailHirelingSheet.#onItemCreate,
      markUsage:         FlailHirelingSheet.#onMarkUsage,
      toggleUsagePip:    FlailHirelingSheet.#onToggleUsagePip,
      clearUsage:        FlailHirelingSheet.#onClearUsage,
      selectTab:         FlailHirelingSheet.#onSelectTab,
      editImage:         FlailHirelingSheet.#onEditImage,
      payAllowance:      FlailHirelingSheet.#onPayAllowance,
      rollMorale:        FlailHirelingSheet.#onRollMorale,
      levelUp:           FlailHirelingSheet.#onLevelUp,
      useAbility:        FlailHirelingSheet.#onUseAbility,
      newDay:            FlailHirelingSheet.#onNewDay,
      openPatron:        FlailHirelingSheet.#onOpenPatron,
      unlinkPatron:      FlailHirelingSheet.#onUnlinkPatron,
      promoteToCharacter: FlailHirelingSheet.#onPromoteToCharacter
    },
    form: { submitOnChange: true, closeOnSubmit: false },
    dragDrop: [{ dragSelector: ".slot-item", dropSelector: ".inventory-zone" }]
  };

  static PARTS = {
    main: { template: "systems/flail/templates/actor/hireling.hbs" }
  };

  /* -------------------------------------------- */
  /*  Context                                     */
  /* -------------------------------------------- */

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    const actor = this.actor;
    const sys = actor.system;

    ctx.actor = actor;
    ctx.system = sys;
    ctx.config = FLAIL;
    ctx.editable = this.isEditable;

    // Tabs.
    ctx.activeTab = this._activeTab;
    ctx.tabs = [
      { id: "abilities", label: "Abilities", active: this._activeTab === "abilities" },
      { id: "inventory", label: "Inventory", active: this._activeTab === "inventory" },
      { id: "type",      label: "Type",      active: this._activeTab === "type" }
    ];

    // Attributes — clickable saves.
    ctx.attributes = FLAIL.attributeKeys.map(key => ({
      key,
      label: key.toUpperCase(),
      base: sys.attributes?.[key]?.base ?? 0,
      current: sys.attributes?.[key]?.current ?? 0
    }));

    // Type picker + current type headline.
    const typeKey = sys.hirelingType ?? "";
    ctx.typeKey = typeKey;
    ctx.typeOptions = [
      { key: "", label: "— choose a type —", selected: !typeKey },
      ...FLAIL.hirelingTypeKeys.map(k => ({
        key: k, label: FLAIL.hirelingTypes[k].label, selected: k === typeKey
      }))
    ];
    ctx.currentType = typeKey ? FLAIL.hirelingTypes[typeKey] ?? null : null;

    // Inventory grid (two-slot aware).
    ctx.inventory = this.#prepareInventory(actor);
    ctx.inventoryZones = Object.values(ctx.inventory);

    // Unslotted grant items (talents / spells).
    ctx.extraItems = actor.items
      .filter(i => ["talent", "spell"].includes(i.type))
      .map(i => ({ id: i.id, name: i.name, img: i.img, type: i.type }));

    ctx.descriptionHTML = await foundry.applications.ux.TextEditor.implementation.enrichHTML(
      sys.description ?? "", { relativeTo: actor, secrets: actor.isOwner }
    );

    // --- H2: Service (patron link, allowance, morale, level, ability) ---
    const patron = getPatron(actor);
    ctx.patron = patron ? { id: patron.id, name: patron.name, img: patron.img, level: patron.system?.level ?? null, coins: patron.system?.coins ?? 0 } : null;
    ctx.patronName = patron?.name || sys.patronName || "";
    ctx.allowance = sys.allowance ?? 0;
    ctx.allowancePaid = !!sys.allowancePaid;
    // Level-up is available when a patron is linked and the hireling trails
    // the patron's level (and is below 6).
    const lvl = sys.level ?? 1;
    ctx.canLevelUp = !!patron && lvl < 6 && (patron.system?.level ?? 1) > lvl;
    // Repeatable ability state.
    ctx.hasRepeatableAbility = hasRepeatableAbility(actor);
    ctx.abilityType = sys.hirelingType ?? "";
    ctx.abilityDailyUsed = !!sys.abilityDailyUsed;
    ctx.abilityUsesLeft = sys.abilityUsesLeft ?? 0;
    ctx.isHealer = sys.hirelingType === "healer";

    return ctx;
  }

  /** Build the 3-zone hireling inventory, including two-slot spans. */
  #prepareInventory(actor) {
    const zones = {};
    for (const [zoneKey, zdef] of Object.entries(FLAIL.hirelingInventory.zones)) {
      const slots = (actor.system.slotAvailability?.[zoneKey] ?? []).map(s => ({ ...s, item: null, secondary: null }));
      const cols = zdef.columns ?? 1;
      const itemsInZone = actor.items.filter(i =>
        i.system?.location === zoneKey && typeof i.system?.slotIndex === "number"
      );
      for (const item of itemsInZone) {
        const idx = item.system.slotIndex;
        const slot = slots[idx];
        if (!slot) continue;
        slot.item = item;
        slot.itemUsedOut = !!item.getFlag?.("flail", "usedOut");
        slot.itemUsedToday = !!item.getFlag?.("flail", "usedToday");
        const span = item.system.slotsRequired ?? 1;
        if (span > 1) slot.spansTwo = true;
        for (let i = 1; i < span; i++) {
          const next = slots[idx + i * cols];
          if (next) next.secondary = item;
        }
      }
      zones[zoneKey] = {
        key: zoneKey,
        label: game.i18n.localize(zdef.label),
        considered: zdef.considered,
        slots
      };
    }
    return zones;
  }

  /* -------------------------------------------- */
  /*  Render — slot drag/drop + editor wiring     */
  /* -------------------------------------------- */

  _onRender(context, options) {
    super._onRender?.(context, options);
    const root = this.element;
    if (!root) return;

    // Reflect the active tab for the CSS panel-visibility rules.
    root.dataset.activeTab = this._activeTab;

    root.querySelectorAll("[draggable=true]").forEach(el => {
      el.addEventListener("dragstart", this.#onDragStart.bind(this));
    });
    root.querySelectorAll(".inventory-slot").forEach(el => {
      el.addEventListener("dragover", this.#onDragOver.bind(this));
      el.addEventListener("drop", this.#onDrop.bind(this));
    });
    root.querySelectorAll(".editor a.editor-edit, .editor button.editor-edit").forEach(btn => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        await this.#activateEditor(btn);
      });
    });

    // Patron drop zone (Type tab) — drop a character Actor here to hire out.
    root.querySelectorAll("[data-flail-drop-target='patron']").forEach(el => {
      el.addEventListener("dragover", ev => { ev.preventDefault(); el.classList.add("drag-over"); });
      el.addEventListener("dragleave", () => el.classList.remove("drag-over"));
      el.addEventListener("drop", this.#onPatronDrop.bind(this));
    });
  }

  /** Accept a character Actor dropped on the patron zone and link it. */
  async #onPatronDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove("drag-over");
    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); }
    catch { return; }
    if (payload.type !== "Actor") {
      ui.notifications?.warn("FLAIL: drop a player character here to set the patron.");
      return;
    }
    const patron = await fromUuid(payload.uuid);
    if (!patron) return;
    await linkPatron(this.actor, patron);
    this.render(false);
  }

  async #activateEditor(btn) {
    const editorEl = btn.closest(".editor");
    if (!editorEl) return;
    const contentEl = editorEl.querySelector("[data-edit], [name]");
    if (!contentEl) return;
    const field = contentEl.dataset.edit ?? contentEl.getAttribute("name");
    if (!field || editorEl.classList.contains("prosemirror-editing")) return;
    const currentValue = foundry.utils.getProperty(this.document, field) ?? "";
    const PM = globalThis.ProseMirror ?? foundry?.prosemirror;
    if (!PM?.ProseMirrorEditor) {
      contentEl.setAttribute("contenteditable", "true");
      contentEl.focus();
      const original = contentEl.innerHTML;
      const stop = async (save) => {
        contentEl.setAttribute("contenteditable", "false");
        if (save) await this.document.update({ [field]: contentEl.innerHTML });
        else contentEl.innerHTML = original;
        this.render(false);
      };
      contentEl.addEventListener("blur", () => stop(true), { once: true });
      contentEl.addEventListener("keydown", ev => { if (ev.key === "Escape") { ev.preventDefault(); stop(false); } });
      return;
    }
    editorEl.classList.add("prosemirror-editing");
    try {
      const schema = PM.defaultSchema;
      const menu = PM.ProseMirrorMenu.build(schema, { destroyOnSave: true, onSave: async () => { setTimeout(() => this.render(false), 100); } });
      const keyMaps = PM.ProseMirrorKeyMaps.build(schema, { onSave: () => {} });
      await PM.ProseMirrorEditor.create(contentEl, currentValue, { document: this.document, fieldName: field, plugins: { menu, keyMaps } });
    } catch (err) {
      console.error("FLAIL | Failed to activate ProseMirror editor", err);
      editorEl.classList.remove("prosemirror-editing");
    }
  }

  /* -------------------------------------------- */
  /*  Inventory drag/drop (ported from character) */
  /* -------------------------------------------- */

  #checkMultiSlotFit(item, zone, slotIndex, span) {
    const zoneSlots = this.actor.system.slotAvailability?.[zone] ?? [];
    const zoneDef = FLAIL.hirelingInventory.zones[zone];
    const zoneLabel = zoneDef ? game.i18n.localize(zoneDef.label) : zone;
    const cols = zoneDef?.columns ?? 1;
    for (let i = 1; i < span; i++) {
      const nextIdx = slotIndex + i * cols;
      if (nextIdx >= zoneSlots.length) {
        return { ok: false, message: `${item.name} doesn't fit — no room below it in ${zoneLabel}.` };
      }
      if (zoneSlots[nextIdx]?.locked) {
        return { ok: false, message: `${item.name} doesn't fit — a slot below it is locked.` };
      }
      const blocker = this.actor.items.find(other => {
        if (other.id === item.id) return false;
        if (other.system?.location !== zone) return false;
        const otherStart = other.system?.slotIndex ?? 0;
        const otherSpan = other.system?.slotsRequired ?? 1;
        for (let j = 0; j < otherSpan; j++) if (otherStart + j * cols === nextIdx) return true;
        return false;
      });
      if (blocker) {
        return { ok: false, message: `${item.name} doesn't fit — ${blocker.name} is in the way.` };
      }
    }
    return { ok: true };
  }

  #onDragOver(event) {
    const slot = event.currentTarget;
    const zoneEl = slot.closest(".inventory-zone");
    if (!zoneEl?.dataset.zone) return;
    if (slot.classList.contains("is-locked")) return;
    const types = Array.from(event.dataTransfer?.types ?? []);
    const isInternal = types.includes("application/x-flail-internal");
    if (!isInternal && slot.classList.contains("is-occupied")) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = isInternal ? "move" : "copy";
  }

  #onDragStart(event) {
    const itemId = event.currentTarget.dataset.itemId;
    if (!itemId) return;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    event.dataTransfer.setData("text/plain", JSON.stringify({
      type: "Item", uuid: item.uuid, flailDrag: { itemId }
    }));
    event.dataTransfer.setData("application/x-flail-internal", "1");
    event.dataTransfer.setData(`application/x-flail-itemtype-${item.type}`, "1");
  }

  async #onDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget.closest(".inventory-slot");
    const zoneEl = event.currentTarget.closest(".inventory-zone");
    const zone = zoneEl?.dataset.zone;
    const slotIndex = target ? Number(target.dataset.slotIndex) : 0;
    if (!zone) return;
    if (target?.classList.contains("is-locked")) return;

    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); }
    catch { return; }

    // Internal drag — move / swap within this actor.
    if (payload.flailDrag?.itemId) {
      const item = this.actor.items.get(payload.flailDrag.itemId);
      if (!item) return;
      if (!item.system || !("location" in item.system)) return;

      const span = item.system?.slotsRequired ?? 1;
      if (span > 1) {
        const check = this.#checkMultiSlotFit(item, zone, slotIndex, span);
        if (!check.ok) { ui.notifications?.warn(check.message); return; }
      }
      if (item.system.location === zone && item.system.slotIndex === slotIndex) return;

      const occupant = this.actor.items.find(i =>
        i.id !== item.id && i.system?.location === zone && i.system?.slotIndex === slotIndex
      );
      if (occupant) {
        const fromZone = item.system.location;
        const fromIndex = item.system.slotIndex ?? 0;
        await this.actor.updateEmbeddedDocuments("Item", [
          { _id: item.id,     "system.location": zone,     "system.slotIndex": slotIndex },
          { _id: occupant.id, "system.location": fromZone, "system.slotIndex": fromIndex }
        ]);
        return;
      }
      await item.update({ "system.location": zone, "system.slotIndex": slotIndex });
      return;
    }

    // External drag — new item onto the hireling. Empty slots only.
    if (target?.classList.contains("is-occupied")) return;
    const item = await Item.implementation.fromDropData(payload);
    if (!item) return;
    if (!item.system || !("location" in item.system)) {
      ui.notifications?.warn("FLAIL: that item type doesn't occupy an inventory slot.");
      return;
    }
    const extSpan = item.system?.slotsRequired ?? 1;
    if (extSpan > 1) {
      const check = this.#checkMultiSlotFit(item, zone, slotIndex, extSpan);
      if (!check.ok) { ui.notifications?.warn(check.message); return; }
    }
    const data = item.toObject();
    data.system ??= {};
    data.system.location = zone;
    data.system.slotIndex = slotIndex;
    await this.actor.createEmbeddedDocuments("Item", [data]);
  }

  async _onDropItem(event, item) { return; } // only slot-cell drops accepted

  /* -------------------------------------------- */
  /*  Action handlers                             */
  /* -------------------------------------------- */

  static async #onSelectTab(event, target) {
    const tab = target.dataset.tab;
    if (!tab) return;
    this._activeTab = tab;
    const root = this.element;
    if (!root) return;
    root.dataset.activeTab = tab;
    for (const btn of root.querySelectorAll(".tabs-nav .tab-btn")) {
      btn.classList.toggle("is-active", btn.dataset.tab === tab);
    }
  }

  static async #onRollSave(event, target) {
    const attribute = target.dataset.attribute;
    if (!attribute) return;
    const adv = event.shiftKey ? 1 : (event.ctrlKey || event.metaKey) ? -1 : 0;
    return this.actor.rollSave(attribute, { advantage: adv });
  }

  static async #onRollAttack(event, target) {
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const adv = event.shiftKey ? 1 : (event.ctrlKey || event.metaKey) ? -1 : 0;
    return this.actor.rollAttack(item, { advantage: adv });
  }

  static async #onAdjustHp(event, target) {
    const delta = Number(target.dataset.delta ?? 0);
    if (!delta) return;
    const cur = this.actor.system.hp?.value ?? 0;
    const max = this.actor.system.hp?.max ?? 0;
    const next = Math.max(0, Math.min(max, cur + delta));
    this.actor.update({ "system.hp.value": next });
  }

  static async #onApplyHirelingType(event, target) {
    const picker = this.element?.querySelector('select[name="hireling-type-picker"]');
    const key = picker?.value ?? "";
    if (!key) { ui.notifications?.warn("FLAIL: choose a hireling type first."); return; }
    const def = FLAIL.hirelingTypes[key];
    if (def?.patronClass) {
      const patron = this.actor.system.patronUuid ? await fromUuid(this.actor.system.patronUuid) : null;
      const patronClass = patron?.system?.class;
      if (patron && patronClass && patronClass !== def.patronClass) {
        ui.notifications?.warn(`FLAIL: a ${def.label} normally only follows a ${def.patronClass}. Applying anyway.`);
      }
    }
    await applyHirelingType(this.actor, key);
    this.render(false);
  }

  static async #onItemEdit(event, target) {
    const itemId = target.dataset.itemId ?? target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) item.sheet?.render(true);
  }

  static async #onItemDelete(event, target) {
    const itemId = target.dataset.itemId ?? target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) item.delete();
  }

  static async #onItemCreate(event, target) {
    const type = target.dataset.type ?? "gear";
    const created = await this.actor.createEmbeddedDocuments("Item", [{
      name: game.i18n.format("DOCUMENT.New", { type: type.charAt(0).toUpperCase() + type.slice(1) }),
      type
    }]);
    if (created?.[0]) created[0].sheet?.render(true);
  }

  static async #onMarkUsage(event, target) {
    const itemId = target.dataset.itemId ?? target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const max = item.system.usage?.max ?? 0;
    const current = item.system.usage?.value ?? 0;
    if (max > 0 && current >= max) { await item.update({ "system.usage.value": 0 }); return; }
    return item.markUsage();
  }

  static async #onToggleUsagePip(event, target) {
    const itemId = target.dataset.itemId;
    const pipIndex = Number(target.dataset.pipIndex);
    if (!itemId || !Number.isInteger(pipIndex) || pipIndex < 1) return;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const max = item.system.usage?.max ?? 0;
    if (max <= 0) return;
    const current = item.system.usage?.value ?? 0;
    let next;
    if (current >= max) next = 0;
    else if (current >= pipIndex) next = pipIndex - 1;
    else next = pipIndex;
    const clamped = Math.max(0, Math.min(max, next));
    if (clamped === current) return;
    await item.update({ "system.usage.value": clamped });
  }

  static async #onClearUsage(event, target) {
    const itemId = target.dataset.itemId ?? target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item?.system?.repair) item.system.repair();
  }

  static async #onEditImage(event, target) {
    const attr = target.dataset.edit ?? "img";
    const current = foundry.utils.getProperty(this.document, attr);
    const FP = foundry.applications.apps.FilePicker?.implementation ?? globalThis.FilePicker;
    const fp = new FP({ type: "image", current, callback: path => this.document.update({ [attr]: path }) });
    return fp.browse();
  }

  /* -------------------------------------------- */
  /*  H2 — service actions                        */
  /* -------------------------------------------- */

  static async #onPayAllowance(event, target) {
    await payAllowance(this.actor);
    this.render(false);
  }

  static async #onRollMorale(event, target) {
    const adv = event.shiftKey ? 1 : (event.ctrlKey || event.metaKey) ? -1 : 0;
    await rollMorale(this.actor, { advantage: adv });
    this.render(false);
  }

  static async #onLevelUp(event, target) {
    await levelUpHireling(this.actor);
    this.render(false);
  }

  static async #onUseAbility(event, target) {
    await useHirelingAbility(this.actor);
    this.render(false);
  }

  static async #onNewDay(event, target) {
    await resetDaily(this.actor);
    this.render(false);
  }

  static async #onOpenPatron(event, target) {
    const patron = getPatron(this.actor);
    if (patron) patron.sheet?.render(true);
    else ui.notifications?.info("FLAIL: no patron linked.");
  }

  static async #onUnlinkPatron(event, target) {
    await unlinkPatron(this.actor);
    this.render(false);
  }

  static async #onPromoteToCharacter(event, target) {
    await promoteToCharacter(this.actor);
    // The hireling may have been deleted; guard the re-render.
    if (this.actor?.id && game.actors.get(this.actor.id)) this.render(false);
  }
}
