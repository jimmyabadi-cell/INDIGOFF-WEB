import React from "react";
import { DW_CATS, DW_FIN, ifoSetPending } from "../../lib/nav.js";
import { usePageChrome } from "../../hooks/usePageChrome.js";
import "./OnoffStudio.css";
import { imgProps, SIZES } from "../../lib/images.js";

import D from "../../data/studio.json";
import SiteHeader from "../../components/layout/SiteHeader.jsx";
import SideMenu from "../../components/layout/SideMenu.jsx";
import CompactFooter from "../../components/layout/CompactFooter.jsx";
import css from "./OnoffStudio.module.css";
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
      <div className={css.box}>
        <a className="skip" href="#content">
          {v.t("common.skipToContent")}
        </a>
        <SiteHeader v={v} labels={{ downloads: v.t("common.downloads"), findRep: v.t("common.findRep") }} />
        <section className={css.content} id="content">
          <img
            className={css.image}
            {...imgProps("/img/9d3fd937d8ba1cc27ab5015f8b0f82c6.jpg", SIZES.full)}
            alt={v.on.heroAlt}
          />
          <div className={css.box2} aria-hidden="true"></div>
          <div className={css.box3}>
            <p className={css.text}>{v.on.eyebrow}</p>
            <h1 className={css.title}>{v.on.h1}</h1>
            <p className={css.text2}>{v.on.sub}</p>
          </div>
        </section>
        <section className={css.section}>
          <div className={css.box4}>
            <h2 className={css.heading}>{v.on.whatH}</h2>
            <div className={css.box5}>
              <p className={css.text3}>{v.on.whatP1}</p>
              <p className={css.text4}>{v.on.whatP2}</p>
            </div>
          </div>
        </section>
        <section className={css.section2}>
          <div className={css.box6}>
            {(v.on.services || []).map((sv, sv__i) => (
              <React.Fragment key={sv__i}>
                <div className={css.box7}>
                  <span className={"tnum " + css.label}>{sv.n}</span>
                  <h3 className={css.subheading}>{sv.t}</h3>
                  <p className={css.text5}>{sv.d}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>
        <section className={css.section3}>
          <div className={css.box8}>
            <h2 className={css.heading2}>{v.on.procH}</h2>
            <ol className={css.list}>
              {(v.on.steps || []).map((st, st__i) => (
                <React.Fragment key={st__i}>
                  <li className={css.item}>
                    <span className={"tnum " + css.label2}>{st.n}</span>
                    <h3 className={css.subheading2}>{st.t}</h3>
                    <p className={css.text6}>{st.d}</p>
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </div>
        </section>
        <section className={css.section} id="designs">
          <div className={css.box9}>
            <h2 className={css.heading3}>{v.on.desH}</h2>
            <p className={css.text7}>{v.on.desP}</p>
          </div>
          <div className={css.box10}>
            {(v.on.designs || []).map((d, d__i) => (
              <React.Fragment key={d__i}>
                <a className={css.link} href={d.href} onClick={d.go}>
                  <img
                    loading="lazy"
                    decoding="async"
                    className={css.image2}
                    {...imgProps(d.img, SIZES.third)}
                    alt={d.name}
                  />
                  <span className={css.label3}>{d.name}</span>
                  <span className={css.label4}>{d.kind}</span>
                </a>
              </React.Fragment>
            ))}
          </div>
        </section>
        <section className={css.section4}>
          <h2 className={css.heading4}>{v.on.ctaH}</h2>
          <p className={css.text8}>{v.on.ctaP}</p>
          <div className={css.box11}>
            <a className={css.link2} href="/#contact">
              {v.on.cta1}
            </a>
            <a className={css.link3} href="/find-a-rep">
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
