import { DW_FIN, ifoSetPending } from "../../lib/nav.js";
import PROJECTS from "../../data/projects.json";
import CONCEPTS from "../../data/concepts.json";
import MM_FIN_IMG from "../../data/fin-img.json";
import SR_INDEX from "../../data/sr-index.json";
import { conceptLb, projLb, tEn } from "./lightboxes.js";

/** Búsqueda global (`/` o ⌘K): productos, acabados, conceptos y proyectos. */
export function searchVals(self, t, open, closeMenu, keys) {
  var v = {};
  var st = self.state;
  keys.search = function (e) {
    if (e.key === "Escape" && st.searchOpen) self.setState({ searchOpen: false, srq: "" });
    if ((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) && !st.searchOpen) {
      var t = e.target && e.target.tagName;
      if (t !== "INPUT" && t !== "TEXTAREA") {
        e.preventDefault();
        self.setState({ searchOpen: true });
      }
    }
  };
  var sq = (st.srq || "").trim().toLowerCase();
  v.searchOn = !!st.searchOpen;
  v.openSearch = function () {
    self.setState({ searchOpen: true });
    closeMenu();
  };
  v.closeSearch = function () {
    self.setState({ searchOpen: false, srq: "" });
  };
  v.srInput = function (e) {
    self.setState({ srq: e.target.value });
  };
  v.srQ = st.srq || "";
  v.srLabel = t("home.search.label");
  v.srClose = t("common.menu.close");
  v.srPh = t("home.search.placeholder");
  v.srSuggest = t("home.search.popular");
  v.srNone = t("home.search.none");
  v.srChips = [
    ["catalog.categories.ceilings", "/ceilings"],
    ["catalog.categories.walls", "/walls"],
    ["catalog.categories.lights", "/lights"],
    ["catalog.categories.dividers", "/dividers"],
    ["catalog.categories.podcaster", "/podcaster"],
    ["common.downloads", "/downloads"],
  ].map(function (c) {
    return { name: t(c[0]), href: c[1] };
  });
  // Se busca en ambos idiomas: el visitante puede escribir "nubes" o "clouds".
  var both = function (key) {
    return [tEn(key), t(key)];
  };
  var res = [];
  if (sq) {
    var norm = function (x) {
      return (x || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    };
    var q2 = norm(sq);
    var hit = function () {
      for (var a = 0; a < arguments.length; a++) {
        if (norm(arguments[a]).indexOf(q2) >= 0) return true;
      }
      return false;
    };
    SR_INDEX.forEach(function (p) {
      var catKey = "catalog.categories." + p.c;
      var subKey = "catalog.subcategories." + p.c + "." + p.s;
      if (hit.apply(null, [p.n].concat(both(catKey), both(subKey))))
        res.push({
          name: p.n,
          kind: t(catKey) + " · " + t(subKey),
          img: p.i,
          href: p.h,
          isLink: true,
          isBtn: false,
          go: function () {
            ifoSetPending(p.h);
            self.setState({ searchOpen: false, srq: "" });
          },
          rank: norm(p.n).indexOf(q2) === 0 ? 0 : 1,
        });
    });
    DW_FIN.forEach(function (m) {
      var finKey = "home.finishes." + m[0];
      if (hit.apply(null, both(finKey).concat(["finish", "acabado"])))
        res.push({
          name: t(finKey),
          kind: t("common.menu.finishes"),
          img: MM_FIN_IMG[m[1]] || "",
          href: "",
          isLink: false,
          isBtn: true,
          go: function () {
            self.setState({ searchOpen: false, srq: "" });
            open[m[1]]();
          },
          rank: 0,
        });
    });
    CONCEPTS.forEach(function (c) {
      var cName = "home.conceptNames." + c.code;
      if (hit.apply(null, [c.code].concat(both(cName), ["concept", "concepto"])))
        res.push({
          name: c.code + " · " + t(cName),
          kind: t("common.menu.concepts"),
          img: c.img,
          href: "",
          isLink: false,
          isBtn: true,
          go: function () {
            self.setState({
              searchOpen: false,
              srq: "",
              sel: c.code,
              zi: null,
              lb: conceptLb(c),
            });
          },
          rank: 1,
        });
    });
    PROJECTS.forEach(function (pj) {
      if (hit(pj.name, "project", "proyecto"))
        res.push({
          name: pj.name,
          kind: t("common.menu.projects"),
          img: pj.imgs[0],
          href: "",
          isLink: false,
          isBtn: true,
          go: function () {
            self.setState({ searchOpen: false, srq: "", zi: null, lb: projLb(pj) });
          },
          rank: 1,
        });
    });
    res.sort(function (a, b) {
      return a.rank - b.rank;
    });
  }
  v.srResults = res.slice(0, 60);
  v.srNoQ = !sq;
  v.srHas = res.length > 0;
  v.srEmpty = !!sq && res.length === 0;
  v.srCount = t("home.search.results", { count: res.length });
  return v;
}
