/**
 * FLAIL system configuration constants.
 * Single source of truth for class definitions, attribute keys,
 * inventory layout, and item categories.
 */

export const FLAIL = {};

/* -------------------------------------------- */
/*  Attributes                                  */
/* -------------------------------------------- */

FLAIL.attributes = {
  str: { label: "FLAIL.Attribute.Str.long", abbr: "FLAIL.Attribute.Str.abbr" },
  dex: { label: "FLAIL.Attribute.Dex.long", abbr: "FLAIL.Attribute.Dex.abbr" },
  cha: { label: "FLAIL.Attribute.Cha.long", abbr: "FLAIL.Attribute.Cha.abbr" },
  int: { label: "FLAIL.Attribute.Int.long", abbr: "FLAIL.Attribute.Int.abbr" },
  luck: { label: "FLAIL.Attribute.Luck.long", abbr: "FLAIL.Attribute.Luck.abbr" }
};

FLAIL.attributeKeys = Object.keys(FLAIL.attributes);

/* -------------------------------------------- */
/*  Classes                                     */
/* -------------------------------------------- */

/**
 * Each class' fixed parameters. Variable content (talents, spells, gadgets,
 * prayers, gifts, instruments) lives on the character as Item documents.
 */
FLAIL.classes = {
  bard: {
    label: "FLAIL.Class.Bard",
    maxHp: 9,
    mainItem: "instrument",
    armour: ["basic"],
    resource: null,
    weaponSpecialty: ["crossbow", "dagger", "shortBow", "shortSword"],
    specialSkills: [
      { name: "Jack of All Trades", desc: "At each level, add a Cutthroat talent, a Tinkerer's gadget, or a Wizard spell of choice. Use each once per day." },
      { name: "Silver Tongue", desc: "Advantage on CHA saves that involve persuasion, influence, or seducing." },
      { name: "Witness Me!", desc: "When dealing damage in a To Hit while rolling a triplet, deal +d6 damage and allies gain +1 To Hit next round." },
      { name: "Musical Talents", desc: "Add an instrument at levels 1, 3, 5. CHA save to play, then roll on the instrument's table." }
    ]
  },
  boneWhisperer: {
    label: "FLAIL.Class.BoneWhisperer",
    maxHp: 12,
    mainItem: "spiritLantern",
    armour: ["basic"],
    resource: "spirit",
    weaponSpecialty: ["dagger", "flail", "scythe", "shortSword"],
    specialSkills: [
      { name: "Dark Arts", desc: "Spend spirit to cast dark spells. One 6 → Drained; two 6s → side effects; three 6s → retire." },
      { name: "Spirit Harvesting", desc: "Regain spirit on Nearby kills. Two pairs on To Hit summons your Undead Puppet." },
      { name: "Animate Dead", desc: "Spend spirit equal to target level + INT save to revive a corpse as an undead ally." },
      { name: "Speak with the Dead", desc: "Ask a fresh corpse one yes-or-no question. One question per body." }
    ]
  },
  cleric: {
    label: "FLAIL.Class.Cleric",
    maxHp: 12,
    mainItem: "holySymbol",
    armour: [],
    resource: "miracleCalls",
    weaponSpecialty: ["club", "mace", "sling"],
    specialSkills: [
      { name: "Lay on Hands",   desc: "Make a LUCK save to heal other characters." },
      { name: "Miracle Call",   desc: "Beg deity for a spectacular miracle, once per session." },
      { name: "Celestial Aid",  desc: "Take a bonus when rolling a full-house on a To Hit roll." },
      { name: "Divine Prayers", desc: "Cast a prayer by making a LUCK save." }
    ]
  },
  cutthroat: {
    label: "FLAIL.Class.Cutthroat",
    maxHp: 10,
    mainItem: "guildSigil",
    armour: ["basic"],
    resource: "guildTokens",
    weaponSpecialty: ["blowgun", "crossbow", "dagger", "shortSword"],
    specialSkills: [
      { name: "Mark of the Guild",   desc: "Spend tokens for special guild actions; recoup a token on a critical hit or Death Blow." },
      { name: "Darkvision",          desc: "Always see in the dark." },
      { name: "Opportunistic Strike",desc: "Make a new attack immediately when rolling two pairs on a To Hit roll." },
      { name: "Thieving Talents",    desc: "Receive advantage to appropriate attribute when performing the respective action." }
    ]
  },
  druid: {
    label: "FLAIL.Class.Druid",
    maxHp: 13,
    mainItem: null,
    armour: [],
    resource: null,
    weaponSpecialty: ["axe", "bow", "club", "mace", "quarterstaff", "sling", "spear"],
    specialSkills: [
      { name: "Primal Gifts",     desc: "Take two per level; can be activated once per day." },
      { name: "Animal Handling",  desc: "Make a CHA save to tame wild animals." },
      { name: "Shapeshifting",    desc: "Take on the beast shape of the dominant kingdom." },
      { name: "Nature Adept",     desc: "Control small amounts of fire, water, earth or air." }
    ]
  },
  tinkerer: {
    label: "FLAIL.Class.Tinkerer",
    maxHp: 9,
    mainItem: "sparkleOfLife",
    armour: ["basic", "light"],
    resource: "constructPoints",
    weaponSpecialty: ["bow", "blowgun", "dagger", "handAxe", "shortSword"],
    specialSkills: [
      { name: "Resourcefulness", desc: "Only mark usage on gear on 5-6 (instead of 4-6). Repair items by DEX save + marking usage on similar materials." },
      { name: "Quick Craft", desc: "Spend a turn + discard appropriate items to craft a contraption or trap. Roll DEX (advantage scales with discards)." },
      { name: "Gadget Belt", desc: "Start with 4 gadgets, one per type. Add a gadget each level. Triplet on a To Hit = free gadget release." },
      { name: "Construct Companion", desc: "Tinkerers have a construct ally. Each level grants 5 construct points to spend on improvements." }
    ]
  },
  warrior: {
    label: "FLAIL.Class.Warrior",
    maxHp: 14,
    mainItem: null,
    armour: ["basic", "light", "heavy"],
    resource: null,
    weaponSpecialty: [],
    specialSkills: [
      { name: "Extraordinary Feat", desc: "Attempt extraordinary deeds by negotiating a consequence with the GM. (Alt+Click and tick checkbox)" },
      { name: "Weathered", desc: "Once per session, ignore one condition of choice — excluding magical or cursed conditions." },
      { name: "Heavy Lifting", desc: "Advantage on STR saves that involve brute force." },
      { name: "Combat Talents", desc: "Choose one combat talent per level, advancing in one or more trees accordingly." }
    ]
  },
  wizard: {
    label: "FLAIL.Class.Wizard",
    maxHp: 8,
    mainItem: "spellbook",
    armour: [],
    resource: "mana",
    weaponSpecialty: ["dagger", "quarterstaff", "sling"],
    specialSkills: [
      { name: "Master Spellbook",  desc: "Spend mana to cast spells." },
      { name: "Read Magic",        desc: "Make INT save to learn or cast from arcane sources." },
      { name: "Alchemy",           desc: "Mix potions for one less ingredient than usual." },
      { name: "Arcane Resonance",  desc: "Recover mana when rolling pairs while casting." }
    ]
  }
};

FLAIL.classKeys = Object.keys(FLAIL.classes);

/**
 * Cleric religions — chosen at character creation. Determines weapon
 * specialty, deity, holy symbol, armour proficiency, the Lay on Hands
 * fumble effect, and the available divine prayers.
 *
 * The Cleric class config (above) lists "depends on religion" placeholders;
 * these objects fill in the concrete values. Resolved on the sheet via
 * `system.classOptions.religion` keying into this map.
 *
 * Sourced from FLAIL v0.2 page 20.
 */
FLAIL.religions = {
  brotherhood: {
    label:        "Brotherhood of Saint Mendicant",
    blurb:        "Popular in cities and feared by merchants, its priests lead an ascetic life.",
    weapons:      ["club", "quarterstaff", "sling", "whip"],
    weaponsLabel: "club, quarterstaff, sling, whip",
    god:          "Sheezuz, God of Justice",
    godBlurb:     "Baby revered through asceticism and offerings by fearing nobles.",
    holySymbol:   "small wooden cross",
    armour:       "no armour, helmet or boots",
    armourTypes:  [],
    layOnHandsFumble: "Ally 'loses' d10 coins or a random item is confiscated.",
    prayers: [
      { name: "Cure Disease",  text: "Removes Diseased condition; use only [LEVEL] times per session." },
      { name: "Cure Wound",    text: "Removes Injured condition; use only [LEVEL] times per day." },
      { name: "Detect Greed",  text: "Everyone Nearby carrying 30+ coins starts to glow." },
      { name: "Finger of Death", text: "Eliminate a blasphemous, opulent target; target is allowed a save." },
      { name: "Silence",       text: "All sound within Distant range stops for [LEVEL] rounds." },
      { name: "Turn Undead",   text: "Up to [LEVEL] undead creatures Nearby must save, or flee and take d6 damage." }
    ]
  },
  crusade: {
    label:        "Crusade of the Mutton Chalice",
    blurb:        "For a thousand years they've searched for the Woolly Frail.",
    weapons:      ["mace", "maul", "warhammer"],
    weaponsLabel: "mace, maul, warhammer",
    god:          "Meh, Mutton of Knowledge",
    godBlurb:     "Sustained by mysticism, its clerics vowed to unearth Its relics.",
    holySymbol:   "tunic with mutton crest (may be placed atop body armour)",
    armour:       "all armour",
    armourTypes:  ["basic", "light", "heavy"],
    armourTypes:  ["basic", "light", "heavy"],
    layOnHandsFumble: "1-in-6 chance that ally is permanently transformed into a mutton.",
    prayers: [
      { name: "Bless",         text: "[LEVEL] allies Nearby get +1 To Hit in their next round of combat." },
      { name: "Commune",       text: "Ask God a yes-or-no question; use only [LEVEL] times per session." },
      { name: "Holy Shield",   text: "[LEVEL] allies Nearby gain a radiant energy shield with 2d4 hit points." },
      { name: "Locate Object", text: "Sense the location of a previously-touched object." },
      { name: "Quest",         text: "Command someone of same (or inferior) level to perform a specific task." },
      { name: "Recall",        text: "Mark location; may teleport to these coordinates within [LEVEL] + 2 turns." }
    ]
  },
  shadowDemon: {
    label:        "Cult of the Shadow Demon",
    blurb:        "Its priests all hail from the Temple of Shadows in Mount Gloom.",
    weapons:      ["flail", "morningstar", "spikedChain"],
    weaponsLabel: "flail, morningstar, spiked chain",
    god:          "Zor'Vol, Lord of Chaos",
    godBlurb:     "Demon appeased through sacrifices and hedonism.",
    holySymbol:   "horned helmet (may be used as armour)",
    armour:       "all armour",
    layOnHandsFumble: "Ally must roll on the God's Wrath table.",
    prayers: [
      { name: "Admonish",      text: "[LEVEL] adversaries Nearby receive a -1 penalty To Hit in their next round." },
      { name: "Cause Fear",    text: "Forces a Morale save on a target of level [LEVEL] + 2 (or less)." },
      { name: "Conjure Demon", text: "Lasts one turn; hp = d6 + [LEVEL], TH = d3 + [LEVEL], DMG = [LEVEL]." },
      { name: "Curse",         text: "All saves rolled by chosen target automatically fail for [LEVEL] rounds." },
      { name: "Darkness",      text: "Creates an aura of darkness around the caster for up to [LEVEL] turns." },
      { name: "Striking",      text: "Magically enchants weapon for +1 TH/+[LEVEL] DMG for one round." }
    ]
  },
  verdantGrove: {
    label:        "Order of the Verdant Grove",
    blurb:        "Protectors of nature, guardians of animal life.",
    weapons:      ["crossbow", "dagger", "longBow", "shortBow", "spear", "quarterstaff"],
    weaponsLabel: "crossbow, dagger, longbow, short bow, spear, quarterstaff",
    god:          "Tul, God of Nature",
    godBlurb:     "Takes the form of wild animals and demands nature to be protected.",
    holySymbol:   "oak leaf medallion",
    armour:       "basic or light armour",
    armourTypes:  ["basic", "light"],
    layOnHandsFumble: "Ally is entangled by spontaneous vines for d4 rounds.",
    prayers: [
      { name: "Animal Growth",     text: "Enlarges one touched animal; lasts [LEVEL] turns." },
      { name: "Create Food",       text: "Creates [LEVEL] grub item cards." },
      { name: "Entangle",          text: "Conjures vines and roots that restrain up to [LEVEL] targets for [LEVEL] rounds." },
      { name: "Neutralise Poison", text: "Removes Poisoned condition; use only [LEVEL] times per day." },
      { name: "Purify Food",       text: "Purifies up to [LEVEL] grub upon touching them." },
      { name: "Speak with Plants", text: "May gather intel on events up to [LEVEL] days in the past." }
    ]
  }
};

FLAIL.religionKeys = Object.keys(FLAIL.religions);

/**
 * Bone Whisperer Side Effects table — d10 lookup, rolled when a Dark Arts
 * cast turns up two natural 6s. Entries are taken verbatim from FLAIL v0.2
 * page 16. [DICE] and [SUM] tokens reference the original cast's spirit
 * count and dice sum respectively; the chat card substitutes them at roll
 * time so GMs see concrete numbers.
 */
FLAIL.boneWhispererSideEffects = [
  { name: "Ghastly Splendour",  text: "The Bone Whisperer can immediately cast another spell for free." },
  { name: "Unexpected Summon",  text: "The Bone Whisperer summons their puppet as if Spirit Harvesting." },
  { name: "Shards of Bone",     text: "Bone fragments spawn from the Bone Whisperer flying onto [DICE] random allies for [SUM] damage. DEX save for half damage." },
  { name: "Dreadful Screeches", text: "All allies have disadvantage in their next attack." },
  { name: "Bad Revive",         text: "A corpse or pile of bones Nearby (if possible) with [DICE] To Hit and [SUM] damage animates and attacks the Bone Whisperer." },
  { name: "Night Terrors",      text: "Rests do not heal the Bone Whisperer any hit points nor clear conditions for d6 days." },
  { name: "Dead on the Loose",  text: "Summons a Goliath Skeleton that attacks the party uncontrollably." },
  { name: "Disintegrate",       text: "One random target (allies included) within Distant range of the Bone Whisperer must make a save or crumbles in ashes." },
  { name: "The Friend",         text: "Random ally within Distant range becomes undead. Ally is allowed one LUCK save to negate it. On a fail, the Bone Whisperer assumes control of the character as an undead creature." },
  { name: "Dark Deed",          text: "Immediately roll on the Death table." }
];

/**
 * God's Wrath table — d10 lookup, rolled when a Cleric fumbles a prayer
 * cast. Entries taken verbatim from FLAIL v0.2 page 21. The chat card
 * for a fumble surfaces the entry; the GM resolves any narrative or
 * mechanical consequences (damage rolls, condition application, etc.).
 */
FLAIL.godsWrath = [
  { name: "Focus Break",          text: "Lose next round of combat." },
  { name: "Repentance",           text: "Self-inflict d4 damage." },
  { name: "Divine Silence",       text: "Cannot cast more prayers today." },
  { name: "Praying Hands",        text: "Cannot carry weapons today." },
  { name: "Penitent Donation",    text: "Discard one random item." },
  { name: "Stiffening Contrition", text: "Cannot move for d6 rounds." },
  { name: "Atonement",            text: "Self-inflict d8 damage." },
  { name: "Zealotry",             text: "Must attack nearest ally immediately." },
  { name: "Blinding Light",       text: "Cannot see for d6 rounds." },
  { name: "Divine Calling",       text: "Roll on the Death Table." }
];

/* -------------------------------------------- */
/*  Inventory Layout                            */
/* -------------------------------------------- */

/**
 * Inventory slot definitions. The character sheet renders these zones,
 * and items track which zone + index they live in via system.location
 * and system.slotIndex.
 */
FLAIL.inventory = {
  zones: {
    // `columns` = how many grid columns this zone spans in the
    // visual layout. Used for multi-slot item spanning: a 2-slot
    // item's secondary lives at `idx + columns` (i.e. the slot
    // directly BELOW it in the printed sheet layout), NOT at
    // `idx + 1` which for wide zones like satchel is the slot
    // horizontally next to the primary.
    adornment:   { label: "FLAIL.Inventory.Adornment",   count: 2, columns: 1, allowConditions: false, considered: "worn", allowedTypes: ["gear"], requireFlag: "adornment" },
    hands:       { label: "FLAIL.Inventory.Hands",       count: 2, columns: 1, allowConditions: false, considered: "carried" },
    body:        { label: "FLAIL.Inventory.Body",        count: 4, columns: 1, allowConditions: true,  considered: "worn" },
    satchel:     { label: "FLAIL.Inventory.Satchel",     count: 8, columns: 2, allowConditions: true,  considered: "stashed" },
    // Bard-only. Three slots: slot 1 always, slot 2 unlocks at level 3,
    // slot 3 at level 5. The class-extras Bard branch is the only UI that
    // renders these slots, so non-Bards never see them. `allowedTypes`
    // forces the drop logic to refuse anything that isn't an instrument.
    instruments: {
      label: "FLAIL.Inventory.Instruments",
      count: 3,
      columns: 1,
      allowConditions: false,
      considered: "worn",
      allowedTypes: ["instrument"]
    }
  },
  /**
   * Conditional slots — unlocked by minimum STR score.
   * The satchel has 8 slots total. The first 6 are always available;
   * the 7th unlocks at STR 10 and the 8th at STR 12.
   */
  strLocked: {
    satchel: [
      { slotIndex: 6, requiresStr: 10 },
      { slotIndex: 7, requiresStr: 12 }
    ]
  },
  /**
   * Conditional slots — unlocked by minimum character level.
   * The Bard's instrument slots beyond the first.
   */
  levelLocked: {
    instruments: [
      { slotIndex: 1, requiresLevel: 3 },
      { slotIndex: 2, requiresLevel: 5 }
    ]
  },
  // Hand slot index conventions
  hands: {
    offHand: 0,
    mainHand: 1
  }
};

/* -------------------------------------------- */
/*  Conditions                                  */
/* -------------------------------------------- */

FLAIL.conditions = {
  drained:           { label: "FLAIL.Condition.Drained",          clear: "longRest",      effect: "-1 INT" },
  exhausted:         { label: "FLAIL.Condition.Exhausted",        clear: "longRest",      effect: "Disadvantage on physical tasks" },
  injured:           { label: "FLAIL.Condition.Injured",          clear: "fullRest",      effect: "Player picks: -1 STR, -1 DEX, or -1 TH" },
  persistentInjury:  { label: "FLAIL.Condition.PersistentInjury", clear: "magicOrMiracle",effect: "-1 STR and -1 DEX" },
  poisoned:          { label: "FLAIL.Condition.Poisoned",         clear: "medicalHealing",effect: "Take a Poisoned each dawn" },
  starved:           { label: "FLAIL.Condition.Starved",          clear: "meal",          effect: "Take more Starveds every two days" },
  petrified:         { label: "FLAIL.Condition.Petrified",        clear: "other",         effect: "Cannot move or take actions" }
};

/**
 * Injured variants — when applying an Injured condition, the player
 * picks which attribute is reduced.
 */
FLAIL.injuredVariants = {
  str: { label: "FLAIL.InjuredVariant.Str", effect: "-1 STR" },
  dex: { label: "FLAIL.InjuredVariant.Dex", effect: "-1 DEX" },
  th:  { label: "FLAIL.InjuredVariant.Th",  effect: "-1 TH" }
};

/* -------------------------------------------- */
/*  Combat / Dice                               */
/* -------------------------------------------- */

FLAIL.hitTier = {
  fail:      { label: "FLAIL.Hit.Fail",      icon: "fa-times" },
  fumble:    { label: "FLAIL.Hit.Fumble",    icon: "fa-skull" },
  minor:     { label: "FLAIL.Hit.Minor",     icon: "fa-circle" },
  major:     { label: "FLAIL.Hit.Major",     icon: "fa-circle-dot" },
  deathBlow: { label: "FLAIL.Hit.DeathBlow", icon: "fa-skull-crossbones" }
};

FLAIL.combination = {
  pair:       { label: "FLAIL.Combo.Pair",       priority: 1 },
  triplet:    { label: "FLAIL.Combo.Triplet",    priority: 2 },
  fourKind:   { label: "FLAIL.Combo.Poker",      priority: 3 },
  fullHouse:  { label: "FLAIL.Combo.FullHouse",  priority: 3 },
  twoPair:    { label: "FLAIL.Combo.TwoPair",    priority: 2 },
  sequence3:  { label: "FLAIL.Combo.Sequence3",  priority: 2 },
  sequence4:  { label: "FLAIL.Combo.Sequence4",  priority: 3 },
  sequence5:  { label: "FLAIL.Combo.Sequence5",  priority: 4 }
};

/* -------------------------------------------- */
/*  Weapon / Armour Reference                   */
/* -------------------------------------------- */

FLAIL.weaponRange = {
  near:    { label: "FLAIL.Range.Near" },
  distant: { label: "FLAIL.Range.Distant" },
  far:     { label: "FLAIL.Range.Far" }
};

FLAIL.armourTypes = {
  basic:  { label: "FLAIL.Armour.Basic",  usage: 3, slots: 1 },
  light:  { label: "FLAIL.Armour.Light",  usage: 4, slots: 1 },
  heavy:  { label: "FLAIL.Armour.Heavy",  usage: 6, slots: 2 },
  shield: { label: "FLAIL.Armour.Shield", usage: 2, slots: 1 },
  helmet: { label: "FLAIL.Armour.Helmet", usage: 2, slots: 1 }
};

/* -------------------------------------------- */
/*  Death Table                                 */
/* -------------------------------------------- */

FLAIL.deathTable = [
  null, // index 0 (unused; d8 is 1-8)
  { label: "FLAIL.Death.NearDeath",     desc: "Get up with max HP and +1 to one attribute." },
  { label: "FLAIL.Death.KnockedOut",    desc: "Recover with d4 hit points." },
  { label: "FLAIL.Death.Dizzy",         desc: "Disadvantage on attacks for d4 turns." },
  { label: "FLAIL.Death.Hurt",          desc: "Disadvantage on all saves for the rest of the session." },
  { label: "FLAIL.Death.Scarred",       desc: "Lose 1 CHA permanently." },
  { label: "FLAIL.Death.HorribleWound", desc: "Gain a Persistent Injury condition." },
  { label: "FLAIL.Death.Maimed",        desc: "One hand inventory slot rendered useless." },
  { label: "FLAIL.Death.Dead",          desc: "Dead!" }
];

/* -------------------------------------------- */
/*  Class-fixed lists for bottom panels         */
/* -------------------------------------------- */

/**
 * Cutthroat thieving talents. Each talent maps to a save attribute
 * (clicking the talent name on the sheet rolls that save with
 * advantage — talents grant advantage on the appropriate save when
 * the action is attempted). Short `desc` notes the mechanical
 * implication or requirement; full rule text lives on page 24 of
 * FLAIL v0.2. Cutthroats start with five talents per their guild
 * and gain one more at each level-up.
 */
FLAIL.cutthroatTalents = [
  { key: "acrobatics",     label: "Acrobatics",     save: "dex",  desc: "Includes climbing." },
  { key: "appraise",       label: "Appraise",       save: "int",  desc: "Identifies an item's value." },
  { key: "disguise",       label: "Disguise",       save: "cha",  desc: "GM rolls; reveals success only when relevant." },
  { key: "disableTrap",    label: "Disable Trap",   save: "dex",  desc: "Requires thieves' tools." },
  { key: "forgePapers",    label: "Forge Papers",   save: "int",  desc: "GM rolls; reveals success only when relevant." },
  { key: "hideShadows",    label: "Hide in Shadows", save: "dex", desc: "Cannot be hit until the cutthroat reveals themselves." },
  { key: "listen",         label: "Listen",         save: "luck", desc: "" },
  { key: "pickLock",       label: "Pick Lock",      save: "dex",  desc: "Requires thieves' tools." },
  { key: "pickPocket",     label: "Pick Pocket",    save: "dex",  desc: "" },
  { key: "readLanguages",  label: "Read Languages", save: "int",  desc: "Includes rare and dead languages." },
  { key: "search",         label: "Search",         save: "int",  desc: "Finds hidden doors, compartments, traps, or objects." },
  { key: "sneakSilently",  label: "Sneak Silently", save: "dex",  desc: "" }
];

/**
 * Druid Primal Gifts — five kingdoms of five gifts each.
 *
 * Sourced from FLAIL v0.2 page 30. Each gift is a distinct passive or
 * activated ability the Druid unlocks. The mechanic per gift is stored
 * as a short `desc` used for tooltip + inline display; full rules text
 * lives in the rulebook.
 *
 * Rule: shapeshift into the creature of the kingdom with the most
 * gifts (roll off on tie). Gifts last a number of turns up to the
 * Druid's current level.
 */
FLAIL.druidPrimalGifts = {
  mammal: { label: "Mammal", gifts: [
    { key: "herbivore",       label: "Herbivore",        desc: "Leaves and plants satiate hunger like food/grub." },
    { key: "hamsterForm",     label: "Hamster Form",     desc: "Transform into a small hamster." },
    { key: "bloodhoundSmell", label: "Bloodhound Smell", desc: "Gain a keen sense of smell." },
    { key: "cheetahVelocity", label: "Cheetah Velocity", desc: "Always attack first in combat." },
    { key: "packMentality",   label: "Pack Mentality",   desc: "+1 To Hit if an ally is Nearby." }
  ]},
  reptile: { label: "Reptile", gifts: [
    { key: "infraredVision", label: "Infrared Vision", desc: "See in the dark." },
    { key: "camouflage",     label: "Camouflage",      desc: "Advantage on hiding; invisible while still." },
    { key: "vipersAgility",  label: "Viper's Agility", desc: "Two attacks per round (second has disadvantage)." },
    { key: "regeneration",   label: "Regeneration",    desc: "Spend one round to restore 4+d4 HP." },
    { key: "crocodileSkin",  label: "Crocodile Skin",  desc: "Gain Defence 2." }
  ]},
  bird: { label: "Bird", gifts: [
    { key: "falconsGrace", label: "Falcon's Grace", desc: "Advantage on DEX saves." },
    { key: "eagleSight",   label: "Eagle Sight",   desc: "See Far-Away as if Near." },
    { key: "pigeonMail",   label: "Pigeon Mail",   desc: "Send a bird with a message to a known location." },
    { key: "parakeetForm", label: "Parakeet Form", desc: "Transform into a parakeet." },
    { key: "incubator",    label: "Incubator",     desc: "Hatch a bird egg into a follower by sitting on it." }
  ]},
  amphibian: { label: "Amphibian", gifts: [
    { key: "toxicSecretion", label: "Toxic Secretion", desc: "Melee attackers take 2 damage on hit." },
    { key: "slimySkin",      label: "Slimy Skin",      desc: "Adversaries suffer -1 To Hit." },
    { key: "axolotlForm",    label: "Axolotl Form",    desc: "Transform into a small axolotl." },
    { key: "frogLeap",       label: "Frog Leap",       desc: "Perform giant leaps." },
    { key: "stickyGrip",     label: "Sticky Grip",     desc: "Advantage on climbing." }
  ]},
  fish: { label: "Fish", gifts: [
    { key: "waterBreathing", label: "Water Breathing", desc: "Breathe underwater." },
    { key: "pufferfishForm", label: "Pufferfish Form", desc: "Transform into a pufferfish." },
    { key: "naturalSwimmer", label: "Natural Swimmer", desc: "Swim twice as fast; no save required." },
    { key: "bubbleBreath",   label: "Bubble Breath",   desc: "Spit a floating bubble to carry a small item up." },
    { key: "eelWeave",       label: "Eel Weave",       desc: "Squeeze through small spaces underwater." }
  ]}
};

/**
 * Druid Shapeshift — kingdom token graphics. Sourced from FLAIL v0.2
 * page 30, one artwork per primal-gift kingdom. Used to swap the
 * Druid's canvas token art while shapeshifted; on revert the token
 * is restored from the snapshot stored in `system.shapeshift.
 * preShiftTokenImg`.
 */
FLAIL.druidKingdomTokens = {
  mammal:    "systems/flail/icons/druid-kingdoms/mammal.png",
  reptile:   "systems/flail/icons/druid-kingdoms/reptile.png",
  bird:      "systems/flail/icons/druid-kingdoms/bird.png",
  amphibian: "systems/flail/icons/druid-kingdoms/amphibian.png",
  fish:      "systems/flail/icons/druid-kingdoms/fish.png"
};

/**
 * Druid Shapeshift beast forms — one per primal gift kingdom, matching
 * the "kingdom with the most primal gifts" trigger. Sourced from FLAIL
 * v0.2 page 31. Attack `th` is the To Hit dice pool, `dmg` is the
 * per-die damage; `special` notes crit/combo effects.
 */
FLAIL.druidBeastForms = {
  mammal: {
    name: "Grizzly Bear",
    tagline: "Some lessons are best taught by clawing someone in half.",
    hp: 18, defence: 2, mov: "A",
    attacks: [
      { name: "Bite", th: 5, dmg: 4, special: "Death Blow: eat target; go without grub for d6 days." },
      { name: "Claw", th: 6, dmg: 3, special: "Any hit: on a four-number sequence, deal an extra d10 damage." }
    ]
  },
  reptile: {
    name: "Green Anaconda",
    tagline: "Known to give formidable hugs.",
    hp: 20, defence: 0, mov: "A",
    attacks: [
      { name: "Bite",         th: 6, dmg: 4, special: "Any hit: on three pairs, cause an additional 2d6 damage." },
      { name: "Constriction", th: 7, dmg: 2, special: "Any hit: constrict target; target may save at the start of their round to break free, or takes d4 damage and loses the round; may attack new targets while constricting up to two others." }
    ]
  },
  bird: {
    name: "Ostrich",
    tagline: "When you can't fly, run hard.",
    hp: 17, defence: 1, mov: "A",
    attacks: [
      { name: "Trample", th: 6, dmg: 4, special: "Any hit: on a four-number sequence, run over two Nearby targets for d10 damage." },
      { name: "Beak",    th: 5, dmg: 3, special: "Major Hit: causes an immediate Morale save on ally of target." }
    ]
  },
  amphibian: {
    name: "Giant Salamander",
    tagline: "Poison is nature's way of setting boundaries.",
    hp: 15, defence: 0, mov: "A",
    attacks: [
      { name: "Acid Spit", th: 5, dmg: 3, special: "Any hit: give target a poison token; target dies on third token." },
      { name: "Bite",      th: 7, dmg: 4, special: "Death Blow: may revert to human without making the mutation saves." }
    ]
  },
  fish: {
    name: "Hammerhead Shark",
    tagline: "Knows only the language of bite marks.",
    hp: 20, defence: 1, mov: "A",
    attacks: [
      { name: "Bite",      th: 7, dmg: 5, special: "Any hit: on triplets, deal an additional d10 damage." },
      { name: "Tail Slam", th: 5, dmg: 3, special: "Special: can hit two Nearby targets in the same attack." }
    ]
  }
};

FLAIL.tinkererGadgetBelt = {
  damage: { label: "Damage", gadgets: [
    { key: "buzzsawDisk",  label: "Buzzsaw Disk",  desc: "Hits a target for d6 damage. On a 6, ricochets onto another random target." },
    { key: "clockworkToy", label: "Clockwork Toy", desc: "Walks erratically for one round, then explodes for d8 damage." },
    { key: "fireSpitter",  label: "Fire Spitter",  desc: "Cone of flame — d4 damage to up to two Nearby targets." },
    { key: "gooBlast",     label: "Goo Blast",     desc: "Attaches to a target; goes off on its next round for d8 damage to all Nearby." },
    { key: "shockBolas",   label: "Shock Bolas",   desc: "Hits any target for d4 electrical damage. On a 4, target is stunned." }
  ]},
  control: { label: "Control", gadgets: [
    { key: "flashBomb",     label: "Flash Bomb",     desc: "All Nearby must save or go blind until the end of their next round." },
    { key: "magneticOrb",   label: "Magnetic Orb",   desc: "All metal within Distant range is drawn to it." },
    { key: "stickyNet",     label: "Sticky Net",     desc: "Fires to Distant range; target may save on their round to break free." },
    { key: "smokeScreen",   label: "Smoke Screen",   desc: "Fills the room with smoke — aids stealth, obscures vision." },
    { key: "repulsorBlast", label: "Repulsor Blast", desc: "All Nearby must save or are pushed to Distant range." }
  ]},
  utility: { label: "Utility", gadgets: [
    { key: "liquidRope",     label: "Liquid Rope",     desc: "Advantage on climbing. Liquid hardens for two minutes, then dissolves." },
    { key: "miniatureDrill", label: "Miniature Drill", desc: "Cuts a small hole through walls, doors, or locks." },
    { key: "signalFlare",    label: "Signal Flare",    desc: "Launches a bright light into the sky." },
    { key: "spiderScout",    label: "Spider Scout",    desc: "Moves silently; emits warning flashes if it registers movement." },
    { key: "oilSlicker",     label: "Oil Slicker",     desc: "Coats a Nearby surface with slippery, flammable oil." }
  ]},
  support: { label: "Support", gadgets: [
    { key: "adrenalineBooster", label: "Adren. Booster",   desc: "Suppresses Injured or Exhausted for two turns." },
    { key: "flashpaste",        label: "Flash paste",       desc: "Rapidly seals a crack or leak; holds for one turn." },
    { key: "healingInjector",   label: "Healing Injector",  desc: "Heals d4 HP on injection." },
    { key: "repairDrone",       label: "Repair Drone",      desc: "Restores d4 HP to any construct within Distant range." },
    { key: "retractableShield", label: "Retract. Shield",   desc: "Absorbs up to 6 damage from a single attack, then shatters." }
  ]}
};

/* -------------------------------------------- */
/*  Backgrounds (Instant Backstory tables)      */
/* -------------------------------------------- */

/**
 * Per-class background options drawn from the FLAIL "Instant Backstory, d6"
 * tables in the rulebook. Each entry has:
 *   - key:   the d6 result, "1".."6" — what we store in system.background
 *   - label: the descriptive identity used in the dropdown
 *   - perk:  the mechanical bonus (shown below the dropdown for reference)
 */
FLAIL.backgrounds = {
  bard: [
    { key: "1", label: "Contortionist halfling who fled a circus troop with dreams of acting at Serenade Pavilion.",
      perk: "Advantage in DEX saves for acrobatics, climbing, etc." },
    { key: "2", label: "Dwarf troll slayer with a knack for emotionally-stirring opera arias.",
      perk: "Take harp as first instrument; add axes to weapon speciality (+1 TH vs Giants)." },
    { key: "3", label: "Unusually tall youngling sent by the Temple of Eternal Chanting to find a sacred lost song.",
      perk: "Start with one divine prayer of choice (Cleric)." },
    { key: "4", label: "Son of a half-elf bird-keeper who accidentally swallowed a songbird and became a singer.",
      perk: "Start with one bird primal gift of choice (Druid)." },
    { key: "5", label: "Human street performer who dazzles audiences and picks their pockets with equal prowess.",
      perk: "Start with Pick Pocket talent (Cutthroat)." },
    { key: "6", label: "Human musical prodigy raised in an aristocratic milieu who fled home for a more exciting lifestyle.",
      perk: "Start with +50 coins and a family heirloom." }
  ],
  boneWhisperer: [
    { key: "1", label: "Human plague doctor accidentally possessed by a Lich, yet to reveal itself.",
      perk: "Undead puppets roll Morale saves with advantage." },
    { key: "2", label: "Human vampire entombed alive during the Great Purge, seeking revenge on those responsible.",
      perk: "May use Bat Form gift (Druid)." },
    { key: "3", label: "Human wizard who saw their family slain in the Hollow Massacre and turned to darker arcane arts.",
      perk: "Start with one Wizard spell of choice (use spirit to cast it)." },
    { key: "4", label: "Lizardman who never takes their mask off and has no recollection of their upbringing.",
      perk: "Start with a mask, and one reptile primal gift of choice (Druid)." },
    { key: "5", label: "Human gravedigger that saw one too many undead and eventually bonded with them.",
      perk: "May summon their Undead Puppet at any time once per day." },
    { key: "6", label: "Shaman who took their life after an apocalyptic vision, but was resurrected by a superior being.",
      perk: "Add +1 max spirit at each level." }
  ],
  cleric: [
    { key: "1", label: "Human sacristan whose temple was purged by the king after a fraudulent succession.",
      perk: "Start with +1 LUCK and Helm of Mettle (see page 105)." },
    { key: "2", label: "Dwarf apostate who adopted a new cult after being charred alive by a witch.",
      perk: "Start with -1 CHA, and one prayer of choice from another religion." },
    { key: "3", label: "Human orphan raised by martial monks who vowed to erect a temple in pagan lands.",
      perk: "TH 5, DMG 2 when attacking bare-handed." },
    { key: "4", label: "Elf shaman who received Godly visions, leading them to a life of devotion.",
      perk: "Start with darkvision and Listen (Cutthroat); cannot equip iron." },
    { key: "5", label: "Human shipped to a temple by his mother after she witnessed a supposed miracle.",
      perk: "Start with -1 LUCK; ignore first 6 when performing a Miracle Call." },
    { key: "6", label: "Human warrior who turned pious after a divine apparition revealed a secret atop a tree.",
      perk: "Start with one basic combat talent of choice (Warrior)." }
  ],
  cutthroat: [
    { key: "1", label: "Son of a deceased human clockmaker, raised by a thieving guild for their innate talents.",
      perk: "May use Quick Craft (Tinkerer) once per session." },
    { key: "2", label: "Halfling wizard apprentice who infiltrated Shadow Arcanum to steal scrolls for their master.",
      perk: "Start with two random Wizard spells (use LUCK as mana)." },
    { key: "3", label: "Human street urchin who stole a powerful wizard ring and is now hunted by its master.",
      perk: "Start with a random magic ring." },
    { key: "4", label: "Dark elf who was exiled from Ghoulgate City for rescuing a human child.",
      perk: "Start with one Bone Whisperer spell of choice (use STR as spirit) and a little hireling." },
    { key: "5", label: "Loyal gnome, once royal dragon egg tamer, now falsely accused of regicide.",
      perk: "Start with a dragon egg and The Dragon Skull (see page 107)." },
    { key: "6", label: "Human pirate whose crew was cursed to undeath, seeking a way to break the spell.",
      perk: "Start with +2d20 coins and a monkey familiar." }
  ],
  druid: [
    { key: "1", label: "Human raised by a feral wolf pack in the remote Pinecone Peaks.",
      perk: "Start with two mammal primal gifts, +1 DEX, and a wolf companion." },
    { key: "2", label: "Elf child lost in a mystical fog, returning years later with forgotten druidic knowledge.",
      perk: "May heal self or others d4 hit points when surrounded by nature, twice per day." },
    { key: "3", label: "Half-giant raised by ancient treefolk who took an oath to protect the forest.",
      perk: "Start with +2 STR; may cast Speak with Plants prayer (Cleric)." },
    { key: "4", label: "Human botanist who cultivated a baby sentient carnivorous plant.",
      perk: "Start with plant as companion (hp, TH, dmg equal to Druid level + 3)." },
    { key: "5", label: "Elf mushroom-picker marked by a forest fey that etched mysterious tattoos on them.",
      perk: "Tattoos glow faintly in the presence of unknown magic items." },
    { key: "6", label: "Dryad masquerading as human to escape a dying forest, seeking to revive it.",
      perk: "May stand still and camouflage as plant at will." }
  ],
  tinkerer: [
    { key: "1", label: "Gnome inventor that fled Ingenious Point due to a contraption gone horribly wrong.",
      perk: "Start with an additional 3 construct points." },
    { key: "2", label: "Gnome engineer who replaced his failing heart with clockwork gear of his own invention.",
      perk: "Immune to Exhausted conditions; must oil heart regularly." },
    { key: "3", label: "Halfling thief from the City of Shadows who stole a construct and learned the tinkerer's trade.",
      perk: "Start with a thieving talent of choice (Cutthroat)." },
    { key: "4", label: "Dwarf wrestler with an interest for clockwork and all things mechanical.",
      perk: "Add battle axes to weapon specialty, and +2 max hit points." },
    { key: "5", label: "Former bard gnome who lost their voice and built a construct to communicate.",
      perk: "The construct starts with speech and a built-in bard instrument of choice." },
    { key: "6", label: "Halfling smith that was struck by lightning, awakening in them a talent for invention.",
      perk: "Start with Buzzing Volt (see page 102); take half damage from electrical sources." }
  ],
  warrior: [
    { key: "1", label: "Dwarf priest searching for a holy hammer to save their hometown Stonehall Deep.",
      perk: "May cast Bless and Locate Object prayers (Cleric) once per day." },
    { key: "2", label: "Half-orc that survived a pitiless village-raid by a devious goblin clique.",
      perk: "Start with +1 STR, +2 hit points and a showing loathe for goblins." },
    { key: "3", label: "Half-ogre born under dubious circumstances with a profound inability to conjugate verbs correctly.",
      perk: "Convert any amount of INT into hit points." },
    { key: "4", label: "Human squire who saw their master slayed by a Troll and took an oath of revenge.",
      perk: "Start with a random Legendary Weapon (from deceased master); +2 TH vs Trolls." },
    { key: "5", label: "Human exile from a distant kingdom, seeking to reclaim their lost throne.",
      perk: "Start with +50 coins and a signet ring (+1 CHA)." },
    { key: "6", label: "Halfling gladiator champion from End's Meet who found a map to an ancient arena in a defeated rival.",
      perk: "Start with a map and +2 CHA." }
  ],
  wizard: [
    { key: "1", label: "Human apprentice of OooOozey Oozzeborne, mutated after gulping a brew of slime mucus.",
      perk: "May ooze through gaps in which a human child could fit into." },
    { key: "2", label: "Halfling cook with a flair for alchemy who found a mysterious ring in their late father's vault.",
      perk: "Start with a random magic ring, and -1 STR." },
    { key: "3", label: "Human scribe buried in volcanic ash during an eruption, who mysteriously re-emerged at dawn.",
      perk: "Start with +2 LUCK; take half damage from fire sources." },
    { key: "4", label: "Merfolk masquerading as human who found a grimoire in the ocean and is searching for its master.",
      perk: "May breathe underwater; heal d6 hit points in water." },
    { key: "5", label: "Human ex-thief who embraced wizardry after stealing a secret spellbook.",
      perk: "May use one Shadow Arcanum (Cutthroat) guild ability per session." },
    { key: "6", label: "Dwarf runesmith seduced by arcane powers, consequently exiled from Frost Beard Mountain.",
      perk: "Start with an expert Brawler Mauler talent of choice (Warrior); add axes to weapon speciality." }
  ]
};

/**
 * Construct improvements — rulebook page 32.
 *
 * Each entry is one row in the improvement table. Order matches
 * the printed page. Enforcement rules:
 *   - cost in construct points (deducted from level × 5 pool)
 *   - max 2 purchases per level per improvement key
 *   - stat / hp / slot improvements cap at maxValue
 *   - ability improvements are binary — once bought, done
 *
 * type:
 *   "stat"    — increments actor.system[statPath] by perPurchase
 *   "hp"      — increments actor.system.hp.max AND actor.system.hp.value by perPurchase
 *   "slot"    — unlocks one carried slot (up to 4) then one stashed (up to 6)
 *   "ability" — sets actor.system.abilities[abilityKey] to true
 */
FLAIL.constructImprovements = [
  { key: "th",            label: "+1 TH",             cost: 1, type: "stat",    statPath: "th",      perPurchase: 1, maxValue: 8  },
  { key: "damage",        label: "+1 DMG",            cost: 1, type: "stat",    statPath: "damage",  perPurchase: 1, maxValue: 5  },
  { key: "inventorySlot", label: "+1 Inventory Slot", cost: 1, type: "slot",                          perPurchase: 1, maxValue: 10 },
  { key: "hp",            label: "+2 HP",             cost: 1, type: "hp",                            perPurchase: 2, maxValue: 20 },
  { key: "defence",       label: "+1 Defence",        cost: 1, type: "stat",    statPath: "defence", perPurchase: 1, maxValue: 3  },
  { key: "saves",         label: "+1 Saves",          cost: 1, type: "stat",    statPath: "saves",   perPurchase: 1, maxValue: 16 },
  { key: "camouflage",    label: "Camouflage",        cost: 3, type: "ability", abilityKey: "camouflage" },
  { key: "climbing",      label: "Climbing",          cost: 3, type: "ability", abilityKey: "climbing" },
  { key: "darkvision",    label: "Darkvision",        cost: 3, type: "ability", abilityKey: "darkvision" },
  { key: "frogLeaping",   label: "Frog Leaping",      cost: 3, type: "ability", abilityKey: "frogLeaping" },
  { key: "illumination",  label: "Illumination",      cost: 3, type: "ability", abilityKey: "illumination" },
  { key: "hovering",      label: "Hovering",          cost: 4, type: "ability", abilityKey: "hovering" },
  { key: "swimming",      label: "Swimming",          cost: 4, type: "ability", abilityKey: "swimming" },
  { key: "speech",        label: "Speech",            cost: 5, type: "ability", abilityKey: "speech" }
];

/**
 * Warrior — Combat Talents catalogue (rulebook pp. 36-37).
 *
 * Four trees; each tree has:
 *   - 1 Basic talent (entry point)
 *   - 2 Expert talents (unlocked after the tree's Basic is picked)
 *   - 4 Master talents (each Expert has 2 Masters beneath it,
 *     unlocked after that specific Expert is picked)
 *
 * Selection rules (enforced in the sheet):
 *   - Level 1 → must be a Basic.
 *   - Levels 2+ → any Basic (of a not-yet-chosen tree), or any
 *     Expert (in a tree whose Basic is already picked), or any
 *     Master (whose parent Expert is already picked).
 *   - No duplicates — each talent may appear only once.
 *
 * Keys use a hierarchical naming so tier / tree / parent can be
 * derived without a lookup table:
 *   {tree}.basic          — the tree's basic
 *   {tree}.exp{1|2}       — one of two experts
 *   {tree}.mas{1|2}{a|b}  — masters under expert 1 or 2, a or b
 */
FLAIL.combatTalents = {
  trees: [
    {
      key: "bladeFreak",
      label: "Blade Freak",
      hint: "Only applies to one-handed weapons.",
      basic: {
        key: "bladeFreak.basic",
        label: "Fine Cuts",
        desc: "When a three-number sequence is rolled in a successful To Hit roll, deal extra damage equal to the highest die of the sequence."
      },
      experts: [
        {
          key: "bladeFreak.exp1",
          label: "Dual Wielding",
          desc: "Make two attacks per round; off-hand has disadvantage.",
          masters: [
            { key: "bladeFreak.mas1a", label: "Cross Slash",   desc: "Hitting an adversary twice in the same round causes an additional d4 damage." },
            { key: "bladeFreak.mas1b", label: "Bleeding Cut",  desc: "After being hit, adversaries take +d4 damage on all subsequent rounds." }
          ]
        },
        {
          key: "bladeFreak.exp2",
          label: "Fencer's Luck",
          desc: "Twice per combat, reroll a failed To Hit roll.",
          masters: [
            { key: "bladeFreak.mas2a", label: "Opportunist",    desc: "When an adversary fumbles in melee against you, roll a free attack immediately." },
            { key: "bladeFreak.mas2b", label: "The Undertaker", desc: "Triplets of 2s also count as Death Blows." }
          ]
        }
      ]
    },
    {
      key: "brawlerMauler",
      label: "Brawler Mauler",
      hint: "Only applies to two-handed weapons.",
      basic: {
        key: "brawlerMauler.basic",
        label: "Raw Force",
        desc: "When rolling triplets in a successful To Hit roll, deal extra damage equal to the number of the triplets (e.g. triplet of 4s causes 4 extra damage)."
      },
      experts: [
        {
          key: "brawlerMauler.exp1",
          label: "Mighty Clasp",
          desc: "Reroll one die of choice on all To Hit Rolls.",
          masters: [
            { key: "brawlerMauler.mas1a", label: "Whirlwind",       desc: "Once per combat, attack all Nearby adversaries in the same combat round." },
            { key: "brawlerMauler.mas1b", label: "Swinging Strike", desc: "On To Hit Rolls, may split the dice between Nearby targets." }
          ]
        },
        {
          key: "brawlerMauler.exp2",
          label: "Crushing Blow",
          desc: "Once per combat, add +2 To Hit on a single attack.",
          masters: [
            { key: "brawlerMauler.mas2a", label: "Titan's Grip", desc: "Can wield two-handed weapons with one hand." },
            { key: "brawlerMauler.mas2b", label: "Bone Breaker", desc: "On Major Hits, target must save or takes an additional d6 damage." }
          ]
        }
      ]
    },
    {
      key: "archerMaster",
      label: "Archer Master",
      hint: "Only applies to bows.",
      basic: {
        key: "archerMaster.basic",
        label: "Precision Mark",
        desc: "When two pairs are rolled in a successful To Hit roll, the target becomes marked. The next attack against it has a +2 To Hit bonus."
      },
      experts: [
        {
          key: "archerMaster.exp1",
          label: "Quick Shot",
          desc: "Twice per combat, make an extra attack in one combat round.",
          masters: [
            { key: "archerMaster.mas1a", label: "Double Shot", desc: "Once per combat, a single To Hit roll strikes two close targets (declare before rolling TH)." },
            { key: "archerMaster.mas1b", label: "Deadly Aim",  desc: "All successful attacks deal an extra amount of damage equal to current level." }
          ]
        },
        {
          key: "archerMaster.exp2",
          label: "Arrowcraft",
          desc: "When rolling usage, only mark quiver on a 6.",
          masters: [
            { key: "archerMaster.mas2a", label: "Sniper Focus",  desc: "Stand still for one round to gain +2 To Hit in the next round of combat." },
            { key: "archerMaster.mas2b", label: "Piercing Shot", desc: "Always ignore target's Defence." }
          ]
        }
      ]
    },
    {
      key: "martialArtist",
      label: "Martial Artist",
      hint: "Only works bare-handed.",
      basic: {
        key: "martialArtist.basic",
        label: "Iron Fist",
        desc: "TH 5, DMG 2 when attacking bare-handed. Gain +1 DMG when advancing to an Expert talent below, and +1 TH upon taking a Master talent."
      },
      experts: [
        {
          key: "martialArtist.exp1",
          label: "Flurry of Blows",
          desc: "Make two bare-handed attacks per combat round.",
          masters: [
            { key: "martialArtist.mas1a", label: "Focused Force",   desc: "Deal an extra +d3 damage per each pair rolled on any attack." },
            { key: "martialArtist.mas1b", label: "Stunning Strike", desc: "On a hit, target must save or becomes stunned." }
          ]
        },
        {
          key: "martialArtist.exp2",
          label: "Balance",
          desc: "Twice per combat, cancel one 1 from any To Hit roll against you.",
          masters: [
            { key: "martialArtist.mas2a", label: "Deflect",  desc: "When hit by a ranged weapon, make a DEX save to dodge the attack entirely." },
            { key: "martialArtist.mas2b", label: "Reflexes", desc: "When hit in melee, make an extra attack immediately as a free action." }
          ]
        }
      ]
    }
  ]
};

/**
 * Lookup a Combat Talent by key. Returns
 *   { tree, tier, talent, parent? }
 * where `parent` is the Expert node above a Master (undefined for
 * Basic and Expert).
 */
FLAIL.getCombatTalent = function (key) {
  if (!key) return null;
  for (const tree of FLAIL.combatTalents.trees) {
    if (tree.basic.key === key) return { tree, tier: "basic", talent: tree.basic };
    for (const expert of tree.experts) {
      if (expert.key === key) return { tree, tier: "expert", talent: expert };
      for (const master of expert.masters) {
        if (master.key === key) return { tree, tier: "master", talent: master, parent: expert };
      }
    }
  }
  return null;
};

/**
 * Wizard Masters — the four canonical apprenticeships from FLAIL v0.2
 * pages 42-43. A wizard character apprentices under exactly one, which
 * determines which non-arcane spells they may add to their spellbook.
 *
 *   flakumeg   → flame     — Flakumeg, the Flame Whisperer
 *   ukraal     → shadow    — Û-Kraal, the Shadow Manipulator
 *   oozzeborne → ooze      — OooOozey Oozzeborne, Ruler of Oozes
 *   chooChoo   → illusion  — Choo-Choo, Master of Deceit
 *
 * Each entry also carries the Master's own stats (from the rulebook)
 * so a future Master card on the sheet could surface them without
 * touching this file.
 */
FLAIL.wizardMasters = {
  flakumeg: {
    key:       "flakumeg",
    label:     "Flakumeg, the Flame Whisperer",
    shortLabel: "Flakumeg",
    tradition: "flame",
    tagline:   "Legendary pyromancer that keeps folk warm in the Frostlands.",
    stats:     "Level 6 · 10 hp · Saves 16 · Morale 13 · Mana 20 · Human",
    weapon:    "Emberspire Rod (TH 5, DMG 2 — on two pairs, firebolt any target for d6 damage).",
    color:     "#b23838"
  },
  ukraal: {
    key:       "ukraal",
    label:     "Û-Kraal, the Shadow Manipulator",
    shortLabel: "Û-Kraal",
    tradition: "shadow",
    tagline:   "Powerful sorcerer who dwells unseen across shadows.",
    stats:     "Level 7 · 12 hp · Saves 13 · Morale 16 · Mana 22 · Dark Elf",
    weapon:    "Nightcoil Staff (TH 6, DMG 2 — on any hit, may move into any shadow within eyesight).",
    color:     "#3a2f4a"
  },
  oozzeborne: {
    key:       "oozzeborne",
    label:     "OooOozey Oozzeborne, Ruler of Oozes",
    shortLabel: "Oozzeborne",
    tradition: "ooze",
    tagline:   "Formidable mage from the hot Swamps that researches slime.",
    stats:     "Level 7 · 13 hp · Saves 17 · Morale 15 · Mana 22 · Human-Ooze",
    weapon:    "Slimesceptre (TH 6, DMG 2 — on any hit, may cast Assimilate Filth as a free action).",
    color:     "#4a6b2a"
  },
  chooChoo: {
    key:       "chooChoo",
    label:     "Choo-Choo, Master of Deceit",
    shortLabel: "Choo-Choo",
    tradition: "illusion",
    tagline:   "Famous illusionist that lives in City of Shadows.",
    stats:     "Level 8 · 15 hp · Saves 19 · Morale 12 · Mana 30 · Halfling",
    weapon:    "Shadowfang Dagger (TH 5, DMG 3 — on any hit, may cast a spell immediately as a free action).",
    color:     "#8b5a1a"
  }
};
FLAIL.wizardMasterKeys = ["flakumeg", "ukraal", "oozzeborne", "chooChoo"];

/**
 * Look up which Master (if any) owns a given spell tradition.
 * Returns the Master key, or null for `arcane` / `dark` / `custom`.
 */
FLAIL.getMasterForTradition = function (tradition) {
  if (!tradition) return null;
  return FLAIL.wizardMasterKeys.find(k => FLAIL.wizardMasters[k].tradition === tradition) ?? null;
};

/**
 * Wizard Side Effects table (FLAIL v0.2 p. 41). Rolled d10 whenever
 * a wizard rolls exactly two sixes in their cast pool. Order matches
 * the rulebook table so index 0 = result "1", index 9 = result "10".
 * Descriptions are shortened for the chat card; GM narrates the full
 * effect at the table.
 */
FLAIL.wizardSideEffects = [
  { name: "'Master?'",           desc: "The Master appears before the caster in the form of a shadow, and for a moment before disappearing, seems to want to say something." },
  { name: "Rainbow Show",        desc: "Coloured smoke and lights spread from the caster's fingertips for the next d6 rounds. All Nearby have advantage on all next To Hit Rolls." },
  { name: "Tentacles",           desc: "The caster grows d3 tentacles that last d6 rounds. Each may be used to make one additional attack per round (TH 3, DMG 2)." },
  { name: "The Eye",             desc: "A giant eye appears on the caster's forehead until dispelled — grants advantage on saves against illusions and stealth." },
  { name: "Acid Event",          desc: "Corrosive slime spurts from the caster's mouth: d6 damage to all Near targets (save for half)." },
  { name: "Rough Skin",          desc: "Caster's skin becomes stone-like scale for d6 turns; gain +2 Defence but disadvantage on DEX saves." },
  { name: "Crab Claw",           desc: "The caster's dominant hand turns into a giant crab claw for d6 hours (TH 4, DMG d6). Can't hold anything else with it." },
  { name: "Polymorph Anomaly",   desc: "Caster is polymorphed as per the spell — GM rolls the polymorph result. Lasts d6 turns." },
  { name: "Oops Portal",         desc: "A shimmering portal appears where the caster stands — GM decides where it leads. Lasts d6 rounds." },
  { name: "Brain Fart",          desc: "Caster forgets the spell they just cast until the next long rest — it can't be cast again in that time." }
];
