import en from "./locales/en.json";
import es from "./locales/es.json";

export const LOCALES = { en, es };

function lookup(dict, key) {
  return key.split(".").reduce((node, part) => (node == null ? undefined : node[part]), dict);
}

function interpolate(str, vars) {
  return str.replace(/\{(\w+)\}/g, (m, name) => (vars[name] !== undefined ? String(vars[name]) : m));
}

/**
 * Traduce una clave (`"studio.hero.title"`) al idioma dado.
 *
 * - Si falta en ese idioma usa el inglés (y avisa en desarrollo).
 * - `{name}` se reemplaza con `vars.name`.
 * - Si el valor es `{ one, other }` y hay `vars.count`, elige la forma plural.
 * - Las claves que apuntan a listas u objetos devuelven la estructura completa.
 *
 * @param {"en"|"es"} lang
 * @param {string} key
 * @param {Record<string, string|number>} [vars]
 */
export function translate(lang, key, vars) {
  let value = lookup(LOCALES[lang], key);
  if (value === undefined) {
    value = lookup(en, key);
    if (import.meta.env?.DEV) console.warn(`[i18n] Falta "${key}" en "${lang}"`);
  }
  if (value === undefined) return key;
  if (vars && typeof value === "object" && "other" in value) {
    value = vars.count === 1 && value.one !== undefined ? value.one : value.other;
  }
  return typeof value === "string" && vars ? interpolate(value, vars) : value;
}

/**
 * Texto que viene de datos (lightboxes, muestrarios…):
 * - `"@clave"` se traduce con `t`;
 * - `{ k, vars }` se traduce con variables (que a su vez pueden ser referencias);
 * - una lista se une con " · ";
 * - cualquier otro texto se deja igual (nombres propios: productos, marcas, proyectos).
 */
export function tx(ref, t) {
  if (ref == null) return "";
  if (Array.isArray(ref)) return ref.map((r) => tx(r, t)).join(" · ");
  if (typeof ref === "object") {
    const vars = {};
    for (const [k, v] of Object.entries(ref.vars || {})) vars[k] = tx(v, t);
    return t(ref.k, vars);
  }
  return typeof ref === "string" && ref.startsWith("@") ? t(ref.slice(1)) : ref;
}

/** Función `t(key, vars)` ligada a un idioma. */
export function makeT(lang) {
  return (key, vars) => translate(lang, key, vars);
}
