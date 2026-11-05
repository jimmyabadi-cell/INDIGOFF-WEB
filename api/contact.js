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
  const lang = body.lang === "es" ? "Español" : "English";
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const text = [
    `Name: ${fullName}`,
    `Phone: ${data.phone || "—"}`,
    `Email: ${data.email}`,
    `Language: ${lang}`,
    "",
    data.message,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1eb;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#1e125c;padding:32px 40px;">
            <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#b5b7dd;">INDIGOFF</p>
            <p style="margin:8px 0 0;font-size:22px;font-weight:600;color:#ffffff;">New contact message</p>
          </td>
        </tr>

        <!-- Sender info -->
        <tr>
          <td style="padding:32px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding-bottom:20px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6b675f;">Name</p>
                  <p style="margin:0;font-size:16px;color:#111111;font-weight:500;">${esc(fullName)}</p>
                </td>
                <td width="50%" style="padding-bottom:20px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6b675f;">Email</p>
                  <p style="margin:0;font-size:16px;"><a href="mailto:${esc(data.email)}" style="color:#645dc5;text-decoration:none;">${esc(data.email)}</a></p>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding-bottom:20px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6b675f;">Phone</p>
                  <p style="margin:0;font-size:16px;color:#111111;">${esc(data.phone || "—")}</p>
                </td>
                <td width="50%" style="padding-bottom:20px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6b675f;">Language</p>
                  <p style="margin:0;font-size:16px;color:#111111;">${esc(lang)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #c9c4ba;margin:0;"></td></tr>

        <!-- Message -->
        <tr>
          <td style="padding:28px 40px 40px;">
            <p style="margin:0 0 12px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6b675f;">Message</p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:#3a3935;white-space:pre-wrap;">${esc(data.message)}</p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:0 40px 40px;">
            <a href="mailto:${esc(data.email)}" style="display:inline-block;background:#645dc5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:14px 28px;border-radius:2px;">Reply to ${esc(data.name)}</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#ece9e4;padding:20px 40px;">
            <p style="margin:0;font-size:12px;color:#6b675f;">This message was sent from the contact form at <a href="https://indigoff.com" style="color:#645dc5;text-decoration:none;">indigoff.com</a></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Indigoff Web <web@indigoff.com>",
      to: (process.env.CONTACT_TO || "info@indigoff.com").split(",").map(s => s.trim()),
      reply_to: data.email,
      subject: `Contact form — ${fullName}`,
      text,
      html,
    }),
  });
  if (!r.ok) {
    console.error("[contact] Resend", r.status, await r.text());
    return res.status(500).json({ error: "send_failed" });
  }
  return res.status(200).json({ ok: true });
}
