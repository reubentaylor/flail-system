/**
 * Gadget release dispatcher.
 *
 * Routes gadget release requests to the correct handler:
 *   1. If the gadget has any effects authored → runs them via the
 *      shared effects-runner.
 *   2. Else if the gadget is a canonical damage gadget (has a
 *      gadgetKey known to DAMAGE_GADGET_MECHANICS) → routes to the
 *      legacy releaseDamageGadget.
 *   3. Else → posts a simple description chat card.
 *
 * ─── v0.4.89 — RAW usage model (belt-based) ──────────────────────
 *
 * v1 rulebook p.30: "To launch a gadget, Tinkerers must mark usage
 * on their belt." Usage marks live on the Gadget Belt gear item (3
 * dots, standard gear). Individual gadgets are always available as
 * long as the belt has capacity — releasing does NOT mark the
 * gadget itself.
 *
 * Bards using JOAT to pick up a Tinkerer gadget don't have a belt
 * — they use per-gadget usage (one-shot, resets on long rest via
 * the existing JOAT reset).
 *
 * Class branching:
 *   - Tinkerer: check belt capacity, mark belt on release.
 *   - Anyone else (Bard, etc.): fall back to per-gadget usage.
 *   - `free: true`: bypass ALL usage marking (triplet-on-hit).
 */

import { releaseDamageGadget } from "./use-damage-gadget.mjs";
import { runEffects } from "./effects-runner.mjs";

export async function releaseGadget({ actor, gadget, free = false } = {}) {
  if (!actor || !gadget) return null;
  if (gadget.type !== "gadget") {
    ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NotAGadget"));
    return null;
  }

  const isTinkerer = actor.type === "character" && actor.system?.class === "tinkerer";

  /* ─── Usage gate ─── */
  // Tinkerers use the belt; everyone else uses per-gadget usage.
  // `free: true` (triplet-on-hit) bypasses both.
  let belt = null;
  if (!free) {
    if (isTinkerer) {
      belt = findGadgetBelt(actor);
      if (!belt) {
        ui.notifications?.warn("FLAIL: no Gadget Belt equipped — cannot release gadgets.");
        return null;
      }
      const bCur = belt.system?.usage?.value ?? 0;
      const bMax = belt.system?.usage?.max ?? 0;
      if (bMax > 0 && bCur >= bMax) {
        ui.notifications?.warn(`FLAIL: your Gadget Belt is fully marked (${bCur}/${bMax}) — repair it before releasing another gadget.`);
        return null;
      }
    } else {
      // Non-Tinkerer (Bard JOAT etc.): per-gadget one-shot usage.
      const gCur = gadget.system?.usage?.value ?? 0;
      const gMax = gadget.system?.usage?.max ?? 0;
      if (gMax > 0 && gCur >= gMax) {
        ui.notifications?.warn(game.i18n.format("FLAIL.Notify.GadgetAlreadyUsed", { name: gadget.name }));
        return null;
      }
    }
  }

  /* ─── Post chat card via the appropriate handler ─── */
  const effects = gadget.system?.effects ?? [];
  const activation = gadget.system?.activation ?? {};

  let msg = null;
  if (Array.isArray(effects) && effects.length > 0) {
    msg = await runEffects({
      actor,
      source: gadget,
      effects,
      activation,
      chatContext: {
        headerIcon: iconForCategory(gadget.system?.gadgetType),
        headerLabel: gadget.name,
        flavor: gadget.system?.chatBlurb ?? ""
      }
    });
  } else if (gadget.system?.gadgetType === "damage" && gadget.system?.gadgetKey) {
    msg = await releaseDamageGadget({ actor, gadget });
  } else {
    const content = `
      <div class="flail-chat-card">
        <header><i class="fas fa-cog"></i> <strong>${escapeHtml(gadget.name)}</strong></header>
        <div class="flail-chat-body">${gadget.system?.description ?? ""}</div>
      </div>
    `;
    msg = await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      content
    });
  }

  /* ─── Mark usage ─── */
  if (msg && !free) {
    if (isTinkerer && belt) {
      const bCur = belt.system?.usage?.value ?? 0;
      const bMax = belt.system?.usage?.max ?? 0;
      await belt.update({ "system.usage.value": Math.min(bMax, bCur + 1) });
      // Follow-up note if the belt just filled — helpful reminder.
      if (bCur + 1 >= bMax) {
        ui.notifications?.info(`FLAIL: Gadget Belt fully marked (${bCur + 1}/${bMax}). Repair it before releasing another gadget.`);
      }
    } else {
      const gCur = gadget.system?.usage?.value ?? 0;
      const gMax = gadget.system?.usage?.max ?? 0;
      if (gMax > 0) {
        await gadget.update({ "system.usage.value": Math.min(gMax, gCur + 1) });
      }
    }
  }

  return msg;
}

/**
 * Find the Gadget Belt gear item on the actor.  Matches
 * case-insensitive on "gadget belt" substring so homebrew renames
 * still work as long as they keep the phrase.
 */
function findGadgetBelt(actor) {
  return actor.items?.find(i =>
    i.type === "gear"
    && (i.name ?? "").toLowerCase().includes("gadget belt")
  ) ?? null;
}

function iconForCategory(cat) {
  switch (cat) {
    case "damage":  return "fa-burst";
    case "control": return "fa-hand-fist";
    case "utility": return "fa-screwdriver-wrench";
    case "support": return "fa-hand-holding-heart";
    default:        return "fa-cogs";
  }
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
