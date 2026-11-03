import React, { useState } from "react";
import { S } from "../../lib/dc.js";
import { DW_CATS, DW_FIN, ifoSetPending } from "../../lib/nav.js";
import { localize, usePageChrome } from "../../hooks/usePageChrome.js";
import "./Downloads.css";

const I18N_EN = {
  k1: "Skip to content",
  k2: "Categories",
  k3: "Concepts",
  k4: "Projects",
  k5: "Downloads",
  k6: "Find a rep",
  k7: "CAD, SketchUp, Rhino and Revit files for every Indigoff product — ready to drop into your project.",
  k8: "Search",
  k9: "No files match your search.",
  k10: "Download",
  k11: "Need a format or size that isn't listed? Our team prepares CAD and BIM files on request.",
  k12: "Request a file",
  k13: "Back to home",
  k14: "Product name",
};

import D from "../../data/downloads.json";
import SiteHeader from "../../components/layout/SiteHeader.jsx";
import SideMenu from "../../components/layout/SideMenu.jsx";
import CompactFooter from "../../components/layout/CompactFooter.jsx";
const CATS = ["All", "Ceilings", "Walls", "Lights", "Dividers"];
const FMTS = ["All", "DWG", "SKP", "3DM", "REVIT"];
const FMT_LABEL = { All: "All formats", DWG: "DWG", SKP: "SKP", "3DM": "3DM", REVIT: "Revit" };
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
  const [cat, setCat] = useState("All");
  const [fmt, setFmt] = useState("All");
  const [query, setQuery] = useState("");
  const { lang, chrome } = usePageChrome(I18N_EN, { nav: NAV });
  const vals = downloadsVals({ cat, fmt, query, setCat, setFmt, setQuery });
  return template({ ...localize(vals, lang), ...chrome });
}

function downloadsVals({ cat, fmt, query, setCat, setFmt, setQuery }) {
  const st = { cat, fmt, q: query };
  const q = (st.q || "").trim().toLowerCase();
  const groups = [];
  let total = 0,
    files = 0;
  CATS.slice(1).forEach(function (c) {
    if (st.cat !== "All" && st.cat !== c) return;
    const items = [];
    D.forEach(function (p) {
      if (p.c !== c) return;
      if (q && p.n.toLowerCase().indexOf(q) < 0 && p.s.toLowerCase().indexOf(q) < 0) return;
      const fl = p.f.filter(function (f) {
        return st.fmt === "All" || f[0] === st.fmt;
      });
      if (!fl.length) return;
      files += fl.length;
      items.push({
        name: p.n,
        sub: p.s,
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
      groups.push({ name: c, count: items.length + (items.length === 1 ? " product" : " products"), items: items });
    }
  });
  return {
    groups: groups,
    empty: groups.length === 0,
    totalProducts: total,
    totalFiles: files,
    q: st.q,
    cats: CATS.map(function (c) {
      const on = st.cat === c;
      return {
        label: c,
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
        label: FMT_LABEL[f],
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
      <div
        style={S(
          "font-family: 'IBM Plex Sans', system-ui, sans-serif; font-weight: 300; color: #111111; background: #FFFFFF; font-size: 15px; line-height: 1.7",
        )}
      >
        <a className="skip" href="#content">
          {v.T.k1}
        </a>
        <SiteHeader v={v} labels={{ downloads: v.T.k5, findRep: v.T.k6 }} current="downloads" />
        <section
          id="content"
          style={S(
            "max-width: 1440px; margin: 0 auto; padding: calc(120px * var(--vs)) var(--gutter) 64px; text-align: center",
          )}
        >
          <h1
            style={S(
              "margin: 0 0 24px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(44px, 6vw, 88px); line-height: 1; letter-spacing: -0.04em",
            )}
          >
            {v.T.k5}
          </h1>
          <p style={S("margin: 0 auto; max-width: 560px; font-size: 18px; color: #3A3935")}>{v.T.k7}</p>
          <p
            style={S(
              "margin: 28px 0 0; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
            )}
          >
            {v.totalProducts}
            {" products · "}
            {v.totalFiles}
            {" files"}
          </p>
        </section>
        <section
          style={S(
            "position: sticky; top: calc(var(--hd-h) - 1px); z-index: 2; background: #FFFFFF; border-top: 1px solid #ECE9E4; border-bottom: 1px solid #ECE9E4",
          )}
        >
          <div
            style={S(
              "max-width: 1440px; margin: 0 auto; padding: 16px var(--gutter); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 40px",
            )}
          >
            <div
              role="tablist"
              aria-label="Category"
              className="scroll-tabs"
              style={S("display: flex; flex-wrap: wrap; gap: 4px 28px")}
            >
              {(v.cats || []).map((t, t__i) => (
                <React.Fragment key={t__i}>
                  <button type="button" role="tab" aria-selected={t.on} onClick={t.pick} style={S(t.style)}>
                    {t.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
            <div style={S("display: flex; flex-wrap: wrap; align-items: center; gap: 4px 20px")}>
              {(v.fmts || []).map((t, t__i) => (
                <React.Fragment key={t__i}>
                  <button type="button" aria-pressed={t.on} onClick={t.pick} style={S(t.style)}>
                    {t.label}
                  </button>
                </React.Fragment>
              ))}
              <label
                style={S(
                  "display: flex; align-items: center; gap: 12px; margin-left: 12px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
                )}
              >
                {v.T.k8}
                <input
                  type="search"
                  placeholder={v.T.k14}
                  value={v.q}
                  onChange={v.onQuery}
                  style={S(
                    "width: 200px; min-height: 40px; border: 0; border-bottom: 1px solid #111111; background: transparent; font-family: 'IBM Plex Sans', sans-serif; font-size: 15px; font-weight: 300; letter-spacing: 0; text-transform: none; color: #111111; padding: 0 2px",
                  )}
                />
              </label>
            </div>
          </div>
        </section>
        <section style={S("max-width: 1440px; margin: 0 auto; padding: 24px var(--gutter) calc(160px * var(--vs))")}>
          {v.empty ? (
            <>
              <p style={S("margin: calc(96px * var(--vs)) 0; text-align: center; font-size: 18px; color: #6B675F")}>
                {v.T.k9}
              </p>
            </>
          ) : null}
          {(v.groups || []).map((g, g__i) => (
            <React.Fragment key={g__i}>
              <div style={S("padding-top: calc(72px * var(--vs))")}>
                <div
                  style={S(
                    "display: flex; align-items: baseline; justify-content: space-between; gap: 16px; padding-bottom: 18px; border-bottom: 1px solid #111111",
                  )}
                >
                  <h2
                    style={S(
                      "margin: 0; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(30px, 3vw, 44px); line-height: 1.1; letter-spacing: -0.04em",
                    )}
                  >
                    {g.name}
                  </h2>
                  <p
                    style={S(
                      "margin: 0; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
                    )}
                  >
                    {g.count}
                  </p>
                </div>
                {(g.items || []).map((p, p__i) => (
                  <React.Fragment key={p__i}>
                    <div
                      style={S(
                        "display: flex; flex-wrap: wrap; gap: 20px 40px; padding: 28px 0; border-bottom: 1px solid #ECE9E4",
                      )}
                    >
                      <a
                        href={p.href}
                        style={S("flex: 1 1 300px; display: flex; gap: 20px; align-items: center; min-width: 0")}
                      >
                        {p.hasImg ? (
                          <>
                            <img
                              src={p.img}
                              alt={p.name}
                              loading="lazy"
                              style={S(
                                "flex: 0 0 72px; width: 72px; aspect-ratio: 4 / 5; height: auto; object-fit: cover; background: #F4F1EB",
                              )}
                            />
                          </>
                        ) : null}
                        {p.noImg ? (
                          <>
                            <span
                              style={S("flex: 0 0 72px; width: 72px; aspect-ratio: 4 / 5; background: #EEEBE6")}
                            ></span>
                          </>
                        ) : null}
                        <span style={S("display: flex; flex-direction: column; min-width: 0")}>
                          <span
                            style={S(
                              "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 26px; line-height: 1.15; letter-spacing: -0.03em",
                            )}
                          >
                            {p.name}
                          </span>
                          <span
                            style={S(
                              "margin-top: 6px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
                            )}
                          >
                            {p.sub}
                          </span>
                        </span>
                      </a>
                      <div style={S("flex: 2 1 520px; min-width: 0")}>
                        {(p.files || []).map((f, f__i) => (
                          <React.Fragment key={f__i}>
                            <a
                              href={f.href}
                              download
                              style={S(
                                "display: flex; flex-wrap: wrap; align-items: center; gap: 4px 20px; min-height: 52px; padding: 10px 0; border-bottom: 1px solid #F1EEE9; color: #111111",
                              )}
                            >
                              <span
                                style={S(
                                  "flex: 0 0 64px; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px",
                                )}
                              >
                                {f.fmt}
                              </span>
                              <span
                                style={S("flex: 1 1 200px; min-width: 0; font-size: 15px; overflow-wrap: anywhere")}
                              >
                                {f.name}
                              </span>
                              <span style={S("flex: 0 0 auto; font-size: 13px; color: #6B675F")}>{f.size}</span>
                              <span
                                style={S(
                                  "flex: 0 0 auto; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; font-size: 11px",
                                )}
                              >
                                <span style={S("display: inline-flex; align-items: center; gap: 8px")}>
                                  {v.T.k10}
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
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          ))}
          <p
            style={S(
              "margin: calc(96px * var(--vs)) auto 0; max-width: 520px; text-align: center; font-size: 15px; color: #5E5A53",
            )}
          >
            {v.T.k11}
          </p>
          <p style={S("margin: 28px 0 0; text-align: center")}>
            <a
              href="/#specify"
              style={S(
                "display: inline-flex; align-items: center; min-height: 48px; padding: 0 36px; background: #645DC5; color: #FFFFFF; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
              )}
            >
              {v.T.k12}
            </a>
          </p>
        </section>
        <CompactFooter homeLabel={v.T.k13} />
        <SideMenu v={v} labels={{ downloads: v.T.k5, findRep: v.T.k6 }} />
      </div>
    </>
  );
}
