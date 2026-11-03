import { useState } from "react";
import { DW_CATS, DW_FIN, ifoSetPending } from "../../lib/nav.js";
import { usePageChrome } from "../../hooks/usePageChrome.js";
import "../OnoffStudio/OnoffStudio.css";

import SiteHeader from "../../components/layout/SiteHeader.jsx";
import SideMenu from "../../components/layout/SideMenu.jsx";
import CompactFooter from "../../components/layout/CompactFooter.jsx";
import css from "./Contact.module.css";

const NAV = { DW_CATS, DW_FIN, ifoSetPending };
const EMAIL = "info@indigoff.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELDS = [
  { name: "name", type: "text", autoComplete: "given-name", required: true },
  { name: "lastName", type: "text", autoComplete: "family-name" },
  { name: "phone", type: "tel", autoComplete: "tel" },
  { name: "email", type: "email", autoComplete: "email", required: true },
];

/** Errores por campo (claves de contact.errors), vacío si todo está bien. */
function validate(f) {
  const err = {};
  if (!f.name.trim()) err.name = "required";
  if (!f.email.trim()) err.email = "required";
  else if (!EMAIL_RE.test(f.email.trim())) err.email = "email";
  if (!f.message.trim()) err.message = "required";
  return err;
}

/**
 * Sin backend: arma el correo con los datos del formulario y lo abre en la app de correo del usuario.
 * Para enviarlo directo desde el sitio, cambiar solo esta función (p. ej. un fetch a un servicio de formularios).
 */
function sendContact(f, t) {
  const fullName = [f.name, f.lastName]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ");
  const body = [
    t("contact.fields.name") + ": " + fullName,
    t("contact.fields.phone") + ": " + (f.phone.trim() || "—"),
    t("contact.fields.email") + ": " + f.email.trim(),
    "",
    f.message.trim(),
  ].join("\n");
  const subject = t("contact.mailSubject", { name: fullName });
  window.location.href =
    "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
}

export default function Contact() {
  const { chrome: v } = usePageChrome({ nav: NAV });
  const [form, setForm] = useState({ name: "", lastName: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const err = validate(form);
    setErrors(err);
    const first = Object.keys(err)[0];
    if (first) {
      e.currentTarget.elements[first].focus();
      return;
    }
    sendContact(form, v.t);
    setSent(true);
  };

  const field = (name, input) => {
    const err = errors[name];
    return (
      <div className={css.field} key={name}>
        <label className={css.label} htmlFor={"c-" + name}>
          {v.t("contact.fields." + name)}
        </label>
        {input({
          id: "c-" + name,
          name,
          value: form[name],
          onChange: change,
          placeholder: v.t("contact.fields." + name),
          "aria-invalid": err ? "true" : undefined,
          "aria-describedby": err ? "c-" + name + "-err" : undefined,
        })}
        {err ? (
          <p className={css.error} id={"c-" + name + "-err"}>
            {v.t("contact.errors." + err)}
          </p>
        ) : null}
      </div>
    );
  };

  const labels = { downloads: v.t("common.downloads"), findRep: v.t("common.findRep") };
  return (
    <div className={css.page}>
      <a className="skip" href="#content">
        {v.t("common.skipToContent")}
      </a>
      <SiteHeader v={v} labels={labels} />
      <main className={css.main} id="content">
        <div className={css.intro}>
          <h1 className={css.title}>{v.t("contact.title")}</h1>
          <p className={css.text}>{v.t("contact.text")}</p>
          <dl className={css.info}>
            <dt>{v.t("contact.emailUs")}</dt>
            <dd>
              <a href={"mailto:" + EMAIL}>{EMAIL}</a>
            </dd>
            <dt>{v.t("contact.repTitle")}</dt>
            <dd>
              <a href="/find-a-rep">{v.t("common.findRep")}</a>
            </dd>
          </dl>
        </div>

        {sent ? (
          <div className={css.done} role="status">
            <h2 className={css.doneTitle}>{v.t("contact.sent.title")}</h2>
            <p className={css.text}>{v.t("contact.sent.text", { email: EMAIL })}</p>
            <button className={css.button} type="button" onClick={() => setSent(false)}>
              {v.t("contact.sent.back")}
            </button>
          </div>
        ) : (
          <form className={css.form} onSubmit={submit} noValidate>
            {FIELDS.map((f) =>
              field(f.name, (p) => (
                <input
                  className={css.input}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  aria-required={f.required ? "true" : undefined}
                  {...p}
                />
              )),
            )}
            {field("message", (p) => (
              <textarea className={css.input + " " + css.textarea} rows={5} aria-required="true" {...p} />
            ))}
            <button className={css.button} type="submit">
              {v.t("contact.send")}
            </button>
          </form>
        )}
      </main>
      <CompactFooter homeLabel={v.t("common.backToHome")} />
      <SideMenu v={v} labels={labels} />
    </div>
  );
}
