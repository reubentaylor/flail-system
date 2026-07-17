/*
 * FLAIL Potions — bundled at world creation into the
 * `flail-potions` compendium. Contains 25 ingredients across five
 * reagent categories (Chemical, Essence, Extract, Herb, Remain) and
 * 34 potions across three strength tiers (Weak d12, Strong d12,
 * Mighty d10). Ingredients carry `flags.flail.reagentCategory` so
 * a future brewing macro can filter by category. Potions carry
 * `flags.flail.potionStrength` so a future filter can group by tier.
 *
 * Casting mechanic: mix N ingredients from N DIFFERENT reagent
 * categories (3 = Weak, 4 = Strong, 5 = Mighty), then roll on the
 * corresponding rolltable. Documented in rulebook, unenforced here.
 *
 * Sourced from FLAIL v0.2 pp.112-113.
 */

export const FLAIL_POTIONS = [
  {
    "_id": "855f7dc5243a280a",
    "name": "Acid",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-stopper-yellow.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Chemical</p><p><em>Purchasable in big cities for 4d10 coins per dose.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 20,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Chemical"
      }
    }
  },
  {
    "_id": "ab803b53bf3be61e",
    "name": "Arsenic",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Chemical</p><p><em>Purchasable in big cities for 4d10 coins per dose.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 20,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Chemical"
      }
    }
  },
  {
    "_id": "9a474056dad17ef3",
    "name": "Quicksilver",
    "type": "gear",
    "img": "icons/consumables/potions/vial-ornet-silver-black.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Chemical</p><p><em>Purchasable in big cities for 4d10 coins per dose.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 20,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Chemical"
      }
    }
  },
  {
    "_id": "8fce2f3fbd4ebaa8",
    "name": "Saltpetre",
    "type": "gear",
    "img": "icons/consumables/potions/potion-jug-corked-skull-poison-brown-green.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Chemical</p><p><em>Purchasable in big cities for 4d10 coins per dose.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 20,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Chemical"
      }
    }
  },
  {
    "_id": "138ca637483a7f93",
    "name": "Vitriol",
    "type": "gear",
    "img": "icons/consumables/potions/potion-flask-corked-orange.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Chemical</p><p><em>Purchasable in big cities for 4d10 coins per dose.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 20,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Chemical"
      }
    }
  },
  {
    "_id": "3bcc08118c5dee15",
    "name": "Basilisk Venom",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-green.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Essence</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Essence"
      }
    }
  },
  {
    "_id": "7fb5a5383a3c2540",
    "name": "Dragon Bile",
    "type": "gear",
    "img": "icons/consumables/potions/potion-flask-corked-orange.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Essence</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Essence"
      }
    }
  },
  {
    "_id": "986762ef3179e11b",
    "name": "Kraken Ink",
    "type": "gear",
    "img": "icons/consumables/potions/vial-ornet-silver-black.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Essence</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Essence"
      }
    }
  },
  {
    "_id": "e1305f27aa788c0f",
    "name": "Mermaid Tear",
    "type": "gear",
    "img": "icons/consumables/potions/potion-flask-corked-teal.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Essence</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Essence"
      }
    }
  },
  {
    "_id": "35c76328f1daff9e",
    "name": "Slime Mucus",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-green.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Essence</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Essence"
      }
    }
  },
  {
    "_id": "810e63b902eeede5",
    "name": "Goblin Earwax",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-stopper-yellow.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Extract</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Extract"
      }
    }
  },
  {
    "_id": "08d4a80c081b3db7",
    "name": "Lich Dust",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Extract</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Extract"
      }
    }
  },
  {
    "_id": "9dcd48257c2c8370",
    "name": "Ogre Fat",
    "type": "gear",
    "img": "icons/consumables/potions/potion-jug-corked-skull-poison-brown-green.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Extract</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Extract"
      }
    }
  },
  {
    "_id": "7102f9b05f8aae32",
    "name": "Phoenix Feather",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-labeled-red.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Extract</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Extract"
      }
    }
  },
  {
    "_id": "bbc3149099b937b0",
    "name": "Troll Fart",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-green.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Extract</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Extract"
      }
    }
  },
  {
    "_id": "7de10fb9edd1d132",
    "name": "Belladonna",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Herb</p><p><em>Forageable in the wilderness.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Herb"
      }
    }
  },
  {
    "_id": "756c216e1c2ebb39",
    "name": "Mandrake",
    "type": "gear",
    "img": "icons/consumables/potions/potion-jug-corked-skull-poison-brown-green.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Herb</p><p><em>Forageable in the wilderness.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Herb"
      }
    }
  },
  {
    "_id": "1b36bd59dda9bc6b",
    "name": "Mugwort",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-green.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Herb</p><p><em>Forageable in the wilderness.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Herb"
      }
    }
  },
  {
    "_id": "42f3ee8e409f8707",
    "name": "Valerian",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-conical-corked-blue.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Herb</p><p><em>Forageable in the wilderness.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Herb"
      }
    }
  },
  {
    "_id": "a290168cb35ea7a0",
    "name": "Wolfsbane",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Herb</p><p><em>Forageable in the wilderness.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Herb"
      }
    }
  },
  {
    "_id": "f1165ff8319795c5",
    "name": "Cyclops Eye",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-conical-corked-blue.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Remain</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Remain"
      }
    }
  },
  {
    "_id": "24b02079bb49696c",
    "name": "Giant's Toe",
    "type": "gear",
    "img": "icons/consumables/potions/potion-jug-corked-skull-poison-brown-green.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Remain</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Remain"
      }
    }
  },
  {
    "_id": "5fd0e1a70716179c",
    "name": "Griffon Claw",
    "type": "gear",
    "img": "icons/consumables/potions/potion-jug-corked-skull-poison-brown-green.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Remain</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Remain"
      }
    }
  },
  {
    "_id": "afbacf099a16a719",
    "name": "Hydra Scale",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-green.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Remain</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Remain"
      }
    }
  },
  {
    "_id": "7999eff3a4e9faf1",
    "name": "Wraith Dust",
    "type": "gear",
    "img": "icons/consumables/potions/vial-ornet-silver-black.webp",
    "system": {
      "description": "<p><em>Alchemy ingredient.</em></p><p><strong>Category:</strong> Remain</p><p><em>Adventuring: procured by defeating the relevant creature.</em></p><p>Combine with ingredients from different reagent categories to brew potions (3 ingredients = Weak, 4 = Strong, 5 = Mighty).</p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 0,
      "quantity": 1,
      "consumable": true,
      "tag": "ingredient"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "ingredient": true,
        "reagentCategory": "Remain"
      }
    }
  },
  {
    "_id": "b36943027bbd2946",
    "name": "Boost Shot",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-labeled-red.webp",
    "system": {
      "description": "<p><em>Weak potion.</em></p><p><strong>Effect:</strong> +2 STR for one day.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "weak"
      }
    }
  },
  {
    "_id": "5a444400e78de502",
    "name": "Potion of Healing",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-labeled-red.webp",
    "system": {
      "description": "<p><em>Weak potion.</em></p><p><strong>Effect:</strong> Cures d6 hit points.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "weak"
      }
    }
  },
  {
    "_id": "6ad9f35974382f02",
    "name": "Slippery Perspiration",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-conical-corked-blue.webp",
    "system": {
      "description": "<p><em>Weak potion.</em></p><p><strong>Effect:</strong> Grants Defence 1 for one day.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "weak"
      }
    }
  },
  {
    "_id": "d38f9c091e2040e8",
    "name": "Brain Lift",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
    "system": {
      "description": "<p><em>Weak potion.</em></p><p><strong>Effect:</strong> +1 INT for one day.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "weak"
      }
    }
  },
  {
    "_id": "01711becdd3079ce",
    "name": "Potion of Agility",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-green.webp",
    "system": {
      "description": "<p><em>Weak potion.</em></p><p><strong>Effect:</strong> +1 DEX for one day.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "weak"
      }
    }
  },
  {
    "_id": "04cdc0d609fef8cb",
    "name": "Power Tonic",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-labeled-red.webp",
    "system": {
      "description": "<p><em>Weak potion.</em></p><p><strong>Effect:</strong> +1 TH for the duration of one entire combat.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "weak"
      }
    }
  },
  {
    "_id": "482cce6c801cc8aa",
    "name": "Underwater Breathing",
    "type": "gear",
    "img": "icons/consumables/potions/potion-flask-corked-teal.webp",
    "system": {
      "description": "<p><em>Weak potion.</em></p><p><strong>Effect:</strong> Grants underwater breathing for one turn.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "weak"
      }
    }
  },
  {
    "_id": "078bf2481e8db210",
    "name": "Sweet Fragrance",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
    "system": {
      "description": "<p><em>Weak potion.</em></p><p><strong>Effect:</strong> +1 CHA for one day.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "weak"
      }
    }
  },
  {
    "_id": "44cb63511162ae26",
    "name": "Prismatic Serum",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
    "system": {
      "description": "<p><em>Weak potion.</em></p><p><strong>Effect:</strong> Drinker's hair turns into a random colour. Forever.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "weak"
      }
    }
  },
  {
    "_id": "47487e8a03d064d7",
    "name": "Phobos Mix",
    "type": "gear",
    "img": "icons/consumables/potions/potion-flask-corked-orange.webp",
    "system": {
      "description": "<p><em>Weak potion.</em></p><p><strong>Effect:</strong> Drinker gains fear of a random creature type.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "weak"
      }
    }
  },
  {
    "_id": "47d5ebec3f47966f",
    "name": "Blend of the Buffoon",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-stopper-yellow.webp",
    "system": {
      "description": "<p><em>Weak potion.</em></p><p><strong>Effect:</strong> -d4 LUCK for one day.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "weak"
      }
    }
  },
  {
    "_id": "36b1a22fa57a5f0f",
    "name": "Fool's Mix",
    "type": "gear",
    "img": "icons/consumables/potions/potion-jug-corked-skull-poison-brown-green.webp",
    "system": {
      "description": "<p><em>Weak potion.</em></p><p><strong>Effect:</strong> -2 DEX for one day.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "weak"
      }
    }
  },
  {
    "_id": "1b8cd82c910d72c0",
    "name": "Potion of Reflexes",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-labeled-red.webp",
    "system": {
      "description": "<p><em>Strong potion.</em></p><p><strong>Effect:</strong> Drinker can make three attacks in one round of combat. Lasts one round.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "strong"
      }
    }
  },
  {
    "_id": "c827ae20bd18f80e",
    "name": "Tonic of Faith",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-stopper-yellow.webp",
    "system": {
      "description": "<p><em>Strong potion.</em></p><p><strong>Effect:</strong> Drinker can choose any one future roll to succeed in.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "strong"
      }
    }
  },
  {
    "_id": "cd971e57ad6c204d",
    "name": "Elixir of Might",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-labeled-red.webp",
    "system": {
      "description": "<p><em>Strong potion.</em></p><p><strong>Effect:</strong> +4 DMG for the duration of one entire combat.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "strong"
      }
    }
  },
  {
    "_id": "2e263ca0b85d70f4",
    "name": "Supreme Superglue",
    "type": "gear",
    "img": "icons/consumables/potions/potion-jug-corked-skull-poison-brown-green.webp",
    "system": {
      "description": "<p><em>Strong potion.</em></p><p><strong>Effect:</strong> Glues anything together forever.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "strong"
      }
    }
  },
  {
    "_id": "e2c2d70ea41b9c8a",
    "name": "Potion of Mana",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-conical-corked-blue.webp",
    "system": {
      "description": "<p><em>Strong potion.</em></p><p><strong>Effect:</strong> Restores 2d4 mana instantly (Wizards only).</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "strong"
      }
    }
  },
  {
    "_id": "aafbbefe2de79fa3",
    "name": "Mind Mixture",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
    "system": {
      "description": "<p><em>Strong potion.</em></p><p><strong>Effect:</strong> Grants advantage to INT for d6 turns.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "strong"
      }
    }
  },
  {
    "_id": "f85f95cb1b11696a",
    "name": "Fake Death",
    "type": "gear",
    "img": "icons/consumables/potions/vial-ornet-silver-black.webp",
    "system": {
      "description": "<p><em>Strong potion.</em></p><p><strong>Effect:</strong> Drinker dies for 30 minutes; returns to life unharmed after that.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "strong"
      }
    }
  },
  {
    "_id": "866e5ae1aad56185",
    "name": "Restorative Brine",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-labeled-red.webp",
    "system": {
      "description": "<p><em>Strong potion.</em></p><p><strong>Effect:</strong> Heals all hit points.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "strong"
      }
    }
  },
  {
    "_id": "c3d0fa7575bc6249",
    "name": "Passion Tonic",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-labeled-red.webp",
    "system": {
      "description": "<p><em>Strong potion.</em></p><p><strong>Effect:</strong> Two characters become infatuated with each other.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "strong"
      }
    }
  },
  {
    "_id": "fcebb868c3f4737e",
    "name": "Cerebral Link",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-conical-corked-blue.webp",
    "system": {
      "description": "<p><em>Strong potion.</em></p><p><strong>Effect:</strong> Drinker may spellcast like a Wizard for two turns. Max mana equals INT score.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "strong"
      }
    }
  },
  {
    "_id": "b87c4aa26523f033",
    "name": "Potion of Partial Invisibility",
    "type": "gear",
    "img": "icons/consumables/potions/potion-flask-corked-teal.webp",
    "system": {
      "description": "<p><em>Strong potion.</em></p><p><strong>Effect:</strong> Drinker becomes invisible except their gear/clothes for two turns.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "strong"
      }
    }
  },
  {
    "_id": "c64817e59b97230d",
    "name": "Radiant Aura",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-stopper-yellow.webp",
    "system": {
      "description": "<p><em>Strong potion.</em></p><p><strong>Effect:</strong> Grants Defence 3 for one day.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "strong"
      }
    }
  },
  {
    "_id": "3b42e16bfdd56096",
    "name": "Brute Force",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-labeled-red.webp",
    "system": {
      "description": "<p><em>Mighty potion.</em></p><p><strong>Effect:</strong> +2 TH for the duration of one entire combat.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "mighty"
      }
    }
  },
  {
    "_id": "b71a0cdf1b8275d8",
    "name": "Clairvoyant Mix",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
    "system": {
      "description": "<p><em>Mighty potion.</em></p><p><strong>Effect:</strong> Drinker can see into d4 remote locations of choice. Lasts one turn.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "mighty"
      }
    }
  },
  {
    "_id": "468b5c6c4038df9c",
    "name": "Gaseous Form",
    "type": "gear",
    "img": "icons/consumables/potions/potion-flask-corked-teal.webp",
    "system": {
      "description": "<p><em>Mighty potion.</em></p><p><strong>Effect:</strong> Drinker assumes a vaporous form for up to six turns.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "mighty"
      }
    }
  },
  {
    "_id": "521f978f893a5bd3",
    "name": "Mindwipe Brew",
    "type": "gear",
    "img": "icons/consumables/potions/vial-ornet-silver-black.webp",
    "system": {
      "description": "<p><em>Mighty potion.</em></p><p><strong>Effect:</strong> Drinker forgets all that happened in the last two days.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "mighty"
      }
    }
  },
  {
    "_id": "5d5f8ecbfd5d5535",
    "name": "Rejuvenescent Tincture",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-green.webp",
    "system": {
      "description": "<p><em>Mighty potion.</em></p><p><strong>Effect:</strong> Removes a persistent Injury condition.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "mighty"
      }
    }
  },
  {
    "_id": "b2024146b6af2346",
    "name": "Elixir of Life",
    "type": "gear",
    "img": "icons/consumables/potions/potion-bottle-corked-stopper-yellow.webp",
    "system": {
      "description": "<p><em>Mighty potion.</em></p><p><strong>Effect:</strong> Revives a person who died in the last 24 hours.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "mighty"
      }
    }
  },
  {
    "_id": "6cbaa348d4b22e72",
    "name": "Potion of the Mosquito",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-green.webp",
    "system": {
      "description": "<p><em>Mighty potion.</em></p><p><strong>Effect:</strong> Drinker turns into a fly for six turns.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "mighty"
      }
    }
  },
  {
    "_id": "c2b45a77c417d2a9",
    "name": "Telepathic Drops",
    "type": "gear",
    "img": "icons/consumables/potions/bottle-bulb-corked-purple.webp",
    "system": {
      "description": "<p><em>Mighty potion.</em></p><p><strong>Effect:</strong> Drinker may speak with another character remotely no matter the distance.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "mighty"
      }
    }
  },
  {
    "_id": "92512a83a76aa01f",
    "name": "Tongue of Babel",
    "type": "gear",
    "img": "icons/consumables/potions/potion-flask-corked-orange.webp",
    "system": {
      "description": "<p><em>Mighty potion.</em></p><p><strong>Effect:</strong> Grants the ability to understand every language, including animals and monsters.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "mighty"
      }
    }
  },
  {
    "_id": "ef40c0e6d61f8b28",
    "name": "Potion of Invisibility",
    "type": "gear",
    "img": "icons/consumables/potions/potion-flask-corked-teal.webp",
    "system": {
      "description": "<p><em>Mighty potion.</em></p><p><strong>Effect:</strong> Drinker becomes invisible, gear included, for up to six turns.</p><p><em>Mark one usage each time it's drunk. Three doses per brew.</em></p>",
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
      "consumable": true,
      "tag": "potion"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "potion": true,
        "potionStrength": "mighty"
      }
    }
  }
];
