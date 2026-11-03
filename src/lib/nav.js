// Intercepts legacy .dc.html collection links and redirects them as SPA navigations.
(function () {
  try {
    document.addEventListener(
      "click",
      function (e) {
        var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
        if (!a) return;
        var m = /^\/?(Ceilings|Walls|Lights|Dividers|Podcaster)\.dc\.html$/i.exec(a.getAttribute("href") || "");
        if (!m) return;
        var o = { col: m[1].toLowerCase(), reset: true, t: Date.now() };
        try {
          window.localStorage.setItem("indigoff_open", JSON.stringify(o));
        } catch (x) {}
        try {
          window.__indigoffOpen = o;
          window.dispatchEvent(new CustomEvent("indigoff-open"));
        } catch (x) {}
      },
      true,
    );
  } catch (e) {}
})();

export var DW_CATS = [
  {
    name: "Ceilings",
    href: "/ceilings",
    subs: [
      { label: "Ceiling Systems", href: "/ceilings#ceilings" },
      { label: "Baffles", href: "/ceilings#baffles" },
      { label: "Clouds", href: "/ceilings#clouds" },
      { label: "Ceiling Lights", href: "/ceilings#ceilinglights" },
    ],
  },
  {
    name: "Walls",
    href: "/walls",
    subs: [
      { label: "Panels", href: "/walls#walls" },
      { label: "Frames", href: "/walls#frames" },
      { label: "Murals", href: "/walls#murals" },
      { label: "Canvas", href: "/walls#canvas" },
      { label: "Wall Lights", href: "/walls#walllights" },
    ],
  },
  {
    name: "Lights",
    href: "/lights",
    subs: [
      { label: "Pendant", href: "/lights#pendantlights" },
      { label: "Ceiling", href: "/lights#ceilinglights" },
      { label: "Floor", href: "/lights#floorlights" },
      { label: "Table", href: "/lights#tablelights" },
      { label: "Wall", href: "/lights#walllights" },
    ],
  },
  {
    name: "Dividers",
    href: "/dividers",
    subs: [
      { label: "Space Dividers", href: "/dividers#dividers" },
      { label: "Fckoff", href: "/dividers#fckoff" },
    ],
  },
  { name: "Podcaster", href: "/podcaster", subs: [] },
];
export var DW_FIN = [
  ["Colors", "f_colors"],
  ["Textures", "f_textures"],
  ["Print", "f_print"],
  ["Engraving", "f_engraving"],
  ["Embossed", "f_embossed"],
];

export function ifoSetPending(href) {
  try {
    var m = /^\/?([A-Za-z]+)(?:\.dc\.html)?#(.+)$/.exec(href || "");
    if (!m) return;
    var col = m[1].toLowerCase(),
      h = m[2],
      o = { col: col, t: Date.now() };
    if (h.indexOf("p=") === 0) o.slug = h.slice(2);
    else o.sub = h;
    window.localStorage.setItem("indigoff_open", JSON.stringify(o));
    try {
      window.__indigoffOpen = o;
    } catch (e) {}
    try {
      window.dispatchEvent(new CustomEvent("indigoff-open"));
    } catch (e) {}
  } catch (e) {}
}
