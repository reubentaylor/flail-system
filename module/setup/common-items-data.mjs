/**
 * Bundled common-items data. Imported on `ready` to populate
 * a world-level compendium named 'flail-common-items'.
 * Generated from packs/common-items/*.json — do not edit by hand.
 */

export const COMMON_ITEMS = [
  {
    "_id": "eCc0H7xVtdN38AeL",
    "name": "Axe",
    "type": "weapon",
    "img": "systems/flail/icons/items/axe.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-handed axe weapon. TH 4 / DMG 3.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "axe",
      "tags": [
        "axe"
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
    "_id": "NhtM53xGBeN3v1I6",
    "name": "Battle Axe",
    "type": "weapon",
    "img": "systems/flail/icons/items/battle-axe.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Two-handed axe weapon. TH 6 / DMG 4.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "axe",
      "tags": [
        "battleAxe",
        "axe"
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
    "_id": "nfRPbOCzzz3GVBGG",
    "name": "Bear Trap",
    "type": "gear",
    "img": "systems/flail/icons/items/bear-trap.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Toothed iron snare.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "IqHFbYI7y9TR6cPo",
    "name": "Bedroll",
    "type": "gear",
    "img": "systems/flail/icons/items/bedroll.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Wool roll, modest comfort.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "eA6M8tvAl3VZoYg4",
    "name": "Bell",
    "type": "gear",
    "img": "systems/flail/icons/items/bell.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Brass bell that rings clear.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "yrB4ztyjGGvlgRwt",
    "name": "Blowgun",
    "type": "weapon",
    "img": "systems/flail/icons/items/blowgun.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Ranged missile weapon. TH 5 / DMG 2.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 2,
      "range": [
        "near",
        "distant"
      ],
      "weaponType": "missile",
      "category": "missile",
      "tags": [
        "blowgun",
        "missile"
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
    "_id": "rO88DA8Ie1gGfq0D",
    "name": "Bolstering Lute",
    "type": "instrument",
    "img": "systems/flail/icons/items/bolstering-lute.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Bard instrument. To perform, make a CHA save and roll on the effect table.</p>",
      "cost": 0,
      "quantity": 1,
      "effectTable": [
        "",
        "All allies gain +1 To Hit in their next round of combat.",
        "One chosen ally gains +2 To Hit in their next round of combat.",
        "One chosen ally causes +d6 damage in the next attack (if it hits).",
        "One random ally causes +d6 damage in the next attack (if it hits).",
        "One random adversary gains +1 To Hit in their next round.",
        "One random adversary gains +1 To Hit in their next round.",
        "All adversaries gain +1 To Hit in their next round.",
        "All adversaries gain +1 To Hit in their next round.",
        "All adversaries gain +2 To Hit in their next round.",
        "All adversaries gain +2 To Hit in their next round."
      ],
      "tagline": "The obvious choice for the obvious bard."
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
    "_id": "PuWSpD5y6MWJuism",
    "name": "Book",
    "type": "gear",
    "img": "systems/flail/icons/items/book.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>A bound book, blank or written.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "O9x4pORiZ5vpWHsn",
    "name": "Cage",
    "type": "gear",
    "img": "systems/flail/icons/items/cage.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Small iron cage for small captives.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "B24eoYZgtsY0mmI1",
    "name": "Caltrops",
    "type": "gear",
    "img": "systems/flail/icons/items/caltrops.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Sharp iron stars that ruin a chase.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "YgkR6K3ySuUJXeW7",
    "name": "Chain Mail",
    "type": "armour",
    "img": "systems/flail/icons/items/chain-mail.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 4,
        "value": 0
      },
      "description": "<p>Chain Mail. Mitigates 1s on To Hit; A-marker armour.</p>",
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
    "flags": {}
  },
  {
    "_id": "fjXEtSlYZBtdvtoI",
    "name": "Chain",
    "type": "gear",
    "img": "systems/flail/icons/items/chain.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Heavy iron chain, ten feet.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "Ce7nGMjtN1xWiWly",
    "name": "Club",
    "type": "weapon",
    "img": "systems/flail/icons/items/club.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-handed club weapon. TH 4 / DMG 2.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "club",
      "tags": [
        "club"
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
    "_id": "m3B1amgmXPNRo4Om",
    "name": "Coin Purse",
    "type": "gear",
    "img": "systems/flail/icons/items/coin-purse.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Holds coins; loses some.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "bC9MafiuPI1zWiEd",
    "name": "Compass",
    "type": "gear",
    "img": "systems/flail/icons/items/compass.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Brass compass — points north, mostly.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "k2dsWx8LVELPWJqJ",
    "name": "Cooking Pots",
    "type": "gear",
    "img": "systems/flail/icons/items/cooking-pots.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Nested pots and a pan.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "2CLDS2CJLvcnzNyC",
    "name": "Crimson Coin Sigil",
    "type": "gear",
    "img": "systems/flail/icons/items/crimson-coin.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Cutthroat guild sigil — the Blood Mint.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "adornment": true
      }
    }
  },
  {
    "_id": "s6V9FT0B6OUxL5pb",
    "name": "Cross of Sheezuz",
    "type": "gear",
    "img": "systems/flail/icons/items/cross-of-sheezuz.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Cleric holy symbol of the dead god Sheezuz.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "holySymbol"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "adornment": true
      }
    }
  },
  {
    "_id": "YjAyTPDsvQEgVK9Z",
    "name": "Crossbow",
    "type": "weapon",
    "img": "systems/flail/icons/items/crossbow.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Ranged bow weapon. TH 5 / DMG 4.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 4,
      "range": [
        "near",
        "distant"
      ],
      "weaponType": "missile",
      "category": "bow",
      "tags": [
        "crossbow",
        "missile"
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
    "_id": "hIawrZ74qmBzt715",
    "name": "Crowbar",
    "type": "gear",
    "img": "systems/flail/icons/items/crowbar.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Pry doors, lids, and unwise heads.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "Q90P8MqmwvZIH0UN",
    "name": "Dagger",
    "type": "weapon",
    "img": "systems/flail/icons/items/dagger.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-handed blade weapon. TH 4 / DMG 3.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "blade",
      "tags": [
        "dagger",
        "blade"
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
    "_id": "GbVLvaB6ZuoEQZg8",
    "name": "Darts",
    "type": "weapon",
    "img": "systems/flail/icons/items/darts.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Ranged thrown weapon. TH 4 / DMG 2.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 2,
      "range": [
        "near",
        "distant"
      ],
      "weaponType": "missile",
      "category": "thrown",
      "tags": [
        "dart",
        "thrown"
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
    "_id": "G2HOb8Ikuk9cm9EI",
    "name": "Eye Ring Sigil",
    "type": "gear",
    "img": "systems/flail/icons/items/eye-ring.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Cutthroat guild sigil — the All-Seeing.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "adornment": true
      }
    }
  },
  {
    "_id": "Vbg7IAxe2z33vHy3",
    "name": "Fishing Gear",
    "type": "gear",
    "img": "systems/flail/icons/items/fishing-gear.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Rod, line and hook.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "InPzuv35eHUcZD9k",
    "name": "Flail",
    "type": "weapon",
    "img": "systems/flail/icons/items/flail.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-handed flail weapon. TH 5 / DMG 4.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "flail",
      "tags": [
        "flail"
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
    "_id": "E3GzrSLH2aZYSNE9",
    "name": "Flask of Oil",
    "type": "gear",
    "img": "systems/flail/icons/items/flask-of-oil.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Stoppered flask of lamp oil.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "fuel"
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
    "_id": "21YIurCGSuVsxpWa",
    "name": "Flask",
    "type": "gear",
    "img": "systems/flail/icons/items/flask.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Empty stoppered flask.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "xpyZnCAy32P9WvK8",
    "name": "Flint & Steel",
    "type": "gear",
    "img": "systems/flail/icons/items/flint-and-steel.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Strike for sparks and tinder.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "yQGvMfPvd34kfN0f",
    "name": "Full Plate Mail",
    "type": "armour",
    "img": "systems/flail/icons/items/full-plate-mail.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": false,
      "usage": {
        "max": 6,
        "value": 0
      },
      "description": "<p>Full Plate Mail. Mitigates 1s on To Hit; A-marker armour.</p>",
      "cost": 0,
      "quantity": 1,
      "armourType": "heavy",
      "defence": 0
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
    "_id": "V7LfgUxGKd7syuMY",
    "name": "Gadget Belt",
    "type": "gear",
    "img": "systems/flail/icons/items/gadget-belt.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Tinkerer's belt of gadget pouches and slots.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "veSZFEAJqj3nYXF8",
    "name": "Garrotte",
    "type": "weapon",
    "img": "systems/flail/icons/items/garrotte.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-handed rogue weapon. TH 4 / DMG 3.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "rogue",
      "tags": [
        "garrotte",
        "rogue"
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
    "_id": "ITn16fwP2dCYtM1P",
    "name": "Grappling Hook",
    "type": "gear",
    "img": "systems/flail/icons/items/grappling-hook.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Iron hook, bites at edges and ledges.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "zvqRqAGjT1PqVW8O",
    "name": "Great Sword",
    "type": "weapon",
    "img": "systems/flail/icons/items/great-sword.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Two-handed blade weapon. TH 6 / DMG 5.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 5,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "blade",
      "tags": [
        "greatSword",
        "blade"
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
    "_id": "Kw4EyEKV04URZI94",
    "name": "Grub",
    "type": "gear",
    "img": "systems/flail/icons/items/grub.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>A day's rations.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ration"
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
    "_id": "CEhr6KJP5tl74G91",
    "name": "Hammer",
    "type": "gear",
    "img": "systems/flail/icons/items/hammer.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Heavy hammer for pegs and nails.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "j2Hr6SLvZgq1xI8C",
    "name": "Hand Brooch Sigil",
    "type": "gear",
    "img": "systems/flail/icons/items/hand-brooch.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Cutthroat guild sigil — the Open Palm.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "adornment": true
      }
    }
  },
  {
    "_id": "hWPiqoq37YsC2X0y",
    "name": "Skull Harp of the Abyss",
    "type": "instrument",
    "img": "systems/flail/icons/items/harp-of-abyss.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Bard instrument. To perform, make a CHA save and roll on the effect table.</p>",
      "cost": 0,
      "quantity": 1,
      "effectTable": [
        "",
        "Abyssal rift opens beneath the feet of a chosen target, eating it.",
        "Portal releases a d6 level monster that is an ally until the end of combat.",
        "Two chosen targets are grappled by tendrils causing d8 necrotic damage.",
        "One chosen target is grappled by a tendril causing d8 necrotic damage.",
        "Two random targets (allies included) are pinned by shadowy tendrils, immobilising them.",
        "Two random targets (allies included) are pinned by shadowy tendrils, immobilising them.",
        "A colossal red rift emerges, spitting out a random creature of level 7 or above.",
        "A colossal red rift emerges, spitting out a random creature of level 7 or above.",
        "An abyssal vortex manifests, drawing all towards it. Those who are Distant or Far must save, or are pulled Near it. Then, all those Near it must save or be consumed by it.",
        "An abyssal vortex manifests, drawing all towards it. Those who are Distant or Far must save, or are pulled Near it. Then, all those Near it must save or be consumed by it."
      ],
      "tagline": "A demonic harp channelling the underworld's arcana."
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
    "_id": "9UtDrYoCpwyJc7t0",
    "name": "Helm of Zor'Vol",
    "type": "gear",
    "img": "systems/flail/icons/items/helm-of-zorvol.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Cleric helm bearing the sigil of Zor'Vol.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "QNNsOnW2rDzsg0T3",
    "name": "Helmet",
    "type": "armour",
    "img": "systems/flail/icons/items/helmet.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "description": "<p>Helmet. Mitigates 1s on To Hit; A-marker armour.</p>",
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
    "flags": {}
  },
  {
    "_id": "L3Nw5GYfpVivdTw2",
    "name": "Herbs",
    "type": "gear",
    "img": "systems/flail/icons/items/herbs.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Bundle of useful or peculiar herbs.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ration"
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
    "_id": "vALHODbZCuaFkqTy",
    "name": "Hide Armour",
    "type": "armour",
    "img": "systems/flail/icons/items/hide-armour.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Hide Armour. Mitigates 1s on To Hit; A-marker armour.</p>",
      "cost": 0,
      "quantity": 1,
      "armourType": "basic",
      "defence": 0
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
    "_id": "sy3nInIwVnjpVTq3",
    "name": "Hourglass",
    "type": "gear",
    "img": "systems/flail/icons/items/hourglass.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-glass timer.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "uXOW9X1Qwbn0KSN8",
    "name": "Ink & Quill",
    "type": "gear",
    "img": "systems/flail/icons/items/ink-and-quill.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>For scribing notes, signatures, or scrolls.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "keaHbHDDtiDOrFs0",
    "name": "Iron Spikes",
    "type": "gear",
    "img": "systems/flail/icons/items/iron-spikes.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Bundle of iron spikes.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "tool"
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
    "_id": "cqptLdlmhb5PGX7P",
    "name": "Ladder",
    "type": "gear",
    "img": "systems/flail/icons/items/ladder.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Folding wooden ladder.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "T02Nt4QJtvq4pAJ1",
    "name": "Lantern",
    "type": "gear",
    "img": "systems/flail/icons/items/lantern.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Hooded lantern; needs oil.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "lightSource"
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
    "_id": "VdGETZoJXm4Jofqq",
    "name": "Leather Armour",
    "type": "armour",
    "img": "systems/flail/icons/items/leather-armour.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Leather Armour. Mitigates 1s on To Hit; A-marker armour.</p>",
      "cost": 0,
      "quantity": 1,
      "armourType": "basic",
      "defence": 0
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
    "_id": "k0h2RLPiOVrYNQAO",
    "name": "Lockbox",
    "type": "gear",
    "img": "systems/flail/icons/items/lockbox.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>A small, locked iron box.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "U1fot5aQBbn1HeET",
    "name": "Long Bow",
    "type": "weapon",
    "img": "systems/flail/icons/items/long-bow.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Two-handed bow weapon. TH 6 / DMG 4.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 4,
      "range": [
        "near",
        "distant"
      ],
      "weaponType": "missile",
      "category": "bow",
      "tags": [
        "longBow",
        "bow"
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
    "_id": "VkBdyjdsjYArpbSi",
    "name": "Long Crumhorn of Pandemonium",
    "type": "instrument",
    "img": "systems/flail/icons/items/long-crumhorn.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Bard instrument. To perform, make a CHA save and roll on the effect table.</p>",
      "cost": 0,
      "quantity": 1,
      "effectTable": [
        "",
        "Strongest adversary attacks two of its allies immediately.",
        "Two random adversaries attack each other.",
        "Random adversary attacks one of its allies.",
        "Random adversary commits an act of self-harm.",
        "Two random allies must attack each other.",
        "Two random allies must attack each other.",
        "All allies must take a foolish action immediately.",
        "All allies must take a foolish action immediately.",
        "The location the Bard is in suffers a catastrophic event, like catching instant fire or flooding.",
        "The location the Bard is in suffers a catastrophic event, like catching instant fire or flooding."
      ],
      "tagline": "No sound bard has ever dared to touch this."
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
    "_id": "wKvU1GD8DWtnva77",
    "name": "Mace",
    "type": "weapon",
    "img": "systems/flail/icons/items/mace.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-handed blunt weapon. TH 5 / DMG 4.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "blunt",
      "tags": [
        "mace",
        "blunt"
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
    "_id": "jbngcOqZJeuxXcDb",
    "name": "Manacles",
    "type": "gear",
    "img": "systems/flail/icons/items/manacles.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Iron wrist shackles with key.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "dwyzAieEJXgSVRGZ",
    "name": "Map",
    "type": "gear",
    "img": "systems/flail/icons/items/map.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>A map of somewhere.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "jqZuPecPrvC3AsT7",
    "name": "Marbles",
    "type": "gear",
    "img": "systems/flail/icons/items/marbles.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Bag of glass marbles.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "32ogUAStZI5kHUeR",
    "name": "Maul",
    "type": "weapon",
    "img": "systems/flail/icons/items/maul.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Two-handed blunt weapon. TH 6 / DMG 3.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "blunt",
      "tags": [
        "maul",
        "blunt"
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
    "_id": "DAzNTcJI3r2BN8mR",
    "name": "Microscope",
    "type": "gear",
    "img": "systems/flail/icons/items/microscope.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Brass microscope for the very small.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "DWIP1Y6SGk4XjOQV",
    "name": "Mirror",
    "type": "gear",
    "img": "systems/flail/icons/items/mirror.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Polished hand mirror.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "ODpPz87Io18yO75G",
    "name": "Morningstar",
    "type": "weapon",
    "img": "systems/flail/icons/items/morningstar.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-handed blunt weapon. TH 5 / DMG 3.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "blunt",
      "tags": [
        "morningstar",
        "blunt"
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
    "_id": "oNpMoN0l3LCBhXUQ",
    "name": "Mutton Tunic",
    "type": "gear",
    "img": "systems/flail/icons/items/mutton-tunic.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Cleric's blessed tunic.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "eF9wKpvZqz89J4OK",
    "name": "Net",
    "type": "gear",
    "img": "systems/flail/icons/items/net.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Weighted throwing net.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "qbSyJL48ginYk0C1",
    "name": "Perfume",
    "type": "gear",
    "img": "systems/flail/icons/items/perfume.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Aromatic phial — masks scents, attracts trouble.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": ""
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
    "_id": "S7rJR8AfzCXPRgmO",
    "name": "Pickaxe",
    "type": "gear",
    "img": "systems/flail/icons/items/pickaxe.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>For mining and rough hewing.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "wujeIenyUjlxvmZ1",
    "name": "Pipes of Doom",
    "type": "instrument",
    "img": "systems/flail/icons/items/pipes-of-doom.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Bard instrument. To perform, make a CHA save and roll on the effect table.</p>",
      "cost": 0,
      "quantity": 1,
      "effectTable": [
        "",
        "Stuns all adversaries within earshot.",
        "Stuns one chosen target.",
        "d6 damage to one chosen target.",
        "Stuns two random victims (allies included) within earshot.",
        "d4 damage to everyone within earshot. Roll individually for each target.",
        "d4 damage to everyone within earshot. Roll individually for each target.",
        "d8 damage to everyone within earshot. Roll individually for each target.",
        "d8 damage to everyone within earshot. Roll individually for each target.",
        "Stuns all allies within earshot.",
        "Stuns all allies within earshot."
      ],
      "tagline": "A cursed instrument that everyone thought was gone."
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
    "_id": "Agco4i1mKnGzRElS",
    "name": "Polearm",
    "type": "weapon",
    "img": "systems/flail/icons/items/polearm.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Two-handed polearm weapon. TH 4 / DMG 5.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 5,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "polearm",
      "tags": [
        "polearm"
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
    "_id": "SEN2b1COEKKadaKg",
    "name": "Potion",
    "type": "gear",
    "img": "systems/flail/icons/items/potion.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Single-use alchemical potion.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": ""
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
    "_id": "5rrF9WJspNgEOVTx",
    "name": "Quarterstaff",
    "type": "weapon",
    "img": "systems/flail/icons/items/quarterstaff.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Two-handed blunt weapon. TH 5 / DMG 2.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "blunt",
      "tags": [
        "quarterstaff",
        "blunt"
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
    "_id": "BO1Ra7BEq4qfIwXL",
    "name": "Quiver",
    "type": "gear",
    "img": "systems/flail/icons/items/quiver.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Quiver of arrows or bolts.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "ammo"
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
    "_id": "dfjpxvS2Hna1AlpD",
    "name": "Rope",
    "type": "gear",
    "img": "systems/flail/icons/items/rope.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Fifty feet of hempen rope.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "fIS9U3ApNnJu1sya",
    "name": "Scale Mail",
    "type": "armour",
    "img": "systems/flail/icons/items/scale-mail.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 4,
        "value": 0
      },
      "description": "<p>Scale Mail. Mitigates 1s on To Hit; A-marker armour.</p>",
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
    "flags": {}
  },
  {
    "_id": "TTeKC6A0U7w9l8FI",
    "name": "Scimitar",
    "type": "weapon",
    "img": "systems/flail/icons/items/scimitar.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-handed blade weapon. TH 5 / DMG 4.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "blade",
      "tags": [
        "scimitar",
        "blade"
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
    "_id": "FAlPpRZpWqNbkwoa",
    "name": "Scroll",
    "type": "gear",
    "img": "systems/flail/icons/items/scroll.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Single-use scroll. Cast the inscribed spell, then discard.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": ""
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
    "_id": "41a138zHSdku1jFT",
    "name": "Scythe",
    "type": "weapon",
    "img": "systems/flail/icons/items/scythe.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Two-handed polearm weapon. TH 6 / DMG 2.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "polearm",
      "tags": [
        "scythe",
        "polearm"
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
    "_id": "UQCnNTVtACfTsLrK",
    "name": "Shield",
    "type": "armour",
    "img": "systems/flail/icons/items/shield.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "description": "<p>Shield. Mitigates 1s on To Hit; A-marker armour.</p>",
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
    "flags": {}
  },
  {
    "_id": "FN6qsspJM7zu3RkB",
    "name": "Short Bow",
    "type": "weapon",
    "img": "systems/flail/icons/items/short-bow.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Ranged bow weapon. TH 5 / DMG 3.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 3,
      "range": [
        "near",
        "distant"
      ],
      "weaponType": "missile",
      "category": "bow",
      "tags": [
        "shortBow",
        "bow"
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
    "_id": "Yg4IY0N3f97ZcJXi",
    "name": "Short Sword",
    "type": "weapon",
    "img": "systems/flail/icons/items/short-sword.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-handed blade weapon. TH 5 / DMG 3.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "blade",
      "tags": [
        "shortSword",
        "blade"
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
    "_id": "gNpU4BME249vTcmk",
    "name": "Shovel",
    "type": "gear",
    "img": "systems/flail/icons/items/shovel.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Iron-shod shovel.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "hlmbpkjrEXy5AMtb",
    "name": "Sizzling Castanets",
    "type": "instrument",
    "img": "systems/flail/icons/items/siz-castanets.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Bard instrument. To perform, make a CHA save and roll on the effect table.</p>",
      "cost": 0,
      "quantity": 1,
      "effectTable": [
        "",
        "Shoot d4 fire bolts dealing d6 damage each on any chosen targets.",
        "All adversaries dance wildly (counts as stunned) until the Bard stops playing.",
        "Same as 2, but to two chosen targets. On a fail to break the stun, target's feet catches fire.",
        "Same as 3, but to one chosen target.",
        "Castanets shoot d6 fire bolts to random targets for d6 damage each.",
        "Castanets shoot d6 fire bolts to random targets for d6 damage each.",
        "Random ally dances violently in their next round and takes an Exhausted condition.",
        "Random ally dances violently in their next round and takes an Exhausted condition.",
        "All allies dance uncontrollably in their next round and take an Exhausted condition.",
        "All allies dance uncontrollably in their next round and take an Exhausted condition."
      ],
      "tagline": "The heartbeat of the bardic lands."
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
    "_id": "MtqvJ8E7q4E8kjT4",
    "name": "Sling",
    "type": "weapon",
    "img": "systems/flail/icons/items/sling.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Ranged missile weapon. TH 4 / DMG 2.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 2,
      "range": [
        "near",
        "distant"
      ],
      "weaponType": "missile",
      "category": "missile",
      "tags": [
        "sling",
        "missile"
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
    "_id": "jbnPtVBTLR7BBIwg",
    "name": "Smoking Pipe",
    "type": "gear",
    "img": "systems/flail/icons/items/smoking-pipe.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Pipe and pouch of leaf.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "Ui3gs64uoAeqT7Th",
    "name": "Sparkle of Life",
    "type": "gear",
    "img": "systems/flail/icons/items/sparkle-of-life.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>The Tinkerer's animating spark — fuel for constructs.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "1eJFlRgUbnr14Hv1",
    "name": "Spear",
    "type": "weapon",
    "img": "systems/flail/icons/items/spear.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Two-handed polearm weapon. TH 5 / DMG 4.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "polearm",
      "tags": [
        "spear",
        "polearm"
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
    "_id": "pDI8izEq2oGU0CrP",
    "name": "Spellbook",
    "type": "gear",
    "img": "systems/flail/icons/items/spellbook.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Wizard tome holding prepared spells.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "IH11i8UrV9jj7OSO",
    "name": "Spiked Chain",
    "type": "weapon",
    "img": "systems/flail/icons/items/spiked-chain.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-handed chain weapon. TH 4 / DMG 4.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "chain",
      "tags": [
        "spikedChain",
        "chain"
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
    "_id": "Vnb75cba3SUElq0b",
    "name": "Spirit Lantern",
    "type": "gear",
    "img": "systems/flail/icons/items/spirit-lantern.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Bone Whisperer's lantern that snares loose souls.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "lightSource"
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
    "_id": "lh5SHuLVVLNlpcid",
    "name": "Spyglass",
    "type": "gear",
    "img": "systems/flail/icons/items/spyglass.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Pocket telescope.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "pXcLeeIf3yy2FyjW",
    "name": "Telescope",
    "type": "gear",
    "img": "systems/flail/icons/items/telescope.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Tripod telescope for the very far.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "emW45i5bDNFMzxL2",
    "name": "Ten-foot Pole",
    "type": "gear",
    "img": "systems/flail/icons/items/ten-foot-pole.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>The classic ten-foot pole. Pokes things at length.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "lk5mKmHeHRpQe6sA",
    "name": "Tent",
    "type": "gear",
    "img": "systems/flail/icons/items/tent.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Two-person canvas tent.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
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
    "_id": "h1B6AmTFGiIYCXIT",
    "name": "Tentacle Clasp Sigil",
    "type": "gear",
    "img": "systems/flail/icons/items/tentacle-clasp.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Cutthroat guild sigil — the Long Arm.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "adornment": true
      }
    }
  },
  {
    "_id": "Jzpvy0HJf1ufTDrc",
    "name": "The Oak Leaf",
    "type": "gear",
    "img": "systems/flail/icons/items/the-oak-leaf.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Druid's preserved oak leaf, focus for primal gifts.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": ""
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "adornment": true
      }
    }
  },
  {
    "_id": "Tl7iVRGdJJVuwISX",
    "name": "Thieves' Tools",
    "type": "gear",
    "img": "systems/flail/icons/items/thieves-tools.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Picks, pries and shims for the Cutthroat trade.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": false,
      "tag": "tool"
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
    "_id": "lmEuEscMyOYav0NU",
    "name": "Throw Knives",
    "type": "weapon",
    "img": "systems/flail/icons/items/throw-knives.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Ranged thrown weapon. TH 4 / DMG 3.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 3,
      "range": [
        "near",
        "distant"
      ],
      "weaponType": "missile",
      "category": "thrown",
      "tags": [
        "throwKnives",
        "thrown",
        "blade"
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
    "_id": "m340d3V7Y7VM1kb8",
    "name": "Thundering Drum of Reckoning",
    "type": "instrument",
    "img": "systems/flail/icons/items/thunder-drum.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Bard instrument. To perform, make a CHA save and roll on the effect table.</p>",
      "cost": 0,
      "quantity": 1,
      "effectTable": [
        "",
        "One chosen target is hit by a massive thunder dealing 3d6 damage.",
        "Up to two chosen targets are hit by lightning bolts dealing d6 damage.",
        "One chosen target is hit by a lightning bolt dealing d6 damage.",
        "One random target is hit by a lightning bolt dealing d6 damage.",
        "Random ally is hit by a massive thunder dealing 2d6 damage.",
        "Random ally is hit by a massive thunder dealing 2d6 damage.",
        "Hailstone storm forms, causing d4 damage per round to all in combat. Lasts d4 rounds.",
        "Hailstone storm forms, causing d4 damage per round to all in combat. Lasts d4 rounds.",
        "Lightning arc forms between two random allies, forcing them to make an opposed STR save. Winner takes d4 damage; loser takes same damage as winner + 2d6 damage.",
        "Lightning arc forms between two random allies, forcing them to make an opposed STR save. Winner takes d4 damage; loser takes same damage as winner + 2d6 damage."
      ],
      "tagline": "An ancient drum said to harness the powers of storms."
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
    "_id": "c5dRdltEyPlioUo8",
    "name": "Tin Whistle of Spontaneous Combustion",
    "type": "instrument",
    "img": "systems/flail/icons/items/tin-whistle.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Bard instrument. To perform, make a CHA save and roll on the effect table.</p>",
      "cost": 0,
      "quantity": 1,
      "effectTable": [
        "",
        "All adversaries must make a save, or instantly combust.",
        "One random adversary must make a save, or instantly combust.",
        "A wall of fire encircles a chosen adversary. If crossed, deals 2d6 damage.",
        "One random adversary ignites in flames taking d4 damage per round.",
        "Invokes a rain of fire for d4 rounds, causing 2d6 damage per round to all in combat.",
        "Invokes a rain of fire for d4 rounds, causing 2d6 damage per round to all in combat.",
        "Random ally must make a save. On a fail, they ignite in flames (d4 damage per round).",
        "Random ally must make a save. On a fail, they ignite in flames (d4 damage per round).",
        "Invokes a fireball causing 3d6 damage to all Nearby and 2d6 damage to those Distant.",
        "Invokes a fireball causing 3d6 damage to all Nearby and 2d6 damage to those Distant."
      ],
      "tagline": "Those who listen to it are often overcome by a burning desire."
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
    "_id": "4ArgdbmowrcJZWdx",
    "name": "Torches",
    "type": "gear",
    "img": "systems/flail/icons/items/torches.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Bundle of pitch torches.</p>",
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "lightSource"
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
    "_id": "sZi9yZgLUyiWHp3W",
    "name": "Tulwar",
    "type": "weapon",
    "img": "systems/flail/icons/items/tulwar.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-handed blade weapon. TH 5 / DMG 3.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 5,
      "damage": 3,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "blade",
      "tags": [
        "tulwar",
        "blade"
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
    "_id": "dg4aN6GxLv2diq3X",
    "name": "Wand",
    "type": "weapon",
    "img": "systems/flail/icons/items/wand.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Wizard wand. <em>Any hit: cast a spell.</em></p>",
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 1,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "arcane",
      "tags": [
        "wand",
        "arcane"
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
    "_id": "xKuedFpji9sxR67q",
    "name": "Warhammer",
    "type": "weapon",
    "img": "systems/flail/icons/items/warhammer.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 2,
      "twoHanded": true,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>Two-handed blunt weapon. TH 6 / DMG 4.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 6,
      "damage": 4,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "blunt",
      "tags": [
        "warhammer",
        "blunt"
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
    "_id": "aPSD0e8QR9A2G14V",
    "name": "Whip",
    "type": "weapon",
    "img": "systems/flail/icons/items/whip.png",
    "system": {
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 3,
        "value": 0
      },
      "description": "<p>One-handed flail weapon. TH 4 / DMG 2.</p>",
      "cost": 0,
      "quantity": 1,
      "th": 4,
      "damage": 2,
      "range": [
        "near"
      ],
      "weaponType": "melee",
      "category": "flail",
      "tags": [
        "whip",
        "flail"
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
