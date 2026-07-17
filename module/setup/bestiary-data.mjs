/*
 * FLAIL Bestiary — bundled at world creation into the
 * `flail-bestiary` compendium. Each monster is an NPC actor with
 * embedded weapon Items for its attacks. Attack trigger fields
 * (deathBlow/majorHit/anyHit on the weapon Item) and actor-level
 * `specialRules` render on the NPC sheet.
 *
 * Total monsters: 64
 *
 * Categories:
 *   • Aerial: 7
 *   • Insects: 9
 *   • Aquatic: 8
 *   • Dragons: 4
 *   • Elementals: 4
 *   • Giants: 4
 *   • Monstrosities: 7
 *   • Oozes: 5
 *   • Reptiles: 7
 *   • Undead: 9
 */

export const FLAIL_BESTIARY = [
  {
    "_id": "134177f062aaeb83",
    "name": "Harpy",
    "type": "npc",
    "img": "systems/flail/icons/monsters/harpy.webp",
    "system": {
      "level": 2,
      "hp": {
        "value": 6,
        "max": 6
      },
      "saves": 8,
      "defence": 0,
      "morale": 10,
      "movement": "A",
      "creatureType": "Human-bird",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Melodies that don't make friends.</em></p><p>Category: <strong>Aerial</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "aerial",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "100ca8c8cdce8dd3",
        "name": "Song",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 5,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Instead of killing, takes control of target for one round.",
          "majorHit": "",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aerial",
        "tier": "Weak",
        "monsterKey": "harpy"
      }
    },
    "prototypeToken": {
      "name": "Harpy",
      "texture": {
        "src": "systems/flail/icons/monsters/harpy.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "f2363f1a8ae48774",
    "name": "Blood Vulture",
    "type": "npc",
    "img": "systems/flail/icons/monsters/blood-vulture.webp",
    "system": {
      "level": 2,
      "hp": {
        "value": 8,
        "max": 8
      },
      "saves": 6,
      "defence": 0,
      "morale": 9,
      "movement": "A",
      "creatureType": "Bird",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Lured by the smell of fresh blood.</em></p><p>Category: <strong>Aerial</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "aerial",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "1c911adc87c49618",
        "name": "Blood-sucking",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 5,
          "damage": 1,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Latches onto target, causing 2 damage per round.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aerial",
        "tier": "Weak",
        "monsterKey": "blood-vulture"
      }
    },
    "prototypeToken": {
      "name": "Blood Vulture",
      "texture": {
        "src": "systems/flail/icons/monsters/blood-vulture.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "4ce44f7c8b31d5fb",
    "name": "Griffon",
    "type": "npc",
    "img": "systems/flail/icons/monsters/griffon.webp",
    "system": {
      "level": 6,
      "hp": {
        "value": 25,
        "max": 25
      },
      "saves": 11,
      "defence": 1,
      "morale": 12,
      "movement": "F",
      "creatureType": "Bird",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Can spot a mouse a mile away.</em></p><p>Category: <strong>Aerial</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "aerial",
        "average"
      ]
    },
    "items": [
      {
        "_id": "e3c9de9fbc66b40c",
        "name": "Beak",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "b283ea2eeacc75db",
        "name": "Lion Claws",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On three pairs, causes an extra d8 damage."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aerial",
        "tier": "Average",
        "monsterKey": "griffon"
      }
    },
    "prototypeToken": {
      "name": "Griffon",
      "texture": {
        "src": "systems/flail/icons/monsters/griffon.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "26731f571e4694e3",
    "name": "Phoenix",
    "type": "npc",
    "img": "systems/flail/icons/monsters/phoenix.webp",
    "system": {
      "level": 5,
      "hp": {
        "value": 15,
        "max": 15
      },
      "saves": 13,
      "defence": 0,
      "morale": 11,
      "movement": "F",
      "creatureType": "Bird",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Dreads ash-sweepers more than predators.</em></p><p>Category: <strong>Aerial</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "<p>If killed, bursts in flames for d10 damage to all Nearby; reawakens in two turns.</p>",
      "attacksPerRound": 1,
      "tags": [
        "aerial",
        "average"
      ]
    },
    "items": [
      {
        "_id": "15980fed33722d23",
        "name": "Fiery Wings",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "4202a4c6d7eeb354",
        "name": "Talons",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 5,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aerial",
        "tier": "Average",
        "monsterKey": "phoenix"
      }
    },
    "prototypeToken": {
      "name": "Phoenix",
      "texture": {
        "src": "systems/flail/icons/monsters/phoenix.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "b10ec50566f887ff",
    "name": "Pterodactyl",
    "type": "npc",
    "img": "systems/flail/icons/monsters/pterodactyl.webp",
    "system": {
      "level": 4,
      "hp": {
        "value": 17,
        "max": 17
      },
      "saves": 12,
      "defence": 1,
      "morale": 12,
      "movement": "A",
      "creatureType": "Dinosaur",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Often hunts in coordinated packs.</em></p><p>Category: <strong>Aerial</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "aerial",
        "average"
      ]
    },
    "items": [
      {
        "_id": "2bf143756750567b",
        "name": "Claws",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aerial",
        "tier": "Average",
        "monsterKey": "pterodactyl"
      }
    },
    "prototypeToken": {
      "name": "Pterodactyl",
      "texture": {
        "src": "systems/flail/icons/monsters/pterodactyl.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "51516931a41c0f52",
    "name": "Cockatrice",
    "type": "npc",
    "img": "systems/flail/icons/monsters/cockatrice.webp",
    "system": {
      "level": 7,
      "hp": {
        "value": 20,
        "max": 20
      },
      "saves": 12,
      "defence": 0,
      "morale": 13,
      "movement": "A",
      "creatureType": "Bird",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Everyone is petrified of it.</em></p><p>Category: <strong>Aerial</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "aerial",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "020a7fd9d64cdb58",
        "name": "Beak",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Instead of killing, gives target the Petrified condition.",
          "majorHit": "",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aerial",
        "tier": "Strong",
        "monsterKey": "cockatrice"
      }
    },
    "prototypeToken": {
      "name": "Cockatrice",
      "texture": {
        "src": "systems/flail/icons/monsters/cockatrice.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "a91b7cfbc875a779",
    "name": "Roc",
    "type": "npc",
    "img": "systems/flail/icons/monsters/roc.webp",
    "system": {
      "level": 8,
      "hp": {
        "value": 35,
        "max": 35
      },
      "saves": 14,
      "defence": 1,
      "morale": 15,
      "movement": "F",
      "creatureType": "Bird",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Has been seen carrying elephants.</em></p><p>Category: <strong>Aerial</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "<p>Makes two attacks per round; first with beak, then with talons.</p>",
      "attacksPerRound": 2,
      "tags": [
        "aerial",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "a509c42b2af4eeff",
        "name": "Beak",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "da1caa9b3f291dc5",
        "name": "Talons",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 9,
          "damage": 5,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Instead of killing, carries target away to feed its chicks.",
          "majorHit": "",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aerial",
        "tier": "Strong",
        "monsterKey": "roc"
      }
    },
    "prototypeToken": {
      "name": "Roc",
      "texture": {
        "src": "systems/flail/icons/monsters/roc.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "efd5a90d8438806a",
    "name": "Giant Centipede",
    "type": "npc",
    "img": "systems/flail/icons/monsters/giant-centipede.webp",
    "system": {
      "level": 2,
      "hp": {
        "value": 12,
        "max": 12
      },
      "saves": 9,
      "defence": 1,
      "morale": 8,
      "movement": "A",
      "creatureType": "Insect",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Creeps silently, bites with toxic precision.</em></p><p>Category: <strong>Insects</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "insects",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "a25139c6f5fb088c",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 5,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Paralyses target for d4 rounds.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Insects",
        "tier": "Weak",
        "monsterKey": "giant-centipede"
      }
    },
    "prototypeToken": {
      "name": "Giant Centipede",
      "texture": {
        "src": "systems/flail/icons/monsters/giant-centipede.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "b22d153e56c93a87",
    "name": "Big Red Scorpion",
    "type": "npc",
    "img": "systems/flail/icons/monsters/big-red-scorpion.webp",
    "system": {
      "level": 3,
      "hp": {
        "value": 13,
        "max": 13
      },
      "saves": 9,
      "defence": 1,
      "morale": 8,
      "movement": "A",
      "creatureType": "Insect",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Moves like a butterfly, stings like a bee.</em></p><p>Category: <strong>Insects</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "insects",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "4419b88870695bfc",
        "name": "Venomous Sting",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 5,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Gives Poisoned condition.",
          "anyHit": ""
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
        "_id": "422fae48e388c86d",
        "name": "Pincers",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 5,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Insects",
        "tier": "Weak",
        "monsterKey": "big-red-scorpion"
      }
    },
    "prototypeToken": {
      "name": "Big Red Scorpion",
      "texture": {
        "src": "systems/flail/icons/monsters/big-red-scorpion.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "28b85005521aae6b",
    "name": "Killer Bee",
    "type": "npc",
    "img": "systems/flail/icons/monsters/killer-bee.webp",
    "system": {
      "level": 1,
      "hp": {
        "value": 6,
        "max": 6
      },
      "saves": 6,
      "defence": 0,
      "morale": 7,
      "movement": "A",
      "creatureType": "Insect",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Swarm in packs, sting as one.</em></p><p>Category: <strong>Insects</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "insects",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "21dac4546a0ed9d6",
        "name": "Sting",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 4,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Insects",
        "tier": "Weak",
        "monsterKey": "killer-bee"
      }
    },
    "prototypeToken": {
      "name": "Killer Bee",
      "texture": {
        "src": "systems/flail/icons/monsters/killer-bee.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "245a72a37302e96d",
    "name": "Locust Swarm",
    "type": "npc",
    "img": "systems/flail/icons/monsters/locust-swarm.webp",
    "system": {
      "level": 1,
      "hp": {
        "value": 7,
        "max": 7
      },
      "saves": 8,
      "defence": 0,
      "morale": 10,
      "movement": "F",
      "creatureType": "Insect",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Descends in clouds, devours all in its path.</em></p><p>Category: <strong>Insects</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "<p>Swarm: TH equals current HP — reduce TH by 1 for each HP lost.</p>",
      "attacksPerRound": 1,
      "tags": [
        "insects",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "95f625a7e6695f94",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Insects",
        "tier": "Weak",
        "monsterKey": "locust-swarm"
      }
    },
    "prototypeToken": {
      "name": "Locust Swarm",
      "texture": {
        "src": "systems/flail/icons/monsters/locust-swarm.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "b73ddeb7f5030da2",
    "name": "Swarming Fire Ants",
    "type": "npc",
    "img": "systems/flail/icons/monsters/swarming-fire-ants.webp",
    "system": {
      "level": 2,
      "hp": {
        "value": 7,
        "max": 7
      },
      "saves": 8,
      "defence": 0,
      "morale": 11,
      "movement": "F",
      "creatureType": "Insect",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Dissolves a body in d4 minutes.</em></p><p>Category: <strong>Insects</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "<p>Swarm: TH equals current HP — reduce TH by 1 for each HP lost.</p>",
      "attacksPerRound": 1,
      "tags": [
        "insects",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "8094c8daa97b7b27",
        "name": "Claws",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Slays target in eating frenzy (ignore Death Table).",
          "majorHit": "",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Insects",
        "tier": "Weak",
        "monsterKey": "swarming-fire-ants"
      }
    },
    "prototypeToken": {
      "name": "Swarming Fire Ants",
      "texture": {
        "src": "systems/flail/icons/monsters/swarming-fire-ants.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "30d258bac439ee05",
    "name": "Giant Spider",
    "type": "npc",
    "img": "systems/flail/icons/monsters/giant-spider.webp",
    "system": {
      "level": 6,
      "hp": {
        "value": 16,
        "max": 16
      },
      "saves": 12,
      "defence": 2,
      "morale": 8,
      "movement": "A",
      "creatureType": "Insect",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Eight legs, eight eyes, eight ways to die.</em></p><p>Category: <strong>Insects</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "insects",
        "average"
      ]
    },
    "items": [
      {
        "_id": "76aebe5cac4dff1f",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Instead of killing, ensnares target in silk-webbing cocoon.",
          "majorHit": "",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Insects",
        "tier": "Average",
        "monsterKey": "giant-spider"
      }
    },
    "prototypeToken": {
      "name": "Giant Spider",
      "texture": {
        "src": "systems/flail/icons/monsters/giant-spider.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "b5530659b28998cd",
    "name": "Rust Monster",
    "type": "npc",
    "img": "systems/flail/icons/monsters/rust-monster.webp",
    "system": {
      "level": 5,
      "hp": {
        "value": 20,
        "max": 20
      },
      "saves": 13,
      "defence": 1,
      "morale": 12,
      "movement": "A",
      "creatureType": "Insect",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Very much into heavy metal.</em></p><p>Category: <strong>Insects</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "<p>Mark usage on any metal item that touches the Rust Monster.</p>",
      "attacksPerRound": 1,
      "tags": [
        "insects",
        "average"
      ]
    },
    "items": [
      {
        "_id": "0963bae92bff87d4",
        "name": "Antennae",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Eats metal item carried or worn by target.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Insects",
        "tier": "Average",
        "monsterKey": "rust-monster"
      }
    },
    "prototypeToken": {
      "name": "Rust Monster",
      "texture": {
        "src": "systems/flail/icons/monsters/rust-monster.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "6c594bb183ab7b58",
    "name": "Colossal Praying Mantis",
    "type": "npc",
    "img": "systems/flail/icons/monsters/colossal-praying-mantis.webp",
    "system": {
      "level": 8,
      "hp": {
        "value": 30,
        "max": 30
      },
      "saves": 14,
      "defence": 3,
      "morale": 15,
      "movement": "A",
      "creatureType": "Insect",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Hides in the foliage to deliver death.</em></p><p>Category: <strong>Insects</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "insects",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "5e2af4067d826f36",
        "name": "Razor Claws",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 5,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Clutches target for 2 damage per round until freed.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Insects",
        "tier": "Strong",
        "monsterKey": "colossal-praying-mantis"
      }
    },
    "prototypeToken": {
      "name": "Colossal Praying Mantis",
      "texture": {
        "src": "systems/flail/icons/monsters/colossal-praying-mantis.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "6d69adcf4cff5a1b",
    "name": "Great Worm of the Sands",
    "type": "npc",
    "img": "systems/flail/icons/monsters/great-worm-sands.webp",
    "system": {
      "level": 10,
      "hp": {
        "value": 75,
        "max": 75
      },
      "saves": 18,
      "defence": 4,
      "morale": 17,
      "movement": "F",
      "creatureType": "Insect",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>The desert's mouth, swallows armies whole.</em></p><p>Category: <strong>Insects</strong> · Tier: <strong>God-like</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "insects",
        "god-like"
      ]
    },
    "items": [
      {
        "_id": "0a7c61767579ebe6",
        "name": "Gaping Mouth",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 10,
          "damage": 5,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Consumes target whole and all those Nearby (ignore Death Table), unless they make a successful DEX save.",
          "majorHit": "",
          "anyHit": "On three pairs, burrows and creates a quicksand pit, forcing all Nearby to save or fall within."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Insects",
        "tier": "God-like",
        "monsterKey": "great-worm-sands"
      }
    },
    "prototypeToken": {
      "name": "Great Worm of the Sands",
      "texture": {
        "src": "systems/flail/icons/monsters/great-worm-sands.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "62e3788112f1a550",
    "name": "Electric Eel",
    "type": "npc",
    "img": "systems/flail/icons/monsters/electric-eel.webp",
    "system": {
      "level": 2,
      "hp": {
        "value": 8,
        "max": 8
      },
      "saves": 8,
      "defence": 0,
      "morale": 8,
      "movement": "A",
      "creatureType": "Fish",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Shocks more than just curiosity.</em></p><p>Category: <strong>Aquatic</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "aquatic",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "5b24928fbfd34a6d",
        "name": "Electrical Discharge",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 5,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "Each 2 rolled causes one extra damage."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aquatic",
        "tier": "Weak",
        "monsterKey": "electric-eel"
      }
    },
    "prototypeToken": {
      "name": "Electric Eel",
      "texture": {
        "src": "systems/flail/icons/monsters/electric-eel.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "6611a3f7fd524427",
    "name": "Sea Snake",
    "type": "npc",
    "img": "systems/flail/icons/monsters/sea-snake.webp",
    "system": {
      "level": 1,
      "hp": {
        "value": 6,
        "max": 6
      },
      "saves": 9,
      "defence": 0,
      "morale": 7,
      "movement": "A",
      "creatureType": "Reptile",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>One bite, the venom spreads.</em></p><p>Category: <strong>Aquatic</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "aquatic",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "97512343c8bc4500",
        "name": "Venomous Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 4,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Gives Poisoned condition.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aquatic",
        "tier": "Weak",
        "monsterKey": "sea-snake"
      }
    },
    "prototypeToken": {
      "name": "Sea Snake",
      "texture": {
        "src": "systems/flail/icons/monsters/sea-snake.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "86dbdfba01f61294",
    "name": "Piraña Shoal",
    "type": "npc",
    "img": "systems/flail/icons/monsters/pirana-shoal.webp",
    "system": {
      "level": 2,
      "hp": {
        "value": 7,
        "max": 7
      },
      "saves": 8,
      "defence": 0,
      "morale": 10,
      "movement": "F",
      "creatureType": "Fish",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Don't spill blood in these rivers.</em></p><p>Category: <strong>Aquatic</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "<p>Swarm: TH equals current HP — reduce TH by 1 for each HP lost.</p>",
      "attacksPerRound": 1,
      "tags": [
        "aquatic",
        "average"
      ]
    },
    "items": [
      {
        "_id": "d16b196ee87b21af",
        "name": "Bites",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Eats target alive (ignore Death Table).",
          "majorHit": "",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aquatic",
        "tier": "Average",
        "monsterKey": "pirana-shoal"
      }
    },
    "prototypeToken": {
      "name": "Piraña Shoal",
      "texture": {
        "src": "systems/flail/icons/monsters/pirana-shoal.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "bcdcfdbcc299f212",
    "name": "Siren",
    "type": "npc",
    "img": "systems/flail/icons/monsters/siren.webp",
    "system": {
      "level": 4,
      "hp": {
        "value": 10,
        "max": 10
      },
      "saves": 8,
      "defence": 0,
      "morale": 10,
      "movement": "A",
      "creatureType": "Humanoid",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Killer tunes.</em></p><p>Category: <strong>Aquatic</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "aquatic",
        "average"
      ]
    },
    "items": [
      {
        "_id": "db4362683f940e1d",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "c03879c172392fcc",
        "name": "Luring Song",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Instead of killing, pulls target under the sea.",
          "majorHit": "",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aquatic",
        "tier": "Average",
        "monsterKey": "siren"
      }
    },
    "prototypeToken": {
      "name": "Siren",
      "texture": {
        "src": "systems/flail/icons/monsters/siren.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "a5e0364ff396182d",
    "name": "Giant Crab",
    "type": "npc",
    "img": "systems/flail/icons/monsters/giant-crab.webp",
    "system": {
      "level": 6,
      "hp": {
        "value": 22,
        "max": 22
      },
      "saves": 13,
      "defence": 2,
      "morale": 14,
      "movement": "A",
      "creatureType": "Crustacean",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Pincers as hard as iron.</em></p><p>Category: <strong>Aquatic</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "aquatic",
        "average"
      ]
    },
    "items": [
      {
        "_id": "31c3b02c5fe29c2d",
        "name": "Pincers",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On a full-house, grabs another target dealing d4 damage."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aquatic",
        "tier": "Average",
        "monsterKey": "giant-crab"
      }
    },
    "prototypeToken": {
      "name": "Giant Crab",
      "texture": {
        "src": "systems/flail/icons/monsters/giant-crab.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "9793fc6e2b423ca2",
    "name": "Great White Shark",
    "type": "npc",
    "img": "systems/flail/icons/monsters/great-white-shark.webp",
    "system": {
      "level": 7,
      "hp": {
        "value": 28,
        "max": 28
      },
      "saves": 12,
      "defence": 1,
      "morale": 14,
      "movement": "F",
      "creatureType": "Fish",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>The apex predator of the seas.</em></p><p>Category: <strong>Aquatic</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "aquatic",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "32aee689cc5c62e1",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aquatic",
        "tier": "Strong",
        "monsterKey": "great-white-shark"
      }
    },
    "prototypeToken": {
      "name": "Great White Shark",
      "texture": {
        "src": "systems/flail/icons/monsters/great-white-shark.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "3c039b828e7d01b2",
    "name": "Leviathan",
    "type": "npc",
    "img": "systems/flail/icons/monsters/leviathan.webp",
    "system": {
      "level": 9,
      "hp": {
        "value": 45,
        "max": 45
      },
      "saves": 14,
      "defence": 2,
      "morale": 16,
      "movement": "A",
      "creatureType": "Fish",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>The seas bow before its wrath.</em></p><p>Category: <strong>Aquatic</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "aquatic",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "89370dc819c18616",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 5,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "cb81556f4c9cd2c1",
        "name": "Crushing Coils",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On three pairs, summons a massive wave turning any boats in its wake."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aquatic",
        "tier": "Strong",
        "monsterKey": "leviathan"
      }
    },
    "prototypeToken": {
      "name": "Leviathan",
      "texture": {
        "src": "systems/flail/icons/monsters/leviathan.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "3fbe0846f1bc49d9",
    "name": "Kraken",
    "type": "npc",
    "img": "systems/flail/icons/monsters/kraken.webp",
    "system": {
      "level": 10,
      "hp": {
        "value": 60,
        "max": 60
      },
      "saves": 16,
      "defence": 2,
      "morale": 18,
      "movement": "F",
      "creatureType": "Cephalopod",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Sucks the soul out of sailors.</em></p><p>Category: <strong>Aquatic</strong> · Tier: <strong>God-like</strong></p>",
      "specialRules": "<p>Can make d4 attacks per round.</p>",
      "attacksPerRound": 4,
      "tags": [
        "aquatic",
        "god-like"
      ]
    },
    "items": [
      {
        "_id": "2952265e6525b342",
        "name": "Tentacles",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Target is eaten alive (ignore Death Table).",
          "majorHit": "",
          "anyHit": ""
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
        "_id": "fa03cd33144da068",
        "name": "Ink Spray",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 10,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On three pairs, sprays black ink on two other targets for d6 damage."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Aquatic",
        "tier": "God-like",
        "monsterKey": "kraken"
      }
    },
    "prototypeToken": {
      "name": "Kraken",
      "texture": {
        "src": "systems/flail/icons/monsters/kraken.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "08775b881070a90e",
    "name": "Hyperborean Frost Dragon",
    "type": "npc",
    "img": "systems/flail/icons/monsters/hyperborean-frost-dragon.webp",
    "system": {
      "level": 10,
      "hp": {
        "value": 85,
        "max": 85
      },
      "saves": 17,
      "defence": 4,
      "morale": 17,
      "movement": "F",
      "creatureType": "Dragon",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Colder than death, fiercer than the longest winter.</em></p><p>Category: <strong>Dragons</strong> · Tier: <strong>God-like</strong></p>",
      "specialRules": "<p>Can make two attacks per round.</p><p>Only takes a Death Blow on four 1s; two or three 1s inflict a Major Hit.</p>",
      "attacksPerRound": 2,
      "tags": [
        "dragons",
        "god-like"
      ]
    },
    "items": [
      {
        "_id": "89e9a8eb67bf076e",
        "name": "Ice Breath",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 10,
          "damage": 7,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Gives a Frozen condition (clear: spend one watch by fire).",
          "anyHit": ""
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
        "_id": "c0fd3d28deb65a1e",
        "name": "Talons",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 6,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Dragons",
        "tier": "God-like",
        "monsterKey": "hyperborean-frost-dragon"
      }
    },
    "prototypeToken": {
      "name": "Hyperborean Frost Dragon",
      "texture": {
        "src": "systems/flail/icons/monsters/hyperborean-frost-dragon.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "62a343652e8d1ffc",
    "name": "Elder Flame Drake",
    "type": "npc",
    "img": "systems/flail/icons/monsters/elder-flame-drake.webp",
    "system": {
      "level": 10,
      "hp": {
        "value": 50,
        "max": 50
      },
      "saves": 18,
      "defence": 3,
      "morale": 15,
      "movement": "F",
      "creatureType": "Dragon",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Its breath rivals the fury of the mightiest volcano.</em></p><p>Category: <strong>Dragons</strong> · Tier: <strong>God-like</strong></p>",
      "specialRules": "<p>Immune to fire.</p>",
      "attacksPerRound": 1,
      "tags": [
        "dragons",
        "god-like"
      ]
    },
    "items": [
      {
        "_id": "b6dcff6f79f6e9cf",
        "name": "Scorching Breath",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 9,
          "damage": 7,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Target burns to ash immediately (ignore Death Table).",
          "majorHit": "Causes d8 damage to two other targets Nearby.",
          "anyHit": ""
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
        "_id": "3e6499927e9e7a2d",
        "name": "Tail Swipe",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 5,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Cause d6 damage to two other Nearby targets.",
          "majorHit": "Cause d6 damage to two other Nearby targets.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Dragons",
        "tier": "God-like",
        "monsterKey": "elder-flame-drake"
      }
    },
    "prototypeToken": {
      "name": "Elder Flame Drake",
      "texture": {
        "src": "systems/flail/icons/monsters/elder-flame-drake.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "8147a2f94ae6f358",
    "name": "The Great Wyrm",
    "type": "npc",
    "img": "systems/flail/icons/monsters/great-wyrm.webp",
    "system": {
      "level": 10,
      "hp": {
        "value": 70,
        "max": 70
      },
      "saves": 18,
      "defence": 4,
      "morale": 12,
      "movement": "F",
      "creatureType": "Dragon",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Draws drakes and wyrmlings to its lair as servants.</em></p><p>Category: <strong>Dragons</strong> · Tier: <strong>God-like</strong></p>",
      "specialRules": "<p>Only takes a Death Blow on a five-number sequence.</p>",
      "attacksPerRound": 1,
      "tags": [
        "dragons",
        "god-like"
      ]
    },
    "items": [
      {
        "_id": "4f6bc7fabd436662",
        "name": "Fire Breath",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 9,
          "damage": 7,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On three pairs, does d10 damage to all Nearby targets."
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
        "_id": "5fc49541ee6bfb0a",
        "name": "Talons",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 7,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "May make a new attack immediately.",
          "majorHit": "",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Dragons",
        "tier": "God-like",
        "monsterKey": "great-wyrm"
      }
    },
    "prototypeToken": {
      "name": "The Great Wyrm",
      "texture": {
        "src": "systems/flail/icons/monsters/great-wyrm.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "bc8458de7ca34593",
    "name": "Storm Thunder Serpent",
    "type": "npc",
    "img": "systems/flail/icons/monsters/storm-thunder-serpent.webp",
    "system": {
      "level": 10,
      "hp": {
        "value": 60,
        "max": 60
      },
      "saves": 16,
      "defence": 3,
      "morale": 10,
      "movement": "F",
      "creatureType": "Dragon",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Electrifies the battlefield, literally.</em></p><p>Category: <strong>Dragons</strong> · Tier: <strong>God-like</strong></p>",
      "specialRules": "<p>Only takes a Death Blow on three 1s plus one pair.</p>",
      "attacksPerRound": 1,
      "tags": [
        "dragons",
        "god-like"
      ]
    },
    "items": [
      {
        "_id": "24c52357482f34ee",
        "name": "Electrified Wings",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 10,
          "damage": 6,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Generates an electrical storm causing all within Distant range d6 electrical damage.",
          "anyHit": ""
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
        "_id": "ac7b4baf3413e2ff",
        "name": "Talons",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 9,
          "damage": 5,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On a full-house, may make another attack immediately."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Dragons",
        "tier": "God-like",
        "monsterKey": "storm-thunder-serpent"
      }
    },
    "prototypeToken": {
      "name": "Storm Thunder Serpent",
      "texture": {
        "src": "systems/flail/icons/monsters/storm-thunder-serpent.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "e59e572a9757c024",
    "name": "Earth Elemental",
    "type": "npc",
    "img": "systems/flail/icons/monsters/earth-elemental.webp",
    "system": {
      "level": 6,
      "hp": {
        "value": 22,
        "max": 22
      },
      "saves": 10,
      "defence": 2,
      "morale": 12,
      "movement": "A",
      "creatureType": "Elemental",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Firm believer in a sedimentary lifestyle.</em></p><p>Category: <strong>Elementals</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "elementals",
        "average"
      ]
    },
    "items": [
      {
        "_id": "c8e4209c912a3ac6",
        "name": "Slam",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Causes minor quake, knocking down all within Distant range.",
          "majorHit": "",
          "anyHit": ""
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
        "_id": "0a288fd53f0958f8",
        "name": "Rock Boulders",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On a triplet, target must save or take an extra d4 damage."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Elementals",
        "tier": "Average",
        "monsterKey": "earth-elemental"
      }
    },
    "prototypeToken": {
      "name": "Earth Elemental",
      "texture": {
        "src": "systems/flail/icons/monsters/earth-elemental.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "6ae7e6526e4df7b9",
    "name": "Fire Elemental",
    "type": "npc",
    "img": "systems/flail/icons/monsters/fire-elemental.webp",
    "system": {
      "level": 6,
      "hp": {
        "value": 20,
        "max": 20
      },
      "saves": 13,
      "defence": 0,
      "morale": 13,
      "movement": "A",
      "creatureType": "Elemental",
      "mana": {
        "value": 8,
        "max": 8
      },
      "xp": 0,
      "description": "<p><em>Always the hottest one in the room.</em></p><p>Category: <strong>Elementals</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "<p>May cast Firebolt once per round as a free action.</p><p>When spellcasting: on one 6, loses d6 hit points; on a pair of 6s, loses d8 hit points; on a triplet of 6s, self-extinguishes.</p>",
      "attacksPerRound": 1,
      "tags": [
        "elementals",
        "average"
      ]
    },
    "items": [
      {
        "_id": "5c51e88e5836cec6",
        "name": "Fiery Touch",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On a pair of 4s, sets target ablaze causing d4 damage per round."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Elementals",
        "tier": "Average",
        "monsterKey": "fire-elemental"
      }
    },
    "prototypeToken": {
      "name": "Fire Elemental",
      "texture": {
        "src": "systems/flail/icons/monsters/fire-elemental.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "4a0317f862ba8437",
    "name": "Water Elemental",
    "type": "npc",
    "img": "systems/flail/icons/monsters/water-elemental.webp",
    "system": {
      "level": 7,
      "hp": {
        "value": 20,
        "max": 20
      },
      "saves": 12,
      "defence": 0,
      "morale": 10,
      "movement": "A",
      "creatureType": "Elemental",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Hydration has never been so deadly.</em></p><p>Category: <strong>Elementals</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "<p>Regenerates 2d6 hit points at the start of its round if there is water in the area.</p>",
      "attacksPerRound": 1,
      "tags": [
        "elementals",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "bd3a8b014636c7ce",
        "name": "Slam",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "d39c97224ef3fd23",
        "name": "Drowning Embrace",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Engulfs target for d4 damage per round.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Elementals",
        "tier": "Strong",
        "monsterKey": "water-elemental"
      }
    },
    "prototypeToken": {
      "name": "Water Elemental",
      "texture": {
        "src": "systems/flail/icons/monsters/water-elemental.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "55e61594e198303f",
    "name": "Djinn",
    "type": "npc",
    "img": "systems/flail/icons/monsters/djinn.webp",
    "system": {
      "level": 8,
      "hp": {
        "value": 30,
        "max": 30
      },
      "saves": 15,
      "defence": 2,
      "morale": 14,
      "movement": "A",
      "creatureType": "Elemental",
      "mana": {
        "value": 14,
        "max": 14
      },
      "xp": 0,
      "description": "<p><em>Do not rub the wrong lamp.</em></p><p>Category: <strong>Elementals</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "<p>May cast one spell per round as a free action: Charm, Mirror Image, Teleport, Time Stop.</p><p>When spellcasting: on one 6, loses d6 hit points; on a pair of 6s, loses d10 hit points; on a triplet of 6s, self-disintegrates.</p>",
      "attacksPerRound": 1,
      "tags": [
        "elementals",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "4803d8d06fff135c",
        "name": "Scimitar",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Make another attack immediately.",
          "anyHit": ""
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
        "_id": "25959d0b73785007",
        "name": "Whirlwind",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On a five-number sequence, engulfs target in wind for d4 damage per round until Djinn is harmed."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Elementals",
        "tier": "Strong",
        "monsterKey": "djinn"
      }
    },
    "prototypeToken": {
      "name": "Djinn",
      "texture": {
        "src": "systems/flail/icons/monsters/djinn.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "e968d0604c4ca499",
    "name": "Ape Man",
    "type": "npc",
    "img": "systems/flail/icons/monsters/ape-man.webp",
    "system": {
      "level": 5,
      "hp": {
        "value": 20,
        "max": 20
      },
      "saves": 10,
      "defence": 1,
      "morale": 10,
      "movement": "F",
      "creatureType": "Giant",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>'Does that thing have four arms?'</em></p><p>Category: <strong>Giants</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "<p>Makes two attacks per round.</p>",
      "attacksPerRound": 2,
      "tags": [
        "giants",
        "average"
      ]
    },
    "items": [
      {
        "_id": "a513ff63dc3c45ad",
        "name": "Punch",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On a full-house, crushes ground, forcing all Nearby to save or fall prone."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Giants",
        "tier": "Average",
        "monsterKey": "ape-man"
      }
    },
    "prototypeToken": {
      "name": "Ape Man",
      "texture": {
        "src": "systems/flail/icons/monsters/ape-man.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "32c7433f8b2e0e1e",
    "name": "Ogre",
    "type": "npc",
    "img": "systems/flail/icons/monsters/ogre.webp",
    "system": {
      "level": 6,
      "hp": {
        "value": 22,
        "max": 22
      },
      "saves": 8,
      "defence": 1,
      "morale": 15,
      "movement": "A",
      "creatureType": "Giant",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Strong body, feeble brains.</em></p><p>Category: <strong>Giants</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "<p>Has d4 goblin servants.</p>",
      "attacksPerRound": 1,
      "tags": [
        "giants",
        "average"
      ]
    },
    "items": [
      {
        "_id": "7627fbec36cc3134",
        "name": "Spiked Club",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "92d9e317a7a6cb4e",
        "name": "Goblin Throwing",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On a triplet, the goblin hits the target with a knife for d6 damage."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Giants",
        "tier": "Average",
        "monsterKey": "ogre"
      }
    },
    "prototypeToken": {
      "name": "Ogre",
      "texture": {
        "src": "systems/flail/icons/monsters/ogre.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "3382d1089bce7af3",
    "name": "Cyclops",
    "type": "npc",
    "img": "systems/flail/icons/monsters/cyclops.webp",
    "system": {
      "level": 7,
      "hp": {
        "value": 28,
        "max": 28
      },
      "saves": 11,
      "defence": 1,
      "morale": 14,
      "movement": "A",
      "creatureType": "Giant",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>One eye, twice the spite.</em></p><p>Category: <strong>Giants</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "giants",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "9158f19cab4bb911",
        "name": "Massive Club",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "951a8ac94140207d",
        "name": "Tossing",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On two pairs, tosses target onto another giving both an Injured condition."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Giants",
        "tier": "Strong",
        "monsterKey": "cyclops"
      }
    },
    "prototypeToken": {
      "name": "Cyclops",
      "texture": {
        "src": "systems/flail/icons/monsters/cyclops.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "a97bcc1e45974586",
    "name": "Troll",
    "type": "npc",
    "img": "systems/flail/icons/monsters/troll.webp",
    "system": {
      "level": 8,
      "hp": {
        "value": 32,
        "max": 32
      },
      "saves": 12,
      "defence": 0,
      "morale": 16,
      "movement": "A",
      "creatureType": "Giant",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Keeps regenerating, much to its own surprise.</em></p><p>Category: <strong>Giants</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "<p>Regenerates d8 hit points at the start of its round, unless hit by fire or acid.</p>",
      "attacksPerRound": 1,
      "tags": [
        "giants",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "0b5bb086e52c6621",
        "name": "Bone Club",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "On two pairs, deals an extra d4 damage.",
          "anyHit": ""
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
        "_id": "8113f6661353d536",
        "name": "Claws",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Giants",
        "tier": "Strong",
        "monsterKey": "troll"
      }
    },
    "prototypeToken": {
      "name": "Troll",
      "texture": {
        "src": "systems/flail/icons/monsters/troll.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "38a8cf84e90df670",
    "name": "Cow of Doom",
    "type": "npc",
    "img": "systems/flail/icons/monsters/cow-of-doom.webp",
    "system": {
      "level": 1,
      "hp": {
        "value": 10,
        "max": 10
      },
      "saves": 7,
      "defence": 0,
      "morale": 7,
      "movement": "A",
      "creatureType": "Monster",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Muuuuuuuuuuuuuuuuuuuuuu</em></p><p>Category: <strong>Monstrosities</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "<p>If killed, explodes in a burst of larvae dealing d6 damage to all Nearby.</p>",
      "attacksPerRound": 1,
      "tags": [
        "monstrosities",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "b551110938b95e5e",
        "name": "Mooing",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 4,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Monstrosities",
        "tier": "Weak",
        "monsterKey": "cow-of-doom"
      }
    },
    "prototypeToken": {
      "name": "Cow of Doom",
      "texture": {
        "src": "systems/flail/icons/monsters/cow-of-doom.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "44e033601726b2d4",
    "name": "Goblin",
    "type": "npc",
    "img": "systems/flail/icons/monsters/goblin.webp",
    "system": {
      "level": 1,
      "hp": {
        "value": 8,
        "max": 8
      },
      "saves": 5,
      "defence": 0,
      "morale": 7,
      "movement": "A",
      "creatureType": "Humanoid",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Smells fear. Also smells awful.</em></p><p>Category: <strong>Monstrosities</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "<p>Has darkvision.</p>",
      "attacksPerRound": 1,
      "tags": [
        "monstrosities",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "cf82efcb132af348",
        "name": "Club",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 4,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "6f3184c545cabdac",
        "name": "Scimitar",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 5,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Monstrosities",
        "tier": "Weak",
        "monsterKey": "goblin"
      }
    },
    "prototypeToken": {
      "name": "Goblin",
      "texture": {
        "src": "systems/flail/icons/monsters/goblin.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "998f5911dc17922b",
    "name": "Flayed Unicorn",
    "type": "npc",
    "img": "systems/flail/icons/monsters/flayed-unicorn.webp",
    "system": {
      "level": 5,
      "hp": {
        "value": 18,
        "max": 18
      },
      "saves": 10,
      "defence": 0,
      "morale": 13,
      "movement": "A",
      "creatureType": "Monster",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Sparkles on the inside.</em></p><p>Category: <strong>Monstrosities</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "<p>Immune to magic; if hit by a Minor Hit, may save to teleport and dodge the attack.</p>",
      "attacksPerRound": 1,
      "tags": [
        "monstrosities",
        "average"
      ]
    },
    "items": [
      {
        "_id": "c60311255f5f3d55",
        "name": "Bleeding Horn",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Impales target for extra d4 damage.",
          "anyHit": ""
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
        "_id": "1ff995ff1f0e8029",
        "name": "Hooves",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Monstrosities",
        "tier": "Average",
        "monsterKey": "flayed-unicorn"
      }
    },
    "prototypeToken": {
      "name": "Flayed Unicorn",
      "texture": {
        "src": "systems/flail/icons/monsters/flayed-unicorn.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "b6531bb96e348e9f",
    "name": "Yeti",
    "type": "npc",
    "img": "systems/flail/icons/monsters/yeti.webp",
    "system": {
      "level": 6,
      "hp": {
        "value": 22,
        "max": 22
      },
      "saves": 9,
      "defence": 2,
      "morale": 10,
      "movement": "A",
      "creatureType": "Monster",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Big, white and easily offended.</em></p><p>Category: <strong>Monstrosities</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "<p>Suffers double damage from any fire or heated source.</p>",
      "attacksPerRound": 1,
      "tags": [
        "monstrosities",
        "average"
      ]
    },
    "items": [
      {
        "_id": "8a7796b4088063f9",
        "name": "Claws",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Monstrosities",
        "tier": "Average",
        "monsterKey": "yeti"
      }
    },
    "prototypeToken": {
      "name": "Yeti",
      "texture": {
        "src": "systems/flail/icons/monsters/yeti.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "24cdb8171df8b91c",
    "name": "Chimera",
    "type": "npc",
    "img": "systems/flail/icons/monsters/chimera.webp",
    "system": {
      "level": 8,
      "hp": {
        "value": 30,
        "max": 30
      },
      "saves": 14,
      "defence": 1,
      "morale": 16,
      "movement": "A",
      "creatureType": "Myth",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>WTF, is that a lion, a goat or a snake?</em></p><p>Category: <strong>Monstrosities</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "<p>Makes two attacks per round.</p>",
      "attacksPerRound": 2,
      "tags": [
        "monstrosities",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "9373892bf9155004",
        "name": "Snake Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "Forces target to make a save or take a Poisoned condition."
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
        "_id": "f8aed8cae3c8d05f",
        "name": "Lion Claws",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "d609ad5ed8b50d22",
        "name": "Death Bleats",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "All within Distant range must save or go deaf for d4 turns.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Monstrosities",
        "tier": "Strong",
        "monsterKey": "chimera"
      }
    },
    "prototypeToken": {
      "name": "Chimera",
      "texture": {
        "src": "systems/flail/icons/monsters/chimera.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "14d546814d77227b",
    "name": "Medusa",
    "type": "npc",
    "img": "systems/flail/icons/monsters/medusa.webp",
    "system": {
      "level": 7,
      "hp": {
        "value": 23,
        "max": 23
      },
      "saves": 13,
      "defence": 1,
      "morale": 15,
      "movement": "A",
      "creatureType": "Myth",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Never lost a staring contest.</em></p><p>Category: <strong>Monstrosities</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "<p>Turns to stone if gazing upon herself.</p>",
      "attacksPerRound": 1,
      "tags": [
        "monstrosities",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "848678438abfe123",
        "name": "Petrifying Gaze",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Target must save or takes a Petrified condition.",
          "anyHit": ""
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
        "_id": "ecd3efd1d4627151",
        "name": "Snake Hair",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Monstrosities",
        "tier": "Strong",
        "monsterKey": "medusa"
      }
    },
    "prototypeToken": {
      "name": "Medusa",
      "texture": {
        "src": "systems/flail/icons/monsters/medusa.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "870ca27116809c93",
    "name": "Minotaur",
    "type": "npc",
    "img": "systems/flail/icons/monsters/minotaur.webp",
    "system": {
      "level": 7,
      "hp": {
        "value": 28,
        "max": 28
      },
      "saves": 14,
      "defence": 2,
      "morale": 16,
      "movement": "A",
      "creatureType": "Myth",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>The maze is its weapon.</em></p><p>Category: <strong>Monstrosities</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "monstrosities",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "d9541805de3e066c",
        "name": "Great Axe",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 5,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "52a7fcddef807857",
        "name": "Horns",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Impales target dealing extra d6 damage unless target makes a STR save.",
          "anyHit": ""
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
        "_id": "548cf9ae7fc0e450",
        "name": "Trampling Charge",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On a five-number sequence, also tramples the nearest target for d6 damage. Repeat if roll is 5-6."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Monstrosities",
        "tier": "Strong",
        "monsterKey": "minotaur"
      }
    },
    "prototypeToken": {
      "name": "Minotaur",
      "texture": {
        "src": "systems/flail/icons/monsters/minotaur.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "225164b853932b3c",
    "name": "Black Pudding",
    "type": "npc",
    "img": "systems/flail/icons/monsters/black-pudding.webp",
    "system": {
      "level": 2,
      "hp": {
        "value": 8,
        "max": 8
      },
      "saves": 7,
      "defence": 0,
      "morale": 7,
      "movement": "A",
      "creatureType": "Ooze",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Amalgamation of gooey matter.</em></p><p>Category: <strong>Oozes</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "<p>Only harmed by fire or magic.</p>",
      "attacksPerRound": 1,
      "tags": [
        "oozes",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "654032f4b936a543",
        "name": "Pseudopod",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 4,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On a triplet, latches onto prey for 2 damage per round; target must save in their round to break free."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Oozes",
        "tier": "Weak",
        "monsterKey": "black-pudding"
      }
    },
    "prototypeToken": {
      "name": "Black Pudding",
      "texture": {
        "src": "systems/flail/icons/monsters/black-pudding.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "80f78fb7eda9f334",
    "name": "Green Slime",
    "type": "npc",
    "img": "systems/flail/icons/monsters/green-slime.webp",
    "system": {
      "level": 2,
      "hp": {
        "value": 6,
        "max": 6
      },
      "saves": 8,
      "defence": 0,
      "morale": 8,
      "movement": "A",
      "creatureType": "Ooze",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Leaps in a corrosive embrace.</em></p><p>Category: <strong>Oozes</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "<p>If slain, splits into two smaller slimes (2hp each).</p>",
      "attacksPerRound": 1,
      "tags": [
        "oozes",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "947c2024839401c0",
        "name": "Pseudopod",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 4,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Corrodes one metal item worn by target.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Oozes",
        "tier": "Weak",
        "monsterKey": "green-slime"
      }
    },
    "prototypeToken": {
      "name": "Green Slime",
      "texture": {
        "src": "systems/flail/icons/monsters/green-slime.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "0628abaab7230454",
    "name": "Gelatinous Cube",
    "type": "npc",
    "img": "systems/flail/icons/monsters/gelatinous-cube.webp",
    "system": {
      "level": 6,
      "hp": {
        "value": 18,
        "max": 18
      },
      "saves": 13,
      "defence": 1,
      "morale": 15,
      "movement": "S",
      "creatureType": "Ooze",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>'Are those coins floating?'</em></p><p>Category: <strong>Oozes</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "<p>Only digests organic matter.</p>",
      "attacksPerRound": 1,
      "tags": [
        "oozes",
        "average"
      ]
    },
    "items": [
      {
        "_id": "9f186e493f744ce6",
        "name": "Paralysing Touch",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Engulfs target for 3 acid damage per round.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Oozes",
        "tier": "Average",
        "monsterKey": "gelatinous-cube"
      }
    },
    "prototypeToken": {
      "name": "Gelatinous Cube",
      "texture": {
        "src": "systems/flail/icons/monsters/gelatinous-cube.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "4873ca7774d55c26",
    "name": "Prismatic Slug",
    "type": "npc",
    "img": "systems/flail/icons/monsters/prismatic-slug.webp",
    "system": {
      "level": 6,
      "hp": {
        "value": 22,
        "max": 22
      },
      "saves": 10,
      "defence": 0,
      "morale": 13,
      "movement": "S",
      "creatureType": "Ooze",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>'Aww… what's that beautiful trail of colour?'</em></p><p>Category: <strong>Oozes</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "<p>If killed, explodes in a rainbow burst; all Nearby must save or go blind for two turns.</p>",
      "attacksPerRound": 1,
      "tags": [
        "oozes",
        "average"
      ]
    },
    "items": [
      {
        "_id": "88734114f947612d",
        "name": "Touch",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "57d60e9acf6a7cd0",
        "name": "Acid Spit",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Blinds target.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Oozes",
        "tier": "Average",
        "monsterKey": "prismatic-slug"
      }
    },
    "prototypeToken": {
      "name": "Prismatic Slug",
      "texture": {
        "src": "systems/flail/icons/monsters/prismatic-slug.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "d07d6cd0094dd69b",
    "name": "Floating Oculus",
    "type": "npc",
    "img": "systems/flail/icons/monsters/floating-oculus.webp",
    "system": {
      "level": 9,
      "hp": {
        "value": 30,
        "max": 30
      },
      "saves": 14,
      "defence": 1,
      "morale": 15,
      "movement": "A",
      "creatureType": "Ooze",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>'Is it looking at me?'</em></p><p>Category: <strong>Oozes</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "oozes",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "4f2e3e5baf6ea34f",
        "name": "Psychic Gaze",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Instead of killing, assumes control of target.",
          "majorHit": "",
          "anyHit": ""
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
        "_id": "0619cbe6053f2f26",
        "name": "Laser Beam",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 5,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On three pairs, beam ricochets onto a new target for d6 damage. Repeat if damage rolled is 5-6."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Oozes",
        "tier": "Strong",
        "monsterKey": "floating-oculus"
      }
    },
    "prototypeToken": {
      "name": "Floating Oculus",
      "texture": {
        "src": "systems/flail/icons/monsters/floating-oculus.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "2b786da9b02cdc7a",
    "name": "Pit Viper",
    "type": "npc",
    "img": "systems/flail/icons/monsters/pit-viper.webp",
    "system": {
      "level": 2,
      "hp": {
        "value": 7,
        "max": 7
      },
      "saves": 8,
      "defence": 0,
      "morale": 8,
      "movement": "A",
      "creatureType": "Reptile",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Sssssslithersssss in ssssssilence.</em></p><p>Category: <strong>Reptiles</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "reptiles",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "95519389ada22e9c",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 4,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Reptiles",
        "tier": "Weak",
        "monsterKey": "pit-viper"
      }
    },
    "prototypeToken": {
      "name": "Pit Viper",
      "texture": {
        "src": "systems/flail/icons/monsters/pit-viper.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "c008f64b97cf099d",
    "name": "Giant Lizard",
    "type": "npc",
    "img": "systems/flail/icons/monsters/giant-lizard.webp",
    "system": {
      "level": 3,
      "hp": {
        "value": 14,
        "max": 14
      },
      "saves": 12,
      "defence": 0,
      "morale": 9,
      "movement": "A",
      "creatureType": "Reptile",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>A tongue quicker than its prey.</em></p><p>Category: <strong>Reptiles</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "reptiles",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "9feb48f1e34bc0f0",
        "name": "Venomous Tongue",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 5,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Gives a Poisoned condition.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Reptiles",
        "tier": "Weak",
        "monsterKey": "giant-lizard"
      }
    },
    "prototypeToken": {
      "name": "Giant Lizard",
      "texture": {
        "src": "systems/flail/icons/monsters/giant-lizard.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "ea747596911cb4f8",
    "name": "Tyrant Crocodile",
    "type": "npc",
    "img": "systems/flail/icons/monsters/tyrant-crocodile.webp",
    "system": {
      "level": 6,
      "hp": {
        "value": 18,
        "max": 18
      },
      "saves": 12,
      "defence": 2,
      "morale": 12,
      "movement": "A",
      "creatureType": "Reptile",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Ancient hunger with one too many teeth.</em></p><p>Category: <strong>Reptiles</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "reptiles",
        "average"
      ]
    },
    "items": [
      {
        "_id": "dc9cc94d52bc47d6",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On a triplet, performs a death roll for an extra d8 damage."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Reptiles",
        "tier": "Average",
        "monsterKey": "tyrant-crocodile"
      }
    },
    "prototypeToken": {
      "name": "Tyrant Crocodile",
      "texture": {
        "src": "systems/flail/icons/monsters/tyrant-crocodile.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "fd5602f3070b1791",
    "name": "Velociraptor",
    "type": "npc",
    "img": "systems/flail/icons/monsters/velociraptor.webp",
    "system": {
      "level": 4,
      "hp": {
        "value": 15,
        "max": 15
      },
      "saves": 14,
      "defence": 1,
      "morale": 14,
      "movement": "F",
      "creatureType": "Reptile",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Hunts in synchronised packs.</em></p><p>Category: <strong>Reptiles</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "reptiles",
        "average"
      ]
    },
    "items": [
      {
        "_id": "c64eb26f662754b8",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On a four-number sequence, hides in foliage to ambush later on."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Reptiles",
        "tier": "Average",
        "monsterKey": "velociraptor"
      }
    },
    "prototypeToken": {
      "name": "Velociraptor",
      "texture": {
        "src": "systems/flail/icons/monsters/velociraptor.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "5e6b801a9b4a0851",
    "name": "Abyssal Python",
    "type": "npc",
    "img": "systems/flail/icons/monsters/abyssal-python.webp",
    "system": {
      "level": 7,
      "hp": {
        "value": 30,
        "max": 30
      },
      "saves": 9,
      "defence": 0,
      "morale": 8,
      "movement": "A",
      "creatureType": "Reptile",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>None long for its embrace.</em></p><p>Category: <strong>Reptiles</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "reptiles",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "586a161626402e51",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "9b8224551337c2d6",
        "name": "Constriction",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 9,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "Constricts target causing 2 damage per round; target may save at the start of their round to break free; may attack new targets while constricting up to two others."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Reptiles",
        "tier": "Strong",
        "monsterKey": "abyssal-python"
      }
    },
    "prototypeToken": {
      "name": "Abyssal Python",
      "texture": {
        "src": "systems/flail/icons/monsters/abyssal-python.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "614776d1c2cccb6e",
    "name": "Basilisk",
    "type": "npc",
    "img": "systems/flail/icons/monsters/basilisk.webp",
    "system": {
      "level": 7,
      "hp": {
        "value": 25,
        "max": 25
      },
      "saves": 12,
      "defence": 0,
      "morale": 10,
      "movement": "A",
      "creatureType": "Reptile",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>More than meets the eye.</em></p><p>Category: <strong>Reptiles</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "reptiles",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "618c52f402b24cc8",
        "name": "Petrifying Gaze",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Target must save or takes a Petrified condition.",
          "anyHit": ""
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
        "_id": "6ed2176b8ea65794",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Reptiles",
        "tier": "Strong",
        "monsterKey": "basilisk"
      }
    },
    "prototypeToken": {
      "name": "Basilisk",
      "texture": {
        "src": "systems/flail/icons/monsters/basilisk.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "b340ccca3c8862d0",
    "name": "Hydra",
    "type": "npc",
    "img": "systems/flail/icons/monsters/hydra.webp",
    "system": {
      "level": 10,
      "hp": {
        "value": 50,
        "max": 50
      },
      "saves": 15,
      "defence": 2,
      "morale": 17,
      "movement": "A",
      "creatureType": "Reptile",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Cut one head, four more give you the stare.</em></p><p>Category: <strong>Reptiles</strong> · Tier: <strong>God-like</strong></p>",
      "specialRules": "<p>Has 5 heads with 10 HP each (50 HP total). Makes a number of Bite attacks per round equal to its remaining heads.</p><p>Poison Breath hits all targets Nearby.</p>",
      "attacksPerRound": 5,
      "tags": [
        "reptiles",
        "god-like"
      ]
    },
    "items": [
      {
        "_id": "074801c7ef2dc295",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 5,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "b3240f6c8ef6df56",
        "name": "Poison Breath",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "Gives Poisoned condition."
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Reptiles",
        "tier": "God-like",
        "monsterKey": "hydra"
      }
    },
    "prototypeToken": {
      "name": "Hydra",
      "texture": {
        "src": "systems/flail/icons/monsters/hydra.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "04591a7579bbae50",
    "name": "Bone Rat Swarm",
    "type": "npc",
    "img": "systems/flail/icons/monsters/bone-rat-swarm.webp",
    "system": {
      "level": 1,
      "hp": {
        "value": 8,
        "max": 8
      },
      "saves": 4,
      "defence": 0,
      "morale": 10,
      "movement": "A",
      "creatureType": "Undead",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Squeak, Squeak, Clank, Clank…</em></p><p>Category: <strong>Undead</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "<p>Swarm: TH equals current HP — reduce TH by 1 for each HP lost.</p>",
      "attacksPerRound": 1,
      "tags": [
        "undead",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "a8cf2eb5e10bfd82",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Undead",
        "tier": "Weak",
        "monsterKey": "bone-rat-swarm"
      }
    },
    "prototypeToken": {
      "name": "Bone Rat Swarm",
      "texture": {
        "src": "systems/flail/icons/monsters/bone-rat-swarm.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "3a1ad103d582e86c",
    "name": "Ghoul",
    "type": "npc",
    "img": "systems/flail/icons/monsters/ghoul.webp",
    "system": {
      "level": 1,
      "hp": {
        "value": 10,
        "max": 10
      },
      "saves": 5,
      "defence": 0,
      "morale": 16,
      "movement": "A",
      "creatureType": "Undead",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Often in hunger-driven packs.</em></p><p>Category: <strong>Undead</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "undead",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "30c531c521cc0d54",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 4,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Undead",
        "tier": "Weak",
        "monsterKey": "ghoul"
      }
    },
    "prototypeToken": {
      "name": "Ghoul",
      "texture": {
        "src": "systems/flail/icons/monsters/ghoul.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "b90ceffb91a15a4b",
    "name": "Skeleton",
    "type": "npc",
    "img": "systems/flail/icons/monsters/skeleton.webp",
    "system": {
      "level": 2,
      "hp": {
        "value": 8,
        "max": 8
      },
      "saves": 6,
      "defence": 0,
      "morale": 15,
      "movement": "A",
      "creatureType": "Undead",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Bones that refuse to rest.</em></p><p>Category: <strong>Undead</strong> · Tier: <strong>Weak</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "undead",
        "weak"
      ]
    },
    "items": [
      {
        "_id": "616aed41b727a356",
        "name": "Sword",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 5,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "410cd2c061bb62f5",
        "name": "Axe",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 4,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      },
      {
        "_id": "d648d4ffe1ed9228",
        "name": "Bow",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 5,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Undead",
        "tier": "Weak",
        "monsterKey": "skeleton"
      }
    },
    "prototypeToken": {
      "name": "Skeleton",
      "texture": {
        "src": "systems/flail/icons/monsters/skeleton.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "d61f3fce33b9a25a",
    "name": "Mummy",
    "type": "npc",
    "img": "systems/flail/icons/monsters/mummy.webp",
    "system": {
      "level": 6,
      "hp": {
        "value": 17,
        "max": 17
      },
      "saves": 8,
      "defence": 1,
      "morale": 16,
      "movement": "S",
      "creatureType": "Undead",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Wrapped in ancient grudges.</em></p><p>Category: <strong>Undead</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "<p>Curses those who slay it (To Hit rolls have disadvantage until next dawn).</p>",
      "attacksPerRound": 1,
      "tags": [
        "undead",
        "average"
      ]
    },
    "items": [
      {
        "_id": "c31d2492525528c1",
        "name": "Choke",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Undead",
        "tier": "Average",
        "monsterKey": "mummy"
      }
    },
    "prototypeToken": {
      "name": "Mummy",
      "texture": {
        "src": "systems/flail/icons/monsters/mummy.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "b26d92084af043f8",
    "name": "Wraith",
    "type": "npc",
    "img": "systems/flail/icons/monsters/wraith.webp",
    "system": {
      "level": 4,
      "hp": {
        "value": 10,
        "max": 10
      },
      "saves": 12,
      "defence": 0,
      "morale": 13,
      "movement": "A",
      "creatureType": "Ghost Undead",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Passes through walls, strikes from shadows.</em></p><p>Category: <strong>Undead</strong> · Tier: <strong>Average</strong></p>",
      "specialRules": "<p>Only harmed by magic, fire or electricity.</p>",
      "attacksPerRound": 1,
      "tags": [
        "undead",
        "average"
      ]
    },
    "items": [
      {
        "_id": "efe40739db7d5396",
        "name": "Drain Life",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 5,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Recovers hit points equal to damage done.",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Undead",
        "tier": "Average",
        "monsterKey": "wraith"
      }
    },
    "prototypeToken": {
      "name": "Wraith",
      "texture": {
        "src": "systems/flail/icons/monsters/wraith.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "501df9cf9bb474c8",
    "name": "Flameskull",
    "type": "npc",
    "img": "systems/flail/icons/monsters/flameskull.webp",
    "system": {
      "level": 7,
      "hp": {
        "value": 25,
        "max": 25
      },
      "saves": 13,
      "defence": 0,
      "morale": 15,
      "movement": "A",
      "creatureType": "Undead",
      "mana": {
        "value": 12,
        "max": 12
      },
      "xp": 0,
      "description": "<p><em>Literally a skull on fire.</em></p><p>Category: <strong>Undead</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "<p>Only harmed by magic or holy water.</p>",
      "attacksPerRound": 1,
      "tags": [
        "undead",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "93fd6b2ee326ae34",
        "name": "Fire Ray",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 7,
          "damage": 2,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Cast a spell as a free action (Magic Missile, Fireball, Rain of Fire).",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Undead",
        "tier": "Strong",
        "monsterKey": "flameskull"
      }
    },
    "prototypeToken": {
      "name": "Flameskull",
      "texture": {
        "src": "systems/flail/icons/monsters/flameskull.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "c218b3e4a397e3ba",
    "name": "Goliath Skeleton",
    "type": "npc",
    "img": "systems/flail/icons/monsters/goliath-skeleton.webp",
    "system": {
      "level": 8,
      "hp": {
        "value": 30,
        "max": 30
      },
      "saves": 12,
      "defence": 2,
      "morale": 15,
      "movement": "A",
      "creatureType": "Undead",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Grins at piercing weapons.</em></p><p>Category: <strong>Undead</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "undead",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "1e3bf17925d0d8cc",
        "name": "Heavy Maul",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "On three pairs, inflicts d6 damage on two Nearby targets."
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
        "_id": "f4b885b826207228",
        "name": "Punch",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 6,
          "damage": 4,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
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
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Undead",
        "tier": "Strong",
        "monsterKey": "goliath-skeleton"
      }
    },
    "prototypeToken": {
      "name": "Goliath Skeleton",
      "texture": {
        "src": "systems/flail/icons/monsters/goliath-skeleton.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "b44b4748bd42425d",
    "name": "Lich King",
    "type": "npc",
    "img": "systems/flail/icons/monsters/lich-king.webp",
    "system": {
      "level": 9,
      "hp": {
        "value": 35,
        "max": 35
      },
      "saves": 14,
      "defence": 1,
      "morale": 15,
      "movement": "A",
      "creatureType": "Undead",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Always served by 2d6 skeletons.</em></p><p>Category: <strong>Undead</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "",
      "attacksPerRound": 1,
      "tags": [
        "undead",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "86574efc5deb7d37",
        "name": "Scepter",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 5,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "",
          "anyHit": "Every pair rolled revives a fallen skeleton ally."
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
        "_id": "b1f08ac79f159628",
        "name": "Stare of Death",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 9,
          "damage": 3,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "Kills and raises fallen character as an undead ally.",
          "majorHit": "",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Undead",
        "tier": "Strong",
        "monsterKey": "lich-king"
      }
    },
    "prototypeToken": {
      "name": "Lich King",
      "texture": {
        "src": "systems/flail/icons/monsters/lich-king.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  },
  {
    "_id": "ac34cc32d3bf7309",
    "name": "Vampire",
    "type": "npc",
    "img": "systems/flail/icons/monsters/vampire.webp",
    "system": {
      "level": 7,
      "hp": {
        "value": 25,
        "max": 25
      },
      "saves": 13,
      "defence": 0,
      "morale": 8,
      "movement": "A",
      "creatureType": "Undead",
      "mana": {
        "value": 0,
        "max": 0
      },
      "xp": 0,
      "description": "<p><em>Never met a neck it didn't like.</em></p><p>Category: <strong>Undead</strong> · Tier: <strong>Strong</strong></p>",
      "specialRules": "<p>May turn into a bat once per day; dissolves under intense light.</p>",
      "attacksPerRound": 1,
      "tags": [
        "undead",
        "strong"
      ]
    },
    "items": [
      {
        "_id": "97cf771b4eb87b4e",
        "name": "Bite",
        "type": "weapon",
        "img": "icons/svg/sword.svg",
        "system": {
          "description": "",
          "th": 8,
          "damage": 5,
          "range": [
            "near"
          ],
          "weaponType": "melee",
          "category": "",
          "tags": [],
          "deathBlow": "",
          "majorHit": "Gives Turned condition (gain one extra Turned condition each dawn; on the fourth condition, turn into a vampire. Clear: only by sacred exorcism).",
          "anyHit": ""
        },
        "effects": [],
        "folder": null,
        "sort": 0,
        "ownership": {
          "default": 0
        },
        "flags": {}
      }
    ],
    "effects": [],
    "flags": {
      "flail": {
        "category": "Undead",
        "tier": "Strong",
        "monsterKey": "vampire"
      }
    },
    "prototypeToken": {
      "name": "Vampire",
      "texture": {
        "src": "systems/flail/icons/monsters/vampire.webp"
      },
      "actorLink": false,
      "disposition": -1
    },
    "sort": 0,
    "folder": null,
    "ownership": {
      "default": 0
    }
  }
];
