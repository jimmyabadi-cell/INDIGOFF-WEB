import css from "./BringToSpace.module.css";

/** Llamado a solicitar muestras o un estudio. */
export default function BringToSpace({ v }) {
  return (
    <section className={css.section}>
      <p className={css.text}>{v.t("collection.bringTitle")}</p>
      <div className={css.box}>
        <a className={css.link} href="/contact">
          {v.t("common.requestSamples")}
        </a>
        <a className={css.link2} href="/contact">
          {v.t("collection.requestStudy")}
        </a>
      </div>
    </section>
  );
}
