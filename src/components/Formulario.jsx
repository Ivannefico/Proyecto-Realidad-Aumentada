import React, { useState } from "react";
import Login from "./Formulario_inic.jsx";
import Registro from "./Formulario_regist.jsx";
import styles from "../css/Formulario.module.css";

const Formulario = () => {
  const [pantalla, setPantalla] = useState("login");
  const [animacion, setAnimacion] = useState({
    login: styles.entradaIzquierda,
    registro: styles.salidaDerecha,
  });

  const cambiarFormulario = () => {
    if (pantalla === "login") {
      setAnimacion({
        login: styles.salidaDerecha,
        registro: styles.entradaDerecha,
      });
      setPantalla("registro");
    } else {
      setAnimacion({
        login: styles.entradaIzquierda,
        registro: styles.salidaIzquierda,
      });
      setPantalla("login");
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={`${styles.pantalla} ${animacion.login}`}>
        <Login onCambiarFormulario={cambiarFormulario} />
      </div>

      <div className={`${styles.pantalla} ${animacion.registro}`}>
        <Registro onCambiarFormulario={cambiarFormulario} />
      </div>
    </div>
  );
};

export default Formulario;
