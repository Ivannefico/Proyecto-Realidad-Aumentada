import React, { Component } from 'react';
import incio_css from "../css/Inicio.module.css";
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
      <div className={incio_css.body}>
        <Navbar onAbrirContacto={this.abrirContacto} />

        <section className={incio_css.cajainicio}>
          <section className={incio_css.Nav_historial}>
            <h2 className={incio_css.text_h2}>Historial de Scanner</h2>
            <div className={incio_css.historial}>
              <ul className={incio_css.ul_historial}>
                <li className={incio_css.derme}>
                  <p className={incio_css.p2}></p>
                  <p className={incio_css.p3}>Documento</p>
                  <p className={incio_css.p3}></p>
                </li>
              </ul>
              <p className={incio_css.no_hay_element}>Busquedas</p>
            </div>
          </section>

          <section className={incio_css.text}>
            <div className={incio_css.span}>
              <button className={incio_css.Buttons}>
                <img src={cameraIcon} alt="camera" />
                <div><p>Scan</p></div>
              </button>
            </div>
          </section>
        </section>

        {this.state.mostrarContacto && (
          <div className={incio_css.modalOverlay} onClick={this.cerrarContacto}>
            <div className={incio_css.modalContenido} onClick={(e) => e.stopPropagation()}>
              <button className={incio_css.cerrarModal} onClick={this.cerrarContacto}>✕</button>
              <Contacto />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MiAppRA;
