import { S } from "../../../lib/dc.js";

/** Un solo material, tres formas. */
export default function Material({ v }) {
  return (
    <section id="new" style={S("padding: calc(160px * var(--vs)) 0 0")}>
      <div style={S("display: flex; flex-wrap: wrap; align-items: stretch")}>
        <button
          type="button"
          onClick={v.open.e_material}
          aria-label={v.t("common.enlargeImage")}
          style={S(
            "flex: 1 1 520px; min-width: 0; display: block; padding: 0; border: 0; background: transparent; cursor: pointer",
          )}
        >
          <img
            src="/img/b45fdd3f48ffafe2e4c62af327a77568.jpg"
            alt="Reception desk in front of a terracotta acoustic shelving wall"
            style={S("display: block; width: 100%; height: calc(820px * var(--mh)); object-fit: cover")}
          />
        </button>
        <div
          style={S(
            "flex: 1 1 420px; min-width: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: calc(80px * var(--vs)) min(48px, var(--gutter)); box-sizing: border-box; background: #F4F1EB",
          )}
        >
          <h2
            style={S(
              "margin: 0 0 20px; max-width: 460px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
            )}
          >
            {v.t("home.material.title")}
          </h2>
          <p style={S("margin: 0 0 28px; max-width: 380px; color: #5E5A53")}>{v.t("home.material.text")}</p>
          <a href="/walls" className="cta-o">
            {v.t("home.material.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
