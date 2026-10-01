import { FLAIL } from "../helpers/config.mjs";
import { BackgroundPicker } from "./background-picker.mjs";
import { StartingGearWizard } from "./starting-gear-wizard.mjs";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/* Per-class, level-1 build guidance shown on the Class-build step. The
 * actual picking happens on the character sheet's Class tab (the pickers
 * already live there); this just tells the player what to do. */
const CC_BUILD_HINTS = {
  warrior:       "Choose one Combat Talent (you get one pick per level) in the Combat Talents panel.",
  wizard:        "Set your Master (drag one onto the Master card) — this seeds three random arcane spells — and name your tradition.",
  cleric:        "Choose your Religion and Deity; this sets your Divine Prayers.",
  cutthroat:     "Pick your starting Thieving Talents.",
  bard:          "Choose a starting Instrument. Jack of All Trades lets you borrow a talent, gadget or spell each day.",
  boneWhisperer: "Add your starting Dark Spells in the Known Spells panel.",
  druid:         "Choose your starting Primal Gift.",
  tinkerer:      "Build your starting gadget belt — four gadgets, one of each type."
};

/* Key attribute per class, used by quick-build to auto-place the highest
 * roll. Only the confidently-keyed classes are listed; the rest keep their
 * rolled order. cleric is LUCK (Lay on Hands / Divine Prayers are LUCK saves). */
const CC_CLASS_KEY_ATTR = {
  warrior: "str", cutthroat: "dex", bard: "cha", wizard: "int", cleric: "luck", tinkerer: "int"
};

/** May the current user create Actors directly (else we proxy via a GM)? */
function ccCanCreateActors() {
  if (game.user?.isGM) return true;
  try { return game.user?.can?.("ACTOR_CREATE") ?? false; } catch { return false; }
}

/** The lowest-id active GM — the single client that answers a create proxy. */
function ccFirstActiveGM() {
  const gms = (game.users?.filter(u => u.isGM && u.active) ?? []).map(u => u.id).sort();
  return gms[0] ?? null;
}

/**
 * GM-side: create the draft character on behalf of a player who lacks
 * actor-creation rights, owned by that player. Exported for the socket
 * responder in flail.mjs.
 */
export async function createDraftActorForUser(data, forUserId) {
  const OWN = CONST.DOCUMENT_OWNERSHIP_LEVELS;
  const classKey = data?.classKey || "warrior";
  const maxHp = FLAIL.classes[classKey]?.maxHp ?? 6;
  const attributes = {};
  for (const k of FLAIL.attributeKeys) attributes[k] = { base: data?.attributes?.[k] ?? 8 };
  return Actor.implementation.create({
    name: data?.name || "New Character",
    type: "character",
    img: data?.img || "icons/svg/mystery-man.svg",
    system: { class: classKey, level: 1, attributes, hp: { value: maxHp, max: maxHp } },
    ownership: { default: OWN.NONE, [forUserId]: OWN.OWNER },
    flags: { flail: { creationDraft: true } }
  });
}

/** Player-side: ask a GM to mint the draft; resolve the new actor's id. */
async function ccRequestDraftFromGM(data) {
  if (!ccFirstActiveGM()) {
    ui.notifications?.error("FLAIL: no GM is online to create your character. Ask your GM to connect, then try again.");
    return { error: "no-gm" };
  }
  const requestId = foundry.utils.randomID();
  const chan = "system.flail";
  return new Promise((resolve) => {
    let settled = false;
    const finish = (res) => { if (settled) return; settled = true; clearTimeout(timer); game.socket.off(chan, handler); resolve(res); };
    const handler = (msg) => {
      if (msg?.type !== "flailDraftCreated" || msg.requestId !== requestId) return;
      finish({ actorId: msg.actorId, error: msg.error });
    };
    const timer = setTimeout(() => finish({ error: "timeout" }), 20000);
    game.socket.on(chan, handler);
    game.socket.emit(chan, { type: "createDraftCharacter", requestId, forUserId: game.user.id, data });
  });
}

/* Lightweight fantasy name generator for the "Roll a name" button.
 * Kept self-contained so it works offline with no rolltable dependency. */
const CC_FIRST = [
  "Aldric", "Bramble", "Cassia", "Dorn", "Elsbeth", "Fenwick", "Gretta", "Hollis",
  "Ingrid", "Joss", "Kestrel", "Lowan", "Mabel", "Nix", "Orla", "Pell",
  "Quill", "Rhogar", "Sable", "Tobin", "Ursa", "Veck", "Wrenna", "Yorrick",
  "Bael", "Corvin", "Delphine", "Edda", "Garrick", "Hazel", "Isolde", "Thane"
];
const CC_SURNAME = [
  "Ashdown", "Blackbriar", "Coldwater", "Dreng", "Emberfell", "Fenn", "Grimsby",
  "Hartwell", "Ironhand", "Jessop", "Kettle", "Larkspur", "Mossfoot", "Nettle",
  "Oakhart", "Pyre", "Quarrow", "Ravenshaw", "Stonewick", "Thornbury", "Underhill",
  "the Bold", "the Quick", "the Unlucky", "of the Marsh", "Grimtooth", "Swiftwater"
];
function ccRandomName() {
  const pick = a => a[Math.floor(Math.random() * a.length)];
  return `${pick(CC_FIRST)} ${pick(CC_SURNAME)}`;
}

/* Tokenizer detection is version-agnostic: the original ships as
 * `vtta-tokenizer`, the rewrite as `tokenizer-2`, and forks vary. Match a
 * known id first, then any active module whose id looks like a tokenizer. */
function ccFindTokenizer() {
  const known = ["tokenizer-2", "vtta-tokenizer", "tokenizer"];
  for (const id of known) {
    const mod = game.modules?.get(id);
    if (mod?.active) return { id, mod, api: mod.api ?? null };
  }
  for (const mod of (game.modules ?? [])) {
    if (mod?.active && /tokeniz/i.test(mod.id)) return { id: mod.id, mod, api: mod.api ?? null };
  }
  return null;
}

/* Try the known launch entry points across tokenizer versions. Returns true
 * if one ran. Logs the discovered API surface if none matched, so an
 * unrecognised build can be wired precisely. */
async function ccLaunchTokenizer(tok, actor) {
  const api = tok.api;
  const attempts = [];
  if (api) {
    // Tokenizer 2 (`tokenizer-2`): openEditor is the interactive, actor-bound
    // editor. Try the positional then object arg shape, then its one-shot
    // `tokenize`, before the legacy (`vtta-tokenizer`) method names.
    const byName = [
      ["openEditor",    a => api.openEditor(a)],
      ["openEditor",    a => api.openEditor({ actor: a })],
      ["tokenize",      a => api.tokenize(a)],
      ["tokenize",      a => api.tokenize({ actor: a })],
      ["tokenizeActor", a => api.tokenizeActor(a)],
      ["tokenizeDoc",   a => api.tokenizeDoc(a)],
      ["launch",        a => api.launch(a)],
      ["launchTokenizer", a => api.launchTokenizer(a)]
    ];
    for (const [name, fn] of byName) {
      if (typeof api[name] === "function") attempts.push(fn);
    }
  }
  const G = globalThis.Tokenizer;
  if (G) {
    for (const m of ["tokenizeActor", "launch", "openEditor"]) {
      if (typeof G[m] === "function") attempts.push(a => G[m](a));
    }
  }
  for (const run of attempts) {
    try { await run(actor); return true; }
    catch (err) { console.warn(`FLAIL | tokenizer "${tok.id}" launch method threw, trying next`, err); }
  }
  console.warn(
    `FLAIL | Tokenizer "${tok.id}" is active but no known launch method succeeded.`,
    "module.api keys:", api ? Object.keys(api) : "(no api object)",
    "globalThis.Tokenizer:", G ? Object.keys(G) : "(none)"
  );
  return false;
}

/**
 * Character Creator (Ship C1).
 *
 * A guided, multi-step wizard that walks a player through making a FLAIL
 * character. It is a *conductor*: later phases delegate each rules-bearing
 * choice to the apps that already exist (Background Picker, Starting Gear
 * Wizard, the per-class pickers). C1 covers the shell plus the three steps
 * that have no existing app of their own — identity, class, attributes —
 * and mints the actor at the end.
 *
 * Attribute generation (RAW): roll 3d6 for each attribute in order, keeping
 * the two highest dice (a 2-12 value) — that is exactly the `3d6kh2`
 * formula. Then the player may swap two scores. Rerolling is intentionally
 * not offered (RAW is roll-once); an Undo lets them repick the swap.
 *
 * C2 will insert background / class-build / starting-gear steps before the
 * final create, minting the draft earlier so the live-actor sub-apps can be
 * reused; C3 adds the player-self-serve socket path, quick-build and the
 * macro / API / sidebar entry points.
 */
export class FlailCharacterCreator extends HandlebarsApplicationMixin(ApplicationV2) {

  static STEPS = ["identity", "class", "attributes", "background", "build", "gear", "review"];

  static DEFAULT_OPTIONS = {
    id: "flail-character-creator",
    tag: "div",
    classes: ["flail", "character-creator"],
    position: { width: 640, height: 680 },
    window: { icon: "fa-solid fa-user-plus", resizable: true },
    actions: {
      ccBack:        FlailCharacterCreator.#onBack,
      ccNext:        FlailCharacterCreator.#onNext,
      ccCancel:      FlailCharacterCreator.#onCancel,
      ccPickClass:   FlailCharacterCreator.#onPickClass,
      ccRandomName:  FlailCharacterCreator.#onRandomName,
      ccRoll:        FlailCharacterCreator.#onRoll,
      ccSwap:        FlailCharacterCreator.#onSwap,
      ccUndoSwap:    FlailCharacterCreator.#onUndoSwap,
      ccEditImage:   FlailCharacterCreator.#onEditImage,
      ccQuickBuild:  FlailCharacterCreator.#onQuickBuild,
      ccOpenBackground: FlailCharacterCreator.#onOpenBackground,
      ccOpenBuild:   FlailCharacterCreator.#onOpenBuild,
      ccOpenGear:    FlailCharacterCreator.#onOpenGear,
      ccFinish:      FlailCharacterCreator.#onFinish
    }
  };

  static PARTS = {
    body: { template: "systems/flail/templates/apps/character-creator.hbs" }
  };

  constructor(options = {}) {
    super(options);
    this._step = "identity";
    this._data = {
      name: "",
      img: "icons/svg/mystery-man.svg",
      classKey: "",
      rolled: null,        // [{ value, dice:[{v,dropped}] }] in attribute order
      assignment: null,    // { attrKey: { value, dice } }
      hasSwapped: false
    };
    this._actor = null;        // draft actor, minted lazily (Tokenizer / final create)
    this._completed = false;   // true once the character is finalised
    this._hookIds = [];        // { hook, id } listeners live while a draft exists
  }

  get title() { return "FLAIL — Create a Character"; }

  /* -------------------------------------------- */
  /*  Context                                     */
  /* -------------------------------------------- */

  async _prepareContext(options) {
    const ctx = await super._prepareContext(options);
    const step = this._step;
    const idx = FlailCharacterCreator.STEPS.indexOf(step);

    ctx.step = step;
    ctx.isIdentity   = step === "identity";
    ctx.isClass      = step === "class";
    ctx.isAttributes = step === "attributes";
    ctx.isBackground = step === "background";
    ctx.isBuild      = step === "build";
    ctx.isGear       = step === "gear";
    ctx.isReview     = step === "review";
    ctx.isFirst = idx === 0;
    ctx.isLast  = idx === FlailCharacterCreator.STEPS.length - 1;

    const labels = {
      identity: "Identity", class: "Class", attributes: "Attributes",
      background: "Background", build: "Class", gear: "Gear", review: "Review"
    };
    ctx.steps = FlailCharacterCreator.STEPS.map((k, i) => ({
      key: k, label: labels[k], active: k === step, done: i < idx, num: i + 1
    }));

    ctx.data = this._data;
    // Keep the preview portrait in step with a live draft (Tokenizer art).
    if (this._actor) ctx.data = { ...this._data, img: this._actor.img };

    // Class cards.
    ctx.classes = FLAIL.classKeys.map(k => {
      const c = FLAIL.classes[k];
      return {
        key: k,
        label: game.i18n.localize(c.label),
        maxHp: c.maxHp,
        armour: (c.armour ?? []).join(", ") || "—",
        weapons: (c.weaponSpecialty ?? []).join(", ") || "—",
        resource: c.resource || null,
        skills: (c.specialSkills ?? []).map(s => ({ name: s.name, desc: s.desc })),
        selected: k === this._data.classKey
      };
    });
    ctx.selectedClass = this._data.classKey
      ? ctx.classes.find(c => c.key === this._data.classKey)
      : null;

    // Attribute rows (values + the dice that justify them, which travel
    // with the value across a swap).
    ctx.rolled = !!this._data.assignment;
    ctx.attrRows = FLAIL.attributeKeys.map(k => {
      const cell = this._data.assignment?.[k];
      return { key: k, label: k.toUpperCase(), value: cell?.value ?? null, dice: cell?.dice ?? [] };
    });
    ctx.attrOptions = FLAIL.attributeKeys.map(k => ({ key: k, label: k.toUpperCase() }));
    ctx.hasSwapped = this._data.hasSwapped;

    // --- C2: background / build / gear / review (read from the live draft) ---
    const actor = this._actor ?? null;
    ctx.buildHint = this._data.classKey ? CC_BUILD_HINTS[this._data.classKey] : "";

    if (actor) {
      const bg = actor.items.find(i => i.type === "background");
      ctx.backgroundName = bg?.name ?? null;
      // Items that occupy an inventory slot = "gear" the player has placed.
      ctx.gearCount = actor.items.filter(i => i.system && ("location" in i.system) && i.system.location && i.system.location !== "unequipped").length;

      // Review summary.
      ctx.review = {
        name: actor.name,
        img: actor.img,
        className: game.i18n.localize(FLAIL.classes[actor.system?.class]?.label ?? ""),
        level: actor.system?.level ?? 1,
        hp: actor.system?.hp ?? { value: 0, max: 0 },
        coins: actor.system?.coins ?? 0,
        attrs: FLAIL.attributeKeys.map(k => ({ label: k.toUpperCase(), value: actor.system?.attributes?.[k]?.base ?? 0 })),
        backgroundName: bg?.name ?? "—",
        itemCount: actor.items.filter(i => !["background"].includes(i.type)).length
      };
    }

    // Footer gating.
    ctx.nextLabel  = ctx.isReview ? "Finish" : "Next";
    ctx.nextAction = ctx.isReview ? "ccFinish" : "ccNext";
    ctx.nextDisabled =
      (ctx.isClass && !this._data.classKey) ||
      (ctx.isAttributes && !this._data.assignment);

    return ctx;
  }

  /* -------------------------------------------- */
  /*  Step input persistence                      */
  /* -------------------------------------------- */

  /** Persist any free-text inputs on the current step before switching. */
  #syncStepInputs() {
    const root = this.element;
    if (!root) return;
    if (this._step === "identity") {
      const nameEl = root.querySelector('input[name="charname"]');
      if (nameEl) this._data.name = nameEl.value;
    }
  }

  /* -------------------------------------------- */
  /*  Navigation                                  */
  /* -------------------------------------------- */

  static async #onBack(event, target) {
    this.#syncStepInputs();
    const idx = FlailCharacterCreator.STEPS.indexOf(this._step);
    if (idx > 0) { this._step = FlailCharacterCreator.STEPS[idx - 1]; this.render(); }
  }

  static async #onNext(event, target) {
    this.#syncStepInputs();
    // Per-step validation.
    if (this._step === "class" && !this._data.classKey) {
      ui.notifications?.warn("FLAIL: choose a class first.");
      return;
    }
    if (this._step === "attributes") {
      if (!this._data.assignment) { ui.notifications?.warn("FLAIL: roll attributes first."); return; }
      // Create-first: from here on the sub-apps (Background Picker, Starting
      // Gear Wizard, the sheet's class pickers) operate on a live actor.
      const actor = await this.#ensureDraft();
      if (!actor) return;
      await this.#syncDraftFromData();
    }
    const idx = FlailCharacterCreator.STEPS.indexOf(this._step);
    if (idx < FlailCharacterCreator.STEPS.length - 1) {
      this._step = FlailCharacterCreator.STEPS[idx + 1];
      this.render();
    }
  }

  static async #onCancel(event, target) {
    this.close();
  }

  static async #onEditImage(event, target) {
    const forceFilePicker = event?.shiftKey === true;
    const tok = ccFindTokenizer();

    // Tokenizer path — it operates on an actor document, so mint the draft
    // first, then hand it to the module's API. Shift-click bypasses to the
    // plain FilePicker.
    if (tok && !forceFilePicker) {
      const actor = await this.#ensureDraft();
      if (!actor) return;
      const ok = await ccLaunchTokenizer(tok, actor);
      if (!ok) {
        ui.notifications?.warn(`FLAIL: detected ${tok.id} but couldn't find its launch API — using the file picker. (Its available API methods are logged to the console (F12) so the exact call can be wired.)`);
        return this.#browseImage();
      }
      // Tokenizer writes back asynchronously; the updateActor hook (wired in
      // #ensureDraft) re-renders us so the new art shows.
      this._data.img = this._actor.img;
      if (this.rendered) this.render();
      return;
    }

    return this.#browseImage();
  }

  /** Plain Foundry FilePicker fallback for the portrait. */
  async #browseImage() {
    const FP = foundry.applications.apps.FilePicker?.implementation ?? globalThis.FilePicker;
    if (!FP) { ui.notifications?.warn("FilePicker unavailable in this environment."); return; }
    const fp = new FP({
      type: "image",
      current: this._data.img,
      callback: async (path) => {
        this._data.img = path;
        if (this._actor) await this._actor.update({ img: path });
        this.render();
      }
    });
    return fp.browse();
  }

  /* -------------------------------------------- */
  /*  Class                                       */
  /* -------------------------------------------- */

  static async #onPickClass(event, target) {
    const key = target.dataset.classKey;
    if (!key || !FLAIL.classes[key]) return;
    this._data.classKey = key;
    this.render();
  }

  static async #onRandomName(event, target) {
    this._data.name = ccRandomName();
    this.render();
  }

  /* -------------------------------------------- */
  /*  Attributes                                  */
  /* -------------------------------------------- */

  static async #onRoll(event, target) {
    if (this._data.assignment) return;   // no reroll once set
    await this.#rollAttributes();
    this.render();
  }

  /** Roll 3d6kh2 for each attribute in order; store values + kept/dropped dice. */
  async #rollAttributes() {
    const rolled = [];
    const assignment = {};
    for (const k of FLAIL.attributeKeys) {
      const r = await new Roll("3d6kh2").evaluate();
      try { game.dice3d?.showForRoll?.(r, game.user, true); } catch (_) {}
      const dice = (r.dice?.[0]?.results ?? []).map(d => ({ v: d.result, dropped: !d.active }));
      const cell = { value: r.total, dice };
      rolled.push(cell);
      assignment[k] = cell;
    }
    this._data.rolled = rolled;
    this._data.assignment = assignment;
    this._data.hasSwapped = false;
  }

  static async #onSwap(event, target) {
    if (this._data.hasSwapped || !this._data.assignment) return;
    const root = this.element;
    const a = root.querySelector('select[name="swapA"]')?.value;
    const b = root.querySelector('select[name="swapB"]')?.value;
    if (!a || !b || a === b) { ui.notifications?.warn("FLAIL: pick two different attributes to swap."); return; }
    const tmp = this._data.assignment[a];
    this._data.assignment[a] = this._data.assignment[b];
    this._data.assignment[b] = tmp;
    this._data.hasSwapped = true;
    this.render();
  }

  static async #onUndoSwap(event, target) {
    if (!this._data.rolled) return;
    // Restore the original rolled order (attributeKeys ↔ rolled index).
    const assignment = {};
    FLAIL.attributeKeys.forEach((k, i) => { assignment[k] = this._data.rolled[i]; });
    this._data.assignment = assignment;
    this._data.hasSwapped = false;
    this.render();
  }

  /* -------------------------------------------- */
  /*  C2 — background / build / gear hand-offs     */
  /* -------------------------------------------- */

  static async #onOpenBackground(event, target) {
    const actor = await this.#ensureDraft();
    if (!actor) return;
    new BackgroundPicker(actor).render(true);
  }

  static async #onOpenBuild(event, target) {
    const actor = await this.#ensureDraft();
    if (!actor) return;
    // The class pickers live on the sheet's Class tab — open it there.
    const sheet = actor.sheet;
    if (!sheet) return;
    sheet._activeTab = "class";
    sheet.render(true);
  }

  static async #onOpenGear(event, target) {
    const actor = await this.#ensureDraft();
    if (!actor) return;
    new StartingGearWizard(actor).render(true);
  }

  /* -------------------------------------------- */
  /*  Finish                                      */
  /* -------------------------------------------- */

  static async #onFinish(event, target) {
    this.#syncStepInputs();
    if (!this._data.classKey) { ui.notifications?.warn("FLAIL: choose a class first."); return; }
    if (!this._data.assignment) { ui.notifications?.warn("FLAIL: roll attributes first."); return; }

    const name = (this._data.name ?? "").trim() || "New Character";
    const classKey = this._data.classKey;
    const maxHp = FLAIL.classes[classKey]?.maxHp ?? 6;

    // A draft always exists by the review step (minted at attributes→background).
    // Finalise it in place so its background, class picks and gear survive.
    if (this._actor) {
      await this.#syncDraftFromData();
      try {
        await this._actor.update({ "flags.flail.creationDraft": false });
      } catch (err) {
        console.error("FLAIL | Character finalisation failed", err);
        ui.notifications?.error("FLAIL: couldn't finalise the character — see console.");
        return;
      }
      this._completed = true;
      await this.#postCreationCard(this._actor);
      ui.notifications?.info(`FLAIL: created ${this._actor.name}, a level 1 ${game.i18n.localize(FLAIL.classes[classKey].label)}.`);
      this._actor.sheet?.render(true);
      return this.close();
    }

    // Fallback: no draft (shouldn't happen in the C2 flow) — create fresh.
    const attributes = {};
    for (const k of FLAIL.attributeKeys) attributes[k] = { base: this._data.assignment[k].value };
    const OWN = CONST.DOCUMENT_OWNERSHIP_LEVELS;
    let actor;
    try {
      actor = await Actor.implementation.create({
        name, type: "character", img: this._data.img,
        system: { class: classKey, level: 1, attributes, hp: { value: maxHp, max: maxHp } },
        ownership: { default: OWN.NONE, [game.user.id]: OWN.OWNER }
      });
    } catch (err) {
      console.error("FLAIL | Character creation failed", err);
      ui.notifications?.error("FLAIL: couldn't create the character — see console. (You may not have permission to create actors; a GM can run this, or enable the Create Actors permission.)");
      return;
    }
    if (!actor) return;
    this._completed = true;
    await this.#postCreationCard(actor);
    ui.notifications?.info(`FLAIL: created ${actor.name}, a level 1 ${game.i18n.localize(FLAIL.classes[classKey].label)}.`);
    actor.sheet?.render(true);
    this.close();
  }

  /* -------------------------------------------- */
  /*  Quick build                                 */
  /* -------------------------------------------- */

  static async #onQuickBuild(event, target) {
    const classKey = await this.#promptQuickClass();
    if (!classKey) return;

    this._data.classKey = classKey;
    if (!(this._data.name ?? "").trim()) this._data.name = ccRandomName();
    await this.#rollAttributes();
    this.#autoSwapForClass(classKey);

    const actor = await this.#ensureDraft();
    if (!actor) return;
    await this.#syncDraftFromData();
    await this.#applyRandomBackground(actor, classKey);

    try { await actor.update({ "flags.flail.creationDraft": false }); } catch (_) {}
    this._completed = true;
    await this.#postCreationCard(actor);
    ui.notifications?.info(`FLAIL: quick-built ${actor.name}. Finish any class picks and starting gear on the sheet.`);
    actor.sheet?.render(true);
    this.close();
  }

  /** Dialog: choose a class or let it be random. Returns a class key or null. */
  async #promptQuickClass() {
    const opts = `<option value="__random">🎲 Random class</option>` +
      FLAIL.classKeys.map(k => `<option value="${k}">${game.i18n.localize(FLAIL.classes[k].label)}</option>`).join("");
    const choice = await foundry.applications.api.DialogV2.wait({
      window: { title: "Quick build", icon: "fas fa-bolt" },
      content: `<div style="padding:0.25rem 0;color:#3a2c0a;">
          <p style="margin:0 0 0.4rem;">Roll a complete level-1 character in one step. Pick a class, or let fate decide.</p>
          <select name="qc" style="width:100%;">${opts}</select>
        </div>`,
      buttons: [
        { action: "go", label: "Quick build", icon: "fas fa-bolt", default: true,
          callback: (event, btn, dialog) => dialog.element.querySelector('select[name="qc"]')?.value ?? "__random" },
        { action: "cancel", label: "Cancel", icon: "fas fa-times", callback: () => null }
      ],
      rejectClose: false, submit: v => v
    });
    if (!choice) return null;
    if (choice === "__random") return FLAIL.classKeys[Math.floor(Math.random() * FLAIL.classKeys.length)];
    return choice;
  }

  /** Swap the highest rolled score into the class's key attribute. */
  #autoSwapForClass(classKey) {
    const key = CC_CLASS_KEY_ATTR[classKey];
    if (!key || !this._data.assignment) return;
    let bestK = null, bestV = -Infinity;
    for (const k of FLAIL.attributeKeys) {
      const v = this._data.assignment[k].value;
      if (v > bestV) { bestV = v; bestK = k; }
    }
    if (!bestK || bestK === key) return;
    const tmp = this._data.assignment[key];
    this._data.assignment[key] = this._data.assignment[bestK];
    this._data.assignment[bestK] = tmp;
  }

  /** Embed a random class-appropriate background from the compendium. */
  async #applyRandomBackground(actor, classKey) {
    const pack = game.packs.get("world.flail-backgrounds");
    if (!pack) return;
    try {
      const docs = await pack.getDocuments();
      const stock = docs.filter(d => !d.system?.isCustomTemplate && (!d.system?.classKey || d.system.classKey === classKey));
      const pool = stock.length ? stock : docs.filter(d => !d.system?.isCustomTemplate);
      if (!pool.length) return;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      const data = pick.toObject();
      delete data._id;
      await actor.createEmbeddedDocuments("Item", [data]);
    } catch (err) { console.warn("FLAIL | quick-build background failed", err); }
  }

  /** Post a short "a new hero joins" chat card on finish. */
  async #postCreationCard(actor) {
    try {
      const className = game.i18n.localize(FLAIL.classes[actor.system?.class]?.label ?? "");
      const bg = actor.items.find(i => i.type === "background");
      await ChatMessage.create({
        content: `<div class="flail-chat-card flail-creation-card">
            <p><i class="fas fa-user-plus"></i> <strong>${actor.name}</strong> joins the fray — a level ${actor.system?.level ?? 1} ${className}${bg ? ` (${bg.name})` : ""}.</p>
          </div>`
      });
    } catch (err) { console.warn("FLAIL | creation card failed", err); }
  }

  /* -------------------------------------------- */
  /*  Draft actor lifecycle                       */
  /* -------------------------------------------- */

  /** Plain data object describing the draft, for local or proxied creation. */
  #draftData() {
    const attributes = {};
    if (this._data.assignment) {
      for (const k of FLAIL.attributeKeys) attributes[k] = this._data.assignment[k].value;
    }
    return {
      name: (this._data.name ?? "").trim() || "New Character",
      img: this._data.img,
      classKey: this._data.classKey || "warrior",
      attributes
    };
  }

  /** Wait (briefly) for a proxied actor to sync in from the GM's client. */
  async #awaitActor(actorId) {
    const existing = game.actors.get(actorId);
    if (existing) return existing;
    return new Promise((resolve) => {
      const hid = Hooks.on("createActor", (doc) => {
        if (doc?.id !== actorId) return;
        Hooks.off("createActor", hid);
        resolve(doc);
      });
      setTimeout(() => { Hooks.off("createActor", hid); resolve(game.actors.get(actorId) ?? null); }, 5000);
    });
  }

  /**
   * Mint the draft actor on demand (for Tokenizer, which needs a document).
   * Seeds from whatever is known so far; the final create updates the rest.
   * Flagged `creationDraft` so #_onClose can delete it if the flow is
   * abandoned.
   */
  async #ensureDraft() {
    if (this._actor) return this._actor;

    const payload = this.#draftData();

    if (ccCanCreateActors()) {
      // Direct create (GM or a player with the Create Actors permission).
      const OWN = CONST.DOCUMENT_OWNERSHIP_LEVELS;
      const attributes = {};
      for (const k of FLAIL.attributeKeys) attributes[k] = { base: payload.attributes[k] ?? 8 };
      const maxHp = FLAIL.classes[payload.classKey]?.maxHp ?? 6;
      try {
        this._actor = await Actor.implementation.create({
          name: payload.name, type: "character", img: payload.img,
          system: { class: payload.classKey, level: 1, attributes, hp: { value: maxHp, max: maxHp } },
          ownership: { default: OWN.NONE, [game.user.id]: OWN.OWNER },
          flags: { flail: { creationDraft: true } }
        });
      } catch (err) {
        console.error("FLAIL | draft actor creation failed", err);
        ui.notifications?.error("FLAIL: couldn't create a draft character — see console.");
        return null;
      }
    } else {
      // Player self-serve: proxy creation through an online GM.
      const res = await ccRequestDraftFromGM(payload);
      if (res?.error === "no-gm") return null;
      if (res?.error === "timeout" || !res?.actorId) {
        ui.notifications?.error("FLAIL: the GM's client didn't respond — ask your GM to be online, then try again.");
        return null;
      }
      // The new actor syncs to us via Foundry; wait briefly if it's not here yet.
      this._actor = game.actors.get(res.actorId) ?? await this.#awaitActor(res.actorId);
      if (!this._actor) {
        ui.notifications?.error("FLAIL: your character was created but hasn't synced yet — try reopening it from the sidebar.");
        return null;
      }
    }

    // Keep the wizard in step with the live draft: Tokenizer art, and items
    // embedded by the Background Picker / class pickers / Gear Wizard (so the
    // background name, gear count and review summary stay current).
    const isDraft = (doc) => doc?.id === this._actor?.id || doc?.parent?.id === this._actor?.id;
    const refresh = (doc) => { if (isDraft(doc)) { this._data.img = this._actor?.img ?? this._data.img; if (this.rendered) this.render(); } };
    for (const hook of ["updateActor", "createItem", "deleteItem", "updateItem"]) {
      this._hookIds.push({ hook, id: Hooks.on(hook, refresh) });
    }
    return this._actor;
  }

  /** Push the wizard's known data (class, level, attributes, HP, name, img)
   *  onto the live draft so the sheet/pickers and the review all see it. */
  async #syncDraftFromData() {
    if (!this._actor) return;
    const classKey = this._data.classKey || "warrior";
    const maxHp = FLAIL.classes[classKey]?.maxHp ?? 6;
    const upd = {
      name: (this._data.name ?? "").trim() || "New Character",
      img: this._data.img,
      "system.class": classKey,
      "system.level": 1,
      "system.hp.max": maxHp,
      "system.hp.value": maxHp
    };
    if (this._data.assignment) {
      for (const k of FLAIL.attributeKeys) upd[`system.attributes.${k}.base`] = this._data.assignment[k].value;
    }
    try { await this._actor.update(upd); }
    catch (err) { console.warn("FLAIL | failed to sync draft from data", err); }
  }

  /** @inheritdoc — discard an unfinished draft when the window closes. */
  async _onClose(options) {
    await super._onClose?.(options);
    for (const { hook, id } of this._hookIds) Hooks.off(hook, id);
    this._hookIds = [];
    if (this._actor && !this._completed) {
      try {
        if (this._actor.getFlag?.("flail", "creationDraft")) await this._actor.delete();
      } catch (err) { console.warn("FLAIL | failed to clean up draft character", err); }
      this._actor = null;
    }
  }
}
