import css from "./OnoffTeaser.module.css";
import { imgProps, SIZES } from "../../../lib/images.js";

/** Presentación de onoff studio. */
export default function OnoffTeaser({ v }) {
  return (
    <section className={css.onoff} id="onoff">
      <div className={css.box}>
        <div className={css.box2}>
          <img
            loading="lazy"
            decoding="async"
            className={css.image}
            {...imgProps("/img/dc6b194e8cfae848cc1e1424d739f8cb.jpg", SIZES.half)}
            alt="Folded acoustic light wave over a conference table"
          />
        </div>
        <div className={css.box3}>
          <span className={css.label}>{v.t("home.onoff.eyebrow")}</span>
          <h2 className={css.heading}>{v.t("home.onoff.title")}</h2>
          <p className={css.text}>{v.t("home.onoff.text")}</p>
          <div className={css.box4}>
            <a className={css.link} href="/onoff-studio">
              {v.t("home.onoff.discover")}
            </a>
            <a className={css.link2} href="/lights">
              {v.t("home.onoff.explore")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
