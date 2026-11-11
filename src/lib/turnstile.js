// Cloudflare Turnstile: verificación anti-bots de los formularios (contacto y newsletter).
// El servidor la comprueba en api/_spam.js con TURNSTILE_SECRET_KEY (solo en Production de Vercel).
import { useCallback, useEffect, useRef } from "react";

const SITE_KEY = "0x4AAAAAAF8PCAvPzsbyLueO";
// Clave de prueba de Cloudflare (siempre pasa): local, pruebas y deploys de prueba, cuyos dominios no están en el widget.
const TEST_KEY = "1x00000000000000000000AA";
const SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

const siteKey = () => (/(^|\.)indigoff\.com$/.test(window.location.hostname) ? SITE_KEY : TEST_KEY);

let loading = null;
/** Carga el script de Cloudflare una sola vez; resuelve con `window.turnstile` o `null` si no carga (p. ej. bloqueado). */
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!loading)
    loading = new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = SCRIPT;
      s.async = true;
      s.onload = () => resolve(window.turnstile || null);
      s.onerror = () => {
        loading = null; // permitir reintentar en otra visita al formulario
        resolve(null);
      };
      document.head.appendChild(s);
    });
  return loading;
}

/**
 * Widget de Turnstile para un formulario. Casi siempre es invisible ("interaction-only"): solo aparece una casilla
 * si Cloudflare necesita que la persona confirme.
 *
 * @param {boolean} active  Cuándo cargarlo (p. ej. al abrir el popup o al enfocar el campo): no se pide antes.
 * @returns {{ ref: object, getToken: (ms?: number) => Promise<string>, reset: () => void }}
 *   `ref` va en un <div> dentro del formulario; `getToken()` espera la ficha (o "" si no llega a tiempo);
 *   `reset()` pide una nueva después de cada envío (cada ficha sirve una sola vez).
 */
export function useTurnstile(active = true) {
  const ref = useRef(null);
  const widget = useRef(null);
  const token = useRef("");
  const failed = useRef(false);
  const waiting = useRef([]);

  const settle = (value) => {
    token.current = value;
    waiting.current.splice(0).forEach((resolve) => resolve(value));
  };

  useEffect(() => {
    if (!active) return;
    let alive = true;
    failed.current = false;
    loadTurnstile().then((ts) => {
      if (!alive) return;
      if (!ts || !ref.current) {
        failed.current = true;
        settle("");
        return;
      }
      widget.current = ts.render(ref.current, {
        sitekey: siteKey(),
        appearance: "interaction-only",
        callback: settle,
        "expired-callback": () => (token.current = ""),
        "error-callback": () => {
          failed.current = true;
          settle("");
        },
      });
    });
    return () => {
      alive = false;
      if (widget.current != null) window.turnstile?.remove(widget.current);
      widget.current = null;
      token.current = "";
    };
  }, [active]);

  const getToken = useCallback((ms = 5000) => {
    if (token.current || failed.current) return Promise.resolve(token.current);
    return new Promise((resolve) => {
      waiting.current.push(resolve);
      setTimeout(() => resolve(token.current), ms);
    });
  }, []);

  const reset = useCallback(() => {
    token.current = "";
    if (widget.current != null) window.turnstile?.reset(widget.current);
  }, []);

  return { ref, getToken, reset };
}
