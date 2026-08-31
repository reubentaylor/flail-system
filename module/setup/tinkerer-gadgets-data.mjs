/*
 * Tinkerer Gadgets — 20 items across 4 folders (damage, control,
 * utility, support). Bundled at world creation into a
 * `flail-tinkerer-gadgets` compendium. Tinkerers drag gadgets from
 * here onto their character sheet — the sheet then syncs
 * `system.gadgetBelt` from the owned items so downstream reads keep
 * working (Jack of All Trades, triplet-free-release mechanics,
 * etc.). Same drag-and-drop pattern established for Primal Gifts.
 */

export const TINKERER_GADGET_FOLDERS = [
  {
    "_id": "d692345967a9f6dc",
    "name": "Damage",
    "type": "Item",
    "color": "#8b1a1a",
    "sorting": "m",
    "sort": 0
  },
  {
    "_id": "0fc5ac4de2fddf88",
    "name": "Control",
    "type": "Item",
    "color": "#4a2a6b",
    "sorting": "m",
    "sort": 100
  },
  {
    "_id": "f6e195450bb9838a",
    "name": "Utility",
    "type": "Item",
    "color": "#5a4810",
    "sorting": "m",
    "sort": 200
  },
  {
    "_id": "60059ddda48ec64d",
    "name": "Support",
    "type": "Item",
    "color": "#2a5c64",
    "sorting": "m",
    "sort": 300
  }
];

export const TINKERER_GADGETS = [
  {
    "_id": "63bb5092ee3aa965",
    "name": "Buzzsaw Disk",
    "type": "gadget",
    "img": "icons/magic/light/projectile-beam-yellow.webp",
    "folder": "d692345967a9f6dc",
    "system": {
      "description": "Hits a target for d8 damage. On an 8, ricochets onto another random target.",
      "gadgetType": "damage",
      "gadgetKey": "buzzsawDisk",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0
    },
    "flags": {}
  },
  {
    "_id": "f3168ee71e0654f0",
    "name": "Clockwork Toy",
    "type": "gadget",
    "img": "icons/magic/fire/explosion-fireball-large-orange.webp",
    "folder": "d692345967a9f6dc",
    "system": {
      "description": "Walks erratically for one round, then explodes for 3d6 damage to all Near it.",
      "gadgetType": "damage",
      "gadgetKey": "clockworkToy",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0
    },
    "flags": {}
  },
  {
    "_id": "6c065bef2fe56795",
    "name": "Fire Spitter",
    "type": "gadget",
    "img": "icons/magic/fire/projectile-fireball-smoke-orange.webp",
    "folder": "d692345967a9f6dc",
    "system": {
      "description": "Cone of flame \u2014 d10 damage to up to two Nearby targets.",
      "gadgetType": "damage",
      "gadgetKey": "fireSpitter",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0
    },
    "flags": {}
  },
  {
    "_id": "a7c49780b66e77bb",
    "name": "Goo Blast",
    "type": "gadget",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "folder": "d692345967a9f6dc",
    "system": {
      "description": "Attaches to a target; goes off on its next round for 2d8 damage to all Nearby.",
      "gadgetType": "damage",
      "gadgetKey": "gooBlast",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0
    },
    "flags": {}
  },
  {
    "_id": "c14e8c49e2ae48a5",
    "name": "Shock Bolas",
    "type": "gadget",
    "img": "icons/magic/light/beams-rays-orange-purple-large.webp",
    "folder": "d692345967a9f6dc",
    "system": {
      "description": "Hits any target for d6 electrical damage. On 4-6, target is stunned.",
      "gadgetType": "damage",
      "gadgetKey": "shockBolas",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0
    },
    "flags": {}
  },
  {
    "_id": "94fc6a8f780384b1",
    "name": "Flash Bomb",
    "type": "gadget",
    "img": "icons/magic/fire/explosion-embers-orange.webp",
    "folder": "0fc5ac4de2fddf88",
    "system": {
      "description": "All Nearby must save or go blind until the end of their next round.",
      "gadgetType": "control",
      "gadgetKey": "flashBomb",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"near","delayRounds":0,"targetScope":"allNearby","cost":"action","daily":false},
      "chatBlurb": "Blinding flash — all Nearby save or go blind.",
      "targetHint": "Target all Nearby creatures.",
      "isCustomTemplate": false,
      "effects": [{"type":"save","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"int","saveOnFailConditionUuid":"","saveOnFailConditionName":"Blinded","saveDurationRounds":1,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":""}]
    },
    "flags": {}
  },
  {
    "_id": "1f4251410e1bdeb3",
    "name": "Magnetic Orb",
    "type": "gadget",
    "img": "icons/magic/movement/pinwheel-turning-blue.webp",
    "folder": "0fc5ac4de2fddf88",
    "system": {
      "description": "All small metal objects within Distant range are drawn to it.",
      "gadgetType": "control",
      "gadgetKey": "magneticOrb",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"distant","delayRounds":0,"targetScope":"none","cost":"action","daily":false},
      "chatBlurb": "Draws all small metal objects within Distant range.",
      "targetHint": "No targets — GM adjudicates which metal objects respond.",
      "isCustomTemplate": false,
      "effects": [{"type":"custom","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":"<p>All small metal objects within <strong>Distant</strong> range are drawn toward the orb. GM adjudicates specifics — coins, keys, buckles, small blades, and similar loose items are pulled.</p>"}]
    },
    "flags": {}
  },
  {
    "_id": "103089f6c328dee8",
    "name": "Sticky Net",
    "type": "gadget",
    "img": "icons/creatures/slimes/slime-movement-swirling-green.webp",
    "folder": "0fc5ac4de2fddf88",
    "system": {
      "description": "Shoots to immobilise a target within Distant range.",
      "gadgetType": "control",
      "gadgetKey": "stickyNet",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"distant","delayRounds":0,"targetScope":"single","cost":"action","daily":false},
      "chatBlurb": "Fires a sticky net to immobilise a Distant target.",
      "targetHint": "Target one creature within Distant.",
      "isCustomTemplate": false,
      "effects": [{"type":"save","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"dex","saveOnFailConditionUuid":"","saveOnFailConditionName":"Immobilised","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":""}]
    },
    "flags": {}
  },
  {
    "_id": "0a3891e5a4087de4",
    "name": "Smoke Screen",
    "type": "gadget",
    "img": "icons/magic/air/air-smoke-casting.webp",
    "folder": "0fc5ac4de2fddf88",
    "system": {
      "description": "Fills the room with smoke \u2014 aids stealth, obscures vision.",
      "gadgetType": "control",
      "gadgetKey": "smokeScreen",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"self","delayRounds":0,"targetScope":"none","cost":"action","daily":false},
      "chatBlurb": "Fills the room with obscuring smoke.",
      "targetHint": "Environmental — no target roll needed.",
      "isCustomTemplate": false,
      "effects": [{"type":"custom","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":"<p>Fills the room with thick smoke. Grants <strong>advantage on stealth</strong> to those within and <strong>obscures vision</strong> for anyone trying to see or shoot through it. Lasts until the smoke disperses (GM adjudicates duration by ventilation).</p>"}]
    },
    "flags": {}
  },
  {
    "_id": "25092214c26d11ec",
    "name": "Repulsor Blast",
    "type": "gadget",
    "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
    "folder": "0fc5ac4de2fddf88",
    "system": {
      "description": "All Nearby must save or are pushed to Distant range.",
      "gadgetType": "control",
      "gadgetKey": "repulsorBlast",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"near","delayRounds":0,"targetScope":"allNearby","cost":"action","daily":false},
      "chatBlurb": "Concussive push — Nearby save or hurled to Distant.",
      "targetHint": "Target all Nearby creatures.",
      "isCustomTemplate": false,
      "effects": [{"type":"save","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"str","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"near","savePushTo":"distant","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":""}]
    },
    "flags": {}
  },
  {
    "_id": "23accb83fc293ae3",
    "name": "Liquid Rope",
    "type": "gadget",
    "img": "icons/creatures/slimes/slime-movement-swirling-green.webp",
    "folder": "f6e195450bb9838a",
    "system": {
      "description": "Advantage on climbing. Liquid hardens for two minutes, then dissolves.",
      "gadgetType": "utility",
      "gadgetKey": "liquidRope",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"self","delayRounds":0,"targetScope":"self","cost":"action","daily":false},
      "chatBlurb": "Sprays a rope of quick-hardening liquid.",
      "targetHint": "Self — climb with advantage.",
      "isCustomTemplate": false,
      "effects": [{"type":"custom","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":"<p>Sprays a rope of quick-hardening liquid that grips any surface. Grants <strong>advantage on climbing</strong> checks. Liquid hardens for <strong>two minutes</strong>, then dissolves.</p>"}]
    },
    "flags": {}
  },
  {
    "_id": "d96e7428451b49a0",
    "name": "Miniature Drill",
    "type": "gadget",
    "img": "icons/magic/movement/pinwheel-turning-blue.webp",
    "folder": "f6e195450bb9838a",
    "system": {
      "description": "Cuts a small hole through walls, doors, or locks.",
      "gadgetType": "utility",
      "gadgetKey": "miniatureDrill",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"self","delayRounds":0,"targetScope":"none","cost":"action","daily":false},
      "chatBlurb": "Cuts a small hole through walls, doors, or locks.",
      "targetHint": "Environmental — applies to a wall / door / lock.",
      "isCustomTemplate": false,
      "effects": [{"type":"custom","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":"<p>Cuts a small hole through a <strong>wall, door, or lock</strong>. GM adjudicates material thickness and whether the drill succeeds in a single action or needs several turns.</p>"}]
    },
    "flags": {}
  },
  {
    "_id": "31e825d6fa1566b3",
    "name": "Signal Flare",
    "type": "gadget",
    "img": "icons/magic/light/projectile-beam-yellow.webp",
    "folder": "f6e195450bb9838a",
    "system": {
      "description": "Launches a bright light into the sky.",
      "gadgetType": "utility",
      "gadgetKey": "signalFlare",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"distant","delayRounds":0,"targetScope":"none","cost":"action","daily":false},
      "chatBlurb": "Launches a bright light into the sky.",
      "targetHint": "Environmental — attracts attention.",
      "isCustomTemplate": false,
      "effects": [{"type":"custom","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":"<p>Launches a bright light into the sky, <strong>visible for miles</strong>. Useful for signalling allies or marking a location. Attracts attention from anything nearby that might be watching.</p>"}]
    },
    "flags": {}
  },
  {
    "_id": "92b6a64a72ae6785",
    "name": "Spider Scout",
    "type": "gadget",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "folder": "f6e195450bb9838a",
    "system": {
      "description": "Moves silently; emits warning flashes if it registers movement.",
      "gadgetType": "utility",
      "gadgetKey": "spiderScout",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"distant","delayRounds":0,"targetScope":"none","cost":"action","daily":false},
      "chatBlurb": "Silent-moving scout emits warning flashes on movement.",
      "targetHint": "Environmental — deploys to scout an area.",
      "isCustomTemplate": false,
      "effects": [{"type":"custom","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":"<p>Moves silently and <strong>emits warning flashes</strong> if it registers movement within its detection range. Useful for scouting corridors, guarding a rest, or spotting ambushes.</p>"}]
    },
    "flags": {}
  },
  {
    "_id": "8665627b5a86e20e",
    "name": "Oil Slicker",
    "type": "gadget",
    "img": "icons/magic/fire/projectile-fireball-smoke-orange.webp",
    "folder": "f6e195450bb9838a",
    "system": {
      "description": "Coats a Nearby surface with slippery, flammable oil.",
      "gadgetType": "utility",
      "gadgetKey": "oilSlicker",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"near","delayRounds":0,"targetScope":"none","cost":"action","daily":false},
      "chatBlurb": "Coats a Nearby surface with slippery, flammable oil.",
      "targetHint": "Environmental — target a Nearby surface.",
      "isCustomTemplate": false,
      "effects": [{"type":"custom","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":"<p>Coats a <strong>Nearby surface</strong> with slippery, flammable oil. Creatures moving across it must save vs DEX or fall prone. The oil is <strong>flammable</strong> — a nearby spark ignites the whole slick for GM-adjudicated damage.</p>"}]
    },
    "flags": {}
  },
  {
    "_id": "6cd3dccf801b6058",
    "name": "Adrenaline Booster",
    "type": "gadget",
    "img": "icons/skills/trades/academics-book-study-purple.webp",
    "folder": "60059ddda48ec64d",
    "system": {
      "description": "Suppresses Injured or Exhausted for two turns.",
      "gadgetType": "support",
      "gadgetKey": "adrenalineBooster",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"self","delayRounds":0,"targetScope":"self","cost":"action","daily":false},
      "chatBlurb": "Suppresses Injured OR Exhausted for two turns.",
      "targetHint": "Self — pick ONE of Injured or Exhausted to suppress.",
      "isCustomTemplate": false,
      "effects": [{"type":"suppressCondition","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"Injured","conditionDurationRounds":0,"conditionDurationTurns":2,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":""},{"type":"suppressCondition","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"Exhausted","conditionDurationRounds":0,"conditionDurationTurns":2,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":""}]
    },
    "flags": {}
  },
  {
    "_id": "8fa79c8ee5f348b5",
    "name": "Flash Paste",
    "type": "gadget",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "folder": "60059ddda48ec64d",
    "system": {
      "description": "Rapidly seals a crack or leak; holds for one turn.",
      "gadgetType": "support",
      "gadgetKey": "flashpaste",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"self","delayRounds":0,"targetScope":"none","cost":"action","daily":false},
      "chatBlurb": "Seals a crack or leak for one turn.",
      "targetHint": "Environmental — target a crack, leak, or gap.",
      "isCustomTemplate": false,
      "effects": [{"type":"custom","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":"<p>Rapidly seals a crack or leak. Holds for <strong>one turn</strong>, then flakes off. Enough to stop a boat from sinking briefly, or to block a doorway just long enough.</p>"}]
    },
    "flags": {}
  },
  {
    "_id": "b3421611b1dfab58",
    "name": "Healing Injector",
    "type": "gadget",
    "img": "icons/magic/defensive/shield-barrier-flaming-diamond-blue.webp",
    "folder": "60059ddda48ec64d",
    "system": {
      "description": "Heals d4 HP on injection into self or an ally.",
      "gadgetType": "support",
      "gadgetKey": "healingInjector",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"near","delayRounds":0,"targetScope":"ally","cost":"action","daily":false},
      "chatBlurb": "Injects healing fluid — d4 HP restored.",
      "targetHint": "Target self or an ally within reach.",
      "isCustomTemplate": false,
      "effects": [{"type":"heal","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"1d4","healAllowsSelf":true,"healAllowsAlly":true,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":""}]
    },
    "flags": {}
  },
  {
    "_id": "c46e770fce075cea",
    "name": "Repair Drone",
    "type": "gadget",
    "img": "icons/magic/movement/pinwheel-turning-blue.webp",
    "folder": "60059ddda48ec64d",
    "system": {
      "description": "Restores d4 HP to any construct within Distant range.",
      "gadgetType": "support",
      "gadgetKey": "repairDrone",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"distant","delayRounds":0,"targetScope":"anyConstruct","cost":"action","daily":false},
      "chatBlurb": "Airborne drone repairs a construct — d4 HP.",
      "targetHint": "Target any construct within Distant range.",
      "isCustomTemplate": false,
      "effects": [{"type":"heal","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"1d4","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":true,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":""}]
    },
    "flags": {}
  },
  {
    "_id": "a0a09a129dadb087",
    "name": "Retractable Shield",
    "type": "gadget",
    "img": "icons/magic/defensive/shield-barrier-blue.webp",
    "folder": "60059ddda48ec64d",
    "system": {
      "description": "Absorbs up to 6 damage from a single attack, then shatters.",
      "gadgetType": "support",
      "gadgetKey": "retractableShield",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"reactive","range":"self","delayRounds":0,"targetScope":"self","cost":"none","daily":false},
      "chatBlurb": "Reactive shield — absorbs up to 6 damage, then shatters.",
      "targetHint": "Reactive — trigger on being hit.",
      "isCustomTemplate": false,
      "effects": [{"type":"custom","formula":"","damageType":"","triggerOnResult":"","triggerEffect":"","triggerConditionUuid":"","triggerConditionName":"","saveAttribute":"","saveOnFailConditionUuid":"","saveOnFailConditionName":"","saveDurationRounds":0,"savePushFrom":"","savePushTo":"","healFormula":"","healAllowsSelf":false,"healAllowsAlly":false,"healAllowsConstruct":false,"conditionUuid":"","conditionName":"","conditionDurationRounds":0,"conditionDurationTurns":0,"passiveValue":0,"passiveAttribute":"","passiveSkill":"","passiveCondition":"","customHtml":"<p>Reactive shield. When you are hit by a single attack, this shield <strong>absorbs up to 6 damage</strong>, then shatters. Deploys instantly — no action required.</p>"}]
    },
    "flags": {}
  },
  {
    "_id": "cc001cc001cc0000",
    "name": "Custom Gadget (Template)",
    "type": "gadget",
    "img": "icons/tools/hand/mallet-wooden-tan.webp",
    "folder": "60059ddda48ec64d",
    "system": {
      "description": "<p><em>Duplicate this item and rewrite it to author your own gadget.</em></p><p>Set the gadget type (damage / control / utility / support), pick an activation model on the Mechanics tab, and add one or more effect entries. See the existing canonical gadgets for reference — Healing Injector (heal), Flash Bomb (save + condition), Adrenaline Booster (two chained suppressions), etc.</p>",
      "gadgetType": "utility",
      "gadgetKey": "",
      "slotsRequired": 0,
      "location": "unequipped",
      "slotIndex": 0,
      "twoHanded": false,
      "cost": 0,
      "usage": {
        "max": 1,
        "value": 0
      },
      "lastUsed": 0,
      "activation": {"type":"activated","range":"near","delayRounds":0,"targetScope":"single","cost":"action","daily":false},
      "chatBlurb": "",
      "targetHint": "",
      "isCustomTemplate": true,
      "effects": []
    },
    "flags": {}
  }
];
