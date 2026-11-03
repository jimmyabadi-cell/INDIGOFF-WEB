import css from "./Intro.module.css";

/** Título, introducción y buscador de estado. */
export default function Intro({ v }) {
  return (
    <section className={css.content} id="content">
      <h1 className={css.title}>{v.t("common.findRep")}</h1>
      <p className={css.text}>{v.t("findRep.intro")}</p>
      <label className={css.field}>
        {v.t("findRep.stateLabel")}
        <input
          className={css.input}
          type="search"
          placeholder={v.t("findRep.statePlaceholder")}
          value={v.q}
          onChange={v.onQuery}
        />
      </label>
      {v.noMatch ? (
        <>
          <p className={css.text2}>{v.t("findRep.notFound")}</p>
        </>
      ) : null}
    </section>
  );
}
