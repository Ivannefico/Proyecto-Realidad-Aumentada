import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import formuregis_css from "../css/Registro.module.css";
import { useUsuarios } from "../hooks/useUsuarios";

// ✅ Logos por tema
import logoLight from "../img/logoBlancoReves.png"; // Modo Claro
import logoDark from "../img/logoNegroReves.png"; // Modo Oscuro

// ✅ Iconos por tema (provisorios)
import userLight from "../img/user.png";
import userDark from "../img/userBlanco.png"; // ⚠️ crea después

import correoLight from "../img/correo.png";
import correoDark from "../img/correoBlanco.png"; // ⚠️ crea después

import phoneLight from "../img/phone.png";
import phoneDark from "../img/phoneBlanco.png"; // ⚠️ crea después

import ojoAbiertoLight from "../img/ojoabierto.png";
import ojoAbiertoDark from "../img/ojoabiertoBlanco.png"; // ⚠️ crea después

import ojoCerradoLight from "../img/ojocerrado.png";
import ojoCerradoDark from "../img/ojocerradoBlanco.png"; // ⚠️ crea después

const Registro = ({ onCambiarFormulario }) => {
  const navigate = useNavigate();
  const { crearUsuario } = useUsuarios();
  const [isDark, setIsDark] = useState(false);

  const [registro, setRegistro] = useState({
    usuarios: "",
    correo: "",
    telefono: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Detectar tema del body
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
      setError("El correo electrónico no es válido");
      return;
    }

    if (registro.contrasena !== registro.confirmarContrasena) {
      setError("Las contraseñas no coinciden");
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

      alert("Usuario registrado correctamente");
      navigate("/", { replace: true });
    } catch {
      setError("Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Elegimos íconos según tema
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
            <h2>Te damos la bienvenida a <br /> “Scan cat”</h2>

            <p className={formuregis_css.login_text}>
              ¿Ya tienes una cuenta?
              <button type="button" onClick={onCambiarFormulario} className={formuregis_css.login_btn}>
                Iniciar Sesión
              </button>
            </p>
          </div>

          <div className={formuregis_css.formcajas}>
            <div className={formuregis_css.input_group}>
              <input
                type="text"
                name="usuarios"
                placeholder="Nombre de usuario"
                value={registro.usuarios}
                onChange={handleChange}
                required
              />
              <span className={formuregis_css.icon}>
                <img src={iconUser} alt="Usuario" />
              </span>
            </div>

            <div className={formuregis_css.input_group}>
              <input
                name="correo"
                placeholder="Correo electrónico"
                value={registro.correo}
                onChange={handleChange}
                required
              />
              <span className={formuregis_css.icon}>
                <img src={iconCorreo} alt="Correo" />
              </span>
            </div>

            <div className={formuregis_css.input_group}>
              <input
                type="tel"
                name="telefono"
                placeholder="Número de teléfono"
                value={registro.telefono}
                onChange={handleChange}
                required
              />
              <span className={formuregis_css.icon}>
                <img src={iconPhone} alt="Teléfono" />
              </span>
            </div>

            <div className={formuregis_css.input_group}>
              <input
                type={showPassword ? "text" : "password"}
                name="contrasena"
                placeholder="Contraseña"
                value={registro.contrasena}
                onChange={handleChange}
                required
              />
              <span onClick={togglePasswordVisibility} className={formuregis_css.password_toggle}>
                <img src={iconPass} alt="toggle" />
              </span>
            </div>

            <div className={formuregis_css.input_group}>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmarContrasena"
                placeholder="Confirma contraseña"
                value={registro.confirmarContrasena}
                onChange={handleChange}
                required
              />
              <span onClick={togglePasswordVisibility} className={formuregis_css.password_toggle}>
                <img src={iconPass} alt="toggle" />
              </span>
            </div>

            <button type="submit" className={formuregis_css.register_btn} disabled={loading}>
              {loading ? "Registrando..." : "Regístrate ahora"}
            </button>

            <button className={formuregis_css.policy}>
              Información de servicios, política y avisos
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
