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

// Menú lateral: categoría y subcategorías por clave (textos en catalog.* de src/i18n).
export var DW_CATS = [
  {
    cat: "ceilings",
    href: "/ceilings",
    subs: [
      {
        col: "ceilings",
        href: "/ceilings#ceilings",
      },
      {
        col: "baffles",
        href: "/ceilings#baffles",
      },
      {
        col: "clouds",
        href: "/ceilings#clouds",
      },
      {
        col: "ceilinglights",
        href: "/ceilings#ceilinglights",
      },
    ],
  },
  {
    cat: "walls",
    href: "/walls",
    subs: [
      {
        col: "walls",
        href: "/walls#walls",
      },
      {
        col: "frames",
        href: "/walls#frames",
      },
      {
        col: "murals",
        href: "/walls#murals",
      },
      {
        col: "canvas",
        href: "/walls#canvas",
      },
      {
        col: "walllights",
        href: "/walls#walllights",
      },
    ],
  },
  {
    cat: "lights",
    href: "/lights",
    subs: [
      {
        col: "pendantlights",
        href: "/lights#pendantlights",
      },
      {
        col: "ceilinglights",
        href: "/lights#ceilinglights",
      },
      {
        col: "floorlights",
        href: "/lights#floorlights",
      },
      {
        col: "tablelights",
        href: "/lights#tablelights",
      },
      {
        col: "walllights",
        href: "/lights#walllights",
      },
    ],
  },
  {
    cat: "dividers",
    href: "/dividers",
    subs: [
      {
        col: "dividers",
        href: "/dividers#dividers",
      },
      {
        col: "fckoff",
        href: "/dividers#fckoff",
        label: "Fckoff",
      },
    ],
  },
  {
    cat: "podcaster",
    href: "/podcaster",
    subs: [],
  },
];
// Acabados del menú: clave en home.finishes.* y panel que abre en la home.
export var DW_FIN = [
  ["colors", "f_colors"],
  ["textures", "f_textures"],
  ["print", "f_print"],
  ["engraving", "f_engraving"],
  ["embossed", "f_embossed"],
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
