import React from "react";
import { S } from "../../../lib/dc.js";
import css from "./ProductGrid.module.css";

/** Colecciones, descripción de la subcategoría y cuadrícula de productos. */
export default function ProductGrid({ v }) {
  return (
    <section className={css.section}>
      <div className={css.box}>
        <h2 className={css.heading}>{v.s.label}</h2>
        <p className={css.text}>{v.s.desc}</p>
        {v.s.hasSub ? (
          <>
            <p className={css.text2}>{v.s.sub}</p>
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
                  <span className={css.label}>{p.name}</span>
                </button>
              </React.Fragment>
            ))}
          </div>
        </>
      ) : null}
      {v.s.noProducts ? (
        <>
          <div className={css.box2}>
            {v.s.hasFeat ? (
              <>
                <img className={css.image} src={v.s.feat} alt={v.s.label} />
              </>
            ) : null}
            {v.s.noFeat ? (
              <>
                <div
                  className={css.box3}
                  role="img"
                  aria-label={v.t("collection.photoPlaceholder", { name: v.s.label })}
                ></div>
              </>
            ) : null}
          </div>
        </>
      ) : null}
    </section>
  );
}
