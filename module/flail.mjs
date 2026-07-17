import { FLAIL } from "./helpers/config.mjs";

import { FlailCharacterModel } from "./data/actor-character.mjs";
import { FlailNpcModel }       from "./data/actor-npc.mjs";
import { FlailConstructModel } from "./data/actor-construct.mjs";

import {
  FlailWeaponModel,
  FlailArmourModel,
  FlailGearModel,
  FlailSpellModel,
  FlailPrayerModel,
  FlailGiftModel,
  FlailTalentModel,
  FlailGadgetModel,
  FlailFeatureModel,
  FlailConditionModel,
  FlailInstrumentModel,
  FlailGuildModel
} from "./data/items.mjs";

import { FlailActor } from "./documents/actor.mjs";
import { FlailCombat, FlailCombatant } from "./documents/combat.mjs";
import { FlailItem }  from "./documents/item.mjs";

import { FlailCharacterSheet } from "./sheets/character-sheet.mjs";
import { FlailNpcSheet }       from "./sheets/npc-sheet.mjs";
import { FlailConstructSheet } from "./sheets/construct-sheet.mjs";
import { FlailItemSheet }      from "./sheets/item-sheet.mjs";

import { rollSave }    from "./dice/save.mjs";
import { rollToHit }   from "./dice/to-hit.mjs";
import { rollInstrumentPlay } from "./dice/instrument-play.mjs";
import { analyzePool } from "./dice/poker.mjs";
import { registerHandlebarsHelpers } from "./helpers/handlebars.mjs";
import { registerChatListeners }     from "./chat/chat-listeners.mjs";
import { ensureCommonItemsCompendium } from "./setup/import-common-items.mjs";
import { ensureDarkSpellsCompendium } from "./setup/import-dark-spells.mjs";
import { ensureWizardSpellsCompendium } from "./setup/import-wizard-spells.mjs";
import { ensurePrimalGiftsCompendium } from "./setup/import-primal-gifts.mjs";
import { ensureTinkererGadgetsCompendium } from "./setup/import-tinkerer-gadgets.mjs";
import { ensureThievingTalentsCompendium } from "./setup/import-thieving-talents.mjs";
import { ensureFlailRollTables, ensureFlailMacros } from "./setup/import-rolltables.mjs";
import { ensureFlailBestiary } from "./setup/import-bestiary.mjs";
import { ensureFlailUniqueItems } from "./setup/import-unique-items.mjs";
import { ensureDivinePrayersCompendium } from "./setup/import-prayers.mjs";
import { ensureConditionsCompendium } from "./setup/import-conditions.mjs";
import { ensureGuildsCompendium } from "./setup/import-guilds.mjs";
import { ensureHexcrawlTablesCompendium } from "./setup/import-hexcrawl-tables.mjs";

const TAG = "FLAIL |";

/**
 * Resolve the Actors / Items collection class across Foundry versions.
 */
function resolveCollections() {
  const root =
    foundry?.documents?.collections ??
    foundry?.documents ??
    globalThis;
  return {
    Actors: root.Actors ?? globalThis.Actors ?? null,
    Items:  root.Items  ?? globalThis.Items  ?? null
  };
}

/* -------------------------------------------- */
/*  init                                        */
/* -------------------------------------------- */

Hooks.once("init", () => {
  try {
    console.log(`${TAG} init — start`);

    /* ----- API surface ----- */
    game.flail = {
      config: FLAIL,
      rollSave,
      rollToHit,
      rollInstrumentPlay,
      analyzePool,
      documents: { FlailActor, FlailItem }
    };
    CONFIG.FLAIL = FLAIL;

    /* ----- World settings ----- */
    // Tracks the bundled-items schema version installed in this world,
    // so the importer can re-sync items when the system is upgraded.
    game.settings.register("flail", "commonItemsVersion", {
      name: "FLAIL Common Items version",
      hint: "Internal — last bundled-items version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "darkSpellsVersion", {
      name: "FLAIL Dark Spells version",
      hint: "Internal — last bundled dark-spells version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "wizardSpellsVersion", {
      name: "FLAIL Wizard Spells version",
      hint: "Internal — last bundled wizard-spells version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "primalGiftsVersion", {
      name: "FLAIL Druid Primal Gifts version",
      hint: "Internal — last bundled primal-gifts version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "tinkererGadgetsVersion", {
      name: "FLAIL Tinkerer Gadgets version",
      hint: "Internal — last bundled tinkerer-gadgets version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "thievingTalentsVersion", {
      name: "FLAIL Thieving Talents version",
      hint: "Internal — last bundled thieving-talents version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "rolltablesVersion", {
      name: "FLAIL Rolltables version",
      hint: "Internal — last bundled rolltables version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "macrosVersion", {
      name: "FLAIL Macros version",
      hint: "Internal — last bundled macros version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "bestiaryVersion", {
      name: "FLAIL Bestiary version",
      hint: "Internal — last bundled bestiary version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "uniqueItemsVersion", {
      name: "FLAIL Unique Items version",
      hint: "Internal — last bundled unique-items version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "divinePrayersVersion", {
      name: "FLAIL Divine Prayers version",
      hint: "Internal — last bundled divine-prayers version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "conditionsVersion", {
      name: "FLAIL Conditions version",
      hint: "Internal — last bundled conditions version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "guildsVersion", {
      name: "FLAIL Guilds version",
      hint: "Internal — last bundled guilds version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });
    game.settings.register("flail", "hexcrawlTablesVersion", {
      name: "FLAIL Hexcrawl Tables version",
      hint: "Internal — last bundled hexcrawl-tables version this world synced from. Do not edit.",
      scope: "world",
      config: false,
      type: Number,
      default: 0
    });

    /* ----- Document classes ----- */
    CONFIG.Actor.documentClass = FlailActor;
    CONFIG.Item.documentClass  = FlailItem;
    CONFIG.Combat.documentClass = FlailCombat;
    CONFIG.Combatant.documentClass = FlailCombatant;
    console.log(`${TAG} init — document classes assigned`);

    /* ----- Combat initiative ----- */
    // FlailCombat overrides rollInitiative entirely to implement the
    // page-54 DEX-save rule; this formula is only a defensive default
    // for anything that bypasses the override (macros, other modules).
    // Explicit "1d20" avoids Foundry's null-formula fallback which
    // tries to resolve `@init` / `@attributes.dex.mod` from actor
    // rollData and throws "Unresolved StringTerm undefined".
    CONFIG.Combat.initiative = {
      formula:  "1d20",
      decimals: 0
    };

    /* ----- Data models ----- */
    CONFIG.Actor.dataModels = {
      character: FlailCharacterModel,
      npc:       FlailNpcModel,
      construct: FlailConstructModel
    };
    CONFIG.Item.dataModels = {
      weapon:     FlailWeaponModel,
      armour:     FlailArmourModel,
      gear:       FlailGearModel,
      spell:      FlailSpellModel,
      prayer:     FlailPrayerModel,
      gift:       FlailGiftModel,
      talent:     FlailTalentModel,
      gadget:     FlailGadgetModel,
      feature:    FlailFeatureModel,
      condition:  FlailConditionModel,
      instrument: FlailInstrumentModel,
      guild:      FlailGuildModel
    };
    console.log(`${TAG} init — data models registered`);

    /* ----- Sheet registration ----- */
    const { Actors, Items } = resolveCollections();
    if (!Actors || !Items) {
      console.error(`${TAG} init — could not resolve Actors/Items collection class`);
    } else {
      try {
        Actors.registerSheet("flail", FlailCharacterSheet, {
          types: ["character"], makeDefault: true, label: "FLAIL.Sheet.Character"
        });
        Actors.registerSheet("flail", FlailNpcSheet, {
          types: ["npc"], makeDefault: true, label: "FLAIL.Sheet.NPC"
        });
        Actors.registerSheet("flail", FlailConstructSheet, {
          types: ["construct"], makeDefault: true, label: "FLAIL.Sheet.Construct"
        });
        Items.registerSheet("flail", FlailItemSheet, {
          makeDefault: true, label: "FLAIL.Sheet.Item"
        });
        console.log(`${TAG} init — sheets registered`);
      } catch (err) {
        console.error(`${TAG} init — sheet registration failed:`, err);
      }
    }

    /* ----- Handlebars helpers ----- */
    try {
      registerHandlebarsHelpers();
      console.log(`${TAG} init — handlebars helpers registered`);
    } catch (err) {
      console.error(`${TAG} init — handlebars helpers failed:`, err);
    }

    /* ----- Template preload (non-blocking) ----- */
    const loader = foundry.applications?.handlebars?.loadTemplates ?? globalThis.loadTemplates;
    if (typeof loader === "function") {
      loader([
        "systems/flail/templates/actor/parts/banner.hbs",
        "systems/flail/templates/actor/parts/tabs-nav.hbs",
        "systems/flail/templates/actor/parts/abilities-panel.hbs",
        "systems/flail/templates/actor/parts/inventory-panel.hbs",
        "systems/flail/templates/actor/parts/class-panel.hbs",
        "systems/flail/templates/actor/parts/skills-row.hbs",
        "systems/flail/templates/actor/parts/attributes.hbs",
        "systems/flail/templates/actor/parts/vitals.hbs",
        "systems/flail/templates/actor/parts/quick-attacks.hbs",
        "systems/flail/templates/actor/parts/main-row.hbs",
        "systems/flail/templates/actor/parts/inventory-slot.hbs",
        "systems/flail/templates/actor/parts/legend.hbs",
        "systems/flail/templates/actor/parts/class-extras.hbs",
        "systems/flail/templates/actor/parts/class-details.hbs",
        "systems/flail/templates/actor/parts/items-and-skills.hbs",
        "systems/flail/templates/actor/parts/conditions-strip.hbs",
        "systems/flail/templates/actor/parts/loose-items.hbs",
        "systems/flail/templates/actor/parts/biography.hbs",
        "systems/flail/templates/item/parts/header.hbs",
        "systems/flail/templates/item/parts/body.hbs",
        "systems/flail/templates/item/types/weapon.hbs",
        "systems/flail/templates/item/types/armour.hbs",
        "systems/flail/templates/item/types/gear.hbs",
        "systems/flail/templates/item/types/spell.hbs",
        "systems/flail/templates/item/types/prayer.hbs",
        "systems/flail/templates/item/types/gift.hbs",
        "systems/flail/templates/item/types/talent.hbs",
        "systems/flail/templates/item/types/gadget.hbs",
        "systems/flail/templates/item/types/feature.hbs",
        "systems/flail/templates/item/types/condition.hbs",
        "systems/flail/templates/item/types/instrument.hbs",
        "systems/flail/templates/item/types/guild.hbs",
        "systems/flail/templates/chat/attack-roll.hbs",
        "systems/flail/templates/chat/save-roll.hbs",
        "systems/flail/templates/chat/cast-prayer.hbs",
        "systems/flail/templates/chat/lay-on-hands.hbs",
        "systems/flail/templates/chat/miracle-call.hbs",
        "systems/flail/templates/chat/rest.hbs",
        "systems/flail/templates/chat/shapeshift-start.hbs",
        "systems/flail/templates/chat/shapeshift-revert.hbs"
      ]).catch(err => console.warn(`${TAG} template preload skipped:`, err?.message ?? err));
    }

    console.log(`${TAG} init — COMPLETE`);
  } catch (err) {
    console.error(`${TAG} init — UNHANDLED ERROR:`, err);
  }
});

/* -------------------------------------------- */
/*  i18nInit                                    */
/* -------------------------------------------- */

Hooks.once("i18nInit", () => {
  try {
    console.log(`${TAG} i18nInit — start`);
    // ADD to Foundry's existing statusEffects rather than replacing the array
    // (defaults like 'dead' must remain for token HUD).
    const conditionIcons = {
      drained:          "icons/svg/sleep.svg",
      exhausted:        "icons/svg/unconscious.svg",
      injured:          "icons/svg/blood.svg",
      persistentInjury: "icons/svg/skull.svg",
      poisoned:         "icons/svg/poison.svg",
      starved:          "icons/svg/stoned.svg",
      petrified:        "icons/svg/paralysis.svg"
    };
    const additions = Object.entries(FLAIL.conditions).map(([key, def]) => ({
      id: `flail.${key}`,
      name: game.i18n.localize(def.label),
      img: conditionIcons[key] ?? "icons/svg/aura.svg"
    }));
    if (Array.isArray(CONFIG.statusEffects)) CONFIG.statusEffects.push(...additions);
    else CONFIG.statusEffects = additions;
    console.log(`${TAG} i18nInit — COMPLETE (${additions.length} status effects added)`);
  } catch (err) {
    console.error(`${TAG} i18nInit — UNHANDLED ERROR:`, err);
  }
});

/* -------------------------------------------- */
/*  Lifecycle markers                           */
/* -------------------------------------------- */

Hooks.once("setup",       () => console.log(`${TAG} setup`));
Hooks.once("ready", async () => {
  console.log(`${TAG} ready`);
  await ensureCommonItemsCompendium();
  await ensureDarkSpellsCompendium();
  await ensureWizardSpellsCompendium();
  await ensurePrimalGiftsCompendium();
  await ensureTinkererGadgetsCompendium();
  await ensureThievingTalentsCompendium();
  await ensureFlailRollTables();
  await ensureFlailMacros();
  await ensureFlailBestiary();
  await ensureFlailUniqueItems();
  await ensureDivinePrayersCompendium();
  await ensureConditionsCompendium();
  await ensureGuildsCompendium();
  await ensureHexcrawlTablesCompendium();

  // Socket relay — players can't create Active Effects on actors they
  // don't own, so player-triggered buffs (Bard's Witness Me!) are
  // routed to the GM here for application.
  game.socket.on("system.flail", async (payload) => {
    if (!game.user.isGM) return;          // only the GM acts
    if (payload?.op !== "applyWitnessMe") return;

    const source = await fromUuid(payload.sourceUuid);
    if (!source) return;
    // Re-import so we don't have a circular module dependency at top of file.
    const { applyWitnessMeBuffFromSocket } =
      await import("./dice/to-hit.mjs");
    if (typeof applyWitnessMeBuffFromSocket === "function") {
      await applyWitnessMeBuffFromSocket(source);
    }
  });
});
Hooks.on  ("canvasReady", () => console.log(`${TAG} canvasReady`));

/* -------------------------------------------- */
/*  Wizard — auto-seed starter spellbook        */
/* -------------------------------------------- */

/**
 * When a Wizard character has a Master set for the first time (change
 * from empty to a Master key), auto-add three random arcane (common)
 * spells to their spellbook per FLAIL v0.2's "starting with three
 * random spells" rule. Also flip `wizardSpellbookSeeded` to true so
 * subsequent Master changes (via GM unlock) don't re-seed.
 *
 * Only the user who initiated the update runs the follow-up — the
 * hook fires on every connected client, but the userId gate keeps
 * one browser from racing another.
 */
Hooks.on("updateActor", async (actor, changed, options, userId) => {
  if (userId !== game.user.id) return;
  if (actor.type !== "character") return;
  if (actor.system.class !== "wizard") return;

  const newMaster = foundry.utils.getProperty(changed, "system.classOptions.wizardMaster");
  if (!newMaster) return;                          // no change or cleared
  if (actor.system.classOptions?.wizardSpellbookSeeded) return;  // already seeded

  try {
    const { WIZARD_SPELLS } = await import("./setup/wizard-spells-data.mjs");
    const arcanePool = WIZARD_SPELLS.filter(s => s.system.tradition === "arcane");
    // Fisher–Yates on a copy — good enough for 20 items.
    const pool = [...arcanePool];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const picks = pool.slice(0, 3).map(s => {
      const copy = foundry.utils.deepClone(s);
      delete copy._id;  // Foundry will assign a fresh embedded ID.
      return copy;
    });
    await actor.createEmbeddedDocuments("Item", picks);
    await actor.update({ "system.classOptions.wizardSpellbookSeeded": true });
    ui.notifications?.info(
      game.i18n.format("FLAIL.Wizard.SeededStarters", {
        names: picks.map(p => p.name).join(", ")
      })
    );
  } catch (err) {
    console.error("FLAIL | Failed to seed wizard starter spells", err);
    ui.notifications?.error("FLAIL: failed to seed wizard starter spells — see console.");
  }
});

/* -------------------------------------------- */
/*  Chat hook                                   */
/* -------------------------------------------- */

Hooks.on("renderChatMessageHTML", (message, html) => {
  try { registerChatListeners(message, html); }
  catch (err) { console.error(`${TAG} renderChatMessageHTML failed:`, err); }
});

/* -------------------------------------------- */
/*  Pre-create defaults                         */
/* -------------------------------------------- */

Hooks.on("preCreateActor", (actor, data) => {
  try {
    if (actor.type === "character") {
      actor.updateSource({
        "prototypeToken.actorLink": true,
        "prototypeToken.disposition": CONST.TOKEN_DISPOSITIONS.FRIENDLY
      });
    } else if (actor.type === "npc") {
      actor.updateSource({
        "prototypeToken.actorLink": false,
        "prototypeToken.disposition": CONST.TOKEN_DISPOSITIONS.HOSTILE
      });
    }
  } catch (err) {
    console.error(`${TAG} preCreateActor failed:`, err);
  }
});

Hooks.on("preCreateItem", (item, data) => {
  /* reserved */
});

/**
 * Class change → resync max HP to the new class' definition.
 */
Hooks.on("preUpdateActor", (actor, changes) => {
  try {
    if (actor.type !== "character") return;
    const newClass = foundry.utils.getProperty(changes, "system.class");
    if (!newClass || newClass === actor.system.class) return;

    const def = FLAIL.classes[newClass];
    if (!def) return;

    const wasFull = actor.system.hp.value === actor.system.hp.max;
    foundry.utils.setProperty(changes, "system.hp.max", def.maxHp);
    if (wasFull) foundry.utils.setProperty(changes, "system.hp.value", def.maxHp);

    if (def.resource) {
      const labelKey = `FLAIL.Resource.${def.resource.charAt(0).toUpperCase()}${def.resource.slice(1).toLowerCase()}`;
      foundry.utils.setProperty(changes, "system.resource.label", labelKey);
    } else {
      foundry.utils.setProperty(changes, "system.resource.label", "");
    }

    // Cleric fumble threshold semantics: resource.value stores the LOWEST
    // d20 roll that fumbles a prayer. Starts at 20 (only nat-20 fumbles)
    // and decreases by 1 each failed prayer until a long rest. Initialise
    // here so freshly-classed Clerics don't read out as "fumbles on 0".
    if (newClass === "cleric") {
      foundry.utils.setProperty(changes, "system.resource.value", 20);
    }

    // Cutthroat — Mark of the Guild: tokens equal to character level at
    // session start. When the class is first taken, seed with `level`
    // (which may also be in this update — read from the merged view).
    if (newClass === "cutthroat") {
      const level = foundry.utils.getProperty(changes, "system.level")
                 ?? actor.system?.level
                 ?? 1;
      foundry.utils.setProperty(changes, "system.guildTokens", level);
    }
  } catch (err) {
    console.error(`${TAG} preUpdateActor failed:`, err);
  }
});

/**
 * When a Cleric chooses or changes religion, sync their divine prayers:
 *
 *   1. Prune prayers belonging to the OLD religion (now invalid).
 *   2. Auto-populate prayers from the NEW religion (so the player doesn't
 *      have to drag all six from the compendium manually).
 *
 * Gated to the primary active GM so the mutation runs exactly once per
 * religion change. If both a GM and a player-owner were allowed to fire
 * the mutation, the create-step would race and produce duplicate prayer
 * items on the sheet. The delete-step is idempotent and harmless either
 * way; restricting both keeps the logic uniform.
 *
 * If no GM is connected, the auto-sync is skipped — the player can still
 * drag prayers manually from the compendium, and the sync will run the
 * next time a GM is present and the religion is toggled.
 */
Hooks.on("updateActor", async (actor, changes) => {
  try {
    if (actor.type !== "character") return;
    // Only the primary active GM runs the mutation.
    if (game.user.id !== game.users.activeGM?.id) return;

    const newReligion = foundry.utils.getProperty(changes, "system.classOptions.religion");
    if (newReligion === undefined) return;  // no religion change in this update

    /* ---------- 1. Prune prayers from the OLD religion ---------- */
    const stale = actor.items.filter(i =>
      i.type === "prayer"
      && i.system?.religion
      && i.system.religion !== newReligion
    );
    if (stale.length) {
      await actor.deleteEmbeddedDocuments("Item", stale.map(i => i.id));
      ui.notifications?.info(
        `FLAIL: removed ${stale.length} prayer${stale.length === 1 ? "" : "s"} from the previous religion.`
      );
    }

    /* ---------- 2. Auto-populate prayers from the NEW religion ---- */
    // Skip if the player cleared the dropdown (newReligion === "").
    if (!newReligion) return;

    const pack = game.packs.get("world.flail-divine-prayers");
    if (!pack) {
      console.warn(`${TAG} divine-prayers compendium not found — skipping auto-populate.`);
      return;
    }
    const docs = await pack.getDocuments();
    const prayers = docs.filter(d =>
      d.type === "prayer" && d.system?.religion === newReligion
    );

    // De-dup against anything already on the actor — e.g. if the player
    // had manually dragged one before changing religion via dropdown.
    const existingNames = new Set(
      actor.items
        .filter(i => i.type === "prayer" && i.system?.religion === newReligion)
        .map(i => i.name)
    );
    const toCreate = prayers
      .filter(p => !existingNames.has(p.name))
      .map(p => p.toObject());

    if (toCreate.length) {
      await actor.createEmbeddedDocuments("Item", toCreate);
      const label = FLAIL.religions[newReligion]?.label ?? newReligion;
      ui.notifications?.info(
        `FLAIL: added ${toCreate.length} ${label} prayer${toCreate.length === 1 ? "" : "s"}.`
      );
    }
  } catch (err) {
    console.error(`${TAG} updateActor (religion sync) failed:`, err);
  }
});

/**
 * Toxic Secretion (Druid Amphibian primal gift) — remind the player
 * that any melee attacker who dealt damage takes 2 damage back. Post
 * a small chat card whenever a Druid with this gift takes HP damage.
 *
 * Uses a preUpdate → update handoff via `options.flailToxicHpDelta` to
 * detect an HP decrease, then post the reminder in updateActor. Only
 * the user who triggered the change posts, so we don't multi-post.
 */
Hooks.on("preUpdateActor", (actor, changes, options) => {
  try {
    if (actor.type !== "character") return;
    if (actor.system.class !== "druid") return;
    if (!actor.system.primalGifts?.amphibian?.toxicSecretion) return;

    const newHp = foundry.utils.getProperty(changes, "system.hp.value");
    if (newHp === undefined) return;
    const oldHp = actor.system.hp.value;
    if (newHp >= oldHp) return;   // no damage, or healed

    options.flailToxicHpDelta = oldHp - newHp;
  } catch (err) {
    console.error(`${TAG} preUpdateActor (Toxic Secretion) failed:`, err);
  }
});

Hooks.on("updateActor", async (actor, changes, options, userId) => {
  try {
    if (game.user.id !== userId) return;   // only the triggering client posts
    if (!options.flailToxicHpDelta) return;

    const damage = options.flailToxicHpDelta;
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content: `
        <div class="flail-chat-card gift-reminder-card toxic-secretion">
          <header class="flail-chat-header">
            <i class="fas fa-skull-crossbones"></i>
            <span>${game.i18n.localize("FLAIL.PrimalGift.ToxicSecretion.Title")}</span>
          </header>
          <div class="flail-chat-body">
            <p>${game.i18n.format("FLAIL.PrimalGift.ToxicSecretion.Reminder", { damage })}</p>
          </div>
        </div>
      `
    });
  } catch (err) {
    console.error(`${TAG} updateActor (Toxic Secretion) failed:`, err);
  }
});

/**
 * Combat-end reminder — post a chat notice for the whole table when
 * a combat is ended, prompting players to roll for gear usage on the
 * items they used in the fight.
 *
 * Foundry's "End Combat" button deletes the Combat document, so we
 * hook `deleteCombat`. To avoid every client posting a copy of the
 * message, only the acting user emits it; and we skip the emit
 * entirely if the combat never actually started (a combat deleted
 * before it began isn't a fight and doesn't warrant a reminder).
 */
Hooks.on("deleteCombat", async (combat, options, userId) => {
  try {
    if (game.user.id !== userId) return;
    if (!combat.started) return;

    await ChatMessage.create({
      speaker: { alias: game.i18n.localize("FLAIL.Combat.EndAlias") },
      content: `
        <div class="flail-chat-card combat-end-card">
          <header class="flail-chat-header">
            <i class="fas fa-flag-checkered"></i>
            <span>${game.i18n.localize("FLAIL.Combat.EndTitle")}</span>
          </header>
          <div class="flail-chat-body">
            <p>${game.i18n.localize("FLAIL.Combat.EndReminder")}</p>
          </div>
        </div>
      `
    });
  } catch (err) {
    console.error(`${TAG} deleteCombat (usage reminder) failed:`, err);
  }
});

/**
 * Construct break-down auto-trigger — when a construct's HP hits 0
 * for the first time (and it isn't already broken), prompt the
 * acting user to pick an improvement to lose via the sheet's static
 * `breakDownConstruct` method. Guards:
 *
 *   - Only the user who triggered the update sees the prompt (so a
 *     GM applying damage sees the dialog, not every connected client).
 *   - Skips if already broken (avoids repeated prompts).
 *   - Skips if HP was already 0 before this update (edge case).
 *
 * The user can dismiss the prompt via "Later" — the sheet's Break
 * Down button then remains available for manual triggering.
 */
Hooks.on("updateActor", async (actor, changes, options, userId) => {
  try {
    if (actor.type !== "construct") return;
    if (game.user.id !== userId) return;
    const newHp = foundry.utils.getProperty(changes, "system.hp.value");
    if (newHp === undefined) return;
    if (newHp > 0) return;
    if (actor.system.broken) return;
    // Fire the break-down flow. It'll open its own dialog and commit
    // state; if the user dismisses, nothing changes and the sheet's
    // Break Down button remains available.
    await FlailConstructSheet.breakDownConstruct(actor);
  } catch (err) {
    console.error(`${TAG} updateActor (construct break-down) failed:`, err);
  }
});
