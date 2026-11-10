// Formulario de contacto: Vercel lo publica como función en POST /api/contact y envía el correo con Resend.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY  (obligatoria) clave de https://resend.com
//   CONTACT_FROM    remitente de un dominio verificado en Resend. Por defecto "Indigoff Web <web@indigoff.com>".
//   CONTACT_TO      a quién llega el mensaje. Por defecto info@indigoff.com.
//
// Respuestas: 200 { ok: true } · 400 { error: "invalid", fields } · 405 · 500 { error: "not_configured" | "send_failed" }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 100, lastName: 100, phone: 40, email: 200, company: 100, message: 5000 };

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
  return { data, fields };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  // Campo trampa: invisible para personas, los bots lo llenan. Se responde ok para no darles pistas.
  if (body._hp) return res.status(200).json({ ok: true });

  const { data, fields } = parseContact(body);
  if (fields.length) return res.status(400).json({ error: "invalid", fields });

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(500).json({ error: "not_configured" });

  const fullName = [data.name, data.lastName].filter(Boolean).join(" ");
  const lang = body.lang === "es" ? "Español" : "English";
  const isRepRequest = !!body.isRepRequest;
  const repInfo = body.repInfo && typeof body.repInfo === "object"
    ? {
        name: String(body.repInfo.name || "").slice(0, 100),
        selectedPlace: String(body.repInfo.selectedPlace || "").slice(0, 200),
        email: String(body.repInfo.email || "").slice(0, 200),
        phone: String(body.repInfo.phone || "").slice(0, 40),
      }
    : null;
  const listItems = Array.isArray(body.listItems)
    ? body.listItems.slice(0, 20).map((x) => ({
        name: String(x.name || "").slice(0, 100),
        kind: String(x.kind || "").slice(0, 60),
        img: String(x.img || "").slice(0, 300),
        href: String(x.href || "/").slice(0, 100),
      }))
    : [];
  // También las comillas: el correo del visitante va dentro de atributos href.
  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const text = [
    `Name: ${fullName}`,
    data.company ? `Company: ${data.company}` : null,
    `Phone: ${data.phone || "—"}`,
    `Email: ${data.email}`,
    `Language: ${lang}`,
    "",
    data.message,
  ].filter(Boolean).join("\n");

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
            <p style="margin:8px 0 0;font-size:22px;font-weight:600;color:#ffffff;">${isRepRequest ? "Rep request — product list" : "New contact message"}</p>
          </td>
        </tr>

        <!-- Sender info -->
        <tr>
          <td style="padding:32px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:20px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6b675f;">Name</p>
                  <p style="margin:0;font-size:16px;color:#111111;font-weight:500;">${esc(fullName)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:20px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6b675f;">Email</p>
                  <p style="margin:0;font-size:16px;"><a href="mailto:${esc(data.email)}" style="color:#645dc5;text-decoration:none;">${esc(data.email)}</a></p>
                </td>
              </tr>
              ${data.company ? `<tr>
                <td style="padding-bottom:20px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6b675f;">Company</p>
                  <p style="margin:0;font-size:16px;color:#111111;">${esc(data.company)}</p>
                </td>
              </tr>` : ""}
              <tr>
                <td style="padding-bottom:20px;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6b675f;">Phone</p>
                  <p style="margin:0;font-size:16px;color:#111111;">${esc(data.phone || "—")}</p>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:20px;vertical-align:top;">
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

        ${repInfo ? `
        <!-- Divider -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #c9c4ba;margin:0;"></td></tr>

        <!-- Representative -->
        <tr>
          <td style="padding:28px 40px 32px;">
            <p style="margin:0 0 12px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6b675f;">Selected representative</p>
            <p style="margin:0 0 4px;font-size:17px;font-weight:500;color:#111111;">${esc(repInfo.name)}</p>
            ${repInfo.selectedPlace ? `<p style="margin:0 0 8px;font-size:14px;color:#3a3935;">${esc(repInfo.selectedPlace)}</p>` : ""}
            ${repInfo.email ? `<p style="margin:0;font-size:14px;"><a href="mailto:${esc(repInfo.email)}" style="color:#645dc5;text-decoration:none;">${esc(repInfo.email)}</a></p>` : ""}
          </td>
        </tr>` : ""}

        ${listItems.length > 0 ? `
        <!-- Divider -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #c9c4ba;margin:0;"></td></tr>

        <!-- Selected products -->
        <tr>
          <td style="padding:28px 40px 32px;">
            <p style="margin:0 0 16px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6b675f;">Selected products</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                ${listItems.map((item) => `
                <td width="${Math.floor(100 / Math.min(listItems.length, 4))}%" style="padding:0 8px 0 0;vertical-align:top;">
                  <a href="https://indigoff.com${esc(item.href)}" style="text-decoration:none;color:inherit;">
                    ${item.img ? `<img src="https://indigoff.com${esc(item.img)}" width="120" style="display:block;width:100%;max-width:120px;aspect-ratio:4/3;object-fit:cover;border-radius:2px;margin-bottom:6px;" alt="${esc(item.name)}">` : ""}
                    <p style="margin:0;font-size:13px;font-weight:500;color:#111111;line-height:1.3;">${esc(item.name)}</p>
                    ${item.kind ? `<p style="margin:2px 0 0;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#6b675f;">${esc(item.kind)}</p>` : ""}
                  </a>
                </td>`).join("")}
              </tr>
            </table>
          </td>
        </tr>` : ""}

        <!-- CTA -->
        <tr>
          <td style="padding:0 40px 40px;">
            <a href="mailto:${esc(data.email)}" style="display:inline-block;background:#645dc5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:14px 28px;border-radius:2px;">Reply to ${esc(fullName)}</a>
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
      subject: isRepRequest ? `Rep request — ${fullName}` : `Contact form — ${fullName}`,
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
