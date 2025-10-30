import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase.jsx";
import lista_css from "../css/ListaUsuarios.module.css";
import Navbar from "./Navbar.jsx";
import Contacto from "./Contacto";
import { LanguageContext } from "./Idioma.jsx";
import traducciones from "../language/traducciones.js";

const ListaUsuarios = () => {
  const { idioma } = useContext(LanguageContext);
  const t = traducciones[idioma].listaUsuarios;

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarContacto, setMostrarContacto] = useState(false);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const snapshot = await getDocs(collection(db, "usuarios"));
        setUsuarios(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarios();
  }, []);

  const abrirContacto = () => setMostrarContacto(true);
  const cerrarContacto = () => setMostrarContacto(false);

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


  return (
    <>
      <Navbar onAbrirContacto={abrirContacto} />
      <p className={lista_css.espacio_p3}></p>
      <div className={lista_css.contenedorPrincipal}>
        <div className={lista_css.contenedorLista}>
          {usuarios.length === 0 ? (
            <p>{t.noUsuarios}</p>
          ) : (
            <div className={lista_css.gridUsuarios}>
              {usuarios.map((usuario) => (
                <div key={usuario.id} className={lista_css.tarjetaUsuario}>
                  <h3>{usuario.usuarios}</h3>
                  <p>
                    <strong>{t.correo}:</strong> {usuario.correo}
                  </p>
                  <Link to={`/usuario/${usuario.id}`} className={lista_css.botonDetalle}>
                    {t.verDetalle}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {mostrarContacto && (
        <div className={lista_css.modalOverlay} onClick={cerrarContacto}>
          <div className={lista_css.modalContenido} onClick={(e) => e.stopPropagation()}>
            <button className={lista_css.cerrarModal} onClick={cerrarContacto}>✕</button>
            <Contacto />
          </div>
        </div>
      )}
    </>
  );
};

export default ListaUsuarios;
