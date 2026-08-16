const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

/**
 * Background Grants Validation Dialog.
 *
 * Opens from the "Validate" button on the background item sheet. For
 * each grant, runs a type-appropriate check and reports pass / warn /
 * fail. Non-mutating — purely diagnostic.
 *
 * Checks per type:
 *   attribute — attrKey must be a known FLAIL attribute
 *                (str/dex/cha/int/luck), attrDelta must be non-zero
 *                (delta 0 = no effect, flag as warn).
 *   item      — itemName must match a document in any Item compendium
 *                (case-insensitive).
 *   crossClass— crossClassSource + crossClassType must produce at
 *                least one candidate item across compendia.
 *   note      — always passes (no automation to validate).
 *
 * Results are shown in a table with a status chip per grant. Green
 * chip = pass, orange = warn (works but suspect), red = fail (will
 * error at apply time). The dialog is read-only — user closes when
 * done reviewing.
 */
export class BackgroundValidateDialog extends HandlebarsApplicationMixin(ApplicationV2) {

  static DEFAULT_OPTIONS = {
    id: "flail-background-validate-dialog-{id}",
    tag: "div",
    classes: ["flail", "background-validate-dialog"],
    position: { width: 560, height: "auto" },
    window: {
      icon: "fa-solid fa-check-double",
      resizable: true
    }
  };

  static PARTS = {
    body: { template: "systems/flail/templates/apps/background-validate-dialog.hbs" }
  };

  constructor(backgroundItem, options = {}) {
    super(options);
    this.backgroundItem = backgroundItem;
  }

  get title() {
    return `Validate — ${this.backgroundItem.name}`;
  }

  async _prepareContext(options) {
    const grants = this.backgroundItem.system?.grants ?? [];
    const results = [];
    let pass = 0, warn = 0, fail = 0;

    for (let i = 0; i < grants.length; i++) {
      const g = grants[i];
      const check = await this.#validateGrant(g);
      results.push({ index: i + 1, grant: g, ...check });
      if (check.status === "pass") pass++;
      else if (check.status === "warn") warn++;
      else fail++;
    }

    return {
      backgroundName: this.backgroundItem.name,
      results,
      hasGrants: results.length > 0,
      summary: { pass, warn, fail, total: results.length }
    };
  }

  async #validateGrant(g) {
    switch (g.type) {
      case "note":
        return { status: "pass", message: "Note grants require no automation." };

      case "attribute": {
        const validKeys = ["str", "dex", "cha", "int", "luck"];
        if (!g.attrKey) {
          return { status: "fail", message: "No attribute selected." };
        }
        if (!validKeys.includes(g.attrKey)) {
          return { status: "fail", message: `Unknown attribute key "${g.attrKey}".` };
        }
        if (!g.attrDelta) {
          return { status: "warn", message: "Delta is 0 — no numeric effect." };
        }
        return { status: "pass", message: `${g.attrKey.toUpperCase()} ${g.attrDelta > 0 ? "+" : ""}${g.attrDelta}` };
      }

      case "item": {
        if (!g.itemName) {
          return { status: "fail", message: "No item name specified." };
        }
        const target = g.itemName.trim().toLowerCase();
        for (const pack of game.packs) {
          if (pack.metadata.type !== "Item") continue;
          const index = await pack.getIndex();
          const hit = [...index].find(e => (e.name ?? "").toLowerCase() === target);
          if (hit) {
            return { status: "pass", message: `Found in "${pack.metadata.label}"` };
          }
        }
        return { status: "fail", message: `No compendium item named "${g.itemName}" found.` };
      }

      case "crossClass": {
        if (!g.crossClassSource || !g.crossClassType) {
          return { status: "fail", message: "Missing source class or item type." };
        }
        let count = 0;
        let sample = "";
        for (const pack of game.packs) {
          if (pack.metadata.type !== "Item") continue;
          const docs = await pack.getDocuments();
          for (const doc of docs) {
            if (doc.type !== g.crossClassType) continue;
            if (g.crossClassSource === "wizard" && g.crossClassType === "spell"
                && doc.system?.tradition === "dark") continue;
            if (g.crossClassSource === "boneWhisperer" && g.crossClassType === "spell"
                && doc.system?.tradition !== "dark") continue;
            count++;
            if (!sample) sample = doc.name;
          }
        }
        if (count === 0) {
          return { status: "fail",
            message: `No ${g.crossClassSource} ${g.crossClassType} items in any compendium.` };
        }
        return { status: "pass",
          message: `${count} candidate(s) available (e.g. "${sample}").` };
      }
    }
    return { status: "fail", message: `Unknown grant type "${g.type}".` };
  }
}
