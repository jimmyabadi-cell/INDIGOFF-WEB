import React from "react";
import { Link } from "react-router-dom";
import css from "./ListPanel.module.css";
import { imgProps, SIZES } from "../lib/images.js";

/**
 * Panel de Mi lista (home y páginas de colección).
 *
 * @param {object} props
 * @param {object} props.v          View model con `listOn`, `listItems`, `closeList`…
 * @param {string} [props.homeHref]  Link del logo; con "#…" (la home) además cierra el panel.
 */
export default function ListPanel({ v, homeHref = "/" }) {
  return (
    <>
      {v.listOn ? (
        <>
          <div className={css.box} role="dialog" aria-modal="true" aria-label={v.t("list.title")}>
            <header className={css.header}>
              <div className={css.box2}>
                <span className={css.label}>
                  <button className={css.button} type="button" onClick={v.closeList}>
                    <span className={css.label2}>
                      <svg
                        className={css.icon}
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 5l-7 7 7 7"></path>
                      </svg>
                      {v.t("common.back")}
                    </span>
                  </button>
                </span>
                <a
                  className={css.link}
                  href={homeHref}
                  onClick={homeHref.startsWith("#") ? v.closeList : undefined}
                  aria-label={v.t("collection.homeLabel")}
                >
                  <img
                    className={css.image}
                    src="/img/b8490b0b60f4124ee84a155bef6bdda9.svg"
                    width="306"
                    height="82"
                    alt="indigoff"
                  />
                </a>
                <span className={css.label3}></span>
              </div>
            </header>
            <div className={css.box3}>
              <div className={css.box4}>
                <h1 className={css.title}>{v.t("list.title")}</h1>
                <p className={css.text}>{v.t("list.intro")}</p>
              </div>
              {v.listEmpty ? (
                <>
                  <p className={css.text2}>{v.t("list.empty")}</p>
                </>
              ) : null}
              {v.listHas ? (
                <>
                  <div className={css.box5}>
                    <Link
                      className={css.link2}
                      to="/contact"
                      state={{
                        intent: "rep",
                        listItems: (v.listItems || []).map(({ name, kind, img, href }) => ({ name, kind, img, href })),
                      }}
                      onClick={v.closeList}
                    >
                      {v.t("list.sendToRep")}
                    </Link>
                    <Link
                      className={css.link3}
                      to="/contact"
                      state={{
                        listItems: (v.listItems || []).map(({ name, kind, img, href }) => ({ name, kind, img, href })),
                      }}
                      onClick={v.closeList}
                    >
                      {v.t("list.email")}
                    </Link>
                    <button className={css.button2} type="button" onClick={v.clearList}>
                      {v.t("list.clear")}
                    </button>
                  </div>
                  <div className={css.box6} role="list">
                    {(v.listItems || []).map((it, it__i) => (
                      <React.Fragment key={it__i}>
                        <div className={css.box7} role="listitem">
                          <img
                            loading="lazy"
                            decoding="async"
                            className={css.image2}
                            {...imgProps(it.img, SIZES.thumb)}
                            alt={it.name}
                          />
                          <span className={css.label4}>{it.kind}</span>
                          <span className={css.label5}>{it.name}</span>
                          <button
                            className={css.button3}
                            type="button"
                            onClick={it.remove}
                            aria-label={v.t("list.removeItem", { name: it.name })}
                          >
                            {v.t("list.remove")}
                          </button>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
