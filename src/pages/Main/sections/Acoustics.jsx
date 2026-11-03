import css from "./Acoustics.module.css";

/** Estudio acústico y de iluminación. */
export default function Acoustics({ v }) {
  return (
    <section className={css.acoustics} id="acoustics">
      <div className={css.box}>
        <div className={css.box2}>
          <h2 className={css.heading}>{v.t("home.acoustics.title")}</h2>
          <p className={css.text}>{v.t("home.acoustics.text")}</p>
          <a className={css.link} href="#contact">
            {v.t("home.acoustics.cta")}
          </a>
        </div>
        <button className={css.button} type="button" onClick={v.open.e_study} aria-label={v.t("common.enlargeImage")}>
          <img
            className={css.image}
            src="/img/73e73590532bd1289f3c5d2c7884612e.jpg"
            alt="Lounge with golden suspended baffles over a dark acoustic wall"
          />
        </button>
      </div>
    </section>
  );
}
