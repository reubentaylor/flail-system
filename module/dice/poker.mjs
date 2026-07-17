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

  return {
    dice: [...dice],
    ones,
    sixes,
    tier,
    combinations: detectCombinations(dice)
  };
}

/**
 * Detect every combination present in the pool.
 * A pool can satisfy multiple combos at once; we list them all so the chat
 * card can offer the player a choice when, for example, both a triplet and
 * a sequence appear.
 *
 * @param {number[]} dice
 * @returns {Combo[]}
 */
function detectCombinations(dice) {
  const combos = [];
  if (dice.length < 2) return combos;

  /* ----- count groups ----- */
  const counts = new Map();
  for (const d of dice) counts.set(d, (counts.get(d) ?? 0) + 1);

  let pairs = 0;
  let triplets = 0;
  let fourKinds = 0;
  const pairFaces = [];
  const tripFaces = [];

  for (const [face, count] of counts.entries()) {
    if (count >= 4) {
      fourKinds++;
      combos.push({
        key: "fourKind",
        priority: 3,
        dice: Array(count).fill(face)
      });
    } else if (count === 3) {
      triplets++;
      tripFaces.push(face);
      combos.push({ key: "triplet", priority: 2, dice: [face, face, face] });
    } else if (count === 2) {
      pairs++;
      pairFaces.push(face);
      combos.push({ key: "pair", priority: 1, dice: [face, face] });
    }
  }

  // Two pairs = special combo above plain pair.
  if (pairs >= 2) {
    combos.push({
      key: "twoPair",
      priority: 2,
      dice: [pairFaces[0], pairFaces[0], pairFaces[1], pairFaces[1]]
    });
  }

  // Full house = at least one triplet + at least one pair.
  if (triplets >= 1 && pairs >= 1) {
    combos.push({
      key: "fullHouse",
      priority: 3,
      dice: [tripFaces[0], tripFaces[0], tripFaces[0], pairFaces[0], pairFaces[0]]
    });
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
  return combos;
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
