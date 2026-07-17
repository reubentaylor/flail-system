/**
 * Bundled Conditions (FLAIL v0.2 page 57). Imported on `ready` to
 * populate a world-level compendium named 'flail-conditions'. Drag a
 * condition onto a character to attach it as an inventory item — it
 * occupies a slot and (for stat conditions) the actor data model
 * applies the relevant penalty automatically each prep cycle.
 * Do not edit by hand.
 */

export const CONDITIONS = [
  {
    "_id": "VFe9PCcpaLrsMZoT",
    "name": "Drained",
    "type": "condition",
    "img": "systems/flail/icons/conditions/drained.svg",
    "system": {
      "description": "<p><strong>-1 to INT</strong>.</p><p><em>Clear: after long rest.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "conditionType": "drained",
      "injuredVariant": "",
      "clearRequirement": "longRest",
      "stackable": true,
      "stackCount": 1
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
    "_id": "dSL3f7xmjHeKS2zD",
    "name": "Exhausted",
    "type": "condition",
    "img": "systems/flail/icons/conditions/exhausted.svg",
    "system": {
      "description": "<p><strong>Disadvantage on all physical tasks</strong> (STR / DEX saves and To Hit rolls).</p><p><em>Clear: after long rest.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "conditionType": "exhausted",
      "injuredVariant": "",
      "clearRequirement": "longRest",
      "stackable": true,
      "stackCount": 1
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
    "_id": "KbVGcGWlz5hPESzI",
    "name": "Injured (STR)",
    "type": "condition",
    "img": "systems/flail/icons/conditions/injured-str.svg",
    "system": {
      "description": "<p><strong>-1 STR</strong>.</p><p><em>Clear: after full rest.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "conditionType": "injured",
      "injuredVariant": "str",
      "clearRequirement": "fullRest",
      "stackable": true,
      "stackCount": 1
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
    "_id": "LCdiydoePrWhmolZ",
    "name": "Injured (DEX)",
    "type": "condition",
    "img": "systems/flail/icons/conditions/injured-dex.svg",
    "system": {
      "description": "<p><strong>-1 DEX</strong>.</p><p><em>Clear: after full rest.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "conditionType": "injured",
      "injuredVariant": "dex",
      "clearRequirement": "fullRest",
      "stackable": true,
      "stackCount": 1
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
    "_id": "bBMQqgEmgMaVK7KQ",
    "name": "Injured (TH)",
    "type": "condition",
    "img": "systems/flail/icons/conditions/injured-th.svg",
    "system": {
      "description": "<p><strong>-1 To Hit</strong>.</p><p><em>Clear: after full rest.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "conditionType": "injured",
      "injuredVariant": "th",
      "clearRequirement": "fullRest",
      "stackable": true,
      "stackCount": 1
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
    "_id": "EFBCmjZ2qgKkNqOV",
    "name": "Persistent Injury",
    "type": "condition",
    "img": "systems/flail/icons/conditions/persistent-injury.svg",
    "system": {
      "description": "<p><strong>-1 STR and -1 DEX</strong>.</p><p><em>Clear: only by magic or miracle.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "conditionType": "persistentInjury",
      "injuredVariant": "",
      "clearRequirement": "magicOrMiracle",
      "stackable": true,
      "stackCount": 1
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
    "_id": "je9MaLvmowyI9RE1",
    "name": "Starved",
    "type": "condition",
    "img": "systems/flail/icons/conditions/starved.svg",
    "system": {
      "description": "<p>No mechanical penalty in itself, but the rules call for more Starveds to accumulate over time without food.</p><p><em>Clear: eat grub.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "conditionType": "starved",
      "injuredVariant": "",
      "clearRequirement": "meal",
      "stackable": true,
      "stackCount": 1
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
    "_id": "Jiola26bipuALhql",
    "name": "Poisoned",
    "type": "condition",
    "img": "systems/flail/icons/conditions/poisoned.svg",
    "system": {
      "description": "<p>Take another Poisoned condition each dawn until all are cleared.</p><p><em>Clear: seek medical healing. Good luck.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "conditionType": "poisoned",
      "injuredVariant": "",
      "clearRequirement": "medicalHealing",
      "stackable": true,
      "stackCount": 1
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
    "_id": "j8erB8rNxhH6fotp",
    "name": "Petrified",
    "type": "condition",
    "img": "systems/flail/icons/conditions/petrified.svg",
    "system": {
      "description": "<p>Turned to stone; <strong>cannot move or do any actions</strong>.</p><p><em>Clear: by sunrise light through stained glass.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "conditionType": "petrified",
      "injuredVariant": "",
      "clearRequirement": "other",
      "stackable": false,
      "stackCount": 1
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
