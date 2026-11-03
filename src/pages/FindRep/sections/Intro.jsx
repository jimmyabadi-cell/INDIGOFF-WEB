import { S } from "../../../lib/dc.js";

/** Título, introducción y buscador de estado. */
export default function Intro({ v }) {
  return (
    <section
      id="content"
      style={S(
        "max-width: 1440px; margin: 0 auto; padding: calc(120px * var(--vs)) var(--gutter) 56px; text-align: center",
      )}
    >
      <h1
        style={S(
          "margin: 0 0 24px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(44px, 6vw, 88px); line-height: 1; letter-spacing: -0.04em",
        )}
      >
        {v.t("common.findRep")}
      </h1>
      <p style={S("margin: 0 auto; max-width: 560px; font-size: 18px; color: #3A3935")}>{v.t("findRep.intro")}</p>
      <label
        style={S(
          "margin: 48px auto 0; max-width: 520px; display: flex; align-items: center; gap: 16px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
        )}
      >
        {v.t("findRep.stateLabel")}
        <input
          type="search"
          placeholder={v.t("findRep.statePlaceholder")}
          value={v.q}
          onChange={v.onQuery}
          style={S(
            "flex: 1 1 auto; min-width: 0; min-height: 48px; border: 0; border-bottom: 1px solid #111111; background: transparent; font-family: 'IBM Plex Sans', sans-serif; font-size: 17px; font-weight: 300; letter-spacing: 0; text-transform: none; color: #111111; padding: 0 2px",
          )}
        />
      </label>
      {v.noMatch ? (
        <>
          <p style={S("margin: 14px 0 0; font-size: 14px; color: #645DC5")}>{v.t("findRep.notFound")}</p>
        </>
      ) : null}
    </section>
  );
}
