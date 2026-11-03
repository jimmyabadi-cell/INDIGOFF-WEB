import React from "react";
import BRANDS from "../../../data/brands.json";
import css from "./Projects.module.css";
import { imgProps, SIZES } from "../../../lib/images.js";

/** Proyectos y marcas que confían en Indigoff. */
export default function Projects({ v }) {
  return (
    <section className={css.projects} id="projects">
      <div className={"sec-hd " + css.box}>
        <h2 className={css.heading}>{v.t("home.projects.title")}</h2>
      </div>
      <button
        className={css.button}
        type="button"
        onClick={v.openMM}
        aria-label={v.t("collection.viewItem", { name: "Multimedios" })}
      >
        <img
          loading="lazy"
          decoding="async"
          className={css.image}
          {...imgProps("/img/88df68ee3d1a2f11cdef1860ba428fb2.jpg", SIZES.full)}
          alt="Multimedios: newsroom under a sculpted linear acoustic ceiling"
        />
        <span className={"scrim " + css.label} aria-hidden="true"></span>
        <span className={css.label2}>{"Multimedios"}</span>
      </button>
      <div className={"proj-grid " + css.box2}>
        {(v.projects || []).map((pj, pj__i) => (
          <React.Fragment key={pj__i}>
            <button className={css.button2} type="button" onClick={pj.pick} aria-label={`View ${pj.name}`}>
              <span className={"proj-img " + css.label3}>
                <img
                  loading="lazy"
                  decoding="async"
                  className={css.image2}
                  {...imgProps(pj.cover, SIZES.third)}
                  alt={`${pj.name} project by Indigoff`}
                />
              </span>
              <span className={css.label4}>
                <span className={css.label5}>{pj.name}</span>
              </span>
            </button>
          </React.Fragment>
        ))}
      </div>
      {v.moreProjects ? (
        <>
          <div className={css.box3}>
            <button className={css.button3} type="button" onClick={v.toggleProjects}>
              {v.projBtn}
            </button>
          </div>
        </>
      ) : null}
      <div className={css.box4}>
        <h2 className={css.heading2}>{v.t("home.projects.trustedBy")}</h2>
        <ul className={`tb-grid ${v.brandsCls}`} aria-label={v.t("home.projects.clients")}>
          {BRANDS.map((b) => (
            <li className="tb-cell" key={b.name}>
              <img
                className="tb-logo"
                src={b.logo}
                alt={b.name}
                loading="lazy"
                decoding="async"
                style={{ maxHeight: b.maxHeight + "px" }}
              />
            </li>
          ))}
        </ul>
        <div className={css.box5}>
          <button className={css.button3} type="button" onClick={v.toggleBrands} aria-expanded={v.allBrandsStr}>
            {v.brandsBtn}
          </button>
        </div>
      </div>
      <div className="cta-row">
        <a href="/contact" className="cta-p">
          {v.t("home.cta.start")}
        </a>
        <a href="/find-a-rep" className="cta-o">
          {v.t("common.talkToRep")}
        </a>
      </div>
    </section>
  );
}
