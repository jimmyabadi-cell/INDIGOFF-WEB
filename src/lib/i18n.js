// Idioma elegido por el visitante ("en" | "es"), compartido entre páginas y pestañas.
// Las traducciones viven en src/i18n (locales con claves y t()).

export function i18nGet() {
  try {
    const v = window.localStorage.getItem("indigoff_lang");
    if (v) return v;
  } catch (e) {}
  try {
    return window.__indigoffLang || "en";
  } catch (e) {
    return "en";
  }
}

export function i18nSet(l) {
  try {
    window.localStorage.setItem("indigoff_lang", l);
  } catch (e) {}
  try {
    window.__indigoffLang = l;
    window.dispatchEvent(new CustomEvent("indigoff-lang", { detail: l }));
  } catch (e) {}
}
