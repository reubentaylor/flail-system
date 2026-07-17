/*
 * FLAIL Rolltables — bundled at world creation into the
 * `flail-rolltables` compendium. Currently ships:
 *   • Death Table (d8, p.57)
 *   • Crossing a Hex (2d6, p.68)
 *   • Reactions (2d6, p.68)
 *   • Weather (2d6, p.68)
 *   • Dungeons: Flavour / Type / Location / Key Feature / Creatures
 *     (five d6 columns, p.80). The Build Dungeon macro rolls all five.
 *   • Puzzle (d10, p.81)
 *   • Obstacle (d10, p.81)
 *   • Trap (d10, p.81)
 *   • Anomaly (d12, p.81)
 *   • Wizard Towers: Shape / Occupant / Reaction / Goal
 *     (four d10 columns, p.84). The Build Wizard Tower macro rolls all four.
 *   • Caves: Flavour / Type / Location / Key Feature / Creatures
 *     (five d6 columns, p.86). The Build Cave macro rolls all five
 *     and stocks a handful of chambers with d6+d4 sub-rolls.
 *   • Cave Chamber Contents (d6, p.86) — with cascading d4 sub-rolls.
 *   • Cave Tunnel Encounter (d6, p.86) — with cascading d4 sub-rolls.
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
  }
];
