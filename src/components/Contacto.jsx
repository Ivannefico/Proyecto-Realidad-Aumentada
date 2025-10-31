import React, { useEffect, useContext } from "react";
import contacto_css from "../css/Contacto.module.css";
import { LanguageContext } from "./Idioma.jsx";
import traducciones from "../language/traducciones.js";

const Contacto = () => {
  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma]?.contacto || traducciones["es"].contacto;

  useEffect(() => {
    document.body.classList.add("no-theme");
    return () => document.body.classList.remove("no-theme");
  }, []);

  return (
    <div className={contacto_css.contacto_container}>
      

      {/* --- IZQUIERDA: INFORMACIÓN --- */}
      <section className={contacto_css.info}>
        <h3 className={contacto_css.subtitle}>{t.quienesSomos}</h3>

        <div className={contacto_css.descripcion}>
          {t.contactoEquipo.map((linea, i) => (
            <p key={i} className={contacto_css.p}>{linea}</p>
          ))}

          <ul className={contacto_css.ul}>
            <h3 className={contacto_css.subtitle_con}>{t.datosContacto}</h3>
            <li className={contacto_css.li}>
              {t.email}: <b>ScannerCatt@gmail.com</b>
            </li>
            <li className={contacto_css.li}>
              {t.telefono}: <b>+54 9 299 530 1764</b>
            </li>
          </ul>
        </div>
      </section>



      {/* --- DERECHA: FORMULARIO --- */}
      <form className={contacto_css.formulario}>
                  <h2 className={contacto_css.title}>{t.titulo}</h2>
        <div>
          <label className={contacto_css.mensaje} htmlFor="nombre">{t.formNombre}</label>
          <input id="nombre" className={contacto_css.input} type="text" required />
        </div>

        <div>
          <label className={contacto_css.mensaje} htmlFor="correo">{t.formCorreo}</label>
          <input id="correo" className={contacto_css.input} type="email" required />
        </div>

        <div>
          <label className={contacto_css.mensaje} htmlFor="mensaje">{t.formMensaje}</label>
          <textarea id="mensaje" className={contacto_css.textarea} required></textarea>
        </div>

        <button type="submit" className={contacto_css.button}>
          {t.enviar}
        </button>
      </form>
    </div>
  );
};

export default Contacto;
