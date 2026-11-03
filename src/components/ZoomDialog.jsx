import { S } from "../lib/dc.js";

/** Foto de galería ampliada. */
export default function ZoomDialog({ v }) {
  return (
    <>
      {v.zoomOn ? (
        <>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={v.zoom.name}
            style={S(
              "position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 60; background: #FFFFFF; display: flex; flex-direction: column",
            )}
          >
            <div
              style={S(
                "display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px var(--gutter); border-bottom: 1px solid #ECE9E4",
              )}
            >
              <button
                type="button"
                onClick={v.closeZoom}
                style={S(
                  "min-height: 44px; padding: 0; border: 0; background: transparent; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #111111",
                )}
              >
                <span style={S("display: inline-flex; align-items: center; gap: 8px")}>
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={S("display: block; flex: none")}
                  >
                    <path d="M15 5l-7 7 7 7"></path>
                  </svg>
                  {v.t("common.back")}
                </span>
              </button>
              <span
                style={S(
                  "font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #111111",
                )}
              >
                {v.zoom.name}
              </span>
              <span style={S("display: flex; gap: 20px; align-items: center")}>
                <button
                  type="button"
                  onClick={v.zSaveToggle}
                  aria-pressed={v.zSaveOn}
                  style={S(
                    "min-height: 44px; padding: 0 4px; border: 0; background: transparent; cursor: pointer; font-family: Urbanist, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #111111; display: inline-flex; align-items: center; gap: 8px",
                  )}
                >
                  {v.zSaveIs ? (
                    <>
                      <svg
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        style={S("display: block; flex: none")}
                      >
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
                      <svg
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        style={S("display: block; flex: none")}
                      >
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
                  type="button"
                  onClick={v.zoomPrev}
                  aria-label={v.t("collection.prevImage")}
                  style={S(
                    "min-height: 44px; min-width: 44px; border: 0; background: transparent; cursor: pointer; font-size: 18px; color: #111111; display: inline-flex; align-items: center; justify-content: center",
                  )}
                >
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={S("display: block; flex: none")}
                  >
                    <path d="M15 5l-7 7 7 7"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={v.zoomNext}
                  aria-label={v.t("collection.nextImage")}
                  style={S(
                    "min-height: 44px; min-width: 44px; border: 0; background: transparent; cursor: pointer; font-size: 18px; color: #111111; display: inline-flex; align-items: center; justify-content: center",
                  )}
                >
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={S("display: block; flex: none")}
                  >
                    <path d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </span>
            </div>
            <div
              style={S(
                "flex: 1 1 auto; min-height: 0; display: flex; align-items: center; justify-content: center; padding: 24px; background: #F4F1EB",
              )}
            >
              <img
                src={v.zoom.img}
                alt={v.zoom.name}
                style={S("display: block; max-width: 100%; max-height: 100%; object-fit: contain")}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
