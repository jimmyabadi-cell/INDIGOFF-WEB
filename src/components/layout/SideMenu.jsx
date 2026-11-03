import React from "react";
import { CloseIcon } from "./icons.jsx";
import "./layout.css";
import css from "./SideMenu.module.css";

/**
 * Menú lateral (drawer). El estado y los textos vienen de usePageChrome (`v.menuOn`, `v.dwCats`, ...).
 *
 * @param {object} props
 * @param {object} props.v       View model de la página.
 * @param {object} props.labels  Textos ya traducidos: downloads, findRep.
 */
export default function SideMenu({ v, labels }) {
  if (!v.menuOn) return null;
  return (
    <>
      <div className="dw-back" onClick={v.closeMenu}></div>
      <aside className="dw" role="dialog" aria-modal="true" aria-label={v.dwMenu}>
        <div className="dw-hd">
          <button type="button" onClick={v.closeMenu} className="dw-x">
            <CloseIcon />
            <span>{v.dwClose}</span>
          </button>
          <img className={css.image} src="/img/b8490b0b60f4124ee84a155bef6bdda9.svg" alt="indigoff" />
        </div>
        <div className="dw-body">
          <p className="dw-g">{v.dwCat}</p>
          {(v.dwCats || []).map((m, i) => (
            <div className="dw-item" key={i}>
              <a href={m.href} onClick={v.closeMenu} className="dw-big">
                {m.name}
              </a>
              <div className="dw-subs">
                {(m.subs || []).map((u, j) => (
                  <a href={u.href} onClick={u.go} className="dw-sub" key={j}>
                    {u.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <p className="dw-g">{v.dwFin}</p>
          <div className="dw-subs dw-fin">
            {(v.dwFins || []).map((m, i) => (
              <React.Fragment key={i}>
                {m.isBtn ? (
                  <button type="button" onClick={m.go} className="dw-mid">
                    {m.name}
                  </button>
                ) : null}
                {m.isLink ? (
                  <a href={m.href} className="dw-mid">
                    {m.name}
                  </a>
                ) : null}
              </React.Fragment>
            ))}
          </div>
          <div className="dw-two">
            <a href={v.dwConHref} onClick={v.closeMenu} className="dw-big">
              {v.dwCon}
            </a>
            <a href={v.dwProHref} onClick={v.closeMenu} className="dw-big">
              {v.dwPro}
            </a>
            <a href="/onoff-studio" onClick={v.closeMenu} className="dw-big">
              {"onoff studio"}
            </a>
          </div>
          <div className="dw-util">
            <a href="/downloads" onClick={v.closeMenu}>
              {labels.downloads}
            </a>
            <a href="/find-a-rep" onClick={v.closeMenu}>
              {labels.findRep}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
