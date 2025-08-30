import React from "react";
import { useNavigate } from "react-router-dom";

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
      <button onClick={() => navigate("./configuraciones")}>
        Configuraciones
      </button>
      <button onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </nav>
  );
};
export default Navbar;

