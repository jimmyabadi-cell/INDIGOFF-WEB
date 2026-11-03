import { test, expect } from "@playwright/test";
import fs from "node:fs";

const P = JSON.parse(fs.readFileSync(new URL("../src/data/products.json", import.meta.url), "utf8"));
const C = JSON.parse(fs.readFileSync(new URL("../src/data/collections.json", import.meta.url), "utf8"));
const name = (key) => P[key][0];
const firstOf = (sub, i = 0) => name(C.cols[sub].products[i]);

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem("indigoff_nl", "closed");
    } catch (e) {}
  });
});

const subTabs = (page) => page.locator("nav[aria-label=Subcategories] button");
const productDialog = (page) => page.locator('[role=dialog][aria-modal="true"]').first();
const bodyOverflow = (page) => page.evaluate(() => document.body.style.overflow);

test("Collection: pestañas cambian la subcategoría", async ({ page }) => {
  await page.goto("/ceilings");
  await expect(subTabs(page).first()).toHaveAttribute("aria-pressed", "true");
  await subTabs(page).nth(1).click();
  await expect(subTabs(page).nth(1)).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: `View ${firstOf("baffles")}` })).toBeVisible();
});

test("Collection: abrir producto, navegar con flechas y cerrar con Escape", async ({ page }) => {
  await page.goto("/ceilings");
  await page.getByRole("button", { name: `View ${firstOf("ceilings")}` }).click();
  const dialog = productDialog(page);
  await expect(dialog).toHaveAttribute("aria-label", firstOf("ceilings"));
  expect(await bodyOverflow(page)).toBe("hidden");

  await page.keyboard.press("ArrowRight");
  await expect(dialog).toHaveAttribute("aria-label", firstOf("ceilings", 1));
  await page.keyboard.press("ArrowLeft");
  await expect(dialog).toHaveAttribute("aria-label", firstOf("ceilings"));

  await page.keyboard.press("Escape");
  await expect(page.locator("[role=dialog]")).toHaveCount(0);
  expect(await bodyOverflow(page)).toBe("");
});

test("Collection: guardar en Mi lista, verla y quitarla", async ({ page }) => {
  await page.goto("/ceilings");
  const count = page.locator(".site-hd .hd-list-n");
  await expect(count).toHaveText("0");

  await page.getByRole("button", { name: `View ${firstOf("ceilings")}` }).click();
  const save = productDialog(page).locator("button[aria-pressed]").first();
  await expect(save).toHaveAttribute("aria-pressed", "false");
  await save.click();
  await expect(save).toHaveAttribute("aria-pressed", "true");
  await expect(count).toHaveText("1");
  await page.keyboard.press("Escape");

  await page.reload();
  await expect(count).toHaveText("1");
  await page.locator(".site-hd .hd-list").click();
  const list = page.locator("[role=dialog][aria-label='My list']");
  await expect(list).toContainText(firstOf("ceilings"));
  await list.getByRole("button", { name: `Remove ${firstOf("ceilings")}` }).click();
  await expect(count).toHaveText("0");
  await page.keyboard.press("Escape");
  await expect(list).toBeHidden();
});

test("Collection: #subcategoría y #p=producto abren directo", async ({ page }) => {
  await page.goto("/ceilings#baffles");
  await expect(subTabs(page).nth(1)).toHaveAttribute("aria-pressed", "true");

  const slug = C.cols.baffles.products[1];
  await page.goto(`/ceilings#p=${slug}`);
  await expect(productDialog(page)).toHaveAttribute("aria-label", name(slug));
});

test("Collection: abre el producto pendiente que deja el menú", async ({ page }) => {
  const slug = C.cols.clouds.products[0];
  await page.goto("/");
  await page.evaluate((s) => {
    window.localStorage.setItem("indigoff_open", JSON.stringify({ col: "ceilings", slug: s, t: Date.now() }));
  }, slug);
  await page.goto("/ceilings");
  await expect(productDialog(page)).toHaveAttribute("aria-label", name(slug));
  expect(await page.evaluate(() => window.localStorage.getItem("indigoff_open"))).toBeNull();
});
