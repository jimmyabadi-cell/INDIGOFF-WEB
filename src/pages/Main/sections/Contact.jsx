import { S } from "../../../lib/dc.js";

/** Suscripción por correo. */
export default function Contact({ v }) {
  return (
    <section
      id="contact"
      style={S(
        "max-width: 1440px; margin: 0 auto; padding: calc(160px * var(--vs)) var(--gutter) calc(140px * var(--vs)); text-align: center",
      )}
    >
      <h2
        style={S(
          "margin: 0 0 12px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: clamp(30px, 3vw, 44px); letter-spacing: -0.03em",
        )}
      >
        {v.t("home.contact.title")}
      </h2>
      <p style={S("margin: 0 auto 32px; max-width: 420px; color: #5E5A53")}>{v.t("home.contact.text")}</p>
      <form
        style={S(
          "margin: 0 auto; max-width: 520px; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center",
        )}
      >
        <label
          style={S(
            "flex: 1 1 280px; display: flex; flex-direction: column; text-align: left; font-size: 10px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; color: #6B675F",
          )}
        >
          {v.t("home.contact.email")}
          <input
            type="email"
            name="email"
            autoComplete="email"
            style={S(
              "min-height: 48px; border: 0; border-bottom: 1px solid #111111; background: transparent; padding: 0; font-family: inherit; font-size: 16px; color: #111111",
            )}
          />
        </label>
        <button
          type="button"
          style={S(
            "min-height: 48px; padding: 0 36px; border: 0; background: #645DC5; color: #FFFFFF; font-family: inherit; font-size: 11px; font-weight: 400; letter-spacing: 0.24em; text-transform: uppercase; cursor: pointer; align-self: flex-end",
          )}
        >
          {v.t("home.contact.signUp")}
        </button>
      </form>
    </section>
  );
}
