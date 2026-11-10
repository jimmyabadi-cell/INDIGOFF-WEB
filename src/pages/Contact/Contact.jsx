import { useState } from "react";
import { useLocation } from "react-router-dom";
import { DW_CATS, DW_FIN, ifoSetPending } from "../../lib/nav.js";
import { listSet } from "../../lib/savedList.js";
import { usePageChrome } from "../../hooks/usePageChrome.js";
import "../OnoffStudio/OnoffStudio.css";

import SiteHeader from "../../components/layout/SiteHeader.jsx";
import SideMenu from "../../components/layout/SideMenu.jsx";
import CompactFooter from "../../components/layout/CompactFooter.jsx";
import css from "./Contact.module.css";

const NAV = { DW_CATS, DW_FIN, ifoSetPending };
const EMAIL = "info@indigoff.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Valores iniciales del formulario (también al escribir otro mensaje): todos los campos, para que sigan controlados.
const EMPTY_FORM = { name: "", lastName: "", phone: "", email: "", company: "", message: "" };

const FIELDS = [
  { name: "name", type: "text", autoComplete: "given-name", required: true },
  { name: "lastName", type: "text", autoComplete: "family-name" },
  { name: "phone", type: "tel", autoComplete: "tel" },
  { name: "email", type: "email", autoComplete: "email", required: true },
  { name: "company", type: "text", autoComplete: "organization" },
];

/** Errores por campo (claves de contact.errors), vacío si todo está bien. */
function validate(f) {
  const err = {};
  if (!f.name.trim()) err.name = "required";
  if (!f.email.trim()) err.email = "required";
  else if (!EMAIL_RE.test(f.email.trim())) err.email = "email";
  return err;
}

/** Respaldo si la API falla: abre la app de correo del usuario con el mensaje ya armado. */
function openMail(f, t) {
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

/**
 * Envía el formulario a la función api/contact.js.
 * @returns {Promise<"sent" | "mail" | string[]>} "sent", "mail" si hay que usar el respaldo, o los campos inválidos.
 */
async function sendContact(f, lang) {
  try {
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, lang }),
    });
    if (r.ok) return "sent";
    if (r.status === 400) {
      const { fields } = await r.json();
      if (Array.isArray(fields) && fields.length) return fields;
    }
  } catch (e) {}
  return "mail";
}

export default function Contact() {
  const { lang, chrome: v } = usePageChrome({ nav: NAV });
  const location = useLocation();
  const listItems = location.state?.listItems || [];
  const repInfo = location.state?.repInfo || null;
  const isRepRequest = location.state?.intent === "rep";
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  // "idle" · "sending" · "sent" (llegó por la API) · "mail" (se abrió la app de correo)
  const [status, setStatus] = useState("idle");

  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const el = e.currentTarget.elements;
    const err = validate(form);
    setErrors(err);
    const first = Object.keys(err)[0];
    if (first) {
      el[first].focus();
      return;
    }
    setStatus("sending");
    const result = await sendContact({ ...form, _hp: el._hp.value, listItems, repInfo, isRepRequest }, lang);
    if (Array.isArray(result)) {
      setErrors(Object.fromEntries(result.map((k) => [k, k === "email" ? "email" : "required"])));
      setStatus("idle");
      el[result[0]]?.focus();
      return;
    }
    if (result === "mail") openMail(form, v.t);
    if (result === "sent" && listItems.length > 0) listSet([]);
    setStatus(result);
  };

  const reset = () => {
    if (status === "sent") setForm(EMPTY_FORM);
    setStatus("idle");
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
          </dl>
        </div>

        {status === "sent" || status === "mail" ? (
          <div className={css.done} role="status">
            <h2 className={css.doneTitle}>{v.t("contact." + status + ".title")}</h2>
            <p className={css.text}>
              {v.t("contact." + status + ".text", { email: status === "sent" ? form.email.trim() : EMAIL })}
            </p>
            <button className={css.button} type="button" onClick={reset}>
              {v.t("contact." + status + ".back")}
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
            {repInfo && (
              <div className={css.repCard}>
                <p className={css.selectionTitle}>Your representative</p>
                <p className={css.repName}>{repInfo.name}</p>
                {repInfo.selectedPlace && <p className={css.repDetail}>{repInfo.selectedPlace}</p>}
                {repInfo.email && (
                  <a className={css.repEmail} href={"mailto:" + repInfo.email}>
                    {repInfo.email}
                  </a>
                )}
              </div>
            )}
            {listItems.length > 0 && (
              <div className={css.selection}>
                <p className={css.selectionTitle}>Your selection</p>
                <div className={css.selectionGrid}>
                  {listItems.map((item, i) => (
                    <a key={i} className={css.selectionItem} href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.img && <img className={css.selectionThumb} src={item.img} alt={item.name} loading="lazy" />}
                      <span className={css.selectionName}>{item.name}</span>
                      {item.kind && <span className={css.selectionKind}>{item.kind}</span>}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {field("message", (p) => (
              <textarea className={css.input + " " + css.textarea} rows={5} {...p} />
            ))}
            {/* Campo trampa para bots (ver api/contact.js): oculto y fuera del orden de tabulación. */}
            <input className={css.trap} type="text" name="_hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button className={css.button} type="submit" disabled={status === "sending"}>
              {status === "sending" ? v.t("contact.sending") : v.t("contact.send")}
            </button>
          </form>
        )}
      </main>
      <CompactFooter homeLabel={v.t("common.backToHome")} />
      <SideMenu v={v} labels={labels} />
    </div>
  );
}
