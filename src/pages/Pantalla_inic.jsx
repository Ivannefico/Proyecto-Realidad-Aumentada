import React, { children, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/navbar";
import "../components/inicio";
import "../components/pie";

export default function Pantalla_inic({children}){
    state= {clicked: false};
    handleClick = () => {
    this.setState({clicked: !this.state.clicked})
    }
    render()
    {
        return(
            <>
            <header>
            <nav>
            <h1 className='Logo'>Scanner Cat</h1>
            <div>
              <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
               <li><a className="active" href="indexhtml">Home</a></li>
               <li><a href="indexhtml">Ayuda</a></li>
               <li><a href="indexhtml">Contacto</a></li>
               <li><a href="indexhtml">Nosotros</a></li>
              </ul>
            </div>

            <div id="mobile" onClick={this.handleClick}>
               <i id="bar" className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            </nav>
            </header>  
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
                    <p className="no_hay_element">Busquedad</p>
                </div>
            </section>
            <footer>
                
            </footer>
        </>
        )
    }

}