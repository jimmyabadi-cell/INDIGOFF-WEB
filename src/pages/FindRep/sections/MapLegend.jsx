import css from "./MapLegend.module.css";

/** Leyenda del mapa. */
export default function MapLegend({ v }) {
  return (
    <div className={css.box}>
      <span className={css.label}>
        <span className={css.label2}></span>
        {v.t("findRep.legend.territory")}
      </span>
      <span className={css.label}>
        <span className={css.label3}></span>
        {v.t("findRep.legend.selected")}
      </span>
      <span className={css.label}>
        <span className={css.label4}></span>
        {v.t("findRep.legend.direct")}
      </span>
    </div>
  );
}
