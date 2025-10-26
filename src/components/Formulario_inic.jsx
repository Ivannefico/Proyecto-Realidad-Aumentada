import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import formuinicio_css from "../css/InicioSesion.module.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUsuarios } from "../hooks/useUsuarios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import googleIcon from "../img/google.png";
import cerrado from "../img/ojocerrado.png";
import abierto from "../img/ojoabierto.png";
import Logoblanco from "../img/logoBlanco.png";
import correo from "../img/correo.png";

const Login = ({ onCambiarFormulario }) => {
  const navigate = useNavigate();
  const { crearUsuario } = useUsuarios();

  const [login, setLogin] = useState({
    correo: "",
    contrasena: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const q = query(
        collection(db, "usuarios"),
        where("correo", "==", login.correo),
        where("contrasena", "==", login.contrasena)
      );
      const snap = await getDocs(q);

      if (snap.empty) {
        setError("Correo o contraseña incorrectos");
        setLoading(false);
        return;
      }

      const usuario = snap.docs[0].data();
      localStorage.setItem("usuario", JSON.stringify(usuario));
      alert(`Bienvenido ${usuario.correo}`);
      navigate("/home");
    } catch (error) {
      console.error("❗ Error en handleLogin:", error);
      setError("Ocurrió un error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const usuarioData = {
        usuarios: user.displayName || "Usuario Google",
        correo: user.email,
        rol: "usuarios",
      };

      localStorage.setItem("usuario", JSON.stringify(usuarioData));
      alert(`Bienvenido ${user.displayName || "usuario"} (Google)`);
    } catch (error) {
      console.error(error);
      setError("Error al iniciar sesión con Google.");
    }
  };

  return (
    <div className={formuinicio_css.container}>
              <div className={formuinicio_css.right_panel}>
        <img
          src={Logoblanco}
          alt="patita blanca"
          className={formuinicio_css.background_image}
        />
      </div>
      <div className={formuinicio_css.left_panel}>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin} className={formuinicio_css.form}>
          <div className={formuinicio_css.text_container}>
            <h2>Iniciar Sesión</h2>

            <p className={formuinicio_css.register_text}>
              ¿No tienes una cuenta?
              <button
                type="button"
                onClick={onCambiarFormulario}
                className={formuinicio_css.register_btn}
              >
                Regístrate
              </button>
            </p>
          </div>

          <div className={formuinicio_css.formcajas}>
            <div className={formuinicio_css.input_group}>
              <input
                name="correo"
                placeholder="Correo Electrónico"
                value={login.correo}
                onChange={handleChange}
                required
              />
              <span className={formuinicio_css.icon}>
                <img src={correo} alt="Correo" />
              </span>
            </div>

            <div className={formuinicio_css.input_group}>
              <input
                name="contrasena"
                placeholder="Contraseña"
                type={showPassword ? "text" : "password"}
                value={login.contrasena}
                onChange={handleChange}
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className={formuinicio_css.password_toggle}
              >
                <img src={showPassword ? abierto : cerrado} alt="toggle" />
              </span>
            </div>

            <button
              type="submit"
              className={formuinicio_css.login_button}
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>

            <div
              className={formuinicio_css.google_btn}
              onClick={handleGoogleSignIn}
            >
              <img src={googleIcon} alt="Google" className={formuinicio_css.google_icon} />
              <p>Iniciar sesión con Google</p>
            </div>
          </div>
        </form>
      </div>


    </div>
  );
};

export default Login;
