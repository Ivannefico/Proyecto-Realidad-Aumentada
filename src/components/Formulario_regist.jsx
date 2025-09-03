import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const navigate = useNavigate();

  const [registro, setRegistro] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const handleSignIn = (e) => {
    e.preventDefault();

    // Validar contraseñas
    if (registro.contrasena !== registro.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Guardar en localStorage
    localStorage.setItem("usuario", JSON.stringify(registro));

    // Recuperar y mostrar en consola
    const datos_usuario = localStorage.getItem("usuario");
    if (datos_usuario) {
      const datos = JSON.parse(datos_usuario);
      console.log("Usuario registrado:");
      console.log(datos.nombre);
      console.log(datos.apellido);
      console.log(datos.correo);
      console.log(datos.telefono);
      console.log(datos.contrasena);
      console.log(datos.confirmarContrasena);
    }

    // Redirigir al inicio
    navigate("/", { replace: true });
  };

  return (
    <form onSubmit={handleSignIn} className="glass-form front">
      <h2>Registrarse</h2>
      <input
        name="nombre"
        placeholder="Nombre"
        value={registro.nombre}
        onChange={(e) => setRegistro({ ...registro, nombre: e.target.value })}
        required
      />
      <input
        name="apellido"
        placeholder="Apellido"
        value={registro.apellido}
        onChange={(e) => setRegistro({ ...registro, apellido: e.target.value })}
        required
      />
      <input
        name="correo"
        placeholder="Correo"
        value={registro.correo}
        onChange={(e) => setRegistro({ ...registro, correo: e.target.value })}
        required
      />
      <input
        name="telefono"
        placeholder="Teléfono"
        value={registro.telefono}
        onChange={(e) => setRegistro({ ...registro, telefono: e.target.value })}
        required
      />
      <input
        name="contrasena"
        type="password"
        placeholder="Contraseña"
        value={registro.contrasena}
        onChange={(e) =>
          setRegistro({ ...registro, contrasena: e.target.value })
        }
        required
      />
      <input
        name="confirmarContrasena"
        type="password"
        placeholder="Confirmar Contraseña"
        value={registro.confirmarContrasena}
        onChange={(e) =>
          setRegistro({ ...registro, confirmarContrasena: e.target.value })
        }
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Registro;