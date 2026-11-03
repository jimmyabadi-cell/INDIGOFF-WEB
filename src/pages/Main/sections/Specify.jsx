import css from "./Specify.module.css";

/** Servicios para especificar: cita, estudio, muestras, BIM, representante. */
export default function Specify({ v }) {
  return (
    <section className={css.specify} id="specify">
      <h2 className={css.heading}>{v.t("home.specify.eyebrow")}</h2>
      <div className={"spec-row " + css.box}>
        <a className={css.link} href="#appointment">
          <span className={css.label}>{v.t("home.specify.appointment")}</span>
          <span className={css.label2}>{v.t("home.specify.appointmentText")}</span>
        </a>
        <a className={css.link2} href="#acoustics">
          <span className={css.label}>{v.t("home.specify.study")}</span>
          <span className={css.label2}>{v.t("home.specify.studyText")}</span>
        </a>
        <a className={css.link2} href="#samples">
          <span className={css.label}>{v.t("home.specify.samples")}</span>
          <span className={css.label2}>{v.t("home.specify.samplesText")}</span>
        </a>
        <a className={css.link2} href="#downloads">
          <span className={css.label}>{v.t("home.specify.bim")}</span>
          <span className={css.label2}>{v.t("home.specify.bimText")}</span>
        </a>
        <a className={css.link2} href="/find-a-rep">
          <span className={css.label}>{v.t("common.findRep")}</span>
          <span className={css.label2}>{v.t("home.specify.repText")}</span>
        </a>
      </div>
    </section>
  );
}
