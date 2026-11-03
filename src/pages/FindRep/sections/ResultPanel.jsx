import React from "react";
import { S } from "../../../lib/dc.js";

/** Representante del estado o territorio elegido. */
export default function ResultPanel({ v }) {
  return (
    <aside
      id="rep-result"
      aria-live="polite"
      style={S(
        "flex: 1 1 340px; min-width: 0; border-top: 1px solid #111111; padding-top: 28px; scroll-margin-top: calc(var(--hd-h) + 16px)",
      )}
    >
      <p
        style={S(
          "margin: 0 0 6px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
        )}
      >
        {v.resultLabel}
      </p>
      <h2
        style={S(
          "margin: 0 0 28px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: 40px; line-height: 1.05; letter-spacing: -0.04em",
        )}
      >
        {v.resultPlace}
      </h2>
      {(v.results || []).map((r, r__i) => (
        <React.Fragment key={r__i}>
          <div style={S("padding: 24px 0; border-bottom: 1px solid #ECE9E4")}>
            <p
              style={S(
                "margin: 0; font-family: Urbanist, sans-serif; font-weight: 400; font-size: 24px; letter-spacing: -0.02em",
              )}
            >
              {r.name}
            </p>
            {r.hasContact ? (
              <>
                <p style={S("margin: 4px 0 0; color: #3A3935")}>{r.contact}</p>
              </>
            ) : null}
            <p
              style={S(
                "margin: 10px 0 0; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
              )}
            >
              {r.territory}
            </p>
            <div style={S("margin-top: 20px; display: flex; flex-wrap: wrap; gap: 10px")}>
              <a
                href={r.mail}
                style={S(
                  "display: inline-flex; align-items: center; min-height: 44px; padding: 0 22px; background: #645DC5; color: #FFFFFF; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase",
                )}
              >
                {v.t("findRep.email")}
              </a>
              {r.hasPhone ? (
                <>
                  <a
                    href={r.tel}
                    style={S(
                      "display: inline-flex; align-items: center; min-height: 44px; padding: 0 22px; border: 1px solid #111111; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase",
                    )}
                  >
                    {r.phone}
                  </a>
                </>
              ) : null}
            </div>
            <p style={S("margin: 14px 0 0; font-size: 14px; color: #6B675F; overflow-wrap: anywhere")}>{r.email}</p>
          </div>
        </React.Fragment>
      ))}
      {v.showHint ? (
        <>
          <p style={S("margin: 0; color: #5E5A53")}>{v.t("findRep.hint")}</p>
        </>
      ) : null}
    </aside>
  );
}
