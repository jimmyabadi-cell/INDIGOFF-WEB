import { useEffect, useRef } from "react";
import { listVals, saveVals } from "../../lib/savedList.js";
import { usePageChrome } from "../../hooks/usePageChrome.js";
import { useMergeState } from "../../hooks/useMergeState.js";
import { useSavedList } from "../../hooks/useSavedList.js";
import { useScrollLock } from "../../hooks/useScrollLock.js";
import "./CollectionPage.css";

import P from "../../data/products.json";
import C from "../../data/collections.json";
import GAL_DATA from "../../data/gallery.json";
import DL_DATA from "../../data/product-downloads.json";
import SiteHeader from "../../components/layout/SiteHeader.jsx";
import Intro from "./sections/Intro.jsx";
import ProductGrid from "./sections/ProductGrid.jsx";
import BringToSpace from "./sections/BringToSpace.jsx";
import MoreCategories from "./sections/MoreCategories.jsx";
import Footer from "./sections/Footer.jsx";
import ZoomDialog from "../../components/ZoomDialog.jsx";
import ProductDialog from "./sections/ProductDialog.jsx";
import ListPanel from "../../components/ListPanel.jsx";
import css from "./CollectionPage.module.css";
// Productos con descripción propia (catalog.special) y familias con descripción (catalog.families).
const FAM = new Set(C.fam);
const SPECIAL = new Set(C.special);
const COLS = C.cols;
const PARENTS = C.parents;
const PCOLLS = C.pcolls;
const PORDER = C.porder;
const GAL = GAL_DATA;
const DL = DL_DATA;
function U(x) {
  return !x ? "" : x.indexOf("/") >= 0 ? x : "/_blob/" + x;
}

const EMPTY = { sub: null, sel: -1, zi: null, listOpen: false, coll: "" };

/** Sin producto abierto siempre hay una subcategoría activa (la primera por defecto). */
function normalize(st) {
  return (st.sub === null || st.sub < 0) && !(st.sel >= 0) ? { ...st, sub: 0 } : st;
}

/** Todos los productos de una categoría, sin repetir, en el orden de sus subcategorías. */
function allProducts(par) {
  const al = [];
  par.subs.forEach(function (k3) {
    COLS[k3].products.forEach(function (x) {
      if (al.indexOf(x) < 0) al.push(x);
    });
  });
  return al;
}

/** Estado según el hash: `#baffles` abre la subcategoría, `#p=slug` abre el producto. */
function stateFromHash(key) {
  const par = PARENTS[key];
  const out = { sub: null, sel: -1, zi: null };
  try {
    const hk = (window.location.hash || "").slice(1);
    const hi = par.subs.indexOf(hk);
    if (hi >= 0) out.sub = hi;
    if (hk.indexOf("p=") === 0) {
      const pi = allProducts(par).indexOf(hk.slice(2));
      if (pi >= 0) {
        out.sub = -1;
        out.sel = pi;
      }
    }
  } catch (e) {}
  return out;
}

/** Consume la apertura pendiente que deja el menú lateral (ver ifoSetPending en lib/nav.js). */
function takePendingOpen(key) {
  try {
    const raw = window.localStorage.getItem("indigoff_open"),
      po = raw ? JSON.parse(raw) : window.__indigoffOpen || null;
    if (!po || po.col !== key || Date.now() - po.t >= 120000) return null;
    window.localStorage.removeItem("indigoff_open");
    try {
      window.__indigoffOpen = null;
    } catch (e) {}
    const pp = PARENTS[key];
    if (po.slug) {
      const pi = allProducts(pp).indexOf(po.slug);
      if (pi >= 0) return { sub: -1, sel: pi, zi: null, listOpen: false };
    } else if (po.sub) {
      const si2 = pp.subs.indexOf(po.sub);
      if (si2 >= 0) return { sub: si2, sel: -1, zi: null };
    } else if (po.reset) {
      return { sub: -1, sel: -1, zi: null, coll: "", listOpen: false };
    }
  } catch (e) {}
  return null;
}

export default function CollectionPage({ col = "ceilings" }) {
  const key = PARENTS[col] ? col : "ceilings";
  const [st, setSt] = useMergeState(
    () => normalize({ ...EMPTY, ...stateFromHash(key), ...(takePendingOpen(key) || {}) }),
    normalize,
  );
  const list = useSavedList();
  const onKey = useRef(null);
  const { chrome } = usePageChrome();

  useEffect(() => {
    const applyPending = () => {
      const patch = takePendingOpen(key);
      if (patch) setSt(patch);
    };
    const onHash = () => setSt(stateFromHash(key));
    window.addEventListener("indigoff-open", applyPending);
    window.addEventListener("storage", applyPending);
    window.addEventListener("focus", applyPending);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("indigoff-open", applyPending);
      window.removeEventListener("storage", applyPending);
      window.removeEventListener("focus", applyPending);
      window.removeEventListener("hashchange", onHash);
    };
  }, [key, setSt]);

  useEffect(() => {
    const handler = (e) => onKey.current && onKey.current(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const vals = collectionVals({ state: st, setState: setSt }, key, list, onKey, chrome.t);
  useScrollLock(vals.selOn || st.listOpen);
  return template({ ...vals, ...chrome });
}

function collectionVals(self, key, list, onKey, t) {
  const par = PARENTS[key];
  const parName = t("catalog.categories." + key);
  const parDesc = t("catalog.parents." + key + ".desc");
  const si = self.state.sub !== null ? self.state.sub : -1;
  const allP = allProducts(par);
  const sk = si < 0 ? "__all" : par.subs[si];
  let d =
    si < 0
      ? { desc: parDesc, products: allP, small: true, img: "" }
      : { ...COLS[sk], desc: t("catalog.cols." + sk + ".desc") };
  const cdefs = PCOLLS[key] || [];
  const collOf = function (pk) {
    for (let ci = 0; ci < cdefs.length; ci++) {
      if (pk.indexOf(cdefs[ci].pre) === 0) return cdefs[ci].name;
    }
    return "";
  };
  const present = cdefs.filter(function (cd) {
    return d.products.some(function (pk) {
      return collOf(pk) === cd.name;
    });
  });
  let cur = self.state.coll || "";
  const hasColls = present.length > 1;
  if (
    !hasColls ||
    !present.some(function (cd) {
      return cd.name === cur;
    })
  )
    cur = "";
  if (cur)
    d = Object.assign({}, d, {
      products: d.products.filter(function (pk) {
        return collOf(pk) === cur;
      }),
    });
  const colls = hasColls
    ? [{ name: "", label: t("collection.all") }]
        .concat(
          present.map(function (cd) {
            return { name: cd.name, label: cd.name };
          }),
        )
        .map(function (cd) {
          const on = cd.name === cur;
          return {
            label: cd.label,
            on: on,
            cls: "cl-b" + (on ? " on" : ""),
            pick: function () {
              self.setState({ coll: cd.name, sel: -1, zi: null });
            },
          };
        })
    : [];
  const lab = function (k) {
    return k === "__all" ? t("collection.all") : t("catalog.subcategories." + key + "." + k);
  };
  const c = { name: parName, desc: parDesc, hasImg: !!par.img, img: U(par.img), alt: par.alt };
  const tabs = par.subs.map(function (k, i0) {
    const i = i0;
    const on = i === si;
    return {
      label: lab(k),
      on: on,
      style:
        "min-height: 48px; padding: 0 0 4px; border: 0; border-bottom: 2px solid " +
        (on ? "#645DC5" : "transparent") +
        "; margin-bottom: -1px; background: transparent; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: " +
        (on ? "#111111" : "#6B675F"),
      pick: function () {
        self.setState({ sub: i, sel: -1, coll: "" });
      },
    };
  });
  const s = {
    label: lab(sk),
    desc: d.desc,
    sub: d.sub || "",
    hasSub: !!d.sub,
    hasProducts: d.products.length > 0,
    noProducts: d.products.length === 0,
    feat: U(d.img),
    hasFeat: !!d.img,
    noFeat: !d.img,
    // Tarjetas más angostas en "Todos" (más productos por fila); ver ProductGrid.module.css.
    small: !!d.small,
    products: d.products.map(function (k, i) {
      const p = P[k];
      return {
        name: p[0],
        hasImg: !!p[2],
        noImg: !p[2],
        img: U(p[2]),
        alt: p[0] + ": " + p[3],
        pick: function () {
          self.setState({ sel: i });
        },
      };
    }),
  };
  const n = d.products.length;
  const xi = self.state.sel;
  const st0 = self.state;
  let sel = {
    title: "",
    label: "",
    hasImg: false,
    img: "",
    hasImg2: false,
    img2: "",
    alt: "",
    desc: "",
    dl: [],
    hasDl: false,
    noDl: true,
    gal: [],
    galList: [],
    hasGal: false,
    galOne: false,
    oneImg: "",
    oneName: "",
  };
  let prevName = "";
  let nextName = "";
  if (xi >= 0 && xi < n) {
    const k = d.products[xi];
    const p = P[k];
    const desc = SPECIAL.has(k) ? t("catalog.special." + k) : FAM.has(p[1]) ? t("catalog.families." + p[1]) : "";
    sel = {
      title: p[0],
      label: si < 0 ? parName : parName + " · " + lab(sk),
      hasImg: !!p[2],
      img: U(p[4] || p[2]),
      hasImg2: !!p[5],
      img2: U(p[5]),
      alt: p[0] + ": " + p[3],
      desc: desc,
    };
    const fl = DL[k] || [];
    sel.dl = fl.map(function (f) {
      return { fmt: f[0], name: f[1], size: f[2], href: f[3] };
    });
    sel.hasDl = fl.length > 0;
    sel.noDl = fl.length === 0;
    const gl = GAL[k] || [];
    sel.galList = gl;
    sel.hasGal = gl.length > 0;
    sel.galOne = false;
    sel.oneImg = sel.galOne ? gl[0].img : "";
    sel.oneName = sel.galOne ? gl[0].name : "";
    if (gl.length > 0) {
      sel.hasImg = false;
      sel.hasImg2 = false;
    }
    sel.gal = gl.map(function (g, gi) {
      return {
        name: g.name,
        img: g.img,
        pick: function () {
          self.setState({ zi: gi });
        },
      };
    });
    prevName = P[d.products[(xi - 1 + n) % n]][0];
    nextName = P[d.products[(xi + 1) % n]][0];
  }
  const others = PORDER.filter(function (k2) {
    return k2 !== key;
  }).map(function (k2) {
    return { name: t("catalog.categories." + k2), href: "/" + PARENTS[k2].file.toLowerCase() };
  });
  const zOpenC = st0.zi !== null && sel.galList.length > 0,
    selOpen = xi >= 0 && xi < n;
  onKey.current = function (e) {
    const k = e.key;
    const gl2 = sel.galList.length;
    if (zOpenC) {
      if (k === "Escape") self.setState({ zi: null });
      else if (k === "ArrowLeft") self.setState({ zi: (st0.zi - 1 + gl2) % gl2 });
      else if (k === "ArrowRight") self.setState({ zi: (st0.zi + 1) % gl2 });
      return;
    }
    if (st0.listOpen) {
      if (k === "Escape") self.setState({ listOpen: false });
      return;
    }
    if (selOpen) {
      if (k === "Escape") self.setState({ sel: -1, zi: null });
      else if (k === "ArrowLeft") self.setState({ sel: (xi - 1 + n) % n, zi: null });
      else if (k === "ArrowRight") self.setState({ sel: (xi + 1) % n, zi: null });
    }
  };
  let pItem = null;
  let zItem = null;
  if (xi >= 0 && xi < n) {
    const pk0 = d.products[xi];
    pItem = { id: "p:" + pk0, name: P[pk0][0], kind: parName, img: U(P[pk0][2]) };
  }
  if (st0.zi !== null && sel.galList[st0.zi])
    zItem = {
      id: "img:" + sel.galList[st0.zi].img,
      name: sel.galList[st0.zi].name,
      kind: sel.title,
      img: sel.galList[st0.zi].img,
    };
  const zs = saveVals(list, "zSave", zItem, { add: t("collection.save"), saved: t("collection.saved") });
  const ui = {
    open: !!st0.listOpen,
    openList: function () {
      self.setState({ listOpen: true, zi: null });
    },
    closeList: function () {
      self.setState({ listOpen: false });
    },
  };
  return Object.assign(
    listVals(list, ui),
    saveVals(list, "pSave", pItem, { add: t("list.add"), saved: t("list.saved") }),
    zs,
    {
      c: c,
      s: s,
      tabs: tabs,
      colls: colls,
      hasColls: hasColls,
      collLabel: t("collection.collectionLabel"),
      others: others,
      sel: sel,
      selOn: xi >= 0 && xi < n,
      prevName: prevName,
      nextName: nextName,
      zoomOn: st0.zi !== null && sel.galList.length > 0,
      zoom: (st0.zi !== null && sel.galList[st0.zi]) || { name: "", img: "" },
      closeZoom: function () {
        self.setState({ zi: null });
      },
      zoomPrev: function () {
        const n2 = sel.galList.length;
        self.setState({ zi: (st0.zi - 1 + n2) % n2 });
      },
      zoomNext: function () {
        const n2 = sel.galList.length;
        self.setState({ zi: (st0.zi + 1) % n2 });
      },
      close: function () {
        self.setState({ sel: -1, zi: null });
      },
      prev: function () {
        self.setState({ sel: (xi - 1 + n) % n, zi: null });
      },
      next: function () {
        self.setState({ sel: (xi + 1) % n, zi: null });
      },
    },
  );
}

function template(v) {
  return (
    <>
      <div className={css.box}>
        <a className="skip" href="#content">
          {v.t("common.skipToContent")}
        </a>
        <SiteHeader
          v={v}
          variant="collection"
          labels={{
            back: v.t("collection.allCategories"),
            downloads: v.t("common.downloads"),
            list: v.t("list.title"),
            contact: v.t("collection.contact"),
          }}
        />
        <Intro v={v} />
        <ProductGrid v={v} />
        <BringToSpace v={v} />
        <MoreCategories v={v} />
        <Footer v={v} />
        <ZoomDialog v={v} />
        <ProductDialog v={v} />
        <ListPanel v={v} />
      </div>
    </>
  );
}
