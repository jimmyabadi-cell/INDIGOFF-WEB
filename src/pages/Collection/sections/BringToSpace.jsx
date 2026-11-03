import css from "./BringToSpace.module.css";

/** Llamado a solicitar muestras o un estudio. */
export default function BringToSpace({ v }) {
  return (
    <section className={css.section}>
      <p className={css.text}>{v.t("collection.bringTitle")}</p>
      <div className={css.box}>
        <a className={css.link} href="/find-a-rep">
          {v.t("common.requestSamples")}
        </a>
        <a className={css.link2} href="/#acoustics">
          {v.t("collection.requestStudy")}
        </a>
      </div>
    </section>
  );
}
