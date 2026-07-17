/*
 * FLAIL Magic Scrolls — bundled at world creation into the
 * `flail-scrolls` compendium. Each scroll is a first-class
 * gear Item; the casting mechanic (INT save + advantage bands +
 * single-use) is documented in each item's description rather
 * than automated. Priced at 100+d100 coins per the rulebook.
 *
 * Total: 18 scrolls
 *
 * Sourced from FLAIL v0.2 p.111.
 */

export const FLAIL_SCROLLS = [
  {
    "_id": "0303258fb75d57cd",
    "name": "Scroll of Abyssal Pit",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Conjures a dark hole beneath a target's feet.</p><p><strong>Failure:</strong> The pit appears under a random ally.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Abyssal Pit"
      }
    }
  },
  {
    "_id": "4f42e5f305027a05",
    "name": "Scroll of Animate Dead",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Raises a dead target as an undead ally for d6 turns.</p><p><strong>Failure:</strong> Target is raised but acts on its own will and interest.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Animate Dead"
      }
    }
  },
  {
    "_id": "d544e07c2f291583",
    "name": "Scroll of Astral Leech",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Caster drains 2d6 hit points from a chosen target.</p><p><strong>Failure:</strong> A spectral leech sucks the caster's soul, devouring 2d6 hit points from them.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Astral Leech"
      }
    }
  },
  {
    "_id": "120252aca177270b",
    "name": "Scroll of Command",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Order a target to perform one action, verbalised by two words.</p><p><strong>Failure:</strong> Caster performs the declared action themselves instead.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Command"
      }
    }
  },
  {
    "_id": "f2b5d54c14970fb5",
    "name": "Scroll of Conjure Elemental",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Invokes a controllable Elemental for d6 turns, which then disperses.</p><p><strong>Failure:</strong> Invokes a rogue Elemental that cannot be controlled.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Conjure Elemental"
      }
    }
  },
  {
    "_id": "ffa457dd36efb676",
    "name": "Scroll of Cure Wounds",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Restores target d10 hit points.</p><p><strong>Failure:</strong> Inflicts d6 damage on the target.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Cure Wounds"
      }
    }
  },
  {
    "_id": "ef4027dcdc6e3839",
    "name": "Scroll of Death Scroll",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Eliminates a chosen target.</p><p><strong>Failure:</strong> Kills an ally of the caster.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Death Scroll"
      }
    }
  },
  {
    "_id": "f3f7e2811df5a930",
    "name": "Scroll of Fear",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> One target flees hysterically.</p><p><strong>Failure:</strong> Caster develops a permanent phobia vs the target's type (-2 TH forever).</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Fear"
      }
    }
  },
  {
    "_id": "d0fc2213c843a343",
    "name": "Scroll of Fireball",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Does 3d6 damage to all Near impact; can be launched from Far Away.</p><p><strong>Failure:</strong> Explodes in the caster's hands instead, dealing 3d6 damage to all Nearby.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Fireball"
      }
    }
  },
  {
    "_id": "f7d87a4e67ac75b2",
    "name": "Scroll of Gaseous Form",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Caster becomes insubstantial and shapeless for up to six turns.</p><p><strong>Failure:</strong> 25% chance of caster remaining forever in this state.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Gaseous Form"
      }
    }
  },
  {
    "_id": "8f95c2dedfcbd845",
    "name": "Scroll of Hold Monster",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Forces one creature to save or become helplessly immobile.</p><p><strong>Failure:</strong> Affects the caster instead, lasting one turn.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Hold Monster"
      }
    }
  },
  {
    "_id": "5de66f246d5af680",
    "name": "Scroll of Mage Hand",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Conjures a spectral hand capable of performing one task.</p><p><strong>Failure:</strong> Caster must take three Drained conditions.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Mage Hand"
      }
    }
  },
  {
    "_id": "f6dc3b13da74863c",
    "name": "Scroll of Magic Missile",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Launches an energy dart that causes 2d6 damage to a chosen target.</p><p><strong>Failure:</strong> The missile lands on another random target (allies included).</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Magic Missile"
      }
    }
  },
  {
    "_id": "8ab2371c3085696b",
    "name": "Scroll of Mind Control",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Control chosen target for d4 rounds.</p><p><strong>Failure:</strong> Target controls caster instead.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Mind Control"
      }
    }
  },
  {
    "_id": "4480dd4bc70b7000",
    "name": "Scroll of Shield",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Invokes an energy shield on self or ally with 2d6 hit points.</p><p><strong>Failure:</strong> The energy shield is cast on a random adversary instead.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Shield"
      }
    }
  },
  {
    "_id": "dcd998b08e989bf5",
    "name": "Scroll of Teleport",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Caster teleports between two places of choice within 100'.</p><p><strong>Failure:</strong> Caster is teleported to a place 100 miles away.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Teleport"
      }
    }
  },
  {
    "_id": "e644d0444ab4e32d",
    "name": "Scroll of Time Stop",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Caster may perform two extra rounds immediately.</p><p><strong>Failure:</strong> Caster ages d100 years instantly.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Time Stop"
      }
    }
  },
  {
    "_id": "8a6ac2cf64b90a39",
    "name": "Scroll of Truth",
    "type": "gear",
    "img": "icons/svg/mystery-man.svg",
    "system": {
      "description": "<p><em>A single-use magic scroll.</em></p><p><strong>Casting:</strong> Make an INT save to interpret the arcana. INT 10-: roll with disadvantage. INT 11-14: roll normally. INT 15+: roll with advantage.</p><p><strong>Success:</strong> Forces a target to speak the truth for one minute (GM may use a timer).</p><p><strong>Failure:</strong> Caster spills out their darkest secrets and those of their allies.</p><p><em>The scroll vanishes after use, whether the casting succeeded or not. Optional: on a first successful cast, gain advantage on future casts of the same scroll regardless of INT score.</em></p>",
      "location": "unequipped",
      "slotIndex": 0,
      "slotsRequired": 1,
      "twoHanded": false,
      "usage": {
        "max": 1,
        "value": 0
      },
      "cost": 100,
      "quantity": 1,
      "consumable": true,
      "tag": "scroll"
    },
    "effects": [],
    "folder": null,
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "flags": {
      "flail": {
        "scroll": true,
        "spellName": "Truth"
      }
    }
  }
];
