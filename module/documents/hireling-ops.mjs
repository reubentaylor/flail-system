/**
 * Hireling operations (Ship H2).
 *
 * Shared, sheet-agnostic helpers that drive the campaign-level hireling
 * mechanics from the rulebook (pp. 56-57). Both the hireling sheet and the
 * patron (character) sheet's Hirelings panel call into these, so the rules
 * live in exactly one place.
 *
 * RAW this ship covers:
 *   - Allowance   : paid at hire and the start of each session; if the
 *                   patron has no funds, the hireling goes away.
 *   - Morale      : when ill-used, the PATRON makes a CHA save; on a fail
 *                   the hireling flees, taking carried & stashed gear.
 *   - Level-up    : when the patron levels, so does the hireling — +1 to
 *                   three attributes of choice and +1 max HP (Apprentice
 *                   also learns a new Wizard spell).
 *   - Abilities   : the repeatable, trackable ones — Healer (cure d6, uses
 *                   = level per day), Armourer / Blacksmith (clear one
 *                   usage dot once per day).
 */

import { FLAIL } from "../helpers/config.mjs";
import { pickRandomArcaneSpell } from "./hireling-grants.mjs";

/* ------------------------------------------------------------------ */
/*  Patron ↔ hireling links                                           */
/* ------------------------------------------------------------------ */

/** Resolve a hireling's patron Actor synchronously (world docs only). */
export function getPatron(hireling) {
  const uuid = hireling?.system?.patronUuid;
  if (!uuid) return null;
  try { return fromUuidSync(uuid) ?? null; } catch { return null; }
}

/** All hirelings in the world whose patron is `patron`. */
export function getHirelingsFor(patron) {
  const uuid = patron?.uuid;
  if (!uuid) return [];
  return game.actors.filter(a => a.type === "hireling" && a.system?.patronUuid === uuid);
}

/** Link a hireling to a patron (hire). */
export async function linkPatron(hireling, patron) {
  if (!hireling || !patron) return false;
  if (patron.type !== "character") {
    ui.notifications?.warn("FLAIL: only a player character can be a patron.");
    return false;
  }
  // Enforce the Apprentice/Acolyte class gate if the type demands it.
  const def = FLAIL.hirelingTypes?.[hireling.system?.hirelingType];
  if (def?.patronClass && patron.system?.class && patron.system.class !== def.patronClass) {
    ui.notifications?.warn(`FLAIL: a ${def.label} normally only follows a ${def.patronClass}. Hiring anyway.`);
  }
  await hireling.update({
    "system.patronUuid": patron.uuid,
    "system.patronName": patron.name
  });
  ui.notifications?.info(`FLAIL: ${hireling.name} now serves ${patron.name}.`);
  return true;
}

/** Break the patron link (dismiss / flee). */
export async function unlinkPatron(hireling) {
  if (!hireling) return false;
  await hireling.update({ "system.patronUuid": "", "system.patronName": "" });
  return true;
}

/* ------------------------------------------------------------------ */
/*  Allowance                                                         */
/* ------------------------------------------------------------------ */

/**
 * Pay this hireling's allowance from the patron's coins.
 * RAW: "If there are no funds available, the hireling goes away."
 * @returns {Promise<boolean>} whether the allowance was paid
 */
export async function payAllowance(hireling) {
  const patron = getPatron(hireling);
  const cost = hireling.system?.allowance ?? 0;

  if (!patron) {
    ui.notifications?.warn(`FLAIL: ${hireling.name} has no patron linked — cannot pay from anyone's purse.`);
    return false;
  }
  if (cost <= 0) {
    await hireling.update({ "system.allowancePaid": true });
    await postHirelingCard(hireling, patron, `<p><i class="fas fa-coins"></i> <strong>${hireling.name}</strong> costs nothing to keep — marked paid for the session.</p>`);
    return true;
  }

  const coins = patron.system?.coins ?? 0;
  if (cost > coins) {
    // No funds — RAW, the hireling goes away. Offer the dismissal.
    const dismiss = await foundry.applications.api.DialogV2.wait({
      window: { title: "Allowance — no funds", icon: "fas fa-coins" },
      content: `<div style="padding:0.25rem 0;color:#3a2c0a;">
          <p><strong>${patron.name}</strong> has <strong>${coins}</strong> coin(s), but <strong>${hireling.name}</strong>'s allowance is <strong>${cost}</strong>.</p>
          <p style="font-size:0.85em;"><em>RAW: with no funds available, the hireling goes away.</em></p>
          <p>Dismiss ${hireling.name} now?</p>
        </div>`,
      buttons: [
        { action: "dismiss", label: "Dismiss hireling", icon: "fas fa-door-open", default: true, callback: () => "dismiss" },
        { action: "keep", label: "Keep (unpaid)", icon: "fas fa-hand-holding", callback: () => "keep" }
      ],
      rejectClose: false,
      submit: v => v
    });
    if (dismiss === "dismiss") {
      await unlinkPatron(hireling);
      await postHirelingCard(hireling, patron, `<p><i class="fas fa-door-open"></i> <strong>${hireling.name}</strong> left ${patron.name}'s service — the allowance went unpaid.</p>`);
    }
    return false;
  }

  await patron.update({ "system.coins": coins - cost });
  await hireling.update({ "system.allowancePaid": true });
  await postHirelingCard(hireling, patron,
    `<p><i class="fas fa-coins"></i> ${patron.name} paid <strong>${cost}</strong> coin(s) to <strong>${hireling.name}</strong> (${coins} → ${coins - cost}).</p>`);
  return true;
}

/** Start a new session: clear every one of the patron's hirelings' paid flags. */
export async function resetSessionAllowances(patron) {
  const hirelings = getHirelingsFor(patron);
  if (!hirelings.length) { ui.notifications?.info("FLAIL: no hirelings to reset."); return; }
  for (const h of hirelings) await h.update({ "system.allowancePaid": false });
  ui.notifications?.info(`FLAIL: new session — ${hirelings.length} hireling allowance(s) now due.`);
}

/* ------------------------------------------------------------------ */
/*  Morale                                                            */
/* ------------------------------------------------------------------ */

/**
 * Trigger a morale check. RAW: the PATRON makes a CHA save; on a fail the
 * hireling flees, taking all carried & stashed gear with them.
 * @param {Actor}  hireling
 * @param {object} [opts]
 * @param {number} [opts.advantage]  -1 | 0 | 1 (shift / ctrl on the button)
 */
export async function rollMorale(hireling, { advantage = 0 } = {}) {
  const patron = getPatron(hireling);
  if (!patron) {
    ui.notifications?.warn(`FLAIL: ${hireling.name} has no patron to make a morale save.`);
    return null;
  }

  const flavor = `<div class="flail-chat-card">
      <p><i class="fas fa-flag"></i> <strong>Morale</strong> — ${patron.name} tests resolve to keep <strong>${hireling.name}</strong>.</p>
      <p class="flail-hint" style="font-size:0.85em;color:#6a5a2a;"><em>On a failed CHA save, ${hireling.name} flees with their carried &amp; stashed gear.</em></p>
    </div>`;

  const msg = await patron.rollSave("cha", { advantage, flavor });
  const saveFlag = msg?.getFlag?.("flail", "save");
  const passed = saveFlag?.pass ?? (saveFlag?.outcome === "pass" || saveFlag?.outcome === "crit");

  if (passed) return msg;

  // Fail — the hireling flees. Enumerate the gear they take (carried =
  // hands, stashed = satchel) for the record, then break the link.
  const taken = hireling.items
    .filter(i => ["hands", "satchel"].includes(i.system?.location))
    .map(i => i.name);
  await unlinkPatron(hireling);
  await postHirelingCard(hireling, patron,
    `<p><i class="fas fa-person-running"></i> <strong>${hireling.name}</strong> fails morale and flees ${patron.name}'s service` +
    (taken.length ? `, taking: ${taken.join(", ")}.` : ".") + `</p>`);
  return msg;
}

/* ------------------------------------------------------------------ */
/*  Level-up (with the patron)                                        */
/* ------------------------------------------------------------------ */

/**
 * Level the hireling up alongside its patron: +1 to three chosen
 * attributes, +1 max HP (and +1 current). Apprentices also learn a new
 * random arcane spell. Capped at the patron's level and at 6.
 */
export async function levelUpHireling(hireling) {
  const patron = getPatron(hireling);
  const curLevel = hireling.system?.level ?? 1;
  const patronLevel = patron?.system?.level ?? null;

  if (curLevel >= 6) { ui.notifications?.info(`FLAIL: ${hireling.name} is already at the maximum level.`); return; }
  if (patronLevel != null && curLevel >= patronLevel) {
    ui.notifications?.info(`FLAIL: ${hireling.name} is already level ${curLevel} — level up ${patron.name} first.`);
    return;
  }

  // Pick exactly three attributes to raise.
  const boxes = FLAIL.attributeKeys.map(k =>
    `<label style="display:inline-flex;align-items:center;gap:0.3rem;margin:0.15rem 0.5rem 0.15rem 0;color:#3a2c0a;">
       <input type="checkbox" name="attr" value="${k}"/> ${k.toUpperCase()}
     </label>`).join("");
  const content = `<div style="padding:0.25rem 0;">
      <p style="color:#3a2c0a;margin:0 0 0.4rem;">${hireling.name} advances to level ${curLevel + 1}. Choose <strong>three</strong> attributes to raise by +1:</p>
      <div style="display:flex;flex-wrap:wrap;">${boxes}</div>
      <p style="font-size:0.85em;color:#6a5a2a;margin:0.4rem 0 0;"><em>+1 max HP is applied automatically.</em></p>
    </div>`;

  const chosen = await foundry.applications.api.DialogV2.wait({
    window: { title: `Level up — ${hireling.name}`, icon: "fas fa-arrow-up" },
    content,
    buttons: [
      {
        action: "ok", label: "Advance", icon: "fas fa-check", default: true,
        callback: (event, btn, dialog) => {
          const picked = [...dialog.element.querySelectorAll('input[name="attr"]:checked')].map(c => c.value);
          return picked;
        }
      },
      { action: "cancel", label: "Cancel", icon: "fas fa-times", callback: () => null }
    ],
    rejectClose: false,
    submit: v => v
  });

  if (!Array.isArray(chosen)) return;
  if (chosen.length !== 3) { ui.notifications?.warn("FLAIL: choose exactly three attributes."); return; }

  const updates = { "system.level": curLevel + 1 };
  for (const k of chosen) {
    const base = hireling.system?.attributes?.[k]?.base ?? 0;
    updates[`system.attributes.${k}.base`] = base + 1;
  }
  const maxHp = hireling.system?.hp?.max ?? 0;
  const curHp = hireling.system?.hp?.value ?? 0;
  updates["system.hp.max"] = maxHp + 1;
  updates["system.hp.value"] = curHp + 1;
  await hireling.update(updates);

  const extras = [];
  // Apprentice learns a new arcane spell at each level.
  if (hireling.system?.hirelingType === "apprentice") {
    const spell = await pickRandomArcaneSpell();
    if (spell) {
      const data = spell.toObject();
      delete data._id;
      data.flags = data.flags ?? {};
      data.flags.flail = { ...(data.flags.flail ?? {}), fromHirelingGrant: true };
      await hireling.createEmbeddedDocuments("Item", [data]);
      extras.push(`learned ${spell.name}`);
    }
  }

  // A per-level daily ability (Healer) gets its charge pool bumped.
  if (hireling.system?.hirelingType === "healer") {
    await hireling.update({ "system.abilityUsesLeft": curLevel + 1 });
  }

  ui.notifications?.info(
    `FLAIL: ${hireling.name} is now level ${curLevel + 1} — +1 to ${chosen.map(k => k.toUpperCase()).join(", ")}, +1 max HP` +
    (extras.length ? `, ${extras.join(", ")}.` : ".")
  );
}

/* ------------------------------------------------------------------ */
/*  Repeatable abilities (Healer / Armourer / Blacksmith)             */
/* ------------------------------------------------------------------ */

/** Does this hireling type have a trackable, repeatable ability? */
export function hasRepeatableAbility(hireling) {
  return ["healer", "armourer", "blacksmith"].includes(hireling?.system?.hirelingType);
}

/** Start a new day: refresh once-per-day and per-level ability charges. */
export async function resetDaily(hireling) {
  const type = hireling.system?.hirelingType;
  const updates = { "system.abilityDailyUsed": false };
  updates["system.abilityUsesLeft"] = (type === "healer") ? (hireling.system?.level ?? 1) : 0;
  await hireling.update(updates);
  if (hasRepeatableAbility(hireling)) {
    ui.notifications?.info(`FLAIL: a new day dawns — ${hireling.name}'s ability is refreshed.`);
  }
}

/** Dispatch the hireling's repeatable ability by type. */
export async function useHirelingAbility(hireling) {
  switch (hireling.system?.hirelingType) {
    case "healer":     return useHealer(hireling);
    case "armourer":   return useRepair(hireling, "armour");
    case "blacksmith": return useRepair(hireling, "weapon");
    default:
      ui.notifications?.info(`FLAIL: ${hireling.name}'s ability isn't an automated action — resolve it in play.`);
      return;
  }
}

/** Healer: cure d6 HP, uses = level per day. Heals the patron (or a
 *  selected token's actor if no patron). */
async function useHealer(hireling) {
  const level = hireling.system?.level ?? 1;
  let left = hireling.system?.abilityUsesLeft ?? 0;
  // First use of the day may find the pool at 0 if never reset — seed it.
  if (left <= 0 && !hireling.system?.abilityDailyUsed) left = level;
  if (left <= 0) { ui.notifications?.warn(`FLAIL: ${hireling.name} has no healing left today (uses refresh each day).`); return; }

  const target = getPatron(hireling)
              ?? canvas?.tokens?.controlled?.[0]?.actor
              ?? null;
  if (!target) { ui.notifications?.warn("FLAIL: no patron linked and no token selected to heal."); return; }

  const roll = await new Roll("1d6").evaluate();
  const healed = roll.total;
  const hp = target.system?.hp ?? {};
  const newVal = Math.min(hp.max ?? healed, (hp.value ?? 0) + healed);
  await target.update({ "system.hp.value": newVal });
  await hireling.update({ "system.abilityUsesLeft": left - 1 });

  await roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: hireling }),
    flavor: `<div class="flail-chat-card"><p><i class="fas fa-staff-snake"></i> <strong>${hireling.name}</strong> heals <strong>${target.name}</strong> for ${healed} HP (${left - 1} use(s) left today).</p></div>`
  });
}

/** Armourer / Blacksmith: clear one usage dot on a chosen item, once/day. */
async function useRepair(hireling, itemType) {
  if (hireling.system?.abilityDailyUsed) {
    ui.notifications?.warn(`FLAIL: ${hireling.name} has already used their daily repair today.`);
    return;
  }
  const patron = getPatron(hireling);
  const source = patron ?? hireling;   // repair patron's gear if linked
  const eligible = source.items.filter(i =>
    i.type === itemType && (i.system?.usage?.value ?? 0) > 0
  );
  if (!eligible.length) {
    ui.notifications?.info(`FLAIL: ${source.name} has no ${itemType} with usage to clear.`);
    return;
  }

  let target = eligible[0];
  if (eligible.length > 1) {
    const opts = eligible.map(i =>
      `<option value="${i.id}">${i.name} (${i.system.usage.value}/${i.system.usage.max ?? "?"})</option>`).join("");
    const chosenId = await foundry.applications.api.DialogV2.wait({
      window: { title: `${hireling.name} — clear a usage dot`, icon: "fas fa-hammer" },
      content: `<div style="padding:0.25rem 0;color:#3a2c0a;">
          <p>Which ${itemType} should ${hireling.name} work on?</p>
          <select name="item" style="width:100%;">${opts}</select>
        </div>`,
      buttons: [
        { action: "ok", label: "Clear one dot", icon: "fas fa-screwdriver-wrench", default: true,
          callback: (event, btn, dialog) => dialog.element.querySelector('select[name="item"]')?.value ?? null },
        { action: "cancel", label: "Cancel", icon: "fas fa-times", callback: () => null }
      ],
      rejectClose: false,
      submit: v => v
    });
    if (!chosenId) return;
    target = source.items.get(chosenId) ?? target;
  }

  const cur = target.system?.usage?.value ?? 0;
  if (cur <= 0) { ui.notifications?.info(`FLAIL: ${target.name} has no usage to clear.`); return; }
  await target.update({ "system.usage.value": cur - 1 });
  await hireling.update({ "system.abilityDailyUsed": true });
  await postHirelingCard(hireling, patron,
    `<p><i class="fas fa-hammer"></i> <strong>${hireling.name}</strong> clears a usage dot on <strong>${target.name}</strong> (${cur} → ${cur - 1}).</p>`);
}

/* ------------------------------------------------------------------ */
/*  Death — promote a hireling to a player character                  */
/* ------------------------------------------------------------------ */

/**
 * RAW (p. 56): "If a character dies, its respective player may resume
 * play by recasting their hireling as a level 1 character of their chosen
 * class, retaining any attributes scores and max hp the hireling had at
 * that time."
 *
 * Creates a level-1 character of a chosen class, carrying over the
 * hireling's attribute scores (bases) and max HP, then opens it. Offers
 * to delete the hireling afterwards.
 */
export async function promoteToCharacter(hireling) {
  if (!hireling) return null;

  const classOpts = FLAIL.classKeys
    .map(k => `<option value="${k}">${game.i18n.localize(FLAIL.classes[k].label)}</option>`).join("");

  const choice = await foundry.applications.api.DialogV2.wait({
    window: { title: `Promote ${hireling.name}`, icon: "fas fa-user-graduate" },
    content: `<div style="padding:0.25rem 0;color:#3a2c0a;">
        <p style="margin:0 0 0.4rem;">Recast <strong>${hireling.name}</strong> as a level-1 character, keeping their attribute scores and max HP.</p>
        <label style="display:block;margin-bottom:0.4rem;">Name
          <input type="text" name="cname" value="${foundry.utils.escapeHTML?.(hireling.name) ?? hireling.name}" style="width:100%;"/>
        </label>
        <label style="display:block;margin-bottom:0.4rem;">Class
          <select name="cclass" style="width:100%;">${classOpts}</select>
        </label>
        <label style="display:flex;align-items:center;gap:0.4rem;font-size:0.85em;">
          <input type="checkbox" name="delhire"/> Delete the hireling after promotion
        </label>
      </div>`,
    buttons: [
      { action: "promote", label: "Promote", icon: "fas fa-user-graduate", default: true,
        callback: (event, btn, dialog) => {
          const form = dialog.element;
          return {
            name: form.querySelector('input[name="cname"]')?.value?.trim() || hireling.name,
            classKey: form.querySelector('select[name="cclass"]')?.value ?? FLAIL.classKeys[0],
            del: !!form.querySelector('input[name="delhire"]')?.checked
          };
        } },
      { action: "cancel", label: "Cancel", icon: "fas fa-times", callback: () => null }
    ],
    rejectClose: false,
    submit: v => v
  });
  if (!choice) return null;

  // Carry over attribute scores (bases) and max HP.
  const attributes = {};
  for (const k of FLAIL.attributeKeys) {
    attributes[k] = { base: hireling.system?.attributes?.[k]?.base ?? 8 };
  }
  const maxHp = hireling.system?.hp?.max ?? 0;

  const created = await Actor.implementation.create({
    name: choice.name,
    type: "character",
    img: hireling.img,
    system: {
      class: choice.classKey,
      level: 1,
      attributes,
      hp: { value: maxHp, max: maxHp }
    }
  });
  if (!created) { ui.notifications?.error("FLAIL: failed to create the character."); return null; }

  await ChatMessage.create({
    content: `<div class="flail-chat-card flail-hireling-card"><p><i class="fas fa-user-graduate"></i> <strong>${hireling.name}</strong> steps up — recast as a level-1 ${game.i18n.localize(FLAIL.classes[choice.classKey].label)} (${maxHp} max HP carried over).</p></div>`
  });

  if (choice.del) await hireling.delete();
  created.sheet?.render(true);
  return created;
}

/* ------------------------------------------------------------------ */
/*  Chat helper                                                       */
/* ------------------------------------------------------------------ */

async function postHirelingCard(hireling, patron, innerHtml) {
  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: patron ?? hireling }),
    content: `<div class="flail-chat-card flail-hireling-card">${innerHtml}</div>`
  });
}
