# UNOFFICIAL FLAIL! Foundry VTT System

An unofficial Foundry VTT implementation of **FLAIL!**, the old-school fantasy brawler by Andre Novoa.

## Install

In Foundry VTT, go to **Configuration → Game Systems → Install System**, paste this URL into the *Manifest URL* field, and click Install:

```
https://github.com/reubentaylor/flail-system/releases/latest/download/system.json
```

Updates come through automatically on Foundry's next startup after a new release is published.

**Compatibility:** Foundry VTT v13–v14.

## What's included

- **Eight character classes** — Bard, Bone Whisperer, Cleric, Cutthroat, Druid, Tinkerer, Warrior, Wizard — each with class-specific tabs, mechanics, and drag-and-drop panels.
- **Custom NPC and Construct sheets** with attack triggers (Death Blow / Major Hit / Any Hit), multi-attack support, and special-rules cards.
- **Dice mechanics** — roll-under saves with crit/fumble handling, poker-dice combat resolution, mana-cost spellcasting with backlash tables, prayer casting with God's Wrath, instrument performance with used-out tracking.
- **Slot-based inventory** with zone types (hands, body, adornment, satchel, instruments), multi-slot items, and STR-gated satchel slots.
- **World compendia** created automatically on first load:
  - Common Items (99)
  - Unique Items (99, including 8 class item sets)
  - Bestiary (64 monsters across 10 categories, with per-monster token art)
  - Wizard Spells (43)
  - Divine Prayers, Dark Spells, Conditions
  - Primal Gifts (25), Tinkerer Gadgets (20), Cutthroat Thieving Talents (12)
  - Guilds, Hexcrawl Tables, Roll Tables, Macros
- **Random-generation macros** — Death Table, Crossing a Hex, Reactions, Weather, Build Dungeon, Build Wizard Tower, Build Cave, plus adventure-site rollers (Puzzle / Obstacle / Trap / Anomaly).

Shift+click to roll with advantage
Ctrl+Click to roll with disadvantage
Alt+Click to modify a roll

## Credits

**FLAIL!** is © Andre Novoa. This is an unofficial community implementation. Please buy the rulebook to support Andre when the game becomes available.

Foundry VTT implementation by Reuben Taylor. All thoughts and suggestions welcome — open an issue or pull request.

Flail Rules are available free(!): https://www.backerkit.com/c/projects/games-omnivorous/flail-an-old-school-fantasy-brawler
Please support Andre Novoa and his amazing work by subscribing to his Patreon: https://www.patreon.com/cw/GamesOmnivorous

## Development

Every version bump follows this flow:

1. Edit `system.json` to bump the `version` field (optional — the release workflow will do it for you).
2. Commit and push to `main`.
3. Tag the commit: `git tag v0.2.0 && git push --tags`.
4. The GitHub Actions workflow automatically builds `flail.zip` and publishes a release with the tag name. Foundry installations pick the new version up on next startup via the manifest URL.

Local install for development: clone the repo directly into `<Foundry Data>/systems/flail/` and reload the world.

## Licence

MIT for the system's code and structure; the transcribed rulebook content and bundled illustrations remain © Andre Novoa and are included by permission for use with the official rulebook.
