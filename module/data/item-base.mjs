/**
 * Shared fields every FLAIL Item carries.
 *
 * Most items occupy inventory slots, have usage dots, and a description.
 * Subclasses extend this with type-specific fields.
 */

const { fields } = foundry.data;

/**
 * Re-usable schema fragments to keep subclasses DRY.
 */
export function inventoryFields() {
  return {
    location: new fields.StringField({
      required: true,
      blank: false,
      initial: "unequipped",
      choices: ["unequipped", "hands", "body", "adornment", "satchel", "instruments", "constructCarried", "constructStashed"]
    }),
    slotIndex: new fields.NumberField({
      required: true,
      integer: true,
      min: 0,
      initial: 0,
      nullable: false
    }),
    slotsRequired: new fields.NumberField({
      required: true,
      integer: true,
      min: 1,
      initial: 1
    }),
    twoHanded: new fields.BooleanField({ initial: false })
  };
}

export function usageFields() {
  return {
    usage: new fields.SchemaField({
      max: new fields.NumberField({ integer: true, min: 0, initial: 3 }),
      value: new fields.NumberField({ integer: true, min: 0, initial: 0 })
    })
  };
}

export function descriptionField() {
  return {
    description: new fields.HTMLField({ required: false, blank: true, initial: "" })
  };
}

export function priceField() {
  return {
    cost: new fields.NumberField({ integer: true, min: 0, initial: 0 })
  };
}

/**
 * Base class — most item subtypes inherit these.
 * (Conditions skip price/usage but get inventory + description.)
 */
export class FlailItemBaseModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...inventoryFields(),
      ...usageFields(),
      ...descriptionField(),
      ...priceField(),
      quantity: new fields.NumberField({ integer: true, min: 1, initial: 1 })
    };
  }

  /**
   * @returns {boolean} whether the item is currently broken (all usage marked).
   */
  get isBroken() {
    return this.usage.max > 0 && this.usage.value >= this.usage.max;
  }

  /**
   * Mark one usage dot, capped at max.
   * @returns {Promise<this>}
   */
  async markUsage() {
    if (!this.parent) return this;
    const next = Math.min(this.usage.max, this.usage.value + 1);
    await this.parent.update({ "system.usage.value": next });
    return this;
  }

  /**
   * Repair (clear all usage dots).
   */
  async repair() {
    if (!this.parent) return this;
    await this.parent.update({ "system.usage.value": 0 });
    return this;
  }
}
