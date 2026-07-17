/*
 * Cutthroat Thieving Talents — 12 items in a flat compendium.
 * Bundled at world creation into `flail-thieving-talents`. Cutthroats
 * drag talents from here onto their character sheet; Bards may also
 * drop them onto their Jack of All Trades panel.
 */

export const THIEVING_TALENTS = [
  {
    "_id": "cbc9e1658606826a",
    "name": "Acrobatics",
    "type": "talent",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "Advantage on DEX saves for acrobatic actions. Includes climbing.",
      "attribute": "dex",
      "action": "acrobatics"
    },
    "flags": {}
  },
  {
    "_id": "0f752b0fdabf2db2",
    "name": "Appraise",
    "type": "talent",
    "img": "icons/skills/trades/academics-book-study-purple.webp",
    "system": {
      "description": "Advantage on INT saves to identify an item's value.",
      "attribute": "int",
      "action": "appraise"
    },
    "flags": {}
  },
  {
    "_id": "aee10e1ac67756c8",
    "name": "Disguise",
    "type": "talent",
    "img": "icons/magic/control/hypnosis-mesmerism-eye.webp",
    "system": {
      "description": "Advantage on CHA saves to disguise yourself. GM rolls; reveals success only when relevant.",
      "attribute": "cha",
      "action": "disguise"
    },
    "flags": {}
  },
  {
    "_id": "d760456221df3313",
    "name": "Disable Trap",
    "type": "talent",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "Advantage on DEX saves to disable a mechanical trap. Requires thieves' tools.",
      "attribute": "dex",
      "action": "disableTrap"
    },
    "flags": {}
  },
  {
    "_id": "b6cb5a772a351441",
    "name": "Forge Papers",
    "type": "talent",
    "img": "icons/skills/trades/academics-book-study-purple.webp",
    "system": {
      "description": "Advantage on INT saves to forge documents. GM rolls; reveals success only when relevant.",
      "attribute": "int",
      "action": "forgePapers"
    },
    "flags": {}
  },
  {
    "_id": "2258c00f33ac94e5",
    "name": "Hide in Shadows",
    "type": "talent",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "Advantage on DEX saves to hide. Cannot be hit until the cutthroat reveals themselves.",
      "attribute": "dex",
      "action": "hideShadows"
    },
    "flags": {}
  },
  {
    "_id": "9bfd85373c680206",
    "name": "Listen",
    "type": "talent",
    "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
    "system": {
      "description": "Advantage on LUCK saves to overhear conversations or notice sounds.",
      "attribute": "luck",
      "action": "listen"
    },
    "flags": {}
  },
  {
    "_id": "b6854ed07d893272",
    "name": "Pick Lock",
    "type": "talent",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "Advantage on DEX saves to pick a lock. Requires thieves' tools.",
      "attribute": "dex",
      "action": "pickLock"
    },
    "flags": {}
  },
  {
    "_id": "a670fb013814f406",
    "name": "Pick Pocket",
    "type": "talent",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "Advantage on DEX saves to pick a pocket.",
      "attribute": "dex",
      "action": "pickPocket"
    },
    "flags": {}
  },
  {
    "_id": "bdd0fec339ce6085",
    "name": "Read Languages",
    "type": "talent",
    "img": "icons/skills/trades/academics-book-study-purple.webp",
    "system": {
      "description": "Advantage on INT saves to read a strange script. Includes rare and dead languages.",
      "attribute": "int",
      "action": "readLanguages"
    },
    "flags": {}
  },
  {
    "_id": "a4b43c08dbf972b5",
    "name": "Search",
    "type": "talent",
    "img": "icons/skills/trades/academics-book-study-purple.webp",
    "system": {
      "description": "Advantage on INT saves to search a location. Finds hidden doors, compartments, traps, or objects.",
      "attribute": "int",
      "action": "search"
    },
    "flags": {}
  },
  {
    "_id": "3716be7ff63acb84",
    "name": "Sneak Silently",
    "type": "talent",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "system": {
      "description": "Advantage on DEX saves to move silently.",
      "attribute": "dex",
      "action": "sneakSilently"
    },
    "flags": {}
  }
];
