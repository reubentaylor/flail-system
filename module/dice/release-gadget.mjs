/**
 * Gadget release dispatcher (v0.4.80).
 *
 * Routes gadget release requests to the correct handler:
 *   1. If the gadget has any effects authored → runs them via the
 *      shared effects-runner.
 *   2. Else if the gadget is a canonical damage gadget (has a
 *      gadgetKey known to DAMAGE_GADGET_MECHANICS) → routes to the
 *      legacy releaseDamageGadget.
 *   3. Else → posts a simple description chat card.
 *
 * The 3-way split preserves legacy behavior exactly. Existing gadgets
 * in existing worlds keep working; new gadgets with authored effects
 * fire the shared runner. Homebrew items with no effects and no key
 * still surface a card so the player has something to reference.
 */

import { releaseDamageGadget } from "./use-damage-gadget.mjs";
import { runEffects } from "./effects-runner.mjs";

export async function releaseGadget({ actor, gadget } = {}) {
  if (!actor || !gadget) return null;
  if (gadget.type !== "gadget") {
    ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NotAGadget"));
    return null;
  }

  // Prevent double-use.
  const cur = gadget.system?.usage?.value ?? 0;
  const max = gadget.system?.usage?.max ?? 0;
  if (max > 0 && cur >= max) {
    ui.notifications?.warn(game.i18n.format("FLAIL.Notify.GadgetAlreadyUsed", { name: gadget.name }));
    return null;
  }

  const effects = gadget.system?.effects ?? [];
  const activation = gadget.system?.activation ?? {};

  if (Array.isArray(effects) && effects.length > 0) {
    // New path — shared effects runner.
    const msg = await runEffects({
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
    // Consume belt usage as with legacy path.
    if (msg && max > 0) {
      await gadget.update({ "system.usage.value": Math.min(max, cur + 1) });
    }
    return msg;
  }

  // Legacy paths — damage gadget has a bespoke dispatcher; others
  // just post the description card.
  if (gadget.system?.gadgetType === "damage" && gadget.system?.gadgetKey) {
    return releaseDamageGadget({ actor, gadget });
  }

  // Description-only fallback.
  const content = `
    <div class="flail-chat-card">
      <header><i class="fas fa-cog"></i> <strong>${escapeHtml(gadget.name)}</strong></header>
      <div class="flail-chat-body">${gadget.system?.description ?? ""}</div>
    </div>
  `;
  const msg = await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content
  });
  if (msg && max > 0) {
    await gadget.update({ "system.usage.value": Math.min(max, cur + 1) });
  }
  return msg;
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
