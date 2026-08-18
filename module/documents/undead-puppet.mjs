/**
 * Bone Whisperer — Undead Puppet token management (v0.4.55).
 *
 * Architecture (per design decisions in v0.4.54 planning):
 *   Decision 1 (Lifecycle):     unlinked token from shared template
 *   Decision 2 (Placement):     first vacant adjacent cell, clockwise from N
 *   Decision 3 (Actor+art):     one stock template, everything derives from BW
 *   Decision 4 (Ownership):     token-level per-summon (OWNER to summoner)
 *   Decision 5 (Crumble):       delete token immediately
 *   Decision 6 (HP truth):      token authoritative after summon
 *   Decision 7 (Combat tracker):don't auto-add — GM's choice
 *   Decision 8 (Chat + token):  both fire
 *   Decision 9 (No BW token):   silent degrade to chat-only
 */

const TEMPLATE_ACTOR_NAME = "Undead Puppet (System Template)";
const TEMPLATE_ACTOR_IMG = "icons/svg/skull.svg";

/**
 * Ensure the shared template actor exists in the world. Called at
 * world init by the GM's client. Uses a flag to detect the template
 * so renaming doesn't break lookup.
 */
export async function ensureUndeadPuppetActor() {
  if (!game.user?.isGM) return null;
  const existing = game.actors.find(a => a.getFlag?.("flail", "undeadPuppetTemplate"));
  if (existing) return existing;

  try {
    const actor = await Actor.create({
      name: TEMPLATE_ACTOR_NAME,
      type: "npc",
      img: TEMPLATE_ACTOR_IMG,
      system: {
        hp: { value: 1, max: 1 }
      },
      ownership: {
        // OBSERVER for all players — the token itself gets OWNER per
        // summon so only the summoning BW's player can move it.
        default: 2
      },
      flags: {
        flail: {
          undeadPuppetTemplate: true
        }
      },
      prototypeToken: {
        name: "Undead Puppet",
        texture: { src: TEMPLATE_ACTOR_IMG },
        actorLink: false,
        disposition: 1,   // FRIENDLY
        displayName: 30,  // ALWAYS_FOR_EVERYONE
        displayBars: 40,  // ALWAYS_FOR_EVERYONE
        sight: { enabled: false }
      }
    });
    ui.notifications?.info("FLAIL: created Undead Puppet template actor.");
    return actor;
  } catch (err) {
    console.error("FLAIL | Failed to create undead puppet template:", err);
    return null;
  }
}

/**
 * Summon an unlinked puppet token adjacent to the BW's token on the
 * currently-viewed scene. Silent no-op if the BW has no token on the
 * canvas (chat card still fires in the calling handler).
 *
 * Placement: walks 8 neighboring grid cells clockwise starting due
 * north. First unoccupied cell wins. If all 8 are taken, drops on the
 * BW's own square (GM moves manually).
 *
 * Ownership: token's underlying actor delta gets OWNER for the
 * current user (the player firing the summon). Template actor
 * remains OBSERVER-default for everyone else.
 *
 * @param {Actor} bwActor  The Bone Whisperer character
 * @returns {TokenDocument|null}
 */
export async function summonUndeadPuppetToken(bwActor) {
  const scene = game.scenes.viewed;
  if (!scene) return null;

  const bwToken = scene.tokens.find(t => t.actorId === bwActor.id);
  if (!bwToken) return null; // silent — no BW token to anchor to

  const template = game.actors.find(a => a.getFlag?.("flail", "undeadPuppetTemplate"));
  if (!template) {
    ui.notifications?.error("FLAIL: undead puppet template actor missing. GM: reload world or check console.");
    return null;
  }

  // Compute placement — 8 cells clockwise from north
  const grid = scene.grid.size;
  const wCells = bwToken.width || 1;
  const hCells = bwToken.height || 1;
  const offsets = [
    [0, -1], [1, -1], [1, 0], [1, 1],
    [0, 1], [-1, 1], [-1, 0], [-1, -1]
  ];

  let placeX = bwToken.x;
  let placeY = bwToken.y;
  for (const [dx, dy] of offsets) {
    const nx = bwToken.x + dx * grid * wCells;
    const ny = bwToken.y + dy * grid * hCells;
    const occupied = scene.tokens.some(t => t.x === nx && t.y === ny);
    if (!occupied) {
      placeX = nx;
      placeY = ny;
      break;
    }
  }

  // Derive puppet stats from BW's sheet
  const puppet = bwActor.system.undeadPuppet ?? {};
  const puppetName = puppet.name || "Undead Puppet";
  const puppetHp = Number(puppet.hp) || 1;
  const puppetMorale = Number(puppet.morale) || 8;
  const puppetTh = Number(puppet.th) || 4;
  const puppetDmg = Number(puppet.damage) || 2;

  // Build token data. Unlinked so each summon is its own instance
  // (actorLink: false). Actor delta overrides the shared template's
  // fields AND embeds a synthetic weapon item so the NPC sheet's
  // "Attacks" table renders the puppet's TH/DMG. FLAIL NPCs don't
  // have TH/DMG as actor fields — attacks live as embedded weapon
  // Items. So to make the puppet's attack visible on its sheet, we
  // create one on the delta at summon time.
  //
  // Critical: `actorId` MUST be set to the template's id, or the
  // token can't resolve its actor on double-click ("Token references
  // an Actor which no longer exists"). `prototypeToken.toObject()`
  // does NOT include actorId — prototype tokens belong to their
  // parent implicitly, but a saved Token document needs the FK
  // explicitly.
  const tokenData = {
    ...template.prototypeToken.toObject(),
    actorId: template.id,
    x: placeX,
    y: placeY,
    name: `${bwActor.name}'s ${puppetName}`,
    actorLink: false,
    disposition: 1,
    delta: {
      system: {
        hp: { value: puppetHp, max: puppetHp },
        morale: puppetMorale,
        creatureType: "undead"
      },
      // Synthetic weapon Item representing the puppet's attack.
      // Rendered on the NPC sheet's attacks list. Delta.items is an
      // array of embedded item data — Foundry synthesises them onto
      // the unlinked token's actor at read time.
      items: [{
        name: `${puppetName} attack`,
        type: "weapon",
        system: {
          th: puppetTh,
          damage: puppetDmg,
          weaponType: "melee",
          range: ["near"],
          category: "puppet",
          description: game.i18n.localize("FLAIL.BoneWhisperer.PuppetAttackHint") || ""
        },
        flags: {
          flail: { isUndeadPuppetAttack: true }
        }
      }],
      ownership: {
        // Token-level ownership: this specific instance is OWNER'd by
        // the summoning player. Template actor's default (OBSERVER)
        // still applies for anyone else.
        [game.user.id]: 3
      }
    },
    flags: {
      flail: {
        isUndeadPuppet: true,
        summonedByActorId: bwActor.id,
        summonedByUserId: game.user.id
      }
    }
  };

  try {
    const [token] = await scene.createEmbeddedDocuments("Token", [tokenData]);
    return token;
  } catch (err) {
    console.error("FLAIL | Failed to create undead puppet token:", err);
    return null;
  }
}

/**
 * Delete all puppet tokens on the current scene that were summoned
 * by the given BW actor. Used by the Morale-save-fail path.
 */
export async function deleteUndeadPuppetTokens(bwActor) {
  const scene = game.scenes.viewed;
  if (!scene) return;
  const puppetTokens = scene.tokens.filter(t =>
    t.getFlag?.("flail", "isUndeadPuppet") &&
    t.getFlag?.("flail", "summonedByActorId") === bwActor.id
  );
  if (puppetTokens.length === 0) return;
  try {
    await scene.deleteEmbeddedDocuments("Token", puppetTokens.map(t => t.id));
  } catch (err) {
    console.error("FLAIL | Failed to delete undead puppet tokens:", err);
  }
}
