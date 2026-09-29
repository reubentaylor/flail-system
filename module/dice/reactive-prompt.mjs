/**
 * Reactive combat-talent prompts (Ship 3).
 *
 * When an attack resolves against a targeted Warrior who holds a reactive
 * talent (Reflexes / Deflect / Opportunist), we whisper that Warrior's
 * owner (and the GM) a reaction card with an inline button. The Warrior's
 * player decides whether to use the reaction; clicking the button
 * auto-resolves the mechanic (a DEX save, or a free attack) via the chat
 * listener in chat-listeners.mjs.
 *
 * The prompt is created once, on the client that rolled the attack (the
 * end of rollToHit), so there is no multi-client double-fire to guard.
 *
 * Event → reaction mapping:
 *   hitInMelee       → Reflexes    → free Iron Fist attack
 *   hitByRanged      → Deflect     → DEX save to dodge entirely
 *   adversaryFumbles → Opportunist → free one-handed attack
 */

/**
 * Whisper reaction prompts for every reactive talent that fired.
 *
 * @param {object}   opts
 * @param {Actor}    opts.defender    the targeted Warrior
 * @param {Actor}    [opts.attacker]  the attacking actor (for flavour)
 * @param {Array}    opts.reactions   evaluateReactiveTriggers() output
 */
export async function postReactionPrompts({ defender, attacker, reactions } = {}) {
  if (!defender || !Array.isArray(reactions) || reactions.length === 0) return;

  // Whisper to the defender's owners + every GM (so the GM can drive it
  // for an absent player). Mirrors the shapeshift turn-prompt recipients.
  const whisper = [
    ...game.users.filter(u => u.isGM).map(u => u.id),
    ...game.users.filter(u => u.testUserPermission?.(defender, "OWNER") && !u.isGM).map(u => u.id)
  ];

  for (const r of reactions) {
    const attackerLine = attacker
      ? `<p class="flail-reaction-src">Triggered by ${escapeHtml(attacker.name)}.</p>`
      : "";
    const content = `
      <div class="flail-chat-card flail-reaction-card" style="background:#f6f0e1;border:1px solid #b58b3e;border-radius:4px;padding:0.6em 0.9em;">
        <header style="display:flex;align-items:center;gap:0.4em;margin-bottom:0.35em;">
          <i class="fas ${escapeHtml(r.icon || "fa-bolt")}"></i>
          <strong>${escapeHtml(r.title || r.talentName)}</strong>
        </header>
        <div class="flail-reaction-body">${r.text ?? ""}</div>
        ${attackerLine}
        <button type="button" class="flail-reaction-btn"
                data-flail-action="resolveReaction"
                style="margin-top:0.45em;width:100%;">
          Use ${escapeHtml(r.talentName)}
        </button>
      </div>`;

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: defender }),
      content,
      whisper,
      flags: {
        flail: {
          reaction: {
            actorId: defender.id,
            actorUuid: defender.uuid,
            event: r.event,
            talentName: r.talentName,
            resolved: false
          }
        }
      }
    });
  }
}

/**
 * Execute a reaction's mechanic on the reacting Warrior. Shared by the
 * whispered prompt button (chat-listeners) and the manual fallback
 * button on the character sheet.
 *
 *   hitByRanged      (Deflect)     → DEX save to dodge entirely
 *   hitInMelee       (Reflexes)    → free Iron Fist attack
 *   adversaryFumbles (Opportunist) → free one-handed melee attack
 *
 * @param {Actor}  actor  the reacting Warrior
 * @param {string} event  reactive event key
 * @returns {Promise<boolean>} true if the reaction fired
 */
export async function executeReaction(actor, event) {
  if (!actor) return false;
  switch (event) {
    case "hitByRanged":
      await game.flail.rollSave(actor, "dex");
      return true;

    case "hitInMelee":
      await game.flail.triggerSheetAction(actor, "rollIronFistAttack");
      return true;

    case "adversaryFumbles": {
      const weapons = actor.items.filter(i =>
        i.type === "weapon"
        && i.system?.weaponType !== "missile"
        && !i.system?.twoHanded
      );
      if (weapons.length === 0) {
        ui.notifications?.warn("FLAIL: no one-handed melee weapon to make a free attack with.");
        return false;
      }
      let weapon = weapons[0];
      if (weapons.length > 1) {
        weapon = await pickReactionWeapon(weapons);
        if (!weapon) return false; // cancelled
      }
      await game.flail.triggerSheetAction(actor, "rollAttack", { itemId: weapon.id });
      return true;
    }

    default:
      return false;
  }
}

/**
 * Chooser for the Opportunist free-attack weapon when the Warrior carries
 * more than one one-handed melee weapon.
 * @param {Item[]} weapons
 * @returns {Promise<Item|null>}
 */
async function pickReactionWeapon(weapons) {
  const buttons = weapons.map(w => ({ action: w.id, label: w.name, callback: () => w.id }));
  buttons.push({ action: "cancel", label: "Cancel", callback: () => null });
  const chosenId = await foundry.applications.api.DialogV2.wait({
    window: { title: "Opportunist — free attack" },
    content: `<p style="margin:0 0 0.5em 0;">Choose a weapon for the free attack:</p>`,
    buttons,
    submit: v => v
  }).catch(() => null);
  return weapons.find(w => w.id === chosenId) ?? null;
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
