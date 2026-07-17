/*
 * FLAIL Rolltables — bundled at world creation into the
 * `flail-rolltables` compendium. Ships all published lookup tables
 * from the rulebook: hexcrawl, dungeon, wizard tower, cave, potion,
 * and city generation.
 */

export const FLAIL_ROLLTABLES = [
  {
    "_id": "45135e18ca822457",
    "name": "Death Table",
    "img": "icons/svg/skull.svg",
    "description": "<p>Roll d8 when a character loses all their hit points OR receives a fourth Injured condition. If outside of combat, roll immediately. If it occurs during battle, wait for combat to resolve and then roll. Should the entire party die, all characters are presumed dead.</p><p><em>Note: Injured conditions are not removed by rolling on the Death Table. Characters must meet their clear requirements. Any Injuries beyond the fourth always trigger a Death Table roll.</em></p><p>Some guilds (e.g. Freak Show) allow the character to roll d4 instead of d8. The Roll Death Table macro supports both — hold Shift for d4.</p>",
    "formula": "1d8",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "36ed21ff2919baf5",
        "type": "text",
        "text": "<strong>Near Death Experience:</strong> Get up with max hit points restored and +1 to one attribute of choice.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/skull.svg",
        "flags": {}
      },
      {
        "_id": "1ff45a96f4a7b7bf",
        "type": "text",
        "text": "<strong>Knocked Out:</strong> Recover immediately with d4 hit points.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/skull.svg",
        "flags": {}
      },
      {
        "_id": "5448ad8e151cf023",
        "type": "text",
        "text": "<strong>Dizzy:</strong> Disadvantage on attacks for d4 turns.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/skull.svg",
        "flags": {}
      },
      {
        "_id": "a53a59538a9d4d82",
        "type": "text",
        "text": "<strong>Hurt:</strong> Disadvantage on all saves for the remainder of the session.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/skull.svg",
        "flags": {}
      },
      {
        "_id": "7a71e8ab3a26f474",
        "type": "text",
        "text": "<strong>Scarred:</strong> Loses 1 CHA permanently.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/skull.svg",
        "flags": {}
      },
      {
        "_id": "82b6053b176fff8d",
        "type": "text",
        "text": "<strong>Horrible Wound:</strong> Gain a Persistent Injury condition. Cannot be removed from inventory, unless by miracle or magic cure.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/skull.svg",
        "flags": {}
      },
      {
        "_id": "b20c7f7a74e0f6bd",
        "type": "text",
        "text": "<strong>Maimed:</strong> Either left or right hand inventory slot is rendered useless — mark it with an X. Cannot use two-handed objects. To recover, must find an artificial arm.",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/skull.svg",
        "flags": {}
      },
      {
        "_id": "84344e35db31eaa0",
        "type": "text",
        "text": "<strong>Dead!:</strong> Dead!",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/skull.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 0,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "99ce7d479a5a0f9a",
    "name": "Crossing a Hex",
    "img": "icons/magic/movement/pinwheel-turning-blue.webp",
    "description": "<p>Roll 2d6 when moving from one hex into another. It takes two watches to move from one hex to another; fast vehicles or mounts reduce this to one, while slow vehicles or rough terrain add an extra watch (FLAIL v0.2 p.68).</p>",
    "formula": "2d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "596725f48acb4e7b",
        "type": "text",
        "text": "<strong>Roll encounter:</strong> Roll on the appropriate encounter table for the current biome.",
        "range": [
          2,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/movement/pinwheel-turning-blue.webp",
        "flags": {}
      },
      {
        "_id": "38a6134b6d00dce3",
        "type": "text",
        "text": "<strong>Nothing occurs:</strong> The party crosses the hex without incident.",
        "range": [
          6,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/movement/pinwheel-turning-blue.webp",
        "flags": {}
      },
      {
        "_id": "284afa5e3d4a9f8c",
        "type": "text",
        "text": "<strong>Lost!:</strong> Watch is wasted.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/movement/pinwheel-turning-blue.webp",
        "flags": {}
      },
      {
        "_id": "4fdfc505f137e8d6",
        "type": "text",
        "text": "<strong>Bad trail!:</strong> Move into another (random) hex.",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/movement/pinwheel-turning-blue.webp",
        "flags": {}
      },
      {
        "_id": "a1e5b0cc4d7c55f2",
        "type": "text",
        "text": "<strong>Roll Event:</strong> Roll on the Session Events table (or Hexcrawl: Events).",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/movement/pinwheel-turning-blue.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 100,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "6cb5c6e26858b47b",
    "name": "Reactions",
    "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
    "description": "<p>Roll 2d6 when coming across a creature or folk whose reaction is uncertain (FLAIL v0.2 p.68).</p>",
    "formula": "2d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "43157f980b619a78",
        "type": "text",
        "text": "<strong>Attacks immediately:</strong> The creature or folk reacts violently on sight.",
        "range": [
          2,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "228bc943f317fe88",
        "type": "text",
        "text": "<strong>Hostile, but…:</strong> The creature or folk is hostile but might be talked down or diverted.",
        "range": [
          6,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "882e9d50ecebc30a",
        "type": "text",
        "text": "<strong>Can be bargained with:</strong> Open to negotiation, deal, or trade.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "2121360fd7f02601",
        "type": "text",
        "text": "<strong>Friendly, but…:</strong> Friendly disposition with a caveat (a favour asked, a suspicion held).",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "3cd3da3f26ea54ab",
        "type": "text",
        "text": "<strong>Helpful:</strong> Offers meaningful help without prompting.",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 200,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "19b25157a8842ffb",
    "name": "Weather",
    "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
    "description": "<p>Roll 2d6 for weather each day. Adjust the flavour to the biome — Unpleasant in a Desert is a heat wave; in Mountains, icy winds, etc. (FLAIL v0.2 p.68).</p>",
    "formula": "2d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "351850a6a38e5b9c",
        "type": "text",
        "text": "<strong>Catastrophic:</strong> Outside of shelter, roll all saves with disadvantage.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
        "flags": {}
      },
      {
        "_id": "c11f95a8b6382173",
        "type": "text",
        "text": "<strong>Unpleasant:</strong> Extra watch to cross a hex.",
        "range": [
          3,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
        "flags": {}
      },
      {
        "_id": "4cdc83b62bdbfc67",
        "type": "text",
        "text": "<strong>Typical:</strong> Uneventful.",
        "range": [
          6,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
        "flags": {}
      },
      {
        "_id": "b308a1ea3b5cb104",
        "type": "text",
        "text": "<strong>Agreeable:</strong> Characters have advantage on the first save of the day.",
        "range": [
          9,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
        "flags": {}
      },
      {
        "_id": "7a8282d8f96b2249",
        "type": "text",
        "text": "<strong>Perfect:</strong> Gathering supplies is always successful.",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 300,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "8a4566b149f9d409",
    "name": "Dungeons: Flavour",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "description": "<p>Dungeons: <em>Flavour</em> column. Roll d6 (FLAIL v0.2 p.80). Use with the <em>Build Dungeon</em> macro to roll all five columns at once.</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "a0c7cd02c9b27153",
        "type": "text",
        "text": "Enchanted",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "29e541ee515b4087",
        "type": "text",
        "text": "Festering",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "d1d66df68df078eb",
        "type": "text",
        "text": "Haunted",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "f7654c057476720e",
        "type": "text",
        "text": "Misty",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "f271f380e2a0e558",
        "type": "text",
        "text": "Broken",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "73c7bd3a24ee6a0a",
        "type": "text",
        "text": "Cursed",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 400,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "915320f4572e22be",
    "name": "Dungeons: Type",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "description": "<p>Dungeons: <em>Type</em> column. Roll d6 (FLAIL v0.2 p.80). Use with the <em>Build Dungeon</em> macro to roll all five columns at once.</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "2a7ff9c8a8811b8e",
        "type": "text",
        "text": "Crypts",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "365fc34bf195875d",
        "type": "text",
        "text": "Vaults",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "8501cc15b6cc4a4e",
        "type": "text",
        "text": "Tombs",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "3cc7a11f57e71ba5",
        "type": "text",
        "text": "Catacombs",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "5c26860ebd7cc89e",
        "type": "text",
        "text": "Sewers",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "724d064d28f0dc47",
        "type": "text",
        "text": "Cellar",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 410,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "c4fb4e8639e5c82a",
    "name": "Dungeons: Location",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "description": "<p>Dungeons: <em>Location</em> column. Roll d6 (FLAIL v0.2 p.80). Use with the <em>Build Dungeon</em> macro to roll all five columns at once.</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "fabf64775a5cb9f8",
        "type": "text",
        "text": "Beneath a busy city",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "d66b4099d6095c00",
        "type": "text",
        "text": "Hidden in old temple",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "5e5c2fd46c2ef52c",
        "type": "text",
        "text": "Inside a deep well",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "d5ec1b411d10ea9c",
        "type": "text",
        "text": "Within a black fortress",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "b87b6d07a1d949f0",
        "type": "text",
        "text": "Under a ruined castle",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "1a44fd43df1dfdff",
        "type": "text",
        "text": "Below an ancient ruin",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 420,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "1a8bc34e2dbf215e",
    "name": "Dungeons: Key Feature",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "description": "<p>Dungeons: <em>Key Feature</em> column. Roll d6 (FLAIL v0.2 p.80). Use with the <em>Build Dungeon</em> macro to roll all five columns at once.</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "f66ec31749ab094a",
        "type": "text",
        "text": "Arcane glyphs",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "10d4a0b0558cb6ec",
        "type": "text",
        "text": "Bone-coated walls",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "10b457e0a0a53d13",
        "type": "text",
        "text": "Toxic vapours",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "96e06f5392d674ff",
        "type": "text",
        "text": "Cobweb shroud",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "c6fac5b58bf3e28d",
        "type": "text",
        "text": "Dripping ceilings",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "67d17a9a50c13e2a",
        "type": "text",
        "text": "Hanging chains",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 430,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "2d8f382be23964ed",
    "name": "Dungeons: Creatures",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "description": "<p>Dungeons: <em>Creatures</em> column. Roll d6 (FLAIL v0.2 p.80). Use with the <em>Build Dungeon</em> macro to roll all five columns at once.</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "4cc8fc6096006687",
        "type": "text",
        "text": "Undead",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "e7c1342c0e0303e3",
        "type": "text",
        "text": "Oozes",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "6f3a4d3c226b6ff4",
        "type": "text",
        "text": "Reptiles",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "7e95e4f12fa374da",
        "type": "text",
        "text": "Giants",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "086bac3b752a2c05",
        "type": "text",
        "text": "Insects",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "fb5417b5d04a1e85",
        "type": "text",
        "text": "Demons",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 440,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "fe2384d192982c46",
    "name": "Puzzle",
    "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
    "description": "<p>Adventure-site puzzle — roll 1d10 (FLAIL v0.2 p.81). Use when the current dungeon area's stocking calls for a puzzle.</p>",
    "formula": "1d10",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "d41d8d559f4972f3",
        "type": "text",
        "text": "Three levers in neutral position. Arrange in up-down-down position to open a door.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
        "flags": {}
      },
      {
        "_id": "79845d734c7803f0",
        "type": "text",
        "text": "Doorknob only unlocks if turned by an undead creature.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
        "flags": {}
      },
      {
        "_id": "c953c0059e89b378",
        "type": "text",
        "text": "Chest made of glass is glued to the bottom of a well, containing a key made of salt.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
        "flags": {}
      },
      {
        "_id": "b0ea0d67667262d0",
        "type": "text",
        "text": "Crystal key hangs from a high-ceiling, tangled in thick webs. It will break easily.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
        "flags": {}
      },
      {
        "_id": "eb7daa9f7b7385b3",
        "type": "text",
        "text": "Electrified chamber. Touching the floor or walls while carrying/wearing metal causes d8 damage.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
        "flags": {}
      },
      {
        "_id": "658c2dc08f92e50d",
        "type": "text",
        "text": "Two statues point in random directions. Turn them to face the door to unlock it.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
        "flags": {}
      },
      {
        "_id": "f4c345e40e1f4656",
        "type": "text",
        "text": "Door with four unlocked keyholes. All of them must be locked to open the door.",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
        "flags": {}
      },
      {
        "_id": "3c06a6e887530f48",
        "type": "text",
        "text": "Walls riddled with invisible ink. Heat must be used to reveal a hidden message.",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
        "flags": {}
      },
      {
        "_id": "efd80d7277361fb6",
        "type": "text",
        "text": "Four paintings depicting the four seasons. Arrange them in order to reveal a passage.",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
        "flags": {}
      },
      {
        "_id": "2d4f1c5e9499d503",
        "type": "text",
        "text": "Fountain with green liquid within. Everyone present must drink to move forward.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 500,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "b488576a1b2e7d65",
    "name": "Obstacle",
    "img": "icons/magic/defensive/shield-barrier-blue.webp",
    "description": "<p>Adventure-site obstacle — roll 1d10 (FLAIL v0.2 p.81). Use when the current dungeon area's stocking calls for a obstacle.</p>",
    "formula": "1d10",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "351f95d3f69a3049",
        "type": "text",
        "text": "Passage is obstructed by a massive entanglement of thorny roots.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/defensive/shield-barrier-blue.webp",
        "flags": {}
      },
      {
        "_id": "ddc5bb566d2991f5",
        "type": "text",
        "text": "Locked door. The key is hidden somewhere in the dungeon's entrance or first room.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/defensive/shield-barrier-blue.webp",
        "flags": {}
      },
      {
        "_id": "af1a251d0f923bd0",
        "type": "text",
        "text": "Tunnel or passageway filled with water, dwelled by a territorial marine creature.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/defensive/shield-barrier-blue.webp",
        "flags": {}
      },
      {
        "_id": "11abc4296ba06a0b",
        "type": "text",
        "text": "Bridge that lights in flames as characters cross it.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/defensive/shield-barrier-blue.webp",
        "flags": {}
      },
      {
        "_id": "e514d6aeaf997652",
        "type": "text",
        "text": "Steep crevice with a molten lava river, fuming with hot fumaroles, and an unstable wooden bridge.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/defensive/shield-barrier-blue.webp",
        "flags": {}
      },
      {
        "_id": "931ff114e2d39fe8",
        "type": "text",
        "text": "Ritual occurring as characters enter the room. Must be stopped to continue.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/defensive/shield-barrier-blue.webp",
        "flags": {}
      },
      {
        "_id": "30d81e4d875e2d82",
        "type": "text",
        "text": "Large pit dividing the room swarming with undead creatures below.",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/defensive/shield-barrier-blue.webp",
        "flags": {}
      },
      {
        "_id": "d2d922fc3d131086",
        "type": "text",
        "text": "Vertical sheer surface. Forces a steep climb into the next room.",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/defensive/shield-barrier-blue.webp",
        "flags": {}
      },
      {
        "_id": "0c4590cc68e7ce22",
        "type": "text",
        "text": "Collapsed ceiling and debris. Hard to pass through with a full inventory.",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/defensive/shield-barrier-blue.webp",
        "flags": {}
      },
      {
        "_id": "d2360c5870d9de80",
        "type": "text",
        "text": "Magnetic ceiling. Characters with metal objects are violently pulled towards it.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/defensive/shield-barrier-blue.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 510,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "6e6d67cd4759346c",
    "name": "Trap",
    "img": "icons/magic/fire/explosion-embers-orange.webp",
    "description": "<p>Adventure-site trap — roll 1d10 (FLAIL v0.2 p.81). Use when the current dungeon area's stocking calls for a trap.</p>",
    "formula": "1d10",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "68bca984bfd1cc70",
        "type": "text",
        "text": "Tripwire activates a barrage of arrows that shoot from the wall.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/fire/explosion-embers-orange.webp",
        "flags": {}
      },
      {
        "_id": "c7061d667c756858",
        "type": "text",
        "text": "False slab triggers a rolling boulder that descends in high speed.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/fire/explosion-embers-orange.webp",
        "flags": {}
      },
      {
        "_id": "203b13f4fed42d92",
        "type": "text",
        "text": "Fake door is spring-loaded to release a massive bludgeoning weapon.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/fire/explosion-embers-orange.webp",
        "flags": {}
      },
      {
        "_id": "9f6a9f3fde7fc769",
        "type": "text",
        "text": "Deadly spike pit, concealed by a trapdoor, lies just beyond a short crevice.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/fire/explosion-embers-orange.webp",
        "flags": {}
      },
      {
        "_id": "ffbde3f4d77087af",
        "type": "text",
        "text": "Coins shine inside a giant glass orb. Within is actually a Gelatinous Cube.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/fire/explosion-embers-orange.webp",
        "flags": {}
      },
      {
        "_id": "751d0f56c76f66d6",
        "type": "text",
        "text": "Door to the next room bears a snake-shaped knob with a hidden poison needle.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/fire/explosion-embers-orange.webp",
        "flags": {}
      },
      {
        "_id": "6ca4b67e5d08bc89",
        "type": "text",
        "text": "Three medusa statues looking away. One of them comes to life if stared at.",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/fire/explosion-embers-orange.webp",
        "flags": {}
      },
      {
        "_id": "641d1da16316f6d9",
        "type": "text",
        "text": "Treasure chest with a rigged lock. Opening it triggers a swinging axe from the ceiling.",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/fire/explosion-embers-orange.webp",
        "flags": {}
      },
      {
        "_id": "8db39fd169264a1b",
        "type": "text",
        "text": "Ancient statue with gemstone eyes. Will attack if gems are removed.",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/fire/explosion-embers-orange.webp",
        "flags": {}
      },
      {
        "_id": "8e462df1918a01f0",
        "type": "text",
        "text": "Shelves with dusty tomes. Opening them releases trapped evil spirits.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/fire/explosion-embers-orange.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 520,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "b33d0d9316d42ed1",
    "name": "Anomaly",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "description": "<p>Adventure-site anomaly — roll 1d12 (FLAIL v0.2 p.81). Use when the current dungeon area's stocking calls for a anomaly.</p>",
    "formula": "1d12",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "d116475dc37d6077",
        "type": "text",
        "text": "Overgrown with odd fungi.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "689f29a7566fdfdc",
        "type": "text",
        "text": "Pile of clean skeletal remains.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "089f457c9c836340",
        "type": "text",
        "text": "Unnaturally warm/cold.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "9e2a72fea15be488",
        "type": "text",
        "text": "Roots bursting out of walls.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "b569581a6756b17e",
        "type": "text",
        "text": "Cluster of harmless insects.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "272e9c36c5a5de6c",
        "type": "text",
        "text": "Floor covered in slick algae.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "94de47ee743cfb87",
        "type": "text",
        "text": "Signs of recent explosion.",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "79ac5910aa2b5f92",
        "type": "text",
        "text": "Walls dripping odd liquid.",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "d1f9fe10dbc2bd93",
        "type": "text",
        "text": "Antique mosaic tile floor.",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "e89c03e07d69adbc",
        "type": "text",
        "text": "Deeply cracked floor/ceiling.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "bf137408023a3c47",
        "type": "text",
        "text": "Screeches of unseen beings.",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "e9d1ffda900c4b5f",
        "type": "text",
        "text": "Rhythmic dripping sounds.",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 530,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "a85fa4c9ca0abb6b",
    "name": "Wizard Towers: Shape",
    "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
    "description": "<p>Wizard Towers: <em>Shape</em> column. Roll d10 (FLAIL v0.2 p.84). Use with the <em>Build Wizard Tower</em> macro to roll all four columns at once.</p>",
    "formula": "1d10",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "4c70ba08899ecf3b",
        "type": "text",
        "text": "Giant Clocktower",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "4fc7a36b97354c06",
        "type": "text",
        "text": "Crystal Protrusion",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "c8f0a40bf07dae84",
        "type": "text",
        "text": "Arcane Obelisk",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "022b66758ed785ae",
        "type": "text",
        "text": "Forsaken Lighthouse",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "4e5f44b6ef65d277",
        "type": "text",
        "text": "Hollow Tree",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "4dd8e7164e618a61",
        "type": "text",
        "text": "Twisted Spire",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "74836e4cc6c9735d",
        "type": "text",
        "text": "Enchanted Windmill",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "5b82d3d076888980",
        "type": "text",
        "text": "Glass Turret",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "d978ddb6fc91bfdc",
        "type": "text",
        "text": "Stonework Tower",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "c71b305872a2bd15",
        "type": "text",
        "text": "Bone Keep",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 700,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "7122639e0d1e9ac5",
    "name": "Wizard Towers: Occupant",
    "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
    "description": "<p>Wizard Towers: <em>Occupant</em> column. Roll d10 (FLAIL v0.2 p.84). Use with the <em>Build Wizard Tower</em> macro to roll all four columns at once.</p>",
    "formula": "1d10",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "1efc23b65f97f245",
        "type": "text",
        "text": "Pyromancer",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "7d5e2ccb4443f966",
        "type": "text",
        "text": "Cryomancer",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "375eaa8b5fa1041e",
        "type": "text",
        "text": "Conjurer",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "f54b75e0e66bc422",
        "type": "text",
        "text": "Illusionist",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "b0689905d9b6814b",
        "type": "text",
        "text": "Warlock",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "49f4174279fada99",
        "type": "text",
        "text": "Necromancer",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "82f09e77788de4ce",
        "type": "text",
        "text": "Sorcerer",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "73052d5649d5fc9f",
        "type": "text",
        "text": "Thaumaturge",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "107be7ae5e1881ae",
        "type": "text",
        "text": "Chronomancer",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "cfbc82626c776d0d",
        "type": "text",
        "text": "Geomancer",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 710,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "ef3ea76367e5f7a2",
    "name": "Wizard Towers: Reaction",
    "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
    "description": "<p>Wizard Towers: <em>Reaction</em> column. Roll d10 (FLAIL v0.2 p.84). Use with the <em>Build Wizard Tower</em> macro to roll all four columns at once.</p>",
    "formula": "1d10",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "d0a2f1e802667c6e",
        "type": "text",
        "text": "Kill characters",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "a17ad628197ef755",
        "type": "text",
        "text": "Trick characters",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "67e875cf1ec0a3ea",
        "type": "text",
        "text": "Befriend characters",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "fda0661727213a6a",
        "type": "text",
        "text": "Hire characters",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "e901ea1fa9497515",
        "type": "text",
        "text": "Help characters",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "6c3ae31c6efb48a0",
        "type": "text",
        "text": "Lure characters",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "5b78fcc50fbad001",
        "type": "text",
        "text": "Imprison characters",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "ac4c641e71706316",
        "type": "text",
        "text": "Teleport characters",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "42d15fdacaa45086",
        "type": "text",
        "text": "Transform characters",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "3cedb5b29ea81518",
        "type": "text",
        "text": "Steal characters",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 720,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "b77c470c51971606",
    "name": "Wizard Towers: Goal",
    "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
    "description": "<p>Wizard Towers: <em>Goal</em> column. Roll d10 (FLAIL v0.2 p.84). Use with the <em>Build Wizard Tower</em> macro to roll all four columns at once.</p>",
    "formula": "1d10",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "41326bbc5a183747",
        "type": "text",
        "text": "Rule the world",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "abff051d75c6915b",
        "type": "text",
        "text": "Raise army",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "6d286d114192db97",
        "type": "text",
        "text": "Open portal",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "1f6fd260e072cc40",
        "type": "text",
        "text": "Spread curse",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "d80f3ec37fc4f9e4",
        "type": "text",
        "text": "Invoke monster",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "219388a8c136d1a3",
        "type": "text",
        "text": "Craft magic item",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "cd32868f67da0341",
        "type": "text",
        "text": "Unleash cataclysm",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "59a2a284ff87469d",
        "type": "text",
        "text": "Raise disciples",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "09976a515cb65c28",
        "type": "text",
        "text": "Perform ritual",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      },
      {
        "_id": "ce26834b93d8dc15",
        "type": "text",
        "text": "Be left alone",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 730,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "6641c16e3e8a0422",
    "name": "Caves: Flavour",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "description": "<p>Caves: <em>Flavour</em> column. Roll d6 (FLAIL v0.2 p.86). Use with the <em>Build Cave</em> macro to roll all five columns at once.</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "b021e35465a4cc7a",
        "type": "text",
        "text": "Dark",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "476eb45fd930906b",
        "type": "text",
        "text": "Hidden",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "226516e541132dd7",
        "type": "text",
        "text": "Mystic",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "e6cd6568fcc658ce",
        "type": "text",
        "text": "Forgotten",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "e8f633143813d6dd",
        "type": "text",
        "text": "Infested",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "cfa57e241d17531d",
        "type": "text",
        "text": "Haunted",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 800,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "eb903d3f4cbeccf9",
    "name": "Caves: Type",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "description": "<p>Caves: <em>Type</em> column. Roll d6 (FLAIL v0.2 p.86). Use with the <em>Build Cave</em> macro to roll all five columns at once.</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "cd40f0e9851e9c10",
        "type": "text",
        "text": "Lair",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "a8ba1eb9ab84cc58",
        "type": "text",
        "text": "Cavern",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "0c24d96e95a270b5",
        "type": "text",
        "text": "Grotto",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "d277b19c97388ff2",
        "type": "text",
        "text": "Hollows",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "c5a2831d190244c1",
        "type": "text",
        "text": "Burrow",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "e00d109316f9ba42",
        "type": "text",
        "text": "Mines",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 810,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "504c638b5e511c09",
    "name": "Caves: Location",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "description": "<p>Caves: <em>Location</em> column. Roll d6 (FLAIL v0.2 p.86). Use with the <em>Build Cave</em> macro to roll all five columns at once.</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "5ec14a77babc43c2",
        "type": "text",
        "text": "Dormant volcano",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "f26109dce89e7f01",
        "type": "text",
        "text": "Primeval mountain",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "3e474372febb48d7",
        "type": "text",
        "text": "Verdant sinkhole",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "8c7898380addf389",
        "type": "text",
        "text": "Precarious cliffside",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "64d34a3ce2b324c1",
        "type": "text",
        "text": "Rugged canyon",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "60420a747a88bfdb",
        "type": "text",
        "text": "Abyssal chasm",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 820,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "760f5425f8ff7aa7",
    "name": "Caves: Key Feature",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "description": "<p>Caves: <em>Key Feature</em> column. Roll d6 (FLAIL v0.2 p.86). Use with the <em>Build Cave</em> macro to roll all five columns at once.</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "f179f0503a9f91c6",
        "type": "text",
        "text": "Freezing fog",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "5baf22f3df7adf98",
        "type": "text",
        "text": "Warm lava tubes",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "3426448ae0c19a7a",
        "type": "text",
        "text": "Flooded to the waist",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "df58d6289e10e966",
        "type": "text",
        "text": "Overgrown with roots",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "3ca00b78aa855566",
        "type": "text",
        "text": "Crystalized veins",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "020571612971901c",
        "type": "text",
        "text": "Stalactite-ridden",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 830,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "6a7d0f4ea666ae7d",
    "name": "Caves: Creatures",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "description": "<p>Caves: <em>Creatures</em> column. Roll d6 (FLAIL v0.2 p.86). Use with the <em>Build Cave</em> macro to roll all five columns at once.</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "2416d0d424dc650b",
        "type": "text",
        "text": "Reptiles",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "19f5f75c16803f03",
        "type": "text",
        "text": "Amphibians",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "4eb275fc8f0abe16",
        "type": "text",
        "text": "Birds",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "aeed2adc0f66cd19",
        "type": "text",
        "text": "Insects",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "4db3693789e15348",
        "type": "text",
        "text": "Giants",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      },
      {
        "_id": "86260a474e95f7d2",
        "type": "text",
        "text": "Dragons",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 840,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "93fda97d45422e9f",
    "name": "Cave Chamber Contents",
    "img": "icons/consumables/eggs/egg-cracked-white.webp",
    "description": "<p>Cave chamber stocking (FLAIL v0.2 p.86, step 2). Roll d6 for each chamber's content. Entries 1-2 have d4 sub-rolls; entry 3 refers to the Obstacle table.</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "27a938fce4b56ca9",
        "type": "text",
        "text": "<strong>Treasure:</strong> Roll d4: (1) buried chest, (2) weapons cache, (3) spellbook, (4) Unique Item.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/consumables/eggs/egg-cracked-white.webp",
        "flags": {}
      },
      {
        "_id": "4a008df908e36804",
        "type": "text",
        "text": "<strong>Vestiges:</strong> Roll d4: (1) bone altar, (2) makeshift shelter, (3) burial mound, (4) warding totem.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/consumables/eggs/egg-cracked-white.webp",
        "flags": {}
      },
      {
        "_id": "29138dcf5d21da7b",
        "type": "text",
        "text": "<strong>Obstacle:</strong> Roll or choose a fitting dungeon obstacle (p.81, Obstacle table).",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/consumables/eggs/egg-cracked-white.webp",
        "flags": {}
      },
      {
        "_id": "a9758cf7eda11ca8",
        "type": "text",
        "text": "<strong>Weak encounter:</strong> Pick or create a weak creature matching the rolled theme.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/consumables/eggs/egg-cracked-white.webp",
        "flags": {}
      },
      {
        "_id": "9385cbf4462d47e3",
        "type": "text",
        "text": "<strong>Average encounter:</strong> Pick or create an average creature matching the rolled theme.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/consumables/eggs/egg-cracked-white.webp",
        "flags": {}
      },
      {
        "_id": "13fe8e7bf832bb66",
        "type": "text",
        "text": "<strong>Strong encounter:</strong> Pick or create a powerful creature matching the rolled theme.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/consumables/eggs/egg-cracked-white.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 900,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "dd69b6521681926d",
    "name": "Cave Tunnel Encounter",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "description": "<p>Cave tunnel encounters (FLAIL v0.2 p.86, step 3). When a character walks into a tunnel, roll d6 first; on 5-6, roll a second d6 on this table for the encounter type. Most entries include a d4 sub-roll.</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "4c80fd4f90a25c50",
        "type": "text",
        "text": "<strong>Hazard:</strong> Roll d4: (1) ceiling collapses, (2) sudden flood, (3) igniting gas draft, (4) covered pitfall.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "f51f146e92aa2b6f",
        "type": "text",
        "text": "<strong>Wandering monster:</strong> Random encounter with a creature matching the rolled theme.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "c881075a93926061",
        "type": "text",
        "text": "<strong>Odd anomaly:</strong> Roll or choose a fitting dungeon anomaly (p.81, Anomaly table).",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "eec1f09c47347ef8",
        "type": "text",
        "text": "<strong>Corpse:</strong> Roll d4: (1) coins and torches, (2) climbing gear, (3) monster skull, (4) random weapon.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "73ce08a4d6db128c",
        "type": "text",
        "text": "<strong>Markings:</strong> Roll d4: (1) cave art, (2) primitive hands, (3) ancient prophecy, (4) beastly footprints.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      },
      {
        "_id": "7219ccb348d75504",
        "type": "text",
        "text": "<strong>Eerie sounds:</strong> Roll d4: (1) growling, (2) distant drumming, (3) screeching echo, (4) whispers.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 910,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "a4498b42d745fee1",
    "name": "Weak Potions",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>Randomly determine which weak potion results from a mix of ingredients from different reagent categories (FLAIL v0.2 pp.112-113).</p>",
    "formula": "1d12",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "a0f9dce7452080a0",
        "type": "text",
        "text": "<strong>Boost Shot:</strong> +2 STR for one day.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "3811e9c76bc01733",
        "type": "text",
        "text": "<strong>Potion of Healing:</strong> Cures d6 hit points.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9767621883cfacea",
        "type": "text",
        "text": "<strong>Slippery Perspiration:</strong> Grants Defence 1 for one day.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "d7eaf6b96e5d0ab4",
        "type": "text",
        "text": "<strong>Brain Lift:</strong> +1 INT for one day.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "0c09fda8a0d4838f",
        "type": "text",
        "text": "<strong>Potion of Agility:</strong> +1 DEX for one day.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b75dc8c7a993420d",
        "type": "text",
        "text": "<strong>Power Tonic:</strong> +1 TH for the duration of one entire combat.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "16d46e7bdbbb019f",
        "type": "text",
        "text": "<strong>Underwater Breathing:</strong> Grants underwater breathing for one turn.",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "38ee07be6a5fa48c",
        "type": "text",
        "text": "<strong>Sweet Fragrance:</strong> +1 CHA for one day.",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "319a4a0599bb7a04",
        "type": "text",
        "text": "<strong>Prismatic Serum:</strong> Drinker's hair turns into a random colour. Forever.",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "0e9081d5b40b9018",
        "type": "text",
        "text": "<strong>Phobos Mix:</strong> Drinker gains fear of a random creature type.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b7fde53f4bdb39e3",
        "type": "text",
        "text": "<strong>Blend of the Buffoon:</strong> -d4 LUCK for one day.",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "932dc38548fbec34",
        "type": "text",
        "text": "<strong>Fool's Mix:</strong> -2 DEX for one day.",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "e5e111bae9f3b11f",
    "name": "Strong Potions",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>Randomly determine which strong potion results from a mix of ingredients from different reagent categories (FLAIL v0.2 pp.112-113).</p>",
    "formula": "1d12",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "f38b0e2c5334f651",
        "type": "text",
        "text": "<strong>Potion of Reflexes:</strong> Drinker can make three attacks in one round of combat. Lasts one round.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "6c1a752f7e3610a3",
        "type": "text",
        "text": "<strong>Tonic of Faith:</strong> Drinker can choose any one future roll to succeed in.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "5ac4154b0226e70d",
        "type": "text",
        "text": "<strong>Elixir of Might:</strong> +4 DMG for the duration of one entire combat.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "8d8e064e6e6663e0",
        "type": "text",
        "text": "<strong>Supreme Superglue:</strong> Glues anything together forever.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "72e42fb5f162484f",
        "type": "text",
        "text": "<strong>Potion of Mana:</strong> Restores 2d4 mana instantly (Wizards only).",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "1fa1cd2b2420bc9f",
        "type": "text",
        "text": "<strong>Mind Mixture:</strong> Grants advantage to INT for d6 turns.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "0b760fe8efdb86cf",
        "type": "text",
        "text": "<strong>Fake Death:</strong> Drinker dies for 30 minutes; returns to life unharmed after that.",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "678cc038f1a0e706",
        "type": "text",
        "text": "<strong>Restorative Brine:</strong> Heals all hit points.",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "ca76210c82067f42",
        "type": "text",
        "text": "<strong>Passion Tonic:</strong> Two characters become infatuated with each other.",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "1f0c8db430d3bffa",
        "type": "text",
        "text": "<strong>Cerebral Link:</strong> Drinker may spellcast like a Wizard for two turns. Max mana equals INT score.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "e591cd7453d1bba0",
        "type": "text",
        "text": "<strong>Potion of Partial Invisibility:</strong> Drinker becomes invisible except their gear/clothes for two turns.",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "4cd607bfa7484784",
        "type": "text",
        "text": "<strong>Radiant Aura:</strong> Grants Defence 3 for one day.",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "27cc448aab7a4de7",
    "name": "Mighty Potions",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>Randomly determine which mighty potion results from a mix of ingredients from different reagent categories (FLAIL v0.2 pp.112-113).</p>",
    "formula": "1d10",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "d8b267d542771f42",
        "type": "text",
        "text": "<strong>Brute Force:</strong> +2 TH for the duration of one entire combat.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "5d2c56c441631cbf",
        "type": "text",
        "text": "<strong>Clairvoyant Mix:</strong> Drinker can see into d4 remote locations of choice. Lasts one turn.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "721477b88458a391",
        "type": "text",
        "text": "<strong>Gaseous Form:</strong> Drinker assumes a vaporous form for up to six turns.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "cc2ad95921cc5f10",
        "type": "text",
        "text": "<strong>Mindwipe Brew:</strong> Drinker forgets all that happened in the last two days.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "0780ead2f1b08d43",
        "type": "text",
        "text": "<strong>Rejuvenescent Tincture:</strong> Removes a persistent Injury condition.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b6b121ae9baec7da",
        "type": "text",
        "text": "<strong>Elixir of Life:</strong> Revives a person who died in the last 24 hours.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "4a15b470d1517039",
        "type": "text",
        "text": "<strong>Potion of the Mosquito:</strong> Drinker turns into a fly for six turns.",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "af890dc4a8e41c5f",
        "type": "text",
        "text": "<strong>Telepathic Drops:</strong> Drinker may speak with another character remotely no matter the distance.",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "c3fcfe3a1e186d86",
        "type": "text",
        "text": "<strong>Tongue of Babel:</strong> Grants the ability to understand every language, including animals and monsters.",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "f0a578e4115c7744",
        "type": "text",
        "text": "<strong>Potion of Invisibility:</strong> Drinker becomes invisible, gear included, for up to six turns.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "a226ce658fc025e6",
    "name": "City Origin Story",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>One of six theme d20 columns (FLAIL v0.2 p.114). Determines how the city came to be.</p>",
    "formula": "1d20",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "c47a119be3550259",
        "type": "text",
        "text": "Nomadic camp turned city",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "c052f4a9c45b2708",
        "type": "text",
        "text": "Mythic battleground ruins",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "fe14b7f918a85291",
        "type": "text",
        "text": "Religious pilgrimage site",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "1e5a539b2dd11ff7",
        "type": "text",
        "text": "Trade crossroads",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9b917a1322c1511b",
        "type": "text",
        "text": "Centre of antique empire",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "1fe58e62e6c75ba8",
        "type": "text",
        "text": "Built atop meteor crater",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "196ad47c8bdd0b9f",
        "type": "text",
        "text": "Reclaimed necropolis",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9feeda7529c56d36",
        "type": "text",
        "text": "Arcane catastrophe site",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "ab68581fddcad72a",
        "type": "text",
        "text": "Titan's graveyard",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "636259c29e4fd2f5",
        "type": "text",
        "text": "World's first library",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "025fcf7517c7515a",
        "type": "text",
        "text": "Founded to guard relic",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "3e7f7867656bddd3",
        "type": "text",
        "text": "Magic leyline convergence",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "3a8d65bce467cc4d",
        "type": "text",
        "text": "Antique frontier outpost",
        "range": [
          13,
          13
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "759322a69f4d0cf1",
        "type": "text",
        "text": "Ruins of an ancient cult",
        "range": [
          14,
          14
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "daee1b42e2bb6e01",
        "type": "text",
        "text": "Burial site of cursed king",
        "range": [
          15,
          15
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b5579dbe3728892f",
        "type": "text",
        "text": "Fabled hero's birthplace",
        "range": [
          16,
          16
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "85593f8139caa3ff",
        "type": "text",
        "text": "Sanctuary for refugees",
        "range": [
          17,
          17
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "c214243feb4c0574",
        "type": "text",
        "text": "Survivors of cataclysm",
        "range": [
          18,
          18
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "8a7b00c4b0dde5d5",
        "type": "text",
        "text": "Sacred frog swamp",
        "range": [
          19,
          19
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b4b7beac75bf78f0",
        "type": "text",
        "text": "Mage's failed experiment",
        "range": [
          20,
          20
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "856b2f69247ce965",
    "name": "City Main Defence",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>One of six theme d20 columns (FLAIL v0.2 p.114).</p>",
    "formula": "1d20",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "80539372261a67b8",
        "type": "text",
        "text": "Gigantic walls & ballistae",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "522145cd7653d6f5",
        "type": "text",
        "text": "Enchanted frog moat",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "cf19eaa1fe1bd90d",
        "type": "text",
        "text": "Blinding light beacons",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "2b7968d20fbe20ea",
        "type": "text",
        "text": "Poisoned cloud vents",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "409501c376ce6f26",
        "type": "text",
        "text": "Invisible energy fields",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "392c845284cb7613",
        "type": "text",
        "text": "Boiling oil dispensers",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9b10de89d028ef25",
        "type": "text",
        "text": "Massive sentient vines",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "106c6a0787948f38",
        "type": "text",
        "text": "Charmed [MONSTER]",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "5d4180d1f9e3a375",
        "type": "text",
        "text": "Patrolling constructs",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "6de3e14078d55dc9",
        "type": "text",
        "text": "Lava-filled trenches",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "a9b6d363712051c2",
        "type": "text",
        "text": "Massive bone walls",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "cc2570a3c8f1cbb2",
        "type": "text",
        "text": "Sonic deterrent towers",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "851e627e4f25d6d6",
        "type": "text",
        "text": "Acid-spraying nozzles",
        "range": [
          13,
          13
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "daa91e9ba5482a11",
        "type": "text",
        "text": "Rotating blade walls",
        "range": [
          14,
          14
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "69cf89ae1c7f2f4e",
        "type": "text",
        "text": "Lightning-charged walls",
        "range": [
          15,
          15
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "bb6da75e1767c6ce",
        "type": "text",
        "text": "Eternal flame moat",
        "range": [
          16,
          16
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "a585f3ef49290395",
        "type": "text",
        "text": "Explosive rune traps",
        "range": [
          17,
          17
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "546c02a4c2030756",
        "type": "text",
        "text": "Shifting maze walls",
        "range": [
          18,
          18
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "abd1ebdd68ec36f5",
        "type": "text",
        "text": "Flame-throwing turrets",
        "range": [
          19,
          19
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "86ba437067051301",
        "type": "text",
        "text": "Domesticated dragon",
        "range": [
          20,
          20
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "3a227ed8e8fe39e2",
    "name": "City Notable Feature",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>One of six theme d20 columns (FLAIL v0.2 p.114). Also seeds the Seat of Power.</p>",
    "formula": "1d20",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "50107122c48d16cd",
        "type": "text",
        "text": "Floating central bazaar",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b410d835f46bac69",
        "type": "text",
        "text": "Lush hanging gardens",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "67e75f4637bd1ab2",
        "type": "text",
        "text": "Colossal clock-tower",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "e18124fcf9e657c9",
        "type": "text",
        "text": "Rooftops with beehives",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "1c86804a42485e01",
        "type": "text",
        "text": "Grand colosseum",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "a5cc9e6d7cc99d9b",
        "type": "text",
        "text": "Waterfall terraces",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "34364ef3790dc721",
        "type": "text",
        "text": "Sky-piercing leaning spire",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9aeb1ced931fe82c",
        "type": "text",
        "text": "Aqueduct walls",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "6c5ee1f1c769608d",
        "type": "text",
        "text": "Ivy-draped rooftops",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "f92ea66a86d3cc7f",
        "type": "text",
        "text": "Water canal streets",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "900bbd8cc8d09a1f",
        "type": "text",
        "text": "Sacred central plateau",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "bf0a75ad37c599d7",
        "type": "text",
        "text": "Two giant windmills",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "de30f02df929a072",
        "type": "text",
        "text": "Central glass pyramid",
        "range": [
          13,
          13
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "f34294fe6bacef5f",
        "type": "text",
        "text": "Levitating obelisk",
        "range": [
          14,
          14
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "ac6e0e78d5b15588",
        "type": "text",
        "text": "Ornate snake gates",
        "range": [
          15,
          15
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "8e188edde1bea288",
        "type": "text",
        "text": "Hulking frog statue",
        "range": [
          16,
          16
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "afb70c76d22b157e",
        "type": "text",
        "text": "Public monster menagerie",
        "range": [
          17,
          17
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9581c5a91448d335",
        "type": "text",
        "text": "Eternal flame fountain",
        "range": [
          18,
          18
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "75686f8150f6868c",
        "type": "text",
        "text": "All buildings are pink",
        "range": [
          19,
          19
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "835c3fbe9b97ab39",
        "type": "text",
        "text": "Red cobblestone streets",
        "range": [
          20,
          20
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "2072c88137d7aeea",
    "name": "City Government",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>One of six theme d20 columns (FLAIL v0.2 p.115). Also seeds the Seat of Power.</p>",
    "formula": "1d20",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "06c02a5d6ee6de42",
        "type": "text",
        "text": "Eternal child ruler",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "68945a1053ad8998",
        "type": "text",
        "text": "Apocalyptic cult tyranny",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "8862a4aa6bbd9bce",
        "type": "text",
        "text": "Crime guilds consortium",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "95c62fa5d45b400b",
        "type": "text",
        "text": "Sacred monk congress",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9347cd6a688b537c",
        "type": "text",
        "text": "Eye wizards' conclave",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "45a4940eb3ffe012",
        "type": "text",
        "text": "Anarchist commune",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "0bc33ef231b62433",
        "type": "text",
        "text": "Representative democracy",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "146bdb7d6b569dc7",
        "type": "text",
        "text": "Merchant oligarchy",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "bacfaf84c8b1964d",
        "type": "text",
        "text": "Warlock dictatorship",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "21e0ab4c38b60756",
        "type": "text",
        "text": "Ageless elder council",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "3a8eafaedee4c039",
        "type": "text",
        "text": "Oracle-guided monarchy",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "5271a83ef9dcd613",
        "type": "text",
        "text": "Construct technocracy",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "5d6bcf393394fcdd",
        "type": "text",
        "text": "Shapeshifter cabal",
        "range": [
          13,
          13
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "af8e2dce7f2c83e2",
        "type": "text",
        "text": "Ancient Ent parliament",
        "range": [
          14,
          14
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "69245ca1f2b3c41c",
        "type": "text",
        "text": "Ironclad knight roundtable",
        "range": [
          15,
          15
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b5faad0f8215bad4",
        "type": "text",
        "text": "Pharaonic theocracy",
        "range": [
          16,
          16
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "6f8fec955408f97e",
        "type": "text",
        "text": "Solar priesthood",
        "range": [
          17,
          17
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "c3c2227471eca2b5",
        "type": "text",
        "text": "Dragonkin matriarchy",
        "range": [
          18,
          18
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b4e42a00b6ef1bf6",
        "type": "text",
        "text": "Pirate king autocracy",
        "range": [
          19,
          19
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "188294ac46bf2e1e",
        "type": "text",
        "text": "Undead lord regency",
        "range": [
          20,
          20
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "428953e862d58be1",
    "name": "City Industry & Trade",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>One of six theme d20 columns (FLAIL v0.2 p.115). Feeds several building descriptions.</p>",
    "formula": "1d20",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "181736a0005270da",
        "type": "text",
        "text": "Dragon scale weaving",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "cd43d633faafab48",
        "type": "text",
        "text": "Rare spices & healing herbs",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b1f88861912518ea",
        "type": "text",
        "text": "Skilled mercenaries",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "796d00e165e85e44",
        "type": "text",
        "text": "Arcane items & spellbooks",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "ef78f58204f888b3",
        "type": "text",
        "text": "Wine and luxury foods",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "6294141667deda4c",
        "type": "text",
        "text": "Exotic pets import-export",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "569103aacac2f96c",
        "type": "text",
        "text": "Precious gems & minerals",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "42cacb985cc6a941",
        "type": "text",
        "text": "Sentient plant breeding",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "6af43b72eba89d4f",
        "type": "text",
        "text": "Weird musical instruments",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "322ee784dc78a948",
        "type": "text",
        "text": "Astral tourism",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "4193a6ddf29cf808",
        "type": "text",
        "text": "Exquisite wooden furniture",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "888488dce0dfc9cb",
        "type": "text",
        "text": "Improved weapons",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "5204312f31d88c83",
        "type": "text",
        "text": "Counterfeit magic items",
        "range": [
          13,
          13
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "e18f7346ae34888e",
        "type": "text",
        "text": "Pattern-shifting rugs",
        "range": [
          14,
          14
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "212285622604974d",
        "type": "text",
        "text": "Clockwork & gadgets",
        "range": [
          15,
          15
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "77a27a5a5cd732a4",
        "type": "text",
        "text": "Magic scrolls & riddles",
        "range": [
          16,
          16
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "1371f2d515f5e068",
        "type": "text",
        "text": "Enchanted armour & robes",
        "range": [
          17,
          17
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "38611f63960ede9e",
        "type": "text",
        "text": "All things sport",
        "range": [
          18,
          18
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "d1b54d77cf78e7f1",
        "type": "text",
        "text": "Poetry",
        "range": [
          19,
          19
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "f9927f07ed534d25",
        "type": "text",
        "text": "Esoteric & erotic scrolls",
        "range": [
          20,
          20
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "cac1a805767a1ff4",
    "name": "City Oddity",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>One of six theme d20 columns (FLAIL v0.2 p.115).</p>",
    "formula": "1d20",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "9f5752d1ece5333b",
        "type": "text",
        "text": "Everyone wears a mask",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "dd108cf45cc8c05b",
        "type": "text",
        "text": "Music from unseen sources",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9708f92b1269e399",
        "type": "text",
        "text": "Cats are considered sacred",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "f45a071060c86b17",
        "type": "text",
        "text": "Unintelligible language",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9248ac8be2947df8",
        "type": "text",
        "text": "Buildings relocate nightly",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "056e962313e2e684",
        "type": "text",
        "text": "Ghosts walk the streets",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "18170e16e7b40b24",
        "type": "text",
        "text": "Every resident has a twin",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "c78f48264a941be4",
        "type": "text",
        "text": "Animals outnumber people",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "5e4f2e4e7f72b0e0",
        "type": "text",
        "text": "Residents cast no shadows",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "c6aea5d2bb8a8159",
        "type": "text",
        "text": "Plants glow softly at night",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "bec734d3c92a1806",
        "type": "text",
        "text": "All food is in grayscale",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "e4acb1f13022c533",
        "type": "text",
        "text": "None speak aloud in public",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "8daeda8ed946955a",
        "type": "text",
        "text": "Fish swim through the air",
        "range": [
          13,
          13
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "d8134a18548d2776",
        "type": "text",
        "text": "Gambling is compulsory",
        "range": [
          14,
          14
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "3a64dd8da21bb52c",
        "type": "text",
        "text": "Sudden swarms of insects",
        "range": [
          15,
          15
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "1492bf9a336b0e75",
        "type": "text",
        "text": "All fires burn green",
        "range": [
          16,
          16
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "63323e9e3f15982f",
        "type": "text",
        "text": "Adhered to monotheism",
        "range": [
          17,
          17
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "7b71476b846ac368",
        "type": "text",
        "text": "Everyone speaks in rhymes",
        "range": [
          18,
          18
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "65e0e95610fcc310",
        "type": "text",
        "text": "Live beetles act as currency",
        "range": [
          19,
          19
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b6c0714aa7a5c8c2",
        "type": "text",
        "text": "Eyes turn silver at dusk",
        "range": [
          20,
          20
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "44a7f1fae94262de",
    "name": "City Event",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>What is happening? Roll d6 when entering a new town (FLAIL v0.2 p.115).</p>",
    "formula": "1d6",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "239f0c408f7bc55e",
        "type": "text",
        "text": "<strong>War:</strong> all prices doubled.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "c02798c710bbae33",
        "type": "text",
        "text": "<strong>Plague:</strong> medicine scarcity.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "8f40af433561af8f",
        "type": "text",
        "text": "<strong>Bad Harvest:</strong> food prices tripled.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "4d3a0307a7f207f6",
        "type": "text",
        "text": "<strong>Eminent raid:</strong> invaders come in d6 days.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b0bf7b9c7fed6904",
        "type": "text",
        "text": "<strong>Peace:</strong> all is calm.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "97f028680b3adad8",
        "type": "text",
        "text": "<strong>Abundance:</strong> all prices halved.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "3d56d6ae02b18eb9",
    "name": "Tavern Name 1",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>Tavern name prefix (FLAIL v0.2 p.115).</p>",
    "formula": "1d10",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "f3f4eca4e43a4857",
        "type": "text",
        "text": "The Drunken",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "8bbae6a332c57a28",
        "type": "text",
        "text": "The Golden",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "bde22dbb165a1f4c",
        "type": "text",
        "text": "The Broken",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "1006da72d6472679",
        "type": "text",
        "text": "The Laughing",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "2b689a2a0d64854f",
        "type": "text",
        "text": "The Howling",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "6c9b8ed175f564dc",
        "type": "text",
        "text": "The Crooked",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "12bc96e15e6e848c",
        "type": "text",
        "text": "The Jagged",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "80373f911d8e0505",
        "type": "text",
        "text": "The Whispering",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "64b67bf970b1a773",
        "type": "text",
        "text": "The Dancing",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "4d35170980311a1a",
        "type": "text",
        "text": "The Boiling",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "994b202cfb13970c",
    "name": "Tavern Name 2",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>Tavern name suffix (FLAIL v0.2 p.115).</p>",
    "formula": "1d10",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "d3904f2d5994c6c3",
        "type": "text",
        "text": "Duck",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9f07037c24f3beca",
        "type": "text",
        "text": "Griffin",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b177e114c3ef6293",
        "type": "text",
        "text": "Goose",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "12c4d952f44dd1a7",
        "type": "text",
        "text": "Dagger",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "cfd9b5f077bdc790",
        "type": "text",
        "text": "Minotaur",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b8693ebfc2aac3f5",
        "type": "text",
        "text": "Moon",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9f3b0cc418e49f14",
        "type": "text",
        "text": "Kraken",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "1ebde5ee79bdaa17",
        "type": "text",
        "text": "Crown",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "cd68cae6958b601c",
        "type": "text",
        "text": "Cauldron",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "571bf61262e0e386",
        "type": "text",
        "text": "Anchor",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "a7c4d0ee8b3420bd",
    "name": "Tavern Meal",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>Tavern specialty meal (FLAIL v0.2 p.115).</p>",
    "formula": "1d10",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "2cdfae3ca189ebd0",
        "type": "text",
        "text": "Electric eel gumbo ($)",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "57a8ffbf0471cc5f",
        "type": "text",
        "text": "Crab legs tom yum ($)",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "e7ebf006310fb0cc",
        "type": "text",
        "text": "Fire-grilled snake skewers ($)",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "20ac571ae585cab5",
        "type": "text",
        "text": "Barbecue lizard ribs ($)",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "0f37e1ad8017b856",
        "type": "text",
        "text": "Honey-glazed frog legs ($$)",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "f93c834fca8c4c9a",
        "type": "text",
        "text": "Cactus flower tempura ($$)",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "2d975330d879dc5c",
        "type": "text",
        "text": "Bat wings with hot dip ($$)",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "c2baed74a0690e0d",
        "type": "text",
        "text": "Fake dragon meatballs ($$)",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "08680fc5a357e296",
        "type": "text",
        "text": "Levitating quail pie ($$$)",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "2baa840f5b954410",
        "type": "text",
        "text": "Kraken ink pasta ($$$)",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "d1f797be5588611b",
    "name": "Tavern Drink",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>Tavern signature drink (FLAIL v0.2 p.115).</p>",
    "formula": "1d10",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "0924039f00006242",
        "type": "text",
        "text": "Stormbrewer ale",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "867a241d376a67f2",
        "type": "text",
        "text": "Celestial tea",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "2002a42f394d526b",
        "type": "text",
        "text": "Stonebreaker stout",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "6d5786b51612cd83",
        "type": "text",
        "text": "Frostfang pale ale",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "43fc1a302621335e",
        "type": "text",
        "text": "Goldenhoof lager",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "fd3cce6084e26e67",
        "type": "text",
        "text": "Abyssal rum",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "f227948358f86aea",
        "type": "text",
        "text": "Phoenix Fire rotgut",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "bff8d7f77ee23033",
        "type": "text",
        "text": "Troll Blood stout",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "0659de33efc15a96",
        "type": "text",
        "text": "Dragonspine red ale",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b8efa56be93bbd66",
        "type": "text",
        "text": "Serpent's venom",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "483e8cf619156eb0",
    "name": "Civic Buildings",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>Hearts suit (FLAIL v0.2 p.116). Roll d13 or draw a Hearts card. Each entry has 4 variants (d4).</p>",
    "formula": "1d13",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "12eeed9be9c5cef8",
        "type": "text",
        "text": "<strong>2.</strong> Stadium: (1) gladiator arena, (2) naval wars, (3) mage duels, (4) animal races.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9d3cf92f2164ca19",
        "type": "text",
        "text": "<strong>3.</strong> Bathhouse: (1) healing spa, (2) ritual cleansing, (3) hot springs, (4) mud baths.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "11fe0144b746c7c0",
        "type": "text",
        "text": "<strong>4.</strong> Barracks: (1) royal army, (2) city guards, (3) mercenary quarters, (4) militia training.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "2bc8d5df7d36a365",
        "type": "text",
        "text": "<strong>5.</strong> Museum: (1) cryptid skulls, (2) lost civilizations, (3) arcane idols, (4) ancient maps.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "c7346491cc6155e9",
        "type": "text",
        "text": "<strong>6.</strong> Courthouse: (1) crime trials, (2) magical tribunal, (3) guild arbitration, (4) civil bonds.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "1861881a1876001c",
        "type": "text",
        "text": "<strong>7.</strong> Hospital: (1) holy healers, (2) alchemical remedies, (3) mage medics, (4) leper house.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "d88a411d1a147ddf",
        "type": "text",
        "text": "<strong>8.</strong> Theatre: (1) dog circus, (2) opera house, (3) shadow puppetry, (4) mystical illusions.",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "0be07f070e02d87f",
        "type": "text",
        "text": "<strong>9.</strong> Library: (1) public archives, (2) ancient history, (3) exotic books, (4) dead languages.",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "e37c7f79f1516564",
        "type": "text",
        "text": "<strong>10.</strong> Sanctuary: (1) saint's reliquary, (2) pilgrim's site, (3) mausoleum, (4) meditation maze.",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "20fe6af6b4da3b84",
        "type": "text",
        "text": "<strong>J.</strong> University: (1) divination, (2) thaumaturgy, (3) natural sciences, (4) plastic arts.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "682b01d78f173a38",
        "type": "text",
        "text": "<strong>Q.</strong> Monument: (1) mythic war, (2) city's founder, (3) geometric, (4) martyrs memorial.",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "fd5927b4f9cbd0b4",
        "type": "text",
        "text": "<strong>K.</strong> Temple: (1) goddess of war, (2) god of fertility, (3) sun goddess, (4) god of the seas.",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "bb4edb1cfbeef42d",
        "type": "text",
        "text": "<strong>A.</strong> Seat of power: structure inspired by the rolled notable feature and/or government.",
        "range": [
          13,
          13
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "7c93899c7e96089f",
    "name": "Commercial Buildings",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>Diamonds suit (FLAIL v0.2 p.116). Each entry has 4 variants (d4) except Grand port.</p>",
    "formula": "1d13",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "2266f2c20bd92249",
        "type": "text",
        "text": "<strong>2.</strong> Street vendor: (1) remedial herbs, (2) street barber, (3) food wagon, (4) tattoo artist.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "bcc1fc44764697af",
        "type": "text",
        "text": "<strong>3.</strong> Small shop: selling (inferior) goods matching the rolled industry/trade.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "ab4fb5ca91c8243b",
        "type": "text",
        "text": "<strong>4.</strong> Souvenir shop: (1) snow globes, (2) miniature temple, (3) city's tunic, (4) local pottery.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "7a2dae12f68864a8",
        "type": "text",
        "text": "<strong>5.</strong> Alchemist lab: (1) magic potions, (2) energy drinks, (3) explosives, (4) antidotes.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "f513778b8305873c",
        "type": "text",
        "text": "<strong>6.</strong> Tavern: roll random tavern; a legit establishment.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "8f852d567658db55",
        "type": "text",
        "text": "<strong>7.</strong> Large workshop: (1) glassworks, (2) leather tannery, (3) textile mill, (4) blacksmith.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "11263b354abfa551",
        "type": "text",
        "text": "<strong>8.</strong> Auction house: (1) confiscated items, (2) high-end art, (3) mighty potions, (4) relics.",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "8d3f348c823daccf",
        "type": "text",
        "text": "<strong>9.</strong> Grand shop: selling (superior) goods matching the rolled industry.",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "d4f36c592d794c4d",
        "type": "text",
        "text": "<strong>10.</strong> Exotic dealer: (1) rare spices, (2) foreign books, (3) monster parts, (4) bizarre pets.",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "d48ad2c99bcbc39d",
        "type": "text",
        "text": "<strong>J.</strong> Moneylender: (1) debt collector, (2) safe deposits, (3) coin loans, (4) exchange office.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "8d36e6bbf0930264",
        "type": "text",
        "text": "<strong>Q.</strong> Guildhall: (1) cartographers, (2) merchant, (3) explorers, (4) artisans (rolled industry).",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "95b03a8a94578e1c",
        "type": "text",
        "text": "<strong>K.</strong> Grand bazaar: rolled industry + weapons + food + advanced gear + attire.",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "448747f759843f7a",
        "type": "text",
        "text": "<strong>A.</strong> Grand port: shipyard + docks + warehouses + taverns + ships.",
        "range": [
          13,
          13
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "989203137d7aa708",
    "name": "Underworld Buildings",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>Spades suit (FLAIL v0.2 p.117). Each entry has 4 variants (d4).</p>",
    "formula": "1d13",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "bf4aa5ccf4d058ca",
        "type": "text",
        "text": "<strong>2.</strong> Street vendor: (1) psych drugs, (2) fortune telling, (3) potion samples, (4) cursed items.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "23cad0d77f328676",
        "type": "text",
        "text": "<strong>3.</strong> Brothel: (1) fae night-club, (2) pleasure cult, (3) masquerade den, (4) luxury courtesans.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "cbcd2451edb28e8b",
        "type": "text",
        "text": "<strong>4.</strong> Gambling den: (1) alligator pit, (2) card games, (3) beetle races, (4) spectral horse races.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9c1a8d43e15673d3",
        "type": "text",
        "text": "<strong>5.</strong> Secret parlour: (1) blackmail deals, (2) covert pacts, (3) informants, (4) bribery trades.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "026e85506037a633",
        "type": "text",
        "text": "<strong>6.</strong> Thieves souk: (1) enhanced tools, (2) climbing gear, (3) poisons, (4) superior daggers.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "55e96b03048aa4c4",
        "type": "text",
        "text": "<strong>7.</strong> Shrine: (1) chthonic deity, (2) god of chance, (3) goddess of death, (4) patron of thieves.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "42f20b102bcc6c36",
        "type": "text",
        "text": "<strong>8.</strong> Tavern: roll random tavern; a shady illegal tavern.",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "91e77a2df17d0727",
        "type": "text",
        "text": "<strong>9.</strong> Underworld pit: (1) death duels, (2) cock fights, (3) monster duels, (4) construct fights.",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "cc91b3780fec5420",
        "type": "text",
        "text": "<strong>10.</strong> Safehouse: (1) stolen magic swords, (2) hideout, (3) stolen magic scrolls, (4) coin press.",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "edc2296362adb247",
        "type": "text",
        "text": "<strong>J.</strong> Black Market Auction: four random Unique Items at inflated prices.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "4ca2eeeb02fbbc17",
        "type": "text",
        "text": "<strong>Q.</strong> Darksmith: (1) ritual dirks, (2) cursing blades, (3) illegal bows, (4) venomous flails.",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "262dc916de95e5c7",
        "type": "text",
        "text": "<strong>K.</strong> Sanctum: (1) necro-guild, (2) cursed relic vaults, (3) summoning hall, (4) sacrifice altar.",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "8873f1746106d0d2",
        "type": "text",
        "text": "<strong>A.</strong> Guild headquarters: (1) assassins, (2) thieves, (3) smugglers, (4) mercenaries.",
        "range": [
          13,
          13
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  },
  {
    "_id": "b79cfab8a3476800",
    "name": "Residential Buildings",
    "img": "icons/svg/mystery-man.svg",
    "description": "<p>Clubs suit (FLAIL v0.2 p.117). Each entry has 4 variants (d4) except Palace and Castle.</p>",
    "formula": "1d13",
    "replacement": true,
    "displayRoll": true,
    "results": [
      {
        "_id": "8925aebb8d8619ab",
        "type": "text",
        "text": "<strong>2.</strong> Slums: (1) rat infested, (2) made of ship parts, (3) built on stilts, (4) atop sacred ruins.",
        "range": [
          1,
          1
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "9e47f9d6d739089b",
        "type": "text",
        "text": "<strong>3.</strong> Enclave: (1) refugees, (2) foreigners, (3) working-class, (4) quarantined sick.",
        "range": [
          2,
          2
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "25feb65d051dba28",
        "type": "text",
        "text": "<strong>4.</strong> Houseboats: (1) floating shanties, (2) fishermen, (3) traders' docks, (4) odd riverfolk.",
        "range": [
          3,
          3
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "14e0199cd72d39a5",
        "type": "text",
        "text": "<strong>5.</strong> Tenements: (1) overcrowded, (2) run down, (3) crime-ridden, (4) haunted by spirits.",
        "range": [
          4,
          4
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "a9fec87514be58cc",
        "type": "text",
        "text": "<strong>6.</strong> Inn: (1) flea-ridden, (2) bustling tavern inn, (3) traveller lodge, (4) lavish noble retreat.",
        "range": [
          5,
          5
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b5f96209b437f473",
        "type": "text",
        "text": "<strong>7.</strong> Townhouses: (1) guild artisans, (2) skilled labourers, (3) tradesmen, (4) adventurers.",
        "range": [
          6,
          6
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "268241014ddf3b07",
        "type": "text",
        "text": "<strong>8.</strong> Townhouses: (1) merchants, (2) scholars, (3) scribes, (4) retired adventurers.",
        "range": [
          7,
          7
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "4ffa1a46e30e8574",
        "type": "text",
        "text": "<strong>9.</strong> Monastery: (1) ascetic friars, (2) belligerent order, (3) pilgrim wardens, (4) herb healers.",
        "range": [
          8,
          8
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "4122f8143b749cd4",
        "type": "text",
        "text": "<strong>10.</strong> Keep: (1) exiled prince, (2) retired knight, (3) spymaster, (4) disgraced hero.",
        "range": [
          9,
          9
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "b8beaaf63dcf4b73",
        "type": "text",
        "text": "<strong>J.</strong> Villa: (1) wealthy merchant, (2) bankrupt aristocrat, (3) retired general, (4) crime lord.",
        "range": [
          10,
          10
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "0d14ed23a1520d7a",
        "type": "text",
        "text": "<strong>Q.</strong> Tower: (1) elderly wizard, (2) alchemist, (3) famous artist, (4) eccentric inventor.",
        "range": [
          11,
          11
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "717cff73125a685d",
        "type": "text",
        "text": "<strong>K.</strong> Palace: inhabited by ruler matching the rolled theme OR richest NPC in the city.",
        "range": [
          12,
          12
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      },
      {
        "_id": "2844d7b1fecd421b",
        "type": "text",
        "text": "<strong>A.</strong> Castle: inhabited by ruler matching the rolled theme OR military commander.",
        "range": [
          13,
          13
        ],
        "weight": 1,
        "drawn": false,
        "img": "icons/svg/mystery-man.svg",
        "flags": {}
      }
    ],
    "flags": {},
    "sort": 1000,
    "ownership": {
      "default": 0
    },
    "folder": null
  }
];
