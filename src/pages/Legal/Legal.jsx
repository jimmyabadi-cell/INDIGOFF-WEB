import { DW_CATS, DW_FIN, ifoSetPending } from "../../lib/nav.js";
import { usePageChrome } from "../../hooks/usePageChrome.js";
import "../OnoffStudio/OnoffStudio.css";

import SiteHeader from "../../components/layout/SiteHeader.jsx";
import SideMenu from "../../components/layout/SideMenu.jsx";
import CompactFooter from "../../components/layout/CompactFooter.jsx";
import { PRIVACY, TERMS } from "../../data/legal.js";
import css from "./Legal.module.css";

const NAV = { DW_CATS, DW_FIN, ifoSetPending };
const DOCS = { privacy: PRIVACY, terms: TERMS };

// **negritas**, [texto](/ruta), correos y el teléfono gratuito.
const INLINE = /\*\*(.+?)\*\*|\[(.+?)\]\((\/[^)]*)\)|([\w.+-]+@[\w-]+\.[\w.]+\w)|(\+1 833-588-4862)/g;

/** Convierte el texto de un bloque (ver src/data/legal.js) en nodos con negritas y links. */
function rich(text) {
  const out = [];
  const re = new RegExp(INLINE); // copia propia: rich() se llama a sí misma dentro de las negritas
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = out.length;
    if (m[1] !== undefined) out.push(<strong key={k}>{rich(m[1])}</strong>);
    else if (m[2] !== undefined)
      out.push(
        <a key={k} href={m[3]}>
          {m[2]}
        </a>,
      );
    else if (m[4] !== undefined)
      out.push(
        <a key={k} href={"mailto:" + m[4]}>
          {m[4]}
        </a>,
      );
    else
      out.push(
        <a key={k} href={"tel:" + m[5].replace(/[^\d+]/g, "")}>
          {m[5]}
        </a>,
      );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Block({ b }) {
  if (b.p) return <p className={css.p}>{rich(b.p)}</p>;
  if (b.note) return <p className={css.note}>{rich(b.note)}</p>;
  if (b.caps) return <p className={css.caps}>{rich(b.caps)}</p>;
  if (b.ol || b.ul) {
    const List = b.ol ? "ol" : "ul";
    return (
      <List className={css.list}>
        {(b.ol || b.ul).map((item, i) => (
          <li key={i}>{rich(item)}</li>
        ))}
      </List>
    );
  }
  if (b.table)
    return (
      <div className={css.tableWrap}>
        <table className={css.table}>
          <thead>
            <tr>
              {b.table.head.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.table.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td key={i} data-label={b.table.head[i]}>
                      {rich(cell)}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (b.callout)
    return (
      <div className={css.callout}>
        {b.callout.map((c, i) => (
          <Block key={i} b={c} />
        ))}
      </div>
    );
  if (b.address)
    return (
      <address className={css.address}>
        <strong>{b.address.name}</strong>
        {b.address.lines.map((l) => (
          <span key={l}>{rich(l)}</span>
        ))}
      </address>
    );
  return null;
}

/**
 * Página legal (Privacy Policy, Terms and Conditions) a partir de un documento de src/data/legal.js.
 *
 * @param {object} props
 * @param {"privacy"|"terms"} props.doc
 */
export default function Legal({ doc: key }) {
  const doc = DOCS[key];
  const { chrome: v } = usePageChrome({ nav: NAV });
  const labels = { downloads: v.t("common.downloads"), findRep: v.t("common.findRep") };
  const toc = (
    <ol className={css.tocList}>
      {doc.sections.map((s, i) => (
        <li key={s.id}>
          <a href={"#" + s.id}>
            <span className="tnum">{i + 1}.</span> {s.title}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <div className={css.page}>
      <a className="skip" href="#content">
        {v.t("common.skipToContent")}
      </a>
      <SiteHeader v={v} labels={labels} />
      <main className={css.main} id="content">
        <header className={css.head}>
          <p className={css.eyebrow}>{"Indigoff · Architectural Acoustic Solutions"}</p>
          <h1 className={css.title}>{doc.title}</h1>
          <p className={css.updated}>{"Last Updated: " + doc.updated}</p>
        </header>
        <div className={css.layout}>
          <nav className={css.toc} aria-label={doc.title}>
            {/* Mobile y tablet: índice plegable. Desktop: índice fijo al costado (ver Legal.module.css). */}
            <details className={css.tocMobile}>
              <summary>{"Contents"}</summary>
              {toc}
            </details>
            <div className={css.tocDesktop}>{toc}</div>
          </nav>
          <article className={css.body}>
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} className={css.section}>
                <h2 className={css.h2}>
                  <span className="tnum">{i + 1}.</span> {s.title}
                </h2>
                {s.blocks.map((b, j) => (
                  <Block key={j} b={b} />
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>
      <CompactFooter
        homeLabel={v.t("common.backToHome")}
        legal={{ privacy: v.t("common.privacy"), terms: v.t("common.terms") }}
      />
      <SideMenu v={v} labels={labels} />
    </div>
  );
}
