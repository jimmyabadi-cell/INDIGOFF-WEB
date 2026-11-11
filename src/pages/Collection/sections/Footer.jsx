import css from "./Footer.module.css";

/** Footer de la página de colección. */
export default function Footer({ v }) {
  return (
    <footer className={css.footer}>
      <span>{"© 2026 Indigoff LLC"}</span>
      <a className={css.link} href="/contact">
        {"info@indigoff.com"}
      </a>
      <a className={css.link} href="/privacy-policy">
        {v.t("common.privacy")}
      </a>
      <a className={css.link} href="/terms-and-conditions">
        {v.t("common.terms")}
      </a>
      <a className={css.link} href="/">
        {v.t("common.backToHome")}
      </a>
    </footer>
  );
}
