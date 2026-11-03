import css from "./Material.module.css";
import { imgProps, SIZES } from "../../../lib/images.js";

/** Un solo material, tres formas. */
export default function Material({ v }) {
  return (
    <section className={css.new} id="new">
      <div className={css.box}>
        <button
          className={css.button}
          type="button"
          onClick={v.open.e_material}
          aria-label={v.t("common.enlargeImage")}
        >
          <img
            loading="lazy"
            decoding="async"
            className={css.image}
            {...imgProps("/img/b45fdd3f48ffafe2e4c62af327a77568.jpg", SIZES.half)}
            alt="Reception desk in front of a terracotta acoustic shelving wall"
          />
        </button>
        <div className={css.box2}>
          <h2 className={css.heading}>{v.t("home.material.title")}</h2>
          <p className={css.text}>{v.t("home.material.text")}</p>
          <a href="/walls" className="cta-o">
            {v.t("home.material.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
