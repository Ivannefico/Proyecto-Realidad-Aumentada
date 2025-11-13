import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import formuinicio_css from "../css/InicioSesion.module.css";
import { auth, db } from "../firebase/firebase.jsx";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { LanguageContext } from "./Idioma.jsx";
import traducciones from "../language/traducciones.js";

import logoDark from "../img/logoBlanco.png";
import logoLight from "../img/logoNegro.png";
import correoLight from "../img/correo.png";
import correoDark from "../img/correoBlanco.png";
import ojoAbiertoLight from "../img/ojoabierto.png";
import ojoAbiertoDark from "../img/ojoabiertoBlanco.png";
import ojoCerradoLight from "../img/ojocerrado.png";
import ojoCerradoDark from "../img/ojocerradoBlanco.png";
import googleIcon from "../img/google.png";

const Login = ({ onCambiarFormulario }) => {
  const navigate = useNavigate();
  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma]?.login || traducciones["es"].login;

  const [isDark, setIsDark] = useState(false);
  const [login, setLogin] = useState({ correo: "", contrasena: "" });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario && usuario.uid) {
      navigate("/home", { replace: true });
    }
  } catch {
    localStorage.removeItem("usuario");
  }
}, [navigate]);

  useEffect(() => {
  if (process.env.NODE_ENV === "development") {
    localStorage.removeItem("usuario");
  }
  }, []);

  useEffect(() => {
    const handleTheme = () => setIsDark(document.body.classList.contains("dark"));
    handleTheme();
    const observer = new MutationObserver(handleTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const mostrarMensaje = (texto, tipo = "exito") => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 2000);
  };

  const handleChange = (e) =>
    setLogin({ ...login, [e.target.name]: e.target.value });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // 🔹 Login con email y contraseña
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        login.correo,
        login.contrasena
      );
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "usuarios", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};

      localStorage.setItem("usuario", JSON.stringify({ uid: user.uid, ...userData }));

      mostrarMensaje("✅ Inicio de sesión exitoso", "exito");
      setTimeout(() => navigate("/home", { replace: true }), 1200);
    } catch (err) {
      console.error(err);
      mostrarMensaje(t.error || "❌ Error al iniciar sesión", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login con Google
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "usuarios", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          contrasena: "",
          correo: user.email || "",
          estado: "Activo",
          rol: "usuarios",
          telefono: "",
          usuarios: user.displayName || "",
        });
      }

      const finalSnap = await getDoc(userRef);
      const finalData = finalSnap.exists() ? finalSnap.data() : {};
      localStorage.setItem("usuario", JSON.stringify(finalData));

      mostrarMensaje("✅ Inicio con Google exitoso", "exito");
      setTimeout(() => navigate("/home", { replace: true }), 1200);
    } catch (err) {
      console.error(err);
      mostrarMensaje("❌ Error con Google", "error");
    } finally {
      setLoading(false);
    }
  };

  const logo = isDark ? logoDark : logoLight;
  const iconCorreo = isDark ? correoDark : correoLight;
  const iconPassword = showPassword
    ? isDark
      ? ojoAbiertoDark
      : ojoAbiertoLight
    : isDark
    ? ojoCerradoDark
    : ojoCerradoLight;

  return (
    <div className={formuinicio_css.container}>
      {mensaje && (
        <div
          className={`${formuinicio_css.toast} ${
            mensaje.tipo === "exito"
              ? formuinicio_css.toast_exito
              : formuinicio_css.toast_error
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      <div className={formuinicio_css.right_panel}>
        <img src={logo} alt="logo" className={formuinicio_css.background_image} />
      </div>

      <div className={formuinicio_css.left_panel}>
        <form onSubmit={handleLogin} className={formuinicio_css.form}>
          <div className={formuinicio_css.text_container}>
            <h2>{t.titulo}</h2>
            <p className={formuinicio_css.register_text}>
              {t.pregunta}
              <button
                type="button"
                onClick={onCambiarFormulario}
                className={formuinicio_css.register_btn}
              >
                {t.registrar}
              </button>
            </p>
          </div>

          <div className={formuinicio_css.formcajas}>
            <div className={formuinicio_css.input_group}>
              <input
                name="correo"
                placeholder={t.correo}
                value={login.correo}
                onChange={handleChange}
                required
                className="input-tema"
              />
              <span className={formuinicio_css.icon}>
                <img src={iconCorreo} alt="Correo" />
              </span>
            </div>

            <div className={formuinicio_css.input_group}>
              <input
                name="contrasena"
                type={showPassword ? "text" : "password"}
                placeholder={t.contrasena}
                value={login.contrasena}
                onChange={handleChange}
                required
                className="input-tema"
              />
              <span
                onClick={togglePasswordVisibility}
                className={formuinicio_css.password_toggle}
              >
                <img src={iconPassword} alt="toggle" />
              </span>
            </div>

            <button type="submit" className={formuinicio_css.login_button} disabled={loading}>
              {loading ? "..." : t.ingresar}
            </button>

            <div className={formuinicio_css.google_btn} onClick={handleGoogleSignIn}>
              <img src={googleIcon} alt="Google" className={formuinicio_css.google_icon} />
              <p>{t.google}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;