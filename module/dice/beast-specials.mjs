/**
 * Beast-form attack "special" pattern detection (v0.4.72).
 *
 * When a Druid rolls To Hit while shapeshifted, some of the beast's
 * attacks have rulebook triggers keyed to poker-dice patterns or hit
 * tiers. This module inspects the roll's analysis + tier and returns
 * a `{ triggered, name, effect, damage, effectKey }` bundle so the
 * chat card can highlight the trigger and (in one case) auto-buff
 * the shapeshift state.
 *
 * Mapping (kingdom, beastAttackIndex) → trigger:
 *
 *   mammal[1]    Claw          → sequence4    "+d10 damage"
 *   reptile[0]   Bite          → threePair    "+2d6 damage"
 *   reptile[1]   Constriction  → any hit      constrict + save
 *   bird[0]      Trample       → sequence4    "run over 2 Nearby for d10"
 *   bird[1]      Beak          → major/death  "force Morale save on ally"
 *   amphibian[0] Acid Spit     → any hit      poison token
 *   amphibian[1] Bite          → death blow   auto +1 TH / +4 DMG (C4)
 *   fish[0]      Bite          → triplet      "+d10 damage"
 *
 * Not modelled (narrative-only): mammal[0] Bite death blow (grub loss);
 * fish[1] Tail Slam special (hits 2 nearby — GM adjudicates targeting).
 */

/**
 * Compact per-beast-attack rule map. Each rule has:
 *   condition — one of "sequence4" | "threePair" | "triplet" |
 *               "anyHit" | "major" | "deathBlow"
 *   effectKey — stable identifier for downstream handlers
 *   name      — short label ("Rending Claw")
 *   effect    — human-readable description ("+d10 damage")
 *   damage    — optional dice string to auto-roll
 *   buff      — optional shapeshift-state buff to auto-apply
 */
const BEAST_SPECIALS = {
  "mammal.1": {
    condition: "sequence4",
    effectKey: "mammal.claw.sequence",
    name: "Rending Claw",
    effect: "+d10 damage (four-number sequence).",
    damage: "1d10"
  },
  "reptile.0": {
    condition: "threePair",
    effectKey: "reptile.bite.threePair",
    name: "Fang Frenzy",
    effect: "+2d6 damage (three pairs).",
    damage: "2d6"
  },
  "reptile.1": {
    condition: "anyHit",
    effectKey: "reptile.constrict.hit",
    name: "Constrict",
    effect: "Target constricted — must save at start of round to break free, or take d4 damage and lose the round. Can attack new targets while constricting up to two more."
  },
  "bird.0": {
    condition: "sequence4",
    effectKey: "bird.trample.sequence",
    name: "Trample-Through",
    effect: "Run over two Nearby targets for d10 damage each.",
    damage: "1d10"
  },
  "bird.1": {
    condition: "major",
    effectKey: "bird.beak.major",
    name: "Piercing Beak",
    effect: "Force a Morale save on target's ally."
  },
  "amphibian.0": {
    condition: "anyHit",
    effectKey: "amphibian.acid.hit",
    name: "Acid Splash",
    effect: "Give target a poison token (dies on third token)."
  },
  "amphibian.1": {
    condition: "deathBlow",
    effectKey: "amphibian.bite.deathBlow",
    name: "Venom Surge",
    effect: "Gain +1 TH and +4 DMG until reverting back.",
    buff: { thBonus: 1, dmgBonus: 4 }
  },
  "fish.0": {
    condition: "triplet",
    effectKey: "fish.bite.triplet",
    name: "Frenzy Bite",
    effect: "+d10 damage (triplets).",
    damage: "1d10"
  }
};

/**
 * Test whether a poker/tier condition is satisfied by the roll.
 */
function conditionSatisfied(condition, analysis, tier) {
  switch (condition) {
    case "sequence4":
      return analysis.combinations.some(c => c.key === "sequence4" || c.key === "sequence5");
    case "threePair":
      return analysis.combinations.some(c => c.key === "threePair");
    case "triplet":
      return analysis.combinations.some(c => c.key === "triplet" || c.key === "fourKind");
    case "anyHit":
      return tier === "minor" || tier === "major" || tier === "deathBlow";
    case "major":
      return tier === "major" || tier === "deathBlow";
    case "deathBlow":
      return tier === "deathBlow";
    default:
      return false;
  }
}

/**
 * Inspect a weapon + roll analysis and return the beast special
 * bundle, or null if no rule applies. Callers pass the weapon Item
 * (or its bare data), the analysis result, and the hit tier.
 *
 * The weapon must be flagged with `flail.beastAttack` and carry a
 * `flail.beastAttackIndex` — set at shapeshift-start (see
 * character-sheet.mjs `#onShapeshiftStart`). If either is missing,
 * or the beast's kingdom isn't known, returns null.
 */
export function detectBeastSpecial(weapon, analysis, tier, kingdom) {
  if (!weapon || !analysis || !kingdom) return null;
  const isBeast = weapon.getFlag?.("flail", "beastAttack")
               ?? weapon.flags?.flail?.beastAttack;
  if (!isBeast) return null;
  const idx = weapon.getFlag?.("flail", "beastAttackIndex")
           ?? weapon.flags?.flail?.beastAttackIndex
           ?? 0;
  const rule = BEAST_SPECIALS[`${kingdom}.${idx}`];
  if (!rule) return null;
  if (!conditionSatisfied(rule.condition, analysis, tier)) return null;
  return {
    ...rule,
    triggered: true,
    kingdom,
    beastAttackIndex: idx
  };
}
