/*
 * FLAIL Macros — bundled at world creation into the
 * `flail-macros` compendium. Users drag these from the compendium
 * to their hotbar for quick access.
 *
 * Currently ships:
 *   • Roll Death Table (d8, Shift = d4 for reduced-die guilds)
 *   • Build Session Events Table (drafts a d4 from 4 unique d20 draws)
 *   • Roll Crossing a Hex (2d6)
 *   • Roll Reactions (2d6)
 *   • Roll Weather (2d6)
 *   • Build Dungeon (rolls d6 on all 5 Dungeons columns)
 *   • Roll Puzzle (d10)
 *   • Roll Obstacle (d10)
 *   • Roll Trap (d10)
 *   • Roll Anomaly (d12)
 *   • Build Wizard Tower — theme + wizard stats + 5 spells + floor stack
 *   • Build Cave — 5 theme columns + 4-7 stocked chambers
 *   • Roll Cave Chamber (d6 + cascading d4 sub-roll)
 *   • Roll Cave Tunnel (d6 gate + d6 encounter + cascading d4 sub-roll)
 */

export const FLAIL_MACROS = [
  {
    "_id": "1c19e137616e88f7",
    "name": "Roll Death Table",
    "img": "icons/svg/skull.svg",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Roll Death Table\n// Draws from the Death Table rolltable. Hold Shift for d4 (Freak\n// Show guild etc.); default is d8. If no rolltable is found in\n// the world or compendium, warns the user.\nconst useD4 = event?.shiftKey === true;\nconst formula = useD4 ? \"1d4\" : \"1d8\";\n\nlet table = game.tables?.getName?.(\"Death Table\") ?? null;\nif (!table) {\n  const pack = game.packs.get(\"world.flail-rolltables\");\n  if (pack) {\n    const idx = await pack.getIndex();\n    const entry = idx.find(e => e.name === \"Death Table\");\n    if (entry) table = await pack.getDocument(entry._id);\n  }\n}\nif (!table) {\n  ui.notifications?.error(\"Death Table not found — is the FLAIL Rolltables compendium loaded?\");\n  return;\n}\n\nconst roll = new Roll(formula);\nawait roll.evaluate();\nconst label = useD4 ? \"d4 (Freak Show / reduced)\" : \"d8 (standard)\";\nui.notifications?.info(`Rolling Death Table — ${label}`);\nawait table.draw({ roll });\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 0,
    "folder": null,
    "author": null
  },
  {
    "_id": "b722cca2f2bc730f",
    "name": "Build Session Events Table",
    "img": "icons/magic/light/beams-rays-orange-purple-large.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Build Session Events Table\n// Rolls d20 four times on the Hexcrawl: Events table, then creates\n// a new d4 rolltable in the world's Rollable Tables directory using\n// the four drawn events. Rolls are without replacement — 4 unique\n// events — so the resulting d4 table always has variety.\n\nlet sourceTable = game.tables?.getName?.(\"Hexcrawl: Events\") ?? null;\nif (!sourceTable) {\n  const pack = game.packs.get(\"world.flail-hexcrawl-tables\");\n  if (pack) {\n    const idx = await pack.getIndex();\n    const entry = idx.find(e => e.name === \"Hexcrawl: Events\");\n    if (entry) sourceTable = await pack.getDocument(entry._id);\n  }\n}\nif (!sourceTable) {\n  ui.notifications?.error(\"Events table not found — is the FLAIL Hexcrawl Tables compendium loaded?\");\n  return;\n}\n\nconst used = new Set();\nconst picks = [];\nlet attempts = 0;\nconst MAX_ATTEMPTS = 200;\nwhile (picks.length < 4 && attempts < MAX_ATTEMPTS) {\n  attempts++;\n  const r = new Roll(\"1d20\");\n  await r.evaluate();\n  const n = r.total;\n  if (used.has(n)) continue;\n  used.add(n);\n  const result = sourceTable.results.find(res => {\n    const lo = res.range?.[0] ?? 1;\n    const hi = res.range?.[1] ?? lo;\n    return lo <= n && n <= hi;\n  });\n  if (!result) continue;\n  picks.push({ n, result });\n}\nif (picks.length < 4) {\n  ui.notifications?.error(`Could only pick ${picks.length} unique events after ${attempts} attempts. Aborting.`);\n  return;\n}\n\nconst eventText = r => r.text || r.name || r.description || \"(no text)\";\n\nconst now = new Date();\nconst dateStr = now.toISOString().split(\"T\")[0];\nconst timeStr = now.toTimeString().split(\" \")[0].slice(0, 5).replace(\":\", \"\");\nconst newTableName = `Session Events ${dateStr} ${timeStr}`;\n\nconst newResults = picks.map((p, i) => ({\n  type: \"text\",\n  text: eventText(p.result),\n  img: p.result.img || \"icons/magic/light/beams-rays-orange-purple-large.webp\",\n  weight: 1,\n  range: [i + 1, i + 1],\n  drawn: false,\n  flags: {}\n}));\n\nconst newTable = await RollTable.create({\n  name: newTableName,\n  img: \"icons/magic/light/beams-rays-orange-purple-large.webp\",\n  description: `<p>Session events drawn from <em>Hexcrawl: Events</em> on ${dateStr}. Roll d4 to determine which event happens next.</p><p>Source rolls: ${picks.map(p => p.n).join(\", \")}.</p>`,\n  formula: \"1d4\",\n  replacement: true,\n  displayRoll: true,\n  results: newResults\n});\n\nui.notifications?.info(`Built d4 rolltable: ${newTable.name}`);\nnewTable.sheet?.render?.(true);\n\nconst rows = picks.map((p, i) =>\n  `<li><strong>${i + 1}.</strong> <em>(rolled ${p.n})</em> ${eventText(p.result)}</li>`\n).join(\"\");\nawait ChatMessage.create({\n  speaker: ChatMessage.getSpeaker(),\n  content: `<div class=\"flail-chat-card\">\n    <header style=\"border-bottom: 2px solid var(--flail-rule, #a08562); padding-bottom: 0.35rem; margin-bottom: 0.5rem;\">\n      <strong style=\"font-family: 'Modesto Condensed', 'Bebas Neue', Impact, sans-serif; text-transform: uppercase; letter-spacing: 0.05em;\">\n        <i class=\"fas fa-dice-d20\"></i> New Session Events Table\n      </strong>\n    </header>\n    <p>Rolled 4 events from <em>Hexcrawl: Events</em> to build the d4 table <strong>${newTable.name}</strong>:</p>\n    <ol style=\"padding-left: 1.5rem;\">${rows}</ol>\n    <p style=\"font-style: italic; font-size: 0.85em; color: #5a4810;\">The new table is in your Rollable Tables directory. Roll d4 on it as events come up during the session.</p>\n  </div>`\n});\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 100,
    "folder": null,
    "author": null
  },
  {
    "_id": "53ac92fb21f50fd5",
    "name": "Roll Crossing a Hex",
    "img": "icons/magic/movement/pinwheel-turning-blue.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Roll Crossing a Hex\n// Draws from the Crossing a Hex rolltable. Uses the table's own\n// formula (2d6) via table.draw() so the standard rolltable chat\n// card renders with the drawn result highlighted.\n\nlet table = game.tables?.getName?.(\"Crossing a Hex\") ?? null;\nif (!table) {\n  const pack = game.packs.get(\"world.flail-rolltables\");\n  if (pack) {\n    const idx = await pack.getIndex();\n    const entry = idx.find(e => e.name === \"Crossing a Hex\");\n    if (entry) table = await pack.getDocument(entry._id);\n  }\n}\nif (!table) {\n  ui.notifications?.error(\"Crossing a Hex table not found \\u2014 is the FLAIL Rolltables compendium loaded?\");\n  return;\n}\n\nui.notifications?.info(\"Rolling Crossing a Hex (2d6)...\");\nawait table.draw();\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 200,
    "folder": null,
    "author": null
  },
  {
    "_id": "cc3619970988c2e5",
    "name": "Roll Reactions",
    "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Roll Reactions\n// Draws from the Reactions rolltable. Uses the table's own\n// formula (2d6) via table.draw() so the standard rolltable chat\n// card renders with the drawn result highlighted.\n\nlet table = game.tables?.getName?.(\"Reactions\") ?? null;\nif (!table) {\n  const pack = game.packs.get(\"world.flail-rolltables\");\n  if (pack) {\n    const idx = await pack.getIndex();\n    const entry = idx.find(e => e.name === \"Reactions\");\n    if (entry) table = await pack.getDocument(entry._id);\n  }\n}\nif (!table) {\n  ui.notifications?.error(\"Reactions table not found \\u2014 is the FLAIL Rolltables compendium loaded?\");\n  return;\n}\n\nui.notifications?.info(\"Rolling Reactions (2d6)...\");\nawait table.draw();\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 300,
    "folder": null,
    "author": null
  },
  {
    "_id": "bf57e4364f3a44ad",
    "name": "Roll Weather",
    "img": "icons/magic/air/air-burst-spiral-blue-gray.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Roll Weather\n// Draws from the Weather rolltable. Uses the table's own\n// formula (2d6) via table.draw() so the standard rolltable chat\n// card renders with the drawn result highlighted.\n\nlet table = game.tables?.getName?.(\"Weather\") ?? null;\nif (!table) {\n  const pack = game.packs.get(\"world.flail-rolltables\");\n  if (pack) {\n    const idx = await pack.getIndex();\n    const entry = idx.find(e => e.name === \"Weather\");\n    if (entry) table = await pack.getDocument(entry._id);\n  }\n}\nif (!table) {\n  ui.notifications?.error(\"Weather table not found \\u2014 is the FLAIL Rolltables compendium loaded?\");\n  return;\n}\n\nui.notifications?.info(\"Rolling Weather (2d6)...\");\nawait table.draw();\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 400,
    "folder": null,
    "author": null
  },
  {
    "_id": "0a5ff35e79be1f95",
    "name": "Build Dungeon",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Build Dungeon\n// Rolls d6 on each of the five Dungeons columns (Flavour, Type,\n// Location, Key Feature, Creatures) and posts a combined chat card\n// summarising the resulting theme. From FLAIL v0.2 p.80.\n\nconst COLUMN_NAMES = [\"Flavour\", \"Type\", \"Location\", \"Key Feature\", \"Creatures\"];\n\n// Locate each column's rolltable — world first, then compendium.\nasync function findTable(name) {\n  let t = game.tables?.getName?.(name) ?? null;\n  if (t) return t;\n  const pack = game.packs.get(\"world.flail-rolltables\");\n  if (pack) {\n    const idx = await pack.getIndex();\n    const entry = idx.find(e => e.name === name);\n    if (entry) return await pack.getDocument(entry._id);\n  }\n  return null;\n}\n\nconst tables = [];\nfor (const col of COLUMN_NAMES) {\n  const t = await findTable(`Dungeons: ${col}`);\n  if (!t) {\n    ui.notifications?.error(`Table \"Dungeons: ${col}\" not found — is the FLAIL Rolltables compendium loaded?`);\n    return;\n  }\n  tables.push(t);\n}\n\n// Roll d6 on each column independently.\nconst picks = [];\nfor (const t of tables) {\n  const r = new Roll(\"1d6\");\n  await r.evaluate();\n  const n = r.total;\n  const result = t.results.find(res => {\n    const lo = res.range?.[0] ?? 1;\n    const hi = res.range?.[1] ?? lo;\n    return lo <= n && n <= hi;\n  });\n  const text = result?.text || result?.name || \"(no text)\";\n  picks.push({ column: t.name.replace(/^Dungeons:\\s*/, \"\"), n, text });\n}\n\n// Combined chat card — one row per column with the rolled value and\n// its drawn entry. Reuses the visual language of the other FLAIL\n// chat cards (Modesto Condensed heading, ochre border) without\n// requiring any new CSS.\nconst rows = picks.map(p =>\n  `<tr>\n     <td style=\"padding: 0.2rem 0.5rem; font-weight: 700; color: #5a4810;\">${p.column}</td>\n     <td style=\"padding: 0.2rem 0.4rem; font-family: ui-monospace, 'Courier New', monospace; color: #7a6842;\">${p.n}</td>\n     <td style=\"padding: 0.2rem 0.5rem;\">${p.text}</td>\n   </tr>`\n).join(\"\");\n\nconst headline = `${picks[0].text} ${picks[1].text}`;\n\nawait ChatMessage.create({\n  speaker: ChatMessage.getSpeaker(),\n  content: `<div class=\"flail-chat-card\">\n    <header style=\"border-bottom: 2px solid var(--flail-rule, #a08562); padding-bottom: 0.35rem; margin-bottom: 0.5rem;\">\n      <strong style=\"font-family: 'Modesto Condensed', 'Bebas Neue', Impact, sans-serif; text-transform: uppercase; letter-spacing: 0.05em; font-size: 1rem;\">\n        <i class=\"fas fa-dungeon\"></i> New Dungeon\n      </strong>\n      <div style=\"font-style: italic; font-size: 0.95em; color: #5a4810; margin-top: 0.15rem;\">${headline}</div>\n    </header>\n    <table style=\"width: 100%; border-collapse: collapse; font-size: 0.9em;\">\n      ${rows}\n    </table>\n    <p style=\"font-style: italic; font-size: 0.8em; color: #7a6842; margin-top: 0.4rem;\">Use as a seed for a 10-area dungeon. See FLAIL v0.2 p.78–80 for stocking guidance.</p>\n  </div>`\n});\n\nui.notifications?.info(`Built dungeon: ${headline}`);\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 500,
    "folder": null,
    "author": null
  },
  {
    "_id": "7844b36f96be86c1",
    "name": "Roll Puzzle",
    "img": "icons/magic/perception/eye-tendrils-web-purple.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Roll Puzzle\n// Draws from the Puzzle rolltable using its own formula.\n\nlet table = game.tables?.getName?.(\"Puzzle\") ?? null;\nif (!table) {\n  const pack = game.packs.get(\"world.flail-rolltables\");\n  if (pack) {\n    const idx = await pack.getIndex();\n    const entry = idx.find(e => e.name === \"Puzzle\");\n    if (entry) table = await pack.getDocument(entry._id);\n  }\n}\nif (!table) {\n  ui.notifications?.error(\"Puzzle table not found \\u2014 is the FLAIL Rolltables compendium loaded?\");\n  return;\n}\n\nui.notifications?.info(\"Rolling Puzzle (d10)...\");\nawait table.draw();\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 600,
    "folder": null,
    "author": null
  },
  {
    "_id": "a075c034268fc6b5",
    "name": "Roll Obstacle",
    "img": "icons/magic/defensive/shield-barrier-blue.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Roll Obstacle\n// Draws from the Obstacle rolltable using its own formula.\n\nlet table = game.tables?.getName?.(\"Obstacle\") ?? null;\nif (!table) {\n  const pack = game.packs.get(\"world.flail-rolltables\");\n  if (pack) {\n    const idx = await pack.getIndex();\n    const entry = idx.find(e => e.name === \"Obstacle\");\n    if (entry) table = await pack.getDocument(entry._id);\n  }\n}\nif (!table) {\n  ui.notifications?.error(\"Obstacle table not found \\u2014 is the FLAIL Rolltables compendium loaded?\");\n  return;\n}\n\nui.notifications?.info(\"Rolling Obstacle (d10)...\");\nawait table.draw();\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 610,
    "folder": null,
    "author": null
  },
  {
    "_id": "fea40e233a09e5b3",
    "name": "Roll Trap",
    "img": "icons/magic/fire/explosion-embers-orange.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Roll Trap\n// Draws from the Trap rolltable using its own formula.\n\nlet table = game.tables?.getName?.(\"Trap\") ?? null;\nif (!table) {\n  const pack = game.packs.get(\"world.flail-rolltables\");\n  if (pack) {\n    const idx = await pack.getIndex();\n    const entry = idx.find(e => e.name === \"Trap\");\n    if (entry) table = await pack.getDocument(entry._id);\n  }\n}\nif (!table) {\n  ui.notifications?.error(\"Trap table not found \\u2014 is the FLAIL Rolltables compendium loaded?\");\n  return;\n}\n\nui.notifications?.info(\"Rolling Trap (d10)...\");\nawait table.draw();\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 620,
    "folder": null,
    "author": null
  },
  {
    "_id": "57b903a7c2a849f0",
    "name": "Roll Anomaly",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Roll Anomaly\n// Draws from the Anomaly rolltable using its own formula.\n\nlet table = game.tables?.getName?.(\"Anomaly\") ?? null;\nif (!table) {\n  const pack = game.packs.get(\"world.flail-rolltables\");\n  if (pack) {\n    const idx = await pack.getIndex();\n    const entry = idx.find(e => e.name === \"Anomaly\");\n    if (entry) table = await pack.getDocument(entry._id);\n  }\n}\nif (!table) {\n  ui.notifications?.error(\"Anomaly table not found \\u2014 is the FLAIL Rolltables compendium loaded?\");\n  return;\n}\n\nui.notifications?.info(\"Rolling Anomaly (d12)...\");\nawait table.draw();\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 630,
    "folder": null,
    "author": null
  },
  {
    "_id": "99f0e195ead9dd5f",
    "name": "Build Wizard Tower",
    "img": "icons/magic/perception/eye-ringed-glow-angry-red.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Build Wizard Tower (extended)\n// Generates a full tower dossier: four theme columns (Shape,\n// Occupant, Reaction, Goal), the wizard's stats (level 6-10, HP\n// 10-20, mana 20-30) with five random spells from the wizard-spells\n// compendium, and a floor-by-floor structural roll (5-7 floors total\n// — N-1 d6s stacked + 1 d4 on top per FLAIL v0.2 p.82). Each d6\n// floor gets a d4 for its specific sub-type; the top d4 rolls the\n// top-floor category.\n\n// ---------- 1. Four theme columns ----------\nconst COLUMN_NAMES = [\"Shape\", \"Occupant\", \"Reaction\", \"Goal\"];\n\nasync function findTable(name) {\n  let t = game.tables?.getName?.(name) ?? null;\n  if (t) return t;\n  const pack = game.packs.get(\"world.flail-rolltables\");\n  if (pack) {\n    const idx = await pack.getIndex();\n    const entry = idx.find(e => e.name === name);\n    if (entry) return await pack.getDocument(entry._id);\n  }\n  return null;\n}\n\nconst tables = [];\nfor (const col of COLUMN_NAMES) {\n  const t = await findTable(`Wizard Towers: ${col}`);\n  if (!t) {\n    ui.notifications?.error(`Table \"Wizard Towers: ${col}\" not found — is the FLAIL Rolltables compendium loaded?`);\n    return;\n  }\n  tables.push(t);\n}\n\nconst themePicks = [];\nfor (const t of tables) {\n  const r = new Roll(\"1d10\");\n  await r.evaluate();\n  const n = r.total;\n  const result = t.results.find(res => {\n    const lo = res.range?.[0] ?? 1;\n    const hi = res.range?.[1] ?? lo;\n    return lo <= n && n <= hi;\n  });\n  const text = result?.text || result?.name || \"(no text)\";\n  themePicks.push({ column: t.name.replace(/^Wizard Towers:\\s*/, \"\"), n, text });\n}\n\n// ---------- 2. Wizard stats ----------\nasync function rollBetween(min, max) {\n  const r = new Roll(`1d${max - min + 1} + ${min - 1}`);\n  await r.evaluate();\n  return r.total;\n}\nconst level = await rollBetween(6, 10);\nconst hp    = await rollBetween(10, 20);\nconst mana  = await rollBetween(20, 30);\n\n// ---------- 3. Five random wizard spells ----------\nconst spellPack = game.packs.get(\"world.flail-wizard-spells\");\nlet spells = [];\nif (spellPack) {\n  try {\n    const idx = await spellPack.getIndex();\n    const arr = Array.from(idx);\n    // Fisher-Yates shuffle for a uniform-ish random pick.\n    for (let i = arr.length - 1; i > 0; i--) {\n      const j = Math.floor(Math.random() * (i + 1));\n      [arr[i], arr[j]] = [arr[j], arr[i]];\n    }\n    spells = arr.slice(0, 5);\n  } catch (err) {\n    console.warn(\"FLAIL | Couldn't pick spells\", err);\n  }\n}\n\n// ---------- 4. Tower structure (5-7 total floors) ----------\nconst totalFloors = 5 + Math.floor(Math.random() * 3);   // 5, 6, or 7\nconst d6Count = totalFloors - 1;                          // top floor is always a d4\n\n// From p.84: each d6 result maps to a general floor type, then a\n// d4 picks the specific sub-type within it.\nconst FLOOR_TYPES = {\n  1: { name: \"Chamber\", subtypes: [\"bedroom\", \"demon jail\", \"shrine\", \"games room\"] },\n  2: { name: \"Hall\",    subtypes: [\"armoury\", \"treasury\", \"sepulchre\", \"dining hall\"] },\n  3: { name: \"Lab\",     subtypes: [\"construct workshop\", \"medicine lab\", \"magic items studio\", \"potions brewery\"] },\n  4: { name: \"Library\", subtypes: [\"spellbooks\", \"weird inventions\", \"cookbooks\", \"occult tomes\"] },\n  5: { name: \"Gallery\", subtypes: [\"paintings\", \"statues\", \"trophies\", \"cabinet of curiosities\"] },\n  6: { name: \"Leisure\", subtypes: [\"arboretum\", \"dream lounge\", \"music chamber\", \"reptilarium\"] }\n};\nconst TOP_FLOOR_TYPES = [\"astronomical observatory\", \"meditation pod\", \"light-prism beacon\", \"eldritch lookout\"];\n\nconst floors = [];\nfor (let i = 0; i < d6Count; i++) {\n  const d6 = new Roll(\"1d6\");   await d6.evaluate();\n  const d4 = new Roll(\"1d4\");   await d4.evaluate();\n  const type = FLOOR_TYPES[d6.total];\n  floors.push({\n    n: i + 1,\n    d6: d6.total,\n    d4: d4.total,\n    typeName: type.name,\n    subtype: type.subtypes[d4.total - 1],\n    isTop: false\n  });\n}\nconst topD4 = new Roll(\"1d4\"); await topD4.evaluate();\nfloors.push({\n  n: totalFloors,\n  d4: topD4.total,\n  typeName: \"Top floor\",\n  subtype: TOP_FLOOR_TYPES[topD4.total - 1],\n  isTop: true\n});\n\n// ---------- 5. Chat card ----------\nconst headline = `${themePicks[1].text}'s ${themePicks[0].text}`;\n\nconst themeRows = themePicks.map(p =>\n  `<tr>\n     <td style=\"padding: 0.15rem 0.5rem; font-weight: 700; color: #5a4810;\">${p.column}</td>\n     <td style=\"padding: 0.15rem 0.4rem; font-family: ui-monospace, monospace; color: #7a6842;\">${p.n}</td>\n     <td style=\"padding: 0.15rem 0.5rem;\">${p.text}</td>\n   </tr>`\n).join(\"\");\n\n// Spells as clickable content links so the GM can pop each open.\nconst spellsList = spells.length\n  ? `<ul style=\"margin: 0.2rem 0; padding-left: 1.4rem;\">${\n      spells.map(s => `<li>@UUID[Compendium.${spellPack.collection}.Item.${s._id}]{${s.name}}</li>`).join(\"\")\n    }</ul>`\n  : `<p style=\"font-style: italic; color: #7a6842;\">(FLAIL Wizard Spells compendium not found — pick five spells yourself.)</p>`;\n\n// Floors displayed top-to-bottom to match the physical tower.\nconst floorsDisplay = [...floors].reverse();\nconst floorRows = floorsDisplay.map(f => {\n  const marker = f.isTop ? \"▲\" : `${f.n}`;\n  const dice = f.isTop ? `d4=${f.d4}` : `d6=${f.d6} · d4=${f.d4}`;\n  return `<tr>\n    <td style=\"padding: 0.15rem 0.5rem; font-weight: 700; color: #5a4810; text-align: center;\">${marker}</td>\n    <td style=\"padding: 0.15rem 0.4rem; font-family: ui-monospace, monospace; color: #7a6842; font-size: 0.82em; white-space: nowrap;\">${dice}</td>\n    <td style=\"padding: 0.15rem 0.5rem;\"><strong>${f.typeName}</strong> — ${f.subtype}</td>\n  </tr>`;\n}).join(\"\");\n\nawait ChatMessage.create({\n  speaker: ChatMessage.getSpeaker(),\n  content: `<div class=\"flail-chat-card\">\n    <header style=\"border-bottom: 2px solid var(--flail-rule, #a08562); padding-bottom: 0.35rem; margin-bottom: 0.5rem;\">\n      <strong style=\"font-family: 'Modesto Condensed', 'Bebas Neue', Impact, sans-serif; text-transform: uppercase; letter-spacing: 0.05em; font-size: 1rem;\">\n        <i class=\"fas fa-hat-wizard\"></i> New Wizard Tower\n      </strong>\n      <div style=\"font-style: italic; font-size: 0.95em; color: #5a4810; margin-top: 0.15rem;\">${headline}</div>\n    </header>\n\n    <h4 style=\"margin: 0.5rem 0 0.2rem; text-transform: uppercase; font-size: 0.78em; letter-spacing: 0.05em; color: #5a4810; border-bottom: 1px solid var(--flail-rule, #a08562);\">Theme</h4>\n    <table style=\"width: 100%; border-collapse: collapse; font-size: 0.88em;\">${themeRows}</table>\n\n    <h4 style=\"margin: 0.6rem 0 0.2rem; text-transform: uppercase; font-size: 0.78em; letter-spacing: 0.05em; color: #5a4810; border-bottom: 1px solid var(--flail-rule, #a08562);\">Wizard</h4>\n    <p style=\"margin: 0.2rem 0; font-size: 0.9em;\">\n      <strong>Level:</strong> ${level} &nbsp;·&nbsp;\n      <strong>HP:</strong> ${hp} &nbsp;·&nbsp;\n      <strong>Mana:</strong> ${mana}\n      <br><span style=\"color: #7a6842; font-size: 0.82em; font-style: italic;\">Saves, Morale, and Name at GM's discretion.</span>\n    </p>\n    <p style=\"margin: 0.2rem 0 0.1rem; font-size: 0.9em;\"><strong>Spells:</strong></p>\n    ${spellsList}\n\n    <h4 style=\"margin: 0.6rem 0 0.2rem; text-transform: uppercase; font-size: 0.78em; letter-spacing: 0.05em; color: #5a4810; border-bottom: 1px solid var(--flail-rule, #a08562);\">Tower — ${totalFloors} floors</h4>\n    <table style=\"width: 100%; border-collapse: collapse; font-size: 0.88em;\">${floorRows}</table>\n    <p style=\"font-size: 0.78em; color: #7a6842; margin-top: 0.35rem;\">Top floor (▲) is the d4 that sits atop the d6 stack — an observatory/pod/beacon/lookout depending on its face.</p>\n\n    <p style=\"font-style: italic; font-size: 0.78em; color: #7a6842; margin-top: 0.5rem; border-top: 1px solid var(--flail-rule, #a08562); padding-top: 0.35rem;\">Reference: FLAIL v0.2 pp.82–84. Random spells may not fit the wizard's specialty — swap any that don't match the flavour.</p>\n  </div>`\n});\n\nui.notifications?.info(`Built wizard tower: ${headline} (${totalFloors} floors)`);\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 700,
    "folder": null,
    "author": null
  },
  {
    "_id": "a15ba7c9e5a4302d",
    "name": "Build Cave",
    "img": "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Build Cave\n// Rolls the five Caves theme columns (Flavour, Type, Location, Key\n// Feature, Creatures) AND stocks a \"handful of d6s\" worth of\n// chambers (4-7, randomised) with d6+d4 sub-rolls per chamber.\n// From FLAIL v0.2 p.86.\n\nconst COLUMN_NAMES = [\"Flavour\", \"Type\", \"Location\", \"Key Feature\", \"Creatures\"];\n\nasync function findTable(name) {\n  let t = game.tables?.getName?.(name) ?? null;\n  if (t) return t;\n  const pack = game.packs.get(\"world.flail-rolltables\");\n  if (pack) {\n    const idx = await pack.getIndex();\n    const entry = idx.find(e => e.name === name);\n    if (entry) return await pack.getDocument(entry._id);\n  }\n  return null;\n}\n\n// Theme rolls.\nconst tables = [];\nfor (const col of COLUMN_NAMES) {\n  const t = await findTable(`Caves: ${col}`);\n  if (!t) {\n    ui.notifications?.error(`Table \"Caves: ${col}\" not found — is the FLAIL Rolltables compendium loaded?`);\n    return;\n  }\n  tables.push(t);\n}\n\nconst themePicks = [];\nfor (const t of tables) {\n  const r = new Roll(\"1d6\");\n  await r.evaluate();\n  const n = r.total;\n  const result = t.results.find(res => {\n    const lo = res.range?.[0] ?? 1;\n    const hi = res.range?.[1] ?? lo;\n    return lo <= n && n <= hi;\n  });\n  const text = result?.text || result?.name || \"(no text)\";\n  themePicks.push({ column: t.name.replace(/^Caves:\\s*/, \"\"), n, text });\n}\n\n// Chamber stocking.\nconst CHAMBER_SUB = {\n  1: { title: \"Treasure\", subtypes: [\"buried chest\", \"weapons cache\", \"spellbook\", \"Unique Item\"] },\n  2: { title: \"Vestiges\", subtypes: [\"bone altar\", \"makeshift shelter\", \"burial mound\", \"warding totem\"] }\n};\nconst CHAMBER_TITLES = {\n  3: \"Obstacle\",\n  4: \"Weak encounter\",\n  5: \"Average encounter\",\n  6: \"Strong encounter\"\n};\nconst CHAMBER_HINTS = {\n  3: \"roll on Obstacle table (p.81)\",\n  4: \"match rolled theme\",\n  5: \"match rolled theme\",\n  6: \"match rolled theme\"\n};\n\nconst chamberCount = 4 + Math.floor(Math.random() * 4);  // 4, 5, 6, or 7\nconst chambers = [];\nfor (let i = 0; i < chamberCount; i++) {\n  const d6 = new Roll(\"1d6\");   await d6.evaluate();\n  const d4 = new Roll(\"1d4\");   await d4.evaluate();\n  const sub = CHAMBER_SUB[d6.total];\n  const chamber = {\n    n: i + 1,\n    d6: d6.total,\n    d4: d4.total\n  };\n  if (sub) {\n    chamber.title = sub.title;\n    chamber.detail = sub.subtypes[d4.total - 1];\n  } else {\n    chamber.title = CHAMBER_TITLES[d6.total];\n    chamber.detail = CHAMBER_HINTS[d6.total];\n  }\n  chambers.push(chamber);\n}\n\n// Entry/Core hints (from the p.86 Layout guidance).\nif (chambers.length) {\n  chambers[0].tag = \"Entry (nearest edge)\";\n  chambers[Math.floor(chambers.length / 2)].tag = \"Core (largest chamber)\";\n}\n\n// Chat card.\nconst headline = `${themePicks[0].text} ${themePicks[1].text}`;\n\nconst themeRows = themePicks.map(p =>\n  `<tr>\n     <td style=\"padding: 0.15rem 0.5rem; font-weight: 700; color: #5a4810;\">${p.column}</td>\n     <td style=\"padding: 0.15rem 0.4rem; font-family: ui-monospace, monospace; color: #7a6842;\">${p.n}</td>\n     <td style=\"padding: 0.15rem 0.5rem;\">${p.text}</td>\n   </tr>`\n).join(\"\");\n\nconst chamberRows = chambers.map(c => {\n  const showD4 = [1, 2].includes(c.d6);\n  const dice = showD4 ? `d6=${c.d6} · d4=${c.d4}` : `d6=${c.d6}`;\n  const tag = c.tag\n    ? `<div style=\"font-size: 0.75em; font-style: italic; color: #7a6842;\">${c.tag}</div>`\n    : \"\";\n  return `<tr>\n    <td style=\"padding: 0.15rem 0.5rem; font-weight: 700; color: #5a4810; text-align: center;\">${c.n}</td>\n    <td style=\"padding: 0.15rem 0.4rem; font-family: ui-monospace, monospace; color: #7a6842; font-size: 0.82em; white-space: nowrap;\">${dice}</td>\n    <td style=\"padding: 0.15rem 0.5rem;\"><strong>${c.title}</strong> — ${c.detail}${tag}</td>\n  </tr>`;\n}).join(\"\");\n\nawait ChatMessage.create({\n  speaker: ChatMessage.getSpeaker(),\n  content: `<div class=\"flail-chat-card\">\n    <header style=\"border-bottom: 2px solid var(--flail-rule, #a08562); padding-bottom: 0.35rem; margin-bottom: 0.5rem;\">\n      <strong style=\"font-family: 'Modesto Condensed', 'Bebas Neue', Impact, sans-serif; text-transform: uppercase; letter-spacing: 0.05em; font-size: 1rem;\">\n        <i class=\"fas fa-mountain\"></i> New Cave\n      </strong>\n      <div style=\"font-style: italic; font-size: 0.95em; color: #5a4810; margin-top: 0.15rem;\">${headline}</div>\n    </header>\n\n    <h4 style=\"margin: 0.5rem 0 0.2rem; text-transform: uppercase; font-size: 0.78em; letter-spacing: 0.05em; color: #5a4810; border-bottom: 1px solid var(--flail-rule, #a08562);\">Theme</h4>\n    <table style=\"width: 100%; border-collapse: collapse; font-size: 0.88em;\">${themeRows}</table>\n\n    <h4 style=\"margin: 0.6rem 0 0.2rem; text-transform: uppercase; font-size: 0.78em; letter-spacing: 0.05em; color: #5a4810; border-bottom: 1px solid var(--flail-rule, #a08562);\">Chambers — ${chamberCount}</h4>\n    <table style=\"width: 100%; border-collapse: collapse; font-size: 0.88em;\">${chamberRows}</table>\n    <p style=\"font-size: 0.78em; color: #7a6842; margin-top: 0.35rem;\">Layout guidance: drop physical d6s on paper to place chambers — the die nearest the edge is the Entry, the die nearest the centre is the Core (largest). Any die that rolls off represents a secret chamber; roll twice more for it.</p>\n\n    <p style=\"font-style: italic; font-size: 0.78em; color: #7a6842; margin-top: 0.5rem; border-top: 1px solid var(--flail-rule, #a08562); padding-top: 0.35rem;\">Reference: FLAIL v0.2 p.86. Use the Roll Cave Tunnel macro during play for wandering-encounter rolls.</p>\n  </div>`\n});\n\nui.notifications?.info(`Built cave: ${headline} (${chamberCount} chambers)`);\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 800,
    "folder": null,
    "author": null
  },
  {
    "_id": "6e2c52018f35f774",
    "name": "Roll Cave Chamber",
    "img": "icons/consumables/eggs/egg-cracked-white.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Roll Cave Chamber Contents\n// Rolls d6 for a single chamber's contents. If the roll is 1 or 2,\n// automatically rolls the d4 sub-table (Treasure or Vestiges).\n// For rolls 3-6 the entry describes what to fetch from other tables\n// or how to interpret it.\n\nconst CHAMBER = {\n  1: { title: \"Treasure\", subtypes: [\"buried chest\", \"weapons cache\", \"spellbook\", \"Unique Item\"] },\n  2: { title: \"Vestiges\", subtypes: [\"bone altar\", \"makeshift shelter\", \"burial mound\", \"warding totem\"] },\n  3: { title: \"Obstacle\",          detail: \"Roll on the Obstacle table (p.81), or pick one that fits.\" },\n  4: { title: \"Weak encounter\",    detail: \"Pick or create a weak creature matching the rolled theme.\" },\n  5: { title: \"Average encounter\", detail: \"Pick or create an average creature matching the rolled theme.\" },\n  6: { title: \"Strong encounter\",  detail: \"Pick or create a powerful creature matching the rolled theme.\" }\n};\n\nconst d6 = new Roll(\"1d6\"); await d6.evaluate();\nconst entry = CHAMBER[d6.total];\nlet detailText;\nlet d4Line = \"\";\nif (entry.subtypes) {\n  const d4 = new Roll(\"1d4\"); await d4.evaluate();\n  detailText = entry.subtypes[d4.total - 1];\n  d4Line = ` · d4=${d4.total}`;\n} else {\n  detailText = entry.detail;\n}\n\nawait ChatMessage.create({\n  speaker: ChatMessage.getSpeaker(),\n  content: `<div class=\"flail-chat-card\">\n    <header style=\"border-bottom: 2px solid var(--flail-rule, #a08562); padding-bottom: 0.3rem; margin-bottom: 0.4rem;\">\n      <strong style=\"font-family: 'Modesto Condensed', 'Bebas Neue', Impact, sans-serif; text-transform: uppercase; letter-spacing: 0.05em;\">\n        <i class=\"fas fa-dice-d6\"></i> Cave Chamber\n      </strong>\n      <span style=\"font-family: ui-monospace, monospace; font-size: 0.85em; color: #7a6842; margin-left: 0.5rem;\">d6=${d6.total}${d4Line}</span>\n    </header>\n    <p style=\"margin: 0;\"><strong>${entry.title}:</strong> ${detailText}</p>\n  </div>`\n});\nui.notifications?.info(`Chamber: ${entry.title}`);\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 810,
    "folder": null,
    "author": null
  },
  {
    "_id": "64897baf2bdf5c3e",
    "name": "Roll Cave Tunnel",
    "img": "icons/magic/perception/silhouette-stealth-shadow.webp",
    "type": "script",
    "scope": "global",
    "command": "// FLAIL — Roll Cave Tunnel Encounter\n// Per FLAIL v0.2 p.86, when a character walks into a tunnel roll\n// d6 first; on 5-6, roll a second d6 for the encounter type. This\n// macro does the full cascade automatically. When the encounter\n// type has a d4 sub-table (Hazard, Corpse, Markings, Eerie Sounds)\n// it also resolves that.\n\nconst TUNNEL = {\n  1: { title: \"Hazard\",           subtypes: [\"ceiling collapses\", \"sudden flood\", \"igniting gas draft\", \"covered pitfall\"] },\n  2: { title: \"Wandering monster\", detail: \"Random encounter with a creature matching the rolled theme.\" },\n  3: { title: \"Odd anomaly\",       detail: \"Roll on the Anomaly table (p.81), or pick one that fits.\" },\n  4: { title: \"Corpse\",           subtypes: [\"coins and torches\", \"climbing gear\", \"monster skull\", \"random weapon\"] },\n  5: { title: \"Markings\",         subtypes: [\"cave art\", \"primitive hands\", \"ancient prophecy\", \"beastly footprints\"] },\n  6: { title: \"Eerie sounds\",     subtypes: [\"growling\", \"distant drumming\", \"screeching echo\", \"whispers\"] }\n};\n\n// First d6 — did the tunnel produce an encounter?\nconst first = new Roll(\"1d6\"); await first.evaluate();\nif (first.total < 5) {\n  await ChatMessage.create({\n    speaker: ChatMessage.getSpeaker(),\n    content: `<div class=\"flail-chat-card\">\n      <header style=\"border-bottom: 2px solid var(--flail-rule, #a08562); padding-bottom: 0.3rem; margin-bottom: 0.4rem;\">\n        <strong style=\"font-family: 'Modesto Condensed', 'Bebas Neue', Impact, sans-serif; text-transform: uppercase; letter-spacing: 0.05em;\">\n          <i class=\"fas fa-route\"></i> Cave Tunnel\n        </strong>\n        <span style=\"font-family: ui-monospace, monospace; font-size: 0.85em; color: #7a6842; margin-left: 0.5rem;\">d6=${first.total}</span>\n      </header>\n      <p style=\"margin: 0; font-style: italic; color: #5a4810;\">The party crosses the tunnel without incident.</p>\n    </div>`\n  });\n  ui.notifications?.info(\"Tunnel: uneventful\");\n  return;\n}\n\n// Encounter roll on d6.\nconst enc = new Roll(\"1d6\"); await enc.evaluate();\nconst entry = TUNNEL[enc.total];\nlet detailText;\nlet d4Line = \"\";\nif (entry.subtypes) {\n  const d4 = new Roll(\"1d4\"); await d4.evaluate();\n  detailText = entry.subtypes[d4.total - 1];\n  d4Line = ` · d4=${d4.total}`;\n} else {\n  detailText = entry.detail;\n}\n\nawait ChatMessage.create({\n  speaker: ChatMessage.getSpeaker(),\n  content: `<div class=\"flail-chat-card\">\n    <header style=\"border-bottom: 2px solid var(--flail-rule, #a08562); padding-bottom: 0.3rem; margin-bottom: 0.4rem;\">\n      <strong style=\"font-family: 'Modesto Condensed', 'Bebas Neue', Impact, sans-serif; text-transform: uppercase; letter-spacing: 0.05em;\">\n        <i class=\"fas fa-route\"></i> Cave Tunnel Encounter\n      </strong>\n      <span style=\"font-family: ui-monospace, monospace; font-size: 0.85em; color: #7a6842; margin-left: 0.5rem;\">gate=${first.total} · d6=${enc.total}${d4Line}</span>\n    </header>\n    <p style=\"margin: 0;\"><strong>${entry.title}:</strong> ${detailText}</p>\n  </div>`\n});\nui.notifications?.info(`Tunnel encounter: ${entry.title}`);\n",
    "flags": {},
    "ownership": {
      "default": 2
    },
    "sort": 820,
    "folder": null,
    "author": null
  }
];
