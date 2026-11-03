import { useState } from "react";
import { makeT } from "../i18n/index.js";
import { useEscape } from "./useEscape.js";
import { useLang } from "./useLang.js";
import { useScrollLock } from "./useScrollLock.js";

const ACTIVE = "#111111";
const INACTIVE = "#6B675F";

/**
 * Lo que comparten todas las páginas: idioma, `t()`, selector EN/ES y menú lateral.
 * Devuelve los campos que usan las plantillas (`v.t`, `v.setEs`, `v.openMenu`, `v.dwCats`…).
 *
 * @param {object} [options]
 * @param {object} [options.nav]    `{ DW_CATS, DW_FIN, ifoSetPending }` para el menú lateral; sin él no hay menú.
 * @param {boolean} [options.isMain]  La home: los acabados del menú abren su panel en lugar de navegar.
 * @param {Record<string, () => void>} [options.openFinish]  Home: abre el panel de un acabado por clave.
 * @returns {{ lang: string, chrome: object }}
 */
export function usePageChrome({ nav, isMain = false, openFinish } = {}) {
  const [lang, setLang] = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  useEscape(menuOpen, () => setMenuOpen(false));
  useScrollLock(menuOpen);

  const t = makeT(lang);
  const es = lang === "es";

  const chrome = {
    t,
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
      dwMenu: t("common.menu.menu"),
      dwMenuLbl: t("common.menu.menu"),
      dwClose: t("common.menu.close"),
      dwCat: t("common.menu.categories"),
      dwFin: t("common.menu.finishes"),
      dwCon: t("common.menu.concepts"),
      dwPro: t("common.menu.projects"),
      dwConHref: isMain ? "#concepts" : "/#concepts",
      dwProHref: isMain ? "#projects" : "/#projects",
      dwCats: nav.DW_CATS.map((m) => ({
        name: t("catalog.categories." + m.cat),
        href: m.href,
        subs: m.subs.map((u) => ({
          label: u.label || t("catalog.subcategories." + m.cat + "." + u.col),
          href: u.href,
          go: () => {
            nav.ifoSetPending(u.href);
            closeMenu();
          },
        })),
      })),
      dwFins: nav.DW_FIN.map(([name, key]) => ({
        name: t("home.finishes." + name),
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
