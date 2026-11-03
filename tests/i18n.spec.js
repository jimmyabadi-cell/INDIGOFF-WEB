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

// Páginas ya migradas a claves y los grupos de textos que muestran.
const MIGRATED = { "/onoff-studio": ["studio", "common"] };

for (const [route, namespaces] of Object.entries(MIGRATED)) {
  test(`${route}: en español no queda ningún texto en inglés`, async ({ page }) => {
    await page.addInitScript(() => {
      try {
        window.localStorage.setItem("indigoff_nl", "closed");
        window.localStorage.setItem("indigoff_lang", "es");
      } catch (e) {}
    });
    await page.goto(route);
    await page.locator(".site-hd").waitFor();
    const text = await page.locator("body").innerText();
    const english = namespaces
      .flatMap((ns) => Object.entries(flattenNs(ns)))
      .filter(([key, s]) => typeof s === "string" && s.length >= 12 && s !== flatEs[key])
      .map(([, s]) => s)
      .filter((s) => text.includes(s));
    expect(english).toEqual([]);
  });
}

function flattenNs(ns) {
  return Object.fromEntries(Object.entries(flatEn).filter(([k]) => k === ns || k.startsWith(ns + ".")));
}
