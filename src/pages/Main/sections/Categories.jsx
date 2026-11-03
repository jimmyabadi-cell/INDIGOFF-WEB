import { S } from "../../../lib/dc.js";

/** Las cinco categorías (Ceilings, Walls, Lights, Dividers, Podcaster). */
export default function Categories({ v }) {
  return (
    <section id="categories" style={S("padding: calc(120px * var(--vs)) 0 0")}>
      <div className="sec-hd" style={S("text-align: center; margin-bottom: 56px; padding: 0 24px")}>
        <h2
          style={S(
            "margin: 0; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(34px, 3.6vw, 54px); line-height: 1.05; letter-spacing: -0.04em",
          )}
        >
          {v.t("home.categories.title")}
        </h2>
      </div>
      <div className="cat-row" style={S("max-width: 1440px; margin: 0 auto; padding: 0 var(--gutter)")}>
        <a href="/ceilings" className="cat-panel" style={S("background: #EEEBE6")}>
          <img
            src="/img/a4f6a6e61e9f23429824023cd67d2a5f.jpg"
            alt="Ceilings: Stratus mustard, gray and white baffles over a lounge"
            style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
          />
          <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
          <span className="cat-label">
            <span className="cat-name">{v.t("catalog.categories.ceilings")}</span>
            <span className="cat-sub">{v.t("home.categories.ceilingsSubs")}</span>
            <span className="cat-cta" style={S("display: inline-flex; align-items: center; gap: 8px")}>
              {v.t("home.categories.explore")}
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={S("display: block; flex: none")}
              >
                <path d="M4 12h15M13 6l6 6-6 6"></path>
              </svg>
            </span>
          </span>
        </a>
        <a href="/walls" className="cat-panel" style={S("background: #EEEBE6")}>
          <img
            src="/img/50cb19dd09bf67dde7b33787030edb02.jpg"
            alt="Walls: Red faceted acoustic wall"
            style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
          />
          <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
          <span className="cat-label">
            <span className="cat-name">{v.t("catalog.categories.walls")}</span>
            <span className="cat-sub">{v.t("home.categories.wallsSubs")}</span>
            <span className="cat-cta" style={S("display: inline-flex; align-items: center; gap: 8px")}>
              {v.t("home.categories.explore")}
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={S("display: block; flex: none")}
              >
                <path d="M4 12h15M13 6l6 6-6 6"></path>
              </svg>
            </span>
          </span>
        </a>
        <a href="/lights" className="cat-panel" style={S("background: #EEEBE6")}>
          <img
            src="/img/16744e6011fb31fe88309cf84f8242d3.jpg"
            alt="Lights: Acoustic pendant lamps over a dining room"
            style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
          />
          <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
          <span className="cat-label">
            <span className="cat-name">{v.t("catalog.categories.lights")}</span>
            <span className="cat-sub">{v.t("home.categories.lightsSubs")}</span>
            <span className="cat-cta" style={S("display: inline-flex; align-items: center; gap: 8px")}>
              {v.t("home.categories.explore")}
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={S("display: block; flex: none")}
              >
                <path d="M4 12h15M13 6l6 6-6 6"></path>
              </svg>
            </span>
          </span>
        </a>
        <a href="/dividers" className="cat-panel" style={S("background: #EEEBE6")}>
          <img
            src="/img/e154f12501cbca329921ce90014beb4c.jpg"
            alt="Dividers: Acoustic desk dividers in an open office"
            style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
          />
          <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
          <span className="cat-label">
            <span className="cat-name">{v.t("catalog.categories.dividers")}</span>
            <span className="cat-sub">{v.t("home.categories.dividersSubs")}</span>
            <span className="cat-cta" style={S("display: inline-flex; align-items: center; gap: 8px")}>
              {v.t("home.categories.explore")}
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={S("display: block; flex: none")}
              >
                <path d="M4 12h15M13 6l6 6-6 6"></path>
              </svg>
            </span>
          </span>
        </a>
        <a href="/podcaster" className="cat-panel" style={S("background: #EEEBE6")}>
          <img
            src="/img/262de0d004e1e631ef993783a62dc338.jpg"
            alt="Podcaster: podcast studio with sculptural acoustic panels"
            style={S("position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover")}
          />
          <span className="scrim" style={S("position: absolute; top: 0; left: 0; right: 0; bottom: 0")}></span>
          <span className="cat-label">
            <span className="cat-name">{"Podcaster"}</span>
            <span className="cat-sub">{v.t("home.categories.podcasterSubs")}</span>
            <span className="cat-cta" style={S("display: inline-flex; align-items: center; gap: 8px")}>
              {v.t("home.categories.explore")}
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={S("display: block; flex: none")}
              >
                <path d="M4 12h15M13 6l6 6-6 6"></path>
              </svg>
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
