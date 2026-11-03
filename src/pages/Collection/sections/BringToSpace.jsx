import { S } from "../../../lib/dc.js";

/** Llamado a solicitar muestras o un estudio. */
export default function BringToSpace({ v }) {
  return (
    <section
      style={S(
        "max-width: 1440px; margin: 0 auto; padding: calc(160px * var(--vs)) min(32px, var(--gutter)) 0; text-align: center",
      )}
    >
      <p
        style={S(
          "margin: 0 0 28px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(32px, 3.6vw, 52px); letter-spacing: -0.04em",
        )}
      >
        {v.t("collection.bringTitle")}
      </p>
      <div style={S("display: flex; flex-wrap: wrap; justify-content: center; gap: 12px")}>
        <a
          href="/find-a-rep"
          style={S(
            "display: inline-flex; align-items: center; min-height: 48px; padding: 0 36px; background: #645DC5; color: #FFFFFF; text-decoration: none; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
          )}
        >
          {v.t("common.requestSamples")}
        </a>
        <a
          href="/#acoustics"
          style={S(
            "display: inline-flex; align-items: center; min-height: 48px; padding: 0 36px; border: 1px solid #111111; color: #111111; text-decoration: none; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase",
          )}
        >
          {v.t("collection.requestStudy")}
        </a>
      </div>
    </section>
  );
}
