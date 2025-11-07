import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar.jsx";
import Contacto from "./Contacto.jsx";
import config_css from "../css/Configuraciones.module.css";
import { LanguageContext } from "../components/Idioma.jsx";
import traducciones from "../language/traducciones.js";
import { auth, db } from "../firebase/firebase.jsx";
import { doc, updateDoc } from "firebase/firestore";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import ojoAbierto from "../img/ojoabiertoBlanco.png";
import ojoCerrado from "../img/ojocerradoBlanco.png";

/* settings de todo config */
const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("usuario");
  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma].configuraciones;
  const [mostrarContacto, setMostrarContacto] = useState(false);

  const currentSection = sections.find((sec) => sec.id === activeSection);
  const SettingsComponent = currentSection
    ? SectionComponents[currentSection.component]
    : null;

  const abrirContacto = () => setMostrarContacto(true);
  const cerrarContacto = () => setMostrarContacto(false);

  return (
    <>
      <Navbar onAbrirContacto={abrirContacto} />
      <p className={config_css.espacio_p3}></p>

      <div className={config_css.settings_container}>
        <div className={config_css.settings_content_wrapper}>
          <div className={config_css.sidebar}>
            <div className={config_css.sidebar_section_title}>{t.opciones}</div>

            {sections.map((section) => (
              <div
                key={section.id}
                className={`${config_css.sidebar_link} ${
                  activeSection === section.id ? config_css.active : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {t[section.key]}
              </div>
            ))}
          </div>

          <div className={config_css.main_settings}>
            {SettingsComponent ? (
              <SettingsComponent />
            ) : (
              <div>{t.seleccionar}</div>
            )}
          </div>
        </div>
      </div>

      {mostrarContacto && (
        <div className={config_css.modalOverlay} onClick={cerrarContacto}>
          <div
            className={config_css.modalContenido}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={config_css.cerrarModal} onClick={cerrarContacto}>
              ✕
            </button>
            <Contacto />
          </div>
        </div>
      )}
    </>
  );
};

/* settings de usuario */
const UserInfoSettings = () => {
  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma].configuraciones;

  const user = auth.currentUser;
  const userLocal = JSON.parse(localStorage.getItem("usuario")) || {};

  const [name, setName] = useState(userLocal.usuarios || user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSave = async () => {
    try {
      if (!user) {
        setMensaje("⚠️ No hay usuario logueado.");
        return;
      }

      let cambiosFirestore = {};

      // 🔒 Reautenticación antes de cambios sensibles
      if ((password.trim() !== "") || (email && email !== user.email)) {
        const oldPassword = prompt("🔑 Ingresá tu contraseña actual para confirmar:");
        if (!oldPassword) {
          setMensaje("❌ Operación cancelada.");
          return;
        }

        try {
          const credential = EmailAuthProvider.credential(user.email, oldPassword);
          await reauthenticateWithCredential(user, credential);
        } catch (reauthError) {
          setMensaje("⚠️ Contraseña incorrecta o sesión expirada. Volvé a iniciar sesión.");
          return;
        }
      }

      // 🧾 Actualizar nombre de usuario
      if (name && name.trim() !== "" && name !== userLocal.usuarios) {
        await updateProfile(user, { displayName: name });
        cambiosFirestore.usuarios = name; // <-- Campo correcto
      }

      // 🧾 Actualizar correo
      if (email && email.trim() !== "" && email !== user.email) {
        await updateEmail(user, email);
        cambiosFirestore.correo = email;
      }

      // 🧾 Actualizar contraseña
      if (password && password.trim() !== "") {
        await updatePassword(user, password);
        cambiosFirestore.contrasena = password;
      }

      // 🧭 Actualizar en Firestore
      if (Object.keys(cambiosFirestore).length > 0) {
        const userRef = doc(db, "usuarios", user.uid);
        await updateDoc(userRef, cambiosFirestore);

        // 💾 Actualizar localStorage
        const actualizado = { ...userLocal, ...cambiosFirestore };
        localStorage.setItem("usuario", JSON.stringify(actualizado));

        setMensaje("✅ Cambios guardados correctamente.");
      } else {
        setMensaje("⚠️ No se realizaron cambios.");
      }

      setPassword("");
    } catch (error) {
      console.error(error);
      setMensaje("⚠️ Error al actualizar los datos: " + error.message);
    }
  };

  return (
    <div className={config_css.settings_card}>
      <div className={config_css.setting_item}>
        <label htmlFor="edit-name">{t.editarNombre}</label>
        <input
          type="text"
          id="edit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={config_css.setting_input_line}
        />
      </div>

      <div className={config_css.setting_item}>
        <label htmlFor="change-email">{t.cambiarEmail}</label>
        <input
          type="email"
          id="change-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={config_css.setting_input_line}
        />
      </div>

      <div className={config_css.setting_item}>
        <label htmlFor="change-password">{t.cambiarPassword}</label>
        <div className={config_css.password_container}>
          <input
            type={showPassword ? "text" : "password"}
            id="change-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nueva contraseña"
            className={config_css.setting_input_line}
          />
          <img
            src={showPassword ? ojoAbierto : ojoCerrado}
            alt="toggle password"
            className={config_css.icon_password_inside}
            onClick={togglePasswordVisibility}
          />
        </div>
      </div>

      <button onClick={handleSave} className={config_css.boton}>
        {t.guardarCambios || "Guardar cambios"}
      </button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

/* settings de idioma */
const LanguageSettings = () => {
  const { idioma, cambiarIdioma } = useContext(LanguageContext);
  const t = traducciones[idioma].configuraciones;

  return (
    <div className={config_css.settings_card}>
      <h2>{t.idiomaTitulo}</h2>
      <div className={config_css.setting_item}>
        <label htmlFor="idiomaSelect">{t.idiomaLabel}</label>
        <select
          id="idiomaSelect"
          value={idioma}
          onChange={(e) => cambiarIdioma(e.target.value)}
          className={config_css.setting_input_lang}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
};

/* settings de tema */
const ThemeSettings = () => {
  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma].configuraciones;
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const darkActive = savedTheme === "dark";
    setIsDark(darkActive);
    document.body.classList.toggle("dark", darkActive);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.body.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div className={config_css.settings_card}>
      <p className={config_css.theme_label}>
        {t.modoOscuro}
        <label className={config_css.switch}>
          <input type="checkbox" checked={isDark} onChange={toggleTheme} />
          <span className={config_css.slider}></span>
        </label>
      </p>
    </div>
  );
};

const sections = [
  { id: "usuario", key: "usuario", component: "UserInfoSettings" },
  { id: "idioma", key: "idioma", component: "LanguageSettings" },
  { id: "tema", key: "tema", component: "ThemeSettings" },
];

const SectionComponents = {
  UserInfoSettings,
  LanguageSettings,
  ThemeSettings,
};

export default SettingsPage;
