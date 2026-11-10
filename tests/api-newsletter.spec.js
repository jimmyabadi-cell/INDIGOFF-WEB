import { test, expect } from "@playwright/test";
import handler from "../api/newsletter.js";

// Prueba la función de Vercel directamente (sin navegador): Resend se simula reemplazando fetch.
test.describe.configure({ mode: "serial" });

function call(body, method = "POST") {
  const res = { code: 0, headers: {} };
  res.status = (c) => ((res.code = c), res);
  res.json = (j) => ((res.body = j), res);
  res.setHeader = (k, v) => (res.headers[k] = v);
  return handler({ method, body }, res).then(() => res);
}

const realFetch = globalThis.fetch;
const realError = console.error;
let sent;
let fail; // rutas de Resend que responden con error, p. ej. { welcome: true }

const kind = (url, body) =>
  url.includes("/audiences/") ? "audience" : body.to?.includes("ana@example.com") ? "welcome" : "admin";

// Playwright exige desestructurar el primer argumento aunque no se use.
// eslint-disable-next-line no-empty-pattern
test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "No depende del tamaño de pantalla");
  sent = [];
  fail = {};
  process.env.RESEND_API_KEY = "test-key";
  process.env.RESEND_AUDIENCE_ID = "aud_123";
  console.error = () => {};
  globalThis.fetch = async (url, init) => {
    const body = JSON.parse(init.body);
    const k = kind(url, body);
    sent.push({ kind: k, url, body });
    return new Response("{}", { status: fail[k] ? 500 : 200 });
  };
});
test.afterEach(() => {
  globalThis.fetch = realFetch;
  console.error = realError;
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_AUDIENCE_ID;
});

test("API newsletter: guarda al suscriptor en la Audience y manda los dos correos", async () => {
  const res = await call({ email: "ana@example.com" });
  expect(res.code).toBe(200);
  expect(sent.map((s) => s.kind).sort()).toEqual(["admin", "audience", "welcome"]);
  const audience = sent.find((s) => s.kind === "audience");
  expect(audience.url).toBe("https://api.resend.com/audiences/aud_123/contacts");
  expect(audience.body).toEqual({ email: "ana@example.com", unsubscribed: false });
});

test("API newsletter: sin RESEND_AUDIENCE_ID solo manda los correos", async () => {
  delete process.env.RESEND_AUDIENCE_ID;
  const res = await call({ email: "ana@example.com" });
  expect(res.code).toBe(200);
  expect(sent.map((s) => s.kind).sort()).toEqual(["admin", "welcome"]);
});

test("API newsletter: si solo falla la bienvenida, la suscripción cuenta como hecha", async () => {
  fail = { welcome: true };
  expect((await call({ email: "ana@example.com" })).code).toBe(200);
});

test("API newsletter: si no se pudo registrar en ningún lado, responde error", async () => {
  fail = { audience: true, admin: true };
  const res = await call({ email: "ana@example.com" });
  expect(res.code).toBe(500);
  expect(res.body.error).toBe("send_failed");
});

test("API newsletter: escapa el correo en el HTML", async () => {
  const email = `a"onmouseover="x'@example.com`;
  await call({ email });
  const admin = sent.find((s) => s.url.endsWith("/emails") && s.body.reply_to === email);
  expect(admin.body.html).toContain('href="mailto:a&quot;onmouseover=&quot;x&#39;@example.com"');
  expect(admin.body.html).not.toContain('onmouseover="x');
});

test("API newsletter: rechaza correos inválidos, otros métodos y bots", async () => {
  expect((await call({ email: "nope" })).code).toBe(400);
  expect((await call({}, "GET")).code).toBe(405);
  expect((await call({ email: "ana@example.com", company: "Spam" })).code).toBe(200);
  expect(sent).toHaveLength(0);
});
