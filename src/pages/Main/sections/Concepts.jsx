import React from "react";
import css from "./Concepts.module.css";

/** Carrusel de conceptos. */
export default function Concepts({ v }) {
  return (
    <section className={css.concepts} id="concepts">
      <div className={"sec-hd " + css.box}>
        <h2 className={css.heading}>{v.t("home.concepts.title")}</h2>
      </div>
      <p className={css.text}>{v.t("home.concepts.text")}</p>
      <div className="cf">
        <p className="cf-cap">
          <span className="cf-code">{v.cf.code}</span>
          <span className="cf-nm">{v.cf.name}</span>
        </p>
        <div className="cf-main">
          <button type="button" className="cf-stage" onClick={v.cf.pick} aria-label={v.cf.alt}>
            {(v.concepts || []).map((c, c__i) => (
              <React.Fragment key={c__i}>
                <img className={c.fcls} src={c.img} alt="" loading="lazy" decoding="async" />
              </React.Fragment>
            ))}
          </button>
          <button type="button" className="cf-nav cf-prev" onClick={v.cf.prev} aria-label={v.t("home.concepts.prev")}>
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M15 5l-7 7 7 7"></path>
            </svg>
          </button>
          <button type="button" className="cf-nav cf-next" onClick={v.cf.next} aria-label={v.t("home.concepts.next")}>
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="cf-th" role="list">
        {(v.concepts || []).map((c, c__i) => (
          <React.Fragment key={c__i}>
            <button
              type="button"
              role="listitem"
              className={c.tcls}
              onClick={c.go}
              aria-label={c.alt}
              aria-current={c.cur}
            >
              <img src={c.img} alt="" loading="lazy" decoding="async" />
              <span className="cf-tc">{c.code}</span>
            </button>
          </React.Fragment>
        ))}
      </div>
      <div className="cta-row">
        <a href="/find-a-rep" className="cta-p">
          {v.t("home.concepts.adapt")}
        </a>
        <a href="/find-a-rep" className="cta-o">
          {v.t("home.specify.appointment")}
        </a>
      </div>
    </section>
  );
}
