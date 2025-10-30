import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import inicio_css from "../css/Inicio.module.css";
import Navbar from "./Navbar.jsx";
import Contacto from "./Contacto";
import cameraIcon from "../img/camara.png";
import { LanguageContext } from "./Idioma.jsx";
import traducciones from "../language/traducciones.js";

const MiAppRA = () => {
  const navigate = useNavigate();
  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma]?.home || traducciones["es"].home;

  const [mostrarContacto, setMostrarContacto] = useState(false);

  return (
    <div className={inicio_css.inicioContainer}>
      <Navbar onAbrirContacto={() => setMostrarContacto(true)} />

      <section className={inicio_css.cajainicio}>
        
        {/* 📌 Historial */}
        <section className={inicio_css.Nav_historial}>
          <h2 className={inicio_css.text_h2}>{t.historial}</h2>

          <div className={inicio_css.historial}>
            <ul className={inicio_css.ul_historial}>
              <li className={inicio_css.derme}>
                <p className={inicio_css.p3}>{t.documento}</p>
              </li>
              <li className={inicio_css.derme}>
                <p className={inicio_css.p3}>{t.busquedas}</p>
              </li>
            </ul>

            <p className={inicio_css.no_hay_element}>
              {t.noBusquedas }
            </p>
          </div>
        </section>

        <section className={inicio_css.text}>
          <div className={inicio_css.span}>
            <button
              onClick={() => navigate("/camara")}
              className={inicio_css.Buttons}
            >
              <img src={cameraIcon} alt="camera" />
              <div>

                <p>{t.escanear}</p>
              </div>
            </button>
          </div>
        </section>

      </section>

      {mostrarContacto && (
        <div
          className={inicio_css.modalOverlay}
          onClick={() => setMostrarContacto(false)}
        >
          <div
            className={inicio_css.modalContenido}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={inicio_css.cerrarModal}
              onClick={() => setMostrarContacto(false)}
            ></button>
            <Contacto />
          </div>
        </div>
      )}
    </div>
  );
};

export default MiAppRA;
