import { FLAIL } from "../helpers/config.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Starting Gear Wizard.
 *
 * Opened from the class tab's "Import Starting Gear" button. Presents
 * the class's fixed items + choice dropdowns + random-item notes +
 * coin die formula in one dialog. On Import, executes each choice,
 * imports fixed items into satchel slots, rolls coins visibly, and
 * flags every imported item with `flags.flail.startingGear = true`
 * so the GM's reset dialog can find and remove them.
 *
 * Prereq gates:
 *   - Level 1 only (refuse+warn if actor.system.level > 1)
 *   - Cleric requires religion set
 *   - Cutthroat requires guild set
 *
 * Coin roll uses the class's coinsDice formula (e.g. "4d6"), evaluates
 * with a chat card, and adds the result to system.money.value.
 */
export class StartingGearWizard extends HandlebarsApplicationMixin(ApplicationV2) {
  static DEFAULT_OPTIONS = {
    id: "flail-starting-gear-wizard-{id}",
    tag: "form",
    classes: ["flail", "starting-gear-wizard"],
    position: { width: 560, height: "auto" },
    window: { icon: "fa-solid fa-box-open", resizable: true },
    actions: { runImport: StartingGearWizard.#onImport }
  };

  static PARTS = {
    body: { template: "systems/flail/templates/apps/starting-gear-wizard.hbs" }
  };

  constructor(actor, options = {}) {
    super(options);
    this.actor = actor;
    this.classKey = actor.system.class ?? "warrior";
    this.def = FLAIL.startingGear?.[this.classKey] ?? null;
  }

  get title() {
    return `Starting Gear — ${this.actor.name}`;
  }

  async _prepareContext(options) {
    const def = this.def;
    if (!def) {
      return { error: `No starting gear data for class "${this.classKey}".` };
    }

    // Prereq checks — surface as blocking messages in the dialog.
    const blockers = [];
    if ((this.actor.system.level ?? 1) > 1) {
      blockers.push({
        type: "level",
        message: `This character is level ${this.actor.system.level ?? 1} — starting gear is designed for chargen. Refusing to import.`
      });
    }
    if (def.requiresReligion) {
      // Cleric prereq — a religion Item must be embedded on the actor.
      // The legacy classOptions.religion string was removed as a
      // runtime consumer in v0.4.65; migration converts pre-existing
      // Clerics on GM sheet open.
      const hasReligion = this.actor.items.some(i => i.type === "religion");
      if (!hasReligion) {
        blockers.push({
          type: "religion",
          message: "Cleric starting gear needs a religion Item — drop one from the Religions compendium onto the Class tab first."
        });
      }
    }
    if (def.requiresGuild) {
      // Cutthroat's guild is an EMBEDDED ITEM of type "guild" (not a
      // classOptions string). The prereq is satisfied when the actor
      // has one embedded.
      const hasGuild = this.actor.items.some(i => i.type === "guild");
      if (!hasGuild) {
        blockers.push({
          type: "guild",
          message: "Cutthroat starting gear needs a guild picked first (Class tab — drag a guild onto the actor)."
        });
      }
    }

    // Build the choice dropdowns from live compendia. If a class has
    // no choices, this returns empty and the summary just lists fixed.
    const choices = [];
    for (const c of def.choices ?? []) {
      const opts = await this.#loadChoiceOptions(c);
      choices.push({
        key: c.key,
        label: c.label,
        type: c.type,
        options: opts,
        note: c.note
      });
    }

    // Random items — descriptive rows the wizard just shows to the
    // player as reminders. Not imported automatically.
    const randomItems = def.randomItems ?? [];

    return {
      className: game.i18n.localize(FLAIL.classes?.[this.classKey]?.label ?? this.classKey),
      fixedItems: def.fixedItems ?? [],
      choices,
      randomItems,
      coinsDice: def.coinsDice,
      blockers,
      canImport: blockers.length === 0
    };
  }

  /**
   * Load candidate items for a wizard choice from the appropriate
   * compendium. Rules per choice type:
   *   weapon      — Item compendia with type=="weapon"; if weaponSpec
   *                 is an array, filter by name-substring-match
   *   instrument  — Item compendia with type=="instrument"
   *   gear        — Item compendia with type=="gear"
   *   holySymbol  — auto-fill from religion; single-option array with
   *                 the mapped holy-symbol item name
   */
  async #loadChoiceOptions(choice) {
    // Religion is a first-class Item on the actor. Legacy fallbacks
    // (FLAIL.HOLY_SYMBOL_BY_RELIGION / classOptions.religion) removed
    // in v0.4.65 — the wizard's prereq check refuses to render when
    // no religion Item is embedded, so we can trust it exists here
    // for Cleric-specific choices.
    const embeddedReligion = this.actor.items.find(i => i.type === "religion");

    if (choice.type === "holySymbol") {
      const embeddedSymbolName = embeddedReligion?.system?.holySymbol?.name;
      if (!embeddedSymbolName) return [];
      return [{ uuid: `name:${embeddedSymbolName}`, name: embeddedSymbolName, preselected: true }];
    }
    if (choice.type === "guildSigil") {
      // Guild is an embedded ITEM of type "guild"; the sigil's canonical
      // item name is stored on the guild's own schema (v0.4.68 item-ref
      // pattern — same as Religion's holySymbol). Legacy
      // GUILD_SIGIL_BY_GUILD map was deleted in v0.4.68.
      const guildItem = this.actor.items.find(i => i.type === "guild");
      const sigilName = guildItem?.system?.sigil?.name;
      if (!sigilName) return [];
      return [{ uuid: `name:${sigilName}`, name: sigilName, preselected: true }];
    }

    // For Cleric weapon/armour choices, prefer the embedded religion's
    // specialty item lists when populated. Each ref { uuid, name }
    // becomes a dropdown option. Empty list = fall through to the
    // normal compendium scan (defaults to "all" per Q2 answer 'a').
    if (this.actor.system?.class === "cleric" && embeddedReligion) {
      if (choice.type === "weapon") {
        const refs = embeddedReligion.system?.weaponSpecialty ?? [];
        if (refs.length > 0) {
          return refs
            .filter(r => r.uuid || r.name)
            .map(r => ({ uuid: r.uuid || `name:${r.name}`, name: r.name }))
            .sort((a, b) => a.name.localeCompare(b.name));
        }
      }
      if (choice.type === "armour") {
        const refs = embeddedReligion.system?.armourSpecialty ?? [];
        if (refs.length > 0) {
          return refs
            .filter(r => r.uuid || r.name)
            .map(r => ({ uuid: r.uuid || `name:${r.name}`, name: r.name }))
            .sort((a, b) => a.name.localeCompare(b.name));
        }
        // Empty list on religion = all armour allowed (Q2 answer 'a').
        // Fall through to the generic compendium scan without spec
        // filtering.
        return this.#loadCompendiumItemsOfType("armour", null);
      }
    }

    const typeFilter = choice.type; // weapon / instrument / gear / armour
    const results = [];
    for (const pack of game.packs) {
      if (pack.metadata.type !== "Item") continue;
      const docs = await pack.getDocuments();
      for (const doc of docs) {
        if (doc.type !== typeFilter) continue;
        if (choice.type === "weapon" && Array.isArray(choice.weaponSpec)) {
          const lname = (doc.name ?? "").toLowerCase();
          const matches = choice.weaponSpec.some(tok => lname.includes(tok.toLowerCase()));
          if (!matches) continue;
        }
        if (choice.type === "armour" && Array.isArray(choice.armourSpec)) {
          // Basic-tier armour filter (leather, hide, padded, etc.) —
          // substring match on item name. Same pattern as weaponSpec
          // but for armour items.
          const lname = (doc.name ?? "").toLowerCase();
          const matches = choice.armourSpec.some(tok => lname.includes(tok.toLowerCase()));
          if (!matches) continue;
        }
        results.push({ uuid: doc.uuid, name: doc.name });
      }
    }
    // Alphabetic — easier to scan long weapon lists.
    results.sort((a, b) => a.name.localeCompare(b.name));
    return results;
  }

  /**
   * Simple by-type compendium scan (no spec filter). Used when we want
   * "all items of this type" — e.g. Cleric armour when the religion's
   * armour list is empty (all armour allowed per Q2).
   */
  async #loadCompendiumItemsOfType(itemType, ignored) {
    const results = [];
    for (const pack of game.packs) {
      if (pack.metadata.type !== "Item") continue;
      const docs = await pack.getDocuments();
      for (const doc of docs) {
        if (doc.type !== itemType) continue;
        results.push({ uuid: doc.uuid, name: doc.name });
      }
    }
    results.sort((a, b) => a.name.localeCompare(b.name));
    return results;
  }

  static async #onImport(event, target) {
    if (!this.def) return;
    const actor = this.actor;

    // Collect choice selections from the form.
    const form = this.element.querySelector("form") ?? this.element;
    const picks = {};
    for (const c of this.def.choices ?? []) {
      const sel = form.querySelector(`select[name="choice.${c.key}"]`);
      const val = sel?.value ?? "";
      if (!val) {
        ui.notifications?.warn(`Please pick a value for "${c.label}".`);
        return;
      }
      picks[c.key] = val;
    }

    // Import fixed items by name.
    const toEmbed = [];
    const notFound = [];
    for (const fi of this.def.fixedItems ?? []) {
      const doc = await StartingGearWizard.#findItemInCompendiums(fi.name);
      if (!doc) { notFound.push(fi.name); continue; }
      const data = doc.toObject();
      delete data._id;
      if (data.system && "location" in data.system) {
        const slot = StartingGearWizard.#findEmptySatchelSlot(actor, data.system.slotsRequired ?? 1, toEmbed);
        if (slot >= 0) {
          data.system.location = "satchel";
          data.system.slotIndex = slot;
        }
      }
      // Multiple qty → duplicate the data record.
      const qty = fi.qty ?? 1;
      // If the item's schema has a `quantity` field (weapon/gear does)
      // and qty > 1, prefer setting quantity to keep sheet compact.
      if (qty > 1 && data.system && "quantity" in data.system) {
        data.system.quantity = qty;
      }
      data.flags = data.flags ?? {};
      data.flags.flail = data.flags.flail ?? {};
      data.flags.flail.startingGear = true;
      data.flags.flail.startingGearClass = this.classKey;
      toEmbed.push(data);
    }

    // Import choice picks.
    for (const c of this.def.choices ?? []) {
      const val = picks[c.key];
      let doc = null;
      if (val.startsWith("name:")) {
        // Holy-symbol auto-fill via name lookup
        doc = await StartingGearWizard.#findItemInCompendiums(val.slice(5));
      } else {
        doc = await fromUuid(val);
      }
      if (!doc) { notFound.push(c.label); continue; }
      const data = doc.toObject();
      delete data._id;
      if (data.system && "location" in data.system) {
        const slot = StartingGearWizard.#findEmptySatchelSlot(actor, data.system.slotsRequired ?? 1, toEmbed);
        if (slot >= 0) {
          data.system.location = "satchel";
          data.system.slotIndex = slot;
        }
      }
      data.flags = data.flags ?? {};
      data.flags.flail = data.flags.flail ?? {};
      data.flags.flail.startingGear = true;
      data.flags.flail.startingGearClass = this.classKey;
      toEmbed.push(data);
    }

    if (toEmbed.length) {
      await actor.createEmbeddedDocuments("Item", toEmbed);
    }

    // Roll coins — visible chat card.
    let coinsResult = 0;
    if (this.def.coinsDice) {
      try {
        const roll = await (new Roll(this.def.coinsDice)).evaluate();
        coinsResult = roll.total;
        await roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor }),
          flavor: `<strong>${actor.name}</strong> rolls starting coins (${this.def.coinsDice})`
        });
        // Coins live at `system.coins` on the character (integer field).
        // v0.4.43 mistakenly wrote to `system.money.value` which isn't
        // in the schema, so the ability-tab display never updated.
        const curCoins = actor.system.coins ?? 0;
        await actor.update({ "system.coins": curCoins + coinsResult });
      } catch (err) {
        console.error("FLAIL | Starting coins roll failed:", err);
      }
    }

    await actor.setFlag("flail", "startingGearImportedV1", {
      class: this.classKey,
      timestamp: Date.now(),
      itemCount: toEmbed.length,
      coins: coinsResult
    });

    const parts = [`${toEmbed.length} item(s) imported`];
    if (coinsResult) parts.push(`${coinsResult} coins added`);
    if (notFound.length) parts.push(`${notFound.length} missing (${notFound.join(", ")})`);
    ui.notifications?.info(`FLAIL: starting gear applied — ${parts.join("; ")}.`);

    this.close();
  }

  /**
   * Case-insensitive name search across every Item compendium.
   * Returns the first document found or null.
   */
  static async #findItemInCompendiums(name) {
    if (!name) return null;
    const target = name.trim().toLowerCase();
    for (const pack of game.packs) {
      if (pack.metadata.type !== "Item") continue;
      const index = await pack.getIndex();
      const hit = [...index].find(e => (e.name ?? "").toLowerCase() === target);
      if (hit) {
        const doc = await pack.getDocument(hit._id);
        if (doc) return doc;
      }
    }
    return null;
  }

  /**
   * Empty satchel slot finder. Considers items already on the actor
   * AND pending-embed items in this same wizard run (they haven't been
   * created yet but will fill slots when they do).
   */
  static #findEmptySatchelSlot(actor, slotsRequired, pendingEmbeds = []) {
    const SATCHEL_COUNT = 8;
    const COLS = 2;
    const occ = new Set();
    for (const it of actor.items.filter(i => i.system?.location === "satchel")) {
      const idx = it.system?.slotIndex ?? 0;
      const span = it.system?.slotsRequired ?? 1;
      for (let i = 0; i < span; i++) occ.add(idx + i * COLS);
    }
    for (const data of pendingEmbeds) {
      if (data.system?.location !== "satchel") continue;
      const idx = data.system.slotIndex ?? 0;
      const span = data.system.slotsRequired ?? 1;
      for (let i = 0; i < span; i++) occ.add(idx + i * COLS);
    }
    for (let i = 0; i < SATCHEL_COUNT; i++) {
      let fits = true;
      for (let j = 0; j < slotsRequired; j++) {
        const check = i + j * COLS;
        if (check >= SATCHEL_COUNT || occ.has(check)) { fits = false; break; }
      }
      if (fits) return i;
    }
    return -1;
  }
}
