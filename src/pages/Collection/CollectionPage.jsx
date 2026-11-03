import React, { useEffect, useRef } from "react";
import { S } from "../../lib/dc.js";
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
    gridStyle:
      "display: grid; grid-template-columns: repeat(auto-fill, minmax(min(" +
      (d.small ? "260px" : "320px") +
      ", 100%), 1fr)); gap: 40px 8px",
    tileStyle:
      "min-width: 0; display: flex; flex-direction: column; gap: 14px; padding: 0; border: 0; background: transparent; cursor: pointer; font-family: inherit; color: #111111",
    imgStyle: "display: block; width: 100%; aspect-ratio: 4 / 5; height: auto; object-fit: cover",
    phStyle: "display: block; width: 100%; aspect-ratio: 4 / 5; background: #EEEBE6",
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
      <div
        style={S(
          "font-family: 'IBM Plex Sans', system-ui, sans-serif; font-weight: 300; color: #111111; background: #FFFFFF; font-size: 15px; line-height: 1.7",
        )}
      >
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
        <section
          id="content"
          style={S("max-width: 1440px; margin: 0 auto; padding: 40px min(32px, var(--gutter)) 0; text-align: center")}
        >
          <h1
            style={S(
              "margin: 0 0 12px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(40px, 5vw, 64px); line-height: 1; letter-spacing: -0.04em",
            )}
          >
            {v.c.name}
          </h1>
          <p
            style={S(
              "margin: 0 auto 24px; max-width: 760px; font-family: 'IBM Plex Sans', sans-serif; font-weight: 300; font-size: 16px; line-height: 1.5; color: #3A3935",
            )}
          >
            {v.c.desc}
          </p>
          <nav
            aria-label={v.t("collection.subcategoriesLabel")}
            className="scroll-tabs"
            style={S(
              "display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 40px; border-bottom: 1px solid #ECE9E4",
            )}
          >
            {(v.tabs || []).map((t, t__i) => (
              <React.Fragment key={t__i}>
                <button type="button" onClick={t.pick} aria-pressed={t.on} style={S(t.style)}>
                  {t.label}
                </button>
              </React.Fragment>
            ))}
          </nav>
          {v.hasColls ? (
            <>
              <nav aria-label={v.t("collection.collectionsLabel")} className="cl-row">
                <span className="cl-lab">{v.collLabel}</span>
                {(v.colls || []).map((q, q__i) => (
                  <React.Fragment key={q__i}>
                    <button type="button" onClick={q.pick} aria-pressed={q.on} className={q.cls}>
                      {q.label}
                    </button>
                  </React.Fragment>
                ))}
              </nav>
            </>
          ) : null}
        </section>
        <section style={S("max-width: 1440px; margin: 0 auto; padding: 20px 0 0")}>
          <div style={S("max-width: 720px; margin: 0 auto 24px; padding: 0 24px; text-align: center")}>
            <h2
              style={S(
                "position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap",
              )}
            >
              {v.s.label}
            </h2>
            <p style={S("margin: 0; font-size: 14px; line-height: 1.5; color: #5E5A53")}>{v.s.desc}</p>
            {v.s.hasSub ? (
              <>
                <p
                  style={S(
                    "margin: 16px 0 0; font-size: 10px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #6B675F",
                  )}
                >
                  {v.s.sub}
                </p>
              </>
            ) : null}
          </div>
          {v.s.hasProducts ? (
            <>
              <div style={S(v.s.gridStyle)}>
                {(v.s.products || []).map((p, p__i) => (
                  <React.Fragment key={p__i}>
                    <button
                      type="button"
                      onClick={p.pick}
                      aria-label={v.t("collection.viewItem", { name: p.name })}
                      style={S(v.s.tileStyle)}
                    >
                      {p.hasImg ? (
                        <>
                          <img src={p.img} alt={p.alt} style={S(v.s.imgStyle)} />
                        </>
                      ) : null}
                      {p.noImg ? (
                        <>
                          <span aria-hidden="true" style={S(v.s.phStyle)}></span>
                        </>
                      ) : null}
                      <span
                        style={S(
                          "display: block; width: 100%; text-align: center; font-size: 12px; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase",
                        )}
                      >
                        {p.name}
                      </span>
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : null}
          {v.s.noProducts ? (
            <>
              <div style={S("max-width: 1100px; margin: 0 auto; padding: 0 24px")}>
                {v.s.hasFeat ? (
                  <>
                    <img
                      src={v.s.feat}
                      alt={v.s.label}
                      style={S("display: block; width: 100%; height: calc(620px * var(--mh)); object-fit: cover")}
                    />
                  </>
                ) : null}
                {v.s.noFeat ? (
                  <>
                    <div
                      role="img"
                      aria-label={v.t("collection.photoPlaceholder", { name: v.s.label })}
                      style={S("height: calc(620px * var(--mh)); background: #EEEBE6")}
                    ></div>
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </section>
        <section
          style={S(
            "max-width: 1440px; margin: 0 auto; padding: calc(160px * var(--vs)) min(32px, var(--gutter)) 0; text-align: center",
          )}
        >
          <p
            style={S(
              "margin: 0 0 28px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(32px, 3.6vw, 52px); letter-spacing: -0.04em",
            )}
          >
            {v.t("collection.bringTitle")}
          </p>
          <div style={S("display: flex; flex-wrap: wrap; justify-content: center; gap: 12px")}>
            <a
              href="/find-a-rep"
              style={S(
                "display: inline-flex; align-items: center; min-height: 48px; padding: 0 36px; background: #645DC5; color: #FFFFFF; text-decoration: none; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
              )}
            >
              {v.t("common.requestSamples")}
            </a>
            <a
              href="/#acoustics"
              style={S(
                "display: inline-flex; align-items: center; min-height: 48px; padding: 0 36px; border: 1px solid #111111; color: #111111; text-decoration: none; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
              )}
            >
              {v.t("collection.requestStudy")}
            </a>
          </div>
        </section>
        <section
          style={S(
            "max-width: 1440px; margin: 0 auto; padding: calc(160px * var(--vs)) min(32px, var(--gutter)) calc(140px * var(--vs)); text-align: center",
          )}
        >
          <h2
            style={S(
              "margin: 0 0 28px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
            )}
          >
            {v.t("collection.moreCategories")}
          </h2>
          <nav
            aria-label={v.t("collection.moreCategories")}
            style={S(
              "display: flex; flex-wrap: wrap; justify-content: center; gap: 12px 44px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(20px, 2.2vw, 30px); letter-spacing: -0.02em",
            )}
          >
            {(v.others || []).map((o, o__i) => (
              <React.Fragment key={o__i}>
                <a href={o.href} style={S("color: #111111; text-decoration: none")}>
                  {o.name}
                </a>
              </React.Fragment>
            ))}
          </nav>
        </section>
        <footer
          style={S(
            "background: #F4F1EB; padding: 32px var(--gutter); display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 32px; font-size: 11px; color: #6B675F",
          )}
        >
          <span>{"© 2026 Indigoff LLC"}</span>
          <a href="mailto:info@indigoff.com" style={S("color: #6B675F; text-decoration: none")}>
            {"info@indigoff.com"}
          </a>
          <a href="/" style={S("color: #6B675F; text-decoration: none")}>
            {v.t("common.backToHome")}
          </a>
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
        {v.selOn ? (
          <>
            <div
              role="dialog"
              aria-modal="true"
              aria-label={v.sel.title}
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
                      onClick={v.close}
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
                  <a href="/" aria-label={v.t("collection.homeLabel")} style={S("display: block")}>
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
                {v.sel.hasImg ? (
                  <>
                    <img
                      src={v.sel.img}
                      alt={v.sel.alt}
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
                  {v.sel.title}
                </h1>
                <p
                  style={S("margin: 0 auto 40px; max-width: 620px; font-size: 18px; line-height: 1.7; color: #3A3935")}
                >
                  {v.sel.desc}
                </p>
                <div style={S("margin: -8px 0 56px")}>
                  <button
                    type="button"
                    onClick={v.pSaveToggle}
                    aria-pressed={v.pSaveOn}
                    style={S(
                      `display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding: 0 28px; border: 1px solid #111111; background: ${v.pSaveBg}; color: ${v.pSaveFg}; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase`,
                    )}
                  >
                    {v.pSaveIs ? (
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
                    {v.pSaveNot ? (
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
                    {v.pSaveLbl}
                  </button>
                </div>
                {v.sel.hasGal ? (
                  <>
                    <div
                      className="pgal"
                      style={S("margin: 0 0 48px; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px")}
                    >
                      {(v.sel.gal || []).map((g, g__i) => (
                        <React.Fragment key={g__i}>
                          <button
                            type="button"
                            onClick={g.pick}
                            aria-label={v.t("collection.viewItem", { name: g.name })}
                            style={S(
                              "display: block; flex: 0 0 calc((100% - 24px) / 4); padding: 0; border: 0; background: #EEEBE6; cursor: pointer",
                            )}
                          >
                            <img
                              src={g.img}
                              alt={g.name}
                              loading="lazy"
                              decoding="async"
                              style={S(
                                "display: block; width: 100%; aspect-ratio: 4 / 5; height: auto; object-fit: cover",
                              )}
                            />
                          </button>
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                ) : null}
                {v.sel.hasDl ? (
                  <>
                    <section
                      aria-label={v.t("common.downloads")}
                      style={S("margin-top: calc(88px * var(--vs)); text-align: left")}
                    >
                      <div
                        style={S(
                          "display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 8px 24px; padding-bottom: 18px; border-bottom: 1px solid #111111",
                        )}
                      >
                        <h2
                          style={S(
                            "margin: 0; font-family: Urbanist, sans-serif; font-weight: 300; font-size: 30px; letter-spacing: -0.03em",
                          )}
                        >
                          {v.t("common.downloads")}
                        </h2>
                        <a
                          href="/downloads"
                          style={S(
                            "font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #6B675F",
                          )}
                        >
                          <span style={S("display: inline-flex; align-items: center; gap: 8px")}>
                            {v.t("collection.allDownloads")}
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
                        </a>
                      </div>
                      {(v.sel.dl || []).map((f, f__i) => (
                        <React.Fragment key={f__i}>
                          <a
                            href={f.href}
                            download
                            style={S(
                              "display: flex; flex-wrap: wrap; align-items: center; gap: 8px 20px; min-height: 64px; padding: 14px 0; border-bottom: 1px solid #ECE9E4; color: #111111; text-decoration: none",
                            )}
                          >
                            <span
                              style={S(
                                "flex: 0 0 72px; font-family: Urbanist, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase",
                              )}
                            >
                              {f.fmt}
                            </span>
                            <span style={S("flex: 1 1 220px; min-width: 0; font-size: 15px; overflow-wrap: anywhere")}>
                              {f.name}
                            </span>
                            <span style={S("flex: 0 0 auto; font-size: 13px; color: #6B675F")}>{f.size}</span>
                            <span
                              style={S(
                                "flex: 0 0 auto; font-family: Urbanist, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase",
                              )}
                            >
                              <span style={S("display: inline-flex; align-items: center; gap: 8px")}>
                                {v.t("downloads.download")}
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
                                  <path d="M12 4v13M6 11l6 6 6-6M5 20h14"></path>
                                </svg>
                              </span>
                            </span>
                          </a>
                        </React.Fragment>
                      ))}
                    </section>
                  </>
                ) : null}
                {v.sel.noDl ? (
                  <>
                    <p
                      style={S(
                        "margin: calc(72px * var(--vs)) 0 0; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #6B675F",
                      )}
                    >
                      {v.t("collection.filesOnRequest")}
                    </p>
                  </>
                ) : null}
                {v.sel.hasImg2 ? (
                  <>
                    <img
                      src={v.sel.img2}
                      alt={v.t("collection.secondView", { name: v.sel.title })}
                      style={S("display: block; width: 100%; margin-top: calc(72px * var(--vs)); background: #F4F1EB")}
                    />
                  </>
                ) : null}
                <div
                  style={S(
                    "margin-top: calc(72px * var(--vs)); padding-top: 24px; border-top: 1px solid #ECE9E4; display: flex; justify-content: space-between; gap: 12px",
                  )}
                >
                  <button
                    type="button"
                    onClick={v.prev}
                    style={S(
                      "min-height: 44px; padding: 0; border: 0; background: transparent; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #111111",
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
                      {v.prevName}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={v.next}
                    style={S(
                      "min-height: 44px; padding: 0; border: 0; background: transparent; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #111111",
                    )}
                  >
                    <span style={S("display: inline-flex; align-items: center; gap: 8px")}>
                      {v.nextName}
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
                        <path d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </button>
                </div>
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
                  <a href="/" aria-label={v.t("collection.homeLabel")} style={S("display: block")}>
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
                              aria-label={v.t("list.removeItem", { name: it.name })}
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
      </div>
    </>
  );
}
