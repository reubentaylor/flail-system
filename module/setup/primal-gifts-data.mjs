/*
 * Druid Primal Gifts — 25 items across 5 folders (mammal, reptile,
 * bird, amphibian, fish). Bundled at world creation into a
 * `flail-primal-gifts` compendium. Druids drag gifts from here onto
 * their character sheet — the sheet then syncs `system.primalGifts`
 * from the owned items so the mechanical hooks (defence, DEX save
 * advantage, cheetah-goes-first, toxic secretion damage) fire.
 */

export const PRIMAL_GIFT_FOLDERS = [
  {
    "_id": "52be59e72cd823b8",
    "name": "Mammal",
    "type": "Item",
    "color": "#8b5a1a",
    "sorting": "m",
    "sort": 0
  },
  {
    "_id": "a7e881fd27b52019",
    "name": "Reptile",
    "type": "Item",
    "color": "#4a6b2a",
    "sorting": "m",
    "sort": 100
  },
  {
    "_id": "6f104557190124fe",
    "name": "Bird",
    "type": "Item",
    "color": "#4a6b8b",
    "sorting": "m",
    "sort": 200
  },
  {
    "_id": "bc9a44f7f659dee7",
    "name": "Amphibian",
    "type": "Item",
    "color": "#4a2a6b",
    "sorting": "m",
    "sort": 300
  },
  {
    "_id": "1c3106b415607bb7",
    "name": "Fish",
    "type": "Item",
    "color": "#2a5a8b",
    "sorting": "m",
    "sort": 400
  }
];

export const PRIMAL_GIFTS = [
  {
    "_id": "48470fa3963bf0fb",
    "name": "Herbivore",
    "type": "gift",
    "img": "icons/magic/light/beams-rays-orange-purple-large.webp",
    "folder": "52be59e72cd823b8",
    "system": {
      "description": "Leaves and plants satiate hunger like food or grub.",
      "kingdom": "mammal",
      "giftKey": "herbivore",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "fed652837c0bc64f",
    "name": "Hamster Form",
    "type": "gift",
    "img": "icons/creatures/mammals/cat-hunched-glowing-red.webp",
    "folder": "52be59e72cd823b8",
    "system": {
      "description": "You may transform into a small hamster at will. Reverting takes one round.",
      "kingdom": "mammal",
      "giftKey": "hamsterForm",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "8f9e05759f769a02",
    "name": "Bloodhound Smell",
    "type": "gift",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "folder": "52be59e72cd823b8",
    "system": {
      "description": "You gain a keen sense of smell \u2014 track scents over long distances.",
      "kingdom": "mammal",
      "giftKey": "bloodhoundSmell",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "29e2164db57b1775",
    "name": "Cheetah Velocity",
    "type": "gift",
    "img": "icons/creatures/mammals/cat-hunched-glowing-red.webp",
    "folder": "52be59e72cd823b8",
    "system": {
      "description": "You always attack first in combat rounds. Ties resolve normally.",
      "kingdom": "mammal",
      "giftKey": "cheetahVelocity",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "9d288ad6d4291bc5",
    "name": "Pack Mentality",
    "type": "gift",
    "img": "icons/creatures/mammals/cat-hunched-glowing-red.webp",
    "folder": "52be59e72cd823b8",
    "system": {
      "description": "+1 To Hit whenever an ally is Nearby.",
      "kingdom": "mammal",
      "giftKey": "packMentality",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "12c3b461d481b2c1",
    "name": "Infrared Vision",
    "type": "gift",
    "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
    "folder": "a7e881fd27b52019",
    "system": {
      "description": "You can see in the dark as if it were dim light.",
      "kingdom": "reptile",
      "giftKey": "infraredVision",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "d238e9d379e392b4",
    "name": "Camouflage",
    "type": "gift",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "folder": "a7e881fd27b52019",
    "system": {
      "description": "Advantage on hiding checks; while perfectly still, you are effectively invisible.",
      "kingdom": "reptile",
      "giftKey": "camouflage",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "3ef12c5a88b59120",
    "name": "Viper's Agility",
    "type": "gift",
    "img": "icons/creatures/reptiles/snake-poised-white.webp",
    "folder": "a7e881fd27b52019",
    "system": {
      "description": "You may make two attacks per round. The second attack rolls with disadvantage.",
      "kingdom": "reptile",
      "giftKey": "vipersAgility",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "e379c1fbe1816592",
    "name": "Regeneration",
    "type": "gift",
    "img": "icons/magic/defensive/shield-barrier-flaming-diamond-blue.webp",
    "folder": "a7e881fd27b52019",
    "system": {
      "description": "Spend one round concentrating to restore 4+d4 HP. Once per day.",
      "kingdom": "reptile",
      "giftKey": "regeneration",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "5b52a7b292d78658",
    "name": "Crocodile Skin",
    "type": "gift",
    "img": "icons/magic/defensive/shield-barrier-blue.webp",
    "folder": "a7e881fd27b52019",
    "system": {
      "description": "You gain Defence 2 \u2014 damage is reduced by 2 before applying to HP.",
      "kingdom": "reptile",
      "giftKey": "crocodileSkin",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "a107f42528cdda61",
    "name": "Falcon's Grace",
    "type": "gift",
    "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
    "folder": "6f104557190124fe",
    "system": {
      "description": "Advantage on all DEX saves.",
      "kingdom": "bird",
      "giftKey": "falconsGrace",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "2df20e9d398eaf20",
    "name": "Eagle Sight",
    "type": "gift",
    "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
    "folder": "6f104557190124fe",
    "system": {
      "description": "You can see Far-Away objects and creatures as if they were Near.",
      "kingdom": "bird",
      "giftKey": "eagleSight",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "7f9e9ce1f856f9a0",
    "name": "Pigeon Mail",
    "type": "gift",
    "img": "icons/magic/air/air-smoke-casting.webp",
    "folder": "6f104557190124fe",
    "system": {
      "description": "Once per day, send a bird carrying a short written message to a location you know.",
      "kingdom": "bird",
      "giftKey": "pigeonMail",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "24058810a1d205e3",
    "name": "Parakeet Form",
    "type": "gift",
    "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
    "folder": "6f104557190124fe",
    "system": {
      "description": "You may transform into a parakeet at will. Reverting takes one round.",
      "kingdom": "bird",
      "giftKey": "parakeetForm",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "062fa34a4337b684",
    "name": "Incubator",
    "type": "gift",
    "img": "icons/consumables/eggs/egg-cracked-white.webp",
    "folder": "6f104557190124fe",
    "system": {
      "description": "Sit on a bird egg for a full night to hatch it into a loyal follower.",
      "kingdom": "bird",
      "giftKey": "incubator",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "1baa99839c465a80",
    "name": "Toxic Secretion",
    "type": "gift",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "folder": "bc9a44f7f659dee7",
    "system": {
      "description": "Any melee attacker that hits you takes 2 damage from your toxic skin.",
      "kingdom": "amphibian",
      "giftKey": "toxicSecretion",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "52860346601f1d36",
    "name": "Slimy Skin",
    "type": "gift",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "folder": "bc9a44f7f659dee7",
    "system": {
      "description": "All melee adversaries suffer -1 To Hit against you.",
      "kingdom": "amphibian",
      "giftKey": "slimySkin",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "e558a79ddf00e935",
    "name": "Axolotl Form",
    "type": "gift",
    "img": "icons/creatures/slimes/slime-movement-swirling-green.webp",
    "folder": "bc9a44f7f659dee7",
    "system": {
      "description": "You may transform into a small axolotl at will. Reverting takes one round.",
      "kingdom": "amphibian",
      "giftKey": "axolotlForm",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "84470e378c2b6d39",
    "name": "Frog Leap",
    "type": "gift",
    "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
    "folder": "bc9a44f7f659dee7",
    "system": {
      "description": "You can perform giant leaps \u2014 up to Near distance vertically or horizontally.",
      "kingdom": "amphibian",
      "giftKey": "frogLeap",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "2b09a6d709f3e63b",
    "name": "Sticky Grip",
    "type": "gift",
    "img": "icons/creatures/slimes/slime-movement-swirling-green.webp",
    "folder": "bc9a44f7f659dee7",
    "system": {
      "description": "Advantage on climbing checks; you can scale walls and hang from ceilings.",
      "kingdom": "amphibian",
      "giftKey": "stickyGrip",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "accc426d543a349b",
    "name": "Water Breathing",
    "type": "gift",
    "img": "icons/creatures/slimes/slime-movement-swirling-green.webp",
    "folder": "1c3106b415607bb7",
    "system": {
      "description": "You can breathe underwater indefinitely.",
      "kingdom": "fish",
      "giftKey": "waterBreathing",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "0ee2aa1203bafeb0",
    "name": "Pufferfish Form",
    "type": "gift",
    "img": "icons/creatures/fish/fish-shark-swimming.webp",
    "folder": "1c3106b415607bb7",
    "system": {
      "description": "You may transform into a pufferfish at will. Reverting takes one round.",
      "kingdom": "fish",
      "giftKey": "pufferfishForm",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "2da08047b04a5d74",
    "name": "Natural Swimmer",
    "type": "gift",
    "img": "icons/creatures/fish/fish-shark-swimming.webp",
    "folder": "1c3106b415607bb7",
    "system": {
      "description": "You swim twice as fast as normal; no CON save required for swimming exertion.",
      "kingdom": "fish",
      "giftKey": "naturalSwimmer",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "f55504924bc118db",
    "name": "Bubble Breath",
    "type": "gift",
    "img": "icons/magic/air/air-smoke-casting.webp",
    "folder": "1c3106b415607bb7",
    "system": {
      "description": "You can spit a floating bubble that carries a small item upward through water.",
      "kingdom": "fish",
      "giftKey": "bubbleBreath",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  },
  {
    "_id": "0b78972704b2f338",
    "name": "Eel Weave",
    "type": "gift",
    "img": "icons/creatures/fish/fish-shark-swimming.webp",
    "folder": "1c3106b415607bb7",
    "system": {
      "description": "You can squeeze through small spaces underwater.",
      "kingdom": "fish",
      "giftKey": "eelWeave",
      "used": false,
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 0,
        "value": 0
      }
    },
    "flags": {}
  }
];
