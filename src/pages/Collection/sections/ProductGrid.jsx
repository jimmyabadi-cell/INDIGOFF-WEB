import React from "react";
import { S } from "../../../lib/dc.js";

/** Colecciones, descripción de la subcategoría y cuadrícula de productos. */
export default function ProductGrid({ v }) {
  return (
    <section style={S("max-width: 1440px; margin: 0 auto; padding: 20px 0 0")}>
      <div style={S("max-width: 720px; margin: 0 auto 24px; padding: 0 24px; text-align: center")}>
        <h2
          style={S(
            "position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap",
          )}
        >
          {v.s.label}
        </h2>
        <p style={S("margin: 0; font-size: 14px; line-height: 1.5; color: #5E5A53")}>{v.s.desc}</p>
        {v.s.hasSub ? (
          <>
            <p
              style={S(
                "margin: 16px 0 0; font-size: 10px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #6B675F",
              )}
            >
              {v.s.sub}
            </p>
          </>
        ) : null}
      </div>
      {v.s.hasProducts ? (
        <>
          <div style={S(v.s.gridStyle)}>
            {(v.s.products || []).map((p, p__i) => (
              <React.Fragment key={p__i}>
                <button
                  type="button"
                  onClick={p.pick}
                  aria-label={v.t("collection.viewItem", { name: p.name })}
                  style={S(v.s.tileStyle)}
                >
                  {p.hasImg ? (
                    <>
                      <img src={p.img} alt={p.alt} style={S(v.s.imgStyle)} />
                    </>
                  ) : null}
                  {p.noImg ? (
                    <>
                      <span aria-hidden="true" style={S(v.s.phStyle)}></span>
                    </>
                  ) : null}
                  <span
                    style={S(
                      "display: block; width: 100%; text-align: center; font-size: 12px; font-weight: 400; letter-spacing: 0.22em; text-transform: uppercase",
                    )}
                  >
                    {p.name}
                  </span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </>
      ) : null}
      {v.s.noProducts ? (
        <>
          <div style={S("max-width: 1100px; margin: 0 auto; padding: 0 24px")}>
            {v.s.hasFeat ? (
              <>
                <img
                  src={v.s.feat}
                  alt={v.s.label}
                  style={S("display: block; width: 100%; height: calc(620px * var(--mh)); object-fit: cover")}
                />
              </>
            ) : null}
            {v.s.noFeat ? (
              <>
                <div
                  role="img"
                  aria-label={v.t("collection.photoPlaceholder", { name: v.s.label })}
                  style={S("height: calc(620px * var(--mh)); background: #EEEBE6")}
                ></div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </section>
  );
}
