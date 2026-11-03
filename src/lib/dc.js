import React from "react";
import { I18N_ES, i18nGet, i18nSet, i18nTr, i18nDeep } from "./i18n.js";

export class DCLogic extends React.Component {
  render() {
    return this.constructor.template(this.renderVals(), this);
  }
  renderVals() {
    const self = this;
    const I18N_EN = self.constructor.I18N_EN || {};
    if (!self._i18nInit) {
      self._i18nInit = true;
      if (!self.state) self.state = {};
      self.state.lang = i18nGet();
      try {
        const h = function () {
          const l = i18nGet();
          if (l !== self.state.lang) self.setState({ lang: l });
        };
        window.addEventListener("indigoff-lang", h);
        window.addEventListener("storage", h);
      } catch (e) {}
    }
    const lang = self.state.lang === "es" ? "es" : "en";
    try {
      document.documentElement.lang = lang;
    } catch (e) {}
    let v = self._rv();
    if (lang === "es") v = i18nDeep(v, "", 0);
    const T = {};
    for (const key in I18N_EN) T[key] = lang === "es" ? I18N_ES[I18N_EN[key]] || I18N_EN[key] : I18N_EN[key];
    v.T = T;
    v.isEn = lang === "en" ? "true" : "false";
    v.isEs = lang === "es" ? "true" : "false";
    v.enColor = lang === "en" ? "#111111" : "#6B675F";
    v.esColor = lang === "es" ? "#111111" : "#6B675F";
    v.setEn = function () {
      i18nSet("en");
      self.setState({ lang: "en" });
    };
    v.setEs = function () {
      i18nSet("es");
      self.setState({ lang: "es" });
    };
    const PAGE_DW_CATS = self.constructor.DW_CATS;
    if (PAGE_DW_CATS) {
      const PAGE_DW_FIN = self.constructor.DW_FIN || [];
      const PAGE_IFO = self.constructor.ifoSetPending || function () {};
      v.menuOnStr = self.state.menuOpen ? "true" : "false";
      const isMain = !!(v.open && v.open.f_colors);
      const tr = function (x) {
        return lang === "es" ? i18nTr(x) : x;
      };
      if (!self._dwKey) {
        self._dwKey = true;
        try {
          window.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && self.state.menuOpen) self.setState({ menuOpen: false });
          });
        } catch (e) {}
      }
      v.menuOn = !!self.state.menuOpen;
      v.openMenu = function () {
        self.setState({ menuOpen: true });
      };
      v.closeMenu = function () {
        self.setState({ menuOpen: false });
      };
      v.dwMenu = tr("Menu");
      v.dwMenuLbl = tr("Menu");
      v.dwClose = tr("Close");
      v.dwCat = tr("Categories");
      v.dwFin = tr("Finishes");
      v.dwCon = tr("Concepts");
      v.dwPro = tr("Projects");
      v.dwConHref = isMain ? "#concepts" : "/#concepts";
      v.dwProHref = isMain ? "#projects" : "/#projects";
      v.dwCats = PAGE_DW_CATS.map(function (m) {
        return {
          name: tr(m.name),
          href: m.href,
          subs: m.subs.map(function (u) {
            return {
              label: tr(u.label),
              href: u.href,
              go: function () {
                PAGE_IFO(u.href);
                self.setState({ menuOpen: false });
              },
            };
          }),
        };
      });
      v.dwFins = PAGE_DW_FIN.map(function (m) {
        return {
          name: tr(m[0]),
          isBtn: isMain,
          isLink: !isMain,
          href: "/#finishes",
          go: function () {
            self.setState({ menuOpen: false });
            if (isMain && v.open[m[1]]) v.open[m[1]]();
          },
        };
      });
      if (self.state.menuOpen) {
        try {
          document.body.style.overflow = "hidden";
        } catch (e) {}
      } else if (!isMain) {
        try {
          document.body.style.overflow = "";
        } catch (e) {}
      }
    }
    return v;
  }
}

// Inline CSS string -> React style object (cached).
const cache = new Map();
export function S(css) {
  if (!css) return undefined;
  let o = cache.get(css);
  if (o) return o;
  o = {};
  css.split(";").forEach((decl) => {
    const i = decl.indexOf(":");
    if (i < 0) return;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop) return;
    const key = prop.startsWith("--") ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    o[key] = val;
  });
  if (cache.size > 5000) cache.clear();
  cache.set(css, o);
  return o;
}
