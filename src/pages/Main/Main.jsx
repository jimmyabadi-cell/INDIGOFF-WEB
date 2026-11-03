import React, { useEffect, useRef, useState } from "react";
import { S } from "../../lib/dc.js";
import { listVals, saveVals } from "../../lib/savedList.js";
import { usePageChrome } from "../../hooks/usePageChrome.js";
import { makeT, tx } from "../../i18n/index.js";
import LB from "../../data/lightboxes.json";
import { useMergeState } from "../../hooks/useMergeState.js";
import { useSavedList } from "../../hooks/useSavedList.js";
import { useScrollLock } from "../../hooks/useScrollLock.js";
import { DW_CATS, DW_FIN, ifoSetPending } from "../../lib/nav.js";
import "./Main.css";
import SiteHeader from "../../components/layout/SiteHeader.jsx";
import SideMenu from "../../components/layout/SideMenu.jsx";

var SETS = {
  colors: [
    {
      group: "",
      items: [
        { name: "Red", img: "/img/317c9d69c7d662c7f393b6d0362f5157.jpg" },
        { name: "Cherry", img: "/img/cf2c49bc5a22a1ff1e2d467795314dcf.jpg" },
        { name: "Orange", img: "/img/823c76c03d19f2c21d5c32004141582c.jpg" },
        { name: "Citrus", img: "/img/f05065876b114d4b736c890ca37b141d.jpg" },
        { name: "Green", img: "/img/c816cc21e273f8b3025503fd2408db72.jpg" },
        { name: "Forest Green", img: "/img/2fb75fba98f29dc9a4155d3c62350613.jpg" },
        { name: "Moka", img: "/img/beda9b651cf7ebadd03b0b26bb16ce37.jpg" },
        { name: "Ivory", img: "/img/e4a4b8e5d840ab6a5205cea867a0bf09.jpg" },
        { name: "White", img: "/img/fb0ae4a8fcbabdbc1d5cdf62f9aff65e.jpg" },
        { name: "Peach", img: "/img/951f42dadcfb0c4bc8ba9f7af9d046f5.jpg" },
        { name: "Violet", img: "/img/6d3bc9ea7272ded0b78fa9bacac83174.jpg" },
        { name: "Navy Blue", img: "/img/2160e1a55cf69fd44c80f31ad38ccf8e.jpg" },
        { name: "Blue", img: "/img/fd71959565bc2fbbac7555e697bcbeb3.jpg" },
        { name: "Teal", img: "/img/074a4b3ab8eb2cb45e75012bd2da0643.jpg" },
        { name: "Deep Blue", img: "/img/c2cbd6364af7373ef98344fcc7846816.jpg" },
        { name: "Black", img: "/img/819ad2bd36a76b4bdc27011adbe3bc2a.jpg" },
        { name: "Oxford", img: "/img/d886b6e268cd79d76f53f19d59d69ca5.jpg" },
        { name: "Soft Gray", img: "/img/b96490798d8450ebaa23efbea4b3e3f2.jpg" },
      ],
      ratio: "1 / 1",
      min: "150px",
      names: true,
    },
  ],
  textures: [
    {
      group: "@home.finishes.groups.wood",
      items: [
        { name: "Sand Oak", img: "/img/c48702a0cda370a77be613af9045b5dd.jpg" },
        { name: "Sandwood Ash", img: "/img/b0d28dcf4fac08fd70400fa30c83d09a.jpg" },
        { name: "Pale Oak", img: "/img/e8d4b5bebfc0dc50a8d307a309adcd64.jpg" },
        { name: "Maple Oak", img: "/img/2fae660acee1130abe9ed29ff7913cdc.jpg" },
        { name: "Amber Oak", img: "/img/ee28d69ddcbc4ad62afbbfce2872fe48.jpg" },
        { name: "Terra Walnut", img: "/img/fac0c4b8a80905b8c32b545df304cc46.jpg" },
        { name: "Crimson Walnut", img: "/img/bf2c49751d14ab74f963cac7b28c8ed7.jpg" },
        { name: "Terra Walnut Blue", img: "/img/ed7980842562751188635d551750707f.jpg" },
        { name: "Verdant Walnut", img: "/img/e7a19192516aabcaeee243548c51a4d6.jpg" },
        { name: "Frost Ash", img: "/img/4eb3b065833fd8cd93af824d4434fd37.jpg" },
        { name: "Smoke Ash", img: "/img/1d9e300bef54ba3dd580353bc6db3321.jpg" },
        { name: "Charcoal Ash", img: "/img/ce5b730e4db05c386f424d01a54d76fb.jpg" },
      ],
      ratio: "1 / 1",
      min: "150px",
      names: true,
    },
    {
      group: "@home.finishes.groups.stone",
      items: [
        { name: "Alba", img: "/img/a0c3422a39f02ecf00ca10718e710122.jpg" },
        { name: "Auric", img: "/img/e38afe24e1db33d0ef0a653d9c2cc48f.jpg" },
        { name: "Opaline", img: "/img/71d0bbd9e731468300f7bd69a01a56b5.jpg" },
        { name: "Strata", img: "/img/6c2bb19a24d10cc2c0aa86720b003b78.jpg" },
        { name: "Graphite", img: "/img/b3a4589de0ed1dc914923926fd4c3745.jpg" },
        { name: "Arctic", img: "/img/f54bc9adbe586c09ad80ed91f7641fb3.jpg" },
        { name: "Frost", img: "/img/2c9f5be056cf272aedaa4cfa8a957e7e.jpg" },
        { name: "Nocturne", img: "/img/9c2dd7aa169dc8d0c6daf7fc34e41606.jpg" },
        { name: "Obsidian", img: "/img/58861ca40984a75c6853b1b14e4aeada.jpg" },
        { name: "Limestone", img: "/img/bafb29c40ef1dc305d3acac9a620d734.jpg" },
        { name: "Basalt", img: "/img/89ef3925dce24bbf667283d0c8e1451e.jpg" },
        { name: "Alchemy", img: "/img/9312933232009f2457c9da6e431068ce.jpg" },
        { name: "Verdant", img: "/img/7dc30e2502b6fa51810f13a16491bfcf.jpg" },
        { name: "Tide", img: "/img/a72430cec6492e1ca2d402e20625b726.jpg" },
      ],
      ratio: "1 / 1",
      min: "150px",
      names: true,
    },
  ],
  print: [
    {
      group: "",
      ratio: "16 / 9",
      min: "320px",
      names: false,
      items: [
        {
          name: { k: "home.finishes.items.print", vars: { n: "01" } },
          img: "/img/34a02b4660e492a1b630744acb0e04ab.jpg",
        },
        {
          name: { k: "home.finishes.items.print", vars: { n: "02" } },
          img: "/img/bb82485fb6f852b03d1715391e4b1401.jpg",
        },
        {
          name: { k: "home.finishes.items.print", vars: { n: "03" } },
          img: "/img/6e6c42398633643a85ab007830987298.jpg",
        },
        {
          name: { k: "home.finishes.items.print", vars: { n: "04" } },
          img: "/img/6e84086d74d9bf4e4be85c3d856abf21.jpg",
        },
        {
          name: { k: "home.finishes.items.print", vars: { n: "05" } },
          img: "/img/5e7c034e32b536043b96a7d33a737ed8.jpg",
        },
        {
          name: { k: "home.finishes.items.print", vars: { n: "06" } },
          img: "/img/c1d10cefed304c36c550f6c9b2421716.jpg",
        },
      ],
    },
  ],
  engraving: [
    {
      group: "",
      ratio: "4 / 5",
      min: "200px",
      names: false,
      items: [
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "01" } },
          img: "/img/331ed34c72c6eb78c7b7cff146ae6652.jpg",
        },
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "02" } },
          img: "/img/71587e528f45cffca9733efd6afa42ad.jpg",
        },
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "03" } },
          img: "/img/28c8304ebf72cec9b38581e6d9e6f0fa.jpg",
        },
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "04" } },
          img: "/img/7f39bf8b43b670473b068b12cdaff1b9.jpg",
        },
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "05" } },
          img: "/img/df3d6b5a1f252d58ea570a6864499afc.jpg",
        },
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "06" } },
          img: "/img/67026b7ad40180160a59c8a32190263e.jpg",
        },
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "07" } },
          img: "/img/e97be6d024099f3e2f2a66554ae26c37.jpg",
        },
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "08" } },
          img: "/img/1b1600e6aaa234fae2946864cdc01f2a.jpg",
        },
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "09" } },
          img: "/img/0cfbe1f191404e917cff2d1b38f87f1f.jpg",
        },
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "10" } },
          img: "/img/b70418a13b8c7b6d6997e9ad54eb8ab8.jpg",
        },
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "11" } },
          img: "/img/f085da6c2310693e870cc1c3896f0c44.jpg",
        },
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "12" } },
          img: "/img/16200b0ed525795910ec44a20f953009.jpg",
        },
        {
          name: { k: "home.finishes.items.engraving", vars: { n: "13" } },
          img: "/img/24254d9b73f7eb1831717b58eb19d0a7.jpg",
        },
      ],
    },
  ],
  embossed: [
    {
      group: { k: "home.finishes.modelGroup", vars: { name: "Prism", n: 1 } },
      ratio: "1 / 1",
      min: "220px",
      names: true,
      items: [
        {
          name: { k: "home.finishes.items.texture", vars: { name: "Prism" } },
          img: "/img/6c9048232a88d183e8acfba79694fb30.jpg",
        },
        {
          name: { k: "home.finishes.items.panel", vars: { name: "Prism" } },
          img: "/img/5e4b09ceafa340fcbff87a8870112332.jpg",
        },
      ],
    },
    {
      group: { k: "home.finishes.modelGroup", vars: { name: "Wave", n: 2 } },
      ratio: "1 / 1",
      min: "220px",
      names: true,
      items: [
        {
          name: { k: "home.finishes.items.texture", vars: { name: "Wave" } },
          img: "/img/9ac0da76cb16110fed512f9c8a36ccc3.jpg",
        },
        {
          name: { k: "home.finishes.items.panel", vars: { name: "Wave" } },
          img: "/img/4ffdfc25a7d7e0bb04aaa1bfc7a6f94b.jpg",
        },
      ],
    },
    {
      group: { k: "home.finishes.modelGroup", vars: { name: "Diamond", n: 3 } },
      ratio: "1 / 1",
      min: "220px",
      names: true,
      items: [
        {
          name: { k: "home.finishes.items.texture", vars: { name: "Diamond" } },
          img: "/img/19fad91390ac57747dd3a4392536429e.jpg",
        },
        {
          name: { k: "home.finishes.items.panel", vars: { name: "Diamond" } },
          img: "/img/ff1f4e5d7bffa0d558953503809cf19d.jpg",
        },
        {
          name: { k: "home.finishes.items.inSpace", vars: { name: "Diamond" } },
          img: "/img/442961bbeccb92f0d9f97cb1d0abc9e4.jpg",
        },
      ],
    },
  ],
};
import PROJECTS from "../../data/projects.json";
var PROJ_MM = {
  name: "Multimedios",
  desc: "Acoustic solution designed and installed by Indigoff.",
  imgs: [
    "/img/88df68ee3d1a2f11cdef1860ba428fb2.jpg",
    "/img/7cd697164bbedd062f7c562568ce72e4.jpg",
    "/img/5a80a15ff662f423da2a5432e30c8bce.jpg",
    "/img/c9d045e84ea8afeb66ef62a34e9a4864.jpg",
    "/img/9d0cc6c7d4b10c1f8eecc610f9c65d3f.jpg",
  ],
};
const PROJECT_DESC = {
  "Acoustic solution designed and installed by Indigoff.": "@home.lightbox.desc.projectInstalled",
  "Acoustic solution designed, manufactured and installed by Indigoff.": "@home.lightbox.desc.projectManufactured",
};
function projLb(pj) {
  return {
    label: "@home.lightbox.label.project",
    title: pj.name,
    desc: PROJECT_DESC[pj.desc] || pj.desc,
    img: pj.imgs[0],
    alt: pj.name,
    cta: "@home.lightbox.cta.likeThis",
    galleryRatio: "4 / 3",
    galleryMin: "320px",
    galleryNames: false,
    gallery: pj.imgs.map(function (u, i) {
      return { name: pj.name + " — " + (i + 1), img: u };
    }),
  };
}
import CONCEPTS from "../../data/concepts.json";

/** Lightbox de un concepto (desde el carrusel o la búsqueda). */
function conceptLb(c) {
  return {
    concept: true,
    gallery: c.gallery || null,
    img: c.img,
    alt: { k: "home.concepts.alt", vars: { code: c.code, name: "@home.conceptNames." + c.code } },
    label: "@home.lightbox.label.concept",
    title: c.code,
    desc: { k: "home.lightbox.conceptDesc", vars: { name: "@home.conceptNames." + c.code } },
    cta: "",
  };
}

// Los ids de "Mi lista" se arman con el texto en inglés: no cambian al cambiar de idioma.
const tEn = makeT("en");

import MM_FIN_IMG from "../../data/fin-img.json";
import SR_INDEX from "../../data/sr-index.json";

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
      openMM: function () {
        self.setState({ zi: null, lb: projLb(PROJ_MM) });
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

/** Búsqueda global (`/` o ⌘K): productos, acabados, conceptos y proyectos. */
function searchVals(self, t, open, closeMenu, keys) {
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

/** Popup del newsletter (se muestra una vez; ver el efecto en Main). */
function newsletterVals(self, t, keys) {
  var v = {};
  var st = self.state;
  keys.newsletter = function (e) {
    if (e.key === "Escape" && st.nlOpen) {
      try {
        window.localStorage.setItem("indigoff_nl", "closed");
      } catch (x) {}
      self.setState({ nlOpen: false });
    }
  };
  var nlMark = function (val) {
    try {
      window.localStorage.setItem("indigoff_nl", val);
    } catch (e) {}
  };
  v.nlOn = !!st.nlOpen;
  v.nlDone = !!st.nlDone;
  v.nlForm = !st.nlDone;
  v.nlEmail = st.nlEmail || "";
  v.nlErr = !!st.nlErr;
  v.nlInput = function (e) {
    self.setState({ nlEmail: e.target.value, nlErr: false });
  };
  v.nlClose = function () {
    if (!st.nlDone) nlMark("closed");
    self.setState({ nlOpen: false });
  };
  v.nlSubmit = function () {
    var em = (st.nlEmail || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) {
      self.setState({ nlErr: true });
      return;
    }
    nlMark("subscribed");
    self.setState({ nlDone: true, nlErr: false });
  };
  v.nlTitle = t("home.newsletter.title");
  v.nlText = t("home.newsletter.text");
  v.nlEmailLbl = t("home.newsletter.email");
  v.nlCta = t("home.newsletter.subscribe");
  v.nlNo = t("home.newsletter.noThanks");
  v.nlCloseLbl = t("common.menu.close");
  v.nlErrText = t("home.newsletter.invalid");
  v.nlThanks = t("home.newsletter.thanks");
  v.nlThanksText = t("home.newsletter.thanksText");
  v.nlContinue = t("home.newsletter.continue");
  return v;
}

function template(v) {
  return (
    <>
      <div
        style={S(
          "font-family: 'IBM Plex Sans', system-ui, sans-serif; font-weight: 300; color: #111111; background: #FFFFFF; font-size: 15px; line-height: 1.7",
        )}
      >
        <a className="skip" href="#categories">
          {v.t("common.skipToContent")}
        </a>
        <SiteHeader
          v={v}
          labels={{ downloads: v.t("common.downloads"), findRep: v.t("common.findRep"), list: v.t("list.title") }}
          logoHref="#top"
          search
        />
        <section id="top" style={S("position: relative; height: var(--hero-h); overflow: hidden; background: #1A1917")}>
          <div className="hs" aria-hidden="false">
            <img
              className="hs-i hs-1"
              src="/img/f8c0fd4c23fb59d6887e5fe8c294a39b.jpg"
              alt="Indigoff space with suspended baffles, arched walls and sculptural forms"
            />
            <img
              className="hs-i hs-2"
              src="/img/95478a5658304ca607006b326c317835.jpg"
              alt="Rainbow acoustic arches and ceiling ribbons over an open office"
              loading="lazy"
              decoding="async"
            />
            <img
              className="hs-i hs-3"
              src="/img/262de0d004e1e631ef993783a62dc338.jpg"
              alt="Colorful acoustic podcast studio with wall shapes and ceiling clouds"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div
            className="scrim"
            aria-hidden="true"
            style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%")}
          ></div>
          <div className="hs-copy">
            <h1 className="hs-h">
              {v.t("home.hero.line1")}
              <br />
              {v.t("home.hero.line2")}
              <br />
              {v.t("home.hero.line3")}
            </h1>
            <p className="hs-p">{v.t("home.hero.text")}</p>
            <div className="cta-row cta-dk">
              <a href="/find-a-rep" className="cta-p">
                {v.t("home.hero.quote")}
              </a>
              <a href="#categories" className="cta-o">
                {v.t("home.hero.explore")}
              </a>
            </div>
          </div>
        </section>
        <section id="categories" style={S("padding: calc(120px * var(--vs)) 0 0")}>
          <div className="sec-hd" style={S("text-align: center; margin-bottom: 56px; padding: 0 24px")}>
            <h2
              style={S(
                "margin: 0; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
              )}
            >
              {v.t("home.categories.title")}
            </h2>
          </div>
          <div className="cat-row" style={S("max-width: 1440px; margin: 0 auto; padding: 0 var(--gutter)")}>
            <a href="/ceilings" className="cat-panel" style={S("background: #EEEBE6")}>
              <img
                src="/img/a4f6a6e61e9f23429824023cd67d2a5f.jpg"
                alt="Ceilings: Stratus mustard, gray and white baffles over a lounge"
                style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
              />
              <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
              <span className="cat-label">
                <span className="cat-name">{v.t("catalog.categories.ceilings")}</span>
                <span className="cat-sub">{v.t("home.categories.ceilingsSubs")}</span>
                <span className="cat-cta" style={S("display: inline-flex; align-items: center; gap: 8px")}>
                  {v.t("home.categories.explore")}
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={S("display: block; flex: none")}
                  >
                    <path d="M4 12h15M13 6l6 6-6 6"></path>
                  </svg>
                </span>
              </span>
            </a>
            <a href="/walls" className="cat-panel" style={S("background: #EEEBE6")}>
              <img
                src="/img/50cb19dd09bf67dde7b33787030edb02.jpg"
                alt="Walls: Red faceted acoustic wall"
                style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
              />
              <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
              <span className="cat-label">
                <span className="cat-name">{v.t("catalog.categories.walls")}</span>
                <span className="cat-sub">{v.t("home.categories.wallsSubs")}</span>
                <span className="cat-cta" style={S("display: inline-flex; align-items: center; gap: 8px")}>
                  {v.t("home.categories.explore")}
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={S("display: block; flex: none")}
                  >
                    <path d="M4 12h15M13 6l6 6-6 6"></path>
                  </svg>
                </span>
              </span>
            </a>
            <a href="/lights" className="cat-panel" style={S("background: #EEEBE6")}>
              <img
                src="/img/16744e6011fb31fe88309cf84f8242d3.jpg"
                alt="Lights: Acoustic pendant lamps over a dining room"
                style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
              />
              <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
              <span className="cat-label">
                <span className="cat-name">{v.t("catalog.categories.lights")}</span>
                <span className="cat-sub">{v.t("home.categories.lightsSubs")}</span>
                <span className="cat-cta" style={S("display: inline-flex; align-items: center; gap: 8px")}>
                  {v.t("home.categories.explore")}
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={S("display: block; flex: none")}
                  >
                    <path d="M4 12h15M13 6l6 6-6 6"></path>
                  </svg>
                </span>
              </span>
            </a>
            <a href="/dividers" className="cat-panel" style={S("background: #EEEBE6")}>
              <img
                src="/img/e154f12501cbca329921ce90014beb4c.jpg"
                alt="Dividers: Acoustic desk dividers in an open office"
                style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
              />
              <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
              <span className="cat-label">
                <span className="cat-name">{v.t("catalog.categories.dividers")}</span>
                <span className="cat-sub">{v.t("home.categories.dividersSubs")}</span>
                <span className="cat-cta" style={S("display: inline-flex; align-items: center; gap: 8px")}>
                  {v.t("home.categories.explore")}
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={S("display: block; flex: none")}
                  >
                    <path d="M4 12h15M13 6l6 6-6 6"></path>
                  </svg>
                </span>
              </span>
            </a>
            <a href="/podcaster" className="cat-panel" style={S("background: #EEEBE6")}>
              <img
                src="/img/262de0d004e1e631ef993783a62dc338.jpg"
                alt="Podcaster: podcast studio with sculptural acoustic panels"
                style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
              />
              <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
              <span className="cat-label">
                <span className="cat-name">{"Podcaster"}</span>
                <span className="cat-sub">{v.t("home.categories.podcasterSubs")}</span>
                <span className="cat-cta" style={S("display: inline-flex; align-items: center; gap: 8px")}>
                  {v.t("home.categories.explore")}
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={S("display: block; flex: none")}
                  >
                    <path d="M4 12h15M13 6l6 6-6 6"></path>
                  </svg>
                </span>
              </span>
            </a>
          </div>
        </section>
        <section id="onoff" style={S("padding: calc(160px * var(--vs)) 0 0")}>
          <div style={S("display: flex; flex-wrap: wrap-reverse; align-items: stretch")}>
            <div style={S("flex: 1 1 520px; min-width: 0")}>
              <img
                src="/img/dc6b194e8cfae848cc1e1424d739f8cb.jpg"
                alt="Folded acoustic light wave over a conference table"
                loading="lazy"
                decoding="async"
                style={S("display: block; width: 100%; height: calc(760px * var(--mh)); object-fit: cover")}
              />
            </div>
            <div
              style={S(
                "flex: 1 1 420px; min-width: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: calc(80px * var(--vs)) min(48px, var(--gutter)); box-sizing: border-box; background: #F4F1EB; color: #111111",
              )}
            >
              <span
                style={S(
                  "margin: 0 0 20px; font-family: Urbanist, sans-serif; font-weight: 500; font-size: 15px; letter-spacing: 0.04em",
                )}
              >
                {v.t("home.onoff.eyebrow")}
              </span>
              <h2
                style={S(
                  "margin: 0 0 20px; max-width: 480px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
                )}
              >
                {v.t("home.onoff.title")}
              </h2>
              <p style={S("margin: 0 0 32px; max-width: 420px; color: #5E5A53")}>{v.t("home.onoff.text")}</p>
              <div style={S("display: flex; flex-wrap: wrap; justify-content: center; gap: 12px 28px")}>
                <a
                  href="/onoff-studio"
                  style={S(
                    "display: inline-flex; align-items: center; min-height: 44px; color: #111111; border-bottom: 1px solid #111111; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
                  )}
                >
                  {v.t("home.onoff.discover")}
                </a>
                <a
                  href="/lights"
                  style={S(
                    "display: inline-flex; align-items: center; min-height: 44px; color: #645DC5; border-bottom: 1px solid #645DC5; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
                  )}
                >
                  {v.t("home.onoff.explore")}
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="finishes" style={S("max-width: 1440px; margin: 0 auto; padding: calc(160px * var(--vs)) 0 0")}>
          <div className="sec-hd" style={S("text-align: center; margin-bottom: 56px; padding: 0 24px")}>
            <h2
              style={S(
                "margin: 0; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
              )}
            >
              {v.t("home.finishes.title")}
            </h2>
          </div>
          <div className="fin-grid" style={S("padding: 0 var(--gutter)")}>
            <button
              type="button"
              className="fin-tile fin-a"
              onClick={v.open.f_colors}
              aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.colors") })}
              style={S(
                "position: relative; overflow: hidden; padding: 0; border: 0; background: #EEEBE6; cursor: pointer; font-family: inherit; color: #FFFFFF; text-align: left",
              )}
            >
              <img
                src="/img/33bf52d337f0b5866c401b1f22274d1e.jpg"
                alt="Colors finish samples"
                style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
              />
              <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
              <span
                style={S(
                  "position: absolute; left: 32px; right: 20px; bottom: 28px; display: flex; flex-direction: column; gap: 4px",
                )}
              >
                <span
                  style={S(
                    "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 44px; line-height: 1.05; letter-spacing: -0.03em",
                  )}
                >
                  {v.t("home.finishes.colors")}
                </span>
                <span
                  style={S(
                    "font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.85",
                  )}
                >
                  {v.t("home.finishes.colorsSub")}
                </span>
              </span>
            </button>
            <button
              type="button"
              className="fin-tile fin-b"
              onClick={v.open.f_textures}
              aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.textures") })}
              style={S(
                "position: relative; overflow: hidden; padding: 0; border: 0; background: #EEEBE6; cursor: pointer; font-family: inherit; color: #FFFFFF; text-align: left",
              )}
            >
              <img
                src="/img/59823a479ed6e68e4e9d0a9c53e86ad2.jpg"
                alt="Textures finish samples"
                style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
              />
              <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
              <span
                style={S(
                  "position: absolute; left: 20px; right: 20px; bottom: 18px; display: flex; flex-direction: column; gap: 4px",
                )}
              >
                <span
                  style={S(
                    "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 24px; line-height: 1.05; letter-spacing: -0.03em",
                  )}
                >
                  {v.t("home.finishes.textures")}
                </span>
                <span
                  style={S(
                    "font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.85",
                  )}
                >
                  {v.t("home.finishes.texturesSub")}
                </span>
              </span>
            </button>
            <button
              type="button"
              className="fin-tile fin-c"
              onClick={v.open.f_print}
              aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.print") })}
              style={S(
                "position: relative; overflow: hidden; padding: 0; border: 0; background: #EEEBE6; cursor: pointer; font-family: inherit; color: #FFFFFF; text-align: left",
              )}
            >
              <img
                src="/img/01fd0ca4887bbb6af9330fa52b1fb80d.jpg"
                alt="Print finish samples"
                style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
              />
              <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
              <span
                style={S(
                  "position: absolute; left: 20px; right: 20px; bottom: 18px; display: flex; flex-direction: column; gap: 4px",
                )}
              >
                <span
                  style={S(
                    "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 24px; line-height: 1.05; letter-spacing: -0.03em",
                  )}
                >
                  {v.t("home.finishes.print")}
                </span>
                <span
                  style={S(
                    "font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.85",
                  )}
                >
                  {v.t("home.finishes.printSub")}
                </span>
              </span>
            </button>
            <button
              type="button"
              className="fin-tile fin-d"
              onClick={v.open.f_engraving}
              aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.engraving") })}
              style={S(
                "position: relative; overflow: hidden; padding: 0; border: 0; background: #EEEBE6; cursor: pointer; font-family: inherit; color: #FFFFFF; text-align: left",
              )}
            >
              <img
                src="/img/1cd84dadeac695b570a54542496638c0.jpg"
                alt="Engraving finish samples"
                style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
              />
              <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
              <span
                style={S(
                  "position: absolute; left: 20px; right: 20px; bottom: 18px; display: flex; flex-direction: column; gap: 4px",
                )}
              >
                <span
                  style={S(
                    "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 24px; line-height: 1.05; letter-spacing: -0.03em",
                  )}
                >
                  {v.t("home.finishes.engraving")}
                </span>
                <span
                  style={S(
                    "font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.85",
                  )}
                >
                  {v.t("home.finishes.engravingSub")}
                </span>
              </span>
            </button>
            <button
              type="button"
              className="fin-tile fin-e"
              onClick={v.open.f_embossed}
              aria-label={v.t("collection.viewItem", { name: v.t("home.finishes.embossed") })}
              style={S(
                "position: relative; overflow: hidden; padding: 0; border: 0; background: #EEEBE6; cursor: pointer; font-family: inherit; color: #FFFFFF; text-align: left",
              )}
            >
              <img
                src="/img/83997bc339591c8c1d305c3b756d6962.jpg"
                alt="Embossed finish samples"
                style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
              />
              <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
              <span
                style={S(
                  "position: absolute; left: 20px; right: 20px; bottom: 18px; display: flex; flex-direction: column; gap: 4px",
                )}
              >
                <span
                  style={S(
                    "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 24px; line-height: 1.05; letter-spacing: -0.03em",
                  )}
                >
                  {v.t("home.finishes.embossed")}
                </span>
                <span
                  style={S(
                    "font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; opacity: 0.85",
                  )}
                >
                  {v.t("home.finishes.embossedSub")}
                </span>
              </span>
            </button>
          </div>
          <div className="cta-row">
            <a href="/find-a-rep" className="cta-p">
              {v.t("common.requestSamples")}
            </a>
            <a href="/downloads" className="cta-o">
              {v.t("common.downloads")}
            </a>
          </div>
        </section>
        <section id="new" style={S("padding: calc(160px * var(--vs)) 0 0")}>
          <div style={S("display: flex; flex-wrap: wrap; align-items: stretch")}>
            <button
              type="button"
              onClick={v.open.e_material}
              aria-label={v.t("common.enlargeImage")}
              style={S(
                "flex: 1 1 520px; min-width: 0; display: block; padding: 0; border: 0; background: transparent; cursor: pointer",
              )}
            >
              <img
                src="/img/b45fdd3f48ffafe2e4c62af327a77568.jpg"
                alt="Reception desk in front of a terracotta acoustic shelving wall"
                style={S("display: block; width: 100%; height: calc(820px * var(--mh)); object-fit: cover")}
              />
            </button>
            <div
              style={S(
                "flex: 1 1 420px; min-width: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: calc(80px * var(--vs)) min(48px, var(--gutter)); box-sizing: border-box; background: #F4F1EB",
              )}
            >
              <h2
                style={S(
                  "margin: 0 0 20px; max-width: 460px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
                )}
              >
                {v.t("home.material.title")}
              </h2>
              <p style={S("margin: 0 0 28px; max-width: 380px; color: #5E5A53")}>{v.t("home.material.text")}</p>
              <a href="/walls" className="cta-o">
                {v.t("home.material.cta")}
              </a>
            </div>
          </div>
        </section>
        <section
          id="concepts"
          style={S("max-width: 1440px; margin: 0 auto; padding: calc(180px * var(--vs)) var(--gutter) 0")}
        >
          <div className="sec-hd" style={S("text-align: center; margin-bottom: 0")}>
            <h2
              style={S(
                "margin: 0; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
              )}
            >
              {v.t("home.concepts.title")}
            </h2>
          </div>
          <p style={S("margin: 0 auto 56px; max-width: 480px; text-align: center; color: #5E5A53")}>
            {v.t("home.concepts.text")}
          </p>
          <div className="cf">
            <p className="cf-cap">
              <span className="cf-code">{v.cf.code}</span>
              <span className="cf-nm">{v.cf.name}</span>
            </p>
            <div className="cf-main">
              <button type="button" className="cf-stage" onClick={v.cf.pick} aria-label={v.cf.alt}>
                {(v.concepts || []).map((c, c__i) => (
                  <React.Fragment key={c__i}>
                    <img className={c.fcls} src={c.img} alt="" loading="lazy" decoding="async" />
                  </React.Fragment>
                ))}
              </button>
              <button
                type="button"
                className="cf-nav cf-prev"
                onClick={v.cf.prev}
                aria-label={v.t("home.concepts.prev")}
              >
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="M15 5l-7 7 7 7"></path>
                </svg>
              </button>
              <button
                type="button"
                className="cf-nav cf-next"
                onClick={v.cf.next}
                aria-label={v.t("home.concepts.next")}
              >
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="cf-th" role="list">
            {(v.concepts || []).map((c, c__i) => (
              <React.Fragment key={c__i}>
                <button
                  type="button"
                  role="listitem"
                  className={c.tcls}
                  onClick={c.go}
                  aria-label={c.alt}
                  aria-current={c.cur}
                >
                  <img src={c.img} alt="" loading="lazy" decoding="async" />
                  <span className="cf-tc">{c.code}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
          <div className="cta-row">
            <a href="/find-a-rep" className="cta-p">
              {v.t("home.concepts.adapt")}
            </a>
            <a href="/find-a-rep" className="cta-o">
              {v.t("home.specify.appointment")}
            </a>
          </div>
        </section>
        <section id="projects" style={S("padding: calc(180px * var(--vs)) 0 0")}>
          <div className="sec-hd" style={S("text-align: center; margin-bottom: 56px; padding: 0 24px")}>
            <h2
              style={S(
                "margin: 0; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
              )}
            >
              {v.t("home.projects.title")}
            </h2>
          </div>
          <button
            type="button"
            onClick={v.openMM}
            aria-label={v.t("collection.viewItem", { name: "Multimedios" })}
            style={S(
              "display: block; width: 100%; position: relative; height: calc(820px * var(--mh)); overflow: hidden; background: #1A1917; padding: 0; border: 0; cursor: pointer",
            )}
          >
            <img
              src="/img/88df68ee3d1a2f11cdef1860ba428fb2.jpg"
              alt="Multimedios: newsroom under a sculpted linear acoustic ceiling"
              style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
            />
            <span
              className="scrim"
              aria-hidden="true"
              style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%")}
            ></span>
            <span
              style={S(
                "position: absolute; left: 0; right: 0; bottom: 48px; text-align: center; color: #FFFFFF; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase",
              )}
            >
              {"Multimedios"}
            </span>
          </button>
          <div className="proj-grid" style={S("max-width: 1440px; margin: 0 auto; padding: 8px var(--gutter) 0")}>
            {(v.projects || []).map((pj, pj__i) => (
              <React.Fragment key={pj__i}>
                <button
                  type="button"
                  onClick={pj.pick}
                  aria-label={`View ${pj.name}`}
                  style={S(
                    "display: flex; flex-direction: column; gap: 14px; padding: 0; border: 0; background: transparent; text-align: left; cursor: pointer; font-family: inherit; color: #111111",
                  )}
                >
                  <span
                    className="proj-img"
                    style={S("display: block; width: 100%; aspect-ratio: 4 / 3; overflow: hidden; background: #EEEBE6")}
                  >
                    <img
                      src={pj.cover}
                      alt={`${pj.name} project by Indigoff`}
                      loading="lazy"
                      decoding="async"
                      style={S("display: block; width: 100%; height: 100%; object-fit: cover")}
                    />
                  </span>
                  <span style={S("display: flex; justify-content: space-between; align-items: baseline; gap: 12px")}>
                    <span
                      style={S(
                        "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 22px; letter-spacing: -0.02em",
                      )}
                    >
                      {pj.name}
                    </span>
                  </span>
                </button>
              </React.Fragment>
            ))}
          </div>
          {v.moreProjects ? (
            <>
              <div style={S("text-align: center; padding: 64px 24px 0")}>
                <button
                  type="button"
                  onClick={v.toggleProjects}
                  style={S(
                    "min-height: 48px; padding: 0 36px; border: 1px solid #111111; background: transparent; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #111111",
                  )}
                >
                  {v.projBtn}
                </button>
              </div>
            </>
          ) : null}
          <div
            style={S(
              "max-width: 1100px; margin: 0 auto; padding: calc(120px * var(--vs)) var(--gutter) 0; text-align: center",
            )}
          >
            <h2
              style={S(
                "margin: 0 0 28px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
              )}
            >
              {v.t("home.projects.trustedBy")}
            </h2>
            <ul className={`tb-grid ${v.brandsCls}`} aria-label={v.t("home.projects.clients")}>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/b7050ce6ee94df8c8b1b79062a578af3.png"
                  alt="Google"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 28px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/b437736fe3b6f5f77f18bf7b9acebd29.png"
                  alt="Amazon"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/1277d27cf6f658c8252cba3aba7e0095.png"
                  alt="Netflix"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/3c2b439831d40822c6d102b6b5815335.png"
                  alt="Visa"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 24px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/864bdd5bc338357720fda18982b41028.png"
                  alt="American Express"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 40px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/d0dd52a7e4e5cbae1ae20b2ee631a203.png"
                  alt="Adidas"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 34px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/98f5961207afa2d5222f5426a6a5278d.png"
                  alt="Uber"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/4897e73b28bea6db40e2feab5fa1a64c.png"
                  alt="TikTok"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 28px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/bd72ccbd1ca6ada48148e1bd6ffe0cfd.png"
                  alt="Spotify"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 30px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/797495370337985a01ebe8a1efcf3050.png"
                  alt="Ford"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 30px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/601003c680dd029ea372acd49e7568a9.png"
                  alt="Nissan"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 36px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/c9716ea1e70593b3e937249e97dc8272.png"
                  alt="GM"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 36px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/59c10d283222783dad624bd643121eac.png"
                  alt="SAP"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 30px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/5757c67f28c418c228bf64b329c86588.png"
                  alt="Volvo"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 20px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/6ab4e374ab8e0e442b9a029a2f90b7c3.png"
                  alt="Bank of America"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 22px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/80eb913c3303ce3547a04138cca0806e.png"
                  alt="Cisco"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 32px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/52a9b19d82515bfebe60188d9b854a60.png"
                  alt="Pokémon"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 34px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/9e01af5a931bf369942e95f4a108748c.png"
                  alt="Pinterest"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 32px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/ad4c75f9c9866768f31eec4df17b27aa.png"
                  alt="Nubank"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/a6c687b514cd4d285a97e291b9cde6d3.png"
                  alt="Nivea"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/d07d10df037d0d04078d4c2fd64cf01d.png"
                  alt="BBVA"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/fcb384fc2bfe509120d197944cea3c40.png"
                  alt="SoftBank"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/6922e6fffab6380d13ba7051eeb8b153.png"
                  alt="Diageo"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/68c5a79540422bef3a055138a7a07fe1.png"
                  alt="Maersk"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/22eb894878a944d496dfa6957aa44b7c.png"
                  alt="Avnet"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 34px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/17cd16a04d70ad040ca80cf7576c0cf8.png"
                  alt="BorgWarner"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/c5dc92650cc2b4f01abb2473848b7f80.png"
                  alt="Pfizer"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 34px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/bb18f73aaaed6fb62e00d52166a3a940.png"
                  alt="DuPont"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 34px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/19f2cea64a7f8cb94e42e4c5396d3f0d.png"
                  alt="Kellogg’s"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 34px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/152942735d250be1dabc491d5dedea3d.png"
                  alt="Bloomberg"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/5493eead1f0a26b9a55eac182ff85ec7.png"
                  alt="BYD"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 34px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/8398f7534d130603fb090a1a8c2d0bf5.png"
                  alt="Workday"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 34px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/64271e60d9230433f6580e16bbb6e093.png"
                  alt="Henkel"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 34px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/6d07d3a549e7e77001cc6cb6ac044fef.png"
                  alt="Gensler"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/848a14aeed93dbc9b5c730fd65ff9fc6.png"
                  alt="Steelcase"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/980fe4f62855e966f68ba68fc88dd341.png"
                  alt="Kimberly-Clark"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/b0d381e216ad77faa02313ca5b1155f7.png"
                  alt="Scotiabank"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/cb15ad32f5bc8816097b0a8c58ee1330.png"
                  alt="Capital One"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 34px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/144ae169a822c9007bc9fe2f75c1d28f.png"
                  alt="BNY"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 34px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/294532a7d8033a88a84f3c19181e4784.png"
                  alt="Colgate"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 26px")}
                />
              </li>
              <li className="tb-cell">
                <img
                  className="tb-logo"
                  src="/img/15c7788becd692a15d24666edb6c19cc.png"
                  alt="Mercado Libre"
                  loading="lazy"
                  decoding="async"
                  style={S("max-height: 34px")}
                />
              </li>
            </ul>
            <div style={S("text-align: center; padding: 48px 24px 0")}>
              <button
                type="button"
                onClick={v.toggleBrands}
                aria-expanded={v.allBrandsStr}
                style={S(
                  "min-height: 48px; padding: 0 36px; border: 1px solid #111111; background: transparent; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #111111",
                )}
              >
                {v.brandsBtn}
              </button>
            </div>
          </div>
          <div className="cta-row">
            <a href="/find-a-rep" className="cta-p">
              {v.t("home.cta.start")}
            </a>
            <a href="/find-a-rep" className="cta-o">
              {v.t("common.talkToRep")}
            </a>
          </div>
        </section>
        <section id="acoustics" style={S("padding: calc(160px * var(--vs)) 0 0")}>
          <div style={S("display: flex; flex-wrap: wrap; align-items: stretch")}>
            <div
              style={S(
                "flex: 1 1 420px; min-width: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: calc(80px * var(--vs)) min(48px, var(--gutter)); box-sizing: border-box; background: #1E125C; color: #FFFFFF",
              )}
            >
              <h2
                style={S(
                  "margin: 0 0 20px; max-width: 480px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
                )}
              >
                {v.t("home.acoustics.title")}
              </h2>
              <p style={S("margin: 0 0 28px; max-width: 400px; color: #D8D2C7")}>{v.t("home.acoustics.text")}</p>
              <a
                href="#contact"
                style={S(
                  "display: inline-flex; align-items: center; min-height: 44px; color: #FFFFFF; border-bottom: 1px solid #FFFFFF; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
                )}
              >
                {v.t("home.acoustics.cta")}
              </a>
            </div>
            <button
              type="button"
              onClick={v.open.e_study}
              aria-label={v.t("common.enlargeImage")}
              style={S(
                "flex: 1 1 520px; min-width: 0; display: block; padding: 0; border: 0; background: transparent; cursor: pointer",
              )}
            >
              <img
                src="/img/73e73590532bd1289f3c5d2c7884612e.jpg"
                alt="Lounge with golden suspended baffles over a dark acoustic wall"
                style={S("display: block; width: 100%; height: calc(760px * var(--mh)); object-fit: cover")}
              />
            </button>
          </div>
        </section>
        <section
          id="specify"
          style={S("max-width: 1440px; margin: 0 auto; padding: calc(160px * var(--vs)) var(--gutter) 0")}
        >
          <h2
            style={S(
              "margin: 0 0 48px; text-align: center; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
            )}
          >
            {v.t("home.specify.eyebrow")}
          </h2>
          <div
            className="spec-row"
            style={S("display: flex; flex-wrap: wrap; border-top: 1px solid #ECE9E4; border-bottom: 1px solid #ECE9E4")}
          >
            <a
              href="#appointment"
              style={S(
                "flex: 1 1 260px; padding: 48px min(32px, var(--gutter)); text-align: center; display: flex; flex-direction: column; gap: 10px",
              )}
            >
              <span style={S("font-family: Urbanist, sans-serif; font-weight: 300; font-size: 22px")}>
                {v.t("home.specify.appointment")}
              </span>
              <span style={S("font-size: 14px; color: #5E5A53")}>{v.t("home.specify.appointmentText")}</span>
            </a>
            <a
              href="#acoustics"
              style={S(
                "flex: 1 1 260px; padding: 48px min(32px, var(--gutter)); text-align: center; display: flex; flex-direction: column; gap: 10px; border-left: 1px solid #ECE9E4",
              )}
            >
              <span style={S("font-family: Urbanist, sans-serif; font-weight: 300; font-size: 22px")}>
                {v.t("home.specify.study")}
              </span>
              <span style={S("font-size: 14px; color: #5E5A53")}>{v.t("home.specify.studyText")}</span>
            </a>
            <a
              href="#samples"
              style={S(
                "flex: 1 1 260px; padding: 48px min(32px, var(--gutter)); text-align: center; display: flex; flex-direction: column; gap: 10px; border-left: 1px solid #ECE9E4",
              )}
            >
              <span style={S("font-family: Urbanist, sans-serif; font-weight: 300; font-size: 22px")}>
                {v.t("home.specify.samples")}
              </span>
              <span style={S("font-size: 14px; color: #5E5A53")}>{v.t("home.specify.samplesText")}</span>
            </a>
            <a
              href="#downloads"
              style={S(
                "flex: 1 1 260px; padding: 48px min(32px, var(--gutter)); text-align: center; display: flex; flex-direction: column; gap: 10px; border-left: 1px solid #ECE9E4",
              )}
            >
              <span style={S("font-family: Urbanist, sans-serif; font-weight: 300; font-size: 22px")}>
                {v.t("home.specify.bim")}
              </span>
              <span style={S("font-size: 14px; color: #5E5A53")}>{v.t("home.specify.bimText")}</span>
            </a>
            <a
              href="/find-a-rep"
              style={S(
                "flex: 1 1 260px; padding: 48px min(32px, var(--gutter)); text-align: center; display: flex; flex-direction: column; gap: 10px; border-left: 1px solid #ECE9E4",
              )}
            >
              <span style={S("font-family: Urbanist, sans-serif; font-weight: 300; font-size: 22px")}>
                {v.t("common.findRep")}
              </span>
              <span style={S("font-size: 14px; color: #5E5A53")}>{v.t("home.specify.repText")}</span>
            </a>
          </div>
        </section>
        <section
          id="contact"
          style={S(
            "max-width: 1440px; margin: 0 auto; padding: calc(160px * var(--vs)) var(--gutter) calc(140px * var(--vs)); text-align: center",
          )}
        >
          <h2
            style={S(
              "margin: 0 0 12px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(30px, 3vw, 44px); letter-spacing: -0.03em",
            )}
          >
            {v.t("home.contact.title")}
          </h2>
          <p style={S("margin: 0 auto 32px; max-width: 420px; color: #5E5A53")}>{v.t("home.contact.text")}</p>
          <form
            style={S(
              "margin: 0 auto; max-width: 520px; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center",
            )}
          >
            <label
              style={S(
                "flex: 1 1 280px; display: flex; flex-direction: column; text-align: left; font-size: 10px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #6B675F",
              )}
            >
              {v.t("home.contact.email")}
              <input
                type="email"
                name="email"
                autoComplete="email"
                style={S(
                  "min-height: 48px; border: 0; border-bottom: 1px solid #111111; background: transparent; padding: 0; font-family: inherit; font-size: 16px; color: #111111",
                )}
              />
            </label>
            <button
              type="button"
              style={S(
                "min-height: 48px; padding: 0 36px; border: 0; background: #645DC5; color: #FFFFFF; font-family: inherit; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; cursor: pointer; align-self: flex-end",
              )}
            >
              {v.t("home.contact.signUp")}
            </button>
          </form>
        </section>
        <footer style={S("background: #F4F1EB")}>
          <div
            style={S(
              "max-width: 1440px; margin: 0 auto; padding: calc(72px * var(--vs)) var(--gutter) 40px; display: flex; flex-wrap: wrap; gap: 40px",
            )}
          >
            <nav
              aria-label={v.t("home.footer.clientService")}
              style={S("flex: 1 1 200px; display: flex; flex-direction: column; gap: 10px; font-size: 13px")}
            >
              <span
                style={S(
                  "font-size: 10px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #6B675F",
                )}
              >
                {v.t("home.footer.clientService")}
              </span>
              <a href="mailto:info@indigoff.com">{v.t("home.footer.contactUs")}</a>
              <a href="#appointment">{v.t("home.specify.appointment")}</a>
              <a href="/find-a-rep">{v.t("common.findRep")}</a>
              <a href="#install">{v.t("home.footer.installation")}</a>
            </nav>
            <nav
              aria-label={v.t("home.footer.specify")}
              style={S("flex: 1 1 200px; display: flex; flex-direction: column; gap: 10px; font-size: 13px")}
            >
              <span
                style={S(
                  "font-size: 10px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #6B675F",
                )}
              >
                {v.t("home.footer.specify")}
              </span>
              <a href="/downloads">{v.t("common.downloads")}</a>
              <a href="/downloads">{v.t("home.footer.bimCad")}</a>
              <a href="#samples">{v.t("home.specify.samples")}</a>
              <a href="#sustainability">{v.t("home.footer.sustainability")}</a>
            </nav>
            <nav
              aria-label="Indigoff"
              style={S("flex: 1 1 200px; display: flex; flex-direction: column; gap: 10px; font-size: 13px")}
            >
              <span
                style={S(
                  "font-size: 10px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #6B675F",
                )}
              >
                {"Indigoff"}
              </span>
              <a href="#about">{v.t("home.footer.about")}</a>
              <a href="#journal">{v.t("home.footer.journal")}</a>
              <a href="#projects">{v.t("home.footer.projects")}</a>
              <a href="#careers">{v.t("home.footer.careers")}</a>
            </nav>
            <div style={S("flex: 1 1 220px; display: flex; flex-direction: column; gap: 10px; font-size: 13px")}>
              <span
                style={S(
                  "font-size: 10px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #6B675F",
                )}
              >
                {v.t("home.footer.contact")}
              </span>
              <a href="mailto:info@indigoff.com">{"info@indigoff.com"}</a>
              <span style={S("display: flex; flex-wrap: wrap; gap: 4px; margin: 6px 0 0 -13px")}>
                <a
                  href="https://www.instagram.com/indigoff.design/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={v.t("common.onNetwork", { name: "Indigoff", network: "Instagram" })}
                  className="soc"
                >
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" style={S("display: block")}>
                    <path
                      fill="currentColor"
                      d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
                    ></path>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/indigoff.design"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={v.t("common.onNetwork", { name: "Indigoff", network: "Facebook" })}
                  className="soc"
                >
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" style={S("display: block")}>
                    <path
                      fill="currentColor"
                      d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
                    ></path>
                  </svg>
                </a>
                <a
                  href="https://open.spotify.com/artist/4b8Uf8sWQLkKSq1sGczqsv"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={v.t("common.onNetwork", { name: "Indigoff", network: "Spotify" })}
                  className="soc"
                >
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" style={S("display: block")}>
                    <path
                      fill="currentColor"
                      d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
                    ></path>
                  </svg>
                </a>
              </span>
            </div>
          </div>
          <div
            style={S(
              "max-width: 1440px; margin: 0 auto; padding: 24px var(--gutter) 40px; border-top: 1px solid #E2DDD3; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 32px; font-size: 11px; color: #6B675F",
            )}
          >
            <span>{"© 2026 Indigoff LLC"}</span>
            <span style={S("display: flex; flex-wrap: wrap; gap: 8px 24px")}>
              <a href="#lang" style={S("color: #6B675F")}>
                {v.t("home.footer.region")}
              </a>
              <a href="#privacy" style={S("color: #6B675F")}>
                {v.t("home.footer.privacy")}
              </a>
              <a href="#terms" style={S("color: #6B675F")}>
                {v.t("home.footer.terms")}
              </a>
              <a href="#accessibility" style={S("color: #6B675F")}>
                {v.t("home.footer.accessibility")}
              </a>
            </span>
          </div>
        </footer>
        {v.zoomOn ? (
          <>
            <div
              role="dialog"
              aria-modal="true"
              aria-label={v.zoom.name}
              style={S(
                "position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 60; background: #FFFFFF; display: flex; flex-direction: column",
              )}
            >
              <div
                style={S(
                  "display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px var(--gutter); border-bottom: 1px solid #ECE9E4",
                )}
              >
                <button
                  type="button"
                  onClick={v.closeZoom}
                  style={S(
                    "min-height: 44px; padding: 0; border: 0; background: transparent; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #111111",
                  )}
                >
                  <span style={S("display: inline-flex; align-items: center; gap: 8px")}>
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={S("display: block; flex: none")}
                    >
                      <path d="M15 5l-7 7 7 7"></path>
                    </svg>
                    {v.t("common.back")}
                  </span>
                </button>
                <span
                  style={S(
                    "font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #111111",
                  )}
                >
                  {v.zoom.name}
                </span>
                <span style={S("display: flex; gap: 20px; align-items: center")}>
                  <button
                    type="button"
                    onClick={v.zSaveToggle}
                    aria-pressed={v.zSaveOn}
                    style={S(
                      "min-height: 44px; padding: 0 4px; border: 0; background: transparent; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #111111; display: inline-flex; align-items: center; gap: 8px",
                    )}
                  >
                    {v.zSaveIs ? (
                      <>
                        <svg
                          aria-hidden="true"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          style={S("display: block; flex: none")}
                        >
                          <path
                            d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </>
                    ) : null}
                    {v.zSaveNot ? (
                      <>
                        <svg
                          aria-hidden="true"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          style={S("display: block; flex: none")}
                        >
                          <path
                            d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </>
                    ) : null}
                    {v.zSaveLbl}
                  </button>
                  <button
                    type="button"
                    onClick={v.zoomPrev}
                    aria-label={v.t("collection.prevImage")}
                    style={S(
                      "min-height: 44px; min-width: 44px; border: 0; background: transparent; cursor: pointer; font-size: 18px; color: #111111; display: inline-flex; align-items: center; justify-content: center",
                    )}
                  >
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={S("display: block; flex: none")}
                    >
                      <path d="M15 5l-7 7 7 7"></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={v.zoomNext}
                    aria-label={v.t("collection.nextImage")}
                    style={S(
                      "min-height: 44px; min-width: 44px; border: 0; background: transparent; cursor: pointer; font-size: 18px; color: #111111; display: inline-flex; align-items: center; justify-content: center",
                    )}
                  >
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={S("display: block; flex: none")}
                    >
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </span>
              </div>
              <div
                style={S(
                  "flex: 1 1 auto; min-height: 0; display: flex; align-items: center; justify-content: center; padding: 24px; background: #F4F1EB",
                )}
              >
                <img
                  src={v.zoom.img}
                  alt={v.zoom.name}
                  style={S("display: block; max-width: 100%; max-height: 100%; object-fit: contain")}
                />
              </div>
            </div>
          </>
        ) : null}
        {v.lbOn ? (
          <>
            <div
              role="dialog"
              aria-modal="true"
              aria-label={v.lb.title}
              style={S(
                "position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 50; background: #FFFFFF; overflow-y: auto",
              )}
            >
              <header
                style={S("position: sticky; top: 0; z-index: 1; background: #FFFFFF; border-bottom: 1px solid #ECE9E4")}
              >
                <div
                  style={S(
                    "max-width: 1440px; margin: 0 auto; padding: 16px var(--gutter); display: flex; align-items: center; justify-content: space-between; gap: 16px",
                  )}
                >
                  <span style={S("flex: 1 1 0; display: flex")}>
                    <button
                      type="button"
                      onClick={v.closeLb}
                      style={S(
                        "min-height: 44px; padding: 0; border: 0; background: transparent; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #111111",
                      )}
                    >
                      <span style={S("display: inline-flex; align-items: center; gap: 8px")}>
                        <svg
                          aria-hidden="true"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={S("display: block; flex: none")}
                        >
                          <path d="M15 5l-7 7 7 7"></path>
                        </svg>
                        {v.t("common.back")}
                      </span>
                    </button>
                  </span>
                  <a
                    href="#top"
                    onClick={v.closeLb}
                    aria-label={v.t("collection.homeLabel")}
                    style={S("display: block")}
                  >
                    <img
                      src="/img/b8490b0b60f4124ee84a155bef6bdda9.svg"
                      alt="indigoff"
                      style={S("display: block; height: 24px; width: auto")}
                    />
                  </a>
                  <span style={S("flex: 1 1 0")}></span>
                </div>
              </header>
              <div style={S("background: #F4F1EB")}>
                {v.showHero ? (
                  <>
                    <img
                      src={v.lbImg}
                      alt={v.lbAlt}
                      style={S("display: block; width: 100%; max-height: 86vh; object-fit: contain; margin: 0 auto")}
                    />
                  </>
                ) : null}
              </div>
              <div
                style={S(
                  "max-width: 880px; margin: 0 auto; padding: calc(80px * var(--vs)) min(32px, var(--gutter)) calc(120px * var(--vs)); text-align: center; color: #111111",
                )}
              >
                <h1
                  style={S(
                    "margin: 0 0 28px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(44px, 6vw, 88px); line-height: 1; letter-spacing: -0.04em",
                  )}
                >
                  {v.lb.title}
                </h1>
                <p
                  style={S("margin: 0 auto 40px; max-width: 620px; font-size: 18px; line-height: 1.7; color: #3A3935")}
                >
                  {v.lb.desc}
                </p>
                <div style={S("margin: -8px 0 56px")}>
                  <button
                    type="button"
                    onClick={v.lbSaveToggle}
                    aria-pressed={v.lbSaveOn}
                    style={S(
                      `display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding: 0 28px; border: 1px solid #111111; background: ${v.lbSaveBg}; color: ${v.lbSaveFg}; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase`,
                    )}
                  >
                    {v.lbSaveIs ? (
                      <>
                        <svg
                          aria-hidden="true"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          style={S("display: block; flex: none")}
                        >
                          <path
                            d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </>
                    ) : null}
                    {v.lbSaveNot ? (
                      <>
                        <svg
                          aria-hidden="true"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          style={S("display: block; flex: none")}
                        >
                          <path
                            d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </>
                    ) : null}
                    {v.lbSaveLbl}
                  </button>
                </div>
                {v.showSw ? (
                  <>
                    {v.showCount ? (
                      <>
                        <p
                          style={S(
                            "margin: 0 0 8px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
                          )}
                        >
                          {v.swCountText}
                        </p>
                      </>
                    ) : null}
                    {(v.swGroups || []).map((g, g__i) => (
                      <React.Fragment key={g__i}>
                        {g.hasLabel ? (
                          <>
                            <h2
                              style={S(
                                "margin: 48px 0 20px; padding-bottom: 12px; border-bottom: 1px solid #111111; text-align: left; font-family: Urbanist, sans-serif; font-weight: 300; font-size: 30px; letter-spacing: -0.03em",
                              )}
                            >
                              {g.group}
                            </h2>
                          </>
                        ) : null}
                        <div
                          role="list"
                          style={S(
                            `margin: 0 auto 48px; display: grid; grid-template-columns: repeat(auto-fill, minmax(${g.min}, 1fr)); gap: 32px 12px; text-align: left`,
                          )}
                        >
                          {(g.items || []).map((w, w__i) => (
                            <React.Fragment key={w__i}>
                              <button
                                type="button"
                                role="listitem"
                                onClick={w.pick}
                                aria-pressed={w.on}
                                style={S(
                                  "display: flex; flex-direction: column; gap: 10px; padding: 0; border: 0; background: transparent; cursor: pointer; font-family: inherit; color: #111111; text-align: left",
                                )}
                              >
                                <img
                                  src={w.img}
                                  alt={`${w.name} finish`}
                                  loading="lazy"
                                  decoding="async"
                                  style={S(w.style)}
                                />
                                {w.showName ? (
                                  <>
                                    <span
                                      style={S(
                                        "font-family: Urbanist, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase",
                                      )}
                                    >
                                      {w.name}
                                    </span>
                                  </>
                                ) : null}
                              </button>
                            </React.Fragment>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}
                  </>
                ) : null}
                <div style={S("display: flex; flex-wrap: wrap; justify-content: center; gap: 12px")}></div>
              </div>
            </div>
          </>
        ) : null}
        {v.listOn ? (
          <>
            <div
              role="dialog"
              aria-modal="true"
              aria-label={v.t("list.title")}
              style={S(
                "position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 70; background: #FFFFFF; overflow-y: auto",
              )}
            >
              <header
                style={S("position: sticky; top: 0; z-index: 1; background: #FFFFFF; border-bottom: 1px solid #ECE9E4")}
              >
                <div
                  style={S(
                    "max-width: 1440px; margin: 0 auto; padding: 16px var(--gutter); display: flex; align-items: center; justify-content: space-between; gap: 16px",
                  )}
                >
                  <span style={S("flex: 1 1 0; display: flex")}>
                    <button
                      type="button"
                      onClick={v.closeList}
                      style={S(
                        "min-height: 44px; padding: 0; border: 0; background: transparent; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #111111",
                      )}
                    >
                      <span style={S("display: inline-flex; align-items: center; gap: 8px")}>
                        <svg
                          aria-hidden="true"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={S("display: block; flex: none")}
                        >
                          <path d="M15 5l-7 7 7 7"></path>
                        </svg>
                        {v.t("common.back")}
                      </span>
                    </button>
                  </span>
                  <a
                    href="#top"
                    onClick={v.closeList}
                    aria-label={v.t("collection.homeLabel")}
                    style={S("display: block")}
                  >
                    <img
                      src="/img/b8490b0b60f4124ee84a155bef6bdda9.svg"
                      alt="indigoff"
                      style={S("display: block; height: 24px; width: auto")}
                    />
                  </a>
                  <span style={S("flex: 1 1 0")}></span>
                </div>
              </header>
              <div
                style={S(
                  "max-width: 1200px; margin: 0 auto; padding: calc(80px * var(--vs)) min(32px, var(--gutter)) calc(120px * var(--vs)); color: #111111",
                )}
              >
                <div style={S("text-align: center")}>
                  <h1
                    style={S(
                      "margin: 0 0 24px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(44px, 6vw, 88px); line-height: 1; letter-spacing: -0.04em",
                    )}
                  >
                    {v.t("list.title")}
                  </h1>
                  <p
                    style={S(
                      "margin: 0 auto 48px; max-width: 560px; font-size: 17px; line-height: 1.7; color: #3A3935",
                    )}
                  >
                    {v.t("list.intro")}
                  </p>
                </div>
                {v.listEmpty ? (
                  <>
                    <p
                      style={S(
                        "margin: 0 auto; padding: 64px 24px; max-width: 520px; text-align: center; background: #F4F1EB; font-size: 15px; color: #5E5A53",
                      )}
                    >
                      {v.t("list.empty")}
                    </p>
                  </>
                ) : null}
                {v.listHas ? (
                  <>
                    <div
                      style={S("display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin: 0 0 56px")}
                    >
                      <a
                        href="/find-a-rep"
                        style={S(
                          "display: inline-flex; align-items: center; min-height: 48px; padding: 0 28px; background: #111111; color: #FFFFFF; text-decoration: none; J",
                        )}
                      >
                        {v.t("list.sendToRep")}
                      </a>
                      <a
                        href={v.listMail}
                        style={S(
                          "display: inline-flex; align-items: center; min-height: 48px; padding: 0 28px; border: 1px solid #111111; color: #111111; text-decoration: none; J",
                        )}
                      >
                        {v.t("list.email")}
                      </a>
                      <button
                        type="button"
                        onClick={v.clearList}
                        style={S(
                          "min-height: 48px; padding: 0 20px; border: 0; background: transparent; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #6B675F",
                        )}
                      >
                        {v.t("list.clear")}
                      </button>
                    </div>
                    <div
                      role="list"
                      style={S(
                        "display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 40px 16px",
                      )}
                    >
                      {(v.listItems || []).map((it, it__i) => (
                        <React.Fragment key={it__i}>
                          <div role="listitem" style={S("display: flex; flex-direction: column; gap: 10px")}>
                            <img
                              src={it.img}
                              alt={it.name}
                              loading="lazy"
                              decoding="async"
                              style={S(
                                "display: block; width: 100%; aspect-ratio: 4 / 5; height: auto; object-fit: cover; background: #EEEBE6",
                              )}
                            />
                            <span
                              style={S(
                                "font-size: 10px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #6B675F",
                              )}
                            >
                              {it.kind}
                            </span>
                            <span
                              style={S(
                                "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 20px; line-height: 1.2; letter-spacing: -0.02em",
                              )}
                            >
                              {it.name}
                            </span>
                            <button
                              type="button"
                              onClick={it.remove}
                              aria-label={`Remove ${it.name}`}
                              style={S(
                                "align-self: flex-start; min-height: 44px; padding: 0; border: 0; background: transparent; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #6B675F; text-decoration: underline; text-underline-offset: 4px",
                              )}
                            >
                              {v.t("list.remove")}
                            </button>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
        <SideMenu v={v} labels={{ downloads: v.t("common.downloads"), findRep: v.t("common.findRep") }} />
        {v.searchOn ? (
          <>
            <div className="sr-back" onClick={v.closeSearch}></div>
            <div className="sr" role="dialog" aria-modal="true" aria-label={v.srLabel}>
              <div className="sr-in">
                <div className="sr-bar">
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#111111"
                    strokeWidth="1.4"
                    style={S("display: block; flex: none")}
                  >
                    <circle cx="11" cy="11" r="7"></circle>
                    <path d="M20 20l-4-4"></path>
                  </svg>
                  <input
                    type="search"
                    className="sr-input"
                    placeholder={v.srPh}
                    value={v.srQ}
                    onChange={v.srInput}
                    autoFocus
                    aria-label={v.srLabel}
                  />
                  <button type="button" onClick={v.closeSearch} className="sr-x" aria-label={v.srClose}>
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      style={S("display: block")}
                    >
                      <path d="M5 5l14 14M19 5L5 19"></path>
                    </svg>
                  </button>
                </div>
                {v.srNoQ ? (
                  <>
                    <p className="sr-g">{v.srSuggest}</p>
                    <div className="sr-chips">
                      {(v.srChips || []).map((m, m__i) => (
                        <React.Fragment key={m__i}>
                          <a href={m.href} onClick={v.closeSearch} className="sr-chip">
                            {m.name}
                          </a>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
                {v.srEmpty ? (
                  <>
                    <p className="sr-none">{v.srNone}</p>
                  </>
                ) : null}
                {v.srHas ? (
                  <>
                    <p className="sr-g">{v.srCount}</p>
                    <div className="sr-list" role="list">
                      {(v.srResults || []).map((r, r__i) => (
                        <React.Fragment key={r__i}>
                          <div role="listitem">
                            {r.isLink ? (
                              <>
                                <a href={r.href} onClick={r.go} className="sr-row">
                                  <span className="sr-img">
                                    <img src={r.img} alt="" loading="lazy" decoding="async" />
                                  </span>
                                  <span className="sr-t">
                                    <span className="sr-n">{r.name}</span>
                                    <span className="sr-k">{r.kind}</span>
                                  </span>
                                </a>
                              </>
                            ) : null}
                            {r.isBtn ? (
                              <>
                                <button type="button" onClick={r.go} className="sr-row">
                                  <span className="sr-img">
                                    <img src={r.img} alt="" loading="lazy" decoding="async" />
                                  </span>
                                  <span className="sr-t">
                                    <span className="sr-n">{r.name}</span>
                                    <span className="sr-k">{r.kind}</span>
                                  </span>
                                </button>
                              </>
                            ) : null}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
        {v.nlOn ? (
          <>
            <div className="nl-back" onClick={v.nlClose}></div>
            <div className="nl" role="dialog" aria-modal="true" aria-label={v.nlTitle}>
              <button type="button" onClick={v.nlClose} className="nl-x" aria-label={v.nlCloseLbl}>
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  style={S("display: block")}
                >
                  <path d="M5 5l14 14M19 5L5 19"></path>
                </svg>
              </button>
              <div className="nl-img">
                <img src="/img/f8c0fd4c23fb59d6887e5fe8c294a39b.jpg" alt="" />
              </div>
              <div className="nl-body">
                {v.nlForm ? (
                  <>
                    <h2 className="nl-h">{v.nlTitle}</h2>
                    <p className="nl-p">{v.nlText}</p>
                    <label className="nl-lbl">
                      {v.nlEmailLbl}
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        className="nl-in"
                        value={v.nlEmail}
                        onChange={v.nlInput}
                        placeholder="name@company.com"
                      />
                    </label>
                    {v.nlErr ? (
                      <>
                        <p className="nl-err" role="alert">
                          {v.nlErrText}
                        </p>
                      </>
                    ) : null}
                    <button type="button" onClick={v.nlSubmit} className="nl-btn">
                      {v.nlCta}
                    </button>
                    <button type="button" onClick={v.nlClose} className="nl-no">
                      {v.nlNo}
                    </button>
                  </>
                ) : null}
                {v.nlDone ? (
                  <>
                    <h2 className="nl-h">{v.nlThanks}</h2>
                    <p className="nl-p">{v.nlThanksText}</p>
                    <button type="button" onClick={v.nlClose} className="nl-btn">
                      {v.nlContinue}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
