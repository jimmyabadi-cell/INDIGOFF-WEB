// Suscripción al newsletter: Vercel lo publica como función en POST /api/newsletter.
// Envía dos correos vía Resend:
//   1. Notificación a los admins (NEWSLETTER_TO o fallback hardcodeado)
//   2. Bienvenida al suscriptor
//
// Variables de entorno:
//   RESEND_API_KEY   (obligatoria)
//   CONTACT_FROM     remitente. Por defecto "Indigoff Web <web@indigoff.com>".
//   NEWSLETTER_TO    admins separados por coma. Por defecto los dos hardcodeados abajo.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ADMIN_TO = ["jashua.pena@wrks.com.mx", "info@indigoff.com"];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  // Honeypot
  if (body.company) return res.status(200).json({ ok: true });

  const email = String(body.email ?? "").trim().slice(0, 200);
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: "invalid" });

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(500).json({ error: "not_configured" });

  const from = process.env.CONTACT_FROM || "Indigoff Web <web@indigoff.com>";
  const adminTo = process.env.NEWSLETTER_TO
    ? process.env.NEWSLETTER_TO.split(",").map((s) => s.trim())
    : ADMIN_TO;

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // 1 — Notificación a admins
  const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1eb;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;">
        <tr>
          <td style="background:#1e125c;padding:32px 40px;">
            <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#b5b7dd;">INDIGOFF</p>
            <p style="margin:8px 0 0;font-size:22px;font-weight:600;color:#ffffff;">New newsletter subscriber</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px 40px;">
            <p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6b675f;">Email</p>
            <p style="margin:0 0 32px;font-size:18px;"><a href="mailto:${esc(email)}" style="color:#645dc5;text-decoration:none;">${esc(email)}</a></p>
            <a href="mailto:${esc(email)}" style="display:inline-block;background:#645dc5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:14px 28px;border-radius:2px;">Send a welcome</a>
          </td>
        </tr>
        <tr>
          <td style="background:#ece9e4;padding:20px 40px;">
            <p style="margin:0;font-size:12px;color:#6b675f;">Subscribed from <a href="https://indigoff.com" style="color:#645dc5;text-decoration:none;">indigoff.com</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // 2 — Bienvenida al suscriptor
  const welcomeHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f1eb;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;">
        <tr>
          <td style="background:#1e125c;padding:32px 40px;">
            <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#b5b7dd;">INDIGOFF</p>
            <p style="margin:8px 0 0;font-size:22px;font-weight:600;color:#ffffff;">You're on the list.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#3a3935;">Thank you for subscribing. You'll be the first to know about new collections, concepts and projects from Indigoff.</p>
            <p style="margin:0 0 32px;font-size:16px;line-height:1.7;color:#3a3935;">In the meantime, explore our work at <a href="https://indigoff.com" style="color:#645dc5;text-decoration:none;">indigoff.com</a>.</p>
            <a href="https://indigoff.com" style="display:inline-block;background:#645dc5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:14px 28px;border-radius:2px;">Explore Indigoff</a>
          </td>
        </tr>
        <tr>
          <td style="background:#ece9e4;padding:20px 40px;">
            <p style="margin:0;font-size:12px;color:#6b675f;">You subscribed at <a href="https://indigoff.com" style="color:#645dc5;text-decoration:none;">indigoff.com</a>. If this wasn't you, ignore this email.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const [r1, r2] = await Promise.all([
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: adminTo,
        reply_to: email,
        subject: `Newsletter — ${email}`,
        text: `New subscriber: ${email}`,
        html: adminHtml,
      }),
    }),
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "You're on the list — Indigoff",
        text: "Thank you for subscribing. You'll be the first to know about new collections, concepts and projects from Indigoff.\n\nhttps://indigoff.com",
        html: welcomeHtml,
      }),
    }),
  ]);

  if (!r1.ok || !r2.ok) {
    console.error("[newsletter] Resend", r1.status, r2.status);
    return res.status(500).json({ error: "send_failed" });
  }
  return res.status(200).json({ ok: true });
}
