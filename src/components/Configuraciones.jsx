import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar.jsx';
import config_css from '../css/Configuraciones.module.css';
import { LanguageContext } from '../components/Idioma.jsx';

const sections = [
  { id: 'usuario', label: 'Usuario', component: 'UserInfoSettings' },
  { id: 'idioma', label: 'Idioma', component: 'LanguageSettings' },
  { id: 'tema', label: 'Tema', component: 'ThemeSettings' },
];

const UserInfoSettings = () => (
  <div className={config_css.settings_card}>
    <div className={config_css.setting_item}>
      <label htmlFor="edit-name">Editar Nombre</label>
      <input type="text" id="edit-name" className={config_css.setting_input_line} />
    </div>
    <div className={config_css.setting_item}>
      <label htmlFor="change-password">Cambiar contraseña</label>
      <input type="password" id="change-password" className={config_css.setting_input_line} />
    </div>
    <div className={config_css.setting_item}>
      <label htmlFor="change-email">Cambiar e-mail</label>
      <input type="email" id="change-email" className={config_css.setting_input_line} />
    </div>
  </div>
);

const LanguageSettings = () => {
  const { idioma, cambiarIdioma } = useContext(LanguageContext);

  const textos = {
    es: {
      titulo: "Configuración de idioma",
      label: "Seleccionar idioma:",
    },
    en: {
      titulo: "Language Settings",
      label: "Select language:",
    },
  };

  return (
    <div className={config_css.settings_card}>
      <h2>{textos[idioma].titulo}</h2>
      <div className={config_css.setting_item}>
        <label htmlFor="idiomaSelect">{textos[idioma].label}</label>
        <select
          id="idiomaSelect"
          value={idioma}
          onChange={(e) => cambiarIdioma(e.target.value)}
          className={config_css.setting_input_line}
          style={{ background: "transparent", color: "white", width: "200px", marginTop: "10px" }}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
      <p style={{ marginTop: "20px", color: "white" }}>{textos[idioma].ejemplo}</p>
    </div>
  );
};

const ThemeSettings = () => {
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
        Modo oscuro:
        <label className={config_css.switch}>
          <input type="checkbox" checked={isDark} onChange={toggleTheme} />
          <span className={config_css.slider}></span>
        </label>
      </p>
    </div>
  );
};

const SectionComponents = {
  UserInfoSettings,
  LanguageSettings,
  ThemeSettings,
};

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('usuario');
  const { idioma } = useContext(LanguageContext);

  const textos = {
    es: { opciones: "Opciones", selecciona: "Selecciona una opción" },
    en: { opciones: "Options", selecciona: "Select an option" },
  };

  const currentSection = sections.find(sec => sec.id === activeSection);
  const SettingsComponent = currentSection ? SectionComponents[currentSection.component] : null;

  return (
    <div className={config_css.settings_container}>
      <Navbar />
      <p className={config_css.espacio_p3}></p>

      <div className={config_css.settings_content_wrapper}>
        <div className={config_css.sidebar}>
          <div className={config_css.sidebar_section_title}>{textos[idioma].opciones}</div>
          {sections.map((section) => (
            <div
              key={section.id}
              className={`${config_css.sidebar_link} ${activeSection === section.id ? config_css.active : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </div>
          ))}
        </div>

        <div className={config_css.main_settings}>
          {SettingsComponent ? <SettingsComponent /> : <div>{textos[idioma].selecciona}</div>}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;