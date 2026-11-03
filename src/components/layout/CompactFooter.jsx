import { S } from "../../lib/dc.js";

/**
 * Footer de una línea de las páginas secundarias (Downloads, Find a rep, onoff studio).
 *
 * @param {object} props
 * @param {string} props.homeLabel   Texto ya traducido del link a la home.
 * @param {string} [props.background]
 */
export default function CompactFooter({ homeLabel, background = "#F4F1EB" }) {
  return (
    <footer style={S(`border-top: 1px solid #ECE9E4; background: ${background}`)}>
      <div
        style={S(
          "max-width: 1440px; margin: 0 auto; padding: 48px var(--gutter); display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px; font-size: 11px; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: #6B675F",
        )}
      >
        <span>{"© Indigoff"}</span>
        <a href="/" style={S("color: #6B675F")}>
          {homeLabel}
        </a>
      </div>
    </footer>
  );
}
