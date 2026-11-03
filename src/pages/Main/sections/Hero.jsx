import css from "./Hero.module.css";

/** Hero con imágenes rotativas y llamados principales. */
export default function Hero({ v }) {
  return (
    <section className={css.top} id="top">
      <div className="hs" aria-hidden="false">
        <img
          className="hs-i hs-1"
          src="/img/f8c0fd4c23fb59d6887e5fe8c294a39b.jpg"
          alt="Indigoff space with suspended baffles, arched walls and sculptural forms"
        />
        <img
          className="hs-i hs-2"
          src="/img/95478a5658304ca607006b326c317835.jpg"
          alt="Rainbow acoustic arches and ceiling ribbons over an open office"
          loading="lazy"
          decoding="async"
        />
        <img
          className="hs-i hs-3"
          src="/img/262de0d004e1e631ef993783a62dc338.jpg"
          alt="Colorful acoustic podcast studio with wall shapes and ceiling clouds"
          loading="lazy"
          decoding="async"
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
