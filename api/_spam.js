// Filtros anti-spam para los formularios (api/contact.js y api/newsletter.js).
// El "_" inicial hace que Vercel no lo publique como función: es solo un módulo compartido.
//
// Lo que detectan como bot se responde con 200 { ok: true } sin enviar nada, para no darle pistas;
// el motivo queda en los logs de Vercel ("[spam] …").

/** Tiempo mínimo entre que carga la página y se envía un formulario (una persona tarda más). */
export const MIN_ELAPSED_MS = 3000;

const LINK = /https?:\/\/|www\.|\.(?:ru|cn|xyz|top|click)\b/gi;
const FOREIGN_SCRIPT = /[Ѐ-ӿ؀-ۿ぀-ヿ一-鿿]/;

/**
 * Motivo por el que un envío parece de un bot, o `null` si parece de una persona.
 *
 * @param {object} body    Lo que mandó el formulario (`_hp` campo trampa, `_t` ms desde que cargó la página).
 * @param {object} [text]  Campos de texto a revisar: `{ names: [...], message }`.
 */
export function spamReason(body, { names = [], message = "" } = {}) {
  if (body._hp) return "honeypot";
  const elapsed = Number(body._t);
  if (!Number.isFinite(elapsed)) return "no-timing";
  if (elapsed < MIN_ELAPSED_MS) return "too-fast";
  for (const n of names) {
    if (!n) continue;
    if ((n.match(LINK) || []).length || /[<>]/.test(n)) return "link-in-name";
    if (FOREIGN_SCRIPT.test(n)) return "foreign-script-name";
  }
  if ((message.match(LINK) || []).length > 2) return "too-many-links";
  return null;
}

const clientIp = (req) =>
  String(req.headers?.["x-forwarded-for"] || req.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim();

/**
 * Comprueba la ficha de Cloudflare Turnstile que manda el formulario (`_cf`, ver src/lib/turnstile.js).
 * Sin TURNSTILE_SECRET_KEY (local, deploys de prueba) no se comprueba nada y responde `true`.
 *
 * @returns {Promise<boolean>}
 */
export async function turnstileOk(req, token) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: String(token), remoteip: clientIp(req) }),
    });
    const data = await r.json();
    if (!data.success) console.warn("[spam] turnstile:", (data["error-codes"] || []).join(",") || "failed");
    return !!data.success;
  } catch (err) {
    // Si Cloudflare no responde, no bloqueamos a la persona: siguen activos los demás filtros.
    console.error("[spam] turnstile no respondió:", err);
    return true;
  }
}

// Límite de envíos por IP. Vive en la memoria de cada instancia de la función: frena ráfagas de un mismo origen,
// no es un límite exacto (Vercel puede tener varias instancias y reiniciarlas).
const hits = new Map();

/** `true` si esa IP ya hizo `max` envíos en los últimos `windowMs`. */
export function rateLimited(req, bucket, max, windowMs = 10 * 60 * 1000) {
  const key = bucket + ":" + clientIp(req);
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear(); // por si acaso: que la memoria no crezca sin límite
  return recent.length > max;
}

/** Solo para las pruebas. */
export function resetSpamState() {
  hits.clear();
}
