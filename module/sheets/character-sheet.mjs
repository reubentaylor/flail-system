import { FLAIL } from "../helpers/config.mjs";
import { rollDarkSpell } from "../dice/cast-dark-spell.mjs";
import { rollWizardSpell } from "../dice/cast-wizard-spell.mjs";
import { releaseDamageGadget } from "../dice/use-damage-gadget.mjs";
import { rollPrayer } from "../dice/cast-prayer.mjs";
import { rollLayOnHands } from "../dice/lay-on-hands.mjs";
import { rollMiracleCall } from "../dice/miracle-call.mjs";
import { resolveRest } from "../dice/rest.mjs";
import { WIZARD_SPELLS } from "../setup/wizard-spells-data.mjs";

const { ActorSheetV2 } = foundry.applications.sheets;
const { HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Tabbed character sheet — three panels: Abilities (skills + attributes +
 * vitals), Inventory (the 4×4 inventory grid + legend + items + conditions
 * + loose tray), and Class (per-class extras + biography). The banner stays
 * pinned above the tab nav. Active tab is tracked on the sheet instance and
 * mirrored to the root element's `data-active-tab` so CSS handles visibility
 * without a re-render.
 */
export class FlailCharacterSheet extends HandlebarsApplicationMixin(ActorSheetV2) {

  /** Currently visible tab. Persists across re-renders for the lifetime of the sheet. */
  _activeTab = "abilities";

  /**
   * Active tab within the Cutthroat talents card — "current" shows
   * selected talents (with click-to-roll + remove), "add" shows
   * available talents (with add button). Persisted across re-renders
   * so adding/removing a talent doesn't snap back to the default tab.
   */
  _activeTalentTab = "current";

  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    classes: ["flail", "sheet", "actor", "character"],
    position: { width: 820, height: 920 },
    window: { resizable: true, contentClasses: ["flail-character"] },
    actions: {
      rollSave:        FlailCharacterSheet.#onRollSave,
      rollAttack:      FlailCharacterSheet.#onRollAttack,
      rollIronFistAttack: FlailCharacterSheet.#onRollIronFistAttack,
      toggleWeathered: FlailCharacterSheet.#onToggleWeathered,
      toggleWizardMasterLock: FlailCharacterSheet.#onToggleWizardMasterLock,
      readMagic:              FlailCharacterSheet.#onReadMagic,
      rollInstrument:  FlailCharacterSheet.#onRollInstrument,
      resetInstrumentUsedOut: FlailCharacterSheet.#onResetInstrumentUsedOut,
      castDarkSpell:   FlailCharacterSheet.#onCastDarkSpell,
      castWizardSpell: FlailCharacterSheet.#onCastWizardSpell,
      useDamageGadget: FlailCharacterSheet.#onUseDamageGadget,
      editPortrait:    FlailCharacterSheet.#onEditPortrait,
      toggleJoatUsed:  FlailCharacterSheet.#onToggleJoatUsed,
      castJoatSpell:   FlailCharacterSheet.#onCastJoatSpell,
      castPrayer:      FlailCharacterSheet.#onCastPrayer,
      layOnHands:      FlailCharacterSheet.#onLayOnHands,
      miracleCall:     FlailCharacterSheet.#onMiracleCall,
      resetMiracleCall: FlailCharacterSheet.#onResetMiracleCall,
      restShort:       FlailCharacterSheet.#onRestShort,
      restLong:        FlailCharacterSheet.#onRestLong,
      restFull:        FlailCharacterSheet.#onRestFull,
      adjustGuildTokens: FlailCharacterSheet.#onAdjustGuildTokens,
      spendGuildToken:   FlailCharacterSheet.#onSpendGuildToken,
      resetGuildTokens:  FlailCharacterSheet.#onResetGuildTokens,
      rollTalent:        FlailCharacterSheet.#onRollTalent,
      addTalent:         FlailCharacterSheet.#onAddTalent,
      removeTalent:      FlailCharacterSheet.#onRemoveTalent,
      switchTalentTab:   FlailCharacterSheet.#onSwitchTalentTab,
      activateGift:      FlailCharacterSheet.#onActivateGift,
      shapeshiftStart:   FlailCharacterSheet.#onShapeshiftStart,
      shapeshiftRevert:  FlailCharacterSheet.#onShapeshiftRevert,
      repairItem:        FlailCharacterSheet.#onRepairItem,
      quickCraft:        FlailCharacterSheet.#onQuickCraft,
      fixConstruct:      FlailCharacterSheet.#onFixConstruct,
      spendGuildAction:  FlailCharacterSheet.#onSpendGuildAction,
      removeGuild:       FlailCharacterSheet.#onRemoveGuild,
      itemEdit:        FlailCharacterSheet.#onItemEdit,
      itemDelete:      FlailCharacterSheet.#onItemDelete,
      itemCreate:      FlailCharacterSheet.#onItemCreate,
      itemToChat:      FlailCharacterSheet.#onItemToChat,
      markUsage:       FlailCharacterSheet.#onMarkUsage,
      toggleUsagePip:  FlailCharacterSheet.#onToggleUsagePip,
      clearUsage:      FlailCharacterSheet.#onClearUsage,
      adjustHp:        FlailCharacterSheet.#onAdjustHp,
      adjustResource:  FlailCharacterSheet.#onAdjustResource,
      selectTab:       FlailCharacterSheet.#onSelectTab
    },
    form: {
      submitOnChange: true,
      closeOnSubmit: false
    },
    dragDrop: [{ dragSelector: ".item-row, .slot-item, .feature-row", dropSelector: ".inventory-zone, .item-list" }]
  };

  /** @inheritdoc */
  static PARTS = {
    banner:         { template: "systems/flail/templates/actor/parts/banner.hbs" },
    tabsNav:        { template: "systems/flail/templates/actor/parts/tabs-nav.hbs" },
    abilitiesPanel: { template: "systems/flail/templates/actor/parts/abilities-panel.hbs" },
    inventoryPanel: { template: "systems/flail/templates/actor/parts/inventory-panel.hbs" },
    classPanel:     { template: "systems/flail/templates/actor/parts/class-panel.hbs" },
    notesPanel:     { template: "systems/flail/templates/actor/parts/notes-panel.hbs" }
  };

  /* -------------------------------------------- */
  /*  Context preparation                          */
  /* -------------------------------------------- */

  /** @inheritdoc */
  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    const actor = this.actor;
    const sys = actor.system;

    ctx.actor = actor;
    ctx.system = sys;
    ctx.config = FLAIL;
    ctx.editable = this.isEditable;

    // Class metadata — drives banner, special skills, class extras.
    const classKey = sys.class ?? "warrior";
    const classDef = FLAIL.classes[classKey] ?? FLAIL.classes.warrior;
    ctx.classKey = classKey;
    ctx.classLabel = game.i18n.localize(classDef.label);
    ctx.specialSkills = classDef.specialSkills ?? [];

    // Class-details panel — fundamentals (max HP, weapon specialty, main
    // item, armour proficiency, starting gear) sourced from the rules PDF.
    // Lang keys are PascalCase (Bard / BoneWhisperer); the actor-side class
    // keys are camelCase (bard / boneWhisperer), so map across.
    const classDetailsKey = classKey.charAt(0).toUpperCase() + classKey.slice(1);
    const detailsBase = `FLAIL.ClassDetails.${classDetailsKey}`;
    const labelBase   = "FLAIL.ClassDetails.Labels";
    ctx.classDetails = [
      { label: game.i18n.localize(`${labelBase}.MaxHp`),      value: game.i18n.localize(`${detailsBase}.MaxHp`) },
      { label: game.i18n.localize(`${labelBase}.WeaponSpec`), value: game.i18n.localize(`${detailsBase}.WeaponSpec`) },
      { label: game.i18n.localize(`${labelBase}.MainItem`),   value: game.i18n.localize(`${detailsBase}.MainItem`) },
      { label: game.i18n.localize(`${labelBase}.Armour`),     value: game.i18n.localize(`${detailsBase}.Armour`) },
      { label: game.i18n.localize(`${labelBase}.Gear`),       value: game.i18n.localize(`${detailsBase}.Gear`) }
    ];

    // Background dropdown — entries from the class's Instant Backstory table.
    // If the stored key doesn't match any current option (e.g. class was
    // changed), the dropdown shows the placeholder, the stored value is
    // preserved, and the perk line is hidden.
    const bgList = FLAIL.backgrounds?.[classKey] ?? [];
    const bgKey = sys.background ?? "";
    ctx.backgroundOptions = bgList.map(b => ({
      key: b.key,
      label: b.label,
      selected: b.key === bgKey
    }));
    const currentBg = bgList.find(b => b.key === bgKey);
    ctx.currentBackgroundLabel = currentBg?.label ?? "";
    ctx.currentBackgroundPerk = currentBg?.perk ?? "";

    // Attributes — list form for handlebars iteration.
    ctx.attributeList = FLAIL.attributeKeys.map(key => {
      const attr = sys.attributes[key];
      return {
        key,
        label: game.i18n.localize(FLAIL.attributes[key].label),
        abbr:  game.i18n.localize(FLAIL.attributes[key].abbr),
        base: attr.base,
        current: attr.current,
        modified: attr.current !== attr.base
      };
    });

    // Inventory grid.
    ctx.inventory = this.#prepareInventory(actor);

    // Items grouped by purpose for the bottom panels.
    ctx.items = {
      features:    actor.items.filter(i => i.type === "feature"),
      talents:     actor.items.filter(i => i.type === "talent"),
      gadgets:     actor.items.filter(i => i.type === "gadget"),
      gifts:       actor.items.filter(i => i.type === "gift"),
      spells:      actor.items.filter(i => i.type === "spell"),
      prayers:     actor.items.filter(i => i.type === "prayer"),
      instruments: actor.items.filter(i => i.type === "instrument"),
      conditions:  actor.items.filter(i => i.type === "condition")
    };

    // Quick-attack list mirrors the inventory-slot rule: only weapons in
    // hands (off-hand / main hand) can be attacked with. Stowed weapons
    // need to be dragged into a hand slot first.
    //
    // While shapeshifted, the Druid can only attack with the beast's
    // natural weapons — anything the human form was carrying is
    // greyed out (still visible on the sheet, but the click handler
    // refuses to fire). Beast attacks sort to the top so the usable
    // options are always closest to hand in the panel.
    const isShifted = !!sys.shapeshift?.active;
    ctx.equippedWeapons = actor.items
      .filter(i => i.type === "weapon" && i.system.location === "hands")
      .map(w => {
        const isBeastAttack = !!w.getFlag("flail", "beastAttack");
        return {
          id: w.id,
          name: w.name,
          img: w.img,
          system: w.system,
          isBeastAttack,
          disabled: isShifted && !isBeastAttack
        };
      })
      .sort((a, b) => {
        // Beast attacks first while shifted; otherwise leave as-is.
        if (isShifted) {
          if (a.disabled && !b.disabled) return 1;
          if (!a.disabled && b.disabled) return -1;
        }
        return 0;
      });

    // Loose / unequipped items list.
    ctx.looseItems = actor.items.filter(i => i.system?.location === "unequipped");

    // Warrior — Iron Fist stats (null when Martial Artist Basic isn't
    // picked). Quick-attacks template renders a synthetic weapon row
    // for it when this is non-null.
    ctx.ironFist = actor.getIronFistStats?.() ?? null;

    // Quick-attacks card visibility — show if there's at least one
    // equipped weapon OR the character has Iron Fist unlocked.
    ctx.showQuickAttacksCard = ctx.equippedWeapons.length > 0 || !!ctx.ironFist;

    // Armour proficiency check. A character with worn armour whose
    // `armourType` is NOT in the class's proficient list gets a
    // banner on the Abilities tab reminding the player they should
    // roll physical tasks with disadvantage. Only body-armour types
    // (basic / light / heavy) are checked — shields and helmets are
    // out of scope. The check is a visual reminder only; no roll
    // adjustments happen automatically per the intended design.
    //
    // Cleric is a special case: their proficiency depends on the
    // religion they follow (Brotherhood = none, Crusade / Shadow
    // Demon = all armour). When the class is `cleric`, defer to
    // `FLAIL.religions[religion].armourTypes` if present. Wizards
    // and Druids always resolve to the empty class list — no
    // religion fallback for them per the intended design.
    const bodyArmourTypes = new Set(["basic", "light", "heavy"]);
    let classProfList = FLAIL.classes[actor.system.class]?.armour ?? [];
    if (actor.system.class === "cleric") {
      const religionKey = actor.system.classOptions?.religion;
      const religion = FLAIL.religions?.[religionKey];
      if (religion?.armourTypes) {
        classProfList = religion.armourTypes;
      }
    }
    const classProficiency = new Set(classProfList);
    const wornZones = new Set(["body", "adornment"]);
    const nonProficientArmour = actor.items.filter(i => {
      if (i.type !== "armour") return false;
      if (!wornZones.has(i.system?.location)) return false;
      const at = i.system?.armourType;
      if (!bodyArmourTypes.has(at)) return false;   // shields/helmets skip
      return !classProficiency.has(at);
    });
    ctx.armourProficiencyViolated = nonProficientArmour.length > 0;
    ctx.armourProficiencyViolators = nonProficientArmour.map(i => ({
      id: i.id, name: i.name, img: i.img,
      armourType: i.system.armourType,
      armourTypeLabel: game.i18n.localize(
        FLAIL.armourTypes[i.system.armourType]?.label ?? i.system.armourType
      )
    }));

    // Reputation dropdown options (-6 to +6).
    ctx.reputationOptions = Array.from({ length: 13 }, (_, i) => {
      const v = i - 6;
      return {
        value: v,
        display: v > 0 ? `+${v}` : String(v),
        selected: v === sys.reputation
      };
    });

    // Tab nav data — the nav partial iterates these and marks the active one.
    ctx.activeTab = this._activeTab;
    ctx.tabs = [
      { id: "abilities", label: "FLAIL.Tab.Abilities", active: this._activeTab === "abilities" },
      { id: "inventory", label: "FLAIL.Tab.Inventory", active: this._activeTab === "inventory" },
      { id: "class",     label: "FLAIL.Tab.Class",     active: this._activeTab === "class"     },
      { id: "notes",     label: "FLAIL.Tab.Notes",     active: this._activeTab === "notes"     }
    ];

    // Resource label (depends on class).
    const resKey = classDef.resource;
    ctx.resourceVisible = !!resKey;
    ctx.resourceLabel = resKey
      ? game.i18n.localize(`FLAIL.Resource.${resKey.charAt(0).toUpperCase()}${resKey.slice(1)}`)
      : "";

    // Class-extras flags so the template can branch.
    ctx.isWarrior  = classKey === "warrior";
    ctx.isWizard   = classKey === "wizard";
    ctx.isCleric   = classKey === "cleric";
    ctx.isCutthroat = classKey === "cutthroat";
    ctx.isBard     = classKey === "bard";
    ctx.isBoneWhisperer = classKey === "boneWhisperer";
    ctx.isDruid    = classKey === "druid";
    ctx.isTinkerer = classKey === "tinkerer";

    // Tracker card top-right of Special Skills:
    //   Bone Whisperer → Spirit (d20)
    //   Cleric         → Fumble Range (d20)
    //   Druid          → Animal Companion text fields
    //   Wizard         → Mana (d20)
    // Bard / Cutthroat / Tinkerer / Warrior show no tracker; Special Skills card spans full width.
    ctx.hasTracker = ctx.isBoneWhisperer || ctx.isCleric || ctx.isDruid || ctx.isWizard || ctx.isCutthroat;

    // Combat Talents (Warrior). Build per-slot context including:
    //   - the currently-picked key + its display metadata (for the
    //     description panel below the dropdown)
    //   - a nested option list grouped by tree, each entry flagged
    //     with `available` per the slot's position in the sequence
    //     (prerequisites must be met by picks in EARLIER slots).
    //   - a `beyondCurrentLevel` flag — slots whose level exceeds
    //     the character's current level are greyed and disabled in
    //     the sheet so a level-3 Warrior can't reach ahead into
    //     level-4 or level-5 slots.
    const rawTalents = sys.combatTalents ?? ["", "", "", "", ""];
    const charLevel = sys.level ?? 1;
    ctx.combatTalents = rawTalents.map((currentKey, i) => {
      const level = i + 1;
      const beyondCurrentLevel = level > charLevel;
      // Picks in prior slots (used to test prerequisites for THIS slot's
      // options). Slot 1 has no priors — only Basics are ever valid.
      const priorPicks = rawTalents.slice(0, i).filter(Boolean);
      // Picks in ALL other slots — used to block duplicates.
      const otherPicks = rawTalents.filter((k, idx) => idx !== i && k);

      const availabilityOf = (key, tier) => {
        // Already picked in another slot → block regardless of tier.
        if (otherPicks.includes(key)) return false;
        // Slot 1 → only Basics ever qualify.
        if (level === 1) return tier === "basic";
        // Basic: any tree, so long as this tree's Basic isn't already
        // picked in a prior slot. (Duplicate check above covers all
        // other slots; here we specifically ensure it's not upstream.)
        if (tier === "basic") return !priorPicks.includes(key);
        // Expert: this tree's Basic must be in a prior slot.
        if (tier === "expert") {
          const info = FLAIL.getCombatTalent(key);
          return !!info && priorPicks.includes(info.tree.basic.key);
        }
        // Master: the parent Expert must be in a prior slot.
        if (tier === "master") {
          const info = FLAIL.getCombatTalent(key);
          return !!info && priorPicks.includes(info.parent.key);
        }
        return false;
      };

      const trees = FLAIL.combatTalents.trees.map(tree => ({
        key: tree.key,
        label: tree.label,
        hint: tree.hint,
        entries: [
          // Basic
          {
            key: tree.basic.key,
            label: `Basic — ${tree.basic.label}`,
            tier: "basic",
            available: availabilityOf(tree.basic.key, "basic"),
            current: tree.basic.key === currentKey
          },
          // Experts + their Masters, alternating so the tree is
          // visually flat in the dropdown but reads top-to-bottom.
          ...tree.experts.flatMap(expert => [
            {
              key: expert.key,
              label: `Expert — ${expert.label}`,
              tier: "expert",
              available: availabilityOf(expert.key, "expert"),
              current: expert.key === currentKey
            },
            ...expert.masters.map(master => ({
              key: master.key,
              label: `Master — ${master.label}`,
              tier: "master",
              available: availabilityOf(master.key, "master"),
              current: master.key === currentKey
            }))
          ])
        ]
      }));

      const info = currentKey ? FLAIL.getCombatTalent(currentKey) : null;
      const currentDisplay = info ? {
        label: info.talent.label,
        tree: info.tree.label,
        tier: info.tier,
        desc: info.talent.desc,
        // If the current pick is somehow invalid at this slot's
        // position (e.g. the player reshuffled level order), surface
        // that so the sheet can warn without silently ignoring it.
        invalid: !availabilityOf(currentKey, info.tier)
      } : null;

      return {
        level,
        current: currentKey,
        currentDisplay,
        trees,
        beyondCurrentLevel
      };
    });

    // Wizard spellbook — 15 numbered entries.
    ctx.spellbookEntries = (sys.spellbook ?? Array(15).fill("")).map((text, i) => ({
      n: i + 1, text
    }));

    // Bone Whisperer — Known Spells now sourced from owned spell Items
    // with tradition === "dark" (dropped from the dark-spells compendium).
    // The free-text legacy list is kept around for migration but the new
    // panel renders Items so players can inspect, click-to-open, etc.
    // Detect a wielded Spirit Lantern (in either hand) — a Bone Whisperer
    // can only cast Dark Arts spells when the lantern is in their hands.
    // Match by name (case-insensitive) so any custom-created variant works
    // as long as it's named "Spirit Lantern".
    ctx.hasSpiritLanternInHands = actor.items.some(i =>
      i.name?.toLowerCase() === "spirit lantern"
      && i.system?.location === "hands"
    );

    ctx.knownDarkSpells = actor.items
      .filter(i => i.type === "spell" && i.system?.tradition === "dark")
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(i => {
        const desc = i.system?.description ?? "";
        // Strip HTML to plain text for Foundry's data-tooltip attribute,
        // which renders as a single string. Multi-line tooltips work via
        // \n which Foundry's tooltip CSS preserves.
        const plain = desc
          .replace(/<\/?[^>]+>/g, "")          // strip tags
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .trim();
        return {
          id: i.id,
          name: i.name,
          img: i.img,
          suggestedDice: i.system?.suggestedDice ?? 1,
          formula: i.system?.effectFormula ?? "",
          description: desc,
          tooltipText: plain
        };
      });

    // Wizard — Master Spellbook renders spells sourced from owned spell
    // Items whose tradition is any of the wizard-adjacent traditions
    // (arcane / flame / shadow / ooze / illusion). Dropped from the
    // Wizard Spells compendium, they populate the spellbook panel.
    // Same shape as knownDarkSpells so the template rendering mirrors.
    const WIZARD_TRADITIONS = new Set(["arcane", "flame", "shadow", "ooze", "illusion"]);

    // Which Master the wizard apprenticed under (or "" for unset).
    // Used both to display a Master card on the class tab and to gate
    // which non-arcane spells the drop panel accepts.
    const wizardMasterKey = sys.classOptions?.wizardMaster ?? "";
    ctx.wizardMasterKey = wizardMasterKey;
    ctx.wizardMaster    = wizardMasterKey ? FLAIL.wizardMasters[wizardMasterKey] : null;
    ctx.wizardMasterOptions = [
      { key: "", label: game.i18n.localize("FLAIL.Wizard.MasterChoose") },
      ...FLAIL.wizardMasterKeys.map(k => ({
        key:   k,
        label: FLAIL.wizardMasters[k].label
      }))
    ].map(o => ({ ...o, selected: o.key === wizardMasterKey }));

    // Lock state — dropdown is disabled when locked unless the current
    // user is a GM. The lock button label flips based on state, and
    // the whole toggle is hidden when no Master has been chosen yet
    // (nothing to lock).
    ctx.wizardMasterLocked = !!sys.classOptions?.wizardMasterLocked;
    ctx.wizardMasterEditable = ctx.editable
      && (!ctx.wizardMasterLocked || game.user.isGM);
    ctx.wizardMasterCanUnlock = ctx.wizardMasterLocked && game.user.isGM;
    ctx.wizardMasterShowLockBtn = !!wizardMasterKey && ctx.editable;

    // Master's spell repertoire — listed on the class tab so the
    // player can see which spells the chosen Master offers. Sourced
    // from the same WIZARD_SPELLS bundle that populates the
    // compendium so labels can never drift.
    if (ctx.wizardMaster) {
      ctx.wizardMasterSpells = WIZARD_SPELLS
        .filter(s => s.system.tradition === ctx.wizardMaster.tradition)
        .map(s => ({ name: s.name, img: s.img }))
        .sort((a, b) => a.name.localeCompare(b.name));
    } else {
      ctx.wizardMasterSpells = [];
    }
    ctx.knownWizardSpells = actor.items
      .filter(i => i.type === "spell" && WIZARD_TRADITIONS.has(i.system?.tradition))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(i => {
        const desc = i.system?.description ?? "";
        const plain = desc
          .replace(/<\/?[^>]+>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .trim();
        return {
          id: i.id,
          name: i.name,
          img: i.img,
          tradition: i.system?.tradition ?? "arcane",
          suggestedDice: i.system?.suggestedDice ?? 1,
          formula: i.system?.effectFormula ?? "",
          description: desc,
          tooltipText: plain
        };
      });

    // Legacy free-text Known Spells — preserved on the model for now so
    // existing characters don't lose typed entries on first render.
    ctx.knownSpellEntries = (sys.knownSpells ?? Array(10).fill("")).map((text, i) => ({
      n: i + 1, text
    }));

    // Cleric — religion + everything derived from it (deity, weapons,
    // holy symbol, armour, lay-on-hands fumble, prayer list). Religion is
    // the only persisted Cleric field; everything else is computed every
    // render so it can never drift from the chosen religion.
    const religionKey = sys.classOptions?.religion ?? "";
    const religion    = FLAIL.religions[religionKey] ?? null;
    ctx.religionKey   = religionKey;
    ctx.religion      = religion;
    ctx.religionOptions = [
      { key: "", label: game.i18n.localize("FLAIL.Religion.Choose") },
      ...FLAIL.religionKeys.map(k => ({ key: k, label: FLAIL.religions[k].label }))
    ].map(o => ({ ...o, selected: o.key === religionKey }));

    // Cleric divine prayers — like Bone Whisperer's known dark spells.
    // Sourced from owned prayer Items (dropped from the divine-prayers
    // compendium); filtered to the actor's current religion so prayers
    // from a previously-picked religion don't render after a switch.
    ctx.knownDivinePrayers = actor.items
      .filter(i =>
        i.type === "prayer"
        && (!religionKey || (i.system?.religion ?? "") === religionKey)
      )
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(i => {
        const desc = i.system?.description ?? "";
        const plain = desc
          .replace(/<\/?[^>]+>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .trim();
        return {
          id: i.id,
          name: i.name,
          img: i.img,
          description: desc,
          tooltipText: plain
        };
      });

    // Holy symbol presence — required for prayer casting. The rule says
    // "carrying or wearing" — translate to: item is in hands OR body
    // location (not stashed in satchel, not unequipped). Match by name
    // against keywords specific to each religion; fall back to a generic
    // "holy symbol" name so the player can just call their item that.
    const HOLY_SYMBOL_KEYWORDS = {
      brotherhood:  ["wooden cross", "cross"],
      crusade:      ["mutton crest", "mutton tunic"],
      shadowDemon:  ["horned helmet", "horned helm"],
      verdantGrove: ["oak leaf", "leaf medallion"]
    };
    const carriedLocations = new Set(["hands", "body"]);
    ctx.hasHolySymbol = religionKey
      ? actor.items.some(i => {
          if (!carriedLocations.has(i.system?.location)) return false;
          const lower = (i.name ?? "").toLowerCase();
          if (lower.includes("holy symbol")) return true;  // generic fallback
          const keywords = HOLY_SYMBOL_KEYWORDS[religionKey] ?? [];
          return keywords.some(k => lower.includes(k));
        })
      : false;

    // Augment class-details for Clerics — the rules table says "depends
    // on religion" for weapon spec, main item, and armour. Substitute the
    // chosen religion's concrete values so the panel above the religion
    // card is informative once a religion is picked.
    if (ctx.isCleric && religion) {
      // ctx.classDetails was built earlier; patch the relevant rows.
      for (const row of ctx.classDetails) {
        if (row.label === game.i18n.localize("FLAIL.ClassDetails.Labels.WeaponSpec")) {
          row.value = religion.weaponsLabel + ".";
        }
        if (row.label === game.i18n.localize("FLAIL.ClassDetails.Labels.MainItem")) {
          row.value = religion.holySymbol + ".";
        }
        if (row.label === game.i18n.localize("FLAIL.ClassDetails.Labels.Armour")) {
          row.value = religion.armour + ".";
        }
      }
    }

    // Cutthroat — 12 thieving talents (booleans). Augment each entry with
    // its save attribute's localised label and a hover hint so the
    // restructured panel can render save badges and roll tooltips.
    // Save badges use 3-letter abbreviations (STR/DEX/CHA/INT/LUC) for
    // compactness — overrides the default attribute abbr which spells
    // LUCK in full elsewhere on the sheet.
    const TALENT_SAVE_ABBR = { str: "STR", dex: "DEX", cha: "CHA", int: "INT", luck: "LUC" };
    const ttState = sys.thievingTalents ?? {};
    // Look up owned talent items so each selected talent knows its
    // item id — the delete button targets the item, not just the flag.
    const ownedTalentByAction = new Map(
      actor.items
        .filter(i => i.type === "talent" && i.system?.action)
        .map(i => [i.system.action, i.id])
    );
    const allTalents = FLAIL.cutthroatTalents.map(t => {
      const saveLabel = TALENT_SAVE_ABBR[t.save] ?? "";
      const saveLong = t.save
        ? game.i18n.localize(FLAIL.attributes[t.save].label)
        : "";
      const rollHint = ttState[t.key] && t.save
        ? game.i18n.format("FLAIL.Talents.RollHint", { save: saveLong })
        : "";
      return {
        ...t,
        marked: !!ttState[t.key],
        saveLabel,
        rollHint,
        itemId: ownedTalentByAction.get(t.key) ?? null
      };
    });
    // Kept for backward-compat with any callers; the tabbed UI uses the
    // split arrays below.
    ctx.thievingTalents = allTalents;
    // Split for the two-tab UI: Current Talents (selected) and
    // Add Talent (available to pick).
    ctx.selectedTalents  = allTalents.filter(t =>  t.marked);
    ctx.availableTalents = allTalents.filter(t => !t.marked);
    ctx.activeTalentTab  = this._activeTalentTab;

    // Cutthroat — sigil detection. Mark of the Guild tokens can be
    // spent only when the sigil is worn or carried. A sigil counts
    // when it's held (hands), worn on the body (body), OR worn in an
    // adornment slot — the compendium sigils are pre-flagged as
    // adornments and drop into the adornment column by default, so
    // that zone must count as "worn" for this check.
    if (ctx.isCutthroat) {
      ctx.hasSigil = this._hasSigilEquipped();
      // Token tracker — current and derived max (level).
      ctx.guildTokens = sys.guildTokens ?? 0;
      ctx.guildTokensMax = sys.level ?? 1;

      // Embedded Guild Item — only one at a time. Surface its blurb,
      // sigil text, starting-talent labels, and the seven special
      // actions so the class panel can render them with buttons.
      const guildItem = actor.items.find(i => i.type === "guild");
      if (guildItem) {
        // Translate starting-talent keys (e.g. "hideShadows") to their
        // display labels using the existing FLAIL.cutthroatTalents map.
        const talentLabelMap = Object.fromEntries(
          FLAIL.cutthroatTalents.map(t => [t.key, game.i18n.localize(t.label)])
        );
        ctx.currentGuild = {
          id:    guildItem.id,
          name:  guildItem.name,
          img:   guildItem.img,
          blurb: guildItem.system?.blurb ?? "",
          sigil: guildItem.system?.sigil ?? "",
          startingTalents: (guildItem.system?.startingTalents ?? [])
            .map(k => talentLabelMap[k] ?? k),
          specialActions: guildItem.system?.specialActions ?? []
        };
      } else {
        ctx.currentGuild = null;
      }
    }

    // Druid — Primal Gifts grid (5 kingdoms × 5 gifts each). Some gifts
    // are activatable — the gift name becomes a click-to-fire button
    // on the sheet when the gift is selected. Currently only
    // Regeneration is wired; other activatable gifts (Pigeon Mail,
    // Incubator, Bubble Breath, etc.) can be added here later.
    const ACTIVATABLE_GIFTS = {
      "reptile.regeneration": "FLAIL.PrimalGift.Regeneration.Hint"
    };
    const giftsState = sys.primalGifts ?? {};
    ctx.primalGiftsGrid = Object.entries(FLAIL.druidPrimalGifts).map(([kingKey, kingDef]) => {
      const kGifts = giftsState[kingKey] ?? {};
      const selectedCount = kingDef.gifts.filter(g => !!kGifts[g.key]).length;
      return {
        key: kingKey,
        label: kingDef.label,
        selectedCount,
        gifts: kingDef.gifts.map(g => {
          const marked = !!kGifts[g.key];
          const hintKey = ACTIVATABLE_GIFTS[`${kingKey}.${g.key}`];
          const activatable = !!(marked && hintKey);
          return {
            ...g,
            marked,
            activatable,
            activateHint: activatable ? game.i18n.localize(hintKey) : ""
          };
        })
      };
    });

    // Owned Primal Gift items grouped by kingdom for the drag-and-drop
    // panel on the Druid class tab. Each column shows only the gifts
    // the character actually owns. Empty columns still render so the
    // player can see all five kingdoms at a glance.
    const ownedGifts = actor.items.filter(i => i.type === "gift");
    ctx.knownPrimalGiftsByKingdom = Object.entries(FLAIL.druidPrimalGifts).map(([kingKey, kingDef]) => {
      const owned = ownedGifts
        .filter(item => item.system?.kingdom === kingKey)
        .map(item => {
          const hintKey = ACTIVATABLE_GIFTS[`${kingKey}.${item.system?.giftKey}`];
          return {
            id: item.id,
            name: item.name,
            img: item.img,
            kingdom: kingKey,
            giftKey: item.system?.giftKey ?? "",
            description: item.system?.description ?? "",
            activatable: !!hintKey,
            activateHint: hintKey ? game.i18n.localize(hintKey) : ""
          };
        });
      return {
        key: kingKey,
        label: kingDef.label,
        gifts: owned,
        count: owned.length
      };
    });
    ctx.knownPrimalGiftsCount = ownedGifts.length;

    // Druid Shapeshift — pass current state plus dominant-kingdom
    // preview so the class tab can show which beast a fresh shift
    // would produce right now.
    const shift = sys.shapeshift ?? {};
    let dominant = null;
    if (sys.class === "druid") {
      const counts = ctx.primalGiftsGrid.map(k => ({ key: k.key, label: k.label, count: k.selectedCount }));
      const maxCount = Math.max(0, ...counts.map(c => c.count));
      if (maxCount > 0) {
        const tied = counts.filter(c => c.count === maxCount);
        dominant = {
          maxCount,
          tied: tied.map(t => ({ key: t.key, label: t.label })),
          hasTie: tied.length > 1,
          // Pre-computed convenience — Handlebars can't index arrays
          // with .N syntax, so surface the singular label here.
          singleLabel: tied.length === 1 ? tied[0].label : ""
        };
      }
    }
    ctx.shapeshift = {
      active:      !!shift.active,
      kingdom:     shift.kingdom ?? "",
      kingdomLabel: shift.kingdom ? (FLAIL.druidPrimalGifts[shift.kingdom]?.label ?? "") : "",
      beast:       shift.kingdom ? FLAIL.druidBeastForms[shift.kingdom] : null,
      beastForm:   shift.beastForm ?? "",
      diceRolled:  shift.diceRolled ?? 0,
      onesCount:   shift.onesCount ?? 0,
      sixesCount:  shift.sixesCount ?? 0,
      rollResults: shift.rollResults ?? [],
      dominant
    };

    // Tinkerer — Gadget Belt grid (4 categories × 5 gadgets each).
    const beltState = sys.gadgetBelt ?? {};
    ctx.gadgetBeltGrid = Object.entries(FLAIL.tinkererGadgetBelt).map(([catKey, catDef]) => ({
      key: catKey,
      label: catDef.label,
      gadgets: catDef.gadgets.map(g => ({
        ...g,
        marked: !!(beltState[catKey]?.[g.key])
      }))
    }));

    // Owned Gadget items grouped by category for the drag-and-drop
    // panel on the Tinkerer class tab. Mirrors the Primal Gifts
    // approach — empty categories still render so the player can see
    // all four types at a glance.
    const ownedGadgets = actor.items.filter(i => i.type === "gadget");
    ctx.knownGadgetsByCategory = Object.entries(FLAIL.tinkererGadgetBelt).map(([catKey, catDef]) => {
      const owned = ownedGadgets
        .filter(item => item.system?.gadgetType === catKey)
        .map(item => {
          const cur = item.system?.usage?.value ?? 0;
          const max = item.system?.usage?.max ?? 0;
          return {
            id: item.id,
            name: item.name,
            img: item.img,
            category: catKey,
            gadgetKey: item.system?.gadgetKey ?? "",
            description: item.system?.description ?? "",
            usageMax: max,
            usageValue: cur,
            used: max > 0 && cur >= max,
            // Damage-category gadgets get a "release" button that
            // fires the useDamageGadget action. Other categories are
            // still hand-narrated by the GM for now.
            releasable: catKey === "damage"
          };
        });
      return {
        key: catKey,
        label: catDef.label,
        gadgets: owned,
        count: owned.length
      };
    });
    ctx.knownGadgetsCount = ownedGadgets.length;

    // Bard — Jack of All Trades. Now derived from owned items:
    // talent-type (Cutthroat), gadget-type (Tinkerer), or spell-type
    // whose tradition is a wizard tradition. A Bard has none of these
    // via their base class, so any that appear on the actor are
    // treated as JOAT picks. Long-rest reset touches `usage.value`
    // on gadgets and the `flags.flail.usedToday` flag on talents +
    // spells, so the "used today" state persists per-item without a
    // second schema field. WIZARD_TRADITIONS is already declared
    // earlier in this function for the wizard-spell context.
    const isJoatItem = i => {
      if (i.type === "talent")  return true;
      if (i.type === "gadget")  return true;
      if (i.type === "spell")   return WIZARD_TRADITIONS.has(i.system?.tradition);
      return false;
    };
    const level = sys.level ?? 1;
    ctx.jackOfAllTradesItems = actor.items.filter(isJoatItem).map(item => {
      const usedToday = item.type === "gadget"
        ? ((item.system?.usage?.value ?? 0) >= (item.system?.usage?.max ?? 1))
        : !!item.getFlag("flail", "usedToday");
      const uiType = item.type === "spell" ? "spell"
                   : item.type === "talent" ? "talent"
                   : "gadget";
      return {
        id: item.id,
        type: uiType,
        name: item.name,
        img: item.img,
        description: item.system?.description ?? "",
        usedToday,
        // A wizard spell used by a Bard is capped at level dice per
        // the rulebook rule that "max mana spent equals current level."
        maxDice: uiType === "spell" ? level : null,
        // Only damage-category gadgets are click-fired for now — other
        // categories still narrative. Talents also click to mark used.
        releasable: uiType === "gadget" && item.system?.gadgetType === "damage",
        castable:   uiType === "spell",
        markable:   uiType === "talent"
      };
    });
    ctx.jackOfAllTradesCount = ctx.jackOfAllTradesItems.length;
    ctx.jackOfAllTradesLevel = level;   // slot ceiling per level rule

    return ctx;
  }

  /**
   * Build the inventory grid context.
   * For each zone, produce the slot list with the item (if any) in each slot.
   */
  #prepareInventory(actor) {
    const sys = actor.system;
    const zones = {};

    for (const [zoneKey, zoneDef] of Object.entries(FLAIL.inventory.zones)) {
      const slots = (sys.slotAvailability?.[zoneKey] ?? []).map(s => ({ ...s, item: null, secondary: null }));
      const itemsInZone = actor.items.filter(i =>
        i.system?.location === zoneKey && typeof i.system?.slotIndex === "number"
      );

      for (const item of itemsInZone) {
        const idx = item.system.slotIndex;
        const slot = slots[idx];
        if (slot) {
          slot.item = item;
          // Two-handed weapons / 2-slot armour spill into the slot
          // VERTICALLY below in the printed layout. That's `idx +
          // columns` for wide zones (satchel is 2-wide, so index 0's
          // slot below is index 2). For single-column zones (hands,
          // body, adornment, instruments) columns=1 and this reduces
          // to the previous `idx + 1` behaviour.
          const span = item.system.slotsRequired ?? 1;
          const cols = zoneDef.columns ?? 1;
          if (span > 1) slot.spansTwo = true;
          for (let i = 1; i < span; i++) {
            const next = slots[idx + i * cols];
            if (next) next.secondary = item;
          }
        }
      }

      zones[zoneKey] = {
        key: zoneKey,
        label: game.i18n.localize(zoneDef.label),
        considered: zoneDef.considered,
        slots
      };
    }

    return zones;
  }

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /** @inheritdoc */
  _onRender(context, options) {
    super._onRender?.(context, options);
    const root = this.element;
    if (!root) return;

    // Mirror the active tab to the root element so CSS can pick the right
    // panel without a full re-render.
    root.dataset.activeTab = this._activeTab;

    // Same mirror trick for the Cutthroat talents card's two-tab nav.
    const talentsCard = root.querySelector(".talents-card");
    if (talentsCard) talentsCard.dataset.activeTalentTab = this._activeTalentTab;

    root.querySelectorAll("[draggable=true]").forEach(el => {
      el.addEventListener("dragstart", this.#onDragStart.bind(this));
    });

    // Editor pencil click — Foundry v13's HandlebarsApplicationMixin
    // does NOT auto-wire the {{editor}} helper's edit button for
    // HTMLField editors on ApplicationV2 sheets, so we activate the
    // ProseMirror editor ourselves. Fields the {{editor}} helper
    // renders share the same DOM shape:
    //   <div class="editor prosemirror">
    //     <a class="editor-edit"><i class="fa-edit"></i></a>
    //     <div class="editor-content" data-edit="system.<field>">…</div>
    //   </div>
    // On pencil click we read the field path, look up the current
    // value, and create a ProseMirror editor in place. The editor's
    // Save button both writes the value back to the actor and
    // destroys the editor; a follow-up re-render restores view mode.
    root.querySelectorAll(".editor a.editor-edit, .editor button.editor-edit").forEach(btn => {
      btn.addEventListener("click", async (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        await this.#activateEditor(btn);
      });
    });

    // Only attach drop listeners to slots, NOT to the zone wrapper too —
    // the zone is the slot's parent, and a single drop on a slot was firing
    // the handler twice (once on the slot, once on the bubbled-up zone),
    // creating duplicate items.
    root.querySelectorAll(".inventory-slot").forEach(el => {
      el.addEventListener("dragover", this.#onDragOver.bind(this));
      el.addEventListener("drop", this.#onDrop.bind(this));
    });

    // Spell-list drop zones — currently the Bone Whisperer's Known Spells
    // panel. Accepts spell Items with tradition === "dark"; rejects
    // anything else with the "no entry" cursor.
    root.querySelectorAll("[data-drop-target='darkSpells']").forEach(el => {
      el.addEventListener("dragover", this.#onSpellListDragOver.bind(this));
      el.addEventListener("drop", this.#onSpellListDrop.bind(this));
    });

    // Wizard Master Spellbook drop zone. Accepts spell Items whose
    // tradition is any of the wizard-adjacent schools (arcane /
    // flame / shadow / ooze / illusion). Rejects dark-tradition
    // spells (which belong on a Bone Whisperer's Known Spells panel).
    root.querySelectorAll("[data-drop-target='wizardSpells']").forEach(el => {
      el.addEventListener("dragover", this.#onSpellListDragOver.bind(this));
      el.addEventListener("drop", this.#onWizardSpellDrop.bind(this));
    });

    // Divine-prayers drop zone (Cleric). Accepts prayer Items whose
    // `system.religion` matches the actor's currently-chosen religion.
    root.querySelectorAll("[data-drop-target='divinePrayers']").forEach(el => {
      el.addEventListener("dragover", this.#onSpellListDragOver.bind(this));
      el.addEventListener("drop", this.#onPrayerListDrop.bind(this));
    });

    // Primal Gifts drop zone (Druid). Accepts gift-type Items from
    // the Primal Gifts compendium — the panel groups them by kingdom.
    // Duplicate protection: dropping the same giftKey twice quietly
    // no-ops with a toast.
    root.querySelectorAll("[data-drop-target='primalGifts']").forEach(el => {
      el.addEventListener("dragover", this.#onSpellListDragOver.bind(this));
      el.addEventListener("drop", this.#onPrimalGiftDrop.bind(this));
    });

    // Tinkerer Gadget Belt drop zone. Accepts gadget-type items from
    // the Tinkerer Gadgets compendium. Duplicate protection is
    // giftKey-style: dropping the same gadget again no-ops.
    root.querySelectorAll("[data-drop-target='gadgetBelt']").forEach(el => {
      el.addEventListener("dragover", this.#onSpellListDragOver.bind(this));
      el.addEventListener("drop", this.#onGadgetDrop.bind(this));
    });

    // Bard Jack of All Trades — accepts talent, gadget, and wizard
    // spell items from their respective compendia.
    root.querySelectorAll("[data-drop-target='jackOfAllTrades']").forEach(el => {
      el.addEventListener("dragover", this.#onSpellListDragOver.bind(this));
      el.addEventListener("drop", this.#onJackOfAllTradesDrop.bind(this));
    });

    // Cutthroat thieving talents drop zone — accepts talent-type
    // items only. Duplicate protection is by talent `action` key
    // (which matches the config entry) with a name fallback.
    root.querySelectorAll("[data-drop-target='thievingTalents']").forEach(el => {
      el.addEventListener("dragover", this.#onSpellListDragOver.bind(this));
      el.addEventListener("drop", this.#onThievingTalentDrop.bind(this));
    });

    // Guild drop zone (Cutthroat). Accepts a single guild Item; if one
    // is already on the actor, the new drop replaces it (auto-deletes
    // the old). Starting talents are auto-marked on the actor.
    root.querySelectorAll("[data-drop-target='guild']").forEach(el => {
      el.addEventListener("dragover", this.#onSpellListDragOver.bind(this));
      el.addEventListener("drop", this.#onGuildDrop.bind(this));
    });
  }

  /**
   * Activate a ProseMirror editor in place of an {{editor}} helper's
   * view mode. Foundry v13's HandlebarsApplicationMixin doesn't auto-
   * wire the pencil-click for HTMLField editors on ApplicationV2
   * sheets, so we do it ourselves. Save writes back to the actor and
   * a follow-up re-render restores view mode.
   *
   * Supported field discovery:
   *   1. `[data-edit="…"]` on the editor-content div (Foundry default)
   *   2. `[name="…"]` fallback on the editor container
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
          // ProseMirrorMenu writes the field back to the document
          // internally when destroyOnSave is true. Re-render so we go
          // back to view mode with the new content.
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

  /**
   * Drop handler for the Divine Prayers panel. Resolves the dropped item,
   * verifies it's a prayer Item, and that its religion matches the actor's
   * currently-chosen religion. Same-actor drops are skipped.
   */
  async #onPrayerListDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); }
    catch { return; }

    if (payload.flailDrag?.itemId) return;

    const item = await Item.implementation.fromDropData(payload);
    if (!item || item.type !== "prayer") {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NotAPrayer"));
      return;
    }

    // Religion gate — Cleric must have picked a religion, and the dropped
    // prayer's religion must match. Without this guard, a Cleric could
    // accidentally collect prayers from incompatible religions.
    const actorReligion = this.actor.system.classOptions?.religion ?? "";
    const prayerReligion = item.system?.religion ?? "";
    if (!actorReligion) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.PickReligionFirst"));
      return;
    }
    if (prayerReligion !== actorReligion) {
      const actorLabel  = FLAIL.religions[actorReligion]?.label ?? actorReligion;
      const prayerLabel = FLAIL.religions[prayerReligion]?.label ?? prayerReligion;
      ui.notifications?.warn(
        game.i18n.format("FLAIL.Notify.PrayerWrongReligion", {
          prayer: item.name,
          prayerReligion: prayerLabel,
          actorReligion: actorLabel
        })
      );
      return;
    }

    // Avoid duplicates of the same prayer.
    const dup = this.actor.items.find(i =>
      i.type === "prayer"
      && i.system?.religion === prayerReligion
      && i.name === item.name
    );
    if (dup) {
      ui.notifications?.info(
        game.i18n.format("FLAIL.Notify.AlreadyKnown", { name: item.name })
      );
      return;
    }

    const data = item.toObject();
    await this.actor.createEmbeddedDocuments("Item", [data]);
  }

  /**
   * Drop handler for the Cutthroat Guild panel. Resolves the dropped
   * item, verifies it's a guild Item, and replaces any existing guild
   * on the actor (only one allowed at a time). Auto-marks the guild's
   * five starting talents on the actor as a convenience.
   *
   * Note: subsequent guild changes do NOT remove previously-marked
   * talents — once learned, talents are permanent skills. The new
   * guild's starting talents are added to whatever's already marked.
   */
  async #onGuildDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); }
    catch { return; }

    if (payload.flailDrag?.itemId) return;

    const item = await Item.implementation.fromDropData(payload);
    if (!item || item.type !== "guild") {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NotAGuild"));
      return;
    }

    // Remove any existing guild item first — only one guild at a time.
    const existing = this.actor.items.filter(i => i.type === "guild");
    if (existing.length) {
      await this.actor.deleteEmbeddedDocuments("Item", existing.map(i => i.id));
    }

    const data = item.toObject();
    await this.actor.createEmbeddedDocuments("Item", [data]);

    // Auto-add this guild's starting talents as embedded talent items.
    // Loads each config entry and materialises a talent item with the
    // canonical action key + save attribute. Existing talents are not
    // re-added (dedupe by `action`), so talents persist across guild
    // changes (the player learned them, after all).
    const starting = item.system?.startingTalents ?? [];
    if (starting.length) {
      const existingActions = new Set(
        this.actor.items
          .filter(i => i.type === "talent")
          .map(i => i.system?.action)
          .filter(Boolean)
      );
      const toCreate = [];
      for (const key of starting) {
        if (existingActions.has(key)) continue;
        const cfg = FLAIL.cutthroatTalents.find(t => t.key === key);
        if (!cfg) continue;
        toCreate.push({
          name: cfg.label,
          type: "talent",
          img: "icons/magic/perception/silhouette-stealth-shadow.webp",
          system: {
            description: cfg.desc ?? "",
            attribute:   cfg.save ?? "",
            action:      cfg.key
          }
        });
      }
      if (toCreate.length) {
        await this.actor.createEmbeddedDocuments("Item", toCreate);
      }
    }
  }
  #onSpellListDragOver(event) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
  }

  /**
   * Drop handler for the Known Spells panel. Resolves the dropped item,
   * verifies it's a dark-tradition spell, and creates it on the actor.
   * Same-actor drops are skipped (the spell is already there).
   */
  async #onSpellListDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); }
    catch { return; }

    // Internal drag from within this actor's sheet — already in the list,
    // nothing to do. Compendium drops have no flailDrag flag.
    if (payload.flailDrag?.itemId) return;

    const item = await Item.implementation.fromDropData(payload);
    if (!item) return;
    if (item.type !== "spell" || item.system?.tradition !== "dark") {
      ui.notifications?.warn(
        game.i18n.localize("FLAIL.Notify.NotADarkSpell")
      );
      return;
    }

    // Avoid duplicates — a spell of the same name already on the actor
    // doesn't need to be added again.
    const dup = this.actor.items.find(i =>
      i.type === "spell"
      && i.system?.tradition === "dark"
      && i.name === item.name
    );
    if (dup) {
      ui.notifications?.info(
        game.i18n.format("FLAIL.Notify.AlreadyKnown", { name: item.name })
      );
      return;
    }

    const data = item.toObject();
    await this.actor.createEmbeddedDocuments("Item", [data]);
  }

  /**
   * Drop handler for the Wizard Master Spellbook panel. Resolves the
   * dropped item, verifies it's a wizard-tradition spell (arcane /
   * flame / shadow / ooze / illusion), and creates it on the actor.
   * Same-actor drops are skipped; an existing spell of the same name
   * is treated as a duplicate.
   */
  async #onWizardSpellDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); }
    catch { return; }

    // Internal drag from within this actor's sheet — already in the list.
    if (payload.flailDrag?.itemId) return;

    const item = await Item.implementation.fromDropData(payload);
    if (!item) return;

    const WIZARD_TRADITIONS = new Set(["arcane", "flame", "shadow", "ooze", "illusion"]);
    if (item.type !== "spell" || !WIZARD_TRADITIONS.has(item.system?.tradition)) {
      ui.notifications?.warn(
        game.i18n.localize("FLAIL.Notify.NotAWizardSpell")
      );
      return;
    }

    // Master gating — arcane spells (common repertoire) are always
    // fair game. Master-specific traditions (flame / shadow / ooze /
    // illusion) are only accepted when the wizard is apprenticed to
    // the corresponding Master. If no Master has been chosen yet,
    // only arcane spells are accepted.
    const tradition = item.system?.tradition;
    const masterKey = this.actor.system.classOptions?.wizardMaster ?? "";
    if (tradition !== "arcane") {
      const requiredMaster = FLAIL.getMasterForTradition(tradition);
      if (!masterKey) {
        ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.WizardMasterUnset"));
        return;
      }
      if (masterKey !== requiredMaster) {
        const currentMaster = FLAIL.wizardMasters[masterKey];
        ui.notifications?.warn(
          game.i18n.format("FLAIL.Notify.WizardMasterMismatch", {
            spell:   item.name,
            master:  currentMaster?.shortLabel ?? "?"
          })
        );
        return;
      }
    }

    // Duplicate check — same name + wizard-tradition already present.
    const dup2 = this.actor.items.find(i =>
      i.type === "spell"
      && WIZARD_TRADITIONS.has(i.system?.tradition)
      && i.name === item.name
    );
    if (dup2) {
      ui.notifications?.info(
        game.i18n.format("FLAIL.Notify.AlreadyKnown", { name: item.name })
      );
      return;
    }

    const data = item.toObject();
    await this.actor.createEmbeddedDocuments("Item", [data]);
  }

  /**
   * Drop handler for the Druid Primal Gifts panel. Resolves the
   * dropped item, verifies it's a gift-type item, and creates it on
   * the actor. Duplicate protection is by giftKey: dropping a second
   * "Crocodile Skin" no-ops with an info toast rather than stacking.
   * Home-brew gifts (blank giftKey) fall back to name-based dedupe.
   */
  async #onPrimalGiftDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); }
    catch { return; }

    // Internal drag from within this actor's sheet — already owned.
    if (payload.flailDrag?.itemId) return;

    const item = await Item.implementation.fromDropData(payload);
    if (!item) return;

    if (item.type !== "gift") {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NotAPrimalGift"));
      return;
    }

    // Duplicate check — same giftKey (or name if key is blank).
    const droppedKey = item.system?.giftKey ?? "";
    const dup = this.actor.items.find(i => {
      if (i.type !== "gift") return false;
      if (droppedKey && i.system?.giftKey === droppedKey) return true;
      if (!droppedKey && i.name === item.name) return true;
      return false;
    });
    if (dup) {
      ui.notifications?.info(
        game.i18n.format("FLAIL.Notify.AlreadyKnown", { name: item.name })
      );
      return;
    }

    const data = item.toObject();
    await this.actor.createEmbeddedDocuments("Item", [data]);
  }

  /**
   * Drop handler for the Tinkerer Gadget Belt panel. Resolves the
   * dropped item, verifies it's a gadget-type item, and creates it
   * on the actor. Duplicate protection is by gadgetKey (dropping a
   * second "Buzzsaw Disk" no-ops with an info toast); home-brew
   * gadgets fall back to name-based dedupe.
   */
  async #onGadgetDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); }
    catch { return; }

    if (payload.flailDrag?.itemId) return;

    const item = await Item.implementation.fromDropData(payload);
    if (!item) return;

    if (item.type !== "gadget") {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NotAGadget"));
      return;
    }

    const droppedKey = item.system?.gadgetKey ?? "";
    const dup = this.actor.items.find(i => {
      if (i.type !== "gadget") return false;
      if (droppedKey && i.system?.gadgetKey === droppedKey) return true;
      if (!droppedKey && i.name === item.name) return true;
      return false;
    });
    if (dup) {
      ui.notifications?.info(
        game.i18n.format("FLAIL.Notify.AlreadyKnown", { name: item.name })
      );
      return;
    }

    const data = item.toObject();
    await this.actor.createEmbeddedDocuments("Item", [data]);
  }

  /**
   * Drop handler for the Bard's Jack of All Trades panel. Accepts
   * talent-type (Cutthroat), gadget-type (Tinkerer), or wizard
   * spell-type items. Everything else is refused with a toast.
   *
   * Duplicate protection matches on the item's canonical key when
   * available (giftKey / talentKey / gadgetKey / name), with a name
   * fallback for home-brew items.
   *
   * Applies only to Bard characters — non-Bard actors get a warning.
   */
  async #onJackOfAllTradesDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); }
    catch { return; }

    if (payload.flailDrag?.itemId) return;

    if (this.actor.system?.class !== "bard") {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.JOATBardOnly"));
      return;
    }

    const item = await Item.implementation.fromDropData(payload);
    if (!item) return;

    const WIZARD_TRADITIONS = new Set(["arcane", "flame", "shadow", "ooze", "illusion"]);
    const isValidJoat =
         item.type === "talent"
      || item.type === "gadget"
      || (item.type === "spell" && WIZARD_TRADITIONS.has(item.system?.tradition));
    if (!isValidJoat) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NotAJoatItem"));
      return;
    }

    // Duplicate check within the same item type. Matches on canonical
    // key first (talentKey / gadgetKey / spell name for spells), then
    // falls back to name.
    const dup = this.actor.items.find(other => {
      if (other.type !== item.type) return false;
      if (item.type === "talent") {
        const k = item.system?.action ?? "";
        if (k && other.system?.action === k) return true;
      }
      if (item.type === "gadget") {
        const k = item.system?.gadgetKey ?? "";
        if (k && other.system?.gadgetKey === k) return true;
      }
      return other.name === item.name;
    });
    if (dup) {
      ui.notifications?.info(
        game.i18n.format("FLAIL.Notify.AlreadyKnown", { name: item.name })
      );
      return;
    }

    const data = item.toObject();
    await this.actor.createEmbeddedDocuments("Item", [data]);
  }

  /**
   * Drop handler for the Cutthroat's Thieving Talents panel. Accepts
   * talent-type items only. Duplicate protection matches on the
   * talent's canonical `action` key (which mirrors the config
   * `cutthroatTalents[].key`) with a name fallback for home-brew
   * talents.
   */
  async #onThievingTalentDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); }
    catch { return; }

    if (payload.flailDrag?.itemId) return;

    const item = await Item.implementation.fromDropData(payload);
    if (!item) return;

    if (item.type !== "talent") {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NotAThievingTalent"));
      return;
    }

    const droppedKey = item.system?.action ?? "";
    const dup = this.actor.items.find(i => {
      if (i.type !== "talent") return false;
      if (droppedKey && i.system?.action === droppedKey) return true;
      if (!droppedKey && i.name === item.name) return true;
      return false;
    });
    if (dup) {
      ui.notifications?.info(
        game.i18n.format("FLAIL.Notify.AlreadyKnown", { name: item.name })
      );
      return;
    }

    const data = item.toObject();
    await this.actor.createEmbeddedDocuments("Item", [data]);
  }

  /**
   * Whether this character is currently carrying or wearing a sigil.
   *
   * A sigil qualifies when:
   *   - it's an item whose name contains "sigil" (case-insensitive)
   *     — matches Crimson Coin Sigil, Eye Ring Sigil, Hand Brooch
   *     Sigil, Tentacle Clasp Sigil, or any home-brew guild sigil
   *     that follows the naming convention;
   *   - AND it's currently held in the Hands zone, worn in the Body
   *     zone, OR worn in the Adornment zone. The last case is the
   *     canonical location — the four Cutthroat guild sigils in the
   *     compendium are pre-flagged as adornments and drop into the
   *     Adornment column by default, so that zone must count as
   *     "worn" for guild-token spending to work.
   *
   * Used by the sheet context (renders the token counter as enabled/
   * disabled) and by the guild-action + guild-token spend handlers
   * (defensive recheck at click time).
   */
  _hasSigilEquipped() {
    const wornOrCarried = new Set(["hands", "body", "adornment"]);
    return this.actor.items.some(i =>
      wornOrCarried.has(i.system?.location)
      && (i.name ?? "").toLowerCase().includes("sigil")
    );
  }

  /**
   * Validate that a multi-slot item (slotsRequired ≥ 2) fits at the
   * given zone + starting slot index. Returns `{ok: true}` or
   * `{ok: false, message: string}` — never throws.
   *
   * Multi-slot items extend VERTICALLY in the printed sheet layout
   * (never horizontally), so the extension slot index is
   * `slotIndex + i * columns` — one row down per extension step in
   * the printed grid. For single-column zones (hands, body, etc.)
   * `columns=1` and this reduces to the classic `+1` sequence.
   *
   * Rules:
   *   - Every extension slot must exist in the zone.
   *   - Every extension slot must not be locked.
   *   - Every extension slot must not be occupied by another item.
   *   - The item being moved (identified by ID) is excluded from
   *     occupant detection so it can be repositioned in place.
   */
  #checkMultiSlotFit(item, zone, slotIndex, span) {
    const zoneSlots = this.actor.system.slotAvailability?.[zone] ?? [];
    const zoneDef = FLAIL.inventory.zones[zone];
    const zoneLabel = zoneDef ? game.i18n.localize(zoneDef.label) : zone;
    const cols = zoneDef?.columns ?? 1;
    for (let i = 1; i < span; i++) {
      const nextIdx = slotIndex + i * cols;
      // Missing extension slot — no room below this position.
      if (nextIdx >= zoneSlots.length) {
        return {
          ok: false,
          message: game.i18n.format("FLAIL.Notify.MultiSlotNoRoom", {
            item: item.name, zone: zoneLabel
          })
        };
      }
      if (zoneSlots[nextIdx]?.locked) {
        return {
          ok: false,
          message: game.i18n.format("FLAIL.Notify.MultiSlotBlockedLocked", {
            item: item.name
          })
        };
      }
      const blocker = this.actor.items.find(other => {
        if (other.id === item.id) return false;
        if (other.system?.location !== zone) return false;
        const otherStart = other.system?.slotIndex ?? 0;
        const otherSpan  = other.system?.slotsRequired ?? 1;
        // Another multi-slot item's extensions are also at +cols steps.
        for (let j = 0; j < otherSpan; j++) {
          if (otherStart + j * cols === nextIdx) return true;
        }
        return false;
      });
      if (blocker) {
        return {
          ok: false,
          message: game.i18n.format("FLAIL.Notify.MultiSlotBlocked", {
            item: item.name, blocker: blocker.name
          })
        };
      }
    }
    return { ok: true };
  }

  /**
   * Gate dragover by drop validity. Calling `preventDefault()` is the HTML5
   * drag-and-drop signal "this element will accept the drop"; if we don't
   * call it, the browser shows the "no entry" cursor and won't fire `drop`.
   *
   * Asymmetric rules:
   *   - **Internal drag** (an item already on this actor): any slot in a
   *     real zone is a valid target — occupied slots will swap.
   *   - **External drag** (item from compendium, sidebar, another actor):
   *     only empty slots are valid; occupied slots reject.
   * Placeholder cells (no `data-zone`) reject in both cases.
   *
   * Also enforced here:
   *   - **Locked slots** (STR-locked satchel, level-locked instruments)
   *     refuse all drops.
   *   - **Per-zone `allowedTypes`** — for internal drags we can read the
   *     item-type marker MIME at this point and refuse if it's wrong.
   *     External drags can't be type-checked here (dragover can't read
   *     the payload), so the `#onDrop` handler does it after parsing.
   */
  #onDragOver(event) {
    const slot = event.currentTarget;
    const zoneEl = slot.closest(".inventory-zone");
    const zoneKey = zoneEl?.dataset.zone;
    if (!zoneKey) return;

    // Locked slots refuse drops entirely.
    if (slot.classList.contains("is-locked")) return;

    const types = Array.from(event.dataTransfer?.types ?? []);
    const isInternal = types.includes("application/x-flail-internal");

    // Per-zone allowedTypes (only enforceable on internal drags here).
    const zoneDef = FLAIL.inventory.zones[zoneKey];
    const allowedTypes = zoneDef?.allowedTypes;
    if (isInternal && allowedTypes?.length) {
      const ok = allowedTypes.some(t =>
        types.includes(`application/x-flail-itemtype-${t}`)
      );
      if (!ok) return;
    }

    // External drags only land on empty slots; internal drags can swap.
    if (!isInternal && slot.classList.contains("is-occupied")) return;

    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = isInternal ? "move" : "copy";
    }
  }

  #onDragStart(event) {
    const itemId = event.currentTarget.dataset.itemId;
    if (!itemId) return;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    event.dataTransfer.setData("text/plain", JSON.stringify({
      type: "Item",
      uuid: item.uuid,
      flailDrag: { itemId }
    }));
    // Marker MIME type so `dragover` can identify this as an internal
    // (already-on-this-actor) drag without needing to read the payload —
    // `getData` is restricted during dragover for security; only `types` is.
    event.dataTransfer.setData("application/x-flail-internal", "1");
    // Item-type marker lets dragover honour per-zone type restrictions
    // (e.g. the Bard's instruments zone only accepts instruments).
    event.dataTransfer.setData(`application/x-flail-itemtype-${item.type}`, "1");
  }

  async #onDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget.closest(".inventory-slot");
    const zoneEl = event.currentTarget.closest(".inventory-zone");
    const zone = zoneEl?.dataset.zone;
    const slotIndex = target ? Number(target.dataset.slotIndex) : 0;

    // Reject placeholder cells (no zone).
    if (!zone) return;
    // Reject locked slots (STR-locked satchel, level-locked instruments).
    if (target?.classList.contains("is-locked")) return;

    const zoneDef = FLAIL.inventory.zones[zone];
    const allowedTypes = zoneDef?.allowedTypes;

    let payload;
    try { payload = JSON.parse(event.dataTransfer.getData("text/plain")); }
    catch { return; }

    // ---- Internal drag — already on this actor. Swap if occupied. ----
    if (payload.flailDrag?.itemId) {
      const item = this.actor.items.get(payload.flailDrag.itemId);
      if (!item) return;

      // Per-zone type restriction. Should already have been blocked at
      // dragover, but belt-and-braces.
      if (allowedTypes?.length && !allowedTypes.includes(item.type)) {
        ui.notifications?.warn(game.i18n.format("FLAIL.Notify.ZoneRejectsType", {
          zone: game.i18n.localize(zoneDef.label),
          type: item.type
        }));
        return;
      }

      // Per-zone `requireFlag` — additional filter beyond item type,
      // used for the adornment zone (only items flagged as adornments
      // are eligible: rings, amulets, sigils, talismans, charms, etc.).
      if (zoneDef?.requireFlag) {
        const hasFlag = !!item.getFlag("flail", zoneDef.requireFlag);
        if (!hasFlag) {
          ui.notifications?.warn(game.i18n.format("FLAIL.Notify.ZoneRejectsMissingFlag", {
            zone: game.i18n.localize(zoneDef.label),
            item: item.name
          }));
          return;
        }
      }

      // Multi-slot items (two-handed weapons, full plate mail, etc.)
      // need the next slot(s) to exist and be free.
      const span = item.system?.slotsRequired ?? 1;
      if (span > 1) {
        const check = this.#checkMultiSlotFit(item, zone, slotIndex, span);
        if (!check.ok) {
          ui.notifications?.warn(check.message);
          return;
        }
      }

      // Drop on its own slot — no-op.
      const sameSpot = item.system.location === zone
                    && item.system.slotIndex === slotIndex;
      if (sameSpot) return;

      // If the destination already holds another item, swap by moving
      // the resident into the dragged item's old position. Single batched
      // update so the two moves commit atomically.
      const occupant = this.actor.items.find(i =>
        i.id !== item.id
        && i.system?.location === zone
        && i.system?.slotIndex === slotIndex
      );
      if (occupant) {
        // Refuse the swap if the resident's type wouldn't be allowed in
        // the source zone (e.g. trying to swap a torch from satchel into
        // an instrument slot would push the instrument back into satchel —
        // fine — but the inverse case where the occupant can't legally
        // live in the source zone needs guarding).
        const sourceDef = FLAIL.inventory.zones[item.system.location];
        if (sourceDef?.allowedTypes?.length
          && !sourceDef.allowedTypes.includes(occupant.type)) {
          ui.notifications?.warn(game.i18n.format("FLAIL.Notify.ZoneRejectsType", {
            zone: game.i18n.localize(sourceDef.label),
            type: occupant.type
          }));
          return;
        }
        const fromZone  = item.system.location;
        const fromIndex = item.system.slotIndex ?? 0;
        await this.actor.updateEmbeddedDocuments("Item", [
          { _id: item.id,     "system.location": zone,     "system.slotIndex": slotIndex },
          { _id: occupant.id, "system.location": fromZone, "system.slotIndex": fromIndex }
        ]);
        return;
      }

      // Empty target — straight move.
      await item.update({ "system.location": zone, "system.slotIndex": slotIndex });
      return;
    }

    // ---- External drag — bringing a new item onto the actor. ----
    // Strict empty-only rule.
    if (target?.classList.contains("is-occupied")) return;

    const item = await Item.implementation.fromDropData(payload);
    if (!item) return;

    // Per-zone type restriction. Dragover couldn't check this for external
    // drags (no payload access there), so this is the first chance to
    // enforce it.
    if (allowedTypes?.length && !allowedTypes.includes(item.type)) {
      ui.notifications?.warn(game.i18n.format("FLAIL.Notify.ZoneRejectsType", {
        zone: game.i18n.localize(zoneDef.label),
        type: item.type
      }));
      return;
    }

    // Per-zone `requireFlag` — additional filter beyond item type
    // (see adornment zone in FLAIL.inventory.zones).
    if (zoneDef?.requireFlag) {
      const hasFlag = !!item.getFlag("flail", zoneDef.requireFlag);
      if (!hasFlag) {
        ui.notifications?.warn(game.i18n.format("FLAIL.Notify.ZoneRejectsMissingFlag", {
          zone: game.i18n.localize(zoneDef.label),
          item: item.name
        }));
        return;
      }
    }

    // Multi-slot check — external drop needs room for the whole item.
    const extSpan = item.system?.slotsRequired ?? 1;
    if (extSpan > 1) {
      const check = this.#checkMultiSlotFit(item, zone, slotIndex, extSpan);
      if (!check.ok) {
        ui.notifications?.warn(check.message);
        return;
      }
    }

    const data = item.toObject();
    data.system ??= {};
    data.system.location = zone;
    data.system.slotIndex = slotIndex;
    await this.actor.createEmbeddedDocuments("Item", [data]);
  }

  /* -------------------------------------------- */
  /*  Action handlers                             */
  /* -------------------------------------------- */

  static async #onRollSave(event, target) {
    const attribute = target.dataset.attribute;
    if (!attribute) return;

    // Save modifier shortcuts: Shift = +1 advantage, Ctrl/Meta = -1
    // disadvantage, plain click = normal roll. No dialog on saves —
    // the modifier-dice dialog is only offered on To Hit rolls.
    const adv = event.shiftKey ? 1
              : (event.ctrlKey || event.metaKey) ? -1
              : 0;
    return this.actor.rollSave(attribute, { advantage: adv });
  }

  /**
   * Prompt the player to choose a signed integer that adjusts the
   * number of dice in a To Hit roll. Positive = extra dice added to
   * the weapon's pool, negative = fewer dice. The dice helper clamps
   * the final pool to a minimum of 1 die regardless of how deeply
   * negative the modifier is; UI-side we still clamp the input to
   * [-3, +3] since ±3 is comfortably beyond what any weapon pool
   * needs in practice, and the existing Exhausted stacking already
   * reduces the pool separately.
   *
   * Returns the chosen integer, or null if the player cancels.
   */
  /**
   * Modify-to-hit dialog opened by Alt-click on any attack button.
   * The player picks a signed integer modifier for the attack's dice
   * pool (-3…+3). For Warriors, an "Extraordinary Feat" checkbox is
   * also shown — when ticked, the Extraordinary Feat mechanic fires
   * instead of a plain attack (roll attack + STR/DEX save, verdict
   * card summarises).
   *
   * The checkbox is naturally reset to unchecked every time the
   * dialog opens, since DialogV2.wait constructs fresh markup on
   * each call — no state is persisted between rolls.
   *
   * @param {string} weaponName
   * @param {boolean} isWarrior   Show the feat checkbox iff true.
   * @returns {Promise<{modifier:number, feat:boolean}|null>}
   *   Object on Roll, `null` on Cancel.
   */
  static async #promptAttackModifier(weaponName, isWarrior = false) {
    const featRow = isWarrior ? `
        <div class="form-group flail-modifier-row flail-feat-row">
          <label for="flail-th-feat">
            <input id="flail-th-feat" type="checkbox" name="feat" />
            ${game.i18n.localize("FLAIL.Warrior.FeatCheckboxLabel")}
          </label>
        </div>
        <p class="flail-modifier-hint flail-feat-hint">
          ${game.i18n.localize("FLAIL.Warrior.FeatCheckboxHint")}
        </p>` : "";

    const content = `
      <form class="flail-modifier-form">
        <p class="flail-modifier-prompt">
          ${game.i18n.format("FLAIL.ToHit.ModifierDialog.Prompt", { weapon: weaponName })}
        </p>
        <div class="form-group flail-modifier-row">
          <label for="flail-th-mod">${game.i18n.localize("FLAIL.ToHit.ModifierDialog.AdvLabel")}</label>
          <input id="flail-th-mod" type="number" name="modifier" min="-3" max="3" step="1" value="0" autofocus />
        </div>
        <p class="flail-modifier-hint">
          ${game.i18n.localize("FLAIL.ToHit.ModifierDialog.Hint")}
        </p>
        ${featRow}
      </form>
    `;

    const chosen = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.format("FLAIL.ToHit.ModifierDialog.Title", { weapon: weaponName }),
        icon: "fas fa-dice-d6"
      },
      content,
      buttons: [
        {
          action: "roll",
          label: game.i18n.localize("FLAIL.ToHit.ModifierDialog.Roll"),
          icon: "fas fa-dice-d6",
          default: true,
          callback: (event, btn, dialog) => {
            const form = dialog.element.querySelector("form");
            let val = parseInt(form.elements.modifier?.value, 10);
            if (Number.isNaN(val)) val = 0;
            // Read the checkbox directly from the DOM — unchecked
            // boxes don't submit form data, so a form.elements read
            // wouldn't tell us the state reliably.
            const featBox = form.querySelector('input[name="feat"]');
            const feat = !!(featBox && featBox.checked);
            return {
              modifier: Math.max(-3, Math.min(3, val)),
              feat
            };
          }
        },
        {
          action: "cancel",
          label: game.i18n.localize("FLAIL.ToHit.ModifierDialog.Cancel"),
          icon: "fas fa-times",
          callback: () => null
        }
      ],
      rejectClose: false,
      submit: v => v
    });

    return (chosen && typeof chosen === "object") ? chosen : null;
  }

  static async #onRollAttack(event, target) {
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;

    // While shapeshifted, only the beast's natural weapons can be
    // used to attack — anything the human form was carrying is
    // locked. The button is disabled at render time, but this guard
    // catches macro/keyboard/programmatic invocations too.
    const isShifted = !!this.actor.system.shapeshift?.active;
    const isBeastAttack = !!item.getFlag("flail", "beastAttack");
    if (isShifted && !isBeastAttack) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.WeaponLockedInBeastForm"));
      return;
    }

    // Alt held → open the dice-modifier dialog so the player can pick
    // any signed integer to add to the To Hit dice pool. For Warriors
    // the dialog also offers an "Extraordinary Feat" checkbox that
    // routes the roll through the feat mechanic instead. Otherwise
    // the inline shortcuts apply:
    //   Shift    → +1 die (advantage)
    //   Ctrl/Meta → -1 die (disadvantage)
    //   plain click → 0 (no modifier)
    if (event.altKey) {
      const isWarrior = this.actor.system.class === "warrior";
      const chosen = await FlailCharacterSheet.#promptAttackModifier(item.name, isWarrior);
      if (chosen === null) return;      // player cancelled
      if (chosen.feat) {
        return this.actor.rollExtraordinaryFeat(item, {
          attackAdvantage: chosen.modifier
        });
      }
      return this.actor.rollAttack(item, { advantage: chosen.modifier });
    }

    const adv = event.shiftKey ? 1
              : (event.ctrlKey || event.metaKey) ? -1
              : 0;
    return this.actor.rollAttack(item, { advantage: adv });
  }

  /**
   * Warrior — Iron Fist quick-attack button on the Abilities tab.
   * Modifier semantics match the standard attack shortcuts:
   *   Shift    → +1 die
   *   Ctrl/Meta → -1 die
   *   Alt      → open the modifier dialog
   */
  static async #onRollIronFistAttack(event, target) {
    if (event.altKey) {
      const chosen = await FlailCharacterSheet.#promptAttackModifier(
        game.i18n.localize("FLAIL.Warrior.IronFistLabel"),
        false   // Extraordinary Feat + Iron Fist don't mix — the feat
                // requires a weapon Item and Iron Fist has none.
      );
      if (chosen === null) return;
      return this.actor.rollIronFistAttack({ advantage: chosen.modifier });
    }
    const adv = event.shiftKey ? 1
              : (event.ctrlKey || event.metaKey) ? -1
              : 0;
    return this.actor.rollIronFistAttack({ advantage: adv });
  }

  /**
   * Warrior — Weathered special skill toggle. Flips the once-per-
   * session availability flag between true (available) and false
   * (unavailable). Manual toggle only — the flag doesn't reset
   * automatically at session start.
   */
  static async #onToggleWeathered(event, target) {
    const cur = !!this.actor.system.weatheredAvailable;
    await this.actor.update({ "system.weatheredAvailable": !cur });
  }

  /**
   * Wizard — flip the Master Apprenticeship lock. Permissions:
   *   - Unlocked → locked: any owner may click (player locks in choice).
   *   - Locked   → unlocked: GM only.
   * If a player tries to unlock, we refuse with a toast rather than
   * silently failing.
   */
  static async #onToggleWizardMasterLock(event, target) {
    const cur = !!this.actor.system.classOptions?.wizardMasterLocked;
    if (cur && !game.user.isGM) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.WizardMasterUnlockGmOnly"));
      return;
    }
    await this.actor.update({ "system.classOptions.wizardMasterLocked": !cur });
  }

  /**
   * Wizard — Read Magic special skill. Fires an INT save with a
   * "Read Magic" flavour so the resulting save chat card is clearly
   * labelled. Modifier click semantics match other save rolls:
   *   plain click → base
   *   Shift-click → advantage (+1 die)
   *   Ctrl/Meta   → disadvantage (-1 die)
   */
  static async #onReadMagic(event, target) {
    if (this.actor.type !== "character" || this.actor.system.class !== "wizard") {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ReadMagicWizardOnly"));
      return;
    }
    const adv = event.shiftKey ? 1
              : (event.ctrlKey || event.metaKey) ? -1
              : 0;
    return this.actor.rollSave("int", {
      advantage: adv,
      flavor: game.i18n.localize("FLAIL.Wizard.ReadMagicFlavor")
    });
  }

  /**
   * Play an instrument from its slot. Shift = advantage on the CHA save,
   * Ctrl/Meta = disadvantage. Same modifier convention as attack rolls.
   */
  static async #onRollInstrument(event, target) {
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const advantage = event.shiftKey ? 1 : event.ctrlKey || event.metaKey ? -1 : 0;
    return this.actor.rollInstrument(item, { advantage });
  }

  /**
   * Clear the `usedOut` flag on an instrument that was played to a
   * fail or fumble. Used when a new combat or social situation
   * begins mid-session without a rest — the Bard can manually
   * un-block the instrument. Any rest also clears this automatically
   * (see rest.mjs), so most groups won't need to click this.
   */
  static async #onResetInstrumentUsedOut(event, target) {
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    await item.setFlag("flail", "usedOut", false);
  }

  /**
   * Cast a dark spell. Opens a dialog asking how much spirit to spend
   * (capped at min(INT, current spirit)), then defers to rollDarkSpell
   * for the dice + side-effect resolution.
   */
  static async #onCastDarkSpell(event, target) {
    const itemId = target.dataset.itemId;
    const spell = this.actor.items.get(itemId);
    if (!spell) return;

    const intVal     = this.actor.system.attributes?.int?.current ?? 0;
    const spiritCur  = this.actor.system.resource?.value ?? 0;
    const maxSpirit  = Math.min(intVal, spiritCur);

    if (maxSpirit < 1) {
      ui.notifications?.warn(
        game.i18n.localize("FLAIL.Notify.NoSpiritToCast")
      );
      return;
    }

    // Build the dropdown options: 1..maxSpirit. Default to suggestedDice
    // if it's within range, otherwise the maximum.
    const suggested = spell.system?.suggestedDice ?? 1;
    const defaultPick = Math.min(Math.max(1, suggested), maxSpirit);
    const optionsHtml = Array.from({ length: maxSpirit }, (_, i) => {
      const v = i + 1;
      const sel = v === defaultPick ? "selected" : "";
      return `<option value="${v}" ${sel}>${v}</option>`;
    }).join("");

    const content = `
      <form class="cast-dark-spell-form">
        <p class="cast-spell-spell">
          <strong>${spell.name}</strong>
        </p>
        <p class="cast-spell-state">
          ${game.i18n.localize("FLAIL.DarkArts.Dialog.SpiritCur")}: <strong>${spiritCur}</strong>
          · ${game.i18n.localize("FLAIL.Attribute.Int.abbr")}: <strong>${intVal}</strong>
          · ${game.i18n.localize("FLAIL.DarkArts.Dialog.Cap")}: <strong>${maxSpirit}</strong>
        </p>
        <div class="form-group">
          <label for="flail-cast-spirit">${game.i18n.localize("FLAIL.DarkArts.Dialog.SpiritLabel")}</label>
          <select id="flail-cast-spirit" name="spirit">${optionsHtml}</select>
        </div>
        <p class="cast-spell-warning">
          <i class="fas fa-exclamation-triangle"></i>
          ${game.i18n.localize("FLAIL.DarkArts.Dialog.Warning")}
        </p>
      </form>
    `;

    const result = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.format("FLAIL.DarkArts.Dialog.Title", { spell: spell.name }),
        icon: "fas fa-skull"
      },
      content,
      buttons: [
        {
          action: "cast",
          label: game.i18n.localize("FLAIL.DarkArts.Dialog.Cast"),
          icon: "fas fa-skull",
          default: true,
          callback: (event, btn, dialog) => {
            const form = dialog.element.querySelector("form");
            return Number(form.elements.spirit?.value ?? 0);
          }
        },
        {
          action: "cancel",
          label: game.i18n.localize("FLAIL.DarkArts.Dialog.Cancel"),
          icon: "fas fa-times"
        }
      ],
      // Cancel via X-button or Escape closes without submitting; null
      // result on rejectClose:false signals "do nothing".
      rejectClose: false,
      submit: (value) => value
    });

    if (!result || !Number.isInteger(result) || result < 1) return;

    return rollDarkSpell({ actor: this.actor, spell, spirit: result });
  }

  /**
   * Cast a wizard spell (Master Spellbook). Prompts the player to
   * pick how much mana to spend (1..currentMana). The number of dice
   * rolled equals the mana spent. Empty pool refuses outright. The
   * roll, substitution, risk determination, and chat card are all
   * handled by rollWizardSpell.
   */
  static async #onCastWizardSpell(event, target) {
    const itemId = target.dataset.itemId;
    const spell  = this.actor.items.get(itemId);
    if (!spell) return;

    const manaCur = this.actor.system.resource?.value ?? 0;
    const manaMax = this.actor.system.resource?.max   ?? 0;

    if (manaCur < 1) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NoManaAvailable"));
      return;
    }

    // Options 1..manaCur. Default to suggestedDice if within range,
    // otherwise the maximum available.
    const suggested   = spell.system?.suggestedDice ?? 1;
    const defaultPick = Math.min(Math.max(1, suggested), manaCur);
    const optionsHtml = Array.from({ length: manaCur }, (_, i) => {
      const v = i + 1;
      const sel = v === defaultPick ? "selected" : "";
      return `<option value="${v}" ${sel}>${v}</option>`;
    }).join("");

    const content = `
      <form class="cast-wizard-spell-form">
        <p class="cast-spell-spell">
          <strong>${spell.name}</strong>
        </p>
        <p class="cast-spell-state">
          ${game.i18n.localize("FLAIL.Wizard.CastDialogManaCur")}: <strong>${manaCur}</strong> / ${manaMax}
        </p>
        <div class="form-group">
          <label for="flail-cast-mana">${game.i18n.localize("FLAIL.Wizard.CastDialogManaLabel")}</label>
          <select id="flail-cast-mana" name="mana">${optionsHtml}</select>
        </div>
        <p class="cast-spell-warning">
          <i class="fas fa-exclamation-triangle"></i>
          ${game.i18n.localize("FLAIL.Wizard.CastDialogWarning")}
        </p>
      </form>
    `;

    const result = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.format("FLAIL.Wizard.CastDialogTitle", { spell: spell.name }),
        icon: "fas fa-hat-wizard"
      },
      content,
      buttons: [
        {
          action: "cast",
          label: game.i18n.localize("FLAIL.Wizard.CastDialogCast"),
          icon: "fas fa-hat-wizard",
          default: true,
          callback: (event, btn, dialog) => {
            const form = dialog.element.querySelector("form");
            return Number(form.elements.mana?.value ?? 0);
          }
        },
        {
          action: "cancel",
          label: game.i18n.localize("FLAIL.Wizard.CastDialogCancel"),
          icon: "fas fa-times"
        }
      ],
      rejectClose: false,
      submit: (value) => value
    });

    if (!result || !Number.isInteger(result) || result < 1) return;

    return rollWizardSpell({ actor: this.actor, spell, mana: result });
  }

  /**
   * Release a damage gadget from the Tinkerer's Gadget Belt. The
   * dice module handles the roll, mechanic dispatch (buzzsaw
   * ricochet, shock-bolas stun, delayed explosions, etc.) and posts
   * a chat card with an Apply Damage button. No dialog — damage
   * gadgets don't take a spend parameter; they're single-use per
   * long rest and mark usage on release.
   */
  static async #onUseDamageGadget(event, target) {
    const itemId = target.dataset.itemId;
    const gadget = this.actor.items.get(itemId);
    if (!gadget) return;
    return releaseDamageGadget({ actor: this.actor, gadget });
  }

  /**
   * Open a picker for the character portrait. When the Tokenizer
   * module (`vtta-tokenizer`) is installed and active, the default
   * click launches its interactive editor via `Tokenizer.tokenizeActor`
   * — the same convention used by the D&D 5e sheet and most other
   * systems that ship with Tokenizer support. Shift-click always
   * falls through to the native FilePicker so a player who just wants
   * to pick a static image can bypass Tokenizer.
   *
   * If Tokenizer isn't installed, both click and shift-click open
   * the FilePicker directly. Guards against non-editable sheets.
   */
  static async #onEditPortrait(event, target) {
    if (!this.isEditable) return;

    const forceFilePicker = event?.shiftKey === true;
    const tokenizerModule = game.modules?.get("vtta-tokenizer");
    const tokenizerActive = !!tokenizerModule?.active;

    if (tokenizerActive && !forceFilePicker) {
      // Prefer the module's api surface (stable across versions);
      // fall back to the window global if the api namespace is
      // unavailable in older Tokenizer builds.
      const api = tokenizerModule.api ?? globalThis.Tokenizer;
      if (api?.tokenizeActor) {
        try {
          return await api.tokenizeActor(this.actor);
        } catch (err) {
          console.error("FLAIL | Tokenizer launch failed", err);
          // Fall through to FilePicker on error.
        }
      }
    }

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

  /**
   * Toggle the "used today" flag on a JOAT talent. Talent mechanics
   * aren't auto-executed (Cutthroat talents are situational and vary
   * widely) — this handler exists so the Bard's player can mark the
   * ability spent for the day. A follow-up chat card posts to record
   * the fact for the group.
   */
  static async #onToggleJoatUsed(event, target) {
    const itemId = target.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const cur = !!item.getFlag("flail", "usedToday");
    await item.setFlag("flail", "usedToday", !cur);
    if (!cur) {
      // Just flipped to used — announce it.
      await ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        content: `<div class="flail-chat-card joat-mark-card">
          <p><strong>${this.actor.name}</strong> uses <em>${item.name}</em>
          (Jack of All Trades).</p>
          <p class="joat-desc">${item.system?.description ?? ""}</p>
        </div>`
      });
    }
  }

  /**
   * Cast a wizard spell picked up via Jack of All Trades. Per FLAIL:
   * "the max amount of mana spent equals the Bard's current level
   * (miscasting follows the same rules that apply to Wizards)."
   * Bards have no mana pool, so the pick is 1..level rather than
   * gated by any resource. The gadget's usedToday flag is set on
   * successful release; can only cast once per day per spell.
   */
  static async #onCastJoatSpell(event, target) {
    const itemId = target.dataset.itemId;
    const spell = this.actor.items.get(itemId);
    if (!spell || spell.type !== "spell") return;

    const alreadyUsed = !!spell.getFlag("flail", "usedToday");
    if (alreadyUsed) {
      ui.notifications?.warn(
        game.i18n.format("FLAIL.Notify.JoatSpellAlreadyUsed", { name: spell.name })
      );
      return;
    }

    const level = this.actor.system.level ?? 1;
    const suggested = spell.system?.suggestedDice ?? 1;
    const defaultPick = Math.min(Math.max(1, suggested), level);
    const optionsHtml = Array.from({ length: level }, (_, i) => {
      const v = i + 1;
      const sel = v === defaultPick ? "selected" : "";
      return `<option value="${v}" ${sel}>${v}</option>`;
    }).join("");

    const content = `
      <form class="cast-wizard-spell-form">
        <p class="cast-spell-spell"><strong>${spell.name}</strong></p>
        <p class="cast-spell-state">
          ${game.i18n.localize("FLAIL.Wizard.CastDialogManaCur")}:
          <strong>${level}</strong> (Bard level cap — no mana pool)
        </p>
        <div class="form-group">
          <label for="flail-cast-mana">${game.i18n.localize("FLAIL.Wizard.CastDialogManaLabel")}</label>
          <select id="flail-cast-mana" name="mana">${optionsHtml}</select>
        </div>
        <p class="cast-spell-warning">
          <i class="fas fa-exclamation-triangle"></i>
          ${game.i18n.localize("FLAIL.Wizard.CastDialogWarning")}
        </p>
      </form>
    `;

    const result = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.format("FLAIL.Wizard.CastDialogTitle", { spell: spell.name }),
        icon: "fas fa-hat-wizard"
      },
      content,
      buttons: [
        {
          action: "cast",
          label: game.i18n.localize("FLAIL.Wizard.CastDialogCast"),
          icon: "fas fa-hat-wizard",
          default: true,
          callback: (event, btn, dialog) => {
            const form = dialog.element.querySelector("form");
            return Number(form.elements.mana?.value ?? 0);
          }
        },
        {
          action: "cancel",
          label: game.i18n.localize("FLAIL.Wizard.CastDialogCancel"),
          icon: "fas fa-times"
        }
      ],
      rejectClose: false,
      submit: (value) => value
    });

    if (!result || !Number.isInteger(result) || result < 1) return;

    // Mark as used BEFORE casting so an early error can't leave a
    // "free" reroll opportunity.
    await spell.setFlag("flail", "usedToday", true);
    return rollWizardSpell({ actor: this.actor, spell, mana: result, skipManaPool: true });
  }

  /**
   * Cast a divine prayer. Verifies the cleric is carrying or wearing
   * their holy symbol, then defers to rollPrayer for the LUCK save +
   * fumble-threshold mechanic. No dialog — prayers don't take a
   * resource-spend parameter like dark spells do.
   */
  static async #onCastPrayer(event, target) {
    const itemId = target.dataset.itemId;
    const prayer = this.actor.items.get(itemId);
    if (!prayer) return;

    // The template already gates the cast button on hasHolySymbol so the
    // button shouldn't render when the symbol is absent. Defensive
    // recheck anyway in case the player's state changed mid-render.
    const religionKey = this.actor.system.classOptions?.religion ?? "";
    if (!religionKey) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.PickReligionFirst"));
      return;
    }

    const HOLY_KEYWORDS = {
      brotherhood:  ["wooden cross", "cross"],
      crusade:      ["mutton crest", "mutton tunic"],
      shadowDemon:  ["horned helmet", "horned helm"],
      verdantGrove: ["oak leaf", "leaf medallion"]
    };
    const carried = new Set(["hands", "body"]);
    const hasSymbol = this.actor.items.some(i => {
      if (!carried.has(i.system?.location)) return false;
      const lower = (i.name ?? "").toLowerCase();
      if (lower.includes("holy symbol")) return true;
      return (HOLY_KEYWORDS[religionKey] ?? []).some(k => lower.includes(k));
    });
    if (!hasSymbol) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NoHolySymbol"));
      return;
    }

    return rollPrayer({ actor: this.actor, prayer });
  }

  /**
   * Lay on Hands — Cleric special skill. Reads the user's targeted
   * tokens to find the heal target, then defers to rollLayOnHands.
   *
   * Target resolution: the user must have a token targeted via Foundry's
   * standard targeting (press T over a token, or right-click → Target).
   * If multiple tokens are targeted, the first is used and a warning
   * notes the rest were ignored — Lay on Hands is a single-target touch.
   */
  static async #onLayOnHands(event, target) {
    const targeted = [...game.user.targets];
    if (!targeted.length) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.LayOnHandsNoTarget"));
      return;
    }
    if (targeted.length > 1) {
      ui.notifications?.info(game.i18n.localize("FLAIL.Notify.LayOnHandsMultipleTargets"));
    }
    const targetActor = targeted[0]?.actor;
    if (!targetActor) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.LayOnHandsNoActor"));
      return;
    }

    return rollLayOnHands({ actor: this.actor, target: targetActor });
  }

  /**
   * Miracle Call — once-per-session Cleric power. Opens a dialog asking
   * for the word count of the spoken wish, rolls Nd6, and on each 6
   * triggers one independent God's Wrath d10 roll. The miracle itself
   * always occurs — the GM resolves it narratively from the player's
   * spoken wish; this code just handles the mechanical fallout.
   *
   * The button on the sheet is gated on `system.miracleCallUsed`, so by
   * the time we get here the flag is false; defensive recheck anyway.
   */
  static async #onMiracleCall(event, target) {
    if (this.actor.system.miracleCallUsed) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.MiracleCallSpent"));
      return;
    }

    const content = `
      <form class="miracle-call-form">
        <p class="miracle-prompt">
          ${game.i18n.localize("FLAIL.MiracleCall.Dialog.Prompt")}
        </p>
        <div class="form-group">
          <label for="flail-miracle-words">${game.i18n.localize("FLAIL.MiracleCall.Dialog.WordsLabel")}</label>
          <input id="flail-miracle-words" type="number" name="words" min="1" step="1" value="5" autofocus />
        </div>
        <p class="miracle-warning">
          <i class="fas fa-exclamation-triangle"></i>
          ${game.i18n.localize("FLAIL.MiracleCall.Dialog.Warning")}
        </p>
      </form>
    `;

    const wordCount = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.localize("FLAIL.MiracleCall.Dialog.Title"),
        icon: "fas fa-pray"
      },
      content,
      buttons: [
        {
          action: "call",
          label: game.i18n.localize("FLAIL.MiracleCall.Dialog.Call"),
          icon: "fas fa-pray",
          default: true,
          callback: (event, btn, dialog) => {
            const form = dialog.element.querySelector("form");
            return Number(form.elements.words?.value ?? 0);
          }
        },
        {
          action: "cancel",
          label: game.i18n.localize("FLAIL.DarkArts.Dialog.Cancel"),
          icon: "fas fa-times"
        }
      ],
      rejectClose: false,
      submit: (value) => value
    });

    if (!wordCount || !Number.isInteger(wordCount) || wordCount < 1) return;

    return rollMiracleCall({ actor: this.actor, wordCount });
  }

  /**
   * Reset Miracle Call — clears the once-per-session flag so the button
   * becomes available again. Player calls this manually at session start;
   * there's no automated session-detection in the system.
   */
  static async #onResetMiracleCall(event, target) {
    await this.actor.update({ "system.miracleCallUsed": false });
    ui.notifications?.info(game.i18n.localize("FLAIL.Notify.MiracleCallReset"));
  }

  /**
   * Short rest — defers to resolveRest, no confirmation. Low impact so
   * a stray click is recoverable (HP doesn't decrease, just rolls a d4
   * and heals up to max).
   */
  static async #onRestShort(event, target) {
    return resolveRest({ actor: this.actor, kind: "short" });
  }

  /**
   * Long rest — defers to resolveRest, no confirmation. Heals d4+4,
   * clears longRest conditions (Drained, Exhausted), and resets the
   * Cleric prayer fumble threshold + Bard JoT slots.
   */
  static async #onRestLong(event, target) {
    return resolveRest({ actor: this.actor, kind: "long" });
  }

  /**
   * Full rest — confirms first. A week of in-fiction downtime is a
   * narrative commitment, and the heal-to-full + condition wipe is
   * weighty enough that an accidental click should be guarded.
   */
  static async #onRestFull(event, target) {
    const confirmed = await foundry.applications.api.DialogV2.confirm({
      window: { title: game.i18n.localize("FLAIL.Rest.Full.Title") },
      content: `<p>${game.i18n.localize("FLAIL.Rest.Full.Confirm")}</p>`,
      rejectClose: false
    });
    if (!confirmed) return;
    return resolveRest({ actor: this.actor, kind: "full" });
  }

  /**
   * Adjust guild tokens by a delta (+/- buttons on the Cutthroat tracker).
   * Clamps to [0, level]. The token tracker's max is dynamic (= level),
   * so a level-up automatically widens the band.
   */
  static async #onAdjustGuildTokens(event, target) {
    const delta = Number(target.dataset.delta ?? 0);
    const current = this.actor.system.guildTokens ?? 0;
    const max = this.actor.system.level ?? 1;
    const next = Math.max(0, Math.min(max, current + delta));
    if (next === current) return;
    await this.actor.update({ "system.guildTokens": next });
  }

  /**
   * Spend a guild token. Requires the sigil to be worn or carried,
   * AND at least one token available. Posts a brief chat card noting
   * the spend; specific named token actions can be layered on later.
   */
  static async #onSpendGuildToken(event, target) {
    // Sigil gate — recompute defensively in case context has shifted
    // since the last render.
    if (!this._hasSigilEquipped()) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NoSigil"));
      return;
    }
    const current = this.actor.system.guildTokens ?? 0;
    if (current < 1) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NoGuildTokens"));
      return;
    }
    await this.actor.update({ "system.guildTokens": current - 1 });

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: `
        <div class="flail-card cast-card guild-token-card outcome-success">
          <header class="card-header">
            <img class="actor-img" src="${this.actor.img}" />
            <span class="actor-name">${this.actor.name}</span>
            <h3><i class="fas fa-hand-fist"></i> ${game.i18n.localize("FLAIL.GuildTokens.SpendTitle")}</h3>
          </header>
          <div class="cast-description">
            ${game.i18n.format("FLAIL.GuildTokens.SpendBody", {
              before: current, after: current - 1, max: this.actor.system.level ?? 1
            })}
          </div>
        </div>`,
      flags: { flail: { guildTokenSpend: { before: current, after: current - 1 } } }
    });
  }

  /**
   * Reset guild tokens to level. Player calls this at session start.
   * No automated session detection in the system — same pattern as the
   * Cleric's Miracle Call reset.
   */
  static async #onResetGuildTokens(event, target) {
    const max = this.actor.system.level ?? 1;
    await this.actor.update({ "system.guildTokens": max });
    ui.notifications?.info(game.i18n.format("FLAIL.Notify.GuildTokensReset", { n: max }));
  }

  /**
   * Roll the save associated with a thieving talent. Talents grant
   * advantage on the appropriate save when the action is attempted —
   * so this defers to actor.rollSave with `advantage: 1` and a flavor
   * line naming the talent. Guarded by the marked check on the
   * template, but defensive recheck anyway.
   */
  static async #onRollTalent(event, target) {
    const key = target.dataset.talent;
    if (!key) return;
    const talent = FLAIL.cutthroatTalents.find(t => t.key === key);
    if (!talent || !talent.save) return;
    const marked = this.actor.system.thievingTalents?.[key];
    if (!marked) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.TalentNotSelected"));
      return;
    }
    return this.actor.rollSave(talent.save, {
      advantage: 1,
      flavor: game.i18n.format("FLAIL.Talents.Flavor", { name: talent.label })
    });
  }

  /**
   * Add a thieving talent — flip its boolean in
   * `system.thievingTalents.<key>` to true. Re-render will move the
   * talent from the Add tab to the Current tab automatically because
   * the sheet context splits by the marked flag.
   */
  static async #onAddTalent(event, target) {
    const key = target.dataset.talent;
    if (!key) return;
    if (this.actor.system.thievingTalents?.[key]) return;  // already selected
    await this.actor.update({ [`system.thievingTalents.${key}`]: true });
  }

  /**
   * Remove a thieving talent — flip its boolean to false. Same
   * re-render behaviour as #onAddTalent, in reverse.
   */
  static async #onRemoveTalent(event, target) {
    const key = target.dataset.talent;
    if (!key) return;
    if (!this.actor.system.thievingTalents?.[key]) return;  // already unmarked
    await this.actor.update({ [`system.thievingTalents.${key}`]: false });
  }

  /**
   * Switch the active talent tab ("current" vs "add") on the Cutthroat
   * talents card. Same pattern as the main #onSelectTab — update the
   * dataset attribute, persist on the instance, no re-render needed.
   */
  static async #onSwitchTalentTab(event, target) {
    const tab = target.dataset.talentTab;
    if (!tab) return;
    this._activeTalentTab = tab;

    const card = target.closest(".talents-card");
    if (!card) return;
    card.dataset.activeTalentTab = tab;
    for (const btn of card.querySelectorAll(".talents-tab-btn")) {
      btn.classList.toggle("is-active", btn.dataset.talentTab === tab);
    }
  }

  /**
   * Activate a Druid primal gift via its label-button on the class
   * tab. Dispatched by kingdom + gift key from the dataset. Currently
   * only Regeneration is wired; new activatable gifts should add a
   * branch here plus an entry in ACTIVATABLE_GIFTS in _prepareContext.
   *
   * The click is a no-op if the actor doesn't actually have the gift
   * selected — a defensive check against stale UI or race conditions.
   */
  static async #onActivateGift(event, target) {
    const kingdom = target.dataset.giftKingdom;
    const key = target.dataset.giftKey;
    if (!kingdom || !key) return;

    // Sanity: the gift must actually be selected.
    if (!this.actor.system.primalGifts?.[kingdom]?.[key]) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.GiftNotSelected"));
      return;
    }

    // Route to the specific gift's action.
    if (kingdom === "reptile" && key === "regeneration") {
      return FlailCharacterSheet.#activateRegeneration.call(this);
    }

    // Fallthrough — unknown activatable gift; likely a dev oversight.
    ui.notifications?.warn(`FLAIL: no handler wired for ${kingdom}.${key}.`);
  }

  /**
   * Regeneration (Druid Reptile gift) — spend one round to restore
   * 4+d4 HP. Rolls the die, adds it to current HP (capped at max),
   * and posts a chat card so the party sees the healing.
   */
  static async #activateRegeneration() {
    const actor = this.actor;
    const hp = actor.system.hp ?? {};
    const cur = hp.value ?? 0;
    const max = hp.max ?? cur;

    // Roll 4 + d4.
    const roll = new Roll("4 + 1d4");
    await roll.evaluate();
    const healed = roll.total;
    const newHp = Math.min(max, cur + healed);
    const actual = newHp - cur;

    await actor.update({ "system.hp.value": newHp });

    // Chat card. If the roll produced dice, attach them so DSN animates.
    const content = `
      <div class="flail-chat-card regeneration-card">
        <header class="flail-chat-header">
          <i class="fas fa-heart"></i>
          <span>${game.i18n.localize("FLAIL.PrimalGift.Regeneration.Title")}</span>
        </header>
        <div class="flail-chat-body">
          <p>${game.i18n.format("FLAIL.PrimalGift.Regeneration.Body", {
            rolled: healed, actual, newHp, max
          })}</p>
        </div>
      </div>
    `;
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      rolls: [roll],
      content,
      sound: CONFIG.sounds.dice
    });
  }

  /* -------------------------------------------- */
  /*  Druid Shapeshift                            */
  /* -------------------------------------------- */

  /**
   * Start the Shapeshift ability. Prompts for a dice count (1-6),
   * rolls that many d6, determines the beast form from the Druid's
   * dominant primal-gift kingdom (rolling off on tie), then commits
   * the shapeshift state and posts a chat card.
   */
  static async #onShapeshiftStart(event, target) {
    const actor = this.actor;
    if (actor.system.class !== "druid") return;
    if (actor.system.shapeshift?.active) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ShapeshiftAlreadyActive"));
      return;
    }

    // Determine dominant kingdom before rolling — if the Druid has no
    // gifts, there's nothing to shift into.
    const gifts = actor.system.primalGifts ?? {};
    const counts = Object.entries(FLAIL.druidPrimalGifts).map(([key, def]) => {
      const kg = gifts[key] ?? {};
      const count = def.gifts.filter(g => !!kg[g.key]).length;
      return { key, label: def.label, count };
    });
    const maxCount = Math.max(0, ...counts.map(c => c.count));
    if (maxCount === 0) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.ShapeshiftNoGifts"));
      return;
    }

    // Prompt for dice count.
    const diceCount = await FlailCharacterSheet.#promptShapeshiftDice();
    if (diceCount === null) return;   // cancelled

    // Break ties by random roll among tied kingdoms.
    const tied = counts.filter(c => c.count === maxCount);
    let kingdom;
    if (tied.length === 1) {
      kingdom = tied[0].key;
    } else {
      const idx = Math.floor(Math.random() * tied.length);
      kingdom = tied[idx].key;
    }

    // Roll the dice pool.
    const roll = new Roll(`${diceCount}d6`);
    await roll.evaluate();
    const results = roll.dice[0]?.results.map(r => r.result) ?? [];
    const onesCount = results.filter(r => r === 1).length;
    const sixesCount = results.filter(r => r === 6).length;

    const beast = FLAIL.druidBeastForms[kingdom];

    // Snapshot pre-shift HP so revert can restore it verbatim,
    // regardless of what happens to the beast's HP pool in between.
    const preShiftHp    = actor.system.hp?.value ?? 0;
    const preShiftHpMax = actor.system.hp?.max   ?? 0;

    // Snapshot pre-shift token art so revert can restore whatever
    // portrait the player had picked. Prefer the prototype token's
    // src (the canonical value); fall back to actor.img if it's
    // unset for any reason.
    const preShiftTokenImg = actor.prototypeToken?.texture?.src ?? actor.img ?? "";

    // Commit shapeshift state AND swap actor HP to the beast's pool.
    await actor.update({
      "system.shapeshift": {
        active:      true,
        kingdom,
        beastForm:   beast.name,
        diceRolled:  diceCount,
        onesCount,
        sixesCount,
        rollResults: results,
        preShiftHp,
        preShiftHpMax,
        preShiftTokenImg
      },
      "system.hp.value": beast.hp,
      "system.hp.max":   beast.hp
    });

    // Swap the canvas token art to the kingdom graphic. Touches the
    // actor's prototype (so any newly-dropped token gets the beast
    // art) plus every placed token on every scene that belongs to
    // this actor (so mid-scene shifts update immediately without a
    // manual token refresh).
    const kingdomTokenImg = FLAIL.druidKingdomTokens?.[kingdom];
    if (kingdomTokenImg) {
      await FlailCharacterSheet.#swapDruidTokenArt(actor, kingdomTokenImg);
    }

    // Create the beast's attacks as temporary weapon Items on the
    // actor, placed in the "hands" location so they appear in the
    // quick-attacks panel alongside anything the Druid was already
    // wielding. Each attack's To Hit pool is `beast.attacks[i].th`
    // plus the shift's onesCount bonus, baked into the item so
    // rollAttack sees the total without additional logic. Marked
    // with `flags.flail.beastAttack: true` so revert can find and
    // delete them. Special text is stored on the item description
    // for players to reference on the sheet if needed.
    const paw = "icons/creatures/abilities/paw-print-orange.webp";
    const beastWeapons = beast.attacks.map((atk, idx) => ({
      name: `${atk.name} (${beast.name})`,
      type: "weapon",
      img: paw,
      system: {
        th: (atk.th ?? 0) + onesCount,
        damage: atk.dmg ?? 0,
        weaponType: "melee",
        location: "hands",
        slotIndex: idx,
        description: atk.special ?? "",
        category: "beast",
        tags: ["beast"]
      },
      flags: { flail: { beastAttack: true } }
    }));
    if (beastWeapons.length) {
      await actor.createEmbeddedDocuments("Item", beastWeapons);
    }

    // Post the transformation chat card.
    const content = await foundry.applications.handlebars.renderTemplate(
      "systems/flail/templates/chat/shapeshift-start.hbs",
      {
        actor: { name: actor.name, img: actor.img },
        kingdom,
        kingdomLabel: FLAIL.druidPrimalGifts[kingdom]?.label ?? "",
        beast,
        diceRolled: diceCount,
        results,
        onesCount,
        sixesCount,
        tiedKingdoms: tied.length > 1 ? tied.map(t => t.label) : null
      }
    );
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      rolls: [roll],
      content,
      sound: CONFIG.sounds.dice
    });
  }

  /**
   * Swap the token art for a Druid across every surface that renders
   * their image on the canvas:
   *
   *   1. The actor's prototype token — so any NEW token dropped onto
   *      a scene after this call gets the correct art;
   *   2. Every placed token on every scene whose `actorId` matches
   *      the Druid — so already-placed tokens update in-place
   *      mid-scene without a manual drop-and-redrop.
   *
   * Only the GM has permission to write to token documents on scenes
   * they don't own; players can normally update tokens they own. If
   * a permission error surfaces on any specific scene, the update is
   * logged and skipped so a partial failure doesn't abort the whole
   * shapeshift flow.
   *
   * The actor's sheet `img` (portrait) is intentionally NOT touched
   * — that's the character portrait, not the canvas representation.
   * The player picked that image and it shouldn't shift with the
   * beast form.
   *
   * @param {Actor}  actor    The Druid whose art we're swapping.
   * @param {string} newSrc   New image path (kingdom graphic on shift,
   *                          pre-shift snapshot on revert).
   */
  static async #swapDruidTokenArt(actor, newSrc) {
    if (!actor || !newSrc) return;
    console.log(`FLAIL | Swapping Druid token art for ${actor.name} → ${newSrc}`);
    try {
      // Prototype token — actor-level update. Foundry stores it at
      // `prototypeToken.texture.src` in v11+.
      await actor.update({ "prototypeToken.texture.src": newSrc });
    } catch (err) {
      console.error("FLAIL | Failed to update Druid prototype token art", err);
    }

    // Placed tokens on every scene. Every token — linked or unlinked
    // — carries its OWN `texture.src` copy on the scene document,
    // taken from the prototype at drop time. Prototype updates do
    // NOT reactively retexture already-placed tokens, so we walk
    // every scene and update the placed tokens directly. Group
    // updates per-scene into a single updateEmbeddedDocuments call
    // so each scene emits one socket message instead of one per
    // token.
    let updatedCount = 0;
    for (const scene of game.scenes ?? []) {
      const updates = [];
      for (const tok of scene.tokens) {
        if (tok.actorId !== actor.id) continue;
        updates.push({ _id: tok.id, "texture.src": newSrc });
      }
      if (updates.length) {
        try {
          await scene.updateEmbeddedDocuments("Token", updates);
          updatedCount += updates.length;
        } catch (err) {
          console.warn(`FLAIL | Couldn't update token art on scene "${scene.name}"`, err);
        }
      }
    }
    console.log(`FLAIL | Updated ${updatedCount} placed token(s) for ${actor.name}`);
  }

  /**
   * DialogV2 prompt for shift dice count. Returns an integer 1-6 or
   * null on cancel. Uses the same styling as the To Hit modifier
   * dialog (.flail-modifier-form) for visual consistency.
   */
  static async #promptShapeshiftDice() {
    const content = `
      <form class="flail-modifier-form">
        <p class="flail-modifier-prompt">
          ${game.i18n.localize("FLAIL.Shapeshift.DicePrompt")}
        </p>
        <div class="form-group flail-modifier-row">
          <label for="flail-shift-dice">${game.i18n.localize("FLAIL.Shapeshift.DiceLabel")}</label>
          <input id="flail-shift-dice" type="number" name="dice" min="1" max="6" step="1" value="3" autofocus />
        </div>
        <p class="flail-modifier-hint">
          ${game.i18n.localize("FLAIL.Shapeshift.DiceHint")}
        </p>
      </form>
    `;
    const chosen = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.localize("FLAIL.Shapeshift.DialogTitle"),
        icon:  "fas fa-paw"
      },
      content,
      buttons: [
        {
          action: "roll",
          label: game.i18n.localize("FLAIL.Shapeshift.RollButton"),
          icon: "fas fa-dice-d6",
          default: true,
          callback: (event, btn, dialog) => {
            const form = dialog.element.querySelector("form");
            let val = parseInt(form.elements.dice?.value, 10);
            if (Number.isNaN(val)) val = 1;
            return Math.max(1, Math.min(6, val));
          }
        },
        {
          action: "cancel",
          label: game.i18n.localize("FLAIL.Shapeshift.CancelButton"),
          icon:  "fas fa-times",
          callback: () => null
        }
      ],
      rejectClose: false,
      submit: v => v
    });
    return Number.isInteger(chosen) ? chosen : null;
  }

  /**
   * Revert the Druid to human form. If any sixes were rolled at
   * transformation, first prompt the player to pick one attribute
   * per six for the mutation saves. Roll each save (d20 roll-under
   * against the picked attribute's current score). Any failed save
   * permanently reduces that attribute by 1. Then clear the
   * shapeshift state and post a summary card.
   */
  static async #onShapeshiftRevert(event, target) {
    const actor = this.actor;
    const shift = actor.system.shapeshift ?? {};
    if (!shift.active) return;

    // If there are mutation risks, prompt for attribute picks.
    let picks = [];
    if (shift.sixesCount > 0) {
      picks = await FlailCharacterSheet.#promptMutationSaves(actor, shift.sixesCount);
      if (picks === null) return;   // cancelled — stay shifted
    }

    // Roll each save and apply attribute changes.
    const saveOutcomes = [];
    const attrChanges = {};   // running deltas per attribute
    for (const attr of picks) {
      const currentScore = (actor.system.attributes?.[attr]?.current ?? 0)
                          + (attrChanges[attr] ?? 0);   // apply any prior loss this revert
      const r = new Roll("1d20");
      await r.evaluate();
      const rolled = r.total;
      // FLAIL save: 1 = crit success (auto-pass), 20 = fumble (auto-fail),
      // otherwise roll-under attribute score.
      const pass = rolled === 1 ? true
                 : rolled === 20 ? false
                 : rolled <= currentScore;
      if (!pass) attrChanges[attr] = (attrChanges[attr] ?? 0) - 1;
      saveOutcomes.push({
        attribute: attr,
        attributeLabel: game.i18n.localize(FLAIL.attributes[attr].label),
        score: currentScore,
        rolled,
        pass,
        roll: r
      });
    }

    // Delete the beast-attack Items that were created on shift.
    // Filtered by the beastAttack flag so this doesn't touch anything
    // the player added or already had on the sheet.
    const beastItemIds = actor.items
      .filter(i => i.getFlag("flail", "beastAttack"))
      .map(i => i.id);
    if (beastItemIds.length) {
      await actor.deleteEmbeddedDocuments("Item", beastItemIds);
    }

    // Apply attribute deltas, restore pre-shift HP, and clear shapeshift
    // state in one update. The stored preShiftHp is used verbatim —
    // whatever HP the beast form had at revert is discarded. If the
    // beast "died" (HP hit 0), the Druid still comes back with their
    // original HP; this matches the rulebook's silence on beast-form
    // death as anything but a narrative outcome.
    const update = { "system.shapeshift": {
      active: false, kingdom: "", beastForm: "",
      diceRolled: 0, onesCount: 0, sixesCount: 0, rollResults: [],
      preShiftHp: 0, preShiftHpMax: 0, preShiftTokenImg: ""
    }};
    if (shift.preShiftHpMax > 0) {
      update["system.hp.value"] = shift.preShiftHp ?? 0;
      update["system.hp.max"]   = shift.preShiftHpMax;
    }
    for (const [attr, delta] of Object.entries(attrChanges)) {
      // Attribute scores persist on `base`; `current` and `mod` are
      // derived every prepareDerivedData cycle. Writing to `.value`
      // (which doesn't exist on the attribute schema) would be
      // silently discarded — the loss must land on `.base` to
      // survive the next prep.
      const oldScore = actor.system.attributes[attr]?.base ?? 0;
      update[`system.attributes.${attr}.base`] = Math.max(0, oldScore + delta);
    }
    await actor.update(update);

    // Restore the pre-shift token art on prototype + placed tokens.
    // Guard against a missing snapshot (older shapeshifts committed
    // before this field existed on the schema): if the snapshot is
    // empty, fall back to actor.img so we don't leave the Druid
    // rendered as their beast form on the map.
    const restoreImg = shift.preShiftTokenImg || actor.img || "";
    if (restoreImg) {
      await FlailCharacterSheet.#swapDruidTokenArt(actor, restoreImg);
    }

    // Post the revert chat card.
    const beast = shift.kingdom ? FLAIL.druidBeastForms[shift.kingdom] : null;
    const content = await foundry.applications.handlebars.renderTemplate(
      "systems/flail/templates/chat/shapeshift-revert.hbs",
      {
        actor: { name: actor.name, img: actor.img },
        beast,
        beastForm: shift.beastForm,
        saveOutcomes,
        losses: Object.entries(attrChanges).map(([attr, delta]) => ({
          attribute: attr,
          attributeLabel: game.i18n.localize(FLAIL.attributes[attr].label),
          amount: Math.abs(delta)
        })),
        hadSixes: shift.sixesCount > 0
      }
    );
    const rolls = saveOutcomes.map(o => o.roll);
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      rolls,
      content,
      sound: rolls.length ? CONFIG.sounds.dice : undefined
    });
  }

  /**
   * DialogV2 prompt asking the player to pick one attribute per
   * mutation risk. Returns an array of attribute keys (str/dex/etc.)
   * of length `count`, or null on cancel.
   */
  static async #promptMutationSaves(actor, count) {
    const attrs = ["str", "dex", "cha", "int", "luck"];
    // Options built once — attribute abbr + current score.
    const optionRows = attrs.map(a => {
      const abbr = game.i18n.localize(FLAIL.attributes[a].abbr);
      const score = actor.system.attributes?.[a]?.current ?? 0;
      return { value: a, label: `${abbr} (${score})` };
    });

    let rowsHtml = "";
    for (let i = 0; i < count; i++) {
      const opts = optionRows.map(o => `<option value="${o.value}">${o.label}</option>`).join("");
      rowsHtml += `
        <div class="form-group flail-modifier-row">
          <label>${game.i18n.format("FLAIL.Shapeshift.MutationRow", { n: i + 1 })}</label>
          <select name="pick${i}" data-idx="${i}">${opts}</select>
        </div>
      `;
    }

    const content = `
      <form class="flail-modifier-form">
        <p class="flail-modifier-prompt">
          ${game.i18n.format("FLAIL.Shapeshift.MutationPrompt", { n: count })}
        </p>
        ${rowsHtml}
        <p class="flail-modifier-hint">
          ${game.i18n.localize("FLAIL.Shapeshift.MutationHint")}
        </p>
      </form>
    `;

    const chosen = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.localize("FLAIL.Shapeshift.MutationDialogTitle"),
        icon:  "fas fa-dna"
      },
      content,
      buttons: [
        {
          action: "roll",
          label: game.i18n.localize("FLAIL.Shapeshift.RollSavesButton"),
          icon: "fas fa-dice-d20",
          default: true,
          callback: (event, btn, dialog) => {
            const form = dialog.element.querySelector("form");
            const picks = [];
            for (let i = 0; i < count; i++) {
              picks.push(form.elements[`pick${i}`]?.value ?? "str");
            }
            return picks;
          }
        },
        {
          action: "cancel",
          label: game.i18n.localize("FLAIL.Shapeshift.CancelButton"),
          icon:  "fas fa-times",
          callback: () => null
        }
      ],
      rejectClose: false,
      submit: v => v
    });
    return Array.isArray(chosen) ? chosen : null;
  }

  /**
   * Spend a guild token on a specific named action. Resolves the action
   * from the embedded guild Item's `specialActions` array by key,
   * confirms with the player, checks gates (sigil + tokens), then
   * decrements tokens and posts a chat card describing the action.
   *
   * The sigil check is the same as the generic Spend button on the
   * abilities tab — any item containing "sigil" in name, in the hands
   * or body slot — keeping behaviour consistent with Mark of the Guild.
   */
  static async #onSpendGuildAction(event, target) {
    const actionKey = target.dataset.actionKey
                   ?? target.closest("[data-action-key]")?.dataset.actionKey;
    if (!actionKey) return;

    const guildItem = this.actor.items.find(i => i.type === "guild");
    if (!guildItem) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NoGuild"));
      return;
    }
    const action = (guildItem.system?.specialActions ?? []).find(a => a.key === actionKey);
    if (!action) return;

    // Sigil gate (defensive recheck even though the UI may already hide
    // the button — state can shift between render and click).
    if (!this._hasSigilEquipped()) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NoSigil"));
      return;
    }
    const current = this.actor.system.guildTokens ?? 0;
    if (current < 1) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NoGuildTokens"));
      return;
    }

    // Confirmation dialog — shows the action name and rules text so the
    // player can read what they're committing to before the spend.
    const confirmed = await foundry.applications.api.DialogV2.confirm({
      window: {
        title: game.i18n.format("FLAIL.GuildAction.ConfirmTitle", { name: action.name })
      },
      content: `
        <div class="guild-action-confirm">
          <h3>${action.name}</h3>
          <p>${action.description}</p>
          <p class="confirm-tokens">
            <i class="fas fa-coins"></i>
            ${game.i18n.format("FLAIL.GuildAction.SpendCost", { before: current, after: current - 1 })}
          </p>
        </div>
      `,
      rejectClose: false
    });
    if (!confirmed) return;

    // Decrement tokens
    await this.actor.update({ "system.guildTokens": current - 1 });

    // Post a chat card describing the action
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      content: `
        <div class="flail-card cast-card guild-action-card">
          <header class="card-header">
            <img class="actor-img" src="${this.actor.img}" />
            <span class="actor-name">${this.actor.name}</span>
            <h3>
              <i class="fas fa-mask"></i>
              ${action.name}
            </h3>
          </header>
          <div class="guild-action-meta">
            <span class="guild-label">${guildItem.name}</span>
            <span class="token-spend">
              <i class="fas fa-coins"></i>
              ${current} → ${current - 1} / ${this.actor.system.level ?? 1}
            </span>
          </div>
          <div class="cast-description">${action.description}</div>
        </div>`,
      flags: {
        flail: {
          guildAction: {
            actorUuid: this.actor.uuid,
            guildName: guildItem.name,
            actionKey: action.key,
            actionName: action.name,
            tokensBefore: current,
            tokensAfter: current - 1
          }
        }
      }
    });
  }

  /**
   * Remove the embedded guild from the actor. Confirms first since
   * losing the guild also loses access to all seven actions until a
   * new guild is dragged in.
   *
   * Note: previously-marked thieving talents stay marked — once
   * learned, talents are permanent skills regardless of guild changes.
   */
  static async #onRemoveGuild(event, target) {
    const guildItem = this.actor.items.find(i => i.type === "guild");
    if (!guildItem) return;

    const confirmed = await foundry.applications.api.DialogV2.confirm({
      window: { title: game.i18n.localize("FLAIL.Guild.RemoveTitle") },
      content: `<p>${game.i18n.format("FLAIL.Guild.RemoveConfirm", { name: guildItem.name })}</p>`,
      rejectClose: false
    });
    if (!confirmed) return;

    await this.actor.deleteEmbeddedDocuments("Item", [guildItem.id]);
  }

  static async #onItemEdit(event, target) {
    const itemId = target.dataset.itemId ?? target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) item.sheet.render(true);
  }

  static async #onItemDelete(event, target) {
    const itemId = target.dataset.itemId ?? target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const confirm = await foundry.applications.api.DialogV2.confirm({
      window: { title: game.i18n.localize("FLAIL.Dialog.DeleteItemTitle") },
      content: `<p>${game.i18n.format("FLAIL.Dialog.DeleteItemBody", { name: item.name })}</p>`
    });
    if (confirm) item.delete();
  }

  static async #onItemCreate(event, target) {
    const type = target.dataset.itemType ?? "gear";
    const data = {
      name: game.i18n.format("FLAIL.Item.New", { type: game.i18n.localize(`FLAIL.ItemType.${type}`) || type }),
      type
    };
    const docs = await this.actor.createEmbeddedDocuments("Item", [data]);
    docs[0]?.sheet.render(true);
  }

  static async #onItemToChat(event, target) {
    const itemId = target.dataset.itemId ?? target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item) item.toChat();
  }

  static async #onMarkUsage(event, target) {
    const itemId = target.dataset.itemId ?? target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (!item) return;
    const max = item.system.usage?.max ?? 0;
    const current = item.system.usage?.value ?? 0;
    // Fully worn → clicking Mark Usage clears the track (single-button
    // "reset" shortcut, matching the pip-click behaviour).
    if (max > 0 && current >= max) {
      await item.update({ "system.usage.value": 0 });
      return;
    }
    return item.markUsage();
  }

  /**
   * Toggle a specific usage pip on an item. The dataset carries the
   * item id and the 1-indexed pip position.
   *
   *   Click an empty pip at position N   → set usage.value = N
   *                                        (fills up through that pip)
   *   Click a filled pip at position N   → set usage.value = N - 1
   *                                        (unfills that pip and any
   *                                         that come after it)
   *
   * Result is a monotonic left-to-right fill state — you can bump the
   * counter up or down by clicking anywhere in the row.
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

    // Special case — fully worn item + any pip click clears the
    // whole track. Gives the player a one-click "reset the item"
    // shortcut, which is the natural interaction after repairing or
    // resupplying (rather than clicking each pip individually).
    let next;
    if (current >= max) {
      next = 0;
    } else if (current >= pipIndex) {
      // Filled pip clicked → unfill it (drop the count by one relative
      // to its position).
      next = pipIndex - 1;
    } else {
      // Empty pip clicked → fill up to it.
      next = pipIndex;
    }

    // Clamp defensively — should already be in range but be safe.
    const clamped = Math.max(0, Math.min(max, next));
    if (clamped === current) return;   // no-op

    await item.update({ "system.usage.value": clamped });
  }

  static async #onClearUsage(event, target) {
    const itemId = target.dataset.itemId ?? target.closest("[data-item-id]")?.dataset.itemId;
    const item = this.actor.items.get(itemId);
    if (item?.system?.repair) item.system.repair();
  }

  static async #onAdjustHp(event, target) {
    const delta = Number(target.dataset.delta ?? 0);
    if (!delta) return;
    if (delta < 0) return this.actor.applyDamage(-delta, { ignoreDefence: true });
    return this.actor.heal(delta);
  }

  static async #onAdjustResource(event, target) {
    const delta = Number(target.dataset.delta ?? 0);
    if (!delta) return;
    const cur = this.actor.system.resource?.value ?? 0;
    // resource.max defaults to 0 on the schema, which would clamp every
    // value to 0. Spirit / Mana / Fumble Range are all "use a d20 to
    // track" — fall back to 20 when no explicit max is set.
    const max = this.actor.system.resource?.max || 20;
    const next = Math.max(0, Math.min(max, cur + delta));
    this.actor.update({ "system.resource.value": next });
  }

  /**
   * Switch tabs. CSS reads the root's `data-active-tab` to choose which
   * panel is visible, so we update that and the nav button state directly —
   * no re-render needed (which would be wasteful for a pure visibility flip).
   */
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

  /* -------------------------------------------- */
  /*  Tinkerer Resourcefulness — Repair           */
  /* -------------------------------------------- */

  /**
   * Repair a worn item by cannibalising materials from another item.
   * FLAIL Tinkerer rule: make a DEX save; on success, clear the
   * target item's usage AND mark one usage on a donor item that
   * "shares similar materials" with the target. Restricted to
   * non-magical items.
   *
   * The similar-materials constraint is a GM judgement (there's no
   * material taxonomy in the schema), so the dialog surfaces all
   * eligible donors and leans on the player + GM to pair sensibly.
   * The "non-magical" filter checks `item.getFlag("flail", "magical")`
   * — no such flag exists by default, so all items pass; add the flag
   * on any item you want excluded from the repair flow.
   */
  static async #onRepairItem(event, target) {
    const actor = this.actor;
    if (actor.system.class !== "tinkerer") return;

    // Candidate targets: items with usage > 0 (worn) and not magical.
    const targets = actor.items.filter(i => {
      const cur = i.system?.usage?.value ?? 0;
      const max = i.system?.usage?.max   ?? 0;
      return max > 0 && cur > 0 && !i.getFlag("flail", "magical");
    });
    if (!targets.length) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NothingToRepair"));
      return;
    }

    // Candidate donors: items with usage < max (spare capacity) and not
    // magical. The dialog filters the target out of the donor list
    // client-side once the target is chosen.
    const donors = actor.items.filter(i => {
      const cur = i.system?.usage?.value ?? 0;
      const max = i.system?.usage?.max   ?? 0;
      return max > 0 && cur < max && !i.getFlag("flail", "magical");
    });
    if (!donors.length) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NoDonorAvailable"));
      return;
    }

    // Prompt the player to pick a target + donor pair.
    const picks = await FlailCharacterSheet.#promptRepairPicks(targets, donors);
    if (picks === null) return;   // cancelled
    const { targetId, donorId } = picks;
    if (targetId === donorId) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.RepairSameItem"));
      return;
    }
    const targetItem = actor.items.get(targetId);
    const donorItem  = actor.items.get(donorId);
    if (!targetItem || !donorItem) return;

    // Roll the DEX save via the actor's normal flow — Falcon's Grace
    // and Exhausted apply automatically. Extract pass/fail from flags.
    const message = await actor.rollSave("dex", {
      flavor: game.i18n.localize("FLAIL.Tinkerer.RepairSaveFlavor")
    });
    const outcome = message?.flags?.flail?.saveRoll?.outcome ?? null;
    const success = outcome === "crit" || outcome === "success";

    let repairSummary;
    if (success) {
      // Repair the target (clear usage) and mark one usage on the donor.
      // Snapshot values first so the chat card can show deltas.
      const targetBefore = targetItem.system.usage.value;
      const donorBefore  = donorItem.system.usage.value;
      await targetItem.repair();
      await donorItem.markUsage();
      repairSummary = {
        success: true,
        target: { name: targetItem.name, before: targetBefore, after: 0 },
        donor:  { name: donorItem.name,  before: donorBefore, after: Math.min(donorItem.system.usage.max, donorBefore + 1), max: donorItem.system.usage.max }
      };
    } else {
      repairSummary = {
        success: false,
        target:  { name: targetItem.name },
        donor:   { name: donorItem.name  }
      };
    }

    // Post a short chat card summarising the outcome. The save card
    // is already in chat above this; this is the repair result.
    const content = `
      <div class="flail-chat-card repair-card ${repairSummary.success ? "repair-success" : "repair-fail"}">
        <header class="flail-chat-header">
          <i class="fas fa-wrench"></i>
          <span>${game.i18n.localize("FLAIL.Tinkerer.RepairCardTitle")}</span>
        </header>
        <div class="flail-chat-body">
          ${repairSummary.success
            ? `<p><strong>${game.i18n.localize("FLAIL.Save.Success")}.</strong> ${game.i18n.format("FLAIL.Tinkerer.RepairSuccessBody", { target: repairSummary.target.name, donor: repairSummary.donor.name, donorBefore: repairSummary.donor.before, donorAfter: repairSummary.donor.after, donorMax: repairSummary.donor.max })}</p>`
            : `<p><strong>${game.i18n.localize("FLAIL.Save.Fail")}.</strong> ${game.i18n.format("FLAIL.Tinkerer.RepairFailBody", { target: repairSummary.target.name })}</p>`
          }
        </div>
      </div>
    `;
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content
    });
  }

  /**
   * DialogV2 prompt for target + donor selection. Returns
   * `{ targetId, donorId }` or null on cancel.
   */
  static async #promptRepairPicks(targets, donors) {
    const targetOpts = targets.map(t => {
      const cur = t.system.usage.value;
      const max = t.system.usage.max;
      return `<option value="${t.id}">${t.name} (${cur}/${max})</option>`;
    }).join("");
    const donorOpts = donors.map(d => {
      const cur = d.system.usage.value;
      const max = d.system.usage.max;
      return `<option value="${d.id}">${d.name} (${cur}/${max})</option>`;
    }).join("");

    const content = `
      <form class="flail-modifier-form">
        <p class="flail-modifier-prompt">
          ${game.i18n.localize("FLAIL.Tinkerer.RepairPrompt")}
        </p>
        <div class="form-group flail-modifier-row">
          <label for="flail-repair-target">${game.i18n.localize("FLAIL.Tinkerer.RepairTargetLabel")}</label>
          <select id="flail-repair-target" name="targetId">${targetOpts}</select>
        </div>
        <div class="form-group flail-modifier-row">
          <label for="flail-repair-donor">${game.i18n.localize("FLAIL.Tinkerer.RepairDonorLabel")}</label>
          <select id="flail-repair-donor" name="donorId">${donorOpts}</select>
        </div>
        <p class="flail-modifier-hint">
          ${game.i18n.localize("FLAIL.Tinkerer.RepairHint")}
        </p>
      </form>
    `;

    const chosen = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.localize("FLAIL.Tinkerer.RepairDialogTitle"),
        icon:  "fas fa-wrench"
      },
      content,
      buttons: [
        {
          action: "roll",
          label: game.i18n.localize("FLAIL.Tinkerer.RepairRollButton"),
          icon: "fas fa-dice-d20",
          default: true,
          callback: (event, btn, dialog) => {
            const form = dialog.element.querySelector("form");
            return {
              targetId: form.elements.targetId?.value,
              donorId:  form.elements.donorId?.value
            };
          }
        },
        {
          action: "cancel",
          label: game.i18n.localize("FLAIL.Tinkerer.RepairCancelButton"),
          icon:  "fas fa-times",
          callback: () => null
        }
      ],
      rejectClose: false,
      submit: v => v
    });
    return (chosen && typeof chosen === "object") ? chosen : null;
  }

  /* -------------------------------------------- */
  /*  Tinkerer Quick Craft                        */
  /* -------------------------------------------- */

  /**
   * Quick Craft — Tinkerer special skill. Spend one turn, discard 3-6
   * items as components, declare an invention, and roll DEX with a
   * modifier that scales with how much you sacrificed:
   *
   *   3 items → DEX with disadvantage (-1)
   *   4 items → DEX (normal, +0)
   *   5 items → DEX with advantage (+1)
   *   6 items → DEX with double advantage (+2)
   *
   * Items are discarded whether the roll succeeds or fails — they're
   * consumed as components at the moment of assembly. Outcomes:
   *
   *   Crit / Success → invention works as declared
   *   Fail           → invention fizzles (components wasted)
   *   Fumble         → invention backfires on the party
   */
  static async #onQuickCraft(event, target) {
    const actor = this.actor;
    if (actor.system.class !== "tinkerer") return;

    // Eligible components — physical items only. Conditions, spells,
    // prayers, gifts, talents, and guilds are abstract/immaterial and
    // can't be cobbled into a contraption.
    const PHYSICAL_TYPES = new Set(["weapon", "armour", "gear", "gadget", "instrument"]);
    const candidates = actor.items.filter(i =>
      PHYSICAL_TYPES.has(i.type)
      && !i.getFlag("flail", "magical")
    );
    if (candidates.length < 3) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.QuickCraftNotEnoughItems"));
      return;
    }

    const picks = await FlailCharacterSheet.#promptQuickCraft(candidates);
    if (picks === null) return;   // cancelled
    const { itemIds, invention } = picks;

    // Enforce the 3-6 count client-side too, in case the dialog
    // somehow returns an out-of-range selection.
    if (itemIds.length < 3 || itemIds.length > 6) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.QuickCraftBadCount"));
      return;
    }

    const items = itemIds
      .map(id => actor.items.get(id))
      .filter(Boolean);
    if (items.length !== itemIds.length) return;

    // Snapshot component names for the chat card BEFORE deleting.
    const componentNames = items.map(i => i.name);

    // Discard the components. They're consumed regardless of the
    // roll's outcome — the invention was cobbled together, the
    // question is only whether it works.
    await actor.deleteEmbeddedDocuments("Item", itemIds);

    // Map discard count → save advantage modifier.
    // 3 → -1 disadvantage, 4 → 0 normal, 5 → +1 advantage, 6 → +2 double.
    const advantage = items.length - 4;

    // Roll the save. rollSave posts its own chat card with the outcome
    // and stores flags.flail.saveRoll.outcome.
    const message = await actor.rollSave("dex", {
      advantage,
      flavor: game.i18n.localize("FLAIL.Tinkerer.QuickCraftSaveFlavor")
    });
    const outcome = message?.flags?.flail?.saveRoll?.outcome ?? null;

    // Interpret the outcome:
    //   crit / success → invention works
    //   fumble         → invention backfires on the PCs
    //   fail           → invention fizzles, no effect either way
    let resultKey;
    if (outcome === "crit" || outcome === "success") resultKey = "success";
    else if (outcome === "fumble") resultKey = "fumble";
    else resultKey = "fail";

    // Post the summary card. Ordered under the save card in the log,
    // so the reader sees: dialog choices → save roll → interpretation.
    const componentsHtml = componentNames
      .map(n => `<li>${n}</li>`)
      .join("");
    const outcomeLine = {
      success: game.i18n.localize("FLAIL.Tinkerer.QuickCraftSuccessBody"),
      fail:    game.i18n.localize("FLAIL.Tinkerer.QuickCraftFailBody"),
      fumble:  game.i18n.localize("FLAIL.Tinkerer.QuickCraftFumbleBody")
    }[resultKey];

    const content = `
      <div class="flail-chat-card quick-craft-card quick-craft-${resultKey}">
        <header class="flail-chat-header">
          <i class="fas fa-gears"></i>
          <span>${game.i18n.localize("FLAIL.Tinkerer.QuickCraftCardTitle")}</span>
        </header>
        <div class="flail-chat-body">
          <p class="craft-invention">
            <strong>${game.i18n.localize("FLAIL.Tinkerer.QuickCraftInventionLabel")}:</strong>
            ${foundry.utils.escapeHTML ? foundry.utils.escapeHTML(invention) : invention}
          </p>
          <p class="craft-components-label">
            <strong>${game.i18n.format("FLAIL.Tinkerer.QuickCraftComponentsLabel", { n: componentNames.length })}:</strong>
          </p>
          <ul class="craft-components">${componentsHtml}</ul>
          <p class="craft-outcome">${outcomeLine}</p>
        </div>
      </div>
    `;
    return ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content
    });
  }

  /**
   * DialogV2 prompt for the Quick Craft flow. Returns
   * `{ itemIds: [...], invention: "..." }` or null on cancel.
   *
   * The form contains a textarea for the intention and a checkbox
   * list of eligible items. Discard-count → modifier mapping is
   * shown as static hint text.
   */
  static async #promptQuickCraft(candidates) {
    const rows = candidates.map(i => {
      return `
        <label class="quick-craft-row">
          <input type="checkbox" name="component" value="${i.id}" />
          <span class="qc-name">${i.name}</span>
        </label>
      `;
    }).join("");

    const content = `
      <form class="quick-craft-form">
        <p class="quick-craft-prompt">
          ${game.i18n.localize("FLAIL.Tinkerer.QuickCraftPrompt")}
        </p>
        <div class="form-group">
          <label for="flail-craft-invention">${game.i18n.localize("FLAIL.Tinkerer.QuickCraftInventionLabel")}:</label>
          <textarea id="flail-craft-invention" name="invention" rows="2" placeholder="${game.i18n.localize("FLAIL.Tinkerer.QuickCraftInventionPlaceholder")}"></textarea>
        </div>
        <div class="quick-craft-modifiers">
          <strong>${game.i18n.localize("FLAIL.Tinkerer.QuickCraftModifiersHeading")}:</strong>
          <ul>
            <li>${game.i18n.localize("FLAIL.Tinkerer.QuickCraftModifier3")}</li>
            <li>${game.i18n.localize("FLAIL.Tinkerer.QuickCraftModifier4")}</li>
            <li>${game.i18n.localize("FLAIL.Tinkerer.QuickCraftModifier5")}</li>
            <li>${game.i18n.localize("FLAIL.Tinkerer.QuickCraftModifier6")}</li>
          </ul>
        </div>
        <div class="quick-craft-components">
          <strong>${game.i18n.localize("FLAIL.Tinkerer.QuickCraftPickComponents")}:</strong>
          <div class="quick-craft-list">${rows}</div>
          <p class="quick-craft-count-hint" data-count-hint>${game.i18n.format("FLAIL.Tinkerer.QuickCraftCountHint", { n: 0 })}</p>
        </div>
      </form>
    `;

    const chosen = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.localize("FLAIL.Tinkerer.QuickCraftDialogTitle"),
        icon:  "fas fa-gears"
      },
      content,
      buttons: [
        {
          action: "roll",
          label: game.i18n.localize("FLAIL.Tinkerer.QuickCraftRollButton"),
          icon: "fas fa-dice-d20",
          default: true,
          callback: (event, btn, dialog) => {
            const form = dialog.element.querySelector("form");
            const invention = form.elements.invention?.value?.trim() ?? "";
            const checked = Array.from(
              form.querySelectorAll("input[name='component']:checked")
            ).map(el => el.value);
            return { itemIds: checked, invention };
          }
        },
        {
          action: "cancel",
          label: game.i18n.localize("FLAIL.Tinkerer.QuickCraftCancelButton"),
          icon:  "fas fa-times",
          callback: () => null
        }
      ],
      rejectClose: false,
      submit: v => v
    });

    if (!chosen || typeof chosen !== "object") return null;

    // Guardrails: invention description required; count in range.
    if (!chosen.invention) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.QuickCraftNoInvention"));
      return null;
    }
    if (chosen.itemIds.length < 3 || chosen.itemIds.length > 6) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.QuickCraftBadCount"));
      return null;
    }
    return chosen;
  }

  /* -------------------------------------------- */
  /*  Tinkerer — Fix Construct                    */
  /* -------------------------------------------- */

  /**
   * Fix Construct — Tinkerer skill. Two methods:
   *   Mark path: mark usage on two non-magical items, roll DEX save.
   *              On success → +2 HP. On fail → items still marked,
   *              no HP repaired (materials consumed while working).
   *   Discard path: delete one non-magical item → +4 HP, no save.
   *
   * Items may come from either the Tinkerer or the construct itself.
   * The construct is identified by the ownerUuid link set on its own
   * sheet. Refuses cleanly when: no linked construct exists, the
   * construct is at full HP, or the requested method has no eligible
   * items to spend.
   */
  static async #onFixConstruct(event, target) {
    const actor = this.actor;
    if (actor.system.class !== "tinkerer") return;

    // Find every construct in the world whose ownerUuid points at
    // this Tinkerer. Empty → refuse; single → use it; many → prompt.
    const constructs = game.actors?.filter(a =>
      a.type === "construct" && a.system?.ownerUuid === actor.uuid
    ) ?? [];
    if (constructs.length === 0) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.FixConstructNoLink"));
      return;
    }
    let construct = constructs[0];
    if (constructs.length > 1) {
      const picked = await FlailCharacterSheet.#promptConstructPick(constructs);
      if (!picked) return;
      construct = picked;
    }

    // Full HP → refuse.
    const curHp = construct.system.hp?.value ?? 0;
    const maxHp = construct.system.hp?.max ?? 0;
    if (maxHp > 0 && curHp >= maxHp) {
      ui.notifications?.warn(game.i18n.format("FLAIL.Notify.FixConstructFullHp", { name: construct.name }));
      return;
    }

    // Broken → refuse. Fix Construct doesn't rebuild a broken
    // construct — that requires the full Rebuild flow.
    if (construct.system.broken) {
      ui.notifications?.warn(game.i18n.format("FLAIL.Notify.FixConstructBroken", { name: construct.name }));
      return;
    }

    // Build the item pool from BOTH actors, filtered to non-magical.
    // For each item, note whether it can be marked (has usage headroom)
    // or discarded (any non-magical item qualifies).
    const buildPool = () => {
      const pool = [];
      for (const source of [actor, construct]) {
        for (const i of source.items) {
          if (i.getFlag("flail", "magical")) continue;
          if (i.type === "condition") continue;   // not physical
          const max = i.system?.usage?.max ?? 0;
          const cur = i.system?.usage?.value ?? 0;
          pool.push({
            uuid: i.uuid,
            name: i.name,
            sourceName: source.name,
            canMark: max > 0 && cur < max,
            canDiscard: true,   // any non-magical item can be discarded
            usageLabel: max > 0 ? ` (${cur}/${max})` : ""
          });
        }
      }
      return pool;
    };
    const pool = buildPool();

    const markable = pool.filter(p => p.canMark);
    if (markable.length < 2 && pool.length === 0) {
      ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.FixConstructNoItems"));
      return;
    }

    const result = await FlailCharacterSheet.#promptFixConstruct(construct, pool, markable);
    if (!result) return;

    if (result.method === "mark") {
      const item1 = await fromUuid(result.item1Uuid);
      const item2 = await fromUuid(result.item2Uuid);
      if (!item1 || !item2) return;
      if (item1.uuid === item2.uuid) {
        ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.FixConstructSameItem"));
        return;
      }

      // Mark first, THEN roll the save (per your call — items are
      // consumed while working regardless of outcome).
      await item1.markUsage();
      await item2.markUsage();

      const message = await actor.rollSave("dex", {
        flavor: game.i18n.localize("FLAIL.Tinkerer.FixConstructSaveFlavor")
      });
      const outcome = message?.flags?.flail?.saveRoll?.outcome ?? null;
      const success = outcome === "crit" || outcome === "success";

      let newHp = curHp;
      if (success) {
        newHp = Math.min(maxHp, curHp + 2);
        await construct.update({ "system.hp.value": newHp });
      }

      // Post outcome card. Includes both items marked and the HP result.
      const content = `
        <div class="flail-chat-card fix-construct-card fix-construct-${success ? "success" : "fail"}">
          <header class="flail-chat-header">
            <i class="fas fa-robot"></i>
            <span>${game.i18n.format("FLAIL.Tinkerer.FixConstructCardTitle", { name: construct.name })}</span>
          </header>
          <div class="flail-chat-body">
            <p><strong>${game.i18n.localize("FLAIL.Tinkerer.FixConstructMarkMethod")}</strong></p>
            <ul class="fix-items">
              <li>${item1.name} <em>(${item1.parent?.name})</em></li>
              <li>${item2.name} <em>(${item2.parent?.name})</em></li>
            </ul>
            <p class="fix-outcome">
              ${success
                ? `<i class="fas fa-check"></i> <strong>${game.i18n.localize("FLAIL.Save.Success")}.</strong> ${game.i18n.format("FLAIL.Tinkerer.FixConstructMarkSuccess", { before: curHp, after: newHp, max: maxHp })}`
                : `<i class="fas fa-times"></i> <strong>${game.i18n.localize("FLAIL.Save.Fail")}.</strong> ${game.i18n.localize("FLAIL.Tinkerer.FixConstructMarkFail")}`
              }
            </p>
          </div>
        </div>
      `;
      return ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content
      });
    } else if (result.method === "discard") {
      const item = await fromUuid(result.itemUuid);
      if (!item) return;
      const itemName = item.name;
      const itemSource = item.parent?.name;

      // Delete the item, then apply +4 HP.
      await item.delete();
      const newHp = Math.min(maxHp, curHp + 4);
      await construct.update({ "system.hp.value": newHp });

      const content = `
        <div class="flail-chat-card fix-construct-card fix-construct-success">
          <header class="flail-chat-header">
            <i class="fas fa-robot"></i>
            <span>${game.i18n.format("FLAIL.Tinkerer.FixConstructCardTitle", { name: construct.name })}</span>
          </header>
          <div class="flail-chat-body">
            <p><strong>${game.i18n.localize("FLAIL.Tinkerer.FixConstructDiscardMethod")}</strong></p>
            <ul class="fix-items">
              <li>${itemName} <em>(${itemSource})</em> — <em>${game.i18n.localize("FLAIL.Tinkerer.FixConstructDiscarded")}</em></li>
            </ul>
            <p class="fix-outcome">
              <i class="fas fa-check"></i> ${game.i18n.format("FLAIL.Tinkerer.FixConstructDiscardSuccess", { before: curHp, after: newHp, max: maxHp })}
            </p>
          </div>
        </div>
      `;
      return ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content
      });
    }
  }

  /**
   * When the Tinkerer owns multiple constructs, ask which one to fix.
   */
  static async #promptConstructPick(constructs) {
    const opts = constructs.map(c =>
      `<option value="${c.uuid}">${c.name} (${c.system.hp?.value ?? 0}/${c.system.hp?.max ?? 0} HP)</option>`
    ).join("");
    const content = `
      <form class="flail-modifier-form">
        <p class="flail-modifier-prompt">${game.i18n.localize("FLAIL.Tinkerer.FixConstructPickPrompt")}</p>
        <div class="form-group">
          <label for="flail-construct-picker">${game.i18n.localize("FLAIL.Tinkerer.FixConstructPickLabel")}:</label>
          <select id="flail-construct-picker" name="constructUuid">${opts}</select>
        </div>
      </form>
    `;
    const chosen = await foundry.applications.api.DialogV2.wait({
      window: { title: game.i18n.localize("FLAIL.Tinkerer.FixConstructPickTitle"), icon: "fas fa-robot" },
      content,
      buttons: [
        { action: "ok", label: game.i18n.localize("FLAIL.Common.OK"), default: true,
          callback: (event, btn, dialog) => dialog.element.querySelector("select").value },
        { action: "cancel", label: game.i18n.localize("FLAIL.Common.Cancel"), callback: () => null }
      ],
      rejectClose: false,
      submit: v => v
    });
    if (!chosen) return null;
    return constructs.find(c => c.uuid === chosen) ?? null;
  }

  /**
   * The main Fix Construct picker — shows both methods side by side
   * with their own item dropdowns and separate confirm buttons.
   *
   * Returns:
   *   { method: "mark",    item1Uuid, item2Uuid } — user picked mark
   *   { method: "discard", itemUuid }              — user picked discard
   *   null                                          — user cancelled
   */
  static async #promptFixConstruct(construct, pool, markable) {
    const markOpts = markable.map(p =>
      `<option value="${p.uuid}">${p.sourceName}: ${p.name}${p.usageLabel}</option>`
    ).join("");
    const discardOpts = pool.map(p =>
      `<option value="${p.uuid}">${p.sourceName}: ${p.name}${p.usageLabel}</option>`
    ).join("");
    const enoughMark = markable.length >= 2;
    const anyDiscard = pool.length > 0;

    const content = `
      <form class="fix-construct-form">
        <p class="flail-modifier-prompt">
          ${game.i18n.format("FLAIL.Tinkerer.FixConstructPrompt", {
            name: construct.name,
            cur: construct.system.hp?.value ?? 0,
            max: construct.system.hp?.max ?? 0
          })}
        </p>
        <section class="fix-method fix-method-mark ${enoughMark ? "" : "is-disabled"}">
          <h4>${game.i18n.localize("FLAIL.Tinkerer.FixConstructMarkHeading")}</h4>
          <p class="fix-method-hint">${game.i18n.localize("FLAIL.Tinkerer.FixConstructMarkHint")}</p>
          ${enoughMark ? `
            <div class="fix-picker-row">
              <label>${game.i18n.localize("FLAIL.Tinkerer.FixConstructMarkItem1")}:</label>
              <select name="item1Uuid">${markOpts}</select>
            </div>
            <div class="fix-picker-row">
              <label>${game.i18n.localize("FLAIL.Tinkerer.FixConstructMarkItem2")}:</label>
              <select name="item2Uuid">${markOpts}</select>
            </div>
          ` : `<p class="fix-method-blocked">${game.i18n.localize("FLAIL.Tinkerer.FixConstructMarkBlocked")}</p>`}
        </section>
        <section class="fix-method fix-method-discard ${anyDiscard ? "" : "is-disabled"}">
          <h4>${game.i18n.localize("FLAIL.Tinkerer.FixConstructDiscardHeading")}</h4>
          <p class="fix-method-hint">${game.i18n.localize("FLAIL.Tinkerer.FixConstructDiscardHint")}</p>
          ${anyDiscard ? `
            <div class="fix-picker-row">
              <label>${game.i18n.localize("FLAIL.Tinkerer.FixConstructDiscardItem")}:</label>
              <select name="itemUuid">${discardOpts}</select>
            </div>
          ` : `<p class="fix-method-blocked">${game.i18n.localize("FLAIL.Tinkerer.FixConstructDiscardBlocked")}</p>`}
        </section>
      </form>
    `;

    const buttons = [];
    if (enoughMark) {
      buttons.push({
        action: "mark",
        label: game.i18n.localize("FLAIL.Tinkerer.FixConstructMarkAction"),
        icon: "fas fa-dice-d20",
        callback: (event, btn, dialog) => {
          const form = dialog.element.querySelector("form");
          return {
            method: "mark",
            item1Uuid: form.elements.item1Uuid?.value,
            item2Uuid: form.elements.item2Uuid?.value
          };
        }
      });
    }
    if (anyDiscard) {
      buttons.push({
        action: "discard",
        label: game.i18n.localize("FLAIL.Tinkerer.FixConstructDiscardAction"),
        icon: "fas fa-trash",
        callback: (event, btn, dialog) => {
          const form = dialog.element.querySelector("form");
          return {
            method: "discard",
            itemUuid: form.elements.itemUuid?.value
          };
        }
      });
    }
    buttons.push({
      action: "cancel",
      label: game.i18n.localize("FLAIL.Common.Cancel"),
      icon: "fas fa-times",
      callback: () => null
    });

    const chosen = await foundry.applications.api.DialogV2.wait({
      window: {
        title: game.i18n.format("FLAIL.Tinkerer.FixConstructDialogTitle", { name: construct.name }),
        icon: "fas fa-robot"
      },
      content,
      buttons,
      rejectClose: false,
      submit: v => v
    });
    return (chosen && typeof chosen === "object") ? chosen : null;
  }
}
