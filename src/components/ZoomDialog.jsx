import css from "./ZoomDialog.module.css";
import { imgProps, SIZES } from "../lib/images.js";

/** Foto de galería ampliada. */
export default function ZoomDialog({ v }) {
  return (
    <>
      {v.zoomOn ? (
        <>
          <div className={css.box} role="dialog" aria-modal="true" aria-label={v.zoom.name}>
            <div className={css.box2}>
              <button className={css.button} type="button" onClick={v.closeZoom}>
                <span className={css.label}>
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
              <span className={css.label2}>{v.zoom.name}</span>
              <span className={css.label3}>
                <button className={css.button2} type="button" onClick={v.zSaveToggle} aria-pressed={v.zSaveOn}>
                  {v.zSaveIs ? (
                    <>
                      <svg className={css.icon} aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
                        <path
                          d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20z"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </>
                  ) : null}
                  {v.zSaveNot ? (
                    <>
                      <svg className={css.icon} aria-hidden="true" width="16" height="16" viewBox="0 0 24 24">
                        <path
                          d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </>
                  ) : null}
                  {v.zSaveLbl}
                </button>
                <button
                  className={css.button3}
                  type="button"
                  onClick={v.zoomPrev}
                  aria-label={v.t("collection.prevImage")}
                >
                  <svg
                    className={css.icon}
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 5l-7 7 7 7"></path>
                  </svg>
                </button>
                <button
                  className={css.button3}
                  type="button"
                  onClick={v.zoomNext}
                  aria-label={v.t("collection.nextImage")}
                >
                  <svg
                    className={css.icon}
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </span>
            </div>
            <div className={css.box3}>
              <img className={css.image} {...imgProps(v.zoom.img, SIZES.full)} alt={v.zoom.name} />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
