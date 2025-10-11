import React, { Component } from 'react';
import inicio_css from "../css/Inicio.module.css";
import Navbar from './Navbar.jsx';
import cameraIcon from "../img/camara.png";
import Contacto from "./Contacto";

class MiAppRA extends Component {
  state = { mostrarContacto: false };

  abrirContacto = () => {
    this.setState({ mostrarContacto: true });
  };

  cerrarContacto = () => {
    this.setState({ mostrarContacto: false });
  };

  render() {
    return (

      <div className={inicio_css.inicioContainer}>
        <Navbar onAbrirContacto={this.abrirContacto} />
          <p className={inicio_css.espacio_p3}></p>
        <section className={inicio_css.cajainicio}>
          <section className={inicio_css.Nav_historial}>
            <h2 className={inicio_css.text_h2}>Historial de Scanner</h2>
            <div className={inicio_css.historial}>
              <ul className={inicio_css.ul_historial}>
                <li className={inicio_css.derme}>
                  <p className={inicio_css.p2}></p>
                  <p className={inicio_css.p3}>Documento</p>
                  <p className={inicio_css.p3}></p>
                </li>
              </ul>
              <p className={inicio_css.no_hay_element}>Busquedas</p>
            </div>
          </section>

          <section className={inicio_css.text}>
            <div className={inicio_css.span}>
              <button className={inicio_css.Buttons}>
                <img src={cameraIcon} alt="camera" />
                <div><p>Scan</p></div>
              </button>
            </div>
          </section>
        </section>

        {this.state.mostrarContacto && (
          <div className={inicio_css.modalOverlay} onClick={this.cerrarContacto}>
            <div className={inicio_css.modalContenido} onClick={(e) => e.stopPropagation()}>
              <button className={inicio_css.cerrarModal} onClick={this.cerrarContacto}>✕</button>
              <Contacto />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MiAppRA;
