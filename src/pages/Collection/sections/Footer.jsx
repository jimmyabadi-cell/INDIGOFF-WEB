import css from "./Footer.module.css";

/** Footer de la página de colección. */
export default function Footer({ v }) {
  return (
    <footer className={css.footer}>
      <span>{"© 2026 Indigoff LLC"}</span>
      <a className={css.link} href="/contact">
        {"info@indigoff.com"}
      </a>
      <a className={css.link} href="/">
        {v.t("common.backToHome")}
      </a>
    </footer>
  );
}
