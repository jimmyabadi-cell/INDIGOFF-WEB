import { S } from "../../../lib/dc.js";

/** Popup del newsletter. */
export default function NewsletterDialog({ v }) {
  return (
    <>
      {v.nlOn ? (
        <>
          <div className="nl-back" onClick={v.nlClose}></div>
          <div className="nl" role="dialog" aria-modal="true" aria-label={v.nlTitle}>
            <button type="button" onClick={v.nlClose} className="nl-x" aria-label={v.nlCloseLbl}>
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                style={S("display: block")}
              >
                <path d="M5 5l14 14M19 5L5 19"></path>
              </svg>
            </button>
            <div className="nl-img">
              <img src="/img/f8c0fd4c23fb59d6887e5fe8c294a39b.jpg" alt="" />
            </div>
            <div className="nl-body">
              {v.nlForm ? (
                <>
                  <h2 className="nl-h">{v.nlTitle}</h2>
                  <p className="nl-p">{v.nlText}</p>
                  <label className="nl-lbl">
                    {v.nlEmailLbl}
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="nl-in"
                      value={v.nlEmail}
                      onChange={v.nlInput}
                      placeholder="name@company.com"
                    />
                  </label>
                  {v.nlErr ? (
                    <>
                      <p className="nl-err" role="alert">
                        {v.nlErrText}
                      </p>
                    </>
                  ) : null}
                  <button type="button" onClick={v.nlSubmit} className="nl-btn">
                    {v.nlCta}
                  </button>
                  <button type="button" onClick={v.nlClose} className="nl-no">
                    {v.nlNo}
                  </button>
                </>
              ) : null}
              {v.nlDone ? (
                <>
                  <h2 className="nl-h">{v.nlThanks}</h2>
                  <p className="nl-p">{v.nlThanksText}</p>
                  <button type="button" onClick={v.nlClose} className="nl-btn">
                    {v.nlContinue}
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
