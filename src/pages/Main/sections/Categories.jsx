import css from "./Categories.module.css";

/** Las cinco categorías (Ceilings, Walls, Lights, Dividers, Podcaster). */
export default function Categories({ v }) {
  return (
    <section className={css.categories} id="categories">
      <div className={"sec-hd " + css.box}>
        <h2 className={css.heading}>{v.t("home.categories.title")}</h2>
      </div>
      <div className={"cat-row " + css.box2}>
        <a href="/ceilings" className={"cat-panel " + css.link}>
          <img
            className={css.image}
            src="/img/a4f6a6e61e9f23429824023cd67d2a5f.jpg"
            alt="Ceilings: Stratus mustard, gray and white baffles over a lounge"
          />
          <span className={"scrim " + css.label}></span>
          <span className="cat-label">
            <span className="cat-name">{v.t("catalog.categories.ceilings")}</span>
            <span className="cat-sub">{v.t("home.categories.ceilingsSubs")}</span>
            <span className={"cat-cta " + css.label2}>
              {v.t("home.categories.explore")}
              <svg
                className={css.icon}
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12h15M13 6l6 6-6 6"></path>
              </svg>
            </span>
          </span>
        </a>
        <a href="/walls" className={"cat-panel " + css.link}>
          <img
            className={css.image}
            src="/img/50cb19dd09bf67dde7b33787030edb02.jpg"
            alt="Walls: Red faceted acoustic wall"
          />
          <span className={"scrim " + css.label}></span>
          <span className="cat-label">
            <span className="cat-name">{v.t("catalog.categories.walls")}</span>
            <span className="cat-sub">{v.t("home.categories.wallsSubs")}</span>
            <span className={"cat-cta " + css.label2}>
              {v.t("home.categories.explore")}
              <svg
                className={css.icon}
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12h15M13 6l6 6-6 6"></path>
              </svg>
            </span>
          </span>
        </a>
        <a href="/lights" className={"cat-panel " + css.link}>
          <img
            className={css.image}
            src="/img/16744e6011fb31fe88309cf84f8242d3.jpg"
            alt="Lights: Acoustic pendant lamps over a dining room"
          />
          <span className={"scrim " + css.label}></span>
          <span className="cat-label">
            <span className="cat-name">{v.t("catalog.categories.lights")}</span>
            <span className="cat-sub">{v.t("home.categories.lightsSubs")}</span>
            <span className={"cat-cta " + css.label2}>
              {v.t("home.categories.explore")}
              <svg
                className={css.icon}
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12h15M13 6l6 6-6 6"></path>
              </svg>
            </span>
          </span>
        </a>
        <a href="/dividers" className={"cat-panel " + css.link}>
          <img
            className={css.image}
            src="/img/e154f12501cbca329921ce90014beb4c.jpg"
            alt="Dividers: Acoustic desk dividers in an open office"
          />
          <span className={"scrim " + css.label}></span>
          <span className="cat-label">
            <span className="cat-name">{v.t("catalog.categories.dividers")}</span>
            <span className="cat-sub">{v.t("home.categories.dividersSubs")}</span>
            <span className={"cat-cta " + css.label2}>
              {v.t("home.categories.explore")}
              <svg
                className={css.icon}
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12h15M13 6l6 6-6 6"></path>
              </svg>
            </span>
          </span>
        </a>
        <a href="/podcaster" className={"cat-panel " + css.link}>
          <img
            className={css.image}
            src="/img/262de0d004e1e631ef993783a62dc338.jpg"
            alt="Podcaster: podcast studio with sculptural acoustic panels"
          />
          <span className={"scrim " + css.label}></span>
          <span className="cat-label">
            <span className="cat-name">{"Podcaster"}</span>
            <span className="cat-sub">{v.t("home.categories.podcasterSubs")}</span>
            <span className={"cat-cta " + css.label2}>
              {v.t("home.categories.explore")}
              <svg
                className={css.icon}
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
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
