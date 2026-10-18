/**
 * Bundled Warlock Dark Pacts — first-class Foundry Items seeded into the
 * `world.flail-dark-pacts` compendium at world init.
 *
 * The four canonical pacts from the Warlock Player Reference Booklet
 * (Andre Novoa, Games Omnivorous, 2026) + one editable "Custom Pact"
 * template. Mirrors religions-data.mjs / masters-data.mjs.
 *
 * Reference resolution happens at sync time (import-dark-pacts.mjs):
 *   - invocations[] names → UUIDs in `world.flail-invocations`
 *   - fiend.name          → UUID of the matching NPC in `world.flail-bestiary`
 */

import { stableInvocationId, INVOCATION_TABLES } from "./invocations-data.mjs";

/** Same FNV-1a scheme as the other bundled class-feature Items. */
export function stablePactId(seed) {
  return stableInvocationId(seed);
}

/** Invocation refs for a pact, in d10 order (uuid filled at sync). */
function invocationRefs(pactKey) {
  return (INVOCATION_TABLES[pactKey] ?? []).map(([name]) => ({ uuid: "", name }));
}

/**
 * Build the 4 canonical Dark Pacts + Custom Pact template.
 */
export function buildDarkPactsData() {
  return [
    {
      _id: stablePactId("pact:infernalBargain"),
      name: "The Infernal Bargain",
      type: "pact",
      img: "icons/magic/unholy/silhouette-robe-evil-glow.webp",
      system: {
        tagline: "Bound by flesh, blood and violence to do the bidding of an ancient hell ruler.",
        description: "<p>Bound by flesh, blood and violence to do the bidding of an ancient hell ruler.</p>",
        pactKey: "infernalBargain",
        patronNames: ["Azhurak the Red King", "Vaalgorath", "The Ash Sultan", "Bael-Zhur"],
        patronBoon: "<p>Until the end of session, gain +2 TH and +3 DMG on the first attack against each target.</p>",
        fiend: { uuid: "", name: "Minotaur" },
        fiendNote: "Demon with name and appearance of player’s choice (use Minotaur stats).",
        fiendAnyUndead: false,
        invocations: invocationRefs("infernalBargain"),
        attributeBonuses: [],
        isCustomTemplate: false
      }
    },
    {
      _id: stablePactId("pact:voidCovenant"),
      name: "The Void Covenant",
      type: "pact",
      img: "icons/magic/control/hypnosis-mesmerism-eye.webp",
      system: {
        tagline: "Cosmic power granted by dead stars and horrors drifting beyond spacetime.",
        description: "<p>Cosmic power granted by dead stars and horrors drifting beyond spacetime.</p>",
        pactKey: "voidCovenant",
        patronNames: ["Yth-Naal", "The Crawling Eye", "Mother Vacuum", "The Black Moon"],
        patronBoon: "<p>Gain a ‘fallen star’ token; spend token to deal 2d20 damage to a single target.</p>",
        fiend: { uuid: "", name: "Colossal Praying Mantis" },
        fiendNote: "Eyeless watcher, void crawler, star spawn, tendril horror (use Colossal Praying Mantis stats).",
        fiendAnyUndead: false,
        invocations: invocationRefs("voidCovenant"),
        attributeBonuses: [],
        isCustomTemplate: false
      }
    },
    {
      _id: stablePactId("pact:draconicAccord"),
      name: "The Draconic Accord",
      type: "pact",
      img: "icons/magic/fire/explosion-fireball-large-orange.webp",
      system: {
        tagline: "Primeval draconic power conceded in exchange for tribute and servitude.",
        description: "<p>Primeval draconic power conceded in exchange for tribute and servitude.</p>",
        pactKey: "draconicAccord",
        patronNames: ["Vaelorax", "Cindravax", "Skorvath the Red Maw", "Rhazakar the Devourer"],
        patronBoon: "<p>Until the end of session, grow wings and gain the ability to fly low.</p>",
        fiend: { uuid: "", name: "Elder Flame Drake" },
        fiendNote: "Small Elder Flame Drake (adjust to hp 25, saves 14, Defence 1; -1 TH/DMG on both attacks).",
        fiendAnyUndead: false,
        invocations: invocationRefs("draconicAccord"),
        attributeBonuses: [],
        isCustomTemplate: false
      }
    },
    {
      _id: stablePactId("pact:deathBond"),
      name: "The Death Bond",
      type: "pact",
      img: "icons/svg/skull.svg",
      system: {
        tagline: "Bound to Death itself, serving its will through borrowed identities.",
        description: "<p>Bound to Death itself, serving its will through borrowed identities.</p>",
        pactKey: "deathBond",
        patronNames: ["The Last Guest", "The Pale Mother", "The Keeper of Faces", "The Many-Faced God"],
        patronBoon: "<p>Until the end of session, assume the appearance and voice of any person you killed.</p>",
        // RAW: any undead creature. Left unset so the Warlock (or GM)
        // drops their chosen undead from the bestiary onto the pact.
        fiend: { uuid: "", name: "" },
        fiendNote: "Death has many shapes and forms; choose ANY undead creature.",
        fiendAnyUndead: true,
        invocations: invocationRefs("deathBond"),
        attributeBonuses: [],
        isCustomTemplate: false
      }
    },
    {
      _id: stablePactId("pact:custom"),
      name: "Custom Pact",
      type: "pact",
      img: "icons/magic/unholy/silhouette-robe-evil-power.webp",
      system: {
        tagline: "A homebrew bargain — name your patron and their price.",
        description: "<p>Template for a homebrew Dark Pact. Duplicate this item, then drag invocation items onto its table and a bestiary creature onto its Fiend slot.</p>",
        pactKey: "custom",
        patronNames: [],
        patronBoon: "",
        fiend: { uuid: "", name: "" },
        fiendNote: "",
        fiendAnyUndead: false,
        invocations: [],
        attributeBonuses: [],
        isCustomTemplate: true
      }
    }
  ];
}
