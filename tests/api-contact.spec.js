import { test, expect } from "@playwright/test";
import handler from "../api/contact.js";
import { resetSpamState } from "../api/_spam.js";

// Prueba la función de Vercel directamente (sin navegador): Resend se simula reemplazando fetch.
test.describe.configure({ mode: "serial" });

function call(body, method = "POST") {
  const res = { code: 0, json: null, headers: {} };
  res.status = (c) => ((res.code = c), res);
  res.json = (j) => ((res.body = j), res);
  res.setHeader = (k, v) => (res.headers[k] = v);
  return handler({ method, body }, res).then(() => res);
}

// _t: 5 s desde que cargó la página, como una persona (ver api/_spam.js).
const VALID = {
  name: "Ana",
  lastName: "López",
  phone: "",
  email: "ana@example.com",
  message: "Hola",
  lang: "es",
  _t: 5000,
};
const realWarn = console.warn;
const realFetch = globalThis.fetch;
let sent;

// Playwright exige desestructurar el primer argumento aunque no se use.
// eslint-disable-next-line no-empty-pattern
test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "No depende del tamaño de pantalla");
  sent = [];
  resetSpamState();
  console.warn = () => {};
  process.env.RESEND_API_KEY = "test-key";
  globalThis.fetch = async (url, init) => {
    sent.push({ url, ...init, body: JSON.parse(init.body) });
    return new Response("{}", { status: 200 });
  };
});
test.afterEach(() => {
  globalThis.fetch = realFetch;
  console.warn = realWarn;
  delete process.env.RESEND_API_KEY;
});

test("API contacto: envía el correo con Resend", async () => {
  const res = await call(VALID);
  expect(res.code).toBe(200);
  expect(sent).toHaveLength(1);
  expect(sent[0].url).toBe("https://api.resend.com/emails");
  expect(sent[0].body).toMatchObject({ to: ["info@indigoff.com"], reply_to: "ana@example.com" });
  expect(sent[0].body.text).toContain("Name: Ana López");
  expect(sent[0].body.text).toContain("Language: Español");
});

test("API contacto: escapa los datos del visitante en el correo HTML", async () => {
  const email = `a"onmouseover="x'@example.com`;
  // El HTML va en el mensaje: en el nombre ya se descarta como spam (ver api/_spam.js).
  const res = await call({ ...VALID, message: "<b>Ana</b>", email });
  expect(res.code).toBe(200);
  const { html, reply_to } = sent[0].body;
  expect(html).toContain('href="mailto:a&quot;onmouseover=&quot;x&#39;@example.com"');
  expect(html).not.toContain('onmouseover="x');
  expect(html).toContain("&lt;b&gt;Ana&lt;/b&gt;");
  expect(reply_to).toBe(email);
});

test("API contacto: rechaza datos inválidos y otros métodos", async () => {
  const bad = await call({ ...VALID, name: " ", email: "nope" });
  expect(bad.code).toBe(400);
  expect(bad.body.fields).toEqual(["name", "email"]);
  expect((await call({}, "GET")).code).toBe(405);
  expect(sent).toHaveLength(0);
});

test("API contacto: ignora bots (campo trampa) y avisa si falta la clave", async () => {
  expect((await call({ ...VALID, _hp: "Spam Inc" })).code).toBe(200);
  expect(sent).toHaveLength(0);
  delete process.env.RESEND_API_KEY;
  const res = await call(VALID);
  expect(res.code).toBe(500);
  expect(res.body.error).toBe("not_configured");
});

test("API contacto: descarta envíos de bots sin avisarles", async () => {
  const cases = [
    { ...VALID, _t: 800 }, // demasiado rápido
    { ...VALID, _t: undefined }, // sin tiempo: no viene del formulario
    { ...VALID, name: "Visit https://spam.example" },
    { ...VALID, company: "<b>cheap</b>" },
    { ...VALID, name: "Иван" },
    { ...VALID, message: "http://a.co http://b.co http://c.co" },
  ];
  for (const body of cases) expect((await call(body)).code).toBe(200);
  expect(sent).toHaveLength(0);
});

test("API contacto: un mensaje normal con un link sí se envía", async () => {
  const res = await call({ ...VALID, company: "Acme Inc.", message: "Our plans: https://acme.com/plans" });
  expect(res.code).toBe(200);
  expect(sent).toHaveLength(1);
});

test("API contacto: limita los envíos por IP", async () => {
  for (let i = 0; i < 5; i++) expect((await call(VALID)).code).toBe(200);
  const res = await call(VALID);
  expect(res.code).toBe(429);
  expect(sent).toHaveLength(5);
});

test("API contacto: con TURNSTILE_SECRET_KEY exige una ficha válida de Cloudflare", async () => {
  process.env.TURNSTILE_SECRET_KEY = "secret";
  const checked = [];
  globalThis.fetch = async (url, init) => {
    if (url.includes("turnstile")) {
      const token = new URLSearchParams(init.body).get("response");
      checked.push(token);
      return new Response(JSON.stringify({ success: token === "buena" }), { status: 200 });
    }
    sent.push({ url, body: JSON.parse(init.body) });
    return new Response("{}", { status: 200 });
  };
  try {
    expect((await call(VALID)).code).toBe(403); // sin ficha
    expect((await call({ ...VALID, _cf: "mala" })).code).toBe(403);
    expect(sent).toHaveLength(0);
    expect((await call({ ...VALID, _cf: "buena" })).code).toBe(200);
    expect(sent).toHaveLength(1);
    expect(checked).toEqual(["mala", "buena"]);
  } finally {
    delete process.env.TURNSTILE_SECRET_KEY;
  }
});
