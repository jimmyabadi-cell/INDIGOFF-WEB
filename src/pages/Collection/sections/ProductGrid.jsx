import React from "react";
import css from "./ProductGrid.module.css";
import { imgProps, SIZES } from "../../../lib/images.js";

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
          <div className={v.s.small ? css.grid + " " + css.small : css.grid}>
            {(v.s.products || []).map((p, p__i) => (
              <React.Fragment key={p__i}>
                <button
                  type="button"
                  onClick={p.pick}
                  aria-label={v.t("collection.viewItem", { name: p.name })}
                  className={css.tile}
                >
                  {p.hasImg ? (
                    <>
                      <img
                        loading="lazy"
                        decoding="async"
                        className={css.tileImage}
                        {...imgProps(p.img, SIZES.card)}
                        alt={p.alt}
                      />
                    </>
                  ) : null}
                  {p.noImg ? (
                    <>
                      <span className={css.placeholder} aria-hidden="true"></span>
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
                <img className={css.image} {...imgProps(v.s.feat, SIZES.full)} alt={v.s.label} />
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
