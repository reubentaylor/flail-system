/**
 * Shared effects runner (v0.4.80).
 *
 * Consumes the `activation` + `effects` primitives defined on any
 * feature item that adopts the shared framework (currently gadgets;
 * future consumers: primal gifts, prayers, dark spells, wizard spells).
 *
 * Design:
 *   - The item is the source of truth. All effect data lives on the
 *     item's system; the runner reads and dispatches per-effect.
 *   - Effects is an array; iterate in order and compose a SINGLE chat
 *     card with stacked blocks (one per effect). Buttons for user-
 *     resolved side-effects (Apply Damage, Apply Save, Apply Heal)
 *     sit inline in each block; a delegated listener wired at world
 *     ready time actions them.
 *   - Target selection is HYBRID — if the user has Foundry targets
 *     set at fire time, use them; otherwise expose Apply buttons that
 *     resolve at click time against whatever targets are selected then.
 *
 * @param {object}  options
 * @param {Actor}   options.actor         Character firing the feature.
 * @param {Item}    options.source        The feature item (gadget, gift, …).
 * @param {Array}   options.effects       Array from source.system.effects.
 * @param {object}  [options.activation]  Object from source.system.activation.
 * @param {object}  [options.chatContext] { flavor?, headerIcon?, headerLabel? }
 * @returns {Promise<ChatMessage|null>}
 */

const NEUTRAL_HEADER_ICON = "fa-cogs";

/**
 * Public entry point.
 */
export async function runEffects({
  actor,
  source,
  effects = [],
  activation = {},
  chatContext = {}
} = {}) {
  if (!actor || !source) return null;
  if (!Array.isArray(effects) || effects.length === 0) return null;

  const targets = [...(game.user?.targets ?? [])];
  const targetUuids = targets.map(t => t.actor?.uuid).filter(Boolean);

  // Per-effect handler dispatch. Each handler returns
  //   { html, rolls?, cssClass? }
  // to be stacked in the final composed card.
  const blocks = [];
  const allRolls = [];
  for (let i = 0; i < effects.length; i++) {
    const eff = effects[i];
    const handler = HANDLERS[eff?.type];
    if (!handler) continue;
    try {
      const block = await handler({
        actor,
        source,
        effect: eff,
        effectIndex: i,
        activation,
        targetUuids
      });
      if (block?.html) blocks.push(block);
      if (Array.isArray(block?.rolls)) allRolls.push(...block.rolls);
    } catch (err) {
      console.error(`FLAIL | effect handler for "${eff.type}" failed:`, err);
    }
  }

  if (!blocks.length) return null;

  // Compose one card.
  const headerIcon  = chatContext.headerIcon  ?? NEUTRAL_HEADER_ICON;
  const headerLabel = chatContext.headerLabel ?? source.name;
  const flavor      = chatContext.flavor ?? source.system?.chatBlurb ?? "";
  const targetHint  = source.system?.targetHint ?? "";

  const content = `
    <div class="flail-chat-card feature-effects-card">
      <header class="fx-header">
        <i class="fas ${headerIcon}"></i>
        <span class="fx-title">${escapeHtml(headerLabel)}</span>
      </header>
      ${flavor ? `<p class="fx-flavor">${flavor}</p>` : ""}
      ${targetHint ? `<p class="fx-target-hint"><i class="fas fa-crosshairs"></i> ${escapeHtml(targetHint)}</p>` : ""}
      <div class="fx-blocks">
        ${blocks.map(b => `<div class="fx-block ${b.cssClass ?? ""}">${b.html}</div>`).join("")}
      </div>
    </div>
  `;

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: allRolls,
    content,
    sound: allRolls.length ? CONFIG.sounds.dice : undefined,
    flags: {
      flail: {
        featureEffects: {
          sourceUuid: source.uuid,
          actorUuid: actor.uuid,
          effectCount: effects.length
        }
      }
    }
  });
}

/* ------------------------------------------------------------------ */
/*  Per-primitive handlers                                            */
/* ------------------------------------------------------------------ */

const HANDLERS = {
  damage:            handleDamage,
  save:              handleSave,
  heal:              handleHeal,
  applyCondition:    handleApplyCondition,
  suppressCondition: handleSuppressCondition,
  // Passive primitives — declared but not fired at activation time.
  // Future consumers read them at save/attack/init time.
  thBonus:            handlePassive,
  defenceBonus:       handlePassive,
  attributeAdvantage: handlePassive,
  skillAdvantage:     handlePassive,
  custom:            handleCustom
};

/* ---------- damage ---------- */

async function handleDamage({ actor, source, effect, effectIndex, activation, targetUuids }) {
  const formula = (effect.formula ?? "").trim();
  if (!formula) return null;
  let roll;
  try {
    roll = new Roll(formula);
    await roll.evaluate();
  } catch (err) {
    console.error(`FLAIL | damage roll "${formula}" failed:`, err);
    return null;
  }

  // Trigger detection — die results that fall in triggerOnResult set.
  const triggerNums = parseNumList(effect.triggerOnResult);
  let triggered = false;
  if (triggerNums.length && roll.dice.length) {
    triggered = roll.dice.some(d => d.results.some(r => triggerNums.includes(r.result)));
  }

  const dmgTypeStr = effect.damageType ? ` <span class="fx-dmg-type">(${escapeHtml(effect.damageType)})</span>` : "";

  const targetsPayload = encodeAttr(targetUuids);
  const buttonLabel = targetUuids.length
    ? `Apply ${roll.total} to ${targetUuids.length} target(s)`
    : `Apply ${roll.total} Damage`;

  let triggerHtml = "";
  if (triggered && effect.triggerEffect === "ricochet") {
    triggerHtml = `<p class="fx-trigger"><i class="fas fa-bolt"></i> <strong>Ricochet!</strong> Roll damage again against another random target.</p>`;
  } else if (triggered && effect.triggerEffect === "condition" && effect.triggerConditionRef?.name) {
    triggerHtml = `<p class="fx-trigger"><i class="fas fa-bolt"></i> <strong>${escapeHtml(effect.triggerConditionName)}!</strong> Apply the condition to the target.
      <button type="button" class="fx-btn" data-fx-action="applyCondition"
              data-fx-condition-uuid="${escapeHtml(effect.triggerConditionUuid)}"
              data-fx-condition-name="${escapeHtml(effect.triggerConditionName)}"
              data-fx-targets="${targetsPayload}">
        <i class="fas fa-tag"></i> Apply ${escapeHtml(effect.triggerConditionName)}
      </button></p>`;
  }

  const html = `
    <header class="fx-block-header"><i class="fas fa-burst"></i> Damage${dmgTypeStr}</header>
    <div class="fx-roll">
      <span class="fx-formula">${escapeHtml(formula)}</span>
      <span class="fx-arrow">→</span>
      <span class="fx-total">${roll.total}</span>
      <span class="fx-detail" title="${escapeHtml(roll.result)}">[${escapeHtml(roll.result)}]</span>
    </div>
    ${triggerHtml}
    <button type="button" class="fx-btn fx-btn-apply-damage" data-fx-action="applyDamage"
            data-fx-amount="${roll.total}"
            data-fx-damage-type="${escapeHtml(effect.damageType ?? '')}"
            data-fx-targets="${targetsPayload}">
      <i class="fas fa-heart-crack"></i> ${escapeHtml(buttonLabel)}
    </button>
  `;
  return { html, rolls: [roll], cssClass: "fx-block-damage" };
}

/* ---------- save ---------- */

async function handleSave({ actor, source, effect, targetUuids }) {
  const attr = (effect.saveAttribute ?? "").toLowerCase();
  if (!attr) return null;

  const condName = effect.saveOnFailConditionRef?.name ?? "";
  const condUuid = effect.saveOnFailConditionRef?.uuid ?? "";
  const dur = effect.saveDurationRounds ?? 0;
  const pushFrom = effect.savePushFrom ?? "";
  const pushTo   = effect.savePushTo ?? "";

  const consequenceBits = [];
  if (condName) {
    consequenceBits.push(dur > 0 ? `apply <strong>${escapeHtml(condName)}</strong> for ${dur} round${dur === 1 ? "" : "s"}` : `apply <strong>${escapeHtml(condName)}</strong>`);
  }
  if (pushFrom && pushTo) {
    consequenceBits.push(`push from ${escapeHtml(pushFrom)} to ${escapeHtml(pushTo)}`);
  }
  const consequenceText = consequenceBits.length
    ? consequenceBits.join(" and ")
    : "GM adjudicates outcome";

  const targetsPayload = encodeAttr(targetUuids);

  const conditionBtn = condName
    ? `<button type="button" class="fx-btn" data-fx-action="applyCondition"
              data-fx-condition-uuid="${escapeHtml(condUuid)}"
              data-fx-condition-name="${escapeHtml(condName)}"
              data-fx-duration="${dur}"
              data-fx-targets="${targetsPayload}">
        <i class="fas fa-tag"></i> Apply ${escapeHtml(condName)} to fail targets
      </button>`
    : "";

  const html = `
    <header class="fx-block-header"><i class="fas fa-shield-halved"></i> Save (${attr.toUpperCase()})</header>
    <p class="fx-save-detail">Targets must save vs <strong>${attr.toUpperCase()}</strong> — on a fail, ${consequenceText}.</p>
    <p class="fx-target-line">${targetUuids.length ? `<i class="fas fa-crosshairs"></i> Targets: ${targetUuids.length}` : `<i class="fas fa-crosshairs"></i> No targets — pick targets first, then Apply.`}</p>
    <button type="button" class="fx-btn" data-fx-action="rollSaves"
            data-fx-attribute="${escapeHtml(attr)}"
            data-fx-source-uuid="${escapeHtml(source.uuid)}"
            data-fx-targets="${targetsPayload}">
      <i class="fas fa-dice-d20"></i> Roll saves for targets
    </button>
    ${conditionBtn}
  `;
  return { html, cssClass: "fx-block-save" };
}

/* ---------- heal ---------- */

async function handleHeal({ actor, source, effect, activation, targetUuids }) {
  const formula = (effect.healFormula ?? "").trim();
  if (!formula) return null;

  let roll;
  try {
    roll = new Roll(formula);
    await roll.evaluate();
  } catch (err) {
    console.error(`FLAIL | heal roll "${formula}" failed:`, err);
    return null;
  }

  const scopes = [];
  if (effect.healAllowsSelf)      scopes.push("self");
  if (effect.healAllowsAlly)      scopes.push("ally");
  if (effect.healAllowsConstruct) scopes.push("construct");
  const scopeText = scopes.length ? scopes.join(" / ") : "any";

  const targetsPayload = encodeAttr(targetUuids);

  const html = `
    <header class="fx-block-header"><i class="fas fa-heart-pulse"></i> Heal</header>
    <div class="fx-roll">
      <span class="fx-formula">${escapeHtml(formula)}</span>
      <span class="fx-arrow">→</span>
      <span class="fx-total">+${roll.total}</span>
      <span class="fx-detail" title="${escapeHtml(roll.result)}">[${escapeHtml(roll.result)}]</span>
    </div>
    <p class="fx-target-line"><i class="fas fa-user-nurse"></i> Legal targets: <strong>${escapeHtml(scopeText)}</strong></p>
    <button type="button" class="fx-btn" data-fx-action="applyHeal"
            data-fx-amount="${roll.total}"
            data-fx-scopes="${escapeHtml(scopes.join(','))}"
            data-fx-targets="${targetsPayload}">
      <i class="fas fa-user-plus"></i> Apply +${roll.total} to target
    </button>
  `;
  return { html, rolls: [roll], cssClass: "fx-block-heal" };
}

/* ---------- applyCondition ---------- */

async function handleApplyCondition({ effect, targetUuids }) {
  const name = effect.conditionName ?? "";
  const uuid = effect.conditionUuid ?? "";
  if (!name) return null;
  const dur = effect.conditionDurationRounds ?? 0;
  const targetsPayload = encodeAttr(targetUuids);
  const durText = dur > 0 ? ` for ${dur} round${dur === 1 ? "" : "s"}` : "";
  const html = `
    <header class="fx-block-header"><i class="fas fa-tag"></i> Apply ${escapeHtml(name)}</header>
    <p class="fx-detail-line">Auto-applies <strong>${escapeHtml(name)}</strong>${durText} to targets.</p>
    <button type="button" class="fx-btn" data-fx-action="applyCondition"
            data-fx-condition-uuid="${escapeHtml(uuid)}"
            data-fx-condition-name="${escapeHtml(name)}"
            data-fx-duration="${dur}"
            data-fx-targets="${targetsPayload}">
      <i class="fas fa-tag"></i> Apply ${escapeHtml(name)} to targets
    </button>
  `;
  return { html, cssClass: "fx-block-condition" };
}

/* ---------- suppressCondition ---------- */

async function handleSuppressCondition({ effect, targetUuids }) {
  const name = effect.conditionName ?? "";
  const dur  = effect.conditionDurationTurns ?? 0;
  if (!name) return null;
  const targetsPayload = encodeAttr(targetUuids);
  const durText = dur > 0 ? ` for ${dur} turn${dur === 1 ? "" : "s"}` : "";
  const html = `
    <header class="fx-block-header"><i class="fas fa-ban"></i> Suppress ${escapeHtml(name)}</header>
    <p class="fx-detail-line">Removes <strong>${escapeHtml(name)}</strong>${durText} from target.</p>
    <button type="button" class="fx-btn" data-fx-action="suppressCondition"
            data-fx-condition-name="${escapeHtml(name)}"
            data-fx-duration-turns="${dur}"
            data-fx-targets="${targetsPayload}">
      <i class="fas fa-hand"></i> Suppress on target
    </button>
  `;
  return { html, cssClass: "fx-block-suppress" };
}

/* ---------- passive (declared but no runtime consumer yet) ---------- */

async function handlePassive({ effect }) {
  const bits = [];
  if (effect.type === "thBonus")            bits.push(`+${effect.passiveValue ?? 0} To Hit`);
  if (effect.type === "defenceBonus")       bits.push(`+${effect.passiveValue ?? 0} Defence`);
  if (effect.type === "attributeAdvantage") bits.push(`Advantage on ${(effect.passiveAttribute ?? "").toUpperCase()} saves`);
  if (effect.type === "skillAdvantage")     bits.push(`Advantage on ${effect.passiveSkill ?? ""} checks`);
  const condition = effect.passiveCondition ? ` (when: ${escapeHtml(effect.passiveCondition)})` : "";
  const html = `
    <header class="fx-block-header"><i class="fas fa-shield"></i> Passive</header>
    <p class="fx-detail-line">${escapeHtml(bits.join(", "))}${condition}</p>
    <p class="fx-hint"><em>Passive effect — not consumed at activation time; documented on card for the player's reference.</em></p>
  `;
  return { html, cssClass: "fx-block-passive" };
}

/* ---------- custom (freeform HTML) ---------- */

async function handleCustom({ effect }) {
  const html = (effect.customHtml ?? "").trim();
  if (!html) return null;
  return {
    html: `<header class="fx-block-header"><i class="fas fa-scroll"></i> Effect</header><div class="fx-custom-body">${html}</div>`,
    cssClass: "fx-block-custom"
  };
}

/* ------------------------------------------------------------------ */
/*  Delegated chat listeners — applied at world ready time            */
/* ------------------------------------------------------------------ */

/**
 * Register a global delegated click listener on the chat log for
 * feature-effect action buttons. Call from the ready hook.
 */
export function registerEffectsChatListeners() {
  // Foundry v13/v14 exposes the chat log; delegated listener on body
  // is safe and matches how other flail chat buttons wire.
  document.body.addEventListener("click", onChatBtnClick);
}

async function onChatBtnClick(event) {
  const btn = event.target.closest?.("[data-fx-action]");
  if (!btn) return;
  const action = btn.dataset.fxAction;
  try {
    if (action === "applyDamage")       return await onApplyDamage(btn);
    if (action === "applyHeal")         return await onApplyHeal(btn);
    if (action === "applyCondition")    return await onApplyCondition(btn);
    if (action === "suppressCondition") return await onSuppressCondition(btn);
    if (action === "rollSaves")         return await onRollSaves(btn);
  } catch (err) {
    console.error(`FLAIL | fx action "${action}" failed:`, err);
    ui.notifications?.error(`FLAIL: effect action failed. See console.`);
  }
}

async function resolveTargets(btn) {
  // Prefer targets baked into the button (fire-time targets); fall
  // back to whatever the user has selected now.
  const baked = decodeAttr(btn.dataset.fxTargets);
  if (baked.length) {
    const resolved = [];
    for (const uuid of baked) {
      const doc = await fromUuid(uuid);
      if (doc?.actor) resolved.push(doc.actor);
      else if (doc?.documentName === "Actor") resolved.push(doc);
    }
    if (resolved.length) return resolved;
  }
  const live = [...(game.user?.targets ?? [])];
  return live.map(t => t.actor).filter(Boolean);
}

async function onApplyDamage(btn) {
  const amount = Number(btn.dataset.fxAmount) || 0;
  const targets = await resolveTargets(btn);
  if (!targets.length) {
    ui.notifications?.warn("FLAIL: no targets — select one or more tokens.");
    return;
  }
  for (const t of targets) {
    const cur = t.system?.hp?.value ?? 0;
    await t.update({ "system.hp.value": Math.max(0, cur - amount) });
  }
  ui.notifications?.info(`FLAIL: applied ${amount} damage to ${targets.length} target(s).`);
}

async function onApplyHeal(btn) {
  const amount = Number(btn.dataset.fxAmount) || 0;
  const targets = await resolveTargets(btn);
  if (!targets.length) {
    ui.notifications?.warn("FLAIL: no targets — select a target.");
    return;
  }
  for (const t of targets) {
    const cur = t.system?.hp?.value ?? 0;
    const max = t.system?.hp?.max ?? cur + amount;
    await t.update({ "system.hp.value": Math.min(max, cur + amount) });
  }
  ui.notifications?.info(`FLAIL: healed ${targets.length} target(s) for ${amount}.`);
}

async function onApplyCondition(btn) {
  const uuid = btn.dataset.fxConditionUuid;
  const name = btn.dataset.fxConditionName;
  if (!uuid && !name) return;
  const targets = await resolveTargets(btn);
  if (!targets.length) {
    ui.notifications?.warn("FLAIL: no targets — select one or more tokens.");
    return;
  }
  let source;
  if (uuid) source = await fromUuid(uuid);
  if (!source) {
    // Fallback: look up in world conditions pack by name.
    const pack = game.packs.get("world.flail-conditions");
    if (pack) {
      const idx = await pack.getIndex();
      const entry = [...idx].find(e => (e.name ?? "").toLowerCase() === (name ?? "").toLowerCase());
      if (entry) source = await pack.getDocument(entry._id);
    }
  }
  if (!source) {
    ui.notifications?.warn(`FLAIL: condition "${name}" not found.`);
    return;
  }
  const data = source.toObject();
  delete data._id;
  for (const t of targets) {
    await t.createEmbeddedDocuments("Item", [data]);
  }
  ui.notifications?.info(`FLAIL: applied ${name} to ${targets.length} target(s).`);
}

async function onSuppressCondition(btn) {
  const name = (btn.dataset.fxConditionName ?? "").toLowerCase();
  const targets = await resolveTargets(btn);
  if (!targets.length) {
    ui.notifications?.warn("FLAIL: no targets — select a target.");
    return;
  }
  let removed = 0;
  for (const t of targets) {
    const cond = t.items?.find(i =>
      i.type === "condition" && (i.name ?? "").toLowerCase() === name
    );
    if (cond) {
      await cond.delete();
      removed++;
    }
  }
  ui.notifications?.info(`FLAIL: removed ${btn.dataset.fxConditionName} from ${removed} target(s).`);
}

async function onRollSaves(btn) {
  const attr = btn.dataset.fxAttribute;
  const targets = await resolveTargets(btn);
  if (!targets.length) {
    ui.notifications?.warn("FLAIL: no targets — select one or more tokens.");
    return;
  }
  for (const t of targets) {
    if (typeof t.rollSave === "function") {
      await t.rollSave(attr, { flavor: `<em>Save vs ${attr.toUpperCase()}</em>` });
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Small utilities                                                    */
/* ------------------------------------------------------------------ */

function parseNumList(str) {
  if (!str) return [];
  return String(str).split(",")
    .map(s => Number(s.trim()))
    .filter(n => Number.isInteger(n));
}

function encodeAttr(arr) {
  return escapeHtml((arr ?? []).join("|"));
}

function decodeAttr(str) {
  if (!str) return [];
  return String(str).split("|").filter(Boolean);
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
