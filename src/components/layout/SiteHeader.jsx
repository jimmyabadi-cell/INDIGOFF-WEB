import { S } from "../../lib/dc.js";
import { BackIcon, DownloadIcon, ListIcon, MenuIcon, SearchIcon } from "./icons.jsx";
import "./layout.css";
import css from "./SiteHeader.module.css";

const LOGO_SRC = "/img/b8490b0b60f4124ee84a155bef6bdda9.svg";
const CURRENT_STYLE = "border-bottom: 1px solid #111111";
const PLAIN_BUTTON =
  "min-height: 44px; padding: 0; border: 0; background: transparent; cursor: pointer; font: inherit; letter-spacing: inherit; text-transform: inherit; color: #111111";

const STYLES = {
  // Páginas con menú lateral (home, Downloads, Find a rep, onoff studio).
  default: {
    right:
      "flex: 1 1 380px; display: flex; flex-wrap: wrap; justify-content: flex-end; align-items: center; gap: 4px 20px; font-family: Urbanist, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase",
    lang: "display: inline-flex; align-items: center; gap: 2px; color: #6B675F",
    logo: "flex: 0 0 auto; font-family: Urbanist, sans-serif; font-weight: 600; font-size: 26px; letter-spacing: -0.03em",
    list: PLAIN_BUTTON,
  },
  // Páginas de colección: flecha de volver en lugar del menú.
  collection: {
    right:
      "flex: 1 1 260px; display: flex; align-items: center; justify-content: flex-end; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase",
    lang: "margin-right: 24px; display: inline-flex; align-items: center; gap: 2px; color: #6B675F",
    logo: "flex: 0 0 auto; color: #111111; text-decoration: none; font-family: Urbanist, sans-serif; font-weight: 600; font-size: 26px; letter-spacing: -0.03em",
    list: PLAIN_BUTTON + "; margin-right: 28px",
  },
};

/**
 * Header sticky del sitio.
 *
 * @param {object} props
 * @param {object} props.v          View model de la página (menú, idioma, lista, búsqueda).
 * @param {object} props.labels     Textos ya traducidos: downloads, findRep, list, contact, back.
 * @param {"default"|"collection"} [props.variant]
 * @param {"downloads"|"find-a-rep"} [props.current]  Página actual, para marcar su link.
 * @param {string} [props.logoHref]
 * @param {boolean} [props.search]  Muestra el botón de búsqueda.
 */
export default function SiteHeader({ v, labels, variant = "default", current, logoHref = "/", search = false }) {
  const st = STYLES[variant];
  const isCollection = variant === "collection";

  return (
    <header className={"site-hd " + css.header}>
      <div className={"hd-in " + css.box}>
        {isCollection ? (
          <BackLink label={labels.back} />
        ) : (
          <nav aria-label="Main" className={"hd-l " + css.nav}>
            <button
              type="button"
              onClick={v.openMenu}
              aria-haspopup="dialog"
              aria-expanded={v.menuOnStr}
              className="hd-menu"
              aria-label={v.dwMenuLbl}
            >
              <MenuIcon />
              <span>{v.dwMenuLbl}</span>
            </button>
            <DownloadsLink label={labels.downloads} current={current === "downloads"} />
          </nav>
        )}

        <a href={logoHref} className="hd-logo" style={S(st.logo)}>
          <img className={css.image} src={LOGO_SRC} width="306" height="82" alt="indigoff" />
        </a>

        <div className="hd-r" style={S(st.right)}>
          <LangSwitch v={v} style={st.lang} />
          {isCollection ? (
            <DownloadsLink label={labels.downloads} style="margin-right: 28px; color: #111111; text-decoration: none" />
          ) : null}
          {labels.findRep ? (
            <a
              href="/find-a-rep"
              className="hd-opt"
              aria-current={current === "find-a-rep" ? "page" : undefined}
              style={current === "find-a-rep" ? S(CURRENT_STYLE) : undefined}
            >
              {labels.findRep}
            </a>
          ) : null}
          {labels.list ? <ListButton v={v} label={labels.list} style={st.list} /> : null}
          {labels.contact ? (
            <a href="/contact" className={"hd-opt " + css.link}>
              {labels.contact}
            </a>
          ) : null}
          {search ? (
            <button className={css.button} type="button" aria-label={v.t("home.search.label")} onClick={v.openSearch}>
              <SearchIcon />
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function BackLink({ label }) {
  return (
    <a href="/" className={"hd-l hd-back " + css.link2} aria-label={label}>
      <span className={css.label}>
        <BackIcon />
        <span className="hd-back-lbl">{label}</span>
      </span>
    </a>
  );
}

/** Texto en tablet/desktop, icono en mobile (ver responsive.css). */
function DownloadsLink({ label, current = false, style }) {
  return (
    <a
      href="/downloads"
      className="hd-dl"
      aria-label={label}
      aria-current={current ? "page" : undefined}
      style={current ? S(CURRENT_STYLE) : style ? S(style) : undefined}
    >
      <DownloadIcon />
      <span className="hd-dl-lbl">{label}</span>
    </a>
  );
}

function LangSwitch({ v, style }) {
  const btn = (color) =>
    S(
      `min-height: 44px; padding: 0 4px; border: 0; background: transparent; cursor: pointer; font: inherit; letter-spacing: inherit; text-transform: inherit; color: ${color}`,
    );
  return (
    <span className="hd-lang" style={S(style)}>
      <button type="button" onClick={v.setEn} aria-pressed={v.isEn} aria-label="EN · English" style={btn(v.enColor)}>
        {"EN"}
      </button>
      <span aria-hidden="true">{"·"}</span>
      <button type="button" onClick={v.setEs} aria-pressed={v.isEs} aria-label="ES · Español" style={btn(v.esColor)}>
        {"ES"}
      </button>
    </span>
  );
}

/** "My list (n)" en desktop; icono + contador en tablet/mobile. */
function ListButton({ v, label, style }) {
  return (
    <button type="button" onClick={v.openList} className="hd-list" style={S(style)}>
      <ListIcon />
      <span className="hd-list-lbl">
        {label}
        {" ("}
      </span>
      <span className="hd-list-n">{v.listCount}</span>
      <span className="hd-list-lbl">{")"}</span>
    </button>
  );
}
