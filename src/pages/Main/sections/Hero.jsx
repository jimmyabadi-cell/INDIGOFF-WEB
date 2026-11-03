import css from "./Hero.module.css";
import HERO from "../../../data/hero.json";
import { imgProps, SIZES } from "../../../lib/images.js";

/** Hero con imágenes rotativas y llamados principales. */
export default function Hero({ v }) {
  return (
    <section className={css.top} id="top">
      <div className="hs" aria-hidden="false">
        <img
          className="hs-i hs-1"
          // React 18 aún no conoce fetchPriority: en minúsculas pasa tal cual al HTML.
          // eslint-disable-next-line react/no-unknown-property
          fetchpriority="high"
          {...imgProps(HERO.src, SIZES.full)}
          alt="Indigoff space with suspended baffles, arched walls and sculptural forms"
        />
        <img
          loading="lazy"
          decoding="async"
          className="hs-i hs-2"
          // Aparecen hasta los 5 s del carrusel: que no compitan con la primera foto.
          // eslint-disable-next-line react/no-unknown-property
          fetchpriority="low"
          {...imgProps("/img/95478a5658304ca607006b326c317835.jpg", SIZES.full)}
          alt="Rainbow acoustic arches and ceiling ribbons over an open office"
        />
        <img
          loading="lazy"
          decoding="async"
          className="hs-i hs-3"
          // Aparecen hasta los 5 s del carrusel: que no compitan con la primera foto.
          // eslint-disable-next-line react/no-unknown-property
          fetchpriority="low"
          {...imgProps("/img/262de0d004e1e631ef993783a62dc338.jpg", SIZES.full)}
          alt="Colorful acoustic podcast studio with wall shapes and ceiling clouds"
        />
      </div>
      <div className={"scrim " + css.box} aria-hidden="true"></div>
      <div className="hs-copy">
        <h1 className="hs-h">
          {v.t("home.hero.line1")}
          <br />
          {v.t("home.hero.line2")}
          <br />
          {v.t("home.hero.line3")}
        </h1>
        <p className="hs-p">{v.t("home.hero.text")}</p>
        <div className="cta-row cta-dk">
          <a href="/find-a-rep" className="cta-p">
            {v.t("home.hero.quote")}
          </a>
          <a href="#categories" className="cta-o">
            {v.t("home.hero.explore")}
          </a>
        </div>
      </div>
    </section>
  );
}
