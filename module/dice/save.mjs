import { FLAIL } from "../helpers/config.mjs";

/**
 * Execute a FLAIL save: roll-under d20 against the named attribute.
 *
 * Critical hit on natural 1, fumble on natural 20.
 * Advantage = roll 2d20, keep lowest.
 * Disadvantage = roll 2d20, keep highest.
 * Stacked advantage/disadvantage caps at three dice (per the rules).
 *
 * @param {object} options
 * @param {Actor}  options.actor           Actor making the save.
 * @param {string} options.attribute       One of the FLAIL attribute keys (str, dex, cha, int, luck).
 * @param {number} [options.advantage]     Net (+) advantage = positive, disadvantage = negative.
 *                                         e.g. +2 = double advantage, -1 = single disadvantage.
 * @param {string} [options.label]         Override label for the chat card.
 * @param {string} [options.flavor]        Optional flavor text.
 * @returns {Promise<ChatMessage|null>}
 */
export async function rollSave({ actor, attribute, advantage = 0, label, flavor } = {}) {
  if (!actor) return null;
  if (!FLAIL.attributeKeys.includes(attribute)) {
    ui.notifications?.warn(`FLAIL: unknown attribute "${attribute}".`);
    return null;
  }

  const attrValue = actor.system.attributes?.[attribute]?.current
                 ?? actor.system.attributes?.[attribute]?.value
                 ?? 0;

  // Number of dice & keep mode based on net advantage.
  const advAbs = Math.min(Math.abs(advantage), 2); // cap at ±2 (3 dice)
  const numDice = 1 + advAbs;
  let formula;
  if (advantage > 0) formula = `${numDice}d20kl1`;     // keep lowest
  else if (advantage < 0) formula = `${numDice}d20kh1`; // keep highest
  else formula = "1d20";

  const roll = new Roll(formula);
  await roll.evaluate();
  const result = roll.total;

  let outcome;
  if (result === 1) outcome = "crit";
  else if (result === 20) outcome = "fumble";
  else if (result <= attrValue) outcome = "success";
  else outcome = "fail";

  /*
   * Mark of the Guild — Cutthroat token recoup on a critical save.
   * "Critical hit" in FLAIL means rolling a natural 1 on a d20 (the
   * "crit" outcome above). The other half of the recoup trigger — a
   * Death Blow on a To Hit roll — is handled in to-hit.mjs. Cap at
   * the actor's level; sigil presence doesn't matter for the recoup,
   * only for spending.
   */
  let guildRecoup = null;
  const isCutthroatActor = actor.type === "character" && actor.system?.class === "cutthroat";
  if (isCutthroatActor && outcome === "crit") {
    const current = actor.system.guildTokens ?? 0;
    const max = actor.system.level ?? 1;
    if (current < max) {
      await actor.update({ "system.guildTokens": current + 1 });
      guildRecoup = {
        before:  current,
        after:   current + 1,
        max,
        trigger: "crit"
      };
    } else {
      guildRecoup = {
        before:  current,
        after:   current,
        max,
        trigger: "crit",
        full:    true
      };
    }
  }

  const attrLabel = game.i18n.localize(FLAIL.attributes[attribute].label);

  const templateData = {
    actor: { name: actor.name, img: actor.img, uuid: actor.uuid },
    attribute,
    attrLabel,
    attrValue,
    label: label ?? game.i18n.format("FLAIL.Roll.Save", { attr: attrLabel }),
    flavor,
    formula,
    advantage,
    rolls: roll.dice[0].results.map(r => ({ result: r.result, discarded: !!r.discarded })),
    result,
    outcome,
    guildRecoup
  };

  const content = await foundry.applications.handlebars.renderTemplate(
    "systems/flail/templates/chat/save-roll.hbs",
    templateData
  );

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: [roll],
    content,
    sound: CONFIG.sounds.dice,
    flags: {
      flail: {
        saveRoll: {
          attribute,
          attrValue,
          result,
          outcome,
          actorUuid: actor.uuid,
          guildRecoup
        }
      }
    }
  });
}
