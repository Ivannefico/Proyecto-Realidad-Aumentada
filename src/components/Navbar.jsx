import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar_css from "../css/Navbar.module.css";
import tuercaIcon from "../img/tuerca.png";
import logoutIcon from "../img/logout.png";
import logo from "../img/logo.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Navbar = ({ onAbrirContacto }) => {
  const navigate = useNavigate();
  const [rolUsuario, setRolUsuario] = useState(null);

  useEffect(() => {
    const obtenerRolUsuario = async () => {
      // Tomamos el usuario guardado en localStorage
      const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
      if (!usuarioLocal || !usuarioLocal.correo) return;

      // Buscamos ese usuario en Firestore
      const col = collection(db, "usuarios");
      const snap = await getDocs(col);
      const usuarioEncontrado = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .find((u) => u.correo === usuarioLocal.correo);

      if (usuarioEncontrado) {
        setRolUsuario(usuarioEncontrado.rol);
      }
    };

    obtenerRolUsuario();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/", { replace: true });
  };

  return (
    <nav className={Navbar_css.navbar}>
      <div className={Navbar_css.logo}>
        <img src={logo} alt="Logo" />
      </div>

      <button onClick={() => navigate("/home")}>Inicio</button>

      <button onClick={onAbrirContacto}>Contacto</button>

      {/* 🔥 Solo se muestra si el usuario es admin */}
      {rolUsuario === "admin" && (
        <button onClick={() => navigate("/listausuario")}>
          Lista de Usuarios
        </button>
      )}

      <button onClick={() => navigate("/error404")} className={Navbar_css.btn_icono}>
        <img src={tuercaIcon} alt="Configuración" />
      </button>

      <button onClick={handleLogout} className={Navbar_css.btn_logout}>
        <img src={logoutIcon} alt="Logout" />
      </button>
    </nav>
  );
};

export default Navbar;