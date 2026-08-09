/**
 * Pure analysis of a d6 pool for FLAIL's "To Hit" mechanic.
 *
 * The To Hit roll is a pool of N d6s. Two questions are asked of every roll:
 *
 *   1. How many 1s? Determines hit tier (Minor / Major / Death Blow).
 *      Two-or-more 6s without any 1s is a Fumble.
 *
 *   2. What "poker" combinations appear? Pairs, triplets, four-of-a-kind,
 *      full house, sequences. These trigger class skills and Legendary
 *      Weapon effects (Witness Me!, Opportunistic Strike, etc.).
 *
 * SUBSET SEMANTICS (per Andre Novoa): a higher-tier match also counts
 * as every lower-tier match it contains. A triplet also fires "pair"
 * abilities. A four-of-a-kind fires "pair", "triplet", AND "poker".
 * Same face with N ≥ 4 dice also contributes floor(N/2) pair-count
 * toward twoPair/threePair thresholds — a four-of-a-kind is "two
 * pairs" of that face.
 *
 * This module is intentionally pure — give it dice values, get back a
 * structured analysis. No Foundry coupling, easy to test.
 */

/**
 * @typedef {Object} PokerAnalysis
 * @property {number[]}  dice         The raw d6 values.
 * @property {number}    ones         Count of 1s rolled.
 * @property {number}    sixes        Count of 6s rolled.
 * @property {string}    tier         "deathBlow" | "major" | "minor" | "fumble" | "fail"
 * @property {Combo[]}   combinations All matched combinations, ordered by priority desc.
 * @property {number[]}  pairFaces    Face values contributing at least one pair (subset-inclusive; each face may appear multiple times if count ≥ 4).
 */

/**
 * @typedef {Object} Combo
 * @property {string} key      Combination key (matches FLAIL.combination keys).
 * @property {number} priority Higher = more impressive.
 * @property {number[]} dice   The dice values that participated in this combo.
 */

/**
 * Analyze a d6 pool for FLAIL's poker-dice combat resolution.
 *
 * @param {number[]} dice    Array of d6 results.
 * @returns {PokerAnalysis}
 */
export function analyzePool(dice) {
  const ones = dice.filter(d => d === 1).length;
  const sixes = dice.filter(d => d === 6).length;

  let tier;
  if (ones >= 3) tier = "deathBlow";
  else if (ones === 2) tier = "major";
  else if (ones === 1) tier = "minor";
  else if (sixes >= 2) tier = "fumble";
  else tier = "fail";

  const analysis = detectCombinations(dice);

  return {
    dice: [...dice],
    ones,
    sixes,
    tier,
    combinations: analysis.combos,
    pairFaces: analysis.pairFaces
  };
}

/**
 * Detect every combination present in the pool, with subset semantics.
 *
 * For each face with N same-value dice, we register:
 *   - pair    if N ≥ 2
 *   - triplet if N ≥ 3
 *   - fourKind if N ≥ 4
 *
 * A face with N ≥ 4 contributes floor(N/2) pair-count to composite
 * combos: a four-of-a-kind is "two pairs" of that face.
 *
 * Composite combos:
 *   - twoPair    fires if total pair-count ≥ 2
 *   - threePair  fires if total pair-count ≥ 3
 *   - fullHouse  fires if 1+ triplet AND 1+ pair-on-a-different-face
 *   - sequenceN  longest run of consecutive faces (3, 4, or 5)
 *
 * @param {number[]} dice
 * @returns {{ combos: Combo[], pairFaces: number[] }}
 */
function detectCombinations(dice) {
  const combos = [];
  if (dice.length < 2) return { combos, pairFaces: [] };

  /* ----- count groups ----- */
  const counts = new Map();
  for (const d of dice) counts.set(d, (counts.get(d) ?? 0) + 1);

  // pairFaces is a multiset — a face with count 4 appears twice, count 6 thrice.
  // Used for the wizard's Arcane Resonance mana recoup (each entry = a pair
  // worth its face value), and for counting toward twoPair / threePair.
  const pairFaces = [];
  const tripFaces = [];
  const fourKindFaces = [];

  for (const [face, count] of counts.entries()) {
    if (count >= 4) {
      fourKindFaces.push(face);
      combos.push({
        key: "fourKind",
        priority: 3,
        dice: Array(Math.min(count, 4)).fill(face)
      });
    }
    if (count >= 3) {
      tripFaces.push(face);
      combos.push({ key: "triplet", priority: 2, dice: [face, face, face] });
    }
    if (count >= 2) {
      // A face with N dice contributes floor(N/2) pairs. So a
      // four-of-a-kind → 2 pairs of that face, six-of-a-kind → 3.
      const pairsFromFace = Math.floor(count / 2);
      for (let i = 0; i < pairsFromFace; i++) {
        pairFaces.push(face);
        combos.push({ key: "pair", priority: 1, dice: [face, face] });
      }
    }
  }

  // Composite: two pairs = 2+ total pairs (subset-inclusive count).
  if (pairFaces.length >= 2) {
    combos.push({
      key: "twoPair",
      priority: 2,
      dice: [pairFaces[0], pairFaces[0], pairFaces[1], pairFaces[1]]
    });
  }

  // Composite: three pairs = 3+ total pairs (subset-inclusive count).
  // Consumed by the creature "Bite" ability and any legendary weapons
  // that require three pairs.
  if (pairFaces.length >= 3) {
    combos.push({
      key: "threePair",
      priority: 3,
      dice: [
        pairFaces[0], pairFaces[0],
        pairFaces[1], pairFaces[1],
        pairFaces[2], pairFaces[2]
      ]
    });
  }

  // Composite: full house = at least 1 triplet AND at least 1 pair on
  // a DIFFERENT face. A pure four-of-a-kind or six-of-a-kind
  // technically has a triplet AND a pair of the same face; keeping
  // full house to distinct faces preserves the classic reading of
  // "different threes and twos" while still allowing subset triggers
  // for pair/triplet/fourKind individually.
  if (tripFaces.length >= 1) {
    const tripFace = tripFaces[0];
    const differentPairFace = pairFaces.find(f => f !== tripFace);
    if (differentPairFace !== undefined) {
      combos.push({
        key: "fullHouse",
        priority: 3,
        dice: [tripFace, tripFace, tripFace, differentPairFace, differentPairFace]
      });
    }
  }

  /* ----- sequences ----- */
  const uniques = [...new Set(dice)].sort((a, b) => a - b);
  const longest = longestRun(uniques);
  if (longest.length >= 5) {
    combos.push({ key: "sequence5", priority: 4, dice: longest });
  } else if (longest.length === 4) {
    combos.push({ key: "sequence4", priority: 3, dice: longest });
  } else if (longest.length === 3) {
    combos.push({ key: "sequence3", priority: 2, dice: longest });
  }

  // Highest priority first; equal priority preserves detection order.
  combos.sort((a, b) => b.priority - a.priority);
  return { combos, pairFaces };
}

/**
 * Find the longest run of consecutive integers in a sorted, deduplicated array.
 * @param {number[]} sortedUnique
 * @returns {number[]}
 */
function longestRun(sortedUnique) {
  let best = [];
  let current = [];
  for (let i = 0; i < sortedUnique.length; i++) {
    if (i === 0 || sortedUnique[i] === sortedUnique[i - 1] + 1) current.push(sortedUnique[i]);
    else current = [sortedUnique[i]];
    if (current.length > best.length) best = [...current];
  }
  return best;
}
