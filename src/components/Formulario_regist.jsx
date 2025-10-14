import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import formuregis_css from "../css/Registro.module.css";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useUsuarios } from '../hooks/useUsuarios';

const Registro = () => {
  const navigate = useNavigate();//permite navegar entre paginas sin la necesidad de enlace

  const { crearUsuario } = useUsuarios();//llamo a crearUsuario
  
  // guarda todo dentro de registro
  const [registro, setRegistro] = useState({
    usuarios: "",
    correo: "",
    telefono: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // nuevo estado para errores

  // función de validación de email
  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  //modifica el input dependiendo de su nombre
  const handleChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();//evita que la pagina se recargue
    setError(""); // limpia error anterior

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
      setRegistro({
        usuarios: "",
        correo: "",
        telefono: "",
        contrasena: "",
        confirmarContrasena: "",
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error al registrar el usuario");
    } finally {
      setLoading(false); // termina loading
    }
  };

  return (
    <div className={formuregis_css.container}>
      {/* Panel izquierdo con paisaje y logo */}
      <div className={formuregis_css.left_panel}>
        <div className={formuregis_css.logo}>Logo</div>
      </div>

      {/* Panel derecho con formulario */}
      <div className={formuregis_css.right_panel}>
        <h2>
          Te damos la bienvenida a <br /> “nombre de la pagina”
        </h2>

        <p className={formuregis_css.login_text}>
          ¿Ya tengo una cuenta?
          <button className={formuregis_css.login_btn}>Iniciar Sesión</button>
        </p>

        {/* se muestra el error si existe */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSignIn} className={formuregis_css.form}>
          <div className={formuregis_css.input_group}>
            <input
              type="text"
              name="usuarios"
              placeholder="Nombre de usuarios"
              value={registro.usuarios}
              onChange={handleChange}
              required
            />
            <span className={formuregis_css.icon}>👤</span>
          </div>

          <div className={formuregis_css.input_group}>
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={registro.correo}
              onChange={handleChange}
              required
            />
            <span className={formuregis_css.icon}>✉️</span>
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
            <span className={formuregis_css.icon}>📞</span>
          </div>

          <div className={formuregis_css.input_group}>
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={registro.contrasena}
              onChange={handleChange}
              required
            />
            <span className={formuregis_css.icon}>👁</span>
          </div>

          <div className={formuregis_css.input_group}>
            <input
              type="password"
              name="confirmarContrasena"
              placeholder="Confirma contraseña"
              value={registro.confirmarContrasena}
              onChange={handleChange}
              required
            />
            <span className={formuregis_css.icon}>🔒</span>
          </div>

          <button type="submit" className={formuregis_css.register_btn} disabled={loading}>
            {loading ? "Registrando..." : "Regístrate ahora"}
          </button>

          <p className={formuregis_css.policy}>
            Información de servicios, política y avisos
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registro;