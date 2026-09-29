/**
 * Bundled Wizard Masters (patrons) — first-class Foundry Items seeded
 * into the `world.flail-masters` compendium at world init (Ship A).
 *
 * All four canonicals (rulebook pp. 42-43) + one editable "Custom
 * Master" template. Repertoire spell names match documents in
 * `world.flail-wizard-spells`; the importer resolves them to
 * { uuid, name } after the wizard-spells pack exists.
 */

/**
 * FNV-1a 32-bit hash → 16-char hex ID. Stable across runs for the same
 * seed name, so re-syncing a bundled Master updates the same document
 * rather than creating duplicates. (Identical to stableReligionId.)
 */
export function stableMasterId(seed) {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  const first = h.toString(16).padStart(8, "0");
  let h2 = 0x811c9dc5;
  for (let i = 0; i < first.length; i++) {
    h2 ^= first.charCodeAt(i);
    h2 = (h2 + ((h2 << 1) + (h2 << 4) + (h2 << 7) + (h2 << 8) + (h2 << 24))) >>> 0;
  }
  return (first + h2.toString(16).padStart(8, "0")).slice(0, 16);
}

/**
 * The 4 canonical FLAIL Masters + Custom Master template. Repertoire
 * `spells` list names only; the importer resolves them to { uuid, name }
 * against the wizard-spells compendium.
 */
export function buildMastersData() {
  return [
    {
      _id: stableMasterId("master:flakumeg"),
      name: "Flakumeg, the Flame Whisperer",
      type: "master",
      img: "icons/magic/fire/flame-burning-hand-orange.webp",
      system: {
        tagline: "Legendary pyromancer that keeps folk warm in the Frostlands.",
        description: "<p>A legendary pyromancer who keeps folk warm in the Frostlands. Those who apprentice under Flakumeg learn to bend fire to their will.</p>",
        stats: "Level 6 · 10 hp · Saves 16 · Morale 13 · Mana 20 · Human",
        tradition: "flame",
        signatureItem: { uuid: "", name: "Emberspire Rod" },
        signatureItemNote: "Emberspire Rod: TH 5, DMG 2. On two pairs, shoots a firebolt onto any target for d6 damage.",
        spells: [
          { name: "Fireball" },
          { name: "Firebolt" },
          { name: "Flame" },
          { name: "Rain of Fire" },
          { name: "Wall of Fire" }
        ],
        attributeBonuses: [],
        isCustomTemplate: false
      }
    },
    {
      _id: stableMasterId("master:ukraal"),
      name: "Û-Kraal, the Shadow Manipulator",
      type: "master",
      img: "icons/magic/unholy/silhouette-robe-evil-power.webp",
      system: {
        tagline: "Powerful sorcerer who dwells unseen across shadows.",
        description: "<p>A powerful sorcerer who dwells unseen across shadows. Û-Kraal's apprentices learn to walk between darkness and light.</p>",
        stats: "Level 7 · 12 hp · Saves 13 · Morale 16 · Mana 22 · Dark Elf",
        tradition: "shadow",
        signatureItem: { uuid: "", name: "Nightcoil Staff" },
        signatureItemNote: "Nightcoil Staff: TH 6, DMG 2. On any hit, may immediately move into any shadow within eyesight.",
        spells: [
          { name: "Black Threshold" },
          { name: "Devour Light" },
          { name: "Grasping Dark" },
          { name: "Shadow Walk" },
          { name: "Stolen Silhouette" },
          { name: "Umbral Exile" }
        ],
        attributeBonuses: [],
        isCustomTemplate: false
      }
    },
    {
      _id: stableMasterId("master:oozzeborne"),
      name: "OooOozey Oozzeborne, Ruler of Oozes",
      type: "master",
      img: "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
      system: {
        tagline: "Formidable mage from the hot Swamps that researches slime.",
        description: "<p>A formidable mage from the hot Swamps who researches slime. Oozzeborne's apprentices learn to command the formless.</p>",
        stats: "Level 7 · 13 hp · Saves 17 · Morale 15 · Mana 22 · Human-Ooze",
        tradition: "ooze",
        signatureItem: { uuid: "", name: "Slimesceptre" },
        signatureItemNote: "Slimesceptre: TH 6, DMG 2. On any hit, may cast Assimilate Filth as a free action.",
        spells: [
          { name: "Assimilate Filth" },
          { name: "Blob Army" },
          { name: "Jellification" },
          { name: "Gelatine Mess" },
          { name: "Gooey Grasp" },
          { name: "Ooze Form" }
        ],
        attributeBonuses: [],
        isCustomTemplate: false
      }
    },
    {
      _id: stableMasterId("master:chooChoo"),
      name: "Choo-Choo, Master of Deceit",
      type: "master",
      img: "icons/magic/control/hypnosis-mesmerism-eye.webp",
      system: {
        tagline: "Famous illusionist that lives in City of Shadows.",
        description: "<p>A famous illusionist who lives in the City of Shadows. Choo-Choo's apprentices learn that reality is a matter of opinion.</p>",
        stats: "Level 8 · 15 hp · Saves 19 · Morale 12 · Mana 30 · Halfling",
        tradition: "illusion",
        signatureItem: { uuid: "", name: "Shadowfang Dagger" },
        signatureItemNote: "Shadowfang Dagger: TH 5, DMG 3. On any hit, may cast a spell immediately as a free action.",
        spells: [
          { name: "Colour Spray" },
          { name: "French Drop" },
          { name: "Masquerade" },
          { name: "Invisibility" },
          { name: "Phantasmal Force" },
          { name: "Ventriloquism" }
        ],
        attributeBonuses: [],
        isCustomTemplate: false
      }
    },
    {
      _id: stableMasterId("master:custom"),
      name: "Custom Master",
      type: "master",
      img: "icons/svg/mystery-man.svg",
      system: {
        tagline: "A blank patron template — duplicate, rename, and build your own.",
        description: "<p><strong>Custom Master template.</strong> Duplicate this item, rename it to your homebrew patron, then drag Wizard spell items into its repertoire. Drop the finished Master onto a Wizard to make them its apprentice — they'll start with three random arcane spells plus two from this repertoire.</p>",
        stats: "",
        tradition: "custom",
        signatureItem: { uuid: "", name: "" },
        signatureItemNote: "",
        spells: [],
        attributeBonuses: [],
        isCustomTemplate: true
      }
    }
  ];
}
