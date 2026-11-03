// Formulario de contacto: Vercel lo publica como función en POST /api/contact y envía el correo con Resend.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  (obligatoria) clave de https://resend.com
//   CONTACT_FROM    remitente de un dominio verificado en Resend. Por defecto "Indigoff Web <web@indigoff.com>".
//   CONTACT_TO      a quién llega el mensaje. Por defecto info@indigoff.com.
//
// Respuestas: 200 { ok: true } · 400 { error: "invalid", fields } · 405 · 500 { error: "not_configured" | "send_failed" }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 100, lastName: 100, phone: 40, email: 200, message: 5000 };

const clean = (v, max) =>
  String(v ?? "")
    .trim()
    .slice(0, max);

/** Valida y recorta los campos; devuelve `{ data, fields }` con `fields` = campos con error. */
export function parseContact(body) {
  const data = {};
  for (const [k, max] of Object.entries(MAX)) data[k] = clean(body?.[k], max);
  const fields = [];
  if (!data.name) fields.push("name");
  if (!EMAIL_RE.test(data.email)) fields.push("email");
  if (!data.message) fields.push("message");
  return { data, fields };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  // Campo trampa: invisible para personas, los bots lo llenan. Se responde ok para no darles pistas.
  if (body.company) return res.status(200).json({ ok: true });

  const { data, fields } = parseContact(body);
  if (fields.length) return res.status(400).json({ error: "invalid", fields });

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(500).json({ error: "not_configured" });

  const fullName = [data.name, data.lastName].filter(Boolean).join(" ");
  const text = [
    `Name: ${fullName}`,
    `Phone: ${data.phone || "—"}`,
    `Email: ${data.email}`,
    `Language: ${body.lang === "es" ? "Español" : "English"}`,
    "",
    data.message,
  ].join("\n");

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Indigoff Web <web@indigoff.com>",
      to: [process.env.CONTACT_TO || "info@indigoff.com"],
      reply_to: data.email,
      subject: `Contact form — ${fullName}`,
      text,
    }),
  });
  if (!r.ok) {
    console.error("[contact] Resend", r.status, await r.text());
    return res.status(500).json({ error: "send_failed" });
  }
  return res.status(200).json({ ok: true });
}
