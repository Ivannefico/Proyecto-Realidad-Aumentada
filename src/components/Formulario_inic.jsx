import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Formulario.module.css";
import { collection, getDocs, query, where} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useUsuarios } from '../hooks/useUsuarios';

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    correo: "",
    contrasena: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLogin({ ... login, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    
    try{
      const q = query(
        collection(db, "usuarios"),
        where("correo", "==", login.correo),
        where("contrasena", "==", login.contrasena)
      );

      const snap = await getDocs(q);

      if (snap.empty){
        alert("Correo o contraseña incorrectos");
        return;
      }

      const usuario = snap.docs[0].data();

      //guardamos en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));

      alert(`Bienvenido ${usuario.correo}`);
      navigate("/home");//redirige al home
    } catch (error){
      console.error(error);
      alert("Ocurrio un error al iniciar sesión");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="form-container ">

      <form onSubmit={handleLogin} className="glass-form">

        <div className="title-form">
          <h2>Iniciar Sesión</h2>
          <p>¿No tienes una cuenta? <button type="button" onClick={() => navigate("/registro")}>Registrate</button></p>
        </div>
        
        <div className="form-group ">
          <input
            name="correo"
            placeholder="Correo"
            value={login.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group ">
          <input
            name="contrasena"
            placeholder="Contraseña"
            type="password"
            value={login.contrasena}
            onChange={handleChange}
            required
          />
        </div>



        <button type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Iniciar Sesión"}
        </button>
        

        <div className="img"></div>

      </form>
    </div>
  );
};

export default Login;