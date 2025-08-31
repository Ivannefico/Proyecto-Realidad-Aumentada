import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borrar datos del usuario
    localStorage.removeItem("usuario");
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <button onClick={() => navigate("/inicio")}>
        Inicio
      </button>
      <button onClick={() => navigate("/contacto")}>
        Contacto
      </button>
      <button onClick={() => navigate("./configuraciones")} className="btn-icono">
        <img src= "/img/tuerca.png"/>
      </button>
      <button onClick={handleLogout} className="btn-logout">
        <img src= "/img/logout.png"/>
      </button>
    </nav>

);
};
export default Navbar;

