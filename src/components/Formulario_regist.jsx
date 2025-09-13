import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Registro.css";
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { crearUsuario } from '../hooks/useUsuarios';

const Registro = () => {
  const navigate = useNavigate();//permite navegar entre paguinas sin la necesidad de enlace
// guarda todo dentro de reguistro
  const [registro, setRegistro] = useState({
    usuario: "",
    correo: "",
    telefono: "",
    contrasena: "",
    confirmarContrasena: "",
  });
  //define el loading
  const [loading, setLoading] = useState(false);
//modifica el input dependiendo de su nombre
  const handleChange = (e) => {
    setRegistro({...registro, [e.target.name]: e.target.value})
  };

  const handleSignIn = async (e) => {
    e.preventDefault();//evita que la paguina se recargue
    if (registro.contrasena !== registro.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try{
      //guarda al usuario
      const userGuardado = await crearUsuario({
        usuario: registro.usuario,
        contrasena: registro.contrasena,
        rol: 'usuario'
      });

      if(!userGuardado){
        alert("Usuarion no se guardo correctamente")
        return;
      }

      await addDoc(collection(db, "usuario"),{
      usuario: registro.usuario,
      correo: registro.correo,
      telefono: registro.telefono,
      contrasena: registro.contrasena,
      });

      alert("Usuario reguistrado correctamente")
      setRegistro({ usuario: '', correo: '', telefono: '', contrasena: '', confirmarContrasena: ''});
      navigate("/", { replace: true });
    }catch (error) {
    console.error(error);
    alert("Ocurrió un error al registrar el usuario");
  } finally {
    setLoading(false); // termina loading
  }
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
              name="usuario"
              placeholder="Nombre de usuario"
              value={registro.usuario}
              onChange={handleChange}
              required
            />
            <span className="icon">👤</span>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={registro.correo}
              onChange={handleChange}
              required
            />
            <span className="icon">✉️</span>
          </div>

          <div className="input-group">
            <input
              type="tel"
              name="telefono"
              placeholder="Número de teléfono"
              value={registro.telefono}
              onChange={handleChange}
              required
            />
            <span className="icon">📞</span>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={registro.contrasena}
              onChange={handleChange}
              required
            />
            <span className="icon">👁</span>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmarContrasena"
              placeholder="Confirma contraseña"
              value={registro.confirmarContrasena}
              onChange={handleChange}
              required
            />
            <span className="icon">🔒</span>
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Registrando...' : 'Regístrate ahora'}
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
