/**
 * Wire up interactive chat-card buttons (apply damage, mark usage, etc).
 * Called from the renderChatMessageHTML hook.
 */
import { FLAIL } from "../helpers/config.mjs";

export function registerChatListeners(message, html) {
  // html is a Node in v14 (DOM element, not jQuery).
  const root = html instanceof HTMLElement ? html : html?.[0];
  if (!root) return;

  root.querySelectorAll("[data-flail-action]").forEach(btn => {
    btn.addEventListener("click", ev => onChatAction(ev, message));
  });
}

async function onChatAction(event, message) {
  event.preventDefault();
  const btn = event.currentTarget;
  const action = btn.dataset.flailAction;
  const flags = message.flags?.flail ?? {};

  switch (action) {
    case "applyDamage":  return applyDamage(btn, flags);
    case "applyHealing": return applyHealing(btn, flags);
    case "markWeaponUsage": return markWeaponUsage(flags);
    case "createRumoursJournal": return createRumoursJournal(btn, flags);
    case "celestialAidHolyRay":   return celestialAidHolyRay(btn, flags, message);
    case "celestialAidFullBless": return celestialAidFullBless(btn, flags, message);
    case "celestialAidLitany":    return celestialAidLitany(btn, flags, message);
    case "opportunisticStrike":   return opportunisticStrike(btn, flags, message);
    case "vipersAgility":         return vipersAgility(btn, flags, message);
    case "negateWithArmour":      return negateWithArmour(btn, flags, message);
  }
}

/**
 * Apply attack damage to all selected tokens.
 */
async function applyDamage(btn, flags) {
  const dmg = Number(btn.dataset.amount ?? flags.attackRoll?.damageDealt ?? 0);
  if (!dmg) return;
  const targets = canvas.tokens.controlled;
  if (!targets.length) {
    ui.notifications.warn(game.i18n.localize("FLAIL.Notify.SelectTokens"));
    return;
  }
  for (const t of targets) {
    if (!t.actor) continue;
    await t.actor.applyDamage(dmg);
  }
}

async function applyHealing(btn, flags) {
  const amt = Number(btn.dataset.amount ?? 0);
  if (!amt) return;
  const targets = canvas.tokens.controlled;
  if (!targets.length) return;
  for (const t of targets) await t.actor?.heal?.(amt);
}

async function markWeaponUsage(flags) {
  const id = flags.attackRoll?.weaponId;
  const actorUuid = flags.attackRoll?.actorUuid;
  if (!id || !actorUuid) return;
  const actor = await fromUuid(actorUuid);
  const item = actor?.items?.get(id);
  if (item) item.markUsage();
}

/**
 * Create a journal entry from a Hexcrawl Rumours chat card. The card
 * stores its rolled rumours in `flags.flail.hexcrawlRumours` (array of
 * `{ d20, text }`). The rulebook assigns truth levels by slot — entries
 * 1-3 true, 4-5 partially true, 6 false — which the entry preserves.
 *
 * The new entry opens in its sheet so the GM can immediately rename or
 * rearrange. Foundry deduplicates name collisions automatically.
 */
async function createRumoursJournal(btn, flags) {
  const data = flags?.hexcrawlRumours;
  if (!Array.isArray(data) || !data.length) {
    ui.notifications.warn("FLAIL: no rumours found on this card.");
    return;
  }

  const truthLabel = i =>
      i < 3 ? "True"
    : i < 5 ? "Partially true"
    : "False";

  const itemsHtml = data.map((r, i) => `
    <li>
      <strong>${r.text}</strong><br/>
      <em>(${truthLabel(i)} — rolled d20: ${r.d20})</em>
    </li>
  `).join("");

  const content = `
    <h2>Hexcrawl Rumours</h2>
    <p><em>d6 rumour table for the campaign.</em></p>
    <ol>${itemsHtml}</ol>
    <p><small>Per the FLAIL rulebook (page 66): entries 1-3 should be true, 4-5 partially true, 6 false.</small></p>
  `;

  // Date-stamped name so multiple rolled tables don't collide visually.
  // Foundry will append a number if even the stamped name is taken.
  const dateStamp = new Date().toLocaleDateString();
  const entry = await JournalEntry.create({
    name: `Hexcrawl Rumours (${dateStamp})`,
    pages: [{
      name: "Rumours",
      type: "text",
      text: {
        format: 1,   // CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML
        content
      }
    }]
  });

  if (entry) {
    ui.notifications.info(`Created journal entry "${entry.name}".`);
    entry.sheet?.render(true);
  }
}

/* ============================================================
   Celestial Aid (Cleric) — Full House on a To Hit roll
   ============================================================ */

/**
 * Mark the original attack message's celestialAid flag with the player's
 * chosen effect, then re-render the message content so the choice
 * buttons collapse into a resolved indicator. Used by all three of the
 * Celestial Aid resolvers below.
 */
async function markCelestialAidChosen(message, choice) {
  // Pull the existing flag and patch the `chosen` field.
  const ca = foundry.utils.deepClone(
    message.flags?.flail?.attackRoll?.celestialAid ?? {}
  );
  ca.chosen = choice;

  // Re-render the chat content with the patched template data so the
  // banner switches from buttons to resolved label. We rebuild from the
  // message's original content rather than re-running the whole render,
  // since that data isn't available here — instead, do a targeted DOM
  // patch via a fresh innerHTML for the celestial-aid block.
  await message.update({
    "flags.flail.attackRoll.celestialAid.chosen": choice
  });

  // The message's DOM doesn't auto-re-render from a flag update; manually
  // find and rewrite the celestial-aid section in any active rendering.
  document.querySelectorAll(`[data-message-id="${message.id}"] .celestial-aid-banner`)
    .forEach(el => {
      const chooseLabel = {
        holyRay:           "FLAIL.CelestialAid.HolyRay.Picked",
        fullBlessSelf:     "FLAIL.CelestialAid.FullBlessSelf.Picked",
        fullBlessAllies:   "FLAIL.CelestialAid.FullBlessAllies.Picked",
        litanyOfClarity:   "FLAIL.CelestialAid.LitanyOfClarity.Picked"
      }[choice] ?? "";
      const choices = el.querySelector(".ca-choices");
      const prompt  = el.querySelector(".ca-prompt");
      if (choices) choices.remove();
      if (prompt)  prompt.remove();
      const resolved = document.createElement("div");
      resolved.className = `ca-resolved ca-resolved-${choice}`;
      resolved.innerHTML = `<strong>${game.i18n.localize(chooseLabel)}</strong>`;
      el.appendChild(resolved);
    });
}

/**
 * Holy Ray — d20 damage to one target. Uses the user's currently-
 * targeted token (Foundry's standard target system).
 */
async function celestialAidHolyRay(btn, flags, message) {
  if (flags?.attackRoll?.celestialAid?.chosen) return;  // already used

  const targeted = [...game.user.targets];
  if (!targeted.length) {
    ui.notifications.warn(game.i18n.localize("FLAIL.Notify.HolyRayNoTarget"));
    return;
  }
  const targetActor = targeted[0]?.actor;
  if (!targetActor) {
    ui.notifications.warn(game.i18n.localize("FLAIL.Notify.LayOnHandsNoActor"));
    return;
  }

  const damageRoll = new Roll("1d20");
  await damageRoll.evaluate();
  const damage = damageRoll.total;

  if (typeof targetActor.applyDamage === "function") {
    await targetActor.applyDamage(damage, { ignoreDefence: true });
  } else {
    const hp = targetActor.system?.hp?.value ?? 0;
    await targetActor.update({ "system.hp.value": Math.max(0, hp - damage) });
  }

  await markCelestialAidChosen(message, "holyRay");

  await ChatMessage.create({
    speaker: message.speaker,
    rolls: [damageRoll],
    content: `
      <div class="flail-card cast-card celestial-aid-card outcome-success">
        <header class="card-header">
          <h3><i class="fas fa-bolt"></i> ${game.i18n.localize("FLAIL.CelestialAid.HolyRay.Title")}</h3>
        </header>
        <div class="cast-description">
          <strong>${targetActor.name}</strong> takes <strong>${damage}</strong> divine damage (d20).
        </div>
      </div>`,
    flags: { flail: { celestialAidResolve: { kind: "holyRay", damage } } }
  });
}

/**
 * Full Bless — heal self OR all allies to full health. Opens a quick
 * sub-dialog to pick which.
 */
async function celestialAidFullBless(btn, flags, message) {
  if (flags?.attackRoll?.celestialAid?.chosen) return;

  const choice = await foundry.applications.api.DialogV2.wait({
    window: {
      title: game.i18n.localize("FLAIL.CelestialAid.FullBless.Title"),
      icon: "fas fa-heart"
    },
    content: `<p>${game.i18n.localize("FLAIL.CelestialAid.FullBless.Prompt")}</p>`,
    buttons: [
      { action: "self",    label: game.i18n.localize("FLAIL.CelestialAid.FullBless.Self"),    icon: "fas fa-user",  default: true },
      { action: "allies",  label: game.i18n.localize("FLAIL.CelestialAid.FullBless.Allies"),  icon: "fas fa-users" },
      { action: "cancel",  label: game.i18n.localize("FLAIL.DarkArts.Dialog.Cancel"),         icon: "fas fa-times" }
    ],
    rejectClose: false,
    submit: v => v
  });
  if (!choice || choice === "cancel") return;

  const actorUuid = flags?.attackRoll?.celestialAid?.actorUuid;
  const cleric = actorUuid ? await fromUuid(actorUuid) : null;

  const healed = [];
  if (choice === "self") {
    if (cleric) {
      const max = cleric.system?.hp?.max ?? 0;
      await cleric.update({ "system.hp.value": max });
      healed.push(cleric.name);
    }
  } else {
    // Heal every player-owned character actor to full.
    const allies = game.actors.filter(a =>
      a.type === "character" && a.hasPlayerOwner
    );
    for (const a of allies) {
      const max = a.system?.hp?.max ?? 0;
      await a.update({ "system.hp.value": max });
      healed.push(a.name);
    }
  }

  const chosenKey = choice === "self" ? "fullBlessSelf" : "fullBlessAllies";
  await markCelestialAidChosen(message, chosenKey);

  await ChatMessage.create({
    speaker: message.speaker,
    content: `
      <div class="flail-card cast-card celestial-aid-card outcome-success">
        <header class="card-header">
          <h3><i class="fas fa-heart"></i> ${game.i18n.localize("FLAIL.CelestialAid.FullBless.Title")}</h3>
        </header>
        <div class="cast-description heal-payload">
          ${game.i18n.localize("FLAIL.CelestialAid.FullBless.HealedTo")}
          ${healed.length
            ? `<ul>${healed.map(n => `<li>${n}</li>`).join("")}</ul>`
            : `<em>${game.i18n.localize("FLAIL.CelestialAid.FullBless.None")}</em>`}
        </div>
      </div>`,
    flags: { flail: { celestialAidResolve: { kind: chosenKey, healed } } }
  });
}

/**
 * Litany of Clarity — reset the cleric's prayer fumble threshold back
 * to 20 (only nat-20 fumbles).
 */
async function celestialAidLitany(btn, flags, message) {
  if (flags?.attackRoll?.celestialAid?.chosen) return;

  const actorUuid = flags?.attackRoll?.celestialAid?.actorUuid;
  const cleric = actorUuid ? await fromUuid(actorUuid) : null;
  if (!cleric) return;

  const previous = cleric.system?.resource?.value ?? 0;
  await cleric.update({ "system.resource.value": 20 });

  await markCelestialAidChosen(message, "litanyOfClarity");

  await ChatMessage.create({
    speaker: message.speaker,
    content: `
      <div class="flail-card cast-card celestial-aid-card outcome-success">
        <header class="card-header">
          <h3><i class="fas fa-feather"></i> ${game.i18n.localize("FLAIL.CelestialAid.LitanyOfClarity.Title")}</h3>
        </header>
        <div class="cast-description">
          ${game.i18n.format("FLAIL.CelestialAid.LitanyOfClarity.Resolved", {
            previous, current: 20
          })}
        </div>
      </div>`,
    flags: { flail: { celestialAidResolve: { kind: "litanyOfClarity", previous, current: 20 } } }
  });
}

/* ============================================================
   Opportunistic Strike (Cutthroat) — Two Pair on a To Hit roll
   ============================================================ */

/**
 * Resolve actor + weapon from the original attack message's flags and
 * fire a fresh rollAttack. Marks the message flag as resolved so the
 * button collapses; subsequent clicks on stale renders are no-ops.
 *
 * The follow-up attack is a normal attack — no special bonuses, no
 * stat adjustments. If it itself rolls Two Pair, it gets its own
 * Opportunistic Strike banner; chains are allowed.
 */
async function opportunisticStrike(btn, flags, message) {
  if (flags?.attackRoll?.opportunisticStrike?.resolved) return;

  const os = flags?.attackRoll?.opportunisticStrike;
  if (!os) return;

  const actor = os.actorUuid ? await fromUuid(os.actorUuid) : null;
  if (!actor) {
    ui.notifications.warn("FLAIL: original actor could not be resolved.");
    return;
  }
  const weapon = os.weaponId ? actor.items.get(os.weaponId) : null;
  if (!weapon) {
    ui.notifications.warn(game.i18n.localize("FLAIL.Notify.OpportunisticStrikeWeaponGone"));
    return;
  }

  // Mark the original message's banner as resolved so the button can't
  // be clicked again (and other viewers see it collapse on next render).
  await message.update({
    "flags.flail.attackRoll.opportunisticStrike.resolved": true
  });

  // Manual DOM patch — flag updates don't auto-re-render chat content,
  // so swap the button for a "resolved" indicator across all rendered
  // copies of this message. Mirrors the pattern used by Celestial Aid.
  document.querySelectorAll(`[data-message-id="${message.id}"] .opportunistic-strike-banner`)
    .forEach(el => {
      const button = el.querySelector(".os-btn");
      if (button) button.remove();
      const resolved = document.createElement("div");
      resolved.className = "os-resolved";
      resolved.innerHTML = `<strong>${game.i18n.localize("FLAIL.OpportunisticStrike.Resolved")}</strong>`;
      el.appendChild(resolved);
    });

  // Fire the follow-up attack with the same weapon.
  return actor.rollAttack(weapon, {
    flavor: game.i18n.localize("FLAIL.OpportunisticStrike.Flavor")
  });
}

/* ============================================================
   Viper's Agility (Druid Reptile gift) — second attack at
   disadvantage
   ============================================================ */

/**
 * Fires a second attack with the same weapon at -1 to the To Hit pool.
 * Same shape as the Opportunistic Strike listener: resolve actor +
 * weapon from message flags, mark the flag resolved so the button
 * collapses, then trigger the follow-up via actor.rollAttack.
 *
 * The rulebook allows this as a per-round option, not per-attack, but
 * since FLAIL doesn't formally track rounds in Foundry we surface the
 * option on any Druid attack card and rely on the player + GM to
 * observe the "one second attack per round" limit.
 */
async function vipersAgility(btn, flags, message) {
  if (flags?.attackRoll?.vipersAgility?.resolved) return;

  const va = flags?.attackRoll?.vipersAgility;
  if (!va) return;

  const actor = va.actorUuid ? await fromUuid(va.actorUuid) : null;
  if (!actor) {
    ui.notifications.warn("FLAIL: original actor could not be resolved.");
    return;
  }
  const weapon = va.weaponId ? actor.items.get(va.weaponId) : null;
  if (!weapon) {
    ui.notifications.warn(game.i18n.localize("FLAIL.Notify.OpportunisticStrikeWeaponGone"));
    return;
  }

  await message.update({
    "flags.flail.attackRoll.vipersAgility.resolved": true
  });

  // Manual DOM patch — same trick used by Opportunistic Strike, so the
  // banner button collapses to a resolved indicator across all rendered
  // copies of the message without a full re-render.
  document.querySelectorAll(`[data-message-id="${message.id}"] .gift-vipers-agility`)
    .forEach(el => {
      const button = el.querySelector(".va-btn");
      if (button) button.remove();
      const resolved = document.createElement("div");
      resolved.className = "va-resolved";
      resolved.innerHTML = `<strong>${game.i18n.localize("FLAIL.PrimalGift.VipersAgility.Resolved")}</strong>`;
      el.appendChild(resolved);
    });

  // Fire the second attack at -1 disadvantage on the pool.
  return actor.rollAttack(weapon, {
    advantage: -1,
    flavor: game.i18n.localize("FLAIL.PrimalGift.VipersAgility.Flavor")
  });
}

/* ============================================================
   Armour Negation — Character defenders may mark worn armour to
   negate 1s from an incoming To Hit roll.

   Flow:
     1. Attack card is posted with `flags.attackRoll.armourNegate`
        containing the character target UUIDs + ones count.
     2. Target's owner clicks "Negate with Armour" on the card.
     3. Dialog lists their worn armour (type=armour, worn location,
        remaining usage > 0) with a numeric input per piece.
     4. On confirm: usage is marked on each selected piece; a
        follow-up chat card summarises the negation, computes the
        new tier + damage, and offers a fresh Apply Damage button.

   Rulebook wording: "Characters can mark usage on any worn piece of
   armour to negate one 1 from a To Hit roll made against them. They
   may mark the same piece or multiple pieces any number of times in
   the same round to negate as many 1s as they wish."
   ============================================================ */

/**
 * "Negate with Armour" button handler. Opens the armour selection
 * dialog for the current user's owned character target, marks the
 * selected armour, and posts the follow-up card.
 */
async function negateWithArmour(btn, flags, message) {
  const armourNegate = flags.attackRoll?.armourNegate;
  if (!armourNegate) return;

  // Find a target the current user owns. Multi-target attacks against
  // multiple owned characters would land on the first — GM edge case.
  let targetActor = null;
  for (const t of armourNegate.targets ?? []) {
    const actor = await fromUuid(t.uuid);
    if (actor?.isOwner) { targetActor = actor; break; }
  }
  if (!targetActor) {
    ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NegateArmourNotOwner"));
    return;
  }

  // Only WORN armour items (body or adornment zone) with unused
  // usage dots left. Anything at max usage is "broken" — can't be
  // marked further.
  const wornArmour = targetActor.items.filter(i =>
    i.type === "armour"
    && ["body", "adornment"].includes(i.system?.location)
    && (i.system?.usage?.value ?? 0) < (i.system?.usage?.max ?? 0)
  );
  if (wornArmour.length === 0) {
    ui.notifications?.warn(game.i18n.localize("FLAIL.Notify.NoArmourToMark"));
    return;
  }

  const dialogResult = await openArmourNegateDialog(targetActor, wornArmour, armourNegate);
  if (!dialogResult) return;

  // Mark the armour on the actor.
  const markedList = [];
  for (const [itemId, marks] of Object.entries(dialogResult.marks)) {
    if (!Number.isInteger(marks) || marks <= 0) continue;
    const item = targetActor.items.get(itemId);
    if (!item) continue;
    const cur = item.system.usage.value ?? 0;
    const max = item.system.usage.max ?? 0;
    const newValue = Math.min(max, cur + marks);
    const actual = newValue - cur;
    if (actual > 0) {
      await item.update({ "system.usage.value": newValue });
      markedList.push({ name: item.name, img: item.img, count: actual });
    }
  }

  // Compute the negated outcome. Negations cap at the original ones
  // count (over-marking is wasteful but permitted per rulebook).
  const totalMarks = markedList.reduce((sum, m) => sum + m.count, 0);
  const effectiveNegated = Math.min(totalMarks, armourNegate.ones);
  const newOnes = Math.max(0, armourNegate.ones - effectiveNegated);
  // Re-derive tier from new ones count. Note: an original hit had
  // ones > 0, so it wasn't a fumble; negating to 0 ones = plain miss.
  let newTier;
  if (newOnes >= 3)      newTier = "deathBlow";
  else if (newOnes === 2) newTier = "major";
  else if (newOnes === 1) newTier = "minor";
  else                    newTier = "fail";
  // Damage per new tier — matches the rollToHit computation.
  let newDamage = 0;
  if (newTier === "minor")      newDamage = armourNegate.weaponDamage;
  else if (newTier === "major") newDamage = armourNegate.weaponDamage * 2;
  // deathBlow (instant kill) and fail (miss) carry no numeric damage.

  // Tier labels come from the authoritative FLAIL.hitTier config —
  // the same table rollToHit uses to render the original attack card,
  // so the two cards stay verbally in sync.
  const tierLabel = k => {
    const key = FLAIL.hitTier?.[k]?.label;
    return key ? game.i18n.localize(key) : k;
  };
  const content = await foundry.applications.handlebars.renderTemplate(
    "systems/flail/templates/chat/armour-negation.hbs",
    {
      target: { name: targetActor.name, img: targetActor.img, uuid: targetActor.uuid },
      marks: markedList,
      totalMarks,
      wastedMarks: Math.max(0, totalMarks - armourNegate.ones),
      originalOnes: armourNegate.ones,
      newOnes,
      originalTier: armourNegate.originalTier,
      originalTierLabel: tierLabel(armourNegate.originalTier),
      newTier,
      newTierLabel: tierLabel(newTier),
      newDamage,
      tierChanged: newTier !== armourNegate.originalTier,
      wasFullyNegated: newTier === "fail",
      wasDeathBlow: newTier === "deathBlow",
      verdictDamageLabel: game.i18n.format("FLAIL.Armour.NegateVerdictDamage", { damage: newDamage }),
      wastedLabel: game.i18n.format("FLAIL.Armour.NegateWasted", { count: Math.max(0, totalMarks - armourNegate.ones) })
    }
  );

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor: targetActor }),
    content,
    flags: {
      flail: {
        armourNegation: {
          targetUuid: targetActor.uuid,
          originalMessageId: message.id,
          originalOnes: armourNegate.ones,
          newOnes,
          newTier,
          newDamage
        }
      }
    }
  });
}

/**
 * Build + wait the armour selection dialog. Returns
 * `{ marks: {itemId: count} }` on Confirm, or null on Cancel.
 */
async function openArmourNegateDialog(targetActor, wornArmour, armourNegate) {
  const rowsHtml = wornArmour.map(item => {
    const cur = item.system.usage.value ?? 0;
    const max = item.system.usage.max ?? 0;
    const remaining = max - cur;
    return `
      <div class="armour-negate-row" data-item-id="${item.id}">
        <img class="an-img" src="${item.img}" alt="" />
        <div class="an-info">
          <div class="an-name">${item.name}</div>
          <div class="an-usage">${game.i18n.localize("FLAIL.Armour.NegateUsage")}: ${cur}/${max} — ${remaining} ${game.i18n.localize("FLAIL.Armour.NegateAvailable")}</div>
        </div>
        <input type="number" class="an-marks" name="marks-${item.id}"
               min="0" max="${remaining}" step="1" value="0"
               aria-label="${game.i18n.format("FLAIL.Armour.NegateMarksAria", { name: item.name })}" />
      </div>
    `;
  }).join("");

  const content = `
    <form class="armour-negate-form">
      <p class="an-summary">${game.i18n.format("FLAIL.Armour.NegatePrompt", {
        ones: armourNegate.ones
      })}</p>
      <div class="an-list">${rowsHtml}</div>
      <p class="an-hint">${game.i18n.localize("FLAIL.Armour.NegateHint")}</p>
    </form>
  `;

  const chosen = await foundry.applications.api.DialogV2.wait({
    window: {
      title: game.i18n.format("FLAIL.Armour.NegateDialogTitle", { target: targetActor.name }),
      icon: "fas fa-shield-halved"
    },
    content,
    buttons: [
      {
        action: "confirm",
        label: game.i18n.localize("FLAIL.Armour.NegateConfirm"),
        icon: "fas fa-check",
        default: true,
        callback: (event, btn, dialog) => {
          const form = dialog.element.querySelector("form");
          const marks = {};
          for (const item of wornArmour) {
            const input = form.querySelector(`input[name="marks-${item.id}"]`);
            const v = Math.max(0, parseInt(input?.value ?? "0", 10) || 0);
            if (v > 0) marks[item.id] = v;
          }
          return { marks };
        }
      },
      {
        action: "cancel",
        label: game.i18n.localize("FLAIL.Armour.NegateCancel"),
        icon: "fas fa-times",
        callback: () => null
      }
    ],
    rejectClose: false,
    submit: v => v
  });

  return (chosen && typeof chosen === "object") ? chosen : null;
}

/**
 * Hide the "Negate with Armour" button on rendered chat messages for
 * any user who does not own any of the listed character targets. This
 * keeps the button interaction-free for other players / the attacker
 * without needing per-user card variants server-side.
 */
Hooks.on("renderChatMessageHTML", (message, html) => {
  const armourNegate = message.flags?.flail?.attackRoll?.armourNegate;
  if (!armourNegate) return;
  const btn = html.querySelector?.(".flail-armour-negate-btn");
  if (!btn) return;
  const owned = (armourNegate.targets ?? []).some(t => {
    // fromUuidSync avoids an async render hook — targets should already
    // be loaded when the message renders in-session.
    const actor = fromUuidSync(t.uuid);
    return actor?.isOwner;
  });
  if (!owned) btn.style.display = "none";
});
