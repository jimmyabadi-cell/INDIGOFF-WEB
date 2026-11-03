import React from "react";
import { S } from "../../../lib/dc.js";
import css from "./AllReps.module.css";

/** Lista de todos los representantes. */
export default function AllReps({ v }) {
  return (
    <section className={css.section}>
      <div className={css.box}>
        <div className={css.box2}>
          <h2 className={css.heading}>{v.t("findRep.allTitle")}</h2>
        </div>
        <div className={css.box3}>
          {(v.all || []).map((r, r__i) => (
            <React.Fragment key={r__i}>
              <button type="button" onClick={r.pick} aria-pressed={r.on} style={S(r.style)}>
                <span className={css.label}>{r.name}</span>
                <span className={css.label2}>{r.contact}</span>
                <span className={css.label3}>{r.territory}</span>
              </button>
            </React.Fragment>
          ))}
        </div>
        <p className={css.text}>{v.t("findRep.outside")}</p>
        <p className={css.text2}>
          <a className={css.link} href="mailto:info@indigoff.com">
            {"info@indigoff.com"}
          </a>
        </p>
      </div>
    </section>
  );
}
