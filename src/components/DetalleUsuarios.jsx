import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.jsx";
import detalle_css from "../css/DetalleUsuarios.module.css";
import lista_css from "../css/ListaUsuarios.module.css";
import Navbar from "./Navbar.jsx";
import Contacto from "./Contacto";
import { LanguageContext } from "./Idioma.jsx";
import traducciones from "../language/traducciones.js";

const DetalleUsuario = () => {
  const { id } = useParams();
  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma].detalleUsuario;


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
      setUsuario({ ...usuario, activo: !usuario.activo });
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
          <p>{t.cargando}</p>
        </div>
      </div>
    );

  if (!usuario)
    return <p className={detalle_css.error}>{t.noEncontrado}</p>;

  return (
    <>
      <Navbar onAbrirContacto={abrirContacto} />
      <p className={detalle_css.espacio_p3}></p>
      <div className={detalle_css.container}>
        <div className={detalle_css.card}>
          
          <h2 className={detalle_css.titulo}>
            {t.perfilDe} {usuario.usuarios}
          </h2>

          {!editando ? (
            <>
              <div className={detalle_css.info}>
                <p><strong>{t.correo}:</strong> {usuario.correo}</p>
                <p><strong>{t.rol}:</strong> {usuario.rol}</p>
                <p><strong>{t.telefono}:</strong> {usuario.telefono}</p>
                <p><strong>{t.contrasena}:</strong> {usuario.contrasena}</p>
                <p><strong>{t.estado}:</strong> {usuario.activo ? t.activo : t.deshabilitado}</p>
              </div>

              <div className={detalle_css.botonera}>
                <button onClick={() => setEditando(true)} className={detalle_css.boton}>
                  {t.editar}
                </button>

                <button onClick={toggleActivo} className={detalle_css.boton}>
                  {usuario.activo ? t.deshabilitar : t.habilitar}
                </button>

                <Link to="/listausuario">
                  <button className={detalle_css.boton}>{t.volver}</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h3 className={detalle_css.subtitulo}>{t.editarUsuario}</h3>
              <div className={detalle_css.form}>
                <h3 className={detalle_css.h3}>{t.perfilDe}</h3>
                <input className={detalle_css.inputcss} type="text" name="usuarios" value={formData.usuarios || ""} onChange={handleChange} />

                <h3 className={detalle_css.h3}>{t.correo}</h3>
                <input className={detalle_css.inputcss} type="text" name="correo" value={formData.correo || ""} onChange={handleChange} />

                <h3 className={detalle_css.h3}>{t.telefono}</h3>
                <input className={detalle_css.inputcss} type="text" name="telefono" value={formData.telefono || ""} onChange={handleChange} />

                <h3 className={detalle_css.h3}>{t.rol}</h3>
                <input className={detalle_css.inputcss} type="text" name="rol" value={formData.rol || ""} onChange={handleChange} />

                <h3 className={detalle_css.h3}>{t.contrasena}</h3>
                <input className={detalle_css.inputcss} type="text" name="contrasena" value={formData.contrasena || ""} onChange={handleChange} />
              </div>

              <div className={detalle_css.botonera}>
                <button onClick={handleGuardar} className={detalle_css.boton}>
                  {t.guardar}
                </button>
                <button onClick={() => setEditando(false)} className={detalle_css.boton}>
                  {t.cancelar}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {mostrarContacto && (
        <div className={detalle_css.modalOverlay} onClick={cerrarContacto}>
          <div className={detalle_css.modalContenido} onClick={(e) => e.stopPropagation()}>
            <button className={detalle_css.cerrarModal} onClick={cerrarContacto}>✕</button>
            <Contacto />
          </div>
        </div>
      )}
    </>
  );
};

export default DetalleUsuario;