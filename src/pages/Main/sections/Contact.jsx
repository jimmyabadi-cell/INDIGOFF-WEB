import css from "./Contact.module.css";

/** Suscripción por correo. */
export default function Contact({ v }) {
  return (
    <section className={css.contact} id="contact">
      <h2 className={css.heading}>{v.t("home.contact.title")}</h2>
      <p className={css.text}>{v.t("home.contact.text")}</p>
      <form className={css.form}>
        <label className={css.field}>
          {v.t("home.contact.email")}
          <input className={css.input} type="email" name="email" autoComplete="email" />
        </label>
        <button className={css.button} type="button">
          {v.t("home.contact.signUp")}
        </button>
      </form>
    </section>
  );
}
