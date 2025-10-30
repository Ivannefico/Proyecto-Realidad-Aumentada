import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import formuregis_css from "../css/Registro.module.css";
import { useUsuarios } from "../hooks/useUsuarios";
import { LanguageContext } from "./Idioma.jsx";
import traducciones from "../language/traducciones.js";

import logoDark from "../img/logoBlancoReves.png";
import logoLight from "../img/logoNegroReves.png";
import userLight from "../img/user.png";
import userDark from "../img/userBlanco.png";
import correoLight from "../img/correo.png";
import correoDark from "../img/correoBlanco.png";
import phoneLight from "../img/phone.png";
import phoneDark from "../img/phoneBlanco.png";
import ojoAbiertoLight from "../img/ojoabierto.png";
import ojoAbiertoDark from "../img/ojoabiertoBlanco.png";
import ojoCerradoLight from "../img/ojocerrado.png";
import ojoCerradoDark from "../img/ojocerradoBlanco.png";

const Registro = ({ onCambiarFormulario }) => {
  const navigate = useNavigate();
  const { crearUsuario } = useUsuarios();
  
  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma].registro;

  const [isDark, setIsDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [registro, setRegistro] = useState({
    usuarios: "",
    correo: "",
    telefono: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleTheme = () => setIsDark(document.body.classList.contains("dark"));
    handleTheme();
    const observer = new MutationObserver(handleTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(registro.correo)) {
      setError(t.errorEmail);
      return;
    }

    if (registro.contrasena !== registro.confirmarContrasena) {
      setError(t.errorPass);
      return;
    }

    setLoading(true);
    try {
      await crearUsuario({
        usuarios: registro.usuarios,
        correo: registro.correo,
        telefono: registro.telefono,
        contrasena: registro.contrasena,
        rol: "usuarios",
      });

      navigate("/", { replace: true });
    } catch {
      setError("Error");
    } finally {
      setLoading(false);
    }
  };

  const logo = isDark ? logoDark : logoLight;
  const iconUser = isDark ? userDark : userLight;
  const iconCorreo = isDark ? correoDark : correoLight;
  const iconPhone = isDark ? phoneDark : phoneLight;
  const iconPass = showPassword
    ? (isDark ? ojoAbiertoDark : ojoAbiertoLight)
    : (isDark ? ojoCerradoDark : ojoCerradoLight);

  return (
    <div className={formuregis_css.container}>
      <div className={formuregis_css.right_panel}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSignIn} className={formuregis_css.form}>
          <div className={formuregis_css.text_container}>
            <h2>
              {t.titulo} <br /> {t.subtitulo}
            </h2>

            <p className={formuregis_css.login_text}>
              {t.pregunta}
              <button
                type="button"
                onClick={onCambiarFormulario}
                className={formuregis_css.login_btn}
              >
                {t.iniciarSesion}
              </button>
            </p>
          </div>

          <div className={formuregis_css.formcajas}>
            <div className={formuregis_css.input_group}>
              <input
                type="text"
                name="usuarios"
                placeholder={t.usuario}
                value={registro.usuarios}
                onChange={handleChange}
                required
                className="input-tema"
              />
              <span className={formuregis_css.icon}>
                <img src={iconUser} alt="Usuario" />
              </span>
            </div>

            <div className={formuregis_css.input_group}>
              <input
                name="correo"
                placeholder={t.correo}
                value={registro.correo}
                onChange={handleChange}
                required
                className="input-tema"
              />
              <span className={formuregis_css.icon}>
                <img src={iconCorreo} alt="Correo" />
              </span>
            </div>

            <div className={formuregis_css.input_group}>
              <input
                type="tel"
                name="telefono"
                placeholder={t.telefono}
                value={registro.telefono}
                onChange={handleChange}
                required
                className="input-tema"
              />
              <span className={formuregis_css.icon}>
                <img src={iconPhone} alt="Teléfono" />
              </span>
            </div>

            <div className={formuregis_css.input_group}>
              <input
                type={showPassword ? "text" : "password"}
                name="contrasena"
                placeholder={t.contrasena}
                value={registro.contrasena}
                onChange={handleChange}
                required
                className="input-tema"
              />
              <span onClick={togglePasswordVisibility} className={formuregis_css.password_toggle}>
                <img src={iconPass} alt="toggle" />
              </span>
            </div>

            <div className={formuregis_css.input_group}>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmarContrasena"
                placeholder={t.confirmar}
                value={registro.confirmarContrasena}
                onChange={handleChange}
                required
                className="input-tema"
              />
              <span onClick={togglePasswordVisibility} className={formuregis_css.password_toggle}>
                <img src={iconPass} alt="toggle" />
              </span>
            </div>

            <button type="submit" className={formuregis_css.register_btn} disabled={loading}>
              {loading ? "..." : t.registrar}
            </button>

            <button
              type="button"
              className={formuregis_css.policy}
              onClick={() => navigate("/privacypolicy")}
            >
              {t.politica}
            </button>
          </div>
        </form>
      </div>

      <div className={formuregis_css.left_panel}>
        <img src={logo} alt="logo" className={formuregis_css.background_image} />
      </div>
    </div>
  );
};

export default Registro;
