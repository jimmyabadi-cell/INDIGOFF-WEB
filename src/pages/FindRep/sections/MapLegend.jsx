import { S } from "../../../lib/dc.js";

/** Leyenda del mapa. */
export default function MapLegend({ v }) {
  return (
    <div
      style={S(
        "margin-top: 20px; display: flex; flex-wrap: wrap; gap: 8px 28px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
      )}
    >
      <span style={S("display: inline-flex; align-items: center; gap: 10px")}>
        <span style={S("width: 14px; height: 14px; background: #D9DAEF")}></span>
        {v.t("findRep.legend.territory")}
      </span>
      <span style={S("display: inline-flex; align-items: center; gap: 10px")}>
        <span style={S("width: 14px; height: 14px; background: #645DC5")}></span>
        {v.t("findRep.legend.selected")}
      </span>
      <span style={S("display: inline-flex; align-items: center; gap: 10px")}>
        <span style={S("width: 14px; height: 14px; background: #F1EEE9; border: 1px solid #E4DFD7")}></span>
        {v.t("findRep.legend.direct")}
      </span>
    </div>
  );
}
