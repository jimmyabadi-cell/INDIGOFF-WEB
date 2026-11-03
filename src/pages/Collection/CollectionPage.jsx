import React from "react";
import { DCLogic, S } from "../../lib/dc.js";
import "./CollectionPage.css";

const I18N_EN = {
  k1: "Skip to content",
  k2: "All categories",
  k3: "Contact",
  k4: "Bring it to your space.",
  k5: "Request samples",
  k6: "Request an acoustic + lighting study",
  k7: "More categories",
  k8: "Back to home",
  k9: "Back",
  k10: "Downloads",
  k11: "All downloads",
  k12: "Download",
  k13: "CAD & BIM files available on request",
  k14: "My list",
  k15: "Save products, finishes, concepts and projects as you browse. Share the list with a rep to get samples and pricing for your project.",
  k16: "Your list is empty. Tap “Add to my list” on any product, finish, concept or project to save it here.",
  k17: "Send to a rep",
  k18: "Email my list",
  k19: "Clear list",
  k20: "Remove",
};

import P from "../../data/products.json";
import C from "../../data/collections.json";
import GAL_DATA from "../../data/gallery.json";
import DL_DATA from "../../data/product-downloads.json";
const FAM = C.fam;
const SPECIAL = C.special;
const COLS = C.cols;
const PARENTS = C.parents;
const PCOLLS = C.pcolls;
const PORDER = C.porder;
const GAL = GAL_DATA;
const DL = DL_DATA;
function U(x) {
  return !x ? "" : x.indexOf("/") >= 0 ? x : "/_blob/" + x;
}

const LKEY = "indigoff_list";
function listGet() {
  try {
    const v = JSON.parse(window.localStorage.getItem(LKEY) || "null");
    if (Array.isArray(v)) return v;
  } catch (e) {}
  return (typeof window !== "undefined" && window.__indigoffList) || [];
}
function listSet(a) {
  try {
    window.localStorage.setItem(LKEY, JSON.stringify(a));
  } catch (e) {}
  try {
    window.__indigoffList = a;
  } catch (e) {}
}
function listHasId(id) {
  return listGet().some(function (x) {
    return x.id === id;
  });
}
function listToggle(item) {
  const a = listGet();
  const i = a.findIndex(function (x) {
    return x.id === item.id;
  });
  if (i >= 0) a.splice(i, 1);
  else a.push(item);
  listSet(a);
}
function listVals(self) {
  const a = listGet();
  const body =
    "My%20Indigoff%20list%3A%0D%0A%0D%0A" +
    a
      .map(function (x) {
        return encodeURIComponent("- " + x.name + (x.kind ? " (" + x.kind + ")" : ""));
      })
      .join("%0D%0A");
  return {
    listCount: a.length,
    listOn: !!self.state.listOpen,
    listEmpty: a.length === 0,
    listHas: a.length > 0,
    listMail: "mailto:?subject=" + encodeURIComponent("My Indigoff list") + "&body=" + body,
    openList: function () {
      self.setState({ listOpen: true, zi: null });
    },
    closeList: function () {
      self.setState({ listOpen: false });
    },
    clearList: function () {
      listSet([]);
      self.setState({ lv: Date.now() });
    },
    listItems: a.map(function (x) {
      return {
        name: x.name,
        kind: x.kind || "",
        img: x.img || "",
        remove: function () {
          listToggle(x);
          self.setState({ lv: Date.now() });
        },
      };
    }),
  };
}
function saveVals(self, pre, item, addLbl) {
  const on = !!item && listHasId(item.id);
  const o = {};
  o[pre + "On"] = on ? "true" : "false";
  o[pre + "Lbl"] = on ? "Saved to my list" : addLbl || "Add to my list";
  o[pre + "Is"] = on;
  o[pre + "Not"] = !on;
  o[pre + "Bg"] = on ? "#111111" : "transparent";
  o[pre + "Fg"] = on ? "#FFFFFF" : "#111111";
  o[pre + "Toggle"] = function () {
    if (item) {
      listToggle(item);
      self.setState({ lv: Date.now() });
    }
  };
  return o;
}
class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = { sub: null, sel: -1, zi: null, listOpen: false, lv: 0 };
    const self0 = this;
    try {
      window.addEventListener("keydown", function (e) {
        if (self0._onKey) self0._onKey(e);
      });
    } catch (e) {}
  }
  _rv() {
    const self = this;
    const key = PARENTS[this.props.col] ? this.props.col : "ceilings";
    const par = PARENTS[key];
    if (this.state.sub === null && !this._hashDone) {
      this._hashDone = true;
      try {
        const hk = (window.location.hash || "").slice(1);
        const hi = PARENTS[PARENTS[this.props.col] ? this.props.col : "ceilings"].subs.indexOf(hk);
        if (hi >= 0) this.state.sub = hi;
        if (hk.indexOf("p=") === 0) {
          const pp = PARENTS[PARENTS[this.props.col] ? this.props.col : "ceilings"];
          const al = [];
          pp.subs.forEach(function (k3) {
            COLS[k3].products.forEach(function (x) {
              if (al.indexOf(x) < 0) al.push(x);
            });
          });
          const pi = al.indexOf(hk.slice(2));
          if (pi >= 0) {
            this.state.sub = -1;
            this.state.sel = pi;
          }
        }
      } catch (e) {}
    }
    let si =
      this.state.sub !== null
        ? this.state.sub
        : this.props.sub !== undefined && this.props.sub !== null
          ? Math.min(Math.max(this.props.sub, 0), par.subs.length - 1)
          : -1;
    if (si < 0 && !(this.state.sel >= 0)) {
      si = 0;
      this.state.sub = 0;
    }
    const allP = [];
    par.subs.forEach(function (k) {
      COLS[k].products.forEach(function (pk) {
        if (allP.indexOf(pk) < 0) allP.push(pk);
      });
    });
    const sk = si < 0 ? "__all" : par.subs[si];
    let d = si < 0 ? { desc: par.desc, products: allP, small: true, img: "" } : COLS[sk];
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
    let cur = this.state.coll || "";
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
      ? [{ name: "", label: "All" }]
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
      return k === "__all" ? "All" : par.labels[k] || COLS[k].name;
    };
    const c = { name: par.name, tag: par.tag, desc: par.desc, hasImg: !!par.img, img: U(par.img), alt: par.alt };
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
    const xi = this.state.sel;
    const st0 = this.state;
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
      const info = SPECIAL[k] || FAM[p[1]] || { d: "" };
      sel = {
        title: p[0],
        label: si < 0 ? par.name : par.name + " · " + lab(sk),
        hasImg: !!p[2],
        img: U(p[4] || p[2]),
        hasImg2: !!p[5],
        img2: U(p[5]),
        alt: p[0] + ": " + p[3],
        desc: info.d,
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
      return { name: PARENTS[k2].name, href: "/" + PARENTS[k2].file.toLowerCase() };
    });
    const zOpenC = st0.zi !== null && sel.galList.length > 0,
      selOpen = xi >= 0 && xi < n;
    self._onKey = function (e) {
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
    try {
      document.body.style.overflow = selOpen || st0.listOpen ? "hidden" : "";
    } catch (e) {}
    let pItem = null;
    let zItem = null;
    if (xi >= 0 && xi < n) {
      const pk0 = d.products[xi];
      pItem = { id: "p:" + pk0, name: P[pk0][0], kind: par.name, img: U(P[pk0][2]) };
    }
    if (st0.zi !== null && sel.galList[st0.zi])
      zItem = {
        id: "img:" + sel.galList[st0.zi].img,
        name: sel.galList[st0.zi].name,
        kind: sel.title,
        img: sel.galList[st0.zi].img,
      };
    const zs = saveVals(self, "zSave", zItem, "Save");
    if (zItem && listHasId(zItem.id)) zs.zSaveLbl = "Saved";
    return Object.assign(listVals(self), saveVals(self, "pSave", pItem), zs, {
      c: c,
      s: s,
      tabs: tabs,
      colls: colls,
      hasColls: hasColls,
      collLabel: "Collection",
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
    });
  }
}

Component.I18N_EN = I18N_EN;

Component.prototype.renderVals = function () {
  const selfp = this;
  if (!selfp._ifoInit) {
    selfp._ifoInit = true;
    try {
      const hp = function () {
        selfp.setState({ _ifo: Date.now() });
      };
      window.addEventListener("indigoff-open", hp);
      window.addEventListener("storage", hp);
      window.addEventListener("focus", hp);
      window.addEventListener("hashchange", function () {
        selfp._hashDone = false;
        selfp.state.sub = null;
        hp();
      });
    } catch (e) {}
    try {
      document.addEventListener(
        "click",
        function (e) {
          const a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
          if (!a) return;
          const h = a.getAttribute("href") || "";
          if (
            /(^|\/)(Main\.dc\.html|Downloads\.dc\.html|FindRep\.dc\.html)/.test(h) ||
            /^\/?(downloads|find-a-rep)?$/.test(h)
          ) {
            selfp.setState({ sub: -1, sel: -1, zi: null, coll: "", listOpen: false });
          }
        },
        true,
      );
    } catch (e) {}
  }
  try {
    const raw = window.localStorage.getItem("indigoff_open"),
      po = raw ? JSON.parse(raw) : window.__indigoffOpen || null;
    const colKey = PARENTS[selfp.props.col] ? selfp.props.col : "ceilings";
    if (po && po.col === colKey && Date.now() - po.t < 120000) {
      window.localStorage.removeItem("indigoff_open");
      try {
        window.__indigoffOpen = null;
      } catch (e) {}
      const pp = PARENTS[colKey];
      if (po.slug) {
        const al = [];
        pp.subs.forEach(function (k3) {
          COLS[k3].products.forEach(function (x) {
            if (al.indexOf(x) < 0) al.push(x);
          });
        });
        const pi = al.indexOf(po.slug);
        if (pi >= 0) {
          selfp.state.sub = -1;
          selfp.state.sel = pi;
          selfp.state.zi = null;
          selfp.state.listOpen = false;
        }
      } else if (po.sub) {
        const si2 = pp.subs.indexOf(po.sub);
        if (si2 >= 0) {
          selfp.state.sub = si2;
          selfp.state.sel = -1;
          selfp.state.zi = null;
        }
      } else if (po.reset) {
        selfp.state.sub = -1;
        selfp.state.sel = -1;
        selfp.state.zi = null;
        selfp.state.coll = "";
        selfp.state.listOpen = false;
      }
    }
  } catch (e) {}
  return DCLogic.prototype.renderVals.call(this);
};

Component.defaultProps = { col: "ceilings" };
Component.template = function (v, self) {
  return (
    <>
      <div
        style={S(
          "font-family: 'IBM Plex Sans', system-ui, sans-serif; font-weight: 300; color: #111111; background: #FFFFFF; font-size: 15px; line-height: 1.7",
        )}
      >
        <a className="skip" href="#content">
          {v.T.k1}
        </a>
        <header className="site-hd" style={S("border-bottom: 1px solid #ECE9E4; background: #FFFFFF")}>
          <div
            className="hd-in"
            style={S(
              "max-width: 1440px; margin: 0 auto; padding: 22px var(--gutter); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 32px",
            )}
          >
            <a
              href="/"
              className="hd-l hd-back"
              aria-label={v.T.k2}
              style={S(
                "flex: 1 1 260px; color: #111111; text-decoration: none; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase",
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
                <span className="hd-back-lbl">{v.T.k2}</span>
              </span>
            </a>
            <a
              href="/"
              className="hd-logo"
              style={S(
                "flex: 0 0 auto; color: #111111; text-decoration: none; font-family: Urbanist, sans-serif; font-weight: 600; font-size: 26px; letter-spacing: -0.03em",
              )}
            >
              <img
                src="/img/b8490b0b60f4124ee84a155bef6bdda9.svg"
                alt="indigoff"
                style={S("display: block; height: 24px; width: auto")}
              />
            </a>
            <div
              className="hd-r"
              style={S(
                "flex: 1 1 260px; display: flex; align-items: center; justify-content: flex-end; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase",
              )}
            >
              <span
                className="hd-lang"
                style={S("margin-right: 24px; display: inline-flex; align-items: center; gap: 2px; color: #6B675F")}
              >
                <button
                  type="button"
                  onClick={v.setEn}
                  aria-pressed={v.isEn}
                  aria-label="English"
                  style={S(
                    `min-height: 44px; padding: 0 4px; border: 0; background: transparent; cursor: pointer; font: inherit; letter-spacing: inherit; text-transform: inherit; color: ${v.enColor}`,
                  )}
                >
                  {"EN"}
                </button>
                <span aria-hidden="true">{"·"}</span>
                <button
                  type="button"
                  onClick={v.setEs}
                  aria-pressed={v.isEs}
                  aria-label="Español"
                  style={S(
                    `min-height: 44px; padding: 0 4px; border: 0; background: transparent; cursor: pointer; font: inherit; letter-spacing: inherit; text-transform: inherit; color: ${v.esColor}`,
                  )}
                >
                  {"ES"}
                </button>
              </span>
              <a
                href="/downloads"
                className="hd-dl"
                aria-label={v.T.k10}
                style={S("margin-right: 28px; color: #111111; text-decoration: none")}
              >
                <svg
                  className="hd-ico"
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14"></path>
                </svg>
                <span className="hd-dl-lbl">{v.T.k10}</span>
              </a>
              <button
                type="button"
                onClick={v.openList}
                className="hd-list"
                aria-label={v.T.k14 + " (" + v.listCount + ")"}
                style={S(
                  "min-height: 44px; padding: 0; border: 0; background: transparent; cursor: pointer; font: inherit; letter-spacing: inherit; text-transform: inherit; color: #111111; margin-right: 28px",
                )}
              >
                <svg
                  className="hd-ico"
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                >
                  <path d="M6 3.5h12v17l-6-4.2-6 4.2z"></path>
                </svg>
                <span className="hd-list-lbl">
                  {v.T.k14}
                  {" ("}
                </span>
                <span className="hd-list-n">{v.listCount}</span>
                <span className="hd-list-lbl">{")"}</span>
              </button>
              <a href="mailto:info@indigoff.com" className="hd-opt" style={S("color: #111111; text-decoration: none")}>
                {v.T.k3}
              </a>
            </div>
          </div>
        </header>
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
            aria-label="Subcategories"
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
              <nav aria-label="Collections" className="cl-row">
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
                    <button type="button" onClick={p.pick} aria-label={`View ${p.name}`} style={S(v.s.tileStyle)}>
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
                      aria-label={`${v.s.label} photo placeholder`}
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
            {v.T.k4}
          </p>
          <div style={S("display: flex; flex-wrap: wrap; justify-content: center; gap: 12px")}>
            <a
              href="/find-a-rep"
              style={S(
                "display: inline-flex; align-items: center; min-height: 48px; padding: 0 36px; background: #645DC5; color: #FFFFFF; text-decoration: none; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
              )}
            >
              {v.T.k5}
            </a>
            <a
              href="/#acoustics"
              style={S(
                "display: inline-flex; align-items: center; min-height: 48px; padding: 0 36px; border: 1px solid #111111; color: #111111; text-decoration: none; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
              )}
            >
              {v.T.k6}
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
            {v.T.k7}
          </h2>
          <nav
            aria-label="More categories"
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
            {v.T.k8}
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
                    {v.T.k9}
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
                    aria-label="Previous image"
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
                    aria-label="Next image"
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
                        {v.T.k9}
                      </span>
                    </button>
                  </span>
                  <a href="/" aria-label="Indigoff home" style={S("display: block")}>
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
                            aria-label={`View ${g.name}`}
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
                    <section aria-label="Downloads" style={S("margin-top: calc(88px * var(--vs)); text-align: left")}>
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
                          {v.T.k10}
                        </h2>
                        <a
                          href="/downloads"
                          style={S(
                            "font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #6B675F",
                          )}
                        >
                          <span style={S("display: inline-flex; align-items: center; gap: 8px")}>
                            {v.T.k11}
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
                                {v.T.k12}
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
                      {v.T.k13}
                    </p>
                  </>
                ) : null}
                {v.sel.hasImg2 ? (
                  <>
                    <img
                      src={v.sel.img2}
                      alt={`${v.sel.title} — second view`}
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
              aria-label="My list"
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
                        {v.T.k9}
                      </span>
                    </button>
                  </span>
                  <a href="/" aria-label="Indigoff home" style={S("display: block")}>
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
                    {v.T.k14}
                  </h1>
                  <p
                    style={S(
                      "margin: 0 auto 48px; max-width: 560px; font-size: 17px; line-height: 1.7; color: #3A3935",
                    )}
                  >
                    {v.T.k15}
                  </p>
                </div>
                {v.listEmpty ? (
                  <>
                    <p
                      style={S(
                        "margin: 0 auto; padding: 64px 24px; max-width: 520px; text-align: center; background: #F4F1EB; font-size: 15px; color: #5E5A53",
                      )}
                    >
                      {v.T.k16}
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
                        {v.T.k17}
                      </a>
                      <a
                        href={v.listMail}
                        style={S(
                          "display: inline-flex; align-items: center; min-height: 48px; padding: 0 28px; border: 1px solid #111111; color: #111111; text-decoration: none; J",
                        )}
                      >
                        {v.T.k18}
                      </a>
                      <button
                        type="button"
                        onClick={v.clearList}
                        style={S(
                          "min-height: 48px; padding: 0 20px; border: 0; background: transparent; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #6B675F",
                        )}
                      >
                        {v.T.k19}
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
                              {v.T.k20}
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
};

export default Component;
