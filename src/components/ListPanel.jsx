import React from "react";
import { S } from "../lib/dc.js";

/**
 * Panel de Mi lista (home y páginas de colección).
 *
 * @param {object} props
 * @param {object} props.v          View model con `listOn`, `listItems`, `closeList`…
 * @param {string} [props.homeHref]  Link del logo; con "#…" (la home) además cierra el panel.
 */
export default function ListPanel({ v, homeHref = "/" }) {
  return (
    <>
      {v.listOn ? (
        <>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={v.t("list.title")}
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
                      {v.t("common.back")}
                    </span>
                  </button>
                </span>
                <a
                  href={homeHref}
                  onClick={homeHref.startsWith("#") ? v.closeList : undefined}
                  aria-label={v.t("collection.homeLabel")}
                  style={S("display: block")}
                >
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
                  {v.t("list.title")}
                </h1>
                <p
                  style={S("margin: 0 auto 48px; max-width: 560px; font-size: 17px; line-height: 1.7; color: #3A3935")}
                >
                  {v.t("list.intro")}
                </p>
              </div>
              {v.listEmpty ? (
                <>
                  <p
                    style={S(
                      "margin: 0 auto; padding: 64px 24px; max-width: 520px; text-align: center; background: #F4F1EB; font-size: 15px; color: #5E5A53",
                    )}
                  >
                    {v.t("list.empty")}
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
                      {v.t("list.sendToRep")}
                    </a>
                    <a
                      href={v.listMail}
                      style={S(
                        "display: inline-flex; align-items: center; min-height: 48px; padding: 0 28px; border: 1px solid #111111; color: #111111; text-decoration: none; J",
                      )}
                    >
                      {v.t("list.email")}
                    </a>
                    <button
                      type="button"
                      onClick={v.clearList}
                      style={S(
                        "min-height: 48px; padding: 0 20px; border: 0; background: transparent; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #6B675F",
                      )}
                    >
                      {v.t("list.clear")}
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
                            aria-label={v.t("list.removeItem", { name: it.name })}
                            style={S(
                              "align-self: flex-start; min-height: 44px; padding: 0; border: 0; background: transparent; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #6B675F; text-decoration: underline; text-underline-offset: 4px",
                            )}
                          >
                            {v.t("list.remove")}
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
    </>
  );
}
