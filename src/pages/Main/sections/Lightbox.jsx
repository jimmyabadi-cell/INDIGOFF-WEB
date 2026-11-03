import React from "react";
import { S } from "../../../lib/dc.js";
import css from "./Lightbox.module.css";

/** Lightbox de producto, acabado, concepto o proyecto. */
export default function Lightbox({ v }) {
  return (
    <>
      {v.lbOn ? (
        <>
          <div className={css.box} role="dialog" aria-modal="true" aria-label={v.lb.title}>
            <header className={css.header}>
              <div className={css.box2}>
                <span className={css.label}>
                  <button className={css.button} type="button" onClick={v.closeLb}>
                    <span className={css.label2}>
                      <svg
                        className={css.icon}
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 5l-7 7 7 7"></path>
                      </svg>
                      {v.t("common.back")}
                    </span>
                  </button>
                </span>
                <a className={css.link} href="#top" onClick={v.closeLb} aria-label={v.t("collection.homeLabel")}>
                  <img className={css.image} src="/img/b8490b0b60f4124ee84a155bef6bdda9.svg" alt="indigoff" />
                </a>
                <span className={css.label3}></span>
              </div>
            </header>
            <div className={css.box3}>
              {v.showHero ? (
                <>
                  <img className={css.image2} src={v.lbImg} alt={v.lbAlt} />
                </>
              ) : null}
            </div>
            <div className={css.box4}>
              <h1 className={css.title}>{v.lb.title}</h1>
              <p className={css.text}>{v.lb.desc}</p>
              <div className={css.box5}>
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
                      <svg className={css.icon} aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
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
                      <svg className={css.icon} aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
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
                      <p className={css.text2}>{v.swCountText}</p>
                    </>
                  ) : null}
                  {(v.swGroups || []).map((g, g__i) => (
                    <React.Fragment key={g__i}>
                      {g.hasLabel ? (
                        <>
                          <h2 className={css.heading}>{g.group}</h2>
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
                              className={css.button2}
                              type="button"
                              role="listitem"
                              onClick={w.pick}
                              aria-pressed={w.on}
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
                                  <span className={css.label4}>{w.name}</span>
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
              <div className={css.box6}></div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
