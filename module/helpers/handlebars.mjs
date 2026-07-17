/**
 * Register Handlebars helpers used throughout FLAIL templates.
 */
export function registerHandlebarsHelpers() {

  // {{flail-times n}} — like {{#times}} from older templates.
  Handlebars.registerHelper("flail-times", function (n, options) {
    let acc = "";
    for (let i = 0; i < n; i++) acc += options.fn({ index: i, ...this });
    return acc;
  });

  // {{flail-eq a b}} — strict equality.
  Handlebars.registerHelper("flail-eq", (a, b) => a === b);
  // {{flail-gt a b}} — greater-than for numeric comparisons.
  Handlebars.registerHelper("flail-gt", (a, b) => Number(a) > Number(b));

  // {{flail-or a b}} — falsy fallback.
  Handlebars.registerHelper("flail-or", (a, b) => a || b);

  // {{flail-cap str}} — capitalize first letter.
  Handlebars.registerHelper("flail-cap", s =>
    typeof s === "string" && s.length ? s[0].toUpperCase() + s.slice(1) : s
  );

  // {{flail-range start end}} — inclusive integer range as array.
  Handlebars.registerHelper("flail-range", (start, end) => {
    const arr = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  });

  // {{join arr sep}} — join an array with a separator.
  Handlebars.registerHelper("join", (arr, sep) => {
    if (!Array.isArray(arr)) return "";
    return arr.join(typeof sep === "string" ? sep : ", ");
  });

  // {{flail-fill n}} / {{flail-empty n}} — pip rendering for usage / hp.
  // If a third argument `itemId` is supplied, each pip carries a
  // data-action + data-item-id + data-pip-index so the sheet's action
  // framework can toggle it on click. Rendering stays as a <span> so
  // the pips look exactly like the static ones — no <button> chrome.
  Handlebars.registerHelper("flail-pip", (filled, total, itemId) => {
    // Handlebars passes an options hash as the last arg — only treat
    // itemId as a real string when it's not that hash object.
    const isClickable = typeof itemId === "string" && itemId.length > 0;
    let html = "";
    for (let i = 0; i < total; i++) {
      const isFilled = i < filled;
      const cls = `pip ${isFilled ? "filled" : "empty"}`;
      if (isClickable) {
        // 1-indexed pip position for the click handler to consume.
        const pipIndex = i + 1;
        html += `<span class="${cls} pip-clickable" data-action="toggleUsagePip" data-item-id="${itemId}" data-pip-index="${pipIndex}"></span>`;
      } else {
        html += `<span class="${cls}"></span>`;
      }
    }
    return new Handlebars.SafeString(html);
  });

  // {{flail-die-icon n}} — render a d6 face.
  Handlebars.registerHelper("flail-die-icon", n => {
    const cls = n === 1 ? "die-one" : n === 6 ? "die-six" : "";
    return new Handlebars.SafeString(
      `<span class="die-face ${cls}" data-face="${n}">${n}</span>`
    );
  });

  // {{flail-zone-considered key}} — translate "carried"/"worn"/"stashed".
  Handlebars.registerHelper("flail-zone-considered", key => {
    return game.i18n.localize(`FLAIL.Inventory.Considered.${key.charAt(0).toUpperCase()}${key.slice(1)}`);
  });

  // Arithmetic helpers — Foundry's helper set is inconsistent across versions,
  // so we register our own to be safe. Used as {{add slot.index 1}} etc.
  if (!Handlebars.helpers.add) Handlebars.registerHelper("add", (a, b) => Number(a) + Number(b));
  if (!Handlebars.helpers.sub) Handlebars.registerHelper("sub", (a, b) => Number(a) - Number(b));
  if (!Handlebars.helpers.mul) Handlebars.registerHelper("mul", (a, b) => Number(a) * Number(b));

  // {{flail-includes arr value}}
  Handlebars.registerHelper("flail-includes", (arr, val) =>
    Array.isArray(arr) ? arr.includes(val) : false
  );

  // {{array ...items}} — build inline arrays in templates.
  if (!Handlebars.helpers.array) Handlebars.registerHelper("array", (...args) => args.slice(0, -1));
}
