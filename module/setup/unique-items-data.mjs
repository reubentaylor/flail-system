/*
 * FLAIL Unique Items — bundled at world creation into the
 * `flail-unique-items` compendium. Each item is a first-class
 * Foundry Item (weapon / armour / gear) with a `flags.flail.unique`
 * marker. Set items also carry `flags.flail.setName` and
 * `flags.flail.setClass` for future set-bonus tracking.
 *
 * Total items: 99
 *
 * Categories:
 *   • legendary-weapon: 35
 *   • amulet: 12
 *   • headband: 1
 *   • headgear: 2
 *   • body-armour: 6
 *   • boots: 3
 *   • shield: 3
 *   • belt: 1
 *   • quiver: 1
 *   • prosthetic: 1
 *   • gloves: 1
 *   • eyepiece: 1
 *   • set-item: 32
 *
 * Sourced from FLAIL v0.2 pp.99-108. See page 98 for
 * usage/value/creation rules.
 */

export const FLAIL_UNIQUE_ITEMS = [
  {
    "_id": "bb83176ee9876275",
    "name": "Blade of Swarm",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/blade-of-swarm.png",
    "system": {
      "description": "<p>Special: +1 TH for every adversary Nearby (max. 10).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 3,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "d62d627b084d740f",
    "name": "Blazing Edge",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/blazing-edge.png",
    "system": {
      "description": "<p>Major Hit: sets target ablaze for an extra 2 fire damage per round.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "sets target ablaze for an extra 2 fire damage per round.",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "2c577c86ec34b624",
    "name": "Blinding Reaver",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/blinding-reaver.png",
    "system": {
      "description": "<p>Any hit: on a four-number sequence, blinds target.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": "on a four-number sequence, blinds target."
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "9e919338e472ccd0",
    "name": "Bloodfang",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/bloodfang.png",
    "system": {
      "description": "<p>Special: gains +1 DMG for every consecutive hit in combat (resets on a miss).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "e5e2427e84681bcf",
    "name": "Buzzing Volt",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/buzzing-volt.png",
    "system": {
      "description": "<p>Any hit: each 2 rolled causes an extra point of electrical damage.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": "each 2 rolled causes an extra point of electrical damage."
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "f7d754fecc216064",
    "name": "Celestial Star",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/celestial-star.png",
    "system": {
      "description": "<p>Special: while carried, user is immune to magic.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "7d58a7f13a47254f",
    "name": "Cinderline",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/cinderline.png",
    "system": {
      "description": "<p>Any hit: on a triplet, creates trail of fire that causes d4 damage to crossers.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": "on a triplet, creates trail of fire that causes d4 damage to crossers."
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "ad9bd378ce3685c7",
    "name": "Crimson Moon",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/crimson-moon.png",
    "system": {
      "description": "<p>Major Hit: bleeds target, causing d4 damage per round.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "bleeds target, causing d4 damage per round.",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "600e8dcd73223276",
    "name": "Coral Whisper",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/coral-whisper.png",
    "system": {
      "description": "<p>Any hit: on a poker, summons an ally Water Elemental.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": "on a poker, summons an ally Water Elemental."
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "d581aabef92037db",
    "name": "Doombringer",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/doombringer.png",
    "system": {
      "description": "<p>Special: every round carried does d6 damage to wielder.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 8,
      "damage": 5,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "d15f0ff73551ff80",
    "name": "Fate's Mulligan",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/fates-mulligan.png",
    "system": {
      "description": "<p>Special: may re-roll two dice from the To Hit roll once per round.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "2042072991f621a8",
    "name": "Fleshbinder",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/fleshbinder.png",
    "system": {
      "description": "<p>Death Blow: gives a permanent +1 to wielder's max hit points.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "gives a permanent +1 to wielder's max hit points.",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "7d2ba922652c013b",
    "name": "Gravetide Grasp",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/gravetide-grasp.png",
    "system": {
      "description": "<p>Any hit: on three pairs, pins target with ghastly skeletal hands.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": "on three pairs, pins target with ghastly skeletal hands."
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "890ae3cc455ed20e",
    "name": "Hunter's Bow",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/hunters-bow.png",
    "system": {
      "description": "<p>Special: +2 TH vs a previously marked target.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "0d6683c24aab2e20",
    "name": "Lifeleech",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/lifeleech.png",
    "system": {
      "description": "<p>Special: restores hit points equal to damage inflicted.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "fcc1640d04e626c8",
    "name": "Mage's Plight",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/mages-plight.png",
    "system": {
      "description": "<p>Any hit: target loses d10 mana (Wizards only).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": "target loses d10 mana (Wizards only)."
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "398f3cdb17d389e9",
    "name": "Mindpiercer",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/mindpiercer.png",
    "system": {
      "description": "<p>Special: on a miss, deals d4 psychic damage to wielder.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 7,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "df0b31b466cc65c3",
    "name": "Molten Fury",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/molten-fury.png",
    "system": {
      "description": "<p>Special: bypasses adversary Defence.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "dd60954024fe9b88",
    "name": "Phantom's Veil",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/phantoms-veil.png",
    "system": {
      "description": "<p>Special: while carried, user is invisible when standing still.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "7e0492b310823ab5",
    "name": "Royal Vanguard",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/royal-vanguard.png",
    "system": {
      "description": "<p>Special: all hirelings hired by wielder have +3 to Morale.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "143ae61becd77c1b",
    "name": "Runeforge",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/runeforge.png",
    "system": {
      "description": "<p>Any hit: on a full-house, etches rune on target for 3d10 damage in the next hit.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": "on a full-house, etches rune on target for 3d10 damage in the next hit."
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "76d995181330044d",
    "name": "Sanguine Seax",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/sanguine-seax.png",
    "system": {
      "description": "<p>Any hit: wielder can deal extra d6 damage at the cost of 3 hit points.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": "wielder can deal extra d6 damage at the cost of 3 hit points."
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "9e4adefb0a30c290",
    "name": "Saw Boomerang",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/saw-boomerang.png",
    "system": {
      "description": "<p>Any hit: on a triplet, deals d8 damage to two new targets.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": "on a triplet, deals d8 damage to two new targets."
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "dfcd03f92c0fc464",
    "name": "Serpent's Dance",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/serpents-dance.png",
    "system": {
      "description": "<p>Any hit: on two pairs, deal extra d4 damage.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": "on two pairs, deal extra d4 damage."
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "31db9e20540b24b5",
    "name": "Shadowfang",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/shadowfang.png",
    "system": {
      "description": "<p>Special: +2 TH when wielded in darkness.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "d1eefa4bad511784",
    "name": "Soul Harvester",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/soul-harvester.png",
    "system": {
      "description": "<p>Any hit: on a triplet, store 1 soulshard; spend 3 shards to heal d8 hit points.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": "on a triplet, store 1 soulshard; spend 3 shards to heal d8 hit points."
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "696a19c2cb627db7",
    "name": "Stormrider",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/stormrider.png",
    "system": {
      "description": "<p>Special: +2 TH under windy or stormy conditions.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "8ccfcc8ed6fec036",
    "name": "The Frostbite",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/the-frostbite.png",
    "system": {
      "description": "<p>Major Hit: target freezes after finishing its next round.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "target freezes after finishing its next round.",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "7244b980c53f18ed",
    "name": "The Man Catcher",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/the-man-catcher.png",
    "system": {
      "description": "<p>Any hit: immobilises target; disadvantage to break loose.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 0,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": "immobilises target; disadvantage to break loose."
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "8bf04a9283b0fdb1",
    "name": "The Piercer",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/the-piercer.png",
    "system": {
      "description": "<p>Death Blow: arrow moves to a new chosen target, dealing d8 damage.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 7,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "arrow moves to a new chosen target, dealing d8 damage.",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "d7c7f052d3ce04ef",
    "name": "Hammer of Õ",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/hammer-of.png",
    "system": {
      "description": "<p>Major Hit: stuns target.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "stuns target.",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "c4faaf31b2cb8199",
    "name": "Night Reaper",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/night-reaper.png",
    "system": {
      "description": "<p>Special: +2 TH vs Undead.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "08c6e2d4f1debe26",
    "name": "The Intimidator",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/the-intimidator.png",
    "system": {
      "description": "<p>Major Hit: on a triplet, forces a Morale save on target.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 8,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "on a triplet, forces a Morale save on target.",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "87619391cb6c05e5",
    "name": "Titanbreaker",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/titanbreaker.png",
    "system": {
      "description": "<p>Major Hit: roll an additional d6 damage on big/giant targets.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 7,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "roll an additional d6 damage on big/giant targets.",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "bdd1dc1ffa455898",
    "name": "Troll Slayer",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/troll-slayer.png",
    "system": {
      "description": "<p>Special: after being hit, target can no longer regenerate.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 7,
      "damage": 5,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "legendary-weapon"
      }
    }
  },
  {
    "_id": "c885763d7e9e3108",
    "name": "Amulet of Wyrm",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/amulet-of-wyrm.png",
    "system": {
      "description": "<p>Mark usage to breathe fire on any Nearby targets for 2d6 damage to each.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "amulet"
      }
    }
  },
  {
    "_id": "e5ae61ad90054b31",
    "name": "Beast Charm",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/beast-charm.png",
    "system": {
      "description": "<p>Mark usage to transform into a random beast as per Shapeshifting (Druid).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "amulet"
      }
    }
  },
  {
    "_id": "b4c70eeb0a8738cf",
    "name": "Gambler's Coin",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/gamblers-coin.png",
    "system": {
      "description": "<p>Mark usage to roll any save; heads is a critical hit, tails is a fumble.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "amulet"
      }
    }
  },
  {
    "_id": "6a01aae177f03ff7",
    "name": "Guardian Angel",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/guardian-angel.png",
    "system": {
      "description": "<p>Mark to negate one hit entirely; shatters when all usage is marked.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "amulet"
      }
    }
  },
  {
    "_id": "7a160e073959857b",
    "name": "Lucky Charm",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/lucky-charm.png",
    "system": {
      "description": "<p>+2 LUCK.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "amulet"
      }
    }
  },
  {
    "_id": "acde2e494ffa85c1",
    "name": "Ring of Blasphemy",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/ring-of-blasphemy.png",
    "system": {
      "description": "<p>Choose prayer from any Cleric religion; cast it while wearing.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "amulet"
      }
    }
  },
  {
    "_id": "b348d85186d126bf",
    "name": "Sacrifice Charm",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/sacrifice-charm.png",
    "system": {
      "description": "<p>Lose d6 hit points to force a target to reroll their last action.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "amulet"
      }
    }
  },
  {
    "_id": "e3b8cd3a8622264e",
    "name": "Scarab Pendant",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/scarab-pendant.png",
    "system": {
      "description": "<p>Gain Defence 2 between sunset and sunrise.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "amulet"
      }
    }
  },
  {
    "_id": "7d7f4c5e9719fd10",
    "name": "Spellpin",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/spellpin.png",
    "system": {
      "description": "<p>Determine a random Wizard spell; mark usage to cast it using up to three dice.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "amulet"
      }
    }
  },
  {
    "_id": "3b4821b6eff9759c",
    "name": "Spirit Sustainer",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/spirit-sustainer.png",
    "system": {
      "description": "<p>Mark usage to summon an ally Ghoul; unmark usage by slaying a hostile Undead.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "amulet"
      }
    }
  },
  {
    "_id": "4bdea8dc2af0dced",
    "name": "The Eye",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/the-eye.png",
    "system": {
      "description": "<p>Once per day, comes to life as a telepathically-linked eye that lasts up to six turns.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "amulet"
      }
    }
  },
  {
    "_id": "eefb20d104583b23",
    "name": "The Horseshoe",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/the-horseshoe.png",
    "system": {
      "description": "<p>d10 coins appear when its carrier rolls a Major Hit.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "amulet"
      }
    }
  },
  {
    "_id": "8aa963f67dd0ab6a",
    "name": "Bad-Ass Bandana",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/bad-ass-bandana.png",
    "system": {
      "description": "<p>+1 to all attributes.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "headband"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "headband"
      }
    }
  },
  {
    "_id": "13c9466a07c02ca9",
    "name": "Mustache Helm",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/mustache-helm.png",
    "system": {
      "description": "<p>Counts as helmet; advantage to CHA saves in social interaction.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "helmet",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "headgear"
      }
    }
  },
  {
    "_id": "d264ea662488e880",
    "name": "Thinking Cap",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/thinking-cap.png",
    "system": {
      "description": "<p>Choose one Wizard spell; mark usage to cast it (use LUCK as mana) while wearing.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "helmet",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "headgear"
      }
    }
  },
  {
    "_id": "a24211a9ba497e18",
    "name": "Black Leotard",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/black-leotard.png",
    "system": {
      "description": "<p>Mark usage to transform into a black cat for d4 turns.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "light",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "body-armour"
      }
    }
  },
  {
    "_id": "1cae51a066869369",
    "name": "Mummy Rags",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/mummy-rags.png",
    "system": {
      "description": "<p>When taking a Major Hit, wearer may mark usage to summon an ally Mummy.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "light",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "body-armour"
      }
    }
  },
  {
    "_id": "3aedc61dab867262",
    "name": "Paladin's Might",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/paladins-might.png",
    "system": {
      "description": "<p>Counts as body armour; cast one chosen prayer from any religion (Cleric) while worn.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "light",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "body-armour"
      }
    }
  },
  {
    "_id": "754960fe3e7d683e",
    "name": "Snake Scale Mail",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/snake-scale-mail.png",
    "system": {
      "description": "<p>Counts as body armour; mark usage to Shapeshift (Druid) into Anaconda.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "light",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "body-armour"
      }
    }
  },
  {
    "_id": "70f76277c4dd1c78",
    "name": "Tunic of Hope",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/tunic-of-hope.png",
    "system": {
      "description": "<p>Once per day, reroll any To Hit or failed save.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "light",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "body-armour"
      }
    }
  },
  {
    "_id": "8541fb09aed96a97",
    "name": "Warding Cape",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/warding-cape.png",
    "system": {
      "description": "<p>Mark usage to negate a Drained condition.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "light",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "body-armour"
      }
    }
  },
  {
    "_id": "6aeb0dc5110ea3a2",
    "name": "Ramming Shoes",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/ramming-shoes.png",
    "system": {
      "description": "<p>Mark usage to cast Knock spell; [DICE] equals usage left.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "boots"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "boots"
      }
    }
  },
  {
    "_id": "86aec3e8e943c9d3",
    "name": "Spiked Boots",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/spiked-boots.png",
    "system": {
      "description": "<p>Usable as carried weapon TH 5, DMG 3.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "boots"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "boots"
      }
    }
  },
  {
    "_id": "0e4814359b0ac891",
    "name": "The Moccasins",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/the-moccasins.png",
    "system": {
      "description": "<p>+2 CHA, -1 DEX.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "boots"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "boots"
      }
    }
  },
  {
    "_id": "749eed04922c14e6",
    "name": "Hovering Shield",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/hovering-shield.png",
    "system": {
      "description": "<p>Counts as shield; may be placed on slot reserved for rings, amulets, etc.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "shield",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "shield"
      }
    }
  },
  {
    "_id": "7326ad5139f6d05f",
    "name": "Shield of Bones",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/shield-of-bones.png",
    "system": {
      "description": "<p>Counts as shield; mark usage to cast Wall of Bones; [DICE] equals usage left.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "shield",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "shield"
      }
    }
  },
  {
    "_id": "f600af0f438a43e7",
    "name": "Stormchaser",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/stormchaser.png",
    "system": {
      "description": "<p>Counts as shield; mark usage to deal d8 electrical damage to attacker.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "shield",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "shield"
      }
    }
  },
  {
    "_id": "5e15dcb9c688f8a7",
    "name": "Power Belt",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/power-belt.png",
    "system": {
      "description": "<p>Increase DMG by 1 on all carried melee weapons.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "belt"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "belt"
      }
    }
  },
  {
    "_id": "3632596788361148",
    "name": "Quiver of Holding",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/quiver-of-holding.png",
    "system": {
      "description": "<p>Only mark usage on 6.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "quiver"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "quiver"
      }
    }
  },
  {
    "_id": "d7a4d77f153cf55a",
    "name": "Robo Limb",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/robo-limb.png",
    "system": {
      "description": "<p>Place in satchel slot with another item on top; item counts as carried.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "prosthetic"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "prosthetic"
      }
    }
  },
  {
    "_id": "313869267e40e645",
    "name": "Steady Gloves",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/steady-gloves.png",
    "system": {
      "description": "<p>Increase TH of attacks with bows by 1.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "gloves"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "gloves"
      }
    }
  },
  {
    "_id": "73edb7a5483a9de3",
    "name": "The Scryglass",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/the-scryglass.png",
    "system": {
      "description": "<p>Whatever its carrier whispers will be seen by another target peeking through it.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "eyepiece"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "eyepiece"
      }
    }
  },
  {
    "_id": "09c58985f091fc4b",
    "name": "Cap-n-Bells",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/cap-n-bells.png",
    "system": {
      "description": "<p>May use LUCK to cast spells from scrolls.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "hat"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "The Jester's Might",
        "setClass": "bard"
      }
    }
  },
  {
    "_id": "7298bc583fb9f6fa",
    "name": "Cummerbund",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/cummerbund.png",
    "system": {
      "description": "<p>Mark usage to automatically pass a CHA save that involves social interaction.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "belt"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "The Jester's Might",
        "setClass": "bard"
      }
    }
  },
  {
    "_id": "71050172dd1c1f93",
    "name": "Prismatic Tights",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/prismatic-tights.png",
    "system": {
      "description": "<p>Counts as armour; mark usage to deflect a hostile spell.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "light",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "The Jester's Might",
        "setClass": "bard"
      }
    }
  },
  {
    "_id": "2e95d8cf59f7b62e",
    "name": "Turnshoes",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/turnshoes.png",
    "system": {
      "description": "<p>+1 CHA.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "boots"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "The Jester's Might",
        "setClass": "bard"
      }
    }
  },
  {
    "_id": "51fc150d81ab9b31",
    "name": "Grim Skull",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/grim-skull.png",
    "system": {
      "description": "<p>Counts as helmet; forces adversaries to roll Morale on Major Hits.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "helmet",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Morgave's Osseous Dominion",
        "setClass": "bone-whisperer"
      }
    }
  },
  {
    "_id": "a85b46e21277ed91",
    "name": "Head Trophy",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/head-trophy.png",
    "system": {
      "description": "<p>Mark usage to deal d6 damage to one target, harvesting an equal amount of spirit.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Morgave's Osseous Dominion",
        "setClass": "bone-whisperer"
      }
    }
  },
  {
    "_id": "2fabbd2455f78c79",
    "name": "Whip of Bones",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/whip-of-bones.png",
    "system": {
      "description": "<p>Death Blow: resurrects slain target as undead ally for one day.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "resurrects slain target as undead ally for one day.",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Morgave's Osseous Dominion",
        "setClass": "bone-whisperer"
      }
    }
  },
  {
    "_id": "5218b059de3d21c8",
    "name": "Bone Armour",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/bone-armour.png",
    "system": {
      "description": "<p>Counts as body armour; if user slays a vertebrate level 3+ creature, clear one usage.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "light",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Morgave's Osseous Dominion",
        "setClass": "bone-whisperer"
      }
    }
  },
  {
    "_id": "50ae5add7964f6ea",
    "name": "Amulet of Faith",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/amulet-of-faith.png",
    "system": {
      "description": "<p>+2 LUCK.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Aetheria's Divine Aegis",
        "setClass": "cleric"
      }
    }
  },
  {
    "_id": "6630bd4f513c6ce7",
    "name": "Helm of Mettle",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/helm-of-mettle.png",
    "system": {
      "description": "<p>Counts as helmet; may stack one condition atop it.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "helmet",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Aetheria's Divine Aegis",
        "setClass": "cleric"
      }
    }
  },
  {
    "_id": "a2ee4361bf1151ff",
    "name": "Mace of Trial",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/mace-of-trial.png",
    "system": {
      "description": "<p>Death Blow: force ally of target to save or crumble in ash.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "force ally of target to save or crumble in ash.",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Aetheria's Divine Aegis",
        "setClass": "cleric"
      }
    }
  },
  {
    "_id": "fb86b0d5ad9fbc1b",
    "name": "Oath Scutum",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/oath-scutum.png",
    "system": {
      "description": "<p>Counts as shield; +1 CHA.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "shield",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Aetheria's Divine Aegis",
        "setClass": "cleric"
      }
    }
  },
  {
    "_id": "9e0627badb86edbd",
    "name": "Cloak of Shades",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/cloak-of-shades.png",
    "system": {
      "description": "<p>Always act first in combat.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "cloak"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Veil of the Shadow's Embrace",
        "setClass": "cutthroat"
      }
    }
  },
  {
    "_id": "c86ef154d6d74557",
    "name": "Hexknife",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/hexknife.png",
    "system": {
      "description": "<p>Special: mark usage and make a LUCK save to nullify a cast spell.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Veil of the Shadow's Embrace",
        "setClass": "cutthroat"
      }
    }
  },
  {
    "_id": "fbd0a3c5e9ee10f2",
    "name": "Mind Eye Belt",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/mind-eye-belt.png",
    "system": {
      "description": "<p>+2 INT.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "belt"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Veil of the Shadow's Embrace",
        "setClass": "cutthroat"
      }
    }
  },
  {
    "_id": "8a4224e15a00a60e",
    "name": "Phantom Ring",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/phantom-ring.png",
    "system": {
      "description": "<p>Mark usage to teleport within Far Away range.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "ring"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Veil of the Shadow's Embrace",
        "setClass": "cutthroat"
      }
    }
  },
  {
    "_id": "66873845dbc98cd7",
    "name": "Amphibian Ring",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/amphibian-ring.png",
    "system": {
      "description": "<p>Wearer can breathe underwater.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "ring"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Faeloria's Circle of Life",
        "setClass": "druid"
      }
    }
  },
  {
    "_id": "7da93ef558ef1565",
    "name": "Bird Talisman",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/bird-talisman.png",
    "system": {
      "description": "<p>Mark usage to gain the ability to fly for d6 hours.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Faeloria's Circle of Life",
        "setClass": "druid"
      }
    }
  },
  {
    "_id": "8e4e65ac7c71b81a",
    "name": "Mammal Furs",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/mammal-furs.png",
    "system": {
      "description": "<p>Counts as body armour.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "light",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Faeloria's Circle of Life",
        "setClass": "druid"
      }
    }
  },
  {
    "_id": "80c5aefc77277c17",
    "name": "Reptile Boots",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/reptile-boots.png",
    "system": {
      "description": "<p>+2 DEX.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "boots"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Faeloria's Circle of Life",
        "setClass": "druid"
      }
    }
  },
  {
    "_id": "33bd4d4b879cc4ef",
    "name": "Nightseers",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/nightseers.png",
    "system": {
      "description": "<p>Grants darkvision.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "goggles"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "VerENthus' Clockwork Harmonia",
        "setClass": "tinkerer"
      }
    }
  },
  {
    "_id": "00dc2521da07c460",
    "name": "The Blastbolt",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/the-blastbolt.png",
    "system": {
      "description": "<p>Major Hit: spawns an explosion for d6 damage on all Near target.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "spawns an explosion for d6 damage on all Near target.",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "VerENthus' Clockwork Harmonia",
        "setClass": "tinkerer"
      }
    }
  },
  {
    "_id": "1577e852a2a01343",
    "name": "Tinkerfist",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/tinkerfist.png",
    "system": {
      "description": "<p>Quick Craft costs one less usage; may be tucked under hand-item cards.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "prosthetic"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "VerENthus' Clockwork Harmonia",
        "setClass": "tinkerer"
      }
    }
  },
  {
    "_id": "84285a9c3b7d3f7a",
    "name": "Burden Bearer",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/burden-bearer.png",
    "system": {
      "description": "<p>Counts as body armour; unlock inventory slots reserved for higher STR.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "light",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "VerENthus' Clockwork Harmonia",
        "setClass": "tinkerer"
      }
    }
  },
  {
    "_id": "5b148ffcf7ec9267",
    "name": "Amulet of Fire",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/amulet-of-fire.png",
    "system": {
      "description": "<p>Take half damage from fire sources.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Dragonkin Ascension of King Ryzeel",
        "setClass": "warrior"
      }
    }
  },
  {
    "_id": "d940693d3ac49df3",
    "name": "The Dragon Skull",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/the-dragon-skull.png",
    "system": {
      "description": "<p>Counts as shield; +4 max hit points.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "shield",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Dragonkin Ascension of King Ryzeel",
        "setClass": "warrior"
      }
    }
  },
  {
    "_id": "9f16d6bd2e95ee34",
    "name": "Wyrm Slayer",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/wyrm-slayer.png",
    "system": {
      "description": "<p>Special: +1 TH vs Dragons.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Dragonkin Ascension of King Ryzeel",
        "setClass": "warrior"
      }
    }
  },
  {
    "_id": "2e6583b917a39e26",
    "name": "Dragonhide",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/dragonhide.png",
    "system": {
      "description": "<p>Counts as body armour; works against fire damage.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "light",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Dragonkin Ascension of King Ryzeel",
        "setClass": "warrior"
      }
    }
  },
  {
    "_id": "b7ff31f00e177aa2",
    "name": "Gone Girdle",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/gone-girdle.png",
    "system": {
      "description": "<p>If hit, roll LUCK to teleport to avoid hit.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "belt"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Zeltharion's Arcane Legacy",
        "setClass": "wizard"
      }
    }
  },
  {
    "_id": "5f49a63cd3769fc6",
    "name": "Prismatic Ward",
    "type": "gear",
    "img": "systems/flail/icons/unique-items/prismatic-ward.png",
    "system": {
      "description": "<p>Choose one element (fire, ice, lightning, etc.); take half damage from it.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "amulet"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Zeltharion's Arcane Legacy",
        "setClass": "wizard"
      }
    }
  },
  {
    "_id": "88ec09aef301c5c9",
    "name": "Rod of Morph",
    "type": "weapon",
    "img": "systems/flail/icons/unique-items/rod-of-morph.png",
    "system": {
      "description": "<p>Major Hit: transforms target into a chicken.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 1,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "unique",
      "tags": [],
      "deathBlow": "",
      "majorHit": "transforms target into a chicken.",
      "anyHit": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Zeltharion's Arcane Legacy",
        "setClass": "wizard"
      }
    }
  },
  {
    "_id": "887fe435c233151b",
    "name": "Robes of Insight",
    "type": "armour",
    "img": "systems/flail/icons/unique-items/robes-of-insight.png",
    "system": {
      "description": "<p>+2 INT.</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "armourType": "light",
      "defence": 0
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "unique": true,
        "uniqueCategory": "set-item",
        "setName": "Zeltharion's Arcane Legacy",
        "setClass": "wizard"
      }
    }
  }
];
