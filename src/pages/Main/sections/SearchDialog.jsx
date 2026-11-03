import React from "react";
import css from "./SearchDialog.module.css";

/** Búsqueda global. */
export default function SearchDialog({ v }) {
  return (
    <>
      {v.searchOn ? (
        <>
          <div className="sr-back" onClick={v.closeSearch}></div>
          <div className="sr" role="dialog" aria-modal="true" aria-label={v.srLabel}>
            <div className="sr-in">
              <div className="sr-bar">
                <svg
                  className={css.icon}
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="1.4"
                >
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="M20 20l-4-4"></path>
                </svg>
                <input
                  type="search"
                  className="sr-input"
                  placeholder={v.srPh}
                  value={v.srQ}
                  onChange={v.srInput}
                  autoFocus
                  aria-label={v.srLabel}
                />
                <button type="button" onClick={v.closeSearch} className="sr-x" aria-label={v.srClose}>
                  <svg
                    className={css.icon2}
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  >
                    <path d="M5 5l14 14M19 5L5 19"></path>
                  </svg>
                </button>
              </div>
              {v.srNoQ ? (
                <>
                  <p className="sr-g">{v.srSuggest}</p>
                  <div className="sr-chips">
                    {(v.srChips || []).map((m, m__i) => (
                      <React.Fragment key={m__i}>
                        <a href={m.href} onClick={v.closeSearch} className="sr-chip">
                          {m.name}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              {v.srEmpty ? (
                <>
                  <p className="sr-none">{v.srNone}</p>
                </>
              ) : null}
              {v.srHas ? (
                <>
                  <p className="sr-g">{v.srCount}</p>
                  <div className="sr-list" role="list">
                    {(v.srResults || []).map((r, r__i) => (
                      <React.Fragment key={r__i}>
                        <div role="listitem">
                          {r.isLink ? (
                            <>
                              <a href={r.href} onClick={r.go} className="sr-row">
                                <span className="sr-img">
                                  <img src={r.img} alt="" loading="lazy" decoding="async" />
                                </span>
                                <span className="sr-t">
                                  <span className="sr-n">{r.name}</span>
                                  <span className="sr-k">{r.kind}</span>
                                </span>
                              </a>
                            </>
                          ) : null}
                          {r.isBtn ? (
                            <>
                              <button type="button" onClick={r.go} className="sr-row">
                                <span className="sr-img">
                                  <img src={r.img} alt="" loading="lazy" decoding="async" />
                                </span>
                                <span className="sr-t">
                                  <span className="sr-n">{r.name}</span>
                                  <span className="sr-k">{r.kind}</span>
                                </span>
                              </button>
                            </>
                          ) : null}
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
