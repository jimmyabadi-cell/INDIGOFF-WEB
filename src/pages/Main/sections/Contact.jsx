import { useState } from "react";
import css from "./Contact.module.css";

/** Suscripción al newsletter. */
export default function Contact({ v }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading" || status === "done") return;
    setStatus("loading");
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(r.ok ? "done" : "error");
    } catch {
      setStatus("error");
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
          {status === "error" && (
            <p className={css.text} role="alert" style={{ color: "#c0392b" }}>
              {v.t("home.newsletter.invalid")}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
