import { useCallback, useEffect, useState } from "react";
import { i18nGet, i18nSet } from "../lib/i18n.js";

const normalize = (l) => (l === "es" ? "es" : "en");

/**
 * Idioma actual ("en" | "es"), sincronizado entre páginas y pestañas.
 * Mantiene `<html lang>` al día.
 *
 * @returns {[string, (lang: string) => void]}
 */
export function useLang() {
  const [lang, setLangState] = useState(() => normalize(i18nGet()));

  useEffect(() => {
    const sync = () => setLangState(normalize(i18nGet()));
    window.addEventListener("indigoff-lang", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("indigoff-lang", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l) => {
    i18nSet(l);
    setLangState(normalize(l));
  }, []);

  return [lang, setLang];
}
