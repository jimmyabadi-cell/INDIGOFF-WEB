import React from "react";
import { S } from "../../../lib/dc.js";

/** Título de la categoría, descripción y pestañas de subcategorías. */
export default function Intro({ v }) {
  return (
    <section
      id="content"
      style={S("max-width: 1440px; margin: 0 auto; padding: 40px min(32px, var(--gutter)) 0; text-align: center")}
    >
      <h1
        style={S(
          "margin: 0 0 12px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(40px, 5vw, 64px); line-height: 1; letter-spacing: -0.04em",
        )}
      >
        {v.c.name}
      </h1>
      <p
        style={S(
          "margin: 0 auto 24px; max-width: 760px; font-family: 'IBM Plex Sans', sans-serif; font-weight: 300; font-size: 16px; line-height: 1.5; color: #3A3935",
        )}
      >
        {v.c.desc}
      </p>
      <nav
        aria-label={v.t("collection.subcategoriesLabel")}
        className="scroll-tabs"
        style={S(
          "display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 40px; border-bottom: 1px solid #ECE9E4",
        )}
      >
        {(v.tabs || []).map((t, t__i) => (
          <React.Fragment key={t__i}>
            <button type="button" onClick={t.pick} aria-pressed={t.on} style={S(t.style)}>
              {t.label}
            </button>
          </React.Fragment>
        ))}
      </nav>
      {v.hasColls ? (
        <>
          <nav aria-label={v.t("collection.collectionsLabel")} className="cl-row">
            <span className="cl-lab">{v.collLabel}</span>
            {(v.colls || []).map((q, q__i) => (
              <React.Fragment key={q__i}>
                <button type="button" onClick={q.pick} aria-pressed={q.on} className={q.cls}>
                  {q.label}
                </button>
              </React.Fragment>
            ))}
          </nav>
        </>
      ) : null}
    </section>
  );
}
