import { rollToHit } from "../dice/to-hit.mjs";

/**
 * Item document with a few system-aware methods.
 * Most of the system specific behaviour lives on the data models, but it's
 * convenient to expose roll/use shortcuts on the Item itself.
 */
export class FlailItem extends Item {

  /**
   * Roll a To Hit with this weapon, if applicable.
   * @returns {Promise<ChatMessage|null>}
   */
  async roll() {
    if (!this.actor) return null;
    if (this.type === "weapon") return this.actor.rollAttack(this);
    // Other item types: post the description as a chat card.
    return this.toChat();
  }

  /**
   * Post a chat card displaying this item.
   */
  async toChat() {
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const content = `
      <div class="flail item-card" data-item-id="${this.id}">
        <header class="card-header">
          <img src="${this.img}" width="36" height="36" />
          <h3>${this.name}</h3>
        </header>
        ${this.system.description ? `<div class="card-description">${this.system.description}</div>` : ""}
      </div>`;
    return ChatMessage.create({ speaker, content });
  }

  /**
   * Mark a usage dot.
   * @returns {Promise<this>}
   */
  async markUsage() {
    if (typeof this.system.markUsage === "function") return this.system.markUsage();
    return this;
  }
}
