import React from "react";
import { S } from "../../../lib/dc.js";

/** Enlaces a las demás categorías. */
export default function MoreCategories({ v }) {
  return (
    <section
      style={S(
        "max-width: 1440px; margin: 0 auto; padding: calc(160px * var(--vs)) min(32px, var(--gutter)) calc(140px * var(--vs)); text-align: center",
      )}
    >
      <h2
        style={S(
          "margin: 0 0 28px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
        )}
      >
        {v.t("collection.moreCategories")}
      </h2>
      <nav
        aria-label={v.t("collection.moreCategories")}
        style={S(
          "display: flex; flex-wrap: wrap; justify-content: center; gap: 12px 44px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(20px, 2.2vw, 30px); letter-spacing: -0.02em",
        )}
      >
        {(v.others || []).map((o, o__i) => (
          <React.Fragment key={o__i}>
            <a href={o.href} style={S("color: #111111; text-decoration: none")}>
              {o.name}
            </a>
          </React.Fragment>
        ))}
      </nav>
    </section>
  );
}
