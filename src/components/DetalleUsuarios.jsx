import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import detalle_css from "../css/DetalleUsuarios.module.css";
import Navbar from './Navbar.jsx';

const DetalleUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({});

  //   Obtener usuario al cargar
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const ref = doc(db, "usuarios", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUsuario(snap.data());
          setFormData(snap.data());
        } else {
          console.log("No existe ese usuario");
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuario();
  }, [id]);

  // Manejar inputs de edición
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Guardar cambios en Firestore
  const handleGuardar = async () => {
    try {
      const ref = doc(db, "usuarios", id);
      await updateDoc(ref, formData);
      setUsuario(formData);
      setEditando(false);
      alert("Usuario actualizado correctamente ✅");
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  // Eliminar usuario
  const handleEliminar = async () => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este usuario?");
    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "usuarios", id));
      alert("Usuario eliminado ❌");
      navigate("/listausuario"); // volver a la lista
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!usuario) return <p>No se encontró el usuario</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Perfil de {usuario.usuarios}</h2>

      {!editando ? (
        <>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          <p><strong>Rol:</strong> {usuario.rol}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono}</p>
          <p><strong>Contraseña:</strong> {usuario.contrasena}</p>

          <div style={{ marginTop: "20px" }}>
            <button onClick={() => setEditando(true)} style={{ marginRight: "10px" }}>
              ✏️ Editar
            </button>
            <button onClick={handleEliminar} style={{ marginRight: "10px" }}>
              🗑️ Eliminar
            </button>
            <Link to="/listausuario">Volver a la lista</Link>
          </div>
        </>
      ) : (
        <>
          <h3>Editar usuario</h3>
          <input
            type="text"
            name="usuarios"
            value={formData.usuarios || ""}
            onChange={handleChange}
            placeholder="Nombre"
          /><br />
          <input
            type="text"
            name="correo"
            value={formData.correo || ""}
            onChange={handleChange}
            placeholder="Correo"
          /><br />
          <input
            type="text"
            name="telefono"
            value={formData.telefono || ""}
            onChange={handleChange}
            placeholder="Teléfono"
          /><br />
          <input
            type="text"
            name="rol"
            value={formData.rol || ""}
            onChange={handleChange}
            placeholder="Rol"
          /><br />
          <input
            type="text"
            name="contrasena"
            value={formData.contrasena || ""}
            onChange={handleChange}
            placeholder="Contraseña"
          /><br /><br />

          <button onClick={handleGuardar} style={{ marginRight: "10px" }}>
            💾 Guardar cambios
          </button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </>
      )}
    </div>
  );
};

export default DetalleUsuario;