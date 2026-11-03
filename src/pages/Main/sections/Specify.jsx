import { S } from "../../../lib/dc.js";

/** Servicios para especificar: cita, estudio, muestras, BIM, representante. */
export default function Specify({ v }) {
  return (
    <section
      id="specify"
      style={S("max-width: 1440px; margin: 0 auto; padding: calc(160px * var(--vs)) var(--gutter) 0")}
    >
      <h2
        style={S(
          "margin: 0 0 48px; text-align: center; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
        )}
      >
        {v.t("home.specify.eyebrow")}
      </h2>
      <div
        className="spec-row"
        style={S("display: flex; flex-wrap: wrap; border-top: 1px solid #ECE9E4; border-bottom: 1px solid #ECE9E4")}
      >
        <a
          href="#appointment"
          style={S(
            "flex: 1 1 260px; padding: 48px min(32px, var(--gutter)); text-align: center; display: flex; flex-direction: column; gap: 10px",
          )}
        >
          <span style={S("font-family: Urbanist, sans-serif; font-weight: 300; font-size: 22px")}>
            {v.t("home.specify.appointment")}
          </span>
          <span style={S("font-size: 14px; color: #5E5A53")}>{v.t("home.specify.appointmentText")}</span>
        </a>
        <a
          href="#acoustics"
          style={S(
            "flex: 1 1 260px; padding: 48px min(32px, var(--gutter)); text-align: center; display: flex; flex-direction: column; gap: 10px; border-left: 1px solid #ECE9E4",
          )}
        >
          <span style={S("font-family: Urbanist, sans-serif; font-weight: 300; font-size: 22px")}>
            {v.t("home.specify.study")}
          </span>
          <span style={S("font-size: 14px; color: #5E5A53")}>{v.t("home.specify.studyText")}</span>
        </a>
        <a
          href="#samples"
          style={S(
            "flex: 1 1 260px; padding: 48px min(32px, var(--gutter)); text-align: center; display: flex; flex-direction: column; gap: 10px; border-left: 1px solid #ECE9E4",
          )}
        >
          <span style={S("font-family: Urbanist, sans-serif; font-weight: 300; font-size: 22px")}>
            {v.t("home.specify.samples")}
          </span>
          <span style={S("font-size: 14px; color: #5E5A53")}>{v.t("home.specify.samplesText")}</span>
        </a>
        <a
          href="#downloads"
          style={S(
            "flex: 1 1 260px; padding: 48px min(32px, var(--gutter)); text-align: center; display: flex; flex-direction: column; gap: 10px; border-left: 1px solid #ECE9E4",
          )}
        >
          <span style={S("font-family: Urbanist, sans-serif; font-weight: 300; font-size: 22px")}>
            {v.t("home.specify.bim")}
          </span>
          <span style={S("font-size: 14px; color: #5E5A53")}>{v.t("home.specify.bimText")}</span>
        </a>
        <a
          href="/find-a-rep"
          style={S(
            "flex: 1 1 260px; padding: 48px min(32px, var(--gutter)); text-align: center; display: flex; flex-direction: column; gap: 10px; border-left: 1px solid #ECE9E4",
          )}
        >
          <span style={S("font-family: Urbanist, sans-serif; font-weight: 300; font-size: 22px")}>
            {v.t("common.findRep")}
          </span>
          <span style={S("font-size: 14px; color: #5E5A53")}>{v.t("home.specify.repText")}</span>
        </a>
      </div>
    </section>
  );
}
