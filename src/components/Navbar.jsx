import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar_css from "../css/Navbar.module.css";
import tuercaIcon from "../img/tuerca.png";
import logoutIcon from "../img/logout.png";
import logoblanco from "../img/logoBlanco.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borrar datos del usuario
    localStorage.removeItem("usuario");
    navigate("/", { replace: true });
  };

  return (
  
    <nav className={Navbar_css.navbar}>
      <div className={Navbar_css.logo}><img src= {logoblanco} /></div>
      <button onClick={() => navigate("/home")}>
        Inicio
      </button>
      <button onClick={() => navigate("/contacto")}>
        Contacto
      </button>
      <button onClick={() => navigate("/error404")} className={Navbar_css.btn_icono}>
        <img src= {tuercaIcon}/>
      </button>
      <button onClick={handleLogout} className={Navbar_css.btn_logout}>
        <img src= {logoutIcon}/>
      </button>
    </nav>
);
};
export default Navbar;