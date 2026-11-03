import { test, expect } from "@playwright/test";
import fs from "node:fs";

const load = (lang) =>
  JSON.parse(fs.readFileSync(new URL(`../src/i18n/locales/${lang}.json`, import.meta.url), "utf8"));
const en = load("en");
const es = load("es");

/** { "studio.hero.title": "…", "studio.services.0.title": "…" } */
function flatten(node, prefix = "", out = {}) {
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  } else {
    out[prefix] = node;
  }
  return out;
}

const flatEn = flatten(en);
const flatEs = flatten(es);
const placeholders = (s) => (String(s).match(/\{\w+\}/g) || []).sort();
const flattenNs = (ns) => Object.fromEntries(Object.entries(flatEn).filter(([k]) => k.startsWith(ns + ".")));

test.describe("Traducciones", () => {
  test("en.json y es.json tienen exactamente las mismas claves", () => {
    expect(Object.keys(flatEs).sort()).toEqual(Object.keys(flatEn).sort());
  });

  test("ninguna traducción está vacía y los {placeholders} coinciden", () => {
    for (const [key, value] of Object.entries(flatEn)) {
      expect(typeof flatEs[key], key).toBe(typeof value);
      expect(String(flatEs[key]).trim(), key).not.toBe("");
      expect(placeholders(flatEs[key]), key).toEqual(placeholders(value));
    }
  });
});

/** Grupos de primer nivel de los locales: una clave sin traducir se vería como "catalog.cols.x". */
const KEY_LEAK = new RegExp("\\b(" + Object.keys(en).join("|") + ")\\.[a-zA-Z]");

/**
 * Un texto con {variables} se busca como patrón con límites de palabra:
 * "{count} product" → /.+? product\b/ (así no coincide con "producto").
 */
const toPattern = (s) => {
  const body = s
    .replace(/[.*+?^$()|[\]\\]/g, "\\$&")
    .split(/\{\w+\}/)
    .join(".+?");
  return new RegExp((/^\w/.test(s) ? "\\b" : "") + body + (/\w$/.test(s) ? "\\b" : ""));
};

// Cada página, los grupos de textos que muestra y estados extra que abrir (lightbox, búsqueda…).
const COLLECTION = ["collection", "list", "catalog", "common"];
const openFirstProduct = async (page) => {
  const product = page.locator("button[aria-label^='Ver ']").first();
  if (await product.count()) await product.click();
};
const PAGES = {
  "/": {
    ns: ["home", "list", "catalog", "common"],
    states: [
      // Relieves: "Modelo 1", "— Textura".
      async (page) => page.locator(".fin-tile").nth(4).click(),
      // Proyecto: etiqueta, CTA y fotos.
      async (page) => {
        await page.keyboard.press("Escape");
        await page.locator(".proj-grid > button").first().click();
      },
      // Búsqueda: tipos y conteo.
      async (page) => {
        await page.keyboard.press("Escape");
        await page.keyboard.press("/");
        await page.locator(".sr-input").fill("nube");
      },
    ],
  },
  "/onoff-studio": { ns: ["studio", "common"] },
  "/downloads": { ns: ["downloads", "catalog", "common"] },
  "/find-a-rep": { ns: ["findRep", "common"] },
  "/ceilings": { ns: COLLECTION, states: [openFirstProduct] },
  "/walls": { ns: COLLECTION, states: [openFirstProduct] },
  "/lights": { ns: COLLECTION, states: [openFirstProduct] },
  "/dividers": { ns: COLLECTION, states: [openFirstProduct] },
  "/podcaster": { ns: COLLECTION, states: [openFirstProduct] },
};

for (const [route, { ns, states = [] }] of Object.entries(PAGES)) {
  test(`${route}: en español no queda ningún texto en inglés`, async ({ page }) => {
    await page.addInitScript(() => {
      try {
        window.localStorage.setItem("indigoff_nl", "closed");
        window.localStorage.setItem("indigoff_lang", "es");
      } catch (e) {}
    });
    await page.goto(route);
    await page.locator(".site-hd").waitFor();
    const english = ns
      .flatMap((n) => Object.entries(flattenNs(n)))
      .filter(([key, s]) => typeof s === "string" && s.length >= 12 && s !== flatEs[key])
      .map(([, s]) => s);

    for (const [i, open] of [null, ...states].entries()) {
      if (open) await open(page);
      // textContent (no innerText): el texto original, sin el text-transform del CSS; más los aria-label.
      const text = await page.evaluate(
        () =>
          document.body.textContent +
          " " +
          [...document.querySelectorAll("[aria-label]")].map((e) => e.getAttribute("aria-label")).join(" "),
      );
      expect(text.match(KEY_LEAK)?.[0] ?? null, `clave sin traducir visible (estado ${i})`).toBeNull();
      expect(
        english.filter((s) => toPattern(s).test(text)),
        `estado ${i}`,
      ).toEqual([]);
    }
  });
}
