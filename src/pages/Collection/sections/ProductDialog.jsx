import React from "react";
import { S } from "../../../lib/dc.js";

/** Ficha de producto: galería, descripción, descargas y Mi lista. */
export default function ProductDialog({ v }) {
  return (
    <>
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
              <p style={S("margin: 0 auto 40px; max-width: 620px; font-size: 18px; line-height: 1.7; color: #3A3935")}>
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
    </>
  );
}
