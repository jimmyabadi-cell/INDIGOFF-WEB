import { test, expect } from "@playwright/test";

const ROUTES = ["/", "/ceilings", "/downloads", "/find-a-rep", "/onoff-studio", "/contact"];

// Alto máximo del header sticky por proyecto (ver --hd-h en src/global.css).
const MAX_HEADER = { mobile: 64, tablet: 76, desktop: 96 };

test.beforeEach(async ({ page }) => {
  // Evita que el popup del newsletter tape la página durante las pruebas.
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem("indigoff_nl", "closed");
    } catch (e) {}
  });
});

/** Registra errores de JS y de consola para fallar la prueba si aparece alguno. */
function trackErrors(page) {
  const errors = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  return errors;
}

for (const route of ROUTES) {
  test(`${route} carga sin errores ni scroll horizontal`, async ({ page }, testInfo) => {
    const errors = trackErrors(page);
    await page.goto(route);
    const header = page.locator(".site-hd");
    await expect(header).toBeVisible();

    const box = await header.boundingBox();
    expect(box.height).toBeLessThanOrEqual(MAX_HEADER[testInfo.project.name]);

    // Downloads debe estar visible en el navbar en todos los tamaños.
    await expect(header.locator("a.hd-dl")).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    expect(errors).toEqual([]);
  });
}

for (const route of ROUTES) {
  test(`${route}: ningún link #ancla apunta a una sección que no existe`, async ({ page }) => {
    await page.goto(route);
    await page.locator(".site-hd").waitFor();
    const dead = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute("href"))
        .filter((h) => h.length > 1 && !document.getElementById(h.slice(1))),
    );
    expect(dead).toEqual([]);
  });
}

test("Find a rep: cada card muestra su representante", async ({ page }) => {
  test.setTimeout(60_000);
  const errors = trackErrors(page);
  await page.goto("/find-a-rep");
  const cards = page.locator("section button[aria-pressed]");
  await expect(cards.first()).toBeVisible();
  const count = await cards.count();
  expect(count).toBeGreaterThan(10);

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    const name = (await card.locator("span").first().textContent()).trim();
    await card.click();
    await expect(card).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#rep-result h2")).toHaveText(name);
  }
  await expect(page.locator("#rep-result")).toBeInViewport();
  expect(errors).toEqual([]);
});

test("Find a rep: buscar un estado muestra su representante", async ({ page }) => {
  await page.goto("/find-a-rep");
  await page.getByPlaceholder(/type a state/i).fill("Texas");
  await expect(page.locator("#rep-result h2")).toHaveText("Texas");
});

test("Find a rep: pestañas del mapa cambian de país", async ({ page }) => {
  await page.goto("/find-a-rep");
  const tabs = page.locator("[role=tablist][aria-label=Country]");
  const result = page.locator("#rep-result h2");

  await tabs.getByRole("tab", { name: "Canada" }).click();
  await expect(tabs.getByRole("tab", { name: "Canada" })).toHaveAttribute("aria-selected", "true");
  await expect(result).toHaveText("Canada");

  await tabs.getByRole("tab", { name: "México" }).click();
  await expect(tabs.getByRole("tab", { name: "México" })).toHaveAttribute("aria-selected", "true");
  await expect(result).toHaveText("México");

  await tabs.getByRole("tab", { name: "United States" }).click();
  await expect(tabs.getByRole("tab", { name: "United States" })).toHaveAttribute("aria-selected", "true");
  await expect(result).toHaveText("Select a state");

  // Buscar un estado de EE. UU. desde otra pestaña regresa el mapa a EE. UU.
  await tabs.getByRole("tab", { name: "Canada" }).click();
  await page.getByPlaceholder(/type a state/i).fill("Texas");
  await expect(tabs.getByRole("tab", { name: "United States" })).toHaveAttribute("aria-selected", "true");
});

test("Menú lateral abre, muestra links y cierra con Escape", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.locator(".hd-menu").click();
  const drawer = page.locator("aside.dw");
  await expect(drawer).toBeVisible();
  if (testInfo.project.name !== "desktop") {
    await expect(drawer.locator('.dw-util a[href="/downloads"]')).toBeVisible();
    await expect(drawer.locator('.dw-util a[href="/find-a-rep"]')).toBeVisible();
  }
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
});

test("Títulos de sección sticky quedan pegados al header", async ({ page }) => {
  await page.goto("/");
  await page.locator("#projects .sec-hd").waitFor();
  const gap = await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    const section = document.getElementById("projects");
    window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY + 400);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const headerBottom = document.querySelector(".site-hd").getBoundingClientRect().bottom;
    return section.querySelector(".sec-hd").getBoundingClientRect().top - headerBottom;
  });
  expect(Math.abs(gap)).toBeLessThanOrEqual(2);
});

test("Cambio de idioma EN → ES", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Request a quote").first()).toBeVisible();
  await page.locator(".site-hd").getByRole("button", { name: "Español" }).click();
  await expect(page.getByText("Solicita una cotización").first()).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("Footer: correo de contacto y redes sociales", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer.locator('a[href="mailto:info@indigoff.com"]').first()).toBeVisible();
  const socials = await footer.locator("a.soc").evaluateAll((links) => links.map((a) => a.href));
  expect(socials).toEqual([
    "https://www.instagram.com/indigoff.design/",
    "https://www.facebook.com/indigoff.design",
    "https://open.spotify.com/artist/4b8Uf8sWQLkKSq1sGczqsv",
  ]);
});

/** Llena el formulario de contacto con datos válidos. */
async function fillContact(form) {
  await form.getByLabel("Name", { exact: true }).fill("Ana");
  await form.getByLabel("Last Name").fill("López");
  await form.getByLabel("Email").fill("ana@example.com");
  await form.getByLabel("Message").fill("Necesito paneles para una oficina.");
}

test("Contacto: valida campos obligatorios", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Contact Indigoff");
  const form = page.locator("main form");

  await form.getByRole("button", { name: "Send" }).click();
  await expect(form.getByText("This field is required.")).toHaveCount(3);
  await expect(form.getByLabel("Name", { exact: true })).toBeFocused();

  await fillContact(form);
  await form.getByLabel("Email").fill("ana@");
  await form.getByRole("button", { name: "Send" }).click();
  await expect(form.getByText("Enter a valid email address.")).toBeVisible();
});

test("Contacto: envía el mensaje a /api/contact", async ({ page }) => {
  let payload;
  await page.route("/api/contact", async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto("/contact");
  await fillContact(page.locator("main form"));
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("status")).toContainText("Message sent");
  await expect(page.getByRole("status")).toContainText("ana@example.com");
  expect(payload).toMatchObject({ name: "Ana", lastName: "López", email: "ana@example.com", lang: "en", company: "" });
});

test("Contacto: si la API falla, abre la app de correo", async ({ page }) => {
  await page.route("/api/contact", (route) => route.fulfill({ status: 500, json: { error: "send_failed" } }));
  await page.goto("/contact");
  await fillContact(page.locator("main form"));
  await page.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("status")).toContainText("Your message is ready");
});

test("Botones de acción llevan a /contact", async ({ page }) => {
  await page.goto("/");
  const toContact = (name) => page.locator(`a[href="/contact"]`, { hasText: name }).first();
  for (const name of [
    "Request a quote",
    "Book an appointment",
    "Adapt this concept to your space",
    "Request an acoustic + lighting study",
    "Request samples",
  ]) {
    await expect(toContact(name)).toHaveCount(1);
  }
  await page.goto("/ceilings");
  await expect(page.locator('a[href="/contact"]')).not.toHaveCount(0);
});

test("Cada página tiene su título", async ({ page }) => {
  const TITLES = {
    "/": "Indigoff",
    "/ceilings": "Ceilings — Indigoff",
    "/downloads": "Downloads — Indigoff",
    "/find-a-rep": "Find a rep — Indigoff",
    "/onoff-studio": "onoff studio — Indigoff",
    "/contact": "Contact — Indigoff",
  };
  for (const [route, title] of Object.entries(TITLES)) {
    await page.goto(route);
    await expect(page).toHaveTitle(title);
  }
});
