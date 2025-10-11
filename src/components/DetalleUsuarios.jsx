import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import detalle_css from "../css/DetalleUsuarios.module.css";
import lista_css from "../css/ListaUsuarios.module.css"; // 👈 reutilizamos estilos de carga
import Navbar from "./Navbar.jsx";

const DetalleUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({});

  // Obtener usuario al cargar
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
      navigate("/listausuario");
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // 🔹 MISMA pantalla de carga que la lista
  if (loading)
    return (
      <div className={lista_css.loadingScreen}>
        <Navbar />
        <div className={lista_css.loadingContent}>
          <div className={lista_css.spinner}></div>
          <p>Cargando usuario...</p>
        </div>
      </div>
    );

  if (!usuario) return <p className={detalle_css.error}>No se encontró el usuario</p>;

  return (
    <>
      <Navbar />
      <p className={detalle_css.espacio_p3}></p>
      <div className={detalle_css.container}>
        <div className={detalle_css.card}>
          <h2 className={detalle_css.titulo}>Perfil de {usuario.usuarios}</h2>

          {!editando ? (
            <>
              <div className={detalle_css.info}>
                <p><strong>Correo:</strong> {usuario.correo}</p>
                <p><strong>Rol:</strong> {usuario.rol}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono}</p>
                <p><strong>Contraseña:</strong> {usuario.contrasena}</p>
              </div>

              <div className={detalle_css.botonera}>
                <button onClick={() => setEditando(true)} className={detalle_css.boton}>
                  Editar
                </button>
                <button onClick={handleEliminar} className={detalle_css.boton}>
                  Eliminar
                </button>
                <Link to="/listausuario">
                  <button className={detalle_css.boton}>Volver a la lista</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h3 className={detalle_css.subtitulo}>Editar usuario</h3>

              <div className={detalle_css.form}>
                <h3 className={detalle_css.h3}>Usuario</h3>
                <input
                  className={detalle_css.input}
                  type="text"
                  name="usuarios"
                  value={formData.usuarios || ""}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
                <h3 className={detalle_css.h3}>Correo</h3>
                <input
                  className={detalle_css.input}
                  type="text"
                  name="correo"
                  value={formData.correo || ""}
                  onChange={handleChange}
                  placeholder="Correo"
                />
                <h3 className={detalle_css.h3}>Teléfono</h3>
                <input
                  className={detalle_css.input}
                  type="text"
                  name="telefono"
                  value={formData.telefono || ""}
                  onChange={handleChange}
                  placeholder="Teléfono"
                />
                <h3 className={detalle_css.h3}>Rol</h3>
                <input
                  className={detalle_css.input}
                  type="text"
                  name="rol"
                  value={formData.rol || ""}
                  onChange={handleChange}
                  placeholder="Rol"
                />
                <h3 className={detalle_css.h3}>Contraseña</h3>
                <input
                  className={detalle_css.input}
                  type="text"
                  name="contrasena"
                  value={formData.contrasena || ""}
                  onChange={handleChange}
                  placeholder="Contraseña"
                />
              </div>

              <div className={detalle_css.botonera}>
                <button onClick={handleGuardar} className={detalle_css.boton}>
                  Guardar cambios
                </button>
                <button onClick={() => setEditando(false)} className={detalle_css.boton}>
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DetalleUsuario;
