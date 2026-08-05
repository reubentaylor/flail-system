import { FlailItemBaseModel, inventoryFields, descriptionField, usageFields, priceField } from "./item-base.mjs";
import { FLAIL } from "../helpers/config.mjs";

const { fields } = foundry.data;

/* -------------------------------------------- */
/*  Weapon                                      */
/* -------------------------------------------- */

export class FlailWeaponModel extends FlailItemBaseModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      th: new fields.NumberField({ integer: true, min: 0, initial: 4 }),
      damage: new fields.NumberField({ integer: true, min: 0, initial: 2 }),
      range: new fields.SetField(
        new fields.StringField({ choices: ["near", "distant", "far"] }),
        { initial: ["near"] }
      ),
      weaponType: new fields.StringField({
        choices: ["melee", "missile"], initial: "melee"
      }),
      // Speciality category — used to test against class weapon specialties.
      // Free-form string so GMs can invent new categories.
      category: new fields.StringField({ blank: true, initial: "" }),
      // Specialty tags — multiple matchable names per weapon, both specific
      // ("shortSword") and broad ("blade"). The class specialty check passes
      // if ANY tag here appears in the class's `weaponSpecialty` list.
      // Distinct from `category` (which is a single broad bucket the GM may
      // use for filtering / display). Either source can satisfy the match.
      tags: new fields.ArrayField(
        new fields.StringField({ blank: false }),
        { initial: [] }
      ),
      // NPC bestiary attack triggers. Blank on PC weapons (character
      // sheet ignores them); populated on monster attacks to display
      // the "Death Blow / Major Hit / Any hit" clauses from the
      // rulebook's bestiary lines. Rendered under each attack on the
      // NPC sheet — no automation, GMs apply them by hand when the
      // corresponding dice pattern comes up.
      deathBlow: new fields.StringField({ required: false, blank: true, initial: "" }),
      majorHit:  new fields.StringField({ required: false, blank: true, initial: "" }),
      anyHit:    new fields.StringField({ required: false, blank: true, initial: "" })
    };
  }
}

/* -------------------------------------------- */
/*  Armour                                      */
/* -------------------------------------------- */

export class FlailArmourModel extends FlailItemBaseModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      armourType: new fields.StringField({
        choices: Object.keys(FLAIL.armourTypes), initial: "basic"
      }),
      // Defence value — most armour is 0 (only mitigates 1s on To Hit), but
      // some Unique Items (Crocodile Skin gift, Rough Skin side effect) grant
      // flat damage reduction.
      defence: new fields.NumberField({ integer: true, min: 0, initial: 0 })
    };
  }
}

/* -------------------------------------------- */
/*  Gear (generic adventuring kit)              */
/* -------------------------------------------- */

export class FlailGearModel extends FlailItemBaseModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      // Some gear is consumable (grub, torches, ammo) — tracked here.
      consumable: new fields.BooleanField({ initial: false }),
      // Free-form tag, e.g. "lightSource", "ration", "tool" for filtering.
      tag: new fields.StringField({ blank: true, initial: "" })
    };
  }
}

/* -------------------------------------------- */
/*  Spell (Wizard / Bone Whisperer)             */
/* -------------------------------------------- */

export class FlailSpellModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...descriptionField(),
      tradition: new fields.StringField({
        choices: ["arcane", "dark", "illusion", "flame", "shadow", "ooze", "custom"], initial: "arcane"
      }),
      // Some spells reference [DICE] and [SUM] in their effect text.
      // We store the raw text and let the chat card substitute at cast time.
      effectFormula: new fields.StringField({ blank: true, initial: "" }),
      // Default suggested dice for the cast UI.
      suggestedDice: new fields.NumberField({ integer: true, min: 1, max: 6, initial: 1 })
    };
  }
}

/* -------------------------------------------- */
/*  Prayer (Cleric)                             */
/* -------------------------------------------- */

export class FlailPrayerModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...descriptionField(),
      religion: new fields.StringField({ blank: true, initial: "" }),
      // Prayers scale with caster level; no formula needed in data, just text.
      effectFormula: new fields.StringField({ blank: true, initial: "" })
    };
  }
}

/* -------------------------------------------- */
/*  Primal Gift (Druid)                         */
/* -------------------------------------------- */

export class FlailGiftModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...descriptionField(),
      kingdom: new fields.StringField({
        choices: ["mammal", "reptile", "bird", "amphibian", "fish", "insect"],
        initial: "mammal"
      }),
      // Config key — matches an entry in FLAIL.druidPrimalGifts.<kingdom>.gifts
      // so the sheet can look up canonical rules text and mechanical hooks.
      // Blank on a home-brew gift; the sheet will still render it by name.
      giftKey: new fields.StringField({ blank: true, initial: "" }),
      // Once per day usage.
      used: new fields.BooleanField({ initial: false })
    };
  }
}

/* -------------------------------------------- */
/*  Talent (Cutthroat thieving talents)         */
/* -------------------------------------------- */

export class FlailTalentModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...descriptionField(),
      // Which save attribute this talent grants advantage on. May be empty.
      attribute: new fields.StringField({
        choices: ["str", "dex", "cha", "int", "luck"],
        required: false, blank: true, initial: ""
      }),
      // Free-form action key (acrobatics, pickLock, sneakSilently, etc).
      action: new fields.StringField({ blank: true, initial: "" })
    };
  }
}

/* -------------------------------------------- */
/*  Gadget (Tinkerer)                           */
/* -------------------------------------------- */

export class FlailGadgetModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...descriptionField(),
      ...usageFields(),
      gadgetType: new fields.StringField({ blank: true, initial: "" }),
      // Config key — matches an entry in
      // FLAIL.tinkererGadgetBelt.<gadgetType>.gadgets so the sheet
      // can look up canonical rules text and toggle the flat
      // `system.gadgetBelt.<type>.<key>` boolean used by consumers.
      // Blank on a home-brew gadget; the sheet still renders it by
      // name but no mechanical hooks fire.
      gadgetKey: new fields.StringField({ blank: true, initial: "" }),
      // Quick-fire flag: triplet on a To Hit lets the Tinkerer release one
      // gadget for free without marking belt usage.
      lastUsed: new fields.NumberField({ integer: true, min: 0, initial: 0 })
    };
  }
}

/* -------------------------------------------- */
/*  Feature — class skills, racial traits, etc. */
/* -------------------------------------------- */

export class FlailFeatureModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...descriptionField(),
      featureType: new fields.StringField({
        choices: ["class", "race", "background", "other"],
        initial: "class"
      }),
      classKey: new fields.StringField({
        choices: FLAIL.classKeys,
        required: false, blank: true, initial: ""
      })
    };
  }
}

/* -------------------------------------------- */
/*  Condition — occupies an inventory slot      */
/* -------------------------------------------- */

export class FlailConditionModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...inventoryFields(),
      ...descriptionField(),
      conditionType: new fields.StringField({
        choices: [...Object.keys(FLAIL.conditions), "custom"],
        initial: "custom"
      }),
      // Injured-specific: which attribute is reduced. Empty for non-Injured.
      injuredVariant: new fields.StringField({
        choices: ["str", "dex", "th"],
        required: false, blank: true, initial: ""
      }),
      clearRequirement: new fields.StringField({
        choices: ["shortRest", "longRest", "fullRest", "meal", "medicalHealing", "magicOrMiracle", "other"],
        initial: "longRest"
      }),
      // Whether this condition stacks (multiple Poisoneds, Starveds, Injureds).
      stackable: new fields.BooleanField({ initial: false }),
      stackCount: new fields.NumberField({ integer: true, min: 1, initial: 1 })
    };
  }
}

/* -------------------------------------------- */
/*  Instrument (Bard)                           */
/* -------------------------------------------- */

export class FlailInstrumentModel extends FlailItemBaseModel {
  static defineSchema() {
    return {
      ...super.defineSchema(),
      // Short italicised phrase shown under the name on the item sheet
      // and in the chat card ("The obvious choice for the obvious bard",
      // "A cursed instrument that everyone thought was gone", etc).
      // Optional — home-brew instruments can leave it blank.
      tagline: new fields.StringField({ required: false, blank: true, initial: "" }),
      // Each instrument has its own d10 effect table. We store entries as
      // an array of strings, indexed 1-10 (index 0 unused).
      effectTable: new fields.ArrayField(
        new fields.StringField({ blank: true }),
        { initial: () => Array(11).fill("") }
      )
    };
  }
}

/* -------------------------------------------- */
/*  Guild (Cutthroat)                           */
/* -------------------------------------------- */

/**
 * Cutthroat guild — drag a guild Item onto the character sheet to set
 * their guild affiliation. Bundles item-data snapshots for starting
 * talents (dropped onto the guild sheet as talent Items) and special
 * actions (dropped as feature Items), plus sigil description and blurb.
 *
 * Legacy fields `startingTalents` (string keys into FLAIL.cutthroatTalents)
 * and `specialActions` (structured {key,name,description}) are kept in
 * the schema so bundled compendium guilds imported under the old data
 * model continue to work. The character-sheet drop handler prefers the
 * new item-data arrays when present and falls back to the legacy fields
 * otherwise.
 */
export class FlailGuildModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ...descriptionField(),
      blurb: new fields.StringField({ required: false, blank: true, initial: "" }),
      sigil: new fields.StringField({ required: false, blank: true, initial: "" }),
      // New drop-based fields — full item document snapshots. Each
      // element is passed straight to createEmbeddedDocuments when the
      // guild is dropped onto a Cutthroat.
      talentItems: new fields.ArrayField(
        new fields.ObjectField(),
        { initial: () => [] }
      ),
      actionItems: new fields.ArrayField(
        new fields.ObjectField(),
        { initial: () => [] }
      ),
      // Legacy string keys — still supported by the drop handler for
      // bundled guilds imported under the old data model.
      startingTalents: new fields.ArrayField(
        new fields.StringField({ blank: false }),
        { initial: () => [] }
      ),
      // Legacy structured actions — relaxed from SchemaField to
      // ObjectField so bundled guilds continue to load without
      // validation errors.
      specialActions: new fields.ArrayField(
        new fields.ObjectField(),
        { initial: () => [] }
      )
    };
  }
}
