/**
 * Bundled Cutthroat Guilds (FLAIL v0.2 page 24). Imported on `ready` to
 * populate a world-level compendium named 'flail-guilds'. The Cutthroat
 * drags a guild Item onto their sheet; only one guild is held at a time.
 * Each guild bundles its short blurb, sigil description, five starting
 * talent keys (auto-marked on the actor when the guild is taken), and
 * seven guild-specific special actions. Do not edit by hand.
 */

export const GUILDS = [
  {
    "_id": "FyIvfUCPQeWhlh58",
    "name": "Crimson Cloak Society",
    "type": "guild",
    "img": "systems/flail/icons/items/crimson-coin.png",
    "system": {
      "blurb": "An assassin's guild whose members wear a dark red cape.",
      "sigil": "crimson coin",
      "startingTalents": [
        "disguise",
        "hideShadows",
        "listen",
        "pickLock",
        "sneakSilently"
      ],
      "specialActions": [
        {
          "key": "backstabbing",
          "name": "Backstabbing",
          "description": "Gain +2 To Hit when attacking an unaware target from behind."
        },
        {
          "key": "camouflage",
          "name": "Camouflage",
          "description": "Remain completely invisible until making an abrupt or loud action."
        },
        {
          "key": "deathlySurprise",
          "name": "Deathly Surprise",
          "description": "Take a free combat round, before rolling initiative."
        },
        {
          "key": "evasiveManoeuvres",
          "name": "Evasive Manoeuvres",
          "description": "Downgrade one hit taken (e.g. major hit to minor hit)."
        },
        {
          "key": "handlePoison",
          "name": "Handle Poison",
          "description": "Create a concoction that kills a human if imbibed."
        },
        {
          "key": "silentDispatch",
          "name": "Silent Dispatch",
          "description": "Immediately slay a vulnerable (stunned, prone, etc) target."
        },
        {
          "key": "swiftyFeet",
          "name": "Swifty Feet",
          "description": "Take two full actions in a single round of combat."
        }
      ]
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
    "_id": "On9AUkB8DhUpdfv0",
    "name": "The Shadow Arcanum",
    "type": "guild",
    "img": "systems/flail/icons/items/eye-ring.png",
    "system": {
      "blurb": "Guild of esoteric thieves specialised in the occult.",
      "sigil": "eye ring that blinks",
      "startingTalents": [
        "appraise",
        "forgePapers",
        "hideShadows",
        "listen",
        "readLanguages"
      ],
      "specialActions": [
        {
          "key": "cheatDeath",
          "name": "Cheat Death",
          "description": "Roll d4 on the Death Table, instead of d8."
        },
        {
          "key": "familiar",
          "name": "Familiar",
          "description": "Ask favour from a creature of the night (cat, owl, bat, etc)."
        },
        {
          "key": "hocusPocus",
          "name": "Hocus Pocus",
          "description": "Memorise a witnessed spell; roll LUCK to cast it later (same DICE as original)."
        },
        {
          "key": "mysticDisguise",
          "name": "Mystic Disguise",
          "description": "Create an illusory doppelganger; lasts one turn."
        },
        {
          "key": "necroticBlade",
          "name": "Necrotic Blade",
          "description": "Inflict an additional d6 damage on a successful To Hit."
        },
        {
          "key": "shadowStep",
          "name": "Shadow Step",
          "description": "Teleport between two shadows within Distant range."
        },
        {
          "key": "occultKnowledge",
          "name": "Occult Knowledge",
          "description": "Identify the exact properties of one magic item."
        }
      ]
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
    "_id": "kqzwrGVoAVaT4ugk",
    "name": "The Justice League",
    "type": "guild",
    "img": "systems/flail/icons/items/hand-brooch.png",
    "system": {
      "blurb": "Union of burglars and pickpockets who steal from the aristocracy.",
      "sigil": "hand-shaped brooch",
      "startingTalents": [
        "acrobatics",
        "pickLock",
        "pickPocket",
        "search",
        "sneakSilently"
      ],
      "specialActions": [
        {
          "key": "endlessPurse",
          "name": "Endless Purse",
          "description": "Carry any number of coins (ignore slots) until the end of the session."
        },
        {
          "key": "escapeRoute",
          "name": "Escape Route",
          "description": "Remove self from combat immediately without being followed."
        },
        {
          "key": "notToday",
          "name": "Not Today",
          "description": "Ignore an Injured condition when receiving it."
        },
        {
          "key": "pickTheLock",
          "name": "Pick the Lock",
          "description": "Pick any lock without rolling (excludes magically-sealed locks)."
        },
        {
          "key": "pickTheRich",
          "name": "Pick the Rich",
          "description": "Steal an item from a rich nobleman, aristocrat or clergyman."
        },
        {
          "key": "trueBeliever",
          "name": "True Believer",
          "description": "Take a hireling for free who is dedicated to the cause (once per town)."
        },
        {
          "key": "wealthRadar",
          "name": "Wealth Radar",
          "description": "Gather intel on a Unique Item owned by a noble (once per town)."
        }
      ]
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
    "_id": "hi4M3TGfcg2lJbWb",
    "name": "The Octopus Nexus",
    "type": "guild",
    "img": "systems/flail/icons/items/tentacle-clasp.png",
    "system": {
      "blurb": "Tentacular network of covert agents and master spies.",
      "sigil": "tentacle cloak clasp",
      "startingTalents": [
        "disguise",
        "forgePapers",
        "listen",
        "search",
        "sneakSilently"
      ],
      "specialActions": [
        {
          "key": "cypher",
          "name": "Cypher",
          "description": "Encode message in any document that only a chosen character will understand."
        },
        {
          "key": "doubleAgent",
          "name": "Double Agent",
          "description": "A minor NPC is revealed to be an undercover Octopus, ready to assist."
        },
        {
          "key": "espionage",
          "name": "Espionage",
          "description": "Determine the exact whereabouts of a person or object."
        },
        {
          "key": "forgery",
          "name": "Forgery",
          "description": "Learn the handwriting or signature of an NPC by merely observing it."
        },
        {
          "key": "infiltration",
          "name": "Infiltration",
          "description": "Extract information from a location without leaving any trace."
        },
        {
          "key": "inception",
          "name": "Inception",
          "description": "Plant an idea in the mind of any minor NPC (within reason)."
        },
        {
          "key": "interrogate",
          "name": "Interrogate",
          "description": "Ask a question to any minor NPC; the GM must answer truthfully."
        }
      ]
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
