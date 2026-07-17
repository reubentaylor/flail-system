import { FLAIL } from "../helpers/config.mjs";

/**
 * Damage gadget release (Tinkerer, FLAIL v0.2 p.29).
 *
 * Each of the five damage gadgets rolls a specific damage die and may
 * trigger a special effect on a natural maximum. This module handles
 * the dice + effect determination and posts a chat card with an
 * Apply Damage button (reuses the standard applyDamage chat action).
 *
 * Per-gadget mechanics (config keys match `system.gadgetKey`):
 *   • buzzsawDisk   — d6 to target; on 6, ricochets onto another random target.
 *   • clockworkToy  — walks erratically for 1 round, then d8 to all Nearby.
 *   • fireSpitter   — d4 cone; up to 2 Nearby targets take the same amount.
 *   • gooBlast      — attaches to target; on its next round, d8 to all Nearby.
 *   • shockBolas    — d4 electrical; on a 4, target is Stunned.
 *
 * On successful release, the gadget's usage.value is incremented so
 * the sheet reflects the once-per-day expenditure. Chat card surfaces
 * an Apply Damage button (routes through the existing chat-listener).
 *
 * @param {object} options
 * @param {Actor}  options.actor    Tinkerer using the gadget.
 * @param {Item}   options.gadget   Gadget item being released.
 * @returns {Promise<ChatMessage|null>}
 */
export async function releaseDamageGadget({ actor, gadget } = {}) {
  if (!actor || !gadget) return null;
  if (gadget.type !== "gadget") {
    ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NotAGadget"));
    return null;
  }
  if (gadget.system?.gadgetType !== "damage") {
    ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NotADamageGadget"));
    return null;
  }

  // Prevent double-use unless it's been reset. `usage.value < usage.max`
  // is the standard "available" test.
  const cur = gadget.system.usage?.value ?? 0;
  const max = gadget.system.usage?.max ?? 0;
  if (max > 0 && cur >= max) {
    ui.notifications?.warn(
      game.i18n.format("FLAIL.Notify.GadgetAlreadyUsed", { name: gadget.name })
    );
    return null;
  }

  const gadgetKey = gadget.system?.gadgetKey ?? "";
  const mechanic = DAMAGE_GADGET_MECHANICS[gadgetKey];
  if (!mechanic) {
    ui.notifications?.warn(
      game.i18n.format("FLAIL.Notify.GadgetNoMechanic", { name: gadget.name })
    );
    return null;
  }

  /* ---------- 1. Roll dice + resolve special effects ---------- */
  const roll = new Roll(mechanic.formula);
  await roll.evaluate();
  const total = roll.total;
  const dieResults = roll.dice[0]?.results.map(r => r.result) ?? [];

  // Trigger detection — each gadget has a `trigger` predicate. Set to
  // undefined if the special effect didn't fire.
  const triggered = mechanic.trigger ? mechanic.trigger({ total, dieResults }) : null;

  /* ---------- 2. Compute damage amount ---------- */
  const damage = mechanic.damage({ total, dieResults });

  /* ---------- 3. Mark gadget usage ---------- */
  if (max > 0) {
    await gadget.update({ "system.usage.value": Math.min(max, cur + 1) });
  }

  /* ---------- 4. Build chat card ---------- */
  const templateData = {
    actor: { name: actor.name, img: actor.img, uuid: actor.uuid },
    gadget: {
      id: gadget.id,
      name: gadget.name,
      img: gadget.img,
      description: gadget.system?.description ?? ""
    },
    mechanic: {
      formula: mechanic.formula,
      label:   game.i18n.localize(mechanic.labelKey),
      targetHint: mechanic.targetHint
        ? game.i18n.localize(mechanic.targetHint) : null
    },
    dice: dieResults,
    total,
    damage,
    triggered: triggered ? {
      key: triggered.key,
      label: game.i18n.localize(triggered.labelKey),
      detail: game.i18n.localize(triggered.detailKey)
    } : null,
    hasDamage: damage > 0
  };

  const content = await foundry.applications.handlebars.renderTemplate(
    "systems/flail/templates/chat/use-damage-gadget.hbs",
    templateData
  );

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: [roll],
    content,
    sound: CONFIG.sounds.dice,
    flags: {
      flail: {
        damageGadget: {
          gadgetId:   gadget.id,
          gadgetKey,
          actorUuid:  actor.uuid,
          damage,
          triggered:  triggered?.key ?? null
        },
        // Reuse the existing applyDamage chat-listener path — the
        // button on the card just needs damageDealt on the flags.
        attackRoll: { damageDealt: damage }
      }
    }
  });
}

/**
 * Per-gadget mechanic table. Keyed by `system.gadgetKey`.
 *
 * Each entry:
 *   - formula:    Foundry dice expression rolled at release time.
 *   - damage(r):  computes the damage amount given the roll result.
 *   - trigger(r): optional — returns {key, labelKey, detailKey} when a
 *                 special effect fires; null/undefined otherwise.
 *   - labelKey:   short lang key describing the effect on the card.
 *   - targetHint: optional lang key describing WHO takes the damage
 *                 (single target vs. cone vs. all-nearby). Rendered as
 *                 a small hint on the card so the player knows to
 *                 target the right token(s) before clicking Apply.
 */
const DAMAGE_GADGET_MECHANICS = {
  buzzsawDisk: {
    formula: "1d6",
    labelKey: "FLAIL.Gadget.Damage.BuzzsawDisk.Label",
    targetHint: "FLAIL.Gadget.Damage.BuzzsawDisk.TargetHint",
    damage: ({ total }) => total,
    trigger: ({ total }) => total === 6 ? {
      key: "ricochet",
      labelKey: "FLAIL.Gadget.Damage.BuzzsawDisk.Ricochet",
      detailKey: "FLAIL.Gadget.Damage.BuzzsawDisk.RicochetDetail"
    } : null
  },
  clockworkToy: {
    formula: "1d8",
    labelKey: "FLAIL.Gadget.Damage.ClockworkToy.Label",
    targetHint: "FLAIL.Gadget.Damage.ClockworkToy.TargetHint",
    damage: ({ total }) => total,
    // Always triggers a "delayed" note — the toy walks a round before
    // exploding. Presented as narrative info rather than a special
    // maximum-roll effect.
    trigger: () => ({
      key: "delayed",
      labelKey: "FLAIL.Gadget.Damage.ClockworkToy.Delayed",
      detailKey: "FLAIL.Gadget.Damage.ClockworkToy.DelayedDetail"
    })
  },
  fireSpitter: {
    formula: "1d4",
    labelKey: "FLAIL.Gadget.Damage.FireSpitter.Label",
    targetHint: "FLAIL.Gadget.Damage.FireSpitter.TargetHint",
    damage: ({ total }) => total,
    trigger: null
  },
  gooBlast: {
    formula: "1d8",
    labelKey: "FLAIL.Gadget.Damage.GooBlast.Label",
    targetHint: "FLAIL.Gadget.Damage.GooBlast.TargetHint",
    damage: ({ total }) => total,
    trigger: () => ({
      key: "delayed",
      labelKey: "FLAIL.Gadget.Damage.GooBlast.Delayed",
      detailKey: "FLAIL.Gadget.Damage.GooBlast.DelayedDetail"
    })
  },
  shockBolas: {
    formula: "1d4",
    labelKey: "FLAIL.Gadget.Damage.ShockBolas.Label",
    targetHint: "FLAIL.Gadget.Damage.ShockBolas.TargetHint",
    damage: ({ total }) => total,
    trigger: ({ total }) => total === 4 ? {
      key: "stunned",
      labelKey: "FLAIL.Gadget.Damage.ShockBolas.Stunned",
      detailKey: "FLAIL.Gadget.Damage.ShockBolas.StunnedDetail"
    } : null
  }
};
