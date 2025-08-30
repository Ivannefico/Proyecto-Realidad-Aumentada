import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import "../css/inicio.css";

class MiAppRA extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    return (
      <>
        <Navbar />

        <section className="text">
          <h2 className="text_2scan">Scan</h2>
          <div className="span">
            <button className="Buttons">
              <Link to='/camara' className="Color">Activa Camara</Link>
            </button>
            <h1>Escanear en tiempo real</h1>
            <h1>Empieza a utilizar Scanner Cat</h1>
          </div>
        </section>

        <section className='Nav_historial'>
          <h2 className="text_h2">Historial de Scanner</h2>
          <div className="historial">
            <ul className="ul_historial">
              <li className="derme">
                <p className="p2"></p>
                <p className="p3">Documento</p>
                <p className="p3"></p>
              </li>
            </ul>
            <p className="no_hay_element">Busquedas</p>
          </div>
        </section>
      </>
    );
  }
}

export default MiAppRA;



  /* const abrir_cerrar_menu = () =>{
    let menu_desplegable = document.getElementById('menu');
    let boton_cerrar = document.getElementById('x');
    menu_desplegable.classList.toggle('abrir_menu');
    boton_cerrar.classList.toggle('colocar_x')<div className='menu_header'>
        <header className='header'>
          <h1><a href="#">PEQTU</a></h1>
          <div className='barras'>
            <button onClick={abrir_cerrar_menu} className='boton_menu' id='x'></button>
          </div>
          <nav id='menu' className='desplegable'>
            <ul className='nav_bar'>
              <li>
                <a href="#">ayuda</a></li>
              <li>
                <a href="#">nosotros</a></li>
              <li>
                <a href="#">contactos</a></li>
          
              <li>
                <a href="#">config</a></li>
          
              <li>
                <a href="#">login/inicio</a></li>
            </ul>
          </nav>
        </header>
      */