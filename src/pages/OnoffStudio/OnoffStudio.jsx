import React from "react";
import { S } from "../../lib/dc.js";
import { DW_CATS, DW_FIN, ifoSetPending } from "../../lib/nav.js";
import { usePageChrome } from "../../hooks/usePageChrome.js";
import "./OnoffStudio.css";

import D from "../../data/studio.json";
import SiteHeader from "../../components/layout/SiteHeader.jsx";
import SideMenu from "../../components/layout/SideMenu.jsx";
import CompactFooter from "../../components/layout/CompactFooter.jsx";
const ON_DES = D.designs;

const NAV = { DW_CATS, DW_FIN, ifoSetPending };

const pad = (i) => String(i + 1).padStart(2, "0");

function studioVals(t) {
  const on = {
    eyebrow: t("studio.hero.eyebrow"),
    h1: t("studio.hero.title"),
    sub: t("studio.hero.subtitle"),
    heroAlt: t("studio.hero.imageAlt"),
    whatH: t("studio.what.title"),
    whatP1: t("studio.what.p1"),
    whatP2: t("studio.what.p2"),
    procH: t("studio.process.title"),
    desH: t("studio.designs.title"),
    desP: t("studio.designs.text"),
    ctaH: t("studio.cta.title"),
    ctaP: t("studio.cta.text"),
    cta1: t("studio.cta.start"),
    cta2: t("common.talkToRep"),
  };
  on.services = t("studio.services").map((x, i) => ({ n: pad(i), t: x.title, d: x.text }));
  on.steps = t("studio.process.steps").map((x, i) => ({ n: pad(i), t: x.title, d: x.text }));
  on.designs = ON_DES.map((d) => {
    const href = "/lights#p=" + d.slug;
    return {
      name: d.name,
      kind: t("common.lightKinds." + d.kind),
      img: d.img,
      href: href,
      go: () => ifoSetPending(href),
    };
  });
  return { on: on };
}

export default function OnoffStudio() {
  const { chrome } = usePageChrome({ nav: NAV });
  return template({ ...studioVals(chrome.t), ...chrome });
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
        <SiteHeader v={v} labels={{ downloads: v.t("common.downloads"), findRep: v.t("common.findRep") }} />
        <section
          id="content"
          style={S(
            "position: relative; height: min(78vh, 760px); min-height: 520px; overflow: hidden; background: #1A1714; color: #FFFFFF",
          )}
        >
          <img
            src="/img/9d3fd937d8ba1cc27ab5015f8b0f82c6.jpg"
            alt={v.on.heroAlt}
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
              {v.on.eyebrow}
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
        <CompactFooter homeLabel={v.t("common.backToHome")} />
        <SideMenu v={v} labels={{ downloads: v.t("common.downloads"), findRep: v.t("common.findRep") }} />
      </div>
    </>
  );
}
