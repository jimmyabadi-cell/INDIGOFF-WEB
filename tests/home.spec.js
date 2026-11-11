import { test, expect } from "@playwright/test";

const bodyOverflow = (page) => page.evaluate(() => document.body.style.overflow);
const listCount = (page) => page.locator(".site-hd .hd-list-n");

// Script de Cloudflare Turnstile vacío: las pruebas no dependen de internet (los formularios siguen sin ficha).
test.beforeEach(async ({ page }) => {
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.fulfill({ contentType: "text/javascript", body: "" }),
  );
});

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
    await page.locator(".fin-tile").first().click();
    const lb = page.locator('[role=dialog][aria-label="Colors"]');
    await expect(lb).toBeVisible();
    expect(await bodyOverflow(page)).toBe("hidden");

    await lb.getByRole("button", { name: "Red finish" }).click();
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
    await page.locator(".fin-tile").first().click();
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
  /** Baja hasta el porcentaje dado de la página (el popup aparece al 60%). */
  async function scrollTo(page, ratio) {
    await page.evaluate((r) => {
      document.documentElement.style.scrollBehavior = "auto";
      const max = document.documentElement.scrollHeight;
      window.scrollTo(0, max * r - window.innerHeight);
    }, ratio);
  }

  test("aparece al 60% del scroll y Escape lo cierra para siempre", async ({ page }) => {
    await page.goto("/");
    await page.locator(".site-hd").waitFor();
    const nl = page.locator(".nl[role=dialog]");
    await scrollTo(page, 0.5);
    await page.waitForTimeout(300);
    await expect(nl).toHaveCount(0);
    await scrollTo(page, 0.65);
    await expect(nl).toBeVisible();
    expect(await bodyOverflow(page)).toBe("hidden");
    await page.keyboard.press("Escape");
    await expect(nl).toBeHidden();
    expect(await page.evaluate(() => window.localStorage.getItem("indigoff_nl"))).toBe("closed");
  });

  test("valida el correo y envía la suscripción a /api/newsletter", async ({ page }) => {
    let payload;
    await page.route("/api/newsletter", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ json: { ok: true } });
    });
    await page.goto("/");
    await page.locator(".site-hd").waitFor();
    await scrollTo(page, 0.65);
    const nl = page.locator(".nl[role=dialog]");
    await expect(nl).toBeVisible();
    await nl.locator("input").fill("no-es-correo");
    await nl.getByRole("button", { name: "Subscribe" }).click();
    await expect(nl).toContainText("Enter a valid email address.");
    await nl.locator("input").fill("hola@indigoff.com");
    await nl.getByRole("button", { name: "Subscribe" }).click();
    await expect(nl).toContainText("Thank you");
    expect(payload).toEqual({ email: "hola@indigoff.com", _t: expect.any(Number), _cf: "" });
    expect(await page.evaluate(() => window.localStorage.getItem("indigoff_nl"))).toBe("subscribed");
  });

  test("si la API falla, avisa y no marca la suscripción", async ({ page }) => {
    await page.route("/api/newsletter", (route) => route.fulfill({ status: 500, json: { error: "send_failed" } }));
    await page.goto("/");
    await page.locator(".site-hd").waitFor();
    await scrollTo(page, 0.65);
    const nl = page.locator(".nl[role=dialog]");
    await expect(nl).toBeVisible();
    await nl.locator("input").fill("hola@indigoff.com");
    await nl.getByRole("button", { name: "Subscribe" }).click();
    await expect(nl).toContainText("We couldn’t subscribe you right now");
    await expect(nl).not.toContainText("Thank you");
    expect(await page.evaluate(() => window.localStorage.getItem("indigoff_nl"))).toBeNull();
  });

  test("sección de la home: distingue correo inválido de error del servidor", async ({ page }) => {
    let status = 400;
    await page.route("/api/newsletter", (route) => route.fulfill({ status, json: {} }));
    // La sección está al final: sin esto, al bajar aparece el popup y tapa el botón.
    await page.addInitScript(() => window.localStorage.setItem("indigoff_nl", "closed"));
    await page.goto("/");
    const section = page.locator("#contact");
    await section.locator("input[type=email]").fill("hola@indigoff.com");
    await section.getByRole("button", { name: "Sign up" }).click();
    await expect(section.getByRole("alert")).toHaveText("Enter a valid email address.");
    status = 500;
    await section.getByRole("button", { name: "Sign up" }).click();
    await expect(section.getByRole("alert")).toContainText("We couldn’t subscribe you right now");
    status = 200;
    await section.getByRole("button", { name: "Sign up" }).click();
    await expect(section).toContainText("Thank you");
  });
});
