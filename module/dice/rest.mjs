/**
 * Rest mechanics (FLAIL rules — Rest & Recovery).
 *
 *   Short rest — one turn → restore d4 hit points.
 *   Long rest  — one watch (eat + sleep) → restore d4+4 hit points,
 *                clear conditions whose clearRequirement === "longRest"
 *                (Drained, Exhausted), reset the Cleric prayer fumble
 *                threshold to 20, and reset any Bard Jack of All
 *                Trades `usedToday` flags.
 *   Full rest  — one week in a safe place → restore ALL hit points,
 *                clear conditions whose clearRequirement is "shortRest",
 *                "longRest", or "fullRest" (Drained, Exhausted, all
 *                three Injured variants), plus the long-rest resets
 *                above. Persistent Injury, Poisoned, Starved, and
 *                Petrified are NOT cleared — their clear conditions
 *                are specifically not rest-related.
 *
 * The three resters share most of their behaviour, so we route through
 * a single `resolveRest` helper.
 */

const REST_TYPES = {
  short: {
    label:             "FLAIL.Rest.Short.Title",
    healFormula:       "1d4",
    healToFull:        false,
    conditionClears:   [],
    resetFumble:       false,
    resetJackOfTrades: false,
    resetInstruments:  true
  },
  long: {
    label:             "FLAIL.Rest.Long.Title",
    healFormula:       "1d4 + 4",
    healToFull:        false,
    conditionClears:   ["longRest"],
    resetFumble:       true,
    resetJackOfTrades: true,
    resetInstruments:  true
  },
  full: {
    label:             "FLAIL.Rest.Full.Title",
    healFormula:       null,    // heal to full
    healToFull:        true,
    conditionClears:   ["shortRest", "longRest", "fullRest"],
    resetFumble:       true,
    resetJackOfTrades: true,
    resetInstruments:  true
  }
};

/**
 * Perform a rest of the given kind for an actor. Mutates the actor and
 * posts a single chat card summarising what happened.
 *
 * @param {object} options
 * @param {Actor}  options.actor  Character actor.
 * @param {("short"|"long"|"full")} options.kind  Rest type.
 * @returns {Promise<ChatMessage|null>}
 */
export async function resolveRest({ actor, kind } = {}) {
  if (!actor) return null;
  const spec = REST_TYPES[kind];
  if (!spec) {
    ui.notifications?.error(`FLAIL: unknown rest kind "${kind}".`);
    return null;
  }

  /* ---------- 1. Heal ---------- */
  const hpBefore = actor.system?.hp?.value ?? 0;
  const hpMax    = actor.system?.hp?.max ?? 0;
  let healRoll = null;
  let healAmount = 0;
  let hpAfter = hpBefore;

  if (spec.healToFull) {
    hpAfter = hpMax;
    healAmount = hpMax - hpBefore;
    await actor.update({ "system.hp.value": hpMax });
  } else if (spec.healFormula) {
    healRoll = new Roll(spec.healFormula);
    await healRoll.evaluate();
    healAmount = healRoll.total;
    if (typeof actor.heal === "function") {
      await actor.heal(healAmount);
    } else {
      const target = Math.min(hpMax, hpBefore + healAmount);
      await actor.update({ "system.hp.value": target });
    }
    hpAfter = actor.system?.hp?.value ?? hpBefore;
  }

  /* ---------- 2. Clear conditions ---------- */
  const conditionsCleared = [];
  if (spec.conditionClears.length) {
    const stale = actor.items.filter(i =>
      i.type === "condition"
      && spec.conditionClears.includes(i.system?.clearRequirement ?? "")
    );
    if (stale.length) {
      conditionsCleared.push(...stale.map(i => i.name));
      await actor.deleteEmbeddedDocuments("Item", stale.map(i => i.id));
    }
  }

  /* ---------- 3. Reset Cleric prayer fumble threshold ---------- */
  let fumbleReset = null;
  if (spec.resetFumble && actor.system?.class === "cleric") {
    const previous = actor.system.resource?.value ?? 20;
    if (previous !== 20) {
      await actor.update({ "system.resource.value": 20 });
      fumbleReset = { from: previous, to: 20 };
    }
  }

  /* ---------- 3b. Refill Wizard mana ---------- */
  // Long rest resets the mana pool back to its computed max (INT + level).
  // Short rests don't refill mana per the rulebook.
  let manaReset = null;
  if (kind === "long" && actor.system?.class === "wizard") {
    const cur = actor.system.resource?.value ?? 0;
    const max = actor.system.resource?.max ?? 0;
    if (cur < max) {
      await actor.update({ "system.resource.value": max });
      manaReset = { from: cur, to: max };
    }
  }

  /* ---------- 4. Reset Bard Jack of All Trades usage on owned items -- */
  let jotReset = false;
  if (spec.resetJackOfTrades && actor.system?.class === "bard") {
    const WIZARD_TRADITIONS = new Set(["arcane", "flame", "shadow", "ooze", "illusion"]);
    const isJoatItem = i =>
         i.type === "talent"
      || i.type === "gadget"
      || (i.type === "spell" && WIZARD_TRADITIONS.has(i.system?.tradition));
    const joatItems = actor.items.filter(isJoatItem);
    const updates = [];
    for (const item of joatItems) {
      if (item.type === "gadget") {
        // Reset spent-usage counter.
        if ((item.system?.usage?.value ?? 0) > 0) {
          updates.push({ _id: item.id, "system.usage.value": 0 });
        }
      } else {
        // Talents + spells: clear the usedToday flag.
        if (item.getFlag("flail", "usedToday")) {
          updates.push({ _id: item.id, "flags.flail.usedToday": false });
        }
      }
    }
    if (updates.length) {
      await actor.updateEmbeddedDocuments("Item", updates);
      jotReset = true;
    }
    // Also clear legacy schema-array usedToday flags for backward compat.
    const legacyJot = actor.system.jackOfAllTrades ?? [];
    if (legacyJot.some(s => s.usedToday)) {
      const updated = legacyJot.map(s => ({ name: s.name, usedToday: false }));
      await actor.update({ "system.jackOfAllTrades": updated });
      jotReset = true;
    }
  }

  /* ---------- 4b. Reset Bard instrument used-out flags -------------- */
  // Per FLAIL v0.2, on a fail or fumble the instrument cannot be
  // played again in the same combat or social situation. Any rest
  // constitutes a natural narrative break — even a short breather —
  // so we clear the flag on every rest type. Bard-only; other
  // classes don't have instrument items in the mechanical sense.
  let instrumentsReset = false;
  if (spec.resetInstruments && actor.system?.class === "bard") {
    const instrumentUpdates = [];
    for (const item of actor.items) {
      if (item.type !== "instrument") continue;
      if (item.getFlag("flail", "usedOut")) {
        instrumentUpdates.push({ _id: item.id, "flags.flail.usedOut": false });
      }
    }
    if (instrumentUpdates.length) {
      await actor.updateEmbeddedDocuments("Item", instrumentUpdates);
      instrumentsReset = true;
    }
  }

  /* ---------- 5. Build chat card ---------- */
  const templateData = {
    actor: { name: actor.name, img: actor.img, uuid: actor.uuid },
    kind,
    label: spec.label,
    healFormula: healRoll?.formula ?? (spec.healToFull ? "to full" : ""),
    healAmount,
    hpBefore,
    hpAfter,
    hpMax,
    healToFull: spec.healToFull,
    conditionsCleared,
    fumbleReset,
    jotReset,
    manaReset,
    instrumentsReset
  };

  const content = await foundry.applications.handlebars.renderTemplate(
    "systems/flail/templates/chat/rest.hbs",
    templateData
  );

  return ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: healRoll ? [healRoll] : [],
    content,
    sound: CONFIG.sounds.dice,
    flags: {
      flail: {
        rest: {
          kind,
          actorUuid: actor.uuid,
          healAmount,
          hpAfter,
          conditionsCleared,
          fumbleReset,
          jotReset
        }
      }
    }
  });
}
