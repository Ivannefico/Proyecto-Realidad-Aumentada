import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.jsx";
import detalle_css from "../css/DetalleUsuarios.module.css";
import lista_css from "../css/ListaUsuarios.module.css";
import Navbar from "./Navbar.jsx";
import Contacto from "./Contacto";

const DetalleUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({});
  const [mostrarContacto, setMostrarContacto] = useState(false);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const ref = doc(db, "usuarios", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUsuario(snap.data());
          setFormData(snap.data());
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuario();
  }, [id]);

  const abrirContacto = () => setMostrarContacto(true);
  const cerrarContacto = () => setMostrarContacto(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = async () => {
    try {
      const ref = doc(db, "usuarios", id);
      await updateDoc(ref, formData);
      setUsuario(formData);
      setEditando(false);
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const toggleActivo = async () => {
    try {
      const ref = doc(db, "usuarios", id);
      await updateDoc(ref, { activo: usuario.activo === false ? true : false });
      setUsuario({ ...usuario, activo: usuario.activo === false ? true : false });
    } catch (error) {
      console.error("Error al cambiar estado del usuario:", error);
    }
  };

  if (loading)
    return (
      <div className={lista_css.loadingScreen}>
        <Navbar onAbrirContacto={abrirContacto} />
        <div className={lista_css.loadingContent}>
          <div className={lista_css.spinner}></div>
          <p>Cargando usuario...</p>
        </div>
      </div>
    );

  if (!usuario)
    return <p className={detalle_css.error}>No se encontró el usuario</p>;

  return (
    <>
      <Navbar onAbrirContacto={abrirContacto} />
      <p className={detalle_css.espacio_p3}></p>
      <div className={detalle_css.container}>
        <div className={detalle_css.card}>
          <h2 className={detalle_css.titulo}>Perfil de {usuario.usuarios}</h2>

          {!editando ? (
            <>
              <div className={detalle_css.info}>
                <p className={detalle_css.p}>
                  <strong>Correo:</strong> {usuario.correo}
                </p>
                <p className={detalle_css.p}>
                  <strong>Rol:</strong> {usuario.rol}
                </p>
                <p className={detalle_css.p}>
                  <strong>Teléfono:</strong> {usuario.telefono}
                </p>
                <p className={detalle_css.p}>
                  <strong>Contraseña:</strong> {usuario.contrasena}
                </p>
                <p className={detalle_css.p}>
                  <strong>Estado:</strong>{" "}
                  {usuario.activo === false ? "Deshabilitado" : "Activo"}
                </p>
              </div>

              <div className={detalle_css.botonera}>
                <button
                  onClick={() => setEditando(true)}
                  className={detalle_css.boton}
                >
                  Editar
                </button>

                <button onClick={toggleActivo} className={detalle_css.boton}>
                  {usuario.activo === false ? "Habilitar" : "Deshabilitar"}
                </button>

                <Link to="/listausuario">
                  <button className={detalle_css.boton}>Volver</button>
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
                />
                <h3 className={detalle_css.h3}>Correo</h3>
                <input
                  className={detalle_css.input}
                  type="text"
                  name="correo"
                  value={formData.correo || ""}
                  onChange={handleChange}
                />
                <h3 className={detalle_css.h3}>Teléfono</h3>
                <input
                  className={detalle_css.input}
                  type="text"
                  name="telefono"
                  value={formData.telefono || ""}
                  onChange={handleChange}
                />
                <h3 className={detalle_css.h3}>Rol</h3>
                <input
                  className={detalle_css.input}
                  type="text"
                  name="rol"
                  value={formData.rol || ""}
                  onChange={handleChange}
                />
                <h3 className={detalle_css.h3}>Contraseña</h3>
                <input
                  className={detalle_css.input}
                  type="text"
                  name="contrasena"
                  value={formData.contrasena || ""}
                  onChange={handleChange}
                />
              </div>

              <div className={detalle_css.botonera}>
                <button onClick={handleGuardar} className={detalle_css.boton}>
                  Guardar cambios
                </button>
                <button
                  onClick={() => setEditando(false)}
                  className={detalle_css.boton}
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {mostrarContacto && (
        <div className={detalle_css.modalOverlay} onClick={cerrarContacto}>
          <div
            className={detalle_css.modalContenido}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={detalle_css.cerrarModal}
              onClick={cerrarContacto}
            >
              ✕
            </button>
            <Contacto />
          </div>
        </div>
      )}
    </>
  );
};

export default DetalleUsuario;