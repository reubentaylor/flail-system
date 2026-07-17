import { rollSave } from "../dice/save.mjs";
import { FLAIL } from "../helpers/config.mjs";

const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

// Fixed maxes per the printed sheet — the construct never gets more
// than 4 carried and 6 stashed regardless of improvement spending.
const MAX_CARRIED = 4;
const MAX_STASHED = 6;

/**
 * Sheet for a Tinkerer's Construct Companion.
 *
 * Inventory model: 4 carried and 6 stashed slots (fixed), with only
 * `system.inventorySlots.unlockedCarried` and `.unlockedStashed`
 * currently available for drops. A new construct has 1 carried
 * unlocked (for the Sparkle of Life) and 0 stashed. Improvements
 * unlock additional slots (carried first, then stashed).
 *
 * Drag and drop is modelled on the character sheet's zone/slot
 * pattern but simplified — only two zones, no type restrictions,
 * no per-slot capacity beyond one item per slot.
 */
export class FlailConstructSheet extends HandlebarsApplicationMixin(ActorSheetV2) {

  // Which tab is currently open. Mirrored to the root's
  // `data-active-tab` at render time so CSS handles visibility.
  _activeTab = "abilities";

  static DEFAULT_OPTIONS = {
    classes: ["flail", "sheet", "actor", "construct"],
    position: { width: 720, height: 780 },
    actions: {
      rollSave:      FlailConstructSheet.#onRollSave,
      rollAttack:    FlailConstructSheet.#onRollAttack,
      rollInherentAttack: FlailConstructSheet.#onRollInherentAttack,
      itemEdit:      FlailConstructSheet.#onItemEdit,
      itemDelete:    FlailConstructSheet.#onItemDelete,
      itemCreate:    FlailConstructSheet.#onItemCreate,
      markUsage:     FlailConstructSheet.#onMarkUsage,
      toggleUsagePip: FlailConstructSheet.#onToggleUsagePip,
      adjustHp:      FlailConstructSheet.#onAdjustHp,
      unlockCarried: FlailConstructSheet.#onUnlockCarried,
      unlockStashed: FlailConstructSheet.#onUnlockStashed,
      selectTab:     FlailConstructSheet.#onSelectTab,
      toggleImprovementLock: FlailConstructSheet.#onToggleImprovementLock,
      addImprovement:        FlailConstructSheet.#onAddImprovement,
      removeImprovement:     FlailConstructSheet.#onRemoveImprovement,
      startReassemble:       FlailConstructSheet.#onStartReassemble,
      finishReassemble:      FlailConstructSheet.#onFinishReassemble,
      setOwner:              FlailConstructSheet.#onSetOwner,
      clearOwner:            FlailConstructSheet.#onClearOwner,
      breakDown:             FlailConstructSheet.#onBreakDown,
      rebuild:               FlailConstructSheet.#onRebuild
    },
    form: { submitOnChange: true, closeOnSubmit: false },
    dragDrop: [{ dragSelector: ".construct-slot .slot-item", dropSelector: ".construct-slot" }]
  };

  static PARTS = {
    main: { template: "systems/flail/templates/actor/construct.hbs" }
  };

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    const actor = this.actor;
    const sys = actor.system;

    ctx.actor    = actor;
    ctx.system   = sys;
    ctx.config   = FLAIL;
    ctx.editable = this.isEditable;

    // Slot capacity + zones.
    const unlockedCarried = sys.inventorySlots?.unlockedCarried ?? 1;
    const unlockedStashed = sys.inventorySlots?.unlockedStashed ?? 0;
    ctx.unlockedCarried = unlockedCarried;
    ctx.unlockedStashed = unlockedStashed;
    ctx.maxCarried = MAX_CARRIED;
    ctx.maxStashed = MAX_STASHED;
    ctx.canUnlockCarried = unlockedCarried < MAX_CARRIED;
    ctx.canUnlockStashed = unlockedStashed < MAX_STASHED && unlockedCarried >= MAX_CARRIED;

    // Build slot arrays. Each slot is either { locked: true } or
    // { locked: false, item: <Item or null> }. For carried slots we
    // also compute `canAttack` — true when the item is a weapon whose
    // TH is at or below the construct's own TH, so the template can
    // show a Hit Roll icon on the slot.
    const items = actor.items.contents;
    const constructTh = sys.th ?? 0;
    const findAt = (zone, idx) => items.find(i =>
      i.system?.location === zone && (i.system?.slotIndex ?? 0) === idx
    ) ?? null;

    ctx.carriedSlots = Array.from({ length: MAX_CARRIED }, (_, idx) => {
      const item = idx < unlockedCarried ? findAt("constructCarried", idx) : null;
      const canAttack = !!(item && item.type === "weapon" && (item.system?.th ?? 0) <= constructTh);
      return {
        zone: "constructCarried",
        index: idx,
        locked: idx >= unlockedCarried,
        item,
        canAttack
      };
    });
    ctx.stashedSlots = Array.from({ length: MAX_STASHED }, (_, idx) => ({
      zone: "constructStashed",
      index: idx,
      locked: idx >= unlockedStashed,
      item: idx < unlockedStashed ? findAt("constructStashed", idx) : null
    }));

    // Sparkle-of-Life check — any carried item whose name includes
    // "sparkle of life" activates the construct. Only checks carried
    // slots since stashed items aren't equipped.
    ctx.hasSparkle = ctx.carriedSlots.some(s =>
      s.item?.name?.toLowerCase().includes("sparkle of life")
    );

    // Improvement points: 5 per level. Player-tracked spend for now.
    // Improvement points: 5 per level, minus permanent losses from
    // Reassemble taxes. The pool ceiling drops by 1 for each
    // Reassemble action the Tinkerer has committed on this construct.
    ctx.permanentPointsLost = sys.permanentPointsLost ?? 0;
    ctx.improvementPointsTotal = Math.max(0, (sys.level ?? 1) * 5 - ctx.permanentPointsLost);

    // Top quick-attacks card: only weapons in `constructCarried` whose
    // TH is ≤ the construct's own TH. Stashed weapons need to be
    // equipped first (i.e. moved into carried) before they can swing.
    ctx.attacks = items
      .filter(i => i.type === "weapon"
                && i.system?.location === "constructCarried"
                && (i.system?.th ?? 0) <= constructTh);

    // Abilities list, precomputed for the checkbox column.
    ctx.abilitiesList = [
      "camouflage", "climbing", "darkvision", "frogLeaping",
      "illumination", "hovering", "swimming", "speech"
    ].map(k => ({
      key: k,
      label: game.i18n.localize(`FLAIL.Construct.Ability.${k}`),
      checked: !!(sys.abilities?.[k])
    }));

    // Owner (Tinkerer) linkage. system.ownerUuid stores the linked
    // character's UUID; we look up its current name for display, and
    // build a dropdown of Tinkerer characters in the world for the
    // player to pick from when no owner is set (or to change it).
    ctx.ownerName = "";
    if (sys.ownerUuid) {
      const owner = fromUuidSync?.(sys.ownerUuid);
      ctx.ownerName = owner?.name ?? "";
    }
    ctx.tinkererOptions = (game.actors?.filter(a =>
      a.type === "character" && a.system?.class === "tinkerer"
    ) ?? []).map(a => ({
      uuid: a.uuid,
      name: a.name
    }));

    // Broken state + Rebuild affordability context. When broken, the
    // sheet shows a banner + Rebuild card; when HP=0 but not yet
    // broken, the Break Down button appears so the player can trigger
    // the improvement-loss flow manually if they dismissed the
    // auto-prompt.
    ctx.isBroken = !!sys.broken;
    const curHp = sys.hp?.value ?? 0;
    const maxHp = sys.hp?.max ?? 0;
    ctx.needsBreakDown = curHp === 0 && !sys.broken;
    ctx.rebuildCost   = maxHp * 100;
    ctx.rebuildDays   = maxHp;
    const owner = sys.ownerUuid ? fromUuidSync?.(sys.ownerUuid) : null;
    ctx.ownerCoins  = owner?.system?.coins ?? 0;
    ctx.canRebuild  = !!(sys.broken && owner && ctx.ownerCoins >= ctx.rebuildCost);
    ctx.rebuildBlockedReason = sys.broken && !owner
      ? "noOwner"
      : (sys.broken && ctx.ownerCoins < ctx.rebuildCost ? "noCoins" : "");

    // Tabs — Abilities / Inventory / Improvements.
    ctx.activeTab = this._activeTab;
    ctx.tabs = [
      { id: "abilities",    label: "FLAIL.Construct.Abilities",    active: this._activeTab === "abilities" },
      { id: "inventory",    label: "FLAIL.Section.Inventory",      active: this._activeTab === "inventory" },
      { id: "improvements", label: "FLAIL.Construct.Improvements", active: this._activeTab === "improvements" }
    ];

    // Improvements tab context.
    const improvementsList = sys.improvements ?? [];
    // Spent points = every entry's cost, INCLUDING lost ones. Lost
    // improvements are sunk cost — their points are not refunded.
    const spentPoints = improvementsList.reduce((sum, entry) => {
      const def = FLAIL.constructImprovements.find(d => d.key === entry.key);
      return sum + (def?.cost ?? 0);
    }, 0);
    // Sunk = the subset of spent that's tied up in lost improvements.
    // Displayed separately so the player understands "why so few
    // available" after a break.
    const sunkPoints = improvementsList
      .filter(e => e.lost)
      .reduce((sum, entry) => {
        const def = FLAIL.constructImprovements.find(d => d.key === entry.key);
        return sum + (def?.cost ?? 0);
      }, 0);
    ctx.spentPoints     = spentPoints;
    ctx.sunkPoints      = sunkPoints;
    ctx.availablePoints = Math.max(0, ctx.improvementPointsTotal - spentPoints);
    ctx.improvementsLocked = !!sys.improvementsLocked;

    // Reassemble session state. Reassemble requires unlock + not
    // broken + linked owner. The mode itself persists on the actor
    // so it survives sheet closes.
    ctx.reassembleMode = !!sys.reassembleMode;
    ctx.canStartReassemble = !sys.improvementsLocked
                          && !sys.broken
                          && !!sys.ownerUuid
                          && !sys.reassembleMode;
    ctx.reassembleBlockedReason =
        sys.improvementsLocked ? "locked"
      : sys.broken             ? "broken"
      : !sys.ownerUuid         ? "noOwner"
      : "";

    // Dropdown option list — each option carries all the state the
    // template needs to render availability hints. We DON'T filter
    // here so the player can still see what exists at max; the add
    // action itself validates and refuses when appropriate.
    const currentLevel = sys.level ?? 1;
    ctx.improvementOptions = FLAIL.constructImprovements.map(def => {
      // Per-level and total counts ignore lost entries — a lost
      // improvement doesn't contribute to the "active" purchase count
      // for cap or re-buy purposes.
      const boughtThisLevel = improvementsList.filter(e => e.key === def.key && e.level === currentLevel && !e.lost).length;
      const boughtTotal     = improvementsList.filter(e => e.key === def.key && !e.lost).length;

      // Current value + max-reached check (used for the dropdown label).
      let currentValue = 0;
      let maxReached = false;
      if (def.type === "stat") {
        currentValue = sys[def.statPath] ?? 0;
        maxReached = currentValue >= def.maxValue;
      } else if (def.type === "hp") {
        currentValue = sys.hp?.max ?? 0;
        maxReached = currentValue >= def.maxValue;
      } else if (def.type === "slot") {
        currentValue = (sys.inventorySlots?.unlockedCarried ?? 1)
                     + (sys.inventorySlots?.unlockedStashed ?? 0);
        maxReached = currentValue >= def.maxValue;
      } else if (def.type === "ability") {
        currentValue = !!sys.abilities?.[def.abilityKey];
        maxReached = currentValue;
      }
      return {
        key: def.key,
        label: def.label,
        cost: def.cost,
        currentValue,
        maxValue: def.maxValue,
        maxReached,
        boughtThisLevel,
        boughtTotal,
        atLevelCap: boughtThisLevel >= 2
      };
    });

    // Purchased list — group by key, show count + level breakdown.
    // Lost entries are excluded from this list (their point cost is
    // reported under "sunk" instead).
    const grouped = {};
    for (const entry of improvementsList) {
      if (entry.lost) continue;
      if (!grouped[entry.key]) grouped[entry.key] = { key: entry.key, count: 0, levels: [] };
      grouped[entry.key].count += 1;
      grouped[entry.key].levels.push(entry.level);
    }
    ctx.purchasedImprovements = Object.values(grouped).map(g => {
      const def = FLAIL.constructImprovements.find(d => d.key === g.key);
      const sortedLevels = g.levels.sort((a, b) => a - b);
      return {
        key: g.key,
        label: def?.label ?? g.key,
        cost: def?.cost ?? 0,
        count: g.count,
        totalCost: (def?.cost ?? 0) * g.count,
        levels: sortedLevels,
        firstLevel: sortedLevels[0],
        levelsJoined: sortedLevels.join(", ")
      };
    }).sort((a, b) => {
      // Preserve the rulebook table order.
      const orderA = FLAIL.constructImprovements.findIndex(d => d.key === a.key);
      const orderB = FLAIL.constructImprovements.findIndex(d => d.key === b.key);
      return orderA - orderB;
    });

    return ctx;
  }

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /** @inheritdoc */
  _onRender(context, options) {
    super._onRender?.(context, options);
    const root = this.element;
    if (!root) return;

    // Attach drop handlers to each slot cell. Drag is handled by the
    // built-in ApplicationV2 dragDrop config on ".construct-slot .slot-item".
    root.querySelectorAll(".construct-slot").forEach(el => {
      el.addEventListener("dragover",  this.#onDragOver.bind(this));
      el.addEventListener("dragleave", this.#onDragLeave.bind(this));
      el.addEventListener("drop",      this.#onDrop.bind(this));
    });
    root.querySelectorAll(".construct-slot .slot-item").forEach(el => {
      el.addEventListener("dragstart", this.#onDragStart.bind(this));
    });
  }

  #onDragStart(event) {
    const el = event.currentTarget;
    const slot = el.closest(".construct-slot");
    if (!slot) return;
    const itemId = el.dataset.itemId;
    if (!itemId) return;

    // Standard Foundry drag payload — text/plain JSON with type + uuid
    // so cross-sheet drags work, plus a small flailDrag marker for
    // fast internal-drag detection at the drop end.
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const payload = {
      type: "Item",
      uuid: item.uuid,
      flailDrag: { itemId, fromZone: slot.dataset.zone, fromIndex: Number(slot.dataset.index) }
    };
    event.dataTransfer.setData("text/plain", JSON.stringify(payload));
    event.dataTransfer.effectAllowed = "move";
  }

  #onDragOver(event) {
    event.preventDefault();
    const slot = event.currentTarget;
    if (slot.classList.contains("is-locked")) {
      event.dataTransfer.dropEffect = "none";
      return;
    }
    event.dataTransfer.dropEffect = "move";
    slot.classList.add("drop-hover");
  }

  #onDragLeave(event) {
    event.currentTarget.classList.remove("drop-hover");
  }

  async #onDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    const slot = event.currentTarget;
    slot.classList.remove("drop-hover");
    if (slot.classList.contains("is-locked")) return;

    const zone = slot.dataset.zone;
    const slotIndex = Number(slot.dataset.index);

    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); }
    catch { return; }

    // Resolve the item — either already on this actor (internal
    // drag) or from another actor / compendium (external drop).
    let item = null;
    let isInternal = false;
    if (payload.flailDrag?.itemId) {
      item = this.actor.items.get(payload.flailDrag.itemId);
      isInternal = !!item;
    }
    if (!item && payload.uuid) {
      item = await fromUuid(payload.uuid);
      isInternal = item?.parent?.id === this.actor.id;
    }
    if (!item) return;

    // Check what's currently in the target slot for a swap.
    const currentOccupant = this.actor.items.contents.find(i =>
      i.system?.location === zone && (i.system?.slotIndex ?? 0) === slotIndex
    );

    if (isInternal) {
      // Same slot as source — no-op.
      if (item.system.location === zone && item.system.slotIndex === slotIndex) return;

      const fromZone = item.system.location;
      const fromIndex = item.system.slotIndex ?? 0;

      // Simple case: target empty — just move.
      if (!currentOccupant || currentOccupant.id === item.id) {
        await item.update({
          "system.location": zone,
          "system.slotIndex": slotIndex
        });
        return;
      }

      // Swap — target has something; put that item where our item was.
      await Promise.all([
        item.update({ "system.location": zone, "system.slotIndex": slotIndex }),
        currentOccupant.update({ "system.location": fromZone, "system.slotIndex": fromIndex })
      ]);
      return;
    }

    // External drop — clone the item onto this actor at the target
    // slot. If the target slot is occupied, refuse (don't stomp
    // existing gear). Player can drop into an empty slot or delete
    // the current occupant first.
    if (currentOccupant) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ConstructSlotOccupied"));
      return;
    }
    const itemData = item.toObject();
    delete itemData._id;
    itemData.system = { ...(itemData.system ?? {}), location: zone, slotIndex };
    await this.actor.createEmbeddedDocuments("Item", [itemData]);
  }

  async _onDropItem(event, item) {
    // Foundry's built-in drop handler is called for drops outside our
    // slot cells (e.g. onto the sheet's chrome). Redirect to no-op —
    // constructs only accept drops onto slot cells.
    return;
  }

  /* -------------------------------------------- */
  /*  Actions                                     */
  /* -------------------------------------------- */

  static async #onRollSave(event, target) {
    const actor = this.actor;
    if (actor.system.broken) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ConstructBroken"));
      return;
    }
    const saves = actor.system.saves ?? 0;
    const roll = await new Roll("1d20").evaluate();
    const total = roll.total;
    const outcome = total === 1 ? "Crit"
                  : total === 20 ? "Fumble"
                  : total <= saves ? "Success"
                  : "Fail";
    const flavor = `<strong>${actor.name}</strong> Saves vs ${saves}: <em>${game.i18n.localize(`FLAIL.Save.${outcome}`)}</em> (rolled ${total})`;
    return roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor
    });
  }

  static async #onRollAttack(event, target) {
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const constructTh = this.actor.system.th ?? 0;
    if ((item.system.th ?? 0) > constructTh) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ConstructWeaponTooHeavy"));
      return;
    }
    return this.actor.rollAttack(item);
  }

  /**
   * Fire the construct's inherent attack — uses actor.rollInherentAttack
   * which delegates to rollToHit with the construct's TH and DMG.
   */
  static async #onRollInherentAttack(event, target) {
    // Same click modifiers as weapon attacks — Shift = +1 die,
    // Ctrl/Meta = -1 die. Alt could open a picker later; for now
    // it's ignored.
    const advantage = event.shiftKey ? 1
                    : (event.ctrlKey || event.metaKey) ? -1
                    : 0;
    return this.actor.rollInherentAttack({ advantage });
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

  static async #onAdjustHp(event, target) {
    const delta = Number(target.dataset.delta ?? 0);
    if (!delta) return;
    const cur = this.actor.system.hp?.value ?? 0;
    const max = this.actor.system.hp?.max ?? 0;
    const next = Math.max(0, Math.min(max, cur + delta));
    this.actor.update({ "system.hp.value": next });
  }

  /**
   * Mark one usage tick on an item. If the item is already fully worn,
   * the click clears it back to 0 — matches the character sheet's
   * dot-icon button behaviour so players who learned it there don't
   * have to re-learn on the construct.
   */
  static async #onMarkUsage(event, target) {
    const itemId = target.dataset.itemId ?? target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const max = item.system.usage?.max ?? 0;
    const current = item.system.usage?.value ?? 0;
    if (max > 0 && current >= max) {
      await item.update({ "system.usage.value": 0 });
      return;
    }
    return item.markUsage();
  }

  /**
   * Click-to-toggle usage pip — mirrors the character-sheet flow.
   *   click empty pip N   → set usage.value = N
   *   click filled pip N  → set usage.value = N - 1
   *   click any pip when fully worn → clear to 0
   */
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

  /**
   * Unlock one more carried slot (up to 4). No point-spend
   * enforcement — the sheet trusts the player + GM to track the cost.
   */
  static async #onUnlockCarried(event, target) {
    const cur = this.actor.system.inventorySlots?.unlockedCarried ?? 1;
    if (cur >= MAX_CARRIED) return;
    await this.actor.update({ "system.inventorySlots.unlockedCarried": cur + 1 });
  }

  /**
   * Unlock one more stashed slot (up to 6). Refuses if any carried
   * slots are still locked — the rulebook says carried unlocks first.
   */
  static async #onUnlockStashed(event, target) {
    const carriedCur = this.actor.system.inventorySlots?.unlockedCarried ?? 1;
    if (carriedCur < MAX_CARRIED) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ConstructCarriedFirst"));
      return;
    }
    const cur = this.actor.system.inventorySlots?.unlockedStashed ?? 0;
    if (cur >= MAX_STASHED) return;
    await this.actor.update({ "system.inventorySlots.unlockedStashed": cur + 1 });
  }

  /**
   * Switch tabs. CSS reads the sheet root's `data-active-tab` to
   * choose which panel is visible, so a pure visibility flip is
   * cheaper than re-rendering.
   */
  static async #onSelectTab(event, target) {
    const tab = target.dataset.tab;
    if (!tab) return;
    this._activeTab = tab;

    const root = this.element?.querySelector(".construct-sheet");
    if (!root) return;
    root.dataset.activeTab = tab;
    for (const btn of root.querySelectorAll(".construct-tabs-nav .tab-btn")) {
      btn.classList.toggle("is-active", btn.dataset.tab === tab);
    }
  }

  /* -------------------------------------------- */
  /*  Improvements                                */
  /* -------------------------------------------- */

  /** Toggle the improvements tab lock. Persists on the actor. */
  static async #onToggleImprovementLock(event, target) {
    const cur = !!this.actor.system.improvementsLocked;
    await this.actor.update({ "system.improvementsLocked": !cur });
  }

  /**
   * Add an improvement of the type selected in the tab's dropdown.
   * Validates all constraints (lock state, points, per-level cap,
   * max value) and refuses with a specific warning on failure.
   */
  static async #onAddImprovement(event, target) {
    const actor = this.actor;
    if (actor.system.improvementsLocked) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ImprovementLocked"));
      return;
    }
    const key = this.#getImprovementSelection();
    if (!key) return;

    const def = FLAIL.constructImprovements.find(d => d.key === key);
    if (!def) return;

    const sys = actor.system;
    const currentLevel = sys.level ?? 1;
    const improvements = [...(sys.improvements ?? [])];

    // Points available?
    const totalPoints = currentLevel * 5;
    const spent = improvements.reduce((sum, e) => {
      const d = FLAIL.constructImprovements.find(x => x.key === e.key);
      return sum + (d?.cost ?? 0);
    }, 0);
    if (spent + def.cost > totalPoints) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ImprovementNotEnoughPoints"));
      return;
    }

    // Max 2 per key per level (ignoring lost entries — a lost
    // improvement at this level doesn't consume a slot in the cap).
    const atThisLevel = improvements.filter(e => e.key === key && e.level === currentLevel && !e.lost).length;
    if (atThisLevel >= 2) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ImprovementMaxPerLevel"));
      return;
    }

    // Compute the state-effect + max-cap check together.
    const update = {};
    if (def.type === "stat") {
      const cur = sys[def.statPath] ?? 0;
      if (cur + def.perPurchase > def.maxValue) {
        ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ImprovementAtMax"));
        return;
      }
      update[`system.${def.statPath}`] = cur + def.perPurchase;
    } else if (def.type === "hp") {
      const curMax = sys.hp?.max ?? 0;
      const curVal = sys.hp?.value ?? 0;
      if (curMax + def.perPurchase > def.maxValue) {
        ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ImprovementAtMax"));
        return;
      }
      // Bump max and heal current by the same amount — the construct
      // is being physically improved, so bringing it to full seems
      // appropriate.
      update["system.hp.max"]   = curMax + def.perPurchase;
      update["system.hp.value"] = curVal + def.perPurchase;
    } else if (def.type === "slot") {
      const curCarried = sys.inventorySlots?.unlockedCarried ?? 1;
      const curStashed = sys.inventorySlots?.unlockedStashed ?? 0;
      const total = curCarried + curStashed;
      if (total >= def.maxValue) {
        ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ImprovementAtMax"));
        return;
      }
      // Carried unlocks first (up to 4), then stashed.
      if (curCarried < 4) {
        update["system.inventorySlots.unlockedCarried"] = curCarried + 1;
      } else {
        update["system.inventorySlots.unlockedStashed"] = curStashed + 1;
      }
    } else if (def.type === "ability") {
      if (sys.abilities?.[def.abilityKey]) {
        ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ImprovementAlreadyOwned"));
        return;
      }
      update[`system.abilities.${def.abilityKey}`] = true;
    }

    // Record the purchase.
    improvements.push({ key, level: currentLevel });
    update["system.improvements"] = improvements;

    await actor.update(update);
  }

  /**
   * Remove the most recently added instance of the improvement
   * selected in the dropdown. Refuses if none exist.
   */
  static async #onRemoveImprovement(event, target) {
    const actor = this.actor;
    if (actor.system.improvementsLocked) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ImprovementLocked"));
      return;
    }
    const key = this.#getImprovementSelection();
    if (!key) return;

    const def = FLAIL.constructImprovements.find(d => d.key === key);
    if (!def) return;

    const improvements = [...(actor.system.improvements ?? [])];

    // Find the most recent active (non-lost) instance of this key.
    let idx = -1;
    for (let i = improvements.length - 1; i >= 0; i--) {
      if (improvements[i].key === key && !improvements[i].lost) { idx = i; break; }
    }
    if (idx === -1) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ImprovementNoInstance"));
      return;
    }

    // In reassemble mode, each removal costs 100 coins from the
    // linked Tinkerer's wallet. Refuse if there aren't enough coins,
    // and don't touch state at all if we can't afford it.
    const inReassemble = !!actor.system.reassembleMode;
    let owner = null;
    if (inReassemble) {
      owner = actor.system.ownerUuid ? fromUuidSync?.(actor.system.ownerUuid) : null;
      if (!owner) {
        ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ReassembleNoOwner"));
        return;
      }
      const ownerCoins = owner.system?.coins ?? 0;
      if (ownerCoins < 100) {
        ui.notifications?.warn(game.i18n.format("FLAIL.Notify.ReassembleNoCoins", {
          owner: owner.name, have: ownerCoins
        }));
        return;
      }
    }

    // Reverse the effect.
    const update = {};
    const sys = actor.system;
    if (def.type === "stat") {
      const cur = sys[def.statPath] ?? 0;
      update[`system.${def.statPath}`] = Math.max(0, cur - def.perPurchase);
    } else if (def.type === "hp") {
      const curMax = sys.hp?.max ?? 0;
      const curVal = sys.hp?.value ?? 0;
      const newMax = Math.max(0, curMax - def.perPurchase);
      update["system.hp.max"]   = newMax;
      update["system.hp.value"] = Math.min(curVal, newMax);
    } else if (def.type === "slot") {
      const curCarried = sys.inventorySlots?.unlockedCarried ?? 1;
      const curStashed = sys.inventorySlots?.unlockedStashed ?? 0;
      // Reverse the unlock order: stashed drops first, then carried.
      if (curStashed > 0) {
        update["system.inventorySlots.unlockedStashed"] = curStashed - 1;
      } else if (curCarried > 1) {
        update["system.inventorySlots.unlockedCarried"] = curCarried - 1;
      }
    } else if (def.type === "ability") {
      update[`system.abilities.${def.abilityKey}`] = false;
    }

    improvements.splice(idx, 1);
    update["system.improvements"] = improvements;

    await actor.update(update);

    // Reassemble mode — deduct 100 coins from the linked Tinkerer.
    // The affordability check earlier guarantees enough coins remain.
    if (inReassemble && owner) {
      const ownerCoins = owner.system?.coins ?? 0;
      await owner.update({ "system.coins": Math.max(0, ownerCoins - 100) });
    }
  }

  /**
   * Read the currently-selected improvement key from the tab's
   * dropdown. Returns null if the dropdown isn't found.
   */
  #getImprovementSelection() {
    const root = this.element;
    if (!root) return null;
    const sel = root.querySelector('select[name="improvement-picker"]');
    return sel?.value || null;
  }

  /* -------------------------------------------- */
  /*  Owner linkage                               */
  /* -------------------------------------------- */

  /** Set the construct's owner to whichever Tinkerer is selected in
   *  the sketch card's dropdown. */
  static async #onSetOwner(event, target) {
    const root = this.element;
    if (!root) return;
    const sel = root.querySelector('select[name="owner-picker"]');
    const uuid = sel?.value ?? "";
    if (!uuid) return;
    await this.actor.update({ "system.ownerUuid": uuid });
  }

  /** Clear the construct's owner. */
  static async #onClearOwner(event, target) {
    await this.actor.update({ "system.ownerUuid": "" });
  }

  /* -------------------------------------------- */
  /*  Reassemble                                  */
  /* -------------------------------------------- */

  /**
   * Begin a reassemble session. Rulebook p.34:
   *   "A Tinkerer can drop one construction point permanently to
   *    reshape their construct entirely. Each point moved to another
   *    improvement costs 100 coins in spare parts and components."
   *
   * We implement this as a session toggle: click Reassemble to enter
   * mode → confirmation dialog → on confirm, 1 point is deducted from
   * the permanent-loss counter (dropping the pool ceiling by 1 for
   * the rest of the construct's life) and `system.reassembleMode` is
   * set to true. While in mode, every removal costs 100 coins.
   * Finish Reassemble exits the mode.
   */
  static async #onStartReassemble(event, target) {
    const actor = this.actor;
    if (actor.system.improvementsLocked) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ReassembleLocked"));
      return;
    }
    if (actor.system.broken) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ReassembleBroken"));
      return;
    }
    const owner = actor.system.ownerUuid ? fromUuidSync?.(actor.system.ownerUuid) : null;
    if (!owner) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ReassembleNoOwner"));
      return;
    }
    if (actor.system.reassembleMode) return;   // already in mode

    // Confirmation dialog.
    const confirmed = await foundry.applications.api.DialogV2.confirm({
      window: { title: game.i18n.localize("FLAIL.Construct.ReassembleTitle"), icon: "fas fa-screwdriver-wrench" },
      content: `<p>${game.i18n.format("FLAIL.Construct.ReassembleConfirm", {
        name: actor.name,
        owner: owner.name,
        coins: owner.system?.coins ?? 0
      })}</p>`,
      rejectClose: false,
      yes: { label: game.i18n.localize("FLAIL.Construct.ReassembleConfirmYes"), icon: "fas fa-check" },
      no:  { label: game.i18n.localize("FLAIL.Common.Cancel"), icon: "fas fa-times" }
    });
    if (!confirmed) return;

    // Commit the 1-point permanent tax + enter mode.
    const prevLost = actor.system.permanentPointsLost ?? 0;
    await actor.update({
      "system.permanentPointsLost": prevLost + 1,
      "system.reassembleMode": true
    });

    // Chat card announcing the reassembly.
    const content = `
      <div class="flail-chat-card construct-reassemble-card">
        <header class="flail-chat-header">
          <i class="fas fa-screwdriver-wrench"></i>
          <span>${game.i18n.format("FLAIL.Construct.ReassembleCardTitle", { name: actor.name })}</span>
        </header>
        <div class="flail-chat-body">
          <p>${game.i18n.format("FLAIL.Construct.ReassembleCardBody", { owner: owner.name })}</p>
        </div>
      </div>
    `;
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content
    });
  }

  /** Exit reassemble mode. No confirmation — this is just a flag flip. */
  static async #onFinishReassemble(event, target) {
    if (!this.actor.system.reassembleMode) return;
    await this.actor.update({ "system.reassembleMode": false });
  }

  /* -------------------------------------------- */
  /*  Break Down & Rebuild                        */
  /* -------------------------------------------- */

  /**
   * Manual Break Down trigger. Fires when the player clicks the
   * Break Down button (either because HP is at 0 and the auto-prompt
   * was dismissed, or via GM intervention). Opens the improvement-
   * loss picker and commits `system.broken = true`.
   */
  static async #onBreakDown(event, target) {
    return FlailConstructSheet.breakDownConstruct(this.actor);
  }

  /**
   * Public static so the updateActor hook can call it too when HP
   * hits 0 automatically. Prompts the player to pick an improvement
   * to lose (if any exist), commits the removal, and sets broken=true.
   */
  static async breakDownConstruct(actor) {
    if (actor.type !== "construct") return;
    if (actor.system.broken) return;   // already broken

    const improvements = [...(actor.system.improvements ?? [])];
    const activeImprovements = improvements.filter(e => !e.lost);

    // If the construct has any active improvements, prompt for which
    // one to lose. If none, just mark broken with no picker.
    let lostImprovement = null;
    if (activeImprovements.length > 0) {
      const chosen = await FlailConstructSheet.#promptImprovementLoss(actor, activeImprovements);
      if (chosen === null) return;   // player cancelled — don't break yet
      lostImprovement = chosen;
    }

    // Compute the state effect + prepare the update.
    const update = { "system.broken": true };
    const sys = actor.system;

    if (lostImprovement) {
      const def = FLAIL.constructImprovements.find(d => d.key === lostImprovement.key);
      if (def) {
        if (def.type === "stat") {
          const cur = sys[def.statPath] ?? 0;
          update[`system.${def.statPath}`] = Math.max(0, cur - def.perPurchase);
        } else if (def.type === "hp") {
          const curMax = sys.hp?.max ?? 0;
          const curVal = sys.hp?.value ?? 0;
          const newMax = Math.max(0, curMax - def.perPurchase);
          update["system.hp.max"]   = newMax;
          update["system.hp.value"] = Math.min(curVal, newMax);
        } else if (def.type === "slot") {
          const curCarried = sys.inventorySlots?.unlockedCarried ?? 1;
          const curStashed = sys.inventorySlots?.unlockedStashed ?? 0;
          if (curStashed > 0) {
            update["system.inventorySlots.unlockedStashed"] = curStashed - 1;
          } else if (curCarried > 1) {
            update["system.inventorySlots.unlockedCarried"] = curCarried - 1;
          }
        } else if (def.type === "ability") {
          update[`system.abilities.${def.abilityKey}`] = false;
        }
        // Mark the chosen improvement instance as LOST (not removed).
        // Its effect is reversed above, but the entry stays in the
        // ledger so its point cost remains counted as spent — the
        // Tinkerer can't reclaim those points. Match by key+level+
        // not-yet-lost (first hit), so duplicates purchased at the
        // same level are handled deterministically.
        for (let i = 0; i < improvements.length; i++) {
          if (improvements[i].key === lostImprovement.key
              && improvements[i].level === lostImprovement.level
              && !improvements[i].lost) {
            improvements[i] = { ...improvements[i], lost: true };
            break;
          }
        }
        update["system.improvements"] = improvements;
      }
    }

    await actor.update(update);

    // Announce to chat.
    const label = lostImprovement
      ? (FLAIL.constructImprovements.find(d => d.key === lostImprovement.key)?.label ?? lostImprovement.key)
      : null;
    const content = `
      <div class="flail-chat-card construct-broken-card">
        <header class="flail-chat-header">
          <i class="fas fa-triangle-exclamation"></i>
          <span>${game.i18n.format("FLAIL.Construct.BrokenTitle", { name: actor.name })}</span>
        </header>
        <div class="flail-chat-body">
          ${label
            ? `<p>${game.i18n.format("FLAIL.Construct.BrokenLostImprovement", { improvement: label })}</p>`
            : `<p>${game.i18n.localize("FLAIL.Construct.BrokenNoImprovements")}</p>`
          }
          <p class="broken-rebuild-hint">${game.i18n.format("FLAIL.Construct.BrokenRebuildHint", {
            days: actor.system.hp?.max ?? 0,
            coins: (actor.system.hp?.max ?? 0) * 100
          })}</p>
        </div>
      </div>
    `;
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content
    });
  }

  /**
   * Rebuild — deducts (max HP × 100) coins from the linked Tinkerer,
   * restores HP to full, clears the broken flag. Refuses without a
   * linked owner or if the owner doesn't have enough coins.
   */
  static async #onRebuild(event, target) {
    const actor = this.actor;
    if (!actor.system.broken) return;

    const owner = actor.system.ownerUuid ? fromUuidSync?.(actor.system.ownerUuid) : null;
    if (!owner) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.RebuildNoOwner"));
      return;
    }
    const maxHp = actor.system.hp?.max ?? 0;
    const cost = maxHp * 100;
    const ownerCoins = owner.system?.coins ?? 0;
    if (ownerCoins < cost) {
      ui.notifications?.warn(game.i18n.format("FLAIL.Notify.RebuildNoCoins", {
        needed: cost, have: ownerCoins, owner: owner.name
      }));
      return;
    }

    // Deduct coins from Tinkerer + restore construct.
    await owner.update({ "system.coins": ownerCoins - cost });
    await actor.update({
      "system.broken": false,
      "system.hp.value": maxHp
    });

    // Chat card.
    const content = `
      <div class="flail-chat-card construct-rebuilt-card">
        <header class="flail-chat-header">
          <i class="fas fa-tools"></i>
          <span>${game.i18n.format("FLAIL.Construct.RebuildTitle", { name: actor.name })}</span>
        </header>
        <div class="flail-chat-body">
          <p>${game.i18n.format("FLAIL.Construct.RebuildBody", {
            days: maxHp,
            coins: cost,
            owner: owner.name,
            hp: maxHp
          })}</p>
        </div>
      </div>
    `;
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content
    });
  }

  /**
   * Prompt the player to pick which improvement to lose. Returns
   * the selected `{ key, level }` entry or null on cancel.
   */
  static async #promptImprovementLoss(actor, improvements) {
    const opts = improvements.map((entry, idx) => {
      const def = FLAIL.constructImprovements.find(d => d.key === entry.key);
      const label = def?.label ?? entry.key;
      return `<option value="${idx}">${label} (Level ${entry.level})</option>`;
    }).join("");
    const content = `
      <form class="flail-modifier-form">
        <p class="flail-modifier-prompt">${game.i18n.format("FLAIL.Construct.BreakDownPrompt", { name: actor.name })}</p>
        <div class="form-group">
          <label>${game.i18n.localize("FLAIL.Construct.BreakDownPickLabel")}:</label>
          <select name="lossIdx">${opts}</select>
        </div>
        <p class="flail-modifier-hint">${game.i18n.localize("FLAIL.Construct.BreakDownHint")}</p>
      </form>
    `;
    const chosen = await foundry.applications.api.DialogV2.wait({
      window: { title: game.i18n.localize("FLAIL.Construct.BreakDownTitle"), icon: "fas fa-triangle-exclamation" },
      content,
      buttons: [
        { action: "ok",     label: game.i18n.localize("FLAIL.Construct.BreakDownConfirm"), default: true, icon: "fas fa-heart-broken",
          callback: (event, btn, dialog) => Number(dialog.element.querySelector("select").value) },
        { action: "cancel", label: game.i18n.localize("FLAIL.Construct.BreakDownDefer"), icon: "fas fa-clock",
          callback: () => null }
      ],
      rejectClose: false,
      submit: v => v
    });
    if (chosen === null || chosen === undefined) return null;
    return improvements[chosen] ?? null;
  }
}

