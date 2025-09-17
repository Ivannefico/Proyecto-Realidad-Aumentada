import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Formulario.module.css";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    correo: "",
    contrasena: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Recuperar usuario de localStorage
    const datos_usuario = localStorage.getItem("usuario");

    if (datos_usuario) {
      const datos = JSON.parse(datos_usuario);

      if (
        datos.correo === login.correo &&
        datos.contrasena === login.contrasena
      ) {
        console.log("Login exitoso");
        navigate("/home", { replace: true });
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } else {
      alert("No hay usuarios registrados");
    }
  };


  return (
    <div className="form-container ">

      <form onSubmit={handleLoginSubmit} className="glass-form">

        <div className="title-form">
          <h2>Iniciar Sesión</h2>
          <p>¿No tienes una cuenta? <button type="button">Registrate</button></p>
        </div>
        
        <div className="form-group ">
         <input
            name="correo"
            placeholder="Correo"
            value={login.correo}
            onChange={(e) => setLogin({ ...login, correo: e.target.value })}
            required
          />
        </div>

        <div className="form-group ">
          <input
            name="contrasena"
            placeholder="Contraseña"
            type="password"
            value={login.contrasena}
            onChange={(e) => setLogin({ ...login, contrasena: e.target.value })}
            required
          />
        </div>



        <button type="submit">Iniciar Sesión</button>
        

        <div className="img"></div>

      </form>
    </div>
  );
};

export default Login;