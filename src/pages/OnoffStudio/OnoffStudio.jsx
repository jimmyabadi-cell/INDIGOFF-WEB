import React from "react";
import { DCLogic, S } from "../../lib/dc.js";
import { DW_CATS, DW_FIN, ifoSetPending } from "../../lib/nav.js";
import "./OnoffStudio.css";

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

import D from "../../data/studio.json";
const ON_TXT = D.txt;
const ON_SV = D.sv;
const ON_STEPS = D.steps;
const ON_DES = D.designs;

class Component extends DCLogic {
  constructor(p) {
    super(p);
    this.state = {};
  }
  _rv() {
    const on = Object.assign({}, ON_TXT);
    on.services = ON_SV.map(function (x) {
      return { n: x[0], t: x[1], d: x[2] };
    });
    on.steps = ON_STEPS.map(function (x) {
      return { n: x[0], t: x[1], d: x[2] };
    });
    on.designs = ON_DES.map(function (d) {
      var href = "/lights#p=" + d.slug;
      return {
        name: d.name,
        kind: d.kind,
        img: d.img,
        href: href,
        go: function () {
          ifoSetPending(href);
        },
      };
    });
    return { on: on };
  }
}

Component.I18N_EN = I18N_EN;
Component.DW_CATS = DW_CATS;
Component.DW_FIN = DW_FIN;
Component.ifoSetPending = ifoSetPending;

Component.defaultProps = {};
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
            <nav
              aria-label="Main"
              className="hd-l"
              style={S(
                "flex: 1 1 380px; display: flex; align-items: center; flex-wrap: wrap; gap: 4px 28px; font-family: Urbanist, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase",
              )}
            >
              <button
                type="button"
                onClick={v.openMenu}
                aria-haspopup="dialog"
                aria-expanded={v.menuOnStr}
                className="hd-menu"
                aria-label={v.dwMenuLbl}
              >
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
                  <path d="M3 7h18M3 12h18M3 17h18"></path>
                </svg>
                <span>{v.dwMenuLbl}</span>
              </button>
              <a href="/downloads" className="hd-dl" aria-label={v.T.k5}>
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
                <span className="hd-dl-lbl">{v.T.k5}</span>
              </a>
            </nav>
            <a
              href="/"
              className="hd-logo"
              style={S(
                "flex: 0 0 auto; font-family: Urbanist, sans-serif; font-weight: 600; font-size: 26px; letter-spacing: -0.03em",
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
                "flex: 1 1 380px; display: flex; flex-wrap: wrap; justify-content: flex-end; align-items: center; gap: 4px 20px; font-family: Urbanist, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase",
              )}
            >
              <span
                className="hd-lang"
                style={S("display: inline-flex; align-items: center; gap: 2px; color: #6B675F")}
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
              <a href="/find-a-rep" className="hd-opt">
                {v.T.k6}
              </a>
            </div>
          </div>
        </header>
        <section
          id="content"
          style={S(
            "position: relative; height: min(78vh, 760px); min-height: 520px; overflow: hidden; background: #1A1714; color: #FFFFFF",
          )}
        >
          <img
            src="/img/9d3fd937d8ba1cc27ab5015f8b0f82c6.jpg"
            alt="Acoustic leaf canopy with integrated light over a lounge"
            style={S("position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover")}
          />
          <div
            aria-hidden="true"
            style={S(
              "position: absolute; inset: 0; background: linear-gradient(180deg, rgba(17,15,12,.15) 0%, rgba(17,15,12,.55) 100%)",
            )}
          ></div>
          <div
            style={S(
              "position: relative; height: 100%; max-width: 1440px; margin: 0 auto; padding: 0 var(--gutter) calc(72px * var(--vs)); box-sizing: border-box; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; text-align: center",
            )}
          >
            <p
              style={S(
                "margin: 0 0 16px; font-family: Urbanist, sans-serif; font-weight: 500; font-size: 18px; letter-spacing: 0.02em",
              )}
            >
              {"onoff studio"}
            </p>
            <h1
              style={S(
                "margin: 0 0 18px; max-width: 900px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(40px, 5.4vw, 76px); line-height: 1; letter-spacing: -0.04em",
              )}
            >
              {v.on.h1}
            </h1>
            <p style={S("margin: 0; max-width: 560px; font-size: 17px; color: #EDE8E0")}>{v.on.sub}</p>
          </div>
        </section>
        <section style={S("max-width: 1440px; margin: 0 auto; padding: calc(120px * var(--vs)) var(--gutter) 0")}>
          <div style={S("display: flex; flex-wrap: wrap; gap: 48px 80px; align-items: flex-start")}>
            <h2
              style={S(
                "flex: 1 1 380px; margin: 0; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(30px, 3.2vw, 46px); line-height: 1.08; letter-spacing: -0.035em",
              )}
            >
              {v.on.whatH}
            </h2>
            <div style={S("flex: 1 1 460px; min-width: 0")}>
              <p style={S("margin: 0 0 18px; font-size: 17px; color: #3A3935")}>{v.on.whatP1}</p>
              <p style={S("margin: 0; font-size: 17px; color: #3A3935")}>{v.on.whatP2}</p>
            </div>
          </div>
        </section>
        <section style={S("max-width: 1440px; margin: 0 auto; padding: calc(96px * var(--vs)) var(--gutter) 0")}>
          <div
            style={S(
              "display: grid; grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr)); border-top: 1px solid #ECE9E4",
            )}
          >
            {(v.on.services || []).map((sv, sv__i) => (
              <React.Fragment key={sv__i}>
                <div style={S("padding: 36px 28px 40px 0; border-bottom: 1px solid #ECE9E4")}>
                  <span
                    className="tnum"
                    style={S(
                      "display: block; margin: 0 0 18px; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; color: #645DC5",
                    )}
                  >
                    {sv.n}
                  </span>
                  <h3
                    style={S(
                      "margin: 0 0 10px; font-family: Urbanist, sans-serif; font-weight: 400; font-size: 22px; letter-spacing: -0.02em",
                    )}
                  >
                    {sv.t}
                  </h3>
                  <p style={S("margin: 0; font-size: 15px; color: #5E5A53")}>{sv.d}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>
        <section style={S("margin: calc(120px * var(--vs)) 0 0; background: #F4F1EB")}>
          <div style={S("max-width: 1440px; margin: 0 auto; padding: calc(96px * var(--vs)) var(--gutter)")}>
            <h2
              style={S(
                "margin: 0 0 56px; text-align: center; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(30px, 3.2vw, 46px); letter-spacing: -0.035em",
              )}
            >
              {v.on.procH}
            </h2>
            <ol
              style={S(
                "list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr)); gap: 40px 32px",
              )}
            >
              {(v.on.steps || []).map((st, st__i) => (
                <React.Fragment key={st__i}>
                  <li style={S("text-align: center")}>
                    <span
                      className="tnum"
                      style={S(
                        "display: block; margin: 0 0 14px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: 44px; line-height: 1; color: #645DC5",
                      )}
                    >
                      {st.n}
                    </span>
                    <h3
                      style={S("margin: 0 0 8px; font-family: Urbanist, sans-serif; font-weight: 400; font-size: 20px")}
                    >
                      {st.t}
                    </h3>
                    <p style={S("margin: 0 auto; max-width: 280px; font-size: 15px; color: #5E5A53")}>{st.d}</p>
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </div>
        </section>
        <section
          id="designs"
          style={S("max-width: 1440px; margin: 0 auto; padding: calc(120px * var(--vs)) var(--gutter) 0")}
        >
          <div style={S("text-align: center; margin: 0 auto 48px; max-width: 640px")}>
            <h2
              style={S(
                "margin: 0 0 12px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(30px, 3.2vw, 46px); letter-spacing: -0.035em",
              )}
            >
              {v.on.desH}
            </h2>
            <p style={S("margin: 0; color: #5E5A53")}>{v.on.desP}</p>
          </div>
          <div
            style={S(
              "display: grid; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr)); gap: 40px 8px",
            )}
          >
            {(v.on.designs || []).map((d, d__i) => (
              <React.Fragment key={d__i}>
                <a
                  href={d.href}
                  onClick={d.go}
                  style={S("display: flex; flex-direction: column; gap: 12px; color: #111111")}
                >
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    decoding="async"
                    style={S(
                      "display: block; width: 100%; aspect-ratio: 4 / 5; height: auto; object-fit: cover; background: #EEEBE6",
                    )}
                  />
                  <span
                    style={S(
                      "display: block; text-align: center; font-size: 12px; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase",
                    )}
                  >
                    {d.name}
                  </span>
                  <span
                    style={S("display: block; margin-top: -8px; text-align: center; font-size: 13px; color: #6B675F")}
                  >
                    {d.kind}
                  </span>
                </a>
              </React.Fragment>
            ))}
          </div>
        </section>
        <section
          style={S(
            "max-width: 1440px; margin: 0 auto; padding: calc(140px * var(--vs)) var(--gutter) calc(160px * var(--vs)); text-align: center",
          )}
        >
          <h2
            style={S(
              "margin: 0 auto 16px; max-width: 720px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(32px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
            )}
          >
            {v.on.ctaH}
          </h2>
          <p style={S("margin: 0 auto 36px; max-width: 520px; color: #5E5A53")}>{v.on.ctaP}</p>
          <div style={S("display: flex; flex-wrap: wrap; justify-content: center; gap: 12px")}>
            <a
              href="/#contact"
              style={S(
                "display: inline-flex; align-items: center; min-height: 52px; padding: 0 min(32px, var(--gutter)); background: #111111; color: #FFFFFF; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase",
              )}
            >
              {v.on.cta1}
            </a>
            <a
              href="/find-a-rep"
              style={S(
                "display: inline-flex; align-items: center; min-height: 52px; padding: 0 min(32px, var(--gutter)); border: 1px solid #111111; color: #111111; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase",
              )}
            >
              {v.on.cta2}
            </a>
          </div>
        </section>
        <footer style={S("border-top: 1px solid #ECE9E4; background: #F4F1EB")}>
          <div
            style={S(
              "max-width: 1440px; margin: 0 auto; padding: 48px var(--gutter); display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
            )}
          >
            <span>{"© Indigoff"}</span>
            <a href="/" style={S("color: #6B675F")}>
              {v.T.k13}
            </a>
          </div>
        </footer>
        {v.menuOn ? (
          <>
            <div className="dw-back" onClick={v.closeMenu}></div>
            <aside className="dw" role="dialog" aria-modal="true" aria-label={v.dwMenu}>
              <div className="dw-hd">
                <button type="button" onClick={v.closeMenu} className="dw-x">
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
                  <span>{v.dwClose}</span>
                </button>
                <img
                  src="/img/b8490b0b60f4124ee84a155bef6bdda9.svg"
                  alt="indigoff"
                  style={S("display: block; height: 20px; width: auto")}
                />
              </div>
              <div className="dw-body">
                <p className="dw-g">{v.dwCat}</p>
                {(v.dwCats || []).map((m, m__i) => (
                  <React.Fragment key={m__i}>
                    <div className="dw-item">
                      <a href={m.href} onClick={v.closeMenu} className="dw-big">
                        {m.name}
                      </a>
                      <div className="dw-subs">
                        {(m.subs || []).map((u, u__i) => (
                          <React.Fragment key={u__i}>
                            <a href={u.href} onClick={u.go} className="dw-sub">
                              {u.label}
                            </a>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
                <p className="dw-g">{v.dwFin}</p>
                <div className="dw-subs dw-fin">
                  {(v.dwFins || []).map((m, m__i) => (
                    <React.Fragment key={m__i}>
                      {m.isBtn ? (
                        <>
                          <button type="button" onClick={m.go} className="dw-mid">
                            {m.name}
                          </button>
                        </>
                      ) : null}
                      {m.isLink ? (
                        <>
                          <a href={m.href} className="dw-mid">
                            {m.name}
                          </a>
                        </>
                      ) : null}
                    </React.Fragment>
                  ))}
                </div>
                <div className="dw-two">
                  <a href={v.dwConHref} onClick={v.closeMenu} className="dw-big">
                    {v.dwCon}
                  </a>
                  <a href={v.dwProHref} onClick={v.closeMenu} className="dw-big">
                    {v.dwPro}
                  </a>
                  <a href="/onoff-studio" onClick={v.closeMenu} className="dw-big">
                    {"onoff studio"}
                  </a>
                </div>
                <div className="dw-util">
                  <a href="/downloads" onClick={v.closeMenu}>
                    {v.T.k5}
                  </a>
                  <a href="/find-a-rep" onClick={v.closeMenu}>
                    {v.T.k6}
                  </a>
                </div>
              </div>
            </aside>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Component;
