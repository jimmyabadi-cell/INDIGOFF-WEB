import { useState } from "react";
import css from "./Contact.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Suscripción al newsletter. */
export default function Contact({ v }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | invalid | failed

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading" || status === "done") return;
    if (!EMAIL_RE.test(email.trim())) { setStatus("invalid"); return; }
    setStatus("loading");
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(r.ok ? "done" : r.status === 400 ? "invalid" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <section className={css.contact} id="contact">
      <h2 className={css.heading}>{v.t("home.contact.title")}</h2>
      <p className={css.text}>{v.t("home.contact.text")}</p>
      {status === "done" ? (
        <p className={css.text}>{v.t("home.newsletter.thanks")}</p>
      ) : (
        <form className={css.form} onSubmit={handleSubmit} noValidate>
          <label className={css.field}>
            {v.t("home.contact.email")}
            <input
              className={css.input}
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              required
            />
          </label>
          <button className={css.button} type="submit" disabled={status === "loading"}>
            {status === "loading" ? "…" : v.t("home.contact.signUp")}
          </button>
          {status === "invalid" || status === "failed" ? (
            <p className={css.text} role="alert" style={{ color: "#c0392b" }}>
              {v.t(status === "failed" ? "home.newsletter.failed" : "home.newsletter.invalid")}
            </p>
          ) : null}
        </form>
      )}
    </section>
  );
}
