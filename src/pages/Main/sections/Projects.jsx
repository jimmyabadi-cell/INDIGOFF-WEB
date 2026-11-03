import React from "react";
import { S } from "../../../lib/dc.js";
import BRANDS from "../../../data/brands.json";

/** Proyectos y marcas que confían en Indigoff. */
export default function Projects({ v }) {
  return (
    <section id="projects" style={S("padding: calc(180px * var(--vs)) 0 0")}>
      <div className="sec-hd" style={S("text-align: center; margin-bottom: 56px; padding: 0 24px")}>
        <h2
          style={S(
            "margin: 0; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
          )}
        >
          {v.t("home.projects.title")}
        </h2>
      </div>
      <button
        type="button"
        onClick={v.openMM}
        aria-label={v.t("collection.viewItem", { name: "Multimedios" })}
        style={S(
          "display: block; width: 100%; position: relative; height: calc(820px * var(--mh)); overflow: hidden; background: #1A1917; padding: 0; border: 0; cursor: pointer",
        )}
      >
        <img
          src="/img/88df68ee3d1a2f11cdef1860ba428fb2.jpg"
          alt="Multimedios: newsroom under a sculpted linear acoustic ceiling"
          style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
        />
        <span
          className="scrim"
          aria-hidden="true"
          style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%")}
        ></span>
        <span
          style={S(
            "position: absolute; left: 0; right: 0; bottom: 48px; text-align: center; color: #FFFFFF; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase",
          )}
        >
          {"Multimedios"}
        </span>
      </button>
      <div className="proj-grid" style={S("max-width: 1440px; margin: 0 auto; padding: 8px var(--gutter) 0")}>
        {(v.projects || []).map((pj, pj__i) => (
          <React.Fragment key={pj__i}>
            <button
              type="button"
              onClick={pj.pick}
              aria-label={`View ${pj.name}`}
              style={S(
                "display: flex; flex-direction: column; gap: 14px; padding: 0; border: 0; background: transparent; text-align: left; cursor: pointer; font-family: inherit; color: #111111",
              )}
            >
              <span
                className="proj-img"
                style={S("display: block; width: 100%; aspect-ratio: 4 / 3; overflow: hidden; background: #EEEBE6")}
              >
                <img
                  src={pj.cover}
                  alt={`${pj.name} project by Indigoff`}
                  loading="lazy"
                  decoding="async"
                  style={S("display: block; width: 100%; height: 100%; object-fit: cover")}
                />
              </span>
              <span style={S("display: flex; justify-content: space-between; align-items: baseline; gap: 12px")}>
                <span
                  style={S(
                    "font-family: Urbanist, sans-serif; font-weight: 300; font-size: 22px; letter-spacing: -0.02em",
                  )}
                >
                  {pj.name}
                </span>
              </span>
            </button>
          </React.Fragment>
        ))}
      </div>
      {v.moreProjects ? (
        <>
          <div style={S("text-align: center; padding: 64px 24px 0")}>
            <button
              type="button"
              onClick={v.toggleProjects}
              style={S(
                "min-height: 48px; padding: 0 36px; border: 1px solid #111111; background: transparent; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #111111",
              )}
            >
              {v.projBtn}
            </button>
          </div>
        </>
      ) : null}
      <div
        style={S(
          "max-width: 1100px; margin: 0 auto; padding: calc(120px * var(--vs)) var(--gutter) 0; text-align: center",
        )}
      >
        <h2
          style={S(
            "margin: 0 0 28px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
          )}
        >
          {v.t("home.projects.trustedBy")}
        </h2>
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
        <div style={S("text-align: center; padding: 48px 24px 0")}>
          <button
            type="button"
            onClick={v.toggleBrands}
            aria-expanded={v.allBrandsStr}
            style={S(
              "min-height: 48px; padding: 0 36px; border: 1px solid #111111; background: transparent; cursor: pointer; font-family: inherit; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #111111",
            )}
          >
            {v.brandsBtn}
          </button>
        </div>
      </div>
      <div className="cta-row">
        <a href="/find-a-rep" className="cta-p">
          {v.t("home.cta.start")}
        </a>
        <a href="/find-a-rep" className="cta-o">
          {v.t("common.talkToRep")}
        </a>
      </div>
    </section>
  );
}
