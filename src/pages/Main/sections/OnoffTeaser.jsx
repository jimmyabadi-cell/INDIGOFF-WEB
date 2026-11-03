import { S } from "../../../lib/dc.js";

/** Presentación de onoff studio. */
export default function OnoffTeaser({ v }) {
  return (
    <section id="onoff" style={S("padding: calc(160px * var(--vs)) 0 0")}>
      <div style={S("display: flex; flex-wrap: wrap-reverse; align-items: stretch")}>
        <div style={S("flex: 1 1 520px; min-width: 0")}>
          <img
            src="/img/dc6b194e8cfae848cc1e1424d739f8cb.jpg"
            alt="Folded acoustic light wave over a conference table"
            loading="lazy"
            decoding="async"
            style={S("display: block; width: 100%; height: calc(760px * var(--mh)); object-fit: cover")}
          />
        </div>
        <div
          style={S(
            "flex: 1 1 420px; min-width: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: calc(80px * var(--vs)) min(48px, var(--gutter)); box-sizing: border-box; background: #F4F1EB; color: #111111",
          )}
        >
          <span
            style={S(
              "margin: 0 0 20px; font-family: Urbanist, sans-serif; font-weight: 500; font-size: 15px; letter-spacing: 0.04em",
            )}
          >
            {v.t("home.onoff.eyebrow")}
          </span>
          <h2
            style={S(
              "margin: 0 0 20px; max-width: 480px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
            )}
          >
            {v.t("home.onoff.title")}
          </h2>
          <p style={S("margin: 0 0 32px; max-width: 420px; color: #5E5A53")}>{v.t("home.onoff.text")}</p>
          <div style={S("display: flex; flex-wrap: wrap; justify-content: center; gap: 12px 28px")}>
            <a
              href="/onoff-studio"
              style={S(
                "display: inline-flex; align-items: center; min-height: 44px; color: #111111; border-bottom: 1px solid #111111; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
              )}
            >
              {v.t("home.onoff.discover")}
            </a>
            <a
              href="/lights"
              style={S(
                "display: inline-flex; align-items: center; min-height: 44px; color: #645DC5; border-bottom: 1px solid #645DC5; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
              )}
            >
              {v.t("home.onoff.explore")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
