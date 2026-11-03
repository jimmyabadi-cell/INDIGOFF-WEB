import React from "react";
import { S } from "../../../lib/dc.js";

/** Lista de todos los representantes. */
export default function AllReps({ v }) {
  return (
    <section style={S("background: #F4F1EB")}>
      <div style={S("max-width: 1440px; margin: 0 auto; padding: calc(120px * var(--vs)) var(--gutter)")}>
        <div style={S("text-align: center; margin-bottom: 56px")}>
          <h2
            style={S(
              "margin: 0; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
            )}
          >
            {v.t("findRep.allTitle")}
          </h2>
        </div>
        <div style={S("display: flex; flex-wrap: wrap; gap: 8px")}>
          {(v.all || []).map((r, r__i) => (
            <React.Fragment key={r__i}>
              <button type="button" onClick={r.pick} aria-pressed={r.on} style={S(r.style)}>
                <span
                  style={S(
                    "font-family: Urbanist, sans-serif; font-weight: 400; font-size: 22px; letter-spacing: -0.02em",
                  )}
                >
                  {r.name}
                </span>
                <span style={S("font-size: 15px; color: #3A3935")}>{r.contact}</span>
                <span
                  style={S(
                    "margin-top: auto; padding-top: 18px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
                  )}
                >
                  {r.territory}
                </span>
              </button>
            </React.Fragment>
          ))}
        </div>
        <p style={S("margin: 64px auto 0; max-width: 520px; text-align: center; color: #5E5A53")}>
          {v.t("findRep.outside")}
        </p>
        <p style={S("margin: 24px 0 0; text-align: center")}>
          <a
            href="mailto:info@indigoff.com"
            style={S(
              "display: inline-flex; align-items: center; min-height: 48px; padding: 0 36px; background: #645DC5; color: #FFFFFF; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase",
            )}
          >
            {"info@indigoff.com"}
          </a>
        </p>
      </div>
    </section>
  );
}
