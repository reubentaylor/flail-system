/**
 * Combat Talent item data — bundled trees per Warrior specialty.
 *
 * Extracted from FLAIL.combatTalents.trees in helpers/config.mjs.
 * The importer creates a world compendium ("Combat Talents") at
 * world init and populates it with one Item per talent, so players
 * can drag them onto characters and GMs can create homebrew talents.
 *
 * Each entry becomes an Item document of type "combatTalent" with:
 *   - name              the talent label ("Fine Cuts")
 *   - system.description  rules text (rich HTML)
 *   - system.tree, treeLabel, tier, prerequisite, sourceKey
 *
 * Also includes a "Custom Combat Talent" template at the top for
 * homebrew — copies are embedded on the actor and edited freely.
 */
import { FLAIL } from "../helpers/config.mjs";

const TIER_ICONS = {
  basic:  "icons/skills/melee/weapons-crossed-swords-yellow.webp",
  expert: "icons/skills/melee/weapons-crossed-swords-purple.webp",
  master: "icons/skills/melee/weapons-crossed-swords-black-gray.webp"
};

/**
 * Per-canonical-talent trigger + reminder metadata (v0.4.97).
 * Keyed by sourceKey. See combatTalent schema in items.mjs for
 * field definitions. Homebrew talents (unknown sourceKey) get
 * schema defaults.
 */
const TRIGGER_METADATA = {
  "bladeFreak.basic":     { weaponRestriction: "oneHanded", activation: "passive", triggerKind: "onRoll", triggerPokerCombo: "sequence3", triggerHitTier: "anyHit", reminderTitle: "Fine Cuts!", reminderText: "<p>Deal extra damage equal to the highest die of the sequence.</p>" },
  "bladeFreak.exp1":      { weaponRestriction: "oneHanded", activation: "passive", triggerKind: "passive" },
  "bladeFreak.exp2":      { weaponRestriction: "oneHanded", activation: "active",  triggerKind: "onFailedRoll", triggerHitTier: "fail", usageLimitMax: 2, usageLimitWindow: "combat", reminderTitle: "Fencer's Luck available", reminderText: "<p>You may reroll this failed To Hit roll (2×/combat).</p>" },
  "bladeFreak.mas1a":     { weaponRestriction: "oneHanded", activation: "passive", triggerKind: "onRoll", triggerHitTier: "anyHit", reminderTitle: "Cross Slash reminder", reminderText: "<p>If this is the second hit on the same adversary this round, add +d4 damage.</p>" },
  "bladeFreak.mas1b":     { weaponRestriction: "oneHanded", activation: "passive", triggerKind: "onRoll", triggerHitTier: "anyHit", reminderTitle: "Bleeding Cut applied", reminderText: "<p>The adversary takes +d4 damage at the start of every subsequent round.</p>" },
  "bladeFreak.mas2a":     { weaponRestriction: "oneHanded", activation: "reactive", triggerKind: "reactive", triggerReactiveEvent: "adversaryFumbles", reminderTitle: "Opportunist!", reminderText: "<p>The adversary fumbled — take a free attack immediately.</p>" },
  "bladeFreak.mas2b":     { weaponRestriction: "oneHanded", activation: "passive", triggerKind: "onRoll", triggerPokerCombo: "triplet", triggerPokerFace: 2, triggerHitTier: "anyHit", reminderTitle: "The Undertaker — Death Blow!", reminderText: "<p>Triplets of 2 count as Death Blows.</p>" },
  "brawlerMauler.basic":  { weaponRestriction: "twoHanded", activation: "passive", triggerKind: "onRoll", triggerPokerCombo: "triplet", triggerHitTier: "anyHit", reminderTitle: "Raw Force!", reminderText: "<p>Extra damage equal to twice the triplet's face value.</p>" },
  "brawlerMauler.exp1":   { weaponRestriction: "twoHanded", activation: "passive", triggerKind: "passive" },
  "brawlerMauler.exp2":   { weaponRestriction: "twoHanded", activation: "active",  triggerKind: "active", usageLimitMax: 1, usageLimitWindow: "combat" },
  "brawlerMauler.mas1a":  { weaponRestriction: "twoHanded", activation: "active",  triggerKind: "active", usageLimitMax: 1, usageLimitWindow: "combat" },
  "brawlerMauler.mas1b":  { weaponRestriction: "twoHanded", activation: "active",  triggerKind: "active" },
  "brawlerMauler.mas2a":  { weaponRestriction: "twoHanded", activation: "passive", triggerKind: "passive" },
  "brawlerMauler.mas2b":  { weaponRestriction: "twoHanded", activation: "passive", triggerKind: "onRoll", triggerHitTier: "major", reminderTitle: "Bone Breaker!", reminderText: "<p>Target must save vs STR or take an extra d10 damage.</p>" },
  "archerMaster.basic":   { weaponRestriction: "bow", activation: "passive", triggerKind: "onRoll", triggerPokerCombo: "twoPair", triggerHitTier: "anyHit", reminderTitle: "Precision Mark applied", reminderText: "<p>Target is marked. The next attack against it has +2 To Hit.</p>" },
  "archerMaster.exp1":    { weaponRestriction: "bow", activation: "active",  triggerKind: "active", usageLimitMax: 2, usageLimitWindow: "combat" },
  "archerMaster.exp2":    { weaponRestriction: "bow", activation: "passive", triggerKind: "passive" },
  "archerMaster.mas1a":   { weaponRestriction: "bow", activation: "active",  triggerKind: "active", usageLimitMax: 1, usageLimitWindow: "combat" },
  "archerMaster.mas1b":   { weaponRestriction: "bow", activation: "passive", triggerKind: "onRoll", triggerHitTier: "anyHit", reminderTitle: "Deadly Aim", reminderText: "<p>Extra damage equal to your current character level.</p>" },
  "archerMaster.mas2a":   { weaponRestriction: "bow", activation: "active",  triggerKind: "active" },
  "archerMaster.mas2b":   { weaponRestriction: "bow", activation: "passive", triggerKind: "onRoll", triggerHitTier: "anyHit", reminderTitle: "Piercing Shot", reminderText: "<p>Ignores the target's Defence for this hit.</p>" },
  "martialArtist.basic":  { weaponRestriction: "barehanded", activation: "passive", triggerKind: "passive" },
  "martialArtist.exp1":   { weaponRestriction: "barehanded", activation: "passive", triggerKind: "passive" },
  "martialArtist.exp2":   { weaponRestriction: "barehanded", activation: "active",  triggerKind: "active", usageLimitMax: 2, usageLimitWindow: "combat" },
  "martialArtist.mas1a":  { weaponRestriction: "barehanded", activation: "passive", triggerKind: "onRoll", triggerPokerCombo: "pair", triggerHitTier: "anyHit", reminderTitle: "Focused Force!", reminderText: "<p>Extra +d6 damage per pair rolled.</p>" },
  "martialArtist.mas1b":  { weaponRestriction: "barehanded", activation: "passive", triggerKind: "onRoll", triggerHitTier: "anyHit", reminderTitle: "Stunning Strike", reminderText: "<p>Target must save or become Stunned.</p>" },
  "martialArtist.mas2a":  { weaponRestriction: "barehanded", activation: "reactive", triggerKind: "reactive", triggerReactiveEvent: "hitByRanged", reminderTitle: "Deflect!", reminderText: "<p>Make a DEX save to dodge the ranged attack entirely.</p>" },
  "martialArtist.mas2b":  { weaponRestriction: "barehanded", activation: "reactive", triggerKind: "reactive", triggerReactiveEvent: "hitInMelee", reminderTitle: "Reflexes!", reminderText: "<p>Make an extra melee attack immediately as a free action.</p>" }
};

/**
 * Fully-defaulted trigger block for a given sourceKey.
 */
function triggerBlock(sourceKey) {
  const m = TRIGGER_METADATA[sourceKey] ?? {};
  return {
    weaponRestriction: m.weaponRestriction ?? "any",
    weaponRestrictionCustom: "",
    activation: m.activation ?? "passive",
    usageLimitMax: m.usageLimitMax ?? 0,
    usageLimitWindow: m.usageLimitWindow ?? "none",
    triggerKind: m.triggerKind ?? "none",
    triggerPokerCombo: m.triggerPokerCombo ?? "",
    triggerPokerFace: m.triggerPokerFace ?? 0,
    triggerHitTier: m.triggerHitTier ?? "",
    triggerReactiveEvent: m.triggerReactiveEvent ?? "",
    reminderTitle: m.reminderTitle ?? "",
    reminderText: m.reminderText ?? "",
    reminderIcon: m.reminderIcon ?? "",
    notes: ""
  };
}

export function buildCombatTalentsData() {
  const items = [];

  // Custom template
  items.push({
    _id: stableCombatTalentId("custom"),
    name: "Custom Combat Talent",
    type: "combatTalent",
    img: TIER_ICONS.basic,
    system: {
      description: "<p><em>Define your own combat talent.</em> Set the tree, tier, and prerequisite on the item sheet, then rename + rewrite freely.</p>",
      tree: "custom",
      treeLabel: "Custom",
      tier: "basic",
      prerequisite: "",
      sourceKey: "custom",
      slotIndex: 0,
      isCustomTemplate: true,
      ...triggerBlock("")
    },
    effects: [],
    folder: null,
    sort: 0
  });

  let sort = 100;
  for (const tree of FLAIL.combatTalents?.trees ?? []) {
    // Basic
    items.push({
      _id: stableCombatTalentId(tree.basic.key),
      name: tree.basic.label,
      type: "combatTalent",
      img: TIER_ICONS.basic,
      system: {
        description: `<p>${tree.basic.desc ?? ""}</p>`,
        tree: tree.key,
        treeLabel: tree.label,
        tier: "basic",
        prerequisite: "",
        sourceKey: tree.basic.key,
        slotIndex: 0,
        isCustomTemplate: false,
        ...triggerBlock(tree.basic.key)
      },
      effects: [],
      folder: null,
      sort: sort++
    });

    for (const expert of tree.experts ?? []) {
      items.push({
        _id: stableCombatTalentId(expert.key),
        name: expert.label,
        type: "combatTalent",
        img: TIER_ICONS.expert,
        system: {
          description: `<p>${expert.desc ?? ""}</p>`,
          tree: tree.key,
          treeLabel: tree.label,
          tier: "expert",
          prerequisite: tree.basic.key,
          sourceKey: expert.key,
          slotIndex: 0,
          isCustomTemplate: false,
          ...triggerBlock(expert.key)
        },
        effects: [],
        folder: null,
        sort: sort++
      });

      for (const master of expert.masters ?? []) {
        items.push({
          _id: stableCombatTalentId(master.key),
          name: master.label,
          type: "combatTalent",
          img: TIER_ICONS.master,
          system: {
            description: `<p>${master.desc ?? ""}</p>`,
            tree: tree.key,
            treeLabel: tree.label,
            tier: "master",
            prerequisite: expert.key,
            sourceKey: master.key,
            slotIndex: 0,
            isCustomTemplate: false,
            ...triggerBlock(master.key)
          },
          effects: [],
          folder: null,
          sort: sort++
        });
      }
    }
  }

  return items;
}

/**
 * Deterministic 16-char alphanumeric ID from a stable source key.
 */
export function stableCombatTalentId(sourceKey) {
  const src = `flail-ct-${sourceKey}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < src.length; i++) {
    hash ^= src.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  hash = hash >>> 0;
  let hash2 = 0xcbf29ce4;
  for (let i = 0; i < src.length; i++) {
    hash2 ^= src.charCodeAt(i);
    hash2 = Math.imul(hash2, 0x100000001b3 & 0xffffffff);
  }
  hash2 = hash2 >>> 0;
  const s = hash.toString(36).padStart(8, "0") + hash2.toString(36).padStart(8, "0");
  return s.slice(0, 16).padEnd(16, "0");
}
