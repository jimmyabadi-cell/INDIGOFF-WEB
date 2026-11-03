import React from "react";
import { S } from "../../../lib/dc.js";

/** Lightbox de producto, acabado, concepto o proyecto. */
export default function Lightbox({ v }) {
  return (
    <>
      {v.lbOn ? (
        <>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={v.lb.title}
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
                    onClick={v.closeLb}
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
                <a href="#top" onClick={v.closeLb} aria-label={v.t("collection.homeLabel")} style={S("display: block")}>
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
              {v.showHero ? (
                <>
                  <img
                    src={v.lbImg}
                    alt={v.lbAlt}
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
                {v.lb.title}
              </h1>
              <p style={S("margin: 0 auto 40px; max-width: 620px; font-size: 18px; line-height: 1.7; color: #3A3935")}>
                {v.lb.desc}
              </p>
              <div style={S("margin: -8px 0 56px")}>
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
                  {v.lbSaveNot ? (
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
                  {v.lbSaveLbl}
                </button>
              </div>
              {v.showSw ? (
                <>
                  {v.showCount ? (
                    <>
                      <p
                        style={S(
                          "margin: 0 0 8px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
                        )}
                      >
                        {v.swCountText}
                      </p>
                    </>
                  ) : null}
                  {(v.swGroups || []).map((g, g__i) => (
                    <React.Fragment key={g__i}>
                      {g.hasLabel ? (
                        <>
                          <h2
                            style={S(
                              "margin: 48px 0 20px; padding-bottom: 12px; border-bottom: 1px solid #111111; text-align: left; font-family: Urbanist, sans-serif; font-weight: 300; font-size: 30px; letter-spacing: -0.03em",
                            )}
                          >
                            {g.group}
                          </h2>
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
                              type="button"
                              role="listitem"
                              onClick={w.pick}
                              aria-pressed={w.on}
                              style={S(
                                "display: flex; flex-direction: column; gap: 10px; padding: 0; border: 0; background: transparent; cursor: pointer; font-family: inherit; color: #111111; text-align: left",
                              )}
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
                                  <span
                                    style={S(
                                      "font-family: Urbanist, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase",
                                    )}
                                  >
                                    {w.name}
                                  </span>
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
              <div style={S("display: flex; flex-wrap: wrap; justify-content: center; gap: 12px")}></div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
