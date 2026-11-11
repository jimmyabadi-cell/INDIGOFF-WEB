import { S } from "../../lib/dc.js";
import css from "./CompactFooter.module.css";

/**
 * Footer de una línea de las páginas secundarias (Downloads, Find a rep, onoff studio).
 *
 * @param {object} props
 * @param {string} props.homeLabel   Texto ya traducido del link a la home.
 * @param {{ privacy: string, terms: string }} [props.legal]  Textos de los links legales.
 * @param {string} [props.background]
 */
export default function CompactFooter({ homeLabel, legal, background = "#F4F1EB" }) {
  return (
    <footer style={S(`border-top: 1px solid #ECE9E4; background: ${background}`)}>
      <div className={css.box}>
        <span>{"© Indigoff"}</span>
        <span className={css.links}>
          {legal ? (
            <>
              <a className={css.link} href="/privacy-policy">
                {legal.privacy}
              </a>
              <a className={css.link} href="/terms-and-conditions">
                {legal.terms}
              </a>
            </>
          ) : null}
          <a className={css.link} href="/">
            {homeLabel}
          </a>
        </span>
      </div>
    </footer>
  );
}
