/**
 * Hiring availability roller (Ship H3).
 *
 * RAW (rulebook p. 56):
 *   "Characters may attempt to hire retainers... In villages, roll d20
 *    twice to determine which types are available. On 15-20, no one is
 *    available. If the same number is rolled twice, the price of the
 *    allowance is halved. In cities, all hirelings are available."
 *
 * The 14 hireling types are numbered 1-14 exactly as FLAIL.hirelingTypes
 * is ordered (1 Acolyte … 14 Scholar), so a d20 of r maps to key[r-1].
 *
 * GM flow: pick Village / City (+ an optional patron to hire into), roll,
 * record the availability in a chat card, then optionally spin up a
 * hireling actor of an available type (with its H1 starting grants and,
 * on a doubles roll, the halved allowance).
 */

import { FLAIL } from "../helpers/config.mjs";
import { applyHirelingType } from "../documents/hireling-grants.mjs";
import { linkPatron } from "../documents/hireling-ops.mjs";

/** Roll a single d20 and return its total. */
async function d20() {
  const r = await new Roll("1d20").evaluate();
  return r.total;
}

/**
 * Compute the available hireling types for a location.
 * @param {"village"|"city"} location
 * @returns {Promise<{location:string, rolls:number[]|null, halved:boolean,
 *                     available:Array<{key,label,allowance,halved}>}>}
 */
export async function computeAvailability(location) {
  const keys = FLAIL.hirelingTypeKeys;
  const defOf = (key, halved) => {
    const d = FLAIL.hirelingTypes[key];
    const full = d.allowance ?? 0;
    return { key, label: d.label, allowance: halved ? Math.floor(full / 2) : full, fullAllowance: full, halved };
  };

  if (location === "city") {
    return { location, rolls: null, halved: false, available: keys.map(k => defOf(k, false)) };
  }

  // Village — two d20s.
  const a = await d20();
  const b = await d20();
  const toKey = r => (r >= 1 && r <= 14) ? keys[r - 1] : null;
  const halved = a === b;                 // same number twice → half price

  const available = [];
  if (halved) {
    const k = toKey(a);
    if (k) available.push(defOf(k, true));      // 15-20 doubles → still none
  } else {
    const seen = new Set();
    for (const r of [a, b]) {
      const k = toKey(r);
      if (k && !seen.has(k)) { seen.add(k); available.push(defOf(k, false)); }
    }
  }
  return { location, rolls: [a, b], halved, available };
}

/** Post a chat card recording the availability roll. */
async function postAvailabilityCard(result) {
  const where = result.location === "city" ? "City" : "Village";
  let body;
  if (!result.available.length) {
    body = `<p><em>No retainers are available here.</em></p>`;
  } else {
    const rows = result.available.map(a =>
      `<li><strong>${game.i18n.localize(a.label)}</strong> — ${a.allowance} coins` +
      (a.halved ? ` <span style="color:#2a6a2a;">(halved — doubles rolled)</span>` : ``) + `</li>`
    ).join("");
    body = `<ul style="margin:0.25rem 0 0;padding-left:1.1rem;">${rows}</ul>`;
  }
  const rollLine = result.rolls
    ? `<p class="flail-hint" style="font-size:0.82em;color:#6a5a2a;">d20 twice: ${result.rolls.join(" &amp; ")}${result.halved ? " (doubles)" : ""}</p>`
    : `<p class="flail-hint" style="font-size:0.82em;color:#6a5a2a;">All hirelings are available in a city.</p>`;

  return ChatMessage.create({
    content: `<div class="flail-chat-card flail-hiring-card">
        <p><i class="fas fa-handshake"></i> <strong>Hiring Availability — ${where}</strong></p>
        ${rollLine}
        ${body}
      </div>`
  });
}

/**
 * Open the GM hiring roller: choose a location (+ optional patron), roll,
 * record it, and optionally create a hireling of an available type.
 */
export async function openHiringRoller() {
  if (!game.user?.isGM) {
    ui.notifications?.warn("FLAIL: only the GM can roll for hireling availability.");
    return;
  }

  const charOpts = game.actors
    .filter(a => a.type === "character")
    .map(a => `<option value="${a.id}">${a.name}</option>`).join("");

  // --- Step 1: location + optional patron ---
  const setup = await foundry.applications.api.DialogV2.wait({
    window: { title: "Hire Retainers", icon: "fas fa-handshake" },
    content: `<div style="padding:0.25rem 0;color:#3a2c0a;">
        <p style="margin:0 0 0.4rem;">Where are the characters hiring?</p>
        <label style="display:block;margin:0.2rem 0;"><input type="radio" name="loc" value="village" checked/> Village <span style="font-size:0.82em;color:#6a5a2a;">(roll d20 twice; 15-20 = none; doubles halve the allowance)</span></label>
        <label style="display:block;margin:0.2rem 0;"><input type="radio" name="loc" value="city"/> City <span style="font-size:0.82em;color:#6a5a2a;">(all hirelings available)</span></label>
        <hr style="border-color:#c9b283;margin:0.5rem 0;"/>
        <label style="display:block;">Patron (optional)
          <select name="patron" style="width:100%;"><option value="">— none —</option>${charOpts}</select>
        </label>
      </div>`,
    buttons: [
      { action: "roll", label: "Roll availability", icon: "fas fa-dice-d20", default: true,
        callback: (event, btn, dialog) => {
          const form = dialog.element;
          const loc = form.querySelector('input[name="loc"]:checked')?.value ?? "village";
          const patron = form.querySelector('select[name="patron"]')?.value ?? "";
          return { location: loc, patronId: patron };
        } },
      { action: "cancel", label: "Cancel", icon: "fas fa-times", callback: () => null }
    ],
    rejectClose: false,
    submit: v => v
  });
  if (!setup) return;

  // --- Roll + record ---
  const result = await computeAvailability(setup.location);
  await postAvailabilityCard(result);

  if (!result.available.length) {
    ui.notifications?.info("FLAIL: no retainers available here.");
    return;
  }

  // --- Step 2: optionally create a hireling of an available type ---
  const typeOpts = result.available.map(a =>
    `<option value="${a.key}">${game.i18n.localize(a.label)} — ${a.allowance} coins${a.halved ? " (halved)" : ""}</option>`).join("");

  const create = await foundry.applications.api.DialogV2.wait({
    window: { title: "Hire a retainer", icon: "fas fa-user-plus" },
    content: `<div style="padding:0.25rem 0;color:#3a2c0a;">
        <p style="margin:0 0 0.4rem;">Create a hireling from the available types?</p>
        <label style="display:block;margin-bottom:0.4rem;">Name
          <input type="text" name="hname" value="New Hireling" style="width:100%;"/>
        </label>
        <label style="display:block;">Type
          <select name="htype" style="width:100%;">${typeOpts}</select>
        </label>
      </div>`,
    buttons: [
      { action: "create", label: "Create hireling", icon: "fas fa-user-plus", default: true,
        callback: (event, btn, dialog) => {
          const form = dialog.element;
          return {
            name: form.querySelector('input[name="hname"]')?.value?.trim() || "New Hireling",
            typeKey: form.querySelector('select[name="htype"]')?.value ?? ""
          };
        } },
      { action: "done", label: "Just record it", icon: "fas fa-check", callback: () => null }
    ],
    rejectClose: false,
    submit: v => v
  });
  if (!create?.typeKey) return;

  await createHireling(create.name, create.typeKey, result, setup.patronId);
}

/**
 * Create a hireling actor of `typeKey`, apply its H1 grants, honour the
 * doubles-halved allowance, link a patron if given, and open the sheet.
 */
export async function createHireling(name, typeKey, availabilityResult, patronId = "") {
  const actor = await Actor.implementation.create({ name, type: "hireling" });
  if (!actor) { ui.notifications?.error("FLAIL: failed to create the hireling actor."); return null; }

  await applyHirelingType(actor, typeKey);

  // Doubles → halved allowance (applyHirelingType set the full value).
  const entry = availabilityResult?.available?.find(a => a.key === typeKey);
  if (entry?.halved) {
    await actor.update({ "system.allowance": entry.allowance });
  }

  if (patronId) {
    const patron = game.actors.get(patronId);
    if (patron) await linkPatron(actor, patron);
  }

  actor.sheet?.render(true);
  return actor;
}
