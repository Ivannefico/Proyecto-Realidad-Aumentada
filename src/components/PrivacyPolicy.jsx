import React, { useContext } from "react";
import styles from "../css/PrivacyPolicy.module.css";
import { LanguageContext } from "./Idioma.jsx";
import traducciones from "../language/traducciones.js";

export default function PrivacyPolicy() {
  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma]?.privacidad || traducciones["es"].privacidad;

  const fecha = new Date().toLocaleDateString(
    idioma === "es" ? "es-ES" : "en-EN"
  );

  return (
    <main className={styles.container}>
      <article className={styles.card}>
        <h1 className={styles.title}>{t.titulo}</h1>

        {/* Tabla de contenidos */}
        <nav className={styles.toc}>
          <strong>{t.contenido}</strong>
          <ul>
            {t.secciones.map((sec) => (
              <li key={sec.id} className={styles.li}>
                <a href={`#${sec.id}`}>{sec.titulo}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Secciones */}
        {t.secciones.map((sec) => (
          <section key={sec.id} id={sec.id} className={styles.section}>
            <h2 className={styles.h2}>{sec.titulo}</h2>

            {sec.texto.map((txt, index) =>
              txt.includes("•") ? (
                <li key={index} className={styles.li}>
                  {txt.replace("• ", "")}
                </li>
              ) : (
                <p key={index} className={styles.p}>
                  {txt}
                </p>
              )
            )}
          </section>
        ))}

        {/* Footer */}
        <footer className={styles.footer}>
          <p className={styles.p}>
            {t.ultimaActualizacion} {fecha}
          </p>
        </footer>
      </article>
    </main>
  );
}
