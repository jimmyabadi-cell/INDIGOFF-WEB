import React from "react";
import css from "./ResultPanel.module.css";

/** Representante del estado o territorio elegido. */
export default function ResultPanel({ v }) {
  return (
    <aside className={css.repResult} id="rep-result" aria-live="polite">
      <p className={css.text}>{v.resultLabel}</p>
      <h2 className={css.heading}>{v.resultPlace}</h2>
      {(v.results || []).map((r, r__i) => (
        <React.Fragment key={r__i}>
          <div className={css.box}>
            <p className={css.text2}>{r.name}</p>
            {r.hasContact ? (
              <>
                <p className={css.text3}>{r.contact}</p>
              </>
            ) : null}
            <p className={css.text4}>{r.territory}</p>
            <div className={css.box2}>
              <button type="button" className={css.link} onClick={r.sendToRep}>
                {v.t("findRep.email")}
              </button>
              {r.hasPhone ? (
                <>
                  <a className={css.link2} href={r.tel}>
                    {r.phone}
                  </a>
                </>
              ) : null}
            </div>
            <p className={css.text5}>{r.email}</p>
          </div>
        </React.Fragment>
      ))}
      {v.showHint ? (
        <>
          <p className={css.text6}>{v.t("findRep.hint")}</p>
        </>
      ) : null}
    </aside>
  );
}
