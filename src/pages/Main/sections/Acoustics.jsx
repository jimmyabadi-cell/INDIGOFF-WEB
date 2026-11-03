import { S } from "../../../lib/dc.js";

/** Estudio acústico y de iluminación. */
export default function Acoustics({ v }) {
  return (
    <section id="acoustics" style={S("padding: calc(160px * var(--vs)) 0 0")}>
      <div style={S("display: flex; flex-wrap: wrap; align-items: stretch")}>
        <div
          style={S(
            "flex: 1 1 420px; min-width: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: calc(80px * var(--vs)) min(48px, var(--gutter)); box-sizing: border-box; background: #1E125C; color: #FFFFFF",
          )}
        >
          <h2
            style={S(
              "margin: 0 0 20px; max-width: 480px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
            )}
          >
            {v.t("home.acoustics.title")}
          </h2>
          <p style={S("margin: 0 0 28px; max-width: 400px; color: #D8D2C7")}>{v.t("home.acoustics.text")}</p>
          <a
            href="#contact"
            style={S(
              "display: inline-flex; align-items: center; min-height: 44px; color: #FFFFFF; border-bottom: 1px solid #FFFFFF; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
            )}
          >
            {v.t("home.acoustics.cta")}
          </a>
        </div>
        <button
          type="button"
          onClick={v.open.e_study}
          aria-label={v.t("common.enlargeImage")}
          style={S(
            "flex: 1 1 520px; min-width: 0; display: block; padding: 0; border: 0; background: transparent; cursor: pointer",
          )}
        >
          <img
            src="/img/73e73590532bd1289f3c5d2c7884612e.jpg"
            alt="Lounge with golden suspended baffles over a dark acoustic wall"
            style={S("display: block; width: 100%; height: calc(760px * var(--mh)); object-fit: cover")}
          />
        </button>
      </div>
    </section>
  );
}
