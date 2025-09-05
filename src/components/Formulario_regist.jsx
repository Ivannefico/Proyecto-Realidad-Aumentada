import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Registro.css";

const Registro = () => {
  const navigate = useNavigate();

  const [registro, setRegistro] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    if (registro.contrasena !== registro.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }
    localStorage.setItem("usuario", JSON.stringify(registro));
    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      {/* Panel izquierdo con paisaje y logo */}
      <div className="left-panel">
        <div className="logo">Logo</div>
      </div>

      {/* Panel derecho con formulario */}
      <div className="right-panel">
        <h2>
          Te damos la bienvenida a <br /> “nombre de la pagina”
        </h2>

        <p className="login-text">
          ¿Ya tengo una cuenta?
          <button className="login-btn">Iniciar Sesión</button>
        </p>

        <form onSubmit={handleSignIn} className="form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={registro.nombre}
              onChange={(e) =>
                setRegistro({ ...registro, nombre: e.target.value })
              }
              required
            />
            <span className="icon">👤</span>
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={registro.correo}
              onChange={(e) =>
                setRegistro({ ...registro, correo: e.target.value })
              }
              required
            />
            <span className="icon">✉️</span>
          </div>

          <div className="input-group">
            <input
              type="tel"
              placeholder="Número de teléfono"
              value={registro.telefono}
              onChange={(e) =>
                setRegistro({ ...registro, telefono: e.target.value })
              }
              required
            />
            <span className="icon">📞</span>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={registro.contrasena}
              onChange={(e) =>
                setRegistro({ ...registro, contrasena: e.target.value })
              }
              required
            />
            <span className="icon">👁</span>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Confirma contraseña"
              value={registro.confirmarContrasena}
              onChange={(e) =>
                setRegistro({
                  ...registro,
                  confirmarContrasena: e.target.value,
                })
              }
              required
            />
            <span className="icon">🔒</span>
          </div>

          <button type="submit" className="register-btn">
            Regístrate ahora
          </button>

          <p className="policy">
            Información de servicios, política y avisos
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registro;
