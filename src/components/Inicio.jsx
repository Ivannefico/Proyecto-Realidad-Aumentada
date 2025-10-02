import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import incio_css from "../css/Inicio.module.css";
import Navbar from './Navbar.jsx';
import cameraIcon from "../img/camara.png";

class MiAppRA extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    return (
      <div className={incio_css.body}>
        <Navbar />
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
              <Link to='/error404' className={incio_css.Color}><img src= {cameraIcon}/></Link>
              <div><p>Scan</p></div>
            </button>
          </div>
        </section>

        </section>
      </div>
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