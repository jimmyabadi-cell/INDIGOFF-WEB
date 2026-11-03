import { test, expect } from "@playwright/test";

const bodyOverflow = (page) => page.evaluate(() => document.body.style.overflow);
const listCount = (page) => page.locator(".site-hd .hd-list-n");

test.describe("Home", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        window.localStorage.setItem("indigoff_nl", "closed");
      } catch (e) {}
    });
  });

  test("Conceptos: flechas y avance automático", async ({ page }) => {
    await page.clock.install();
    await page.goto("/");
    const code = page.locator(".cf-code");
    await expect(code).toHaveText("R2001");
    await page.getByRole("button", { name: "Next concept" }).click();
    await expect(code).toHaveText("R2002");
    await page.getByRole("button", { name: "Previous concept" }).click();
    await expect(code).toHaveText("R2001");
    await page.clock.runFor(6600);
    await expect(code).toHaveText("R2002");
  });

  test("Acabados: lightbox, zoom con flechas y Escape por capas", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "View Colors" }).click();
    const lb = page.locator('[role=dialog][aria-label="Colors"]');
    await expect(lb).toBeVisible();
    expect(await bodyOverflow(page)).toBe("hidden");

    await lb.getByRole("listitem").first().click();
    await expect(page.locator('[role=dialog][aria-label="Red"]')).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(page.locator('[role=dialog][aria-label="Cherry"]')).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.locator('[role=dialog][aria-label="Cherry"]')).toBeHidden();
    await expect(lb).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(lb).toBeHidden();
    expect(await bodyOverflow(page)).toBe("");
  });

  test("Acabados: guardar en Mi lista", async ({ page }) => {
    await page.goto("/");
    await expect(listCount(page)).toHaveText("0");
    await page.getByRole("button", { name: "View Colors" }).click();
    const save = page.locator('[role=dialog][aria-label="Colors"] button[aria-pressed]').first();
    await save.click();
    await expect(save).toHaveAttribute("aria-pressed", "true");
    await expect(listCount(page)).toHaveText("1");
  });

  test("Proyectos: ver más / ver menos", async ({ page }) => {
    await page.goto("/");
    const cards = page.locator(".proj-grid > button");
    await expect(cards).toHaveCount(12);
    await page.getByRole("button", { name: "View more" }).first().click();
    expect(await cards.count()).toBeGreaterThan(12);
    await page.getByRole("button", { name: "View less" }).first().click();
    await expect(cards).toHaveCount(12);
  });

  test("Búsqueda: atajos, resultados y Escape", async ({ page }) => {
    await page.goto("/");
    await page.locator(".site-hd").waitFor();
    const search = page.locator(".sr[role=dialog]");

    await page.keyboard.press("/");
    await expect(search).toBeVisible();
    await expect(page.locator(".sr-input")).toBeFocused();
    await page.locator(".sr-input").fill("aries");
    await expect(search.locator(".sr-n").first()).toHaveText("Aries");
    await page.keyboard.press("Escape");
    await expect(search).toBeHidden();

    await page.keyboard.press("ControlOrMeta+k");
    await expect(search).toBeVisible();
    await page.locator(".sr-input").fill("colors");
    await search
      .getByRole("button", { name: /Colors/ })
      .first()
      .click();
    await expect(search).toBeHidden();
    await expect(page.locator('[role=dialog][aria-label="Colors"]')).toBeVisible();
  });

  test("Menú lateral: un acabado abre su lightbox", async ({ page }) => {
    await page.goto("/");
    await page.locator(".hd-menu").click();
    await page.locator("aside.dw").getByRole("button", { name: "Textures" }).click();
    await expect(page.locator("aside.dw")).toBeHidden();
    await expect(page.locator('[role=dialog][aria-label="Textures"]')).toBeVisible();
  });
});

test.describe("Newsletter", () => {
  test("aparece a los 2.5 s y Escape lo cierra para siempre", async ({ page }) => {
    // Reloj en pausa desde antes de cargar: el tiempo solo avanza con runFor (si no, una carga lenta lo adelanta).
    await page.clock.install({ time: new Date("2026-01-01T10:00:00") });
    await page.clock.pauseAt(new Date("2026-01-01T10:00:01"));
    await page.goto("/");
    await page.locator(".site-hd").waitFor();
    const nl = page.locator(".nl[role=dialog]");
    await page.clock.runFor(2000);
    await expect(nl).toHaveCount(0);
    await page.clock.runFor(700);
    await expect(nl).toBeVisible();
    expect(await bodyOverflow(page)).toBe("hidden");
    await page.keyboard.press("Escape");
    await expect(nl).toBeHidden();
    expect(await page.evaluate(() => window.localStorage.getItem("indigoff_nl"))).toBe("closed");
  });

  test("valida el correo y confirma la suscripción", async ({ page }) => {
    // Reloj en pausa desde antes de cargar: el tiempo solo avanza con runFor (si no, una carga lenta lo adelanta).
    await page.clock.install({ time: new Date("2026-01-01T10:00:00") });
    await page.clock.pauseAt(new Date("2026-01-01T10:00:01"));
    await page.goto("/");
    await page.locator(".site-hd").waitFor();
    await page.clock.runFor(2700);
    const nl = page.locator(".nl[role=dialog]");
    await expect(nl).toBeVisible();
    await nl.locator("input").fill("no-es-correo");
    await nl.getByRole("button", { name: "Subscribe" }).click();
    await expect(nl).toContainText("Enter a valid email address.");
    await nl.locator("input").fill("hola@indigoff.com");
    await nl.getByRole("button", { name: "Subscribe" }).click();
    await expect(nl).toContainText("Thank you");
    expect(await page.evaluate(() => window.localStorage.getItem("indigoff_nl"))).toBe("subscribed");
  });
});
