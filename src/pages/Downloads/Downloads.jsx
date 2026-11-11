import React, { useState } from "react";
import { S } from "../../lib/dc.js";
import { DW_CATS, DW_FIN, ifoSetPending } from "../../lib/nav.js";
import { usePageChrome } from "../../hooks/usePageChrome.js";
import "./Downloads.css";
import { imgProps, SIZES } from "../../lib/images.js";

import D from "../../data/downloads.json";
import SiteHeader from "../../components/layout/SiteHeader.jsx";
import SideMenu from "../../components/layout/SideMenu.jsx";
import CompactFooter from "../../components/layout/CompactFooter.jsx";
import css from "./Downloads.module.css";
const ALL = "all";
const CATS = [ALL, "ceilings", "walls", "lights", "dividers"];
const FMTS = [ALL, "DWG", "SKP", "3DM", "REVIT"];
const FMT_LABEL = { DWG: "DWG", SKP: "SKP", "3DM": "3DM", REVIT: "Revit" };
function tabStyle(on) {
  return (
    "min-height: 44px; padding: 0 0 4px; border: 0; border-bottom: 2px solid " +
    (on ? "#645DC5" : "transparent") +
    "; background: transparent; cursor: pointer; font-family: Urbanist, 'Futura', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: " +
    (on ? "#111111" : "#6B675F")
  );
}
function chipStyle(on) {
  return (
    "min-height: 32px; padding: 0 12px; border: 1px solid " +
    (on ? "#111111" : "#DCD8D1") +
    "; background: " +
    (on ? "#111111" : "transparent") +
    "; color: " +
    (on ? "#FFFFFF" : "#111111") +
    "; cursor: pointer; font-family: Urbanist, 'Futura', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase"
  );
}

const NAV = { DW_CATS, DW_FIN, ifoSetPending };

export default function Downloads() {
  const [cat, setCat] = useState(ALL);
  const [fmt, setFmt] = useState(ALL);
  const [query, setQuery] = useState("");
  const { chrome } = usePageChrome({ nav: NAV });
  const vals = downloadsVals({ t: chrome.t, cat, fmt, query, setCat, setFmt, setQuery });
  return template({ ...vals, ...chrome });
}

function downloadsVals({ t, cat, fmt, query, setCat, setFmt, setQuery }) {
  const subLabel = (p) => t("catalog.subcategories." + p.c + "." + p.s);
  const st = { cat, fmt, q: query };
  const q = (st.q || "").trim().toLowerCase();
  const groups = [];
  let total = 0,
    files = 0;
  CATS.slice(1).forEach(function (c) {
    if (st.cat !== ALL && st.cat !== c) return;
    const items = [];
    D.forEach(function (p) {
      if (p.c !== c) return;
      if (q && p.n.toLowerCase().indexOf(q) < 0 && subLabel(p).toLowerCase().indexOf(q) < 0) return;
      const fl = p.f.filter(function (f) {
        return st.fmt === ALL || f[0] === st.fmt;
      });
      if (!fl.length) return;
      files += fl.length;
      items.push({
        name: p.n,
        sub: subLabel(p),
        href: p.href,
        img: p.img,
        hasImg: !!p.img,
        noImg: !p.img,
        files: fl.map(function (f) {
          return { fmt: f[0] === "REVIT" ? "Revit" : f[0], name: f[1], size: f[2], href: f[3] };
        }),
      });
    });
    if (items.length) {
      total += items.length;
      groups.push({
        name: t("catalog.categories." + c),
        count: t("downloads.productCount", { count: items.length }),
        items: items,
      });
    }
  });
  return {
    groups: groups,
    empty: groups.length === 0,
    totals: t("downloads.productCount", { count: total }) + " · " + t("downloads.fileCount", { count: files }),
    q: st.q,
    cats: CATS.map(function (c) {
      const on = st.cat === c;
      return {
        label: c === ALL ? t("downloads.allCategories") : t("catalog.categories." + c),
        on: on ? "true" : "false",
        style: tabStyle(on),
        pick: function () {
          setCat(c);
        },
      };
    }),
    fmts: FMTS.map(function (f) {
      const on = st.fmt === f;
      return {
        label: f === ALL ? t("downloads.allFormats") : FMT_LABEL[f],
        on: on ? "true" : "false",
        style: chipStyle(on),
        pick: function () {
          setFmt(f);
        },
      };
    }),
    onQuery: function (e) {
      setQuery(e.target.value);
    },
  };
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
          labels={{ downloads: v.t("common.downloads"), findRep: v.t("common.findRep") }}
          current="downloads"
        />
        <section className={css.content} id="content">
          <h1 className={css.title}>{v.t("common.downloads")}</h1>
          <p className={css.text}>{v.t("downloads.intro")}</p>
          <p className={css.text2}>{v.totals}</p>
        </section>
        <section className={css.section}>
          <div className={css.box2}>
            <div role="tablist" aria-label={v.t("downloads.categoryLabel")} className={"scroll-tabs " + css.box3}>
              {(v.cats || []).map((t, t__i) => (
                <React.Fragment key={t__i}>
                  <button type="button" role="tab" aria-selected={t.on} onClick={t.pick} style={S(t.style)}>
                    {t.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
            <div className={css.box4}>
              {(v.fmts || []).map((t, t__i) => (
                <React.Fragment key={t__i}>
                  <button type="button" aria-pressed={t.on} onClick={t.pick} style={S(t.style)}>
                    {t.label}
                  </button>
                </React.Fragment>
              ))}
              <label className={css.field}>
                {v.t("downloads.search")}
                <input
                  className={css.input}
                  type="search"
                  placeholder={v.t("downloads.searchPlaceholder")}
                  value={v.q}
                  onChange={v.onQuery}
                />
              </label>
            </div>
          </div>
        </section>
        <section className={css.section2}>
          {v.empty ? (
            <>
              <p className={css.text3}>{v.t("downloads.empty")}</p>
            </>
          ) : null}
          {(v.groups || []).map((g, g__i) => (
            <React.Fragment key={g__i}>
              <div className={css.box5}>
                <div className={css.box6}>
                  <h2 className={css.heading}>{g.name}</h2>
                  <p className={css.text4}>{g.count}</p>
                </div>
                {(g.items || []).map((p, p__i) => (
                  <React.Fragment key={p__i}>
                    <div className={css.box7}>
                      <a className={css.link} href={p.href}>
                        {p.hasImg ? (
                          <>
                            <img
                              loading="lazy"
                              decoding="async"
                              className={css.image}
                              {...imgProps(p.img, SIZES.thumb)}
                              alt={p.name}
                            />
                          </>
                        ) : null}
                        {p.noImg ? (
                          <>
                            <span className={css.label}></span>
                          </>
                        ) : null}
                        <span className={css.label2}>
                          <span className={css.label3}>{p.name}</span>
                          <span className={css.label4}>{p.sub}</span>
                        </span>
                      </a>
                      <div className={css.box8}>
                        {(p.files || []).map((f, f__i) => (
                          <React.Fragment key={f__i}>
                            <a className={css.link2} href={f.href} download>
                              <span className={css.label5}>{f.fmt}</span>
                              <span className={css.label6}>{f.name}</span>
                              <span className={css.label7}>{f.size}</span>
                              <span className={css.label8}>
                                <span className={css.label9}>
                                  {v.t("downloads.download")}
                                  <svg
                                    className={css.icon}
                                    aria-hidden="true"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M12 4v13M6 11l6 6 6-6M5 20h14"></path>
                                  </svg>
                                </span>
                              </span>
                            </a>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          ))}
          <p className={css.text5}>{v.t("downloads.requestText")}</p>
          <p className={css.text6}>
            <a className={css.link3} href="/#specify">
              {v.t("downloads.requestCta")}
            </a>
          </p>
        </section>
        <CompactFooter
          homeLabel={v.t("common.backToHome")}
          legal={{ privacy: v.t("common.privacy"), terms: v.t("common.terms") }}
        />
        <SideMenu v={v} labels={{ downloads: v.t("common.downloads"), findRep: v.t("common.findRep") }} />
      </div>
    </>
  );
}
