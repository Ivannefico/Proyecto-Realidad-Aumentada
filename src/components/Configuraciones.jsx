import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar.jsx";
import Contacto from "./Contacto.jsx";
import config_css from "../css/Configuraciones.module.css";
import { LanguageContext } from "../components/Idioma.jsx";
import traducciones from "../idiomas/traducciones.js";



const UserInfoSettings = () => {
  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma].configuraciones;

  return (
    <div className={config_css.settings_card}>
      <div className={config_css.setting_item}>
        <label htmlFor="edit-name">{t.editarNombre}</label>
        <input type="text" id="edit-name" className={config_css.setting_input_line} />
      </div>
      <div className={config_css.setting_item}>
        <label htmlFor="change-password">{t.cambiarPassword}</label>
        <input type="password" id="change-password" className={config_css.setting_input_line} />
      </div>
      <div className={config_css.setting_item}>
        <label htmlFor="change-email">{t.cambiarEmail}</label>
        <input type="email" id="change-email" className={config_css.setting_input_line} />
      </div>
    </div>
  );
};

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
          className={config_css.setting_input_line}
          style={{ background: "transparent", color: "white", width: "200px", marginTop: "10px" }}
        >
          <option value="es" className={config_css.input_lang}>Español</option>
          <option value="en" className={config_css.input_lang}>English</option>
        </select>
      </div>
    </div>
  );
};

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
  { id: 'usuario', key: 'usuario', component: 'UserInfoSettings' },
  { id: 'idioma',  key: 'idioma',  component: 'LanguageSettings' },
  { id: 'tema', key: 'tema', component: 'ThemeSettings' },
];

const SectionComponents = {
  UserInfoSettings,
  LanguageSettings,
  ThemeSettings,
};

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('usuario');
  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma].configuraciones;
  const [mostrarContacto, setMostrarContacto] = useState(false);

  const currentSection = sections.find(sec => sec.id === activeSection);
  const SettingsComponent = currentSection ? SectionComponents[currentSection.component] : null;

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
                className={`${config_css.sidebar_link} ${activeSection === section.id ? config_css.active : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                {t[section.key]}
              </div>
            ))}
          </div>

          <div className={config_css.main_settings}>
            {SettingsComponent ? <SettingsComponent /> : <div>{t.seleccionar}</div>}
          </div>
        </div>
      </div>

      {mostrarContacto && (
        <div className={config_css.modalOverlay} onClick={cerrarContacto}>
          <div className={config_css.modalContenido} onClick={(e) => e.stopPropagation()}>
            <button className={config_css.cerrarModal} onClick={cerrarContacto}>✕</button>
            <Contacto />
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPage;
