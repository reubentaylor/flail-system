/**
 * Bundled Wizard Spells. Imported on `ready` to populate a world-level
 * compendium named 'flail-wizard-spells'. Drag entries onto a Wizard
 * character to attach as Master Spellbook entries.
 *
 * Traditions used:
 *   arcane   — common spells (page 40 d20 table)
 *   flame    — Flakumeg the Flame Whisperer's repertoire
 *   shadow   — Û-Kraal the Shadow Manipulator's repertoire
 *   ooze     — OooOozey Oozzeborne's repertoire
 *   illusion — Choo-Choo Master of Deceit's repertoire
 *
 * Sourced from FLAIL v0.2 pages 40, 42–43. Do not edit by hand — regenerate
 * from the source-of-truth extractor if the rulebook is updated.
 */

export const WIZARD_SPELLS = [
  {
    "_id": "cHAwqbORFKUB7jem",
    "name": "Charm",
    "type": "spell",
    "img": "icons/magic/control/hypnosis-mesmerism-eye.webp",
    "system": {
      "description": "<p>forces target of level [SUM] or less to save or become suggestive to [DICE] basic orders.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "DMEIpGAcK3ChqnYk",
    "name": "Counterspell",
    "type": "spell",
    "img": "icons/magic/defensive/shield-barrier-blue.webp",
    "system": {
      "description": "<p>negates spell by a magic-user of level [DICE] or less; may act out of combat order.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "PKCdDSpBZEO0sKni",
    "name": "Dispel Magic",
    "type": "spell",
    "img": "icons/magic/light/projectile-beam-yellow.webp",
    "system": {
      "description": "<p>cancels the effects of spells or items for [DICE] rounds.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "3HISLMqCEMMCGNDD",
    "name": "Energy Barrier",
    "type": "spell",
    "img": "icons/magic/defensive/shield-barrier-blue.webp",
    "system": {
      "description": "<p>creates aura around caster (and those Near) for [DICE] rounds with [SUM] hit points.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "3D3vG6cgNbFKkKIG",
    "name": "Featherfall",
    "type": "spell",
    "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
    "system": {
      "description": "<p>slows down the rate of falling [DICE] targets or objects.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 1
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "BRCm3O9QVVv7hYfo",
    "name": "Fly",
    "type": "spell",
    "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
    "system": {
      "description": "<p>caster or ally gains the ability to fly for [DICE] rounds.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "RIRTaIMUFnzKIc2y",
    "name": "Floating Disc",
    "type": "spell",
    "img": "icons/magic/air/air-smoke-casting.webp",
    "system": {
      "description": "<p>creates a disc with [DICE] inventory slots; lasts [SUM] turns.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 1
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "5PDDm51vV66r063i",
    "name": "Hold Person",
    "type": "spell",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "<p>renders a character of level [DICE] or less immobile for [DICE] rounds.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "eDO6bwuaqHVsXwmX",
    "name": "Hold Monster",
    "type": "spell",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "<p>renders a creature of level [SUM] or less immobile for [DICE] rounds.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 3
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "nIYpbDHPvI7c4Pso",
    "name": "Knock",
    "type": "spell",
    "img": "icons/magic/unholy/silhouette-robe-evil-glow.webp",
    "system": {
      "description": "<p>opens sealed doors, gates, chests, and similar from a distance of [DICE] x 3'.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 1
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "3IHami64DPg8P9uf",
    "name": "Magic Missile",
    "type": "spell",
    "img": "icons/magic/light/projectile-beam-yellow.webp",
    "system": {
      "description": "<p>deals [SUM] damage to one single target within Distant range.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "nd9RTysTt7br5KNq",
    "name": "Mirror Image",
    "type": "spell",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "<p>creates [DICE] illusory doppelgangers of caster; illusions are dispelled if hit.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "mJlUrUCGvXP2PG8U",
    "name": "Polymorph",
    "type": "spell",
    "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
    "system": {
      "description": "<p>morphs ally into a form determined by [SUM] roll: (1-4) hamster, (5-8) chicken, (9-12) bear, (13-16) giant spider, (16-19) prismatic slug, (20+) monster of choice; change lasts [DICE] turns, causing twice [DICE] damage when ally reverts to human.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 3
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "6gXmi0CL5zKQCd8N",
    "name": "Read Languages",
    "type": "spell",
    "img": "icons/skills/trades/academics-book-study-purple.webp",
    "system": {
      "description": "<p>identifies and reads languages for [DICE] turns.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 1
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "rZIXQLBmqzU1V7gc",
    "name": "Sleep",
    "type": "spell",
    "img": "icons/magic/control/hypnosis-mesmerism-eye.webp",
    "system": {
      "description": "<p>causes deep slumber to [DICE] targets of combined level [SUM] or less; any harm or excessive noise breaks the spell.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "9KpDs3XQLEQwuA83",
    "name": "Shield",
    "type": "spell",
    "img": "icons/magic/defensive/shield-barrier-flaming-diamond-blue.webp",
    "system": {
      "description": "<p>invokes an energy shield on self or ally with half [SUM] hit points.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "sJR5acmSpMMeTErw",
    "name": "Telekinesis",
    "type": "spell",
    "img": "icons/magic/movement/pinwheel-turning-blue.webp",
    "system": {
      "description": "<p>caster may move an object within [SUM] x 10'.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "8ICLeqFFeAARn20X",
    "name": "Teleport",
    "type": "spell",
    "img": "icons/magic/movement/pinwheel-turning-blue.webp",
    "system": {
      "description": "<p>caster may teleport between two places within [SUM] x 10'.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 3
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "8Mapm2g1SQ0MjgHs",
    "name": "The Eye",
    "type": "spell",
    "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
    "system": {
      "description": "<p>conjure a telepathically-linked, remote eye; lasts [DICE] turns.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 1
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "cRHUCNYtIfQGwute",
    "name": "Time Stop",
    "type": "spell",
    "img": "icons/magic/time/clock-analog-gray.webp",
    "system": {
      "description": "<p>caster can perform [DICE] - 1 extra rounds immediately.</p>",
      "tradition": "arcane",
      "effectFormula": "",
      "suggestedDice": 3
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "SMEZqZuISDpvDrhI",
    "name": "Fireball",
    "type": "spell",
    "img": "icons/magic/fire/explosion-fireball-large-orange.webp",
    "system": {
      "description": "<p>causes [SUM] damage to all Near impact zone; can be cast from [SUM] x 10'.</p>",
      "tradition": "flame",
      "effectFormula": "",
      "suggestedDice": 3
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "knyj3Eq8guWpI0Qd",
    "name": "Firebolt",
    "type": "spell",
    "img": "icons/magic/fire/projectile-fireball-smoke-orange.webp",
    "system": {
      "description": "<p>shoot [DICE] bolts onto [DICE] targets; allocate each dice in damage to one target.</p>",
      "tradition": "flame",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "y3wgUx35MHOxPHYU",
    "name": "Flame",
    "type": "spell",
    "img": "icons/magic/fire/projectile-fireball-smoke-orange.webp",
    "system": {
      "description": "<p>conjures a small flame in caster's hand that lasts [DICE] turns.</p>",
      "tradition": "flame",
      "effectFormula": "",
      "suggestedDice": 1
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "8JBcFIU8OI0zlakH",
    "name": "Rain of Fire",
    "type": "spell",
    "img": "icons/magic/fire/explosion-embers-orange.webp",
    "system": {
      "description": "<p>causes [SUM] damage to all Near targeted area for [DICE] rounds; can be cast from [SUM] x 10'; spell ends if caster is hit or takes other actions.</p>",
      "tradition": "flame",
      "effectFormula": "",
      "suggestedDice": 3
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "ukRJ3ingZ0wao89Y",
    "name": "Wall of Fire",
    "type": "spell",
    "img": "icons/magic/fire/explosion-embers-orange.webp",
    "system": {
      "description": "<p>causes [SUM] damage to anyone that crosses it; lasts [DICE] rounds.</p>",
      "tradition": "flame",
      "effectFormula": "",
      "suggestedDice": 3
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "DWPW5K6KcI7N9OCG",
    "name": "Black Threshold",
    "type": "spell",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "<p>conjures a shadow portal for [DICE] rounds; all that enters is lost upon its closure.</p>",
      "tradition": "shadow",
      "effectFormula": "",
      "suggestedDice": 3
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "AP57MIBr49R53sPX",
    "name": "Devour Light",
    "type": "spell",
    "img": "icons/magic/unholy/hand-claw-fire-blue.webp",
    "system": {
      "description": "<p>all light within [SUM] x 10' is immediately extinguished.</p>",
      "tradition": "shadow",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "zyFchNt8Ggi341lr",
    "name": "Grasping Dark",
    "type": "spell",
    "img": "icons/magic/unholy/hand-claw-fire-blue.webp",
    "system": {
      "description": "<p>[DICE] weak targets become immobilised by living shadows.</p>",
      "tradition": "shadow",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "kBdbK9agna0bYCw4",
    "name": "Shadow Walk",
    "type": "spell",
    "img": "icons/magic/unholy/hand-claw-fire-blue.webp",
    "system": {
      "description": "<p>caster may walk through one solid object (wall, door, etc.) and takes twice [SUM] damage afterwards.</p>",
      "tradition": "shadow",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "dfcIa1EEGG7czN8T",
    "name": "Stolen Silhouette",
    "type": "spell",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "<p>erase the shadow on any target for [SUM] hours.</p>",
      "tradition": "shadow",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "k9iqBhiFBuFj11Bd",
    "name": "Umbral Exile",
    "type": "spell",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "<p>target of level [DICE] disappears in shadows for [DICE] rounds, then reemerges.</p>",
      "tradition": "shadow",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "2CCRDAKEe1HXipSZ",
    "name": "Assimilate Filth",
    "type": "spell",
    "img": "icons/creatures/slimes/slime-movement-swirling-green.webp",
    "system": {
      "description": "<p>caster can absorb nearby sludge, corpses or refuse to regain half [SUM] mana.</p>",
      "tradition": "ooze",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "O1ldoydms2QJqcN9",
    "name": "Blob Army",
    "type": "spell",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "system": {
      "description": "<p>conjures [SUM] mind-controlled mini oozes (1hp, spit corrosive acid TH 2, DMG 1); disperse if caster is hit or takes other actions.</p>",
      "tradition": "ooze",
      "effectFormula": "",
      "suggestedDice": 3
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "tvjoMIGdrUfQWWfE",
    "name": "Jellification",
    "type": "spell",
    "img": "icons/creatures/slimes/slime-face-eyes-purple.webp",
    "system": {
      "description": "<p>forces target of level [DICE] to save or be turned into a squishy gelatinous mass.</p>",
      "tradition": "ooze",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "LVTpOsrWSOfMJXgR",
    "name": "Gelatine Mess",
    "type": "spell",
    "img": "icons/creatures/slimes/slime-movement-swirling-green.webp",
    "system": {
      "description": "<p>conjures a Gelatinous Cube (see bestiary) that acts on its own will for [DICE] turns.</p>",
      "tradition": "ooze",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "ow5zdwteDzxEyT9B",
    "name": "Gooey Grasp",
    "type": "spell",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "system": {
      "description": "<p>target of level [SUM] or less is immobilised by thick sludge.</p>",
      "tradition": "ooze",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "CipQgghwxuhR4Z73",
    "name": "Ooze Form",
    "type": "spell",
    "img": "icons/creatures/slimes/slime-face-eyes-purple.webp",
    "system": {
      "description": "<p>caster takes the form of a living ooze for [DICE] turns.</p>",
      "tradition": "ooze",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "tWZ72kgtFANMlwbS",
    "name": "Colour Spray",
    "type": "spell",
    "img": "icons/magic/light/beams-rays-orange-purple-large.webp",
    "system": {
      "description": "<p>invokes a display of smoke that imposes a -1 To Hit penalty for [DICE] rounds.</p>",
      "tradition": "illusion",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "sGKdjHCuEShL3iG6",
    "name": "French Drop",
    "type": "spell",
    "img": "icons/commodities/currency/coins-plain-stack-gold.webp",
    "system": {
      "description": "<p>makes [DICE] coins appear.</p>",
      "tradition": "illusion",
      "effectFormula": "",
      "suggestedDice": 1
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "1QDQfgGcOJRBz1QO",
    "name": "Masquerade",
    "type": "spell",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "<p>caster may be perceived as another person of their choice for [DICE] turns.</p>",
      "tradition": "illusion",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "veFHQY5lwLpBEvpq",
    "name": "Invisibility",
    "type": "spell",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "<p>renders an immobile target/object invisible for [DICE] turns.</p>",
      "tradition": "illusion",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "G5funxd3gLgxPRxe",
    "name": "Phantasmal Force",
    "type": "spell",
    "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
    "system": {
      "description": "<p>summons a controllable illusory creature with [SUM] hp, [DICE] TH and DMG.</p>",
      "tradition": "illusion",
      "effectFormula": "",
      "suggestedDice": 3
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  },
  {
    "_id": "4DyJqfdMVs9QJK0t",
    "name": "Ventriloquism",
    "type": "spell",
    "img": "icons/magic/sonic/scream-wail-shout-teal.webp",
    "system": {
      "description": "<p>makes caster voice appear to come from another person or object for [SUM] rounds.</p>",
      "tradition": "illusion",
      "effectFormula": "",
      "suggestedDice": 2
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {}
  }
];
