import { useState } from "react";
import { I18N_ES, i18nDeep, i18nTr } from "../lib/i18n.js";
import { useEscape } from "./useEscape.js";
import { useLang } from "./useLang.js";
import { useScrollLock } from "./useScrollLock.js";

const ACTIVE = "#111111";
const INACTIVE = "#6B675F";

/** Traduce al español los textos de un view model (no toca hrefs, imágenes ni estilos). */
export function localize(vals, lang) {
  return lang === "es" ? i18nDeep(vals, "", 0) : vals;
}

/**
 * Lo que comparten todas las páginas: idioma, textos `T`, selector EN/ES y menú lateral.
 * Devuelve los campos que usan las plantillas (`v.T`, `v.setEs`, `v.openMenu`, `v.dwCats`…).
 *
 * @param {Record<string, string>} I18N_EN  Textos de la página en inglés, por clave.
 * @param {object} [options]
 * @param {object} [options.nav]    `{ DW_CATS, DW_FIN, ifoSetPending }` para el menú lateral; sin él no hay menú.
 * @param {boolean} [options.isMain]  La home: los acabados del menú abren su panel en lugar de navegar.
 * @param {Record<string, () => void>} [options.openFinish]  Home: abre el panel de un acabado por clave.
 * @returns {{ lang: string, chrome: object }}
 */
export function usePageChrome(I18N_EN, { nav, isMain = false, openFinish } = {}) {
  const [lang, setLang] = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  useEscape(menuOpen, () => setMenuOpen(false));
  useScrollLock(menuOpen);

  const es = lang === "es";
  const tr = (x) => (es ? i18nTr(x) : x);

  const T = {};
  for (const key in I18N_EN) T[key] = es ? I18N_ES[I18N_EN[key]] || I18N_EN[key] : I18N_EN[key];

  const chrome = {
    T,
    isEn: es ? "false" : "true",
    isEs: es ? "true" : "false",
    enColor: es ? INACTIVE : ACTIVE,
    esColor: es ? ACTIVE : INACTIVE,
    setEn: () => setLang("en"),
    setEs: () => setLang("es"),
  };

  if (nav) {
    const closeMenu = () => setMenuOpen(false);
    Object.assign(chrome, {
      menuOn: menuOpen,
      menuOnStr: menuOpen ? "true" : "false",
      openMenu: () => setMenuOpen(true),
      closeMenu,
      dwMenu: tr("Menu"),
      dwMenuLbl: tr("Menu"),
      dwClose: tr("Close"),
      dwCat: tr("Categories"),
      dwFin: tr("Finishes"),
      dwCon: tr("Concepts"),
      dwPro: tr("Projects"),
      dwConHref: isMain ? "#concepts" : "/#concepts",
      dwProHref: isMain ? "#projects" : "/#projects",
      dwCats: nav.DW_CATS.map((m) => ({
        name: tr(m.name),
        href: m.href,
        subs: m.subs.map((u) => ({
          label: tr(u.label),
          href: u.href,
          go: () => {
            nav.ifoSetPending(u.href);
            closeMenu();
          },
        })),
      })),
      dwFins: nav.DW_FIN.map(([name, key]) => ({
        name: tr(name),
        isBtn: isMain,
        isLink: !isMain,
        href: "/#finishes",
        go: () => {
          closeMenu();
          if (isMain && openFinish && openFinish[key]) openFinish[key]();
        },
      })),
    });
  }

  return { lang, chrome };
}
