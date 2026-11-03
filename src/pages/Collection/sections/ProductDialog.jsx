import React from "react";
import { S } from "../../../lib/dc.js";
import css from "./ProductDialog.module.css";

/** Ficha de producto: galería, descripción, descargas y Mi lista. */
export default function ProductDialog({ v }) {
  return (
    <>
      {v.selOn ? (
        <>
          <div className={css.box} role="dialog" aria-modal="true" aria-label={v.sel.title}>
            <header className={css.header}>
              <div className={css.box2}>
                <span className={css.label}>
                  <button className={css.button} type="button" onClick={v.close}>
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
                <a className={css.link} href="/" aria-label={v.t("collection.homeLabel")}>
                  <img className={css.image} src="/img/b8490b0b60f4124ee84a155bef6bdda9.svg" alt="indigoff" />
                </a>
                <span className={css.label3}></span>
              </div>
            </header>
            <div className={css.box3}>
              {v.sel.hasImg ? (
                <>
                  <img className={css.image2} src={v.sel.img} alt={v.sel.alt} />
                </>
              ) : null}
            </div>
            <div className={css.box4}>
              <h1 className={css.title}>{v.sel.title}</h1>
              <p className={css.text}>{v.sel.desc}</p>
              <div className={css.box5}>
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
                  {v.pSaveNot ? (
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
                  {v.pSaveLbl}
                </button>
              </div>
              {v.sel.hasGal ? (
                <>
                  <div className={"pgal " + css.box6}>
                    {(v.sel.gal || []).map((g, g__i) => (
                      <React.Fragment key={g__i}>
                        <button
                          className={css.button2}
                          type="button"
                          onClick={g.pick}
                          aria-label={v.t("collection.viewItem", { name: g.name })}
                        >
                          <img className={css.image3} src={g.img} alt={g.name} loading="lazy" decoding="async" />
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              {v.sel.hasDl ? (
                <>
                  <section className={css.section} aria-label={v.t("common.downloads")}>
                    <div className={css.box7}>
                      <h2 className={css.heading}>{v.t("common.downloads")}</h2>
                      <a className={css.link2} href="/downloads">
                        <span className={css.label2}>
                          {v.t("collection.allDownloads")}
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
                            <path d="M4 12h15M13 6l6 6-6 6"></path>
                          </svg>
                        </span>
                      </a>
                    </div>
                    {(v.sel.dl || []).map((f, f__i) => (
                      <React.Fragment key={f__i}>
                        <a className={css.link3} href={f.href} download>
                          <span className={css.label4}>{f.fmt}</span>
                          <span className={css.label5}>{f.name}</span>
                          <span className={css.label6}>{f.size}</span>
                          <span className={css.label7}>
                            <span className={css.label2}>
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
                  </section>
                </>
              ) : null}
              {v.sel.noDl ? (
                <>
                  <p className={css.text2}>{v.t("collection.filesOnRequest")}</p>
                </>
              ) : null}
              {v.sel.hasImg2 ? (
                <>
                  <img
                    loading="lazy"
                    decoding="async"
                    className={css.image4}
                    src={v.sel.img2}
                    alt={v.t("collection.secondView", { name: v.sel.title })}
                  />
                </>
              ) : null}
              <div className={css.box8}>
                <button className={css.button3} type="button" onClick={v.prev}>
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
                    {v.prevName}
                  </span>
                </button>
                <button className={css.button3} type="button" onClick={v.next}>
                  <span className={css.label2}>
                    {v.nextName}
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
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
