/**
 * Bundled religions for the Cleric class — first-class Foundry Items
 * seeded into the `world.flail-religions` compendium at world init
 * (v0.4.58 foundation).
 *
 * All four canonicals + one editable "Custom Religion" template.
 * Sourced from the FLAIL rulebook pages 20-23. Prayer names match
 * documents in `world.flail-divine-prayers` — the picker resolves
 * them by UUID after import in the character-side wiring ship.
 */

/**
 * FNV-1a 32-bit hash → 16-char hex ID. Stable across runs for the
 * same seed name, so re-syncing a bundled religion updates the same
 * document rather than creating duplicates.
 */
export function stableReligionId(seed) {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  // Extend to 16 chars by re-hashing the hash string
  const first = h.toString(16).padStart(8, "0");
  let h2 = 0x811c9dc5;
  for (let i = 0; i < first.length; i++) {
    h2 ^= first.charCodeAt(i);
    h2 = (h2 + ((h2 << 1) + (h2 << 4) + (h2 << 7) + (h2 << 8) + (h2 << 24))) >>> 0;
  }
  return (first + h2.toString(16).padStart(8, "0")).slice(0, 16);
}

/**
 * The 4 canonical FLAIL religions + Custom Religion template.
 * Prayer references are populated at compendium-sync time — the
 * `prayers` array here lists names; the sync code resolves them to
 * { uuid, name } once the divine-prayers compendium is available.
 */
export function buildReligionsData() {
  return [
    {
      _id: stableReligionId("religion:brotherhood"),
      name: "Brotherhood of Saint Mendicant",
      type: "religion",
      img: "systems/flail/icons/items/wooden_cross.webp",
      system: {
        tagline: "Popular in cities and feared by merchants, its priests lead an ascetic life.",
        description: "<p>Ascetic priests of the Brotherhood follow the teachings of Sheezuz, God of Justice — a Baby god revered through renunciation and offerings by fearing nobles. They are commonly encountered in cities, where their frugal ways and calls for repentance make merchants and money-lenders squirm.</p>",
        god: {
          name: "Sheezuz",
          title: "God of Justice",
          description: "Baby revered through asceticism and offerings by fearing nobles."
        },
        holySymbol: { name: "Cross of Sheezuz" },
        holySymbolNote: "A small wooden cross, worn openly.",
        weaponSpecialty: [
          { name: "Club" }, { name: "Quarterstaff" }, { name: "Sling" }, { name: "Whip" }
        ],
        armourSpecialty: [],
        armourAllowedText: "No armour, helmet, or boots.",
        prayers: [
          { name: "Cure Disease" },
          { name: "Cure Wound" },
          { name: "Detect Greed" },
          { name: "Finger of Death" },
          { name: "Silence" },
          { name: "Turn Undead" }
        ],
        layOnHandsFumble: "<p>Ally 'loses' d10 coins, OR a random item is confiscated (GM's choice).</p>",
        attributeBonuses: [],
        isCustomTemplate: false
      }
    },
    {
      _id: stableReligionId("religion:crusade"),
      name: "Crusade of the Mutton Chalice",
      type: "religion",
      img: "systems/flail/icons/items/mutton-tunic.png",
      system: {
        tagline: "For a thousand years they've searched for the Woolly Frail.",
        description: "<p>Mystic warrior-clerics of the Crusade have spent centuries seeking the lost relics of Meh, the Mutton of Knowledge. They combine martial devotion with esoteric scholarship.</p>",
        god: {
          name: "Meh",
          title: "Mutton of Knowledge",
          description: "Sustained by mysticism; its clerics vowed to unearth Its relics."
        },
        holySymbol: { name: "Mutton Tunic" },
        holySymbolNote: "A tunic with mutton crest; may be placed atop body armour.",
        weaponSpecialty: [
          { name: "Mace" }, { name: "Maul" }, { name: "Warhammer" }
        ],
        armourSpecialty: [],
        armourAllowedText: "All armour.",
        prayers: [
          { name: "Bless" },
          { name: "Commune" },
          { name: "Holy Shield" },
          { name: "Locate Object" },
          { name: "Quest" },
          { name: "Recall" }
        ],
        layOnHandsFumble: "<p>Roll 1d6. On a <strong>6</strong>, the ally is permanently transformed into a mutton.</p>",
        attributeBonuses: [],
        isCustomTemplate: false
      }
    },
    {
      _id: stableReligionId("religion:shadowDemon"),
      name: "Cult of the Shadow Demon",
      type: "religion",
      img: "systems/flail/icons/items/horned_helmet.webp",
      system: {
        tagline: "Its priests all hail from the Temple of Shadows in Mount Gloom.",
        description: "<p>Hedonistic priests who serve Zor'Vol, Lord of Chaos, appeasing the demon lord through sacrifice and indulgence. They gather in the Temple of Shadows atop Mount Gloom.</p>",
        god: {
          name: "Zor'Vol",
          title: "Lord of Chaos",
          description: "Demon appeased through sacrifices and hedonism."
        },
        holySymbol: { name: "Helm of Zor'Vol" },
        holySymbolNote: "A horned helmet; may also serve as armour.",
        weaponSpecialty: [
          { name: "Flail" }, { name: "Morningstar" }, { name: "Spiked Chain" }
        ],
        armourSpecialty: [],
        armourAllowedText: "All armour.",
        prayers: [
          { name: "Admonish" },
          { name: "Cause Fear" },
          { name: "Conjure Demon" },
          { name: "Curse" },
          { name: "Darkness" },
          { name: "Striking" }
        ],
        layOnHandsFumble: "<p>The ally must roll on the <strong>God's Wrath</strong> table (d10).</p>",
        attributeBonuses: [],
        isCustomTemplate: false
      }
    },
    {
      _id: stableReligionId("religion:verdantGrove"),
      name: "Order of the Verdant Grove",
      type: "religion",
      img: "systems/flail/icons/items/oakleaf_medallion.webp",
      system: {
        tagline: "Protectors of nature, guardians of animal life.",
        description: "<p>Druidic clerics of the Verdant Grove serve Tul, God of Nature, who takes the form of wild animals. They protect wilderness against encroachment and demand that all life be respected.</p>",
        god: {
          name: "Tul",
          title: "God of Nature",
          description: "Takes the form of wild animals and demands nature to be protected."
        },
        holySymbol: { name: "The Oak Leaf" },
        holySymbolNote: "An oak leaf medallion.",
        weaponSpecialty: [
          { name: "Crossbow" }, { name: "Dagger" }, { name: "Longbow" },
          { name: "Short Bow" }, { name: "Spear" }, { name: "Quarterstaff" }
        ],
        armourSpecialty: [
          { name: "Leather Armour" }, { name: "Hide Armour" }
        ],
        armourAllowedText: "Basic or light armour.",
        prayers: [
          { name: "Animal Growth" },
          { name: "Create Food" },
          { name: "Entangle" },
          { name: "Neutralise Poison" },
          { name: "Purify Food" },
          { name: "Speak with Plants" }
        ],
        layOnHandsFumble: "<p>Ally is entangled by spontaneously-growing vines for d4 rounds.</p>",
        attributeBonuses: [],
        isCustomTemplate: false
      }
    },
    {
      _id: stableReligionId("religion:custom"),
      name: "Custom Religion",
      type: "religion",
      img: "icons/svg/mystery-man.svg",
      system: {
        tagline: "A homebrew religion — customise every field.",
        description: "<p>Blank template for homebrew religions. Duplicate this Item, rename it, then fill in the fields below. Drag Divine Prayer items into the Prayers list, and drag holy symbol / weapon / armour items into their respective lists.</p>",
        god: {
          name: "",
          title: "",
          description: ""
        },
        holySymbol: { uuid: "", name: "" },
        holySymbolNote: "",
        weaponSpecialty: [],
        armourSpecialty: [],
        armourAllowedText: "",
        prayers: [],
        layOnHandsFumble: "<p><em>Describe what happens when this religion's Cleric fumbles a Lay on Hands roll.</em></p>",
        attributeBonuses: [],
        isCustomTemplate: true
      }
    }
  ];
}
