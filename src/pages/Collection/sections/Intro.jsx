import React from "react";
import { S } from "../../../lib/dc.js";
import css from "./Intro.module.css";

/** Título de la categoría, descripción y pestañas de subcategorías. */
export default function Intro({ v }) {
  return (
    <section className={css.content} id="content">
      <h1 className={css.title}>{v.c.name}</h1>
      <p className={css.text}>{v.c.desc}</p>
      <nav aria-label={v.t("collection.subcategoriesLabel")} className={"scroll-tabs " + css.nav}>
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
