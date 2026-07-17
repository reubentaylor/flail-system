/**
 * Bundled Dark Spells (Bone Whisperer). Imported on `ready` to populate
 * a world-level compendium named 'flail-dark-spells'. Drag entries
 * onto a Bone Whisperer character to attach as Known Spells.
 * Sourced from FLAIL v0.2 page 16. Do not edit by hand.
 */

export const DARK_SPELLS = [
  {
    "_id": "OsVPxxnXb4CBG1ae",
    "name": "Banshee Wail",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>[DICE] targets make a Morale save; on a fail, they flee; on a fumble, they disintegrate.</p>",
      "tradition": "dark",
      "effectFormula": "[DICE] morale targets",
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
    "_id": "ihmkNbyxRJFBifaJ",
    "name": "Blight",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Cause [DICE] x 100 square feet of vegetation or crops to wither instantly.</p>",
      "tradition": "dark",
      "effectFormula": "[DICE]*100 sq ft",
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
    "_id": "atPYv0rYXKykDlXP",
    "name": "Bone Cage",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Erupts from the ground with [SUM] hit points, encasing a medium-sized target.</p>",
      "tradition": "dark",
      "effectFormula": "[SUM] hp cage",
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
    "_id": "PGITEv0GIBTbu9G6",
    "name": "Bone Staff",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Transforms a femur-sized bone into a Skull Staff with [DICE] TH and DMG, usable once.</p>",
      "tradition": "dark",
      "effectFormula": "[DICE] TH / [DICE] DMG",
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
    "_id": "KSo7Aj9WwTb1tVWY",
    "name": "Carrion Swarm",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Conjures a necro-swarm with hp equal to half [SUM], TH = current hp and DMG 2.</p>",
      "tradition": "dark",
      "effectFormula": "hp = [SUM]/2",
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
    "_id": "DIpee9SPhAXzBKEu",
    "name": "Corpse Explosion",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Causes a corpse within sight to explode dealing [SUM] damage to all Near it.</p>",
      "tradition": "dark",
      "effectFormula": "[SUM] damage",
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
    "_id": "Yfrh0dIS5YeC0jZh",
    "name": "Curse",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>All saves rolled by one target of level [SUM] or less auto-fail for [DICE] rounds.</p>",
      "tradition": "dark",
      "effectFormula": "level <= [SUM], [DICE] rounds",
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
    "_id": "V0YPkRp34fgaFJSe",
    "name": "Darkvision",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Caster can see in darkness for [DICE] turns.</p>",
      "tradition": "dark",
      "effectFormula": "[DICE] turns",
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
    "_id": "KMvEVcdEmGMRQdXR",
    "name": "Dark Pact",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Caster may make an immediate attack after casting with extra 1 + [DICE] To Hit, but loses [SUM] hit points immediately after.</p>",
      "tradition": "dark",
      "effectFormula": "+1+[DICE] TH, -[SUM] hp",
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
    "_id": "h4PUd759kJCgm3uO",
    "name": "Death Touch",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Forces target of level [DICE] to save or be killed by a single touch.</p>",
      "tradition": "dark",
      "effectFormula": "level <= [DICE] save or die",
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
    "_id": "YAVSO46TknKmL1mh",
    "name": "Grave Grasp",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Ghastly hand emerges from the ground pinning/immobilising [DICE] targets.</p>",
      "tradition": "dark",
      "effectFormula": "[DICE] targets",
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
    "_id": "DZhUMfDJnRTFSrcf",
    "name": "Instil Fear",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>[DICE] targets cannot attack caster for [DICE] rounds.</p>",
      "tradition": "dark",
      "effectFormula": "[DICE] targets, [DICE] rounds",
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
    "_id": "zSm3mQrIQkmueISs",
    "name": "Life Drain",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Forces a touched target to save or take [SUM] damage, restoring that many hp to caster.</p>",
      "tradition": "dark",
      "effectFormula": "[SUM] damage / heal",
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
    "_id": "rK4cbnE2fmAMyFGx",
    "name": "Phantom Steed",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Conjures a skeletal warhorse that lasts [DICE] watches.</p>",
      "tradition": "dark",
      "effectFormula": "[DICE] watches",
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
    "_id": "ewuGdbNdUXTOvxfl",
    "name": "Putrid Limb",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Putrefies a touched limb if [SUM] is 8+; target cannot carry two-handed items and receives disadvantage if limb is required to attack (claws, hands, etc.).</p>",
      "tradition": "dark",
      "effectFormula": "[SUM] >= 8 to trigger",
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
    "_id": "zkHtjM7UVURv3gNN",
    "name": "Skull Blast",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Explodes on contact for [SUM] damage targeting everyone Near impact zone; can be cast from [SUM] x 10’.</p>",
      "tradition": "dark",
      "effectFormula": "[SUM] damage, range [SUM]*10ft",
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
    "_id": "Cawhdk4juhBaIpuZ",
    "name": "Shroud of Decay",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Surrounds caster in a deathly aura for [DICE] rounds; everyone Near caster takes [DICE] necrotic damage at the start of their round.</p>",
      "tradition": "dark",
      "effectFormula": "[DICE] rounds, [DICE] dmg/round",
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
    "_id": "tCpqp8pbKLIsJpX3",
    "name": "The Sacrifice",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Necrotic wave emanates from caster for [SUM] damage to all within Distant range; can only be cast if [DICE] allies are in range.</p>",
      "tradition": "dark",
      "effectFormula": "[SUM] damage, requires [DICE] allies",
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
    "_id": "zdvFwYkgrULj4lYc",
    "name": "Tomb Seal",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Magically seals a crypt or coffer lid for [SUM] x 10 years.</p>",
      "tradition": "dark",
      "effectFormula": "[SUM]*10 years",
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
    "_id": "giRiEjeDFkc6G044",
    "name": "Wall of Bones",
    "type": "spell",
    "img": "icons/magic/death/skull-energy-light-purple.webp",
    "system": {
      "description": "<p>Creates a wall around caster (and Nearby allies) with [SUM] hit points.</p>",
      "tradition": "dark",
      "effectFormula": "[SUM] hp wall",
      "suggestedDice": 3
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
