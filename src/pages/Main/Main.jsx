import { useEffect, useRef, useState } from "react";
import { listVals, saveVals } from "../../lib/savedList.js";
import { usePageChrome } from "../../hooks/usePageChrome.js";
import { tx } from "../../i18n/index.js";
import LB from "../../data/lightboxes.json";
import SETS from "../../data/swatches.json";
import { useMergeState } from "../../hooks/useMergeState.js";
import { useSavedList } from "../../hooks/useSavedList.js";
import { useScrollLock } from "../../hooks/useScrollLock.js";
import { DW_CATS, DW_FIN, ifoSetPending } from "../../lib/nav.js";
import PROJECTS from "../../data/projects.json";
import CONCEPTS from "../../data/concepts.json";
import { conceptLb, projLb, tEn } from "./lightboxes.js";
import { searchVals } from "./search.js";
import { newsletterVals } from "./newsletter.js";
import "./Main.css";
import SiteHeader from "../../components/layout/SiteHeader.jsx";
import SideMenu from "../../components/layout/SideMenu.jsx";
import Hero from "./sections/Hero.jsx";
import Categories from "./sections/Categories.jsx";
import OnoffTeaser from "./sections/OnoffTeaser.jsx";
import Finishes from "./sections/Finishes.jsx";
import Material from "./sections/Material.jsx";
import Concepts from "./sections/Concepts.jsx";
import Projects from "./sections/Projects.jsx";
import Acoustics from "./sections/Acoustics.jsx";
import Specify from "./sections/Specify.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import ZoomDialog from "../../components/ZoomDialog.jsx";
import Lightbox from "./sections/Lightbox.jsx";
import ListPanel from "../../components/ListPanel.jsx";
import SearchDialog from "./sections/SearchDialog.jsx";
import NewsletterDialog from "./sections/NewsletterDialog.jsx";
import css from "./Main.module.css";

const NAV = { DW_CATS, DW_FIN, ifoSetPending };
const ACCENT = "#645DC5";
const INITIAL = { q: "", sel: null, lb: null, zi: null, allProj: false, allBrands: false, listOpen: false, cxi: 0 };

export default function Main() {
  const [st, setSt] = useMergeState(INITIAL);
  const list = useSavedList();
  // Último estado y menú, para los temporizadores y el teclado (que viven fuera del render).
  const live = useRef({});
  // Manejadores de teclado por capa; se reasignan en cada render con el estado actual.
  const keys = useRef({});
  const [cxEpoch, setCxEpoch] = useState(0);
  const cxReset = () => setCxEpoch((n) => n + 1);

  // Los acabados del menú lateral abren su lightbox (`open` sale de mainVals).
  const openFinish = {};
  const { chrome } = usePageChrome({ nav: NAV, isMain: true, openFinish });
  live.current = { st, menuOn: chrome.menuOn };

  const self = { state: st, setState: setSt };
  const vals = mainVals(self, list, keys.current, cxReset, chrome.t);
  Object.assign(openFinish, vals.open);
  const v = {
    ...vals,
    ...chrome,
    ...searchVals(self, chrome.t, vals.open, chrome.closeMenu, keys.current),
    ...newsletterVals(self, chrome.t, keys.current),
  };

  // Carrusel de conceptos: avanza cada 6.5 s salvo con un lightbox abierto; navegar a mano reinicia el conteo.
  useEffect(() => {
    if (CONCEPTS.length < 2) return undefined;
    const id = setInterval(() => {
      setSt((s) => (s.lb ? {} : { cxi: ((s.cxi || 0) + 1) % CONCEPTS.length }));
    }, 6500);
    return () => clearInterval(id);
  }, [cxEpoch, setSt]);

  // Newsletter: aparece a los 2.5 s si nunca se cerró, y si no hay otra capa abierta.
  useEffect(() => {
    let seen = false;
    try {
      seen = !!window.localStorage.getItem("indigoff_nl");
    } catch (e) {}
    if (seen) return undefined;
    const id = setTimeout(() => {
      const { st: s, menuOn } = live.current;
      if (!s.lb && !menuOn && !s.searchOpen) setSt({ nlOpen: true });
    }, 2500);
    return () => clearTimeout(id);
  }, [setSt]);

  // Un solo listener de teclado; cada capa decide qué hacer con la tecla.
  useEffect(() => {
    const onKey = (e) => {
      const k = keys.current;
      if (k.lightbox) k.lightbox(e);
      if (k.search) k.search(e);
      if (k.newsletter) k.newsletter(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useScrollLock(!!(st.lb || st.listOpen || st.searchOpen || st.nlOpen));
  return template(v);
}

function mainVals(self, saved, keys, cxReset, t) {
  var accent = ACCENT;
  var s = self.state;
  var q = (s.q || "").trim().toUpperCase();
  var list = CONCEPTS.filter(function (c) {
    return !q || c.code.indexOf(q) !== -1;
  });
  var cxi = Math.min(s.cxi || 0, Math.max(list.length - 1, 0));
  var concepts = list.map(function (c, ci) {
    var on = s.sel === c.code;
    return Object.assign({}, c, {
      name: t("home.conceptNames." + c.code),
      selected: on,
      fcls: "cf-img" + (ci === cxi ? " on" : ""),
      tcls: "cf-t" + (ci === cxi ? " on" : ""),
      cur: ci === cxi ? "true" : "false",
      go: function () {
        cxReset();
        self.setState({ cxi: ci });
      },
      alt: t("home.concepts.alt", { code: c.code, name: t("home.conceptNames." + c.code) }),
      imgStyle:
        "display: block; width: 100%; height: calc(460px * var(--mh)); object-fit: cover; outline: " +
        (on ? "2px solid " + accent : "0") +
        "; outline-offset: -2px",
      pick: function () {
        self.setState({ sel: c.code, lb: conceptLb(c) });
      },
    });
  });
  var cc = concepts[cxi] || { gallery: [] };
  var cf = {
    code: cc.code || "",
    name: cc.name || "",
    alt: cc.alt || "",
    pick: cc.pick,
    pos: cxi + 1 + " / " + concepts.length,
    desc: t("home.concepts.tapHint"),
    fill: "animation-name: " + (cxi % 2 ? "cfa" : "cfb"),
    prev: function () {
      cxReset();
      self.setState({ cxi: (cxi - 1 + concepts.length) % concepts.length });
    },
    next: function () {
      cxReset();
      self.setState({ cxi: (cxi + 1) % concepts.length });
    },
  };
  var sel = CONCEPTS.find(function (c) {
    return c.code === s.sel;
  }) || { code: "", name: "" };
  var open = {};
  Object.keys(LB).forEach(function (k) {
    open[k] = function () {
      self.setState({ lb: LB[k], zi: null });
    };
  });
  // Textos de grupos y muestras resueltos al idioma actual (ver tx en src/i18n).
  var rawGroups =
      s.lb && s.lb.swatches
        ? SETS[s.lb.swatches]
        : s.lb && s.lb.gallery
          ? [
              {
                group: "",
                ratio: s.lb.galleryRatio || "4 / 5",
                min: s.lb.galleryMin || "240px",
                names: s.lb.galleryNames !== false,
                items: s.lb.gallery,
              },
            ]
          : [],
    groups = rawGroups.map(function (g) {
      return Object.assign({}, g, {
        group: tx(g.group, t),
        items: g.items.map(function (w) {
          return Object.assign({}, w, { name: tx(w.name, t) });
        }),
      });
    }),
    flat = [];
  groups.forEach(function (g) {
    g.items.forEach(function (w) {
      flat.push(w);
    });
  });
  var zOpen = !!(s.lb && s.zi !== null && flat[s.zi]);
  keys.lightbox = function (e) {
    var k = e.key;
    if (zOpen) {
      if (k === "Escape") {
        self.setState({ zi: null });
      } else if (k === "ArrowLeft") {
        self.setState({ zi: (s.zi - 1 + flat.length) % flat.length });
      } else if (k === "ArrowRight") {
        self.setState({ zi: (s.zi + 1) % flat.length });
      }
      return;
    }
    if (k !== "Escape") return;
    if (s.listOpen) self.setState({ listOpen: false });
    else if (s.lb) self.setState({ lb: null, zi: null });
  };
  var lbItem = s.lb
    ? {
        id: "lb:" + tx(s.lb.label, tEn) + ":" + tx(s.lb.title, tEn),
        name: tx(s.lb.title, t) + (s.lb.concept ? " · " + t("home.conceptNames." + s.lb.title) : ""),
        kind: tx(s.lb.label, t),
        img: (s.lb.gallery && s.lb.gallery[0] && s.lb.gallery[0].img) || s.lb.img || (flat[0] && flat[0].img) || "",
      }
    : null;
  var zItem =
    s.lb && s.zi !== null && flat[s.zi]
      ? { id: "img:" + flat[s.zi].img, name: flat[s.zi].name, kind: s.lb.title, img: flat[s.zi].img }
      : null;
  var zs = saveVals(saved, "zSave", zItem, { add: t("collection.save"), saved: t("collection.saved") });
  var ui = {
    open: !!s.listOpen,
    openList: function () {
      self.setState({ listOpen: true, zi: null });
    },
    closeList: function () {
      self.setState({ listOpen: false });
    },
  };
  return Object.assign(
    listVals(saved, ui),
    saveVals(saved, "lbSave", lbItem, { add: t("list.add"), saved: t("list.saved") }),
    zs,
    {
      open: open,
      lbOn: !!s.lb,
      lb: s.lb
        ? Object.assign({}, s.lb, {
            label: tx(s.lb.label, t),
            title: tx(s.lb.title, t),
            desc: tx(s.lb.desc, t),
            cta: tx(s.lb.cta, t),
          })
        : { img: "", alt: "", label: "", title: "", desc: "", cta: "" },
      projects: (s.allProj ? PROJECTS : PROJECTS.slice(0, 12)).map(function (pj) {
        return {
          name: pj.name,
          cover: pj.imgs[0],
          count: t("home.projects.photos", { count: pj.imgs.length }),
          pick: function () {
            self.setState({ zi: null, lb: projLb(pj) });
          },
        };
      }),
      moreProjects: PROJECTS.length > 12,
      projBtn: t(s.allProj ? "common.viewLess" : "common.viewMore"),
      allBrands: !!s.allBrands,
      brandsCls: s.allBrands ? "" : "tb-collapsed",
      allBrandsStr: s.allBrands ? "true" : "false",
      brandsBtn: t(s.allBrands ? "common.viewLess" : "common.viewMore"),
      toggleBrands: function () {
        self.setState({ allBrands: !s.allBrands });
      },
      toggleProjects: function () {
        self.setState({ allProj: !s.allProj });
      },
      closeLb: function () {
        self.setState({ lb: null, zi: null });
      },
      showSw: groups.length > 0,
      showHero: groups.length === 0,
      showCount: !(s.lb && s.lb.gallery && s.lb.galleryNames === false),
      swCountText: t(
        s.lb && (s.lb.swatches === "colors" || s.lb.swatches === "textures")
          ? "home.lightbox.options"
          : "home.lightbox.images",
        { count: flat.length },
      ),
      lbImg: s.lb ? s.lb.img : "",
      lbAlt: s.lb ? tx(s.lb.alt, t) : "",
      zoomOn: !!(s.lb && s.zi !== null && flat[s.zi]),
      zoom: (s.lb && s.zi !== null && flat[s.zi]) || { name: "", img: "" },
      closeZoom: function () {
        self.setState({ zi: null });
      },
      zoomPrev: function () {
        self.setState({ zi: (s.zi - 1 + flat.length) % flat.length });
      },
      zoomNext: function () {
        self.setState({ zi: (s.zi + 1) % flat.length });
      },
      swGroups: groups.map(function (g) {
        return {
          group: g.group,
          hasLabel: !!g.group,
          min: g.min,
          items: g.items.map(function (w) {
            var idx = flat.indexOf(w);
            return {
              name: w.name,
              img: w.img,
              showName: !!g.names,
              on: "false",
              style: "display: block; width: 100%; aspect-ratio: " + g.ratio + "; height: auto; object-fit: cover",
              pick: function () {
                self.setState({ zi: idx });
              },
            };
          }),
        };
      }),
      accent: accent,
      concepts: concepts,
      cf: cf,
      query: s.q,
      onQuery: function (e) {
        self.setState({ q: e.target.value });
      },
      noResults: concepts.length === 0,
      hasSel: !!s.sel,
      hasCta: !!(s.lb && s.lb.cta),
      sel: sel,
      clear: function () {
        self.setState({ sel: null });
      },
    },
  );
}

function template(v) {
  return (
    <>
      <div className={css.box}>
        <a className="skip" href="#categories">
          {v.t("common.skipToContent")}
        </a>
        <SiteHeader
          v={v}
          labels={{ downloads: v.t("common.downloads"), findRep: v.t("common.findRep"), list: v.t("list.title") }}
          logoHref="#top"
          search
        />
        <Hero v={v} />
        <Categories v={v} />
        <OnoffTeaser v={v} />
        <Finishes v={v} />
        <Material v={v} />
        <Concepts v={v} />
        <Projects v={v} />
        <Acoustics v={v} />
        <Specify v={v} />
        <Contact v={v} />
        <Footer v={v} />
        <ZoomDialog v={v} />
        <Lightbox v={v} />
        <ListPanel v={v} homeHref="#top" />
        <SideMenu v={v} labels={{ downloads: v.t("common.downloads"), findRep: v.t("common.findRep") }} />
        <SearchDialog v={v} />
        <NewsletterDialog v={v} />
      </div>
    </>
  );
}
