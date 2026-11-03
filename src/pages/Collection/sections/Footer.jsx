import { S } from "../../../lib/dc.js";

/** Footer de la página de colección. */
export default function Footer({ v }) {
  return (
    <footer
      style={S(
        "background: #F4F1EB; padding: 32px var(--gutter); display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px 32px; font-size: 11px; color: #6B675F",
      )}
    >
      <span>{"© 2026 Indigoff LLC"}</span>
      <a href="mailto:info@indigoff.com" style={S("color: #6B675F; text-decoration: none")}>
        {"info@indigoff.com"}
      </a>
      <a href="/" style={S("color: #6B675F; text-decoration: none")}>
        {v.t("common.backToHome")}
      </a>
    </footer>
  );
}
