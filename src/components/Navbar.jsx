import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar_css from "../css/Navbar.module.css";
import tuercaIcon from "../img/tuerca.png";
import logoutIcon from "../img/logout.png";
import logo from "../img/logo.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.jsx";

import { LanguageContext } from "./Idioma.jsx";
import traducciones from "../idiomas/traducciones.js";

const Navbar = ({ onAbrirContacto }) => {
  const navigate = useNavigate();
  const [rolUsuario, setRolUsuario] = useState(null);

  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma].navbar;

  useEffect(() => {
    const obtenerRolUsuario = async () => {
      const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
      if (!usuarioLocal || !usuarioLocal.correo) return;

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

      <button onClick={() => navigate("/home")}>{t.home}</button>
      <button onClick={onAbrirContacto}>{t.contact}</button>

      {rolUsuario === "admin" && (
        <button onClick={() => navigate("/listausuario")}>{t.userList}</button>
      )}

      <button onClick={() => navigate("/configuracion")} className={Navbar_css.btn_icono}>
        <img src={tuercaIcon} alt={t.settings} />
      </button>

      <button onClick={handleLogout} className={Navbar_css.btn_logout}>
        <img src={logoutIcon} alt={t.logout} />
      </button>
    </nav>
  );
};

export default Navbar;
