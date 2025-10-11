import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import lista_css from "../css/ListaUsuarios.module.css";
import Navbar from "./Navbar.jsx";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const snapshot = await getDocs(collection(db, "usuarios"));
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsuarios(lista);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarios();
  }, []);

if (loading)
  return (
 
    <div className={lista_css.loadingScreen}>
      <Navbar />
      <div className={lista_css.loadingContent}>
        <div className={lista_css.spinner}></div>
        <p>Cargando usuarios...</p>
      </div>
    </div>
  );


  return (
    <>
      <Navbar />
          <p className={lista_css.espacio_p3}></p>
      <div className={lista_css.contenedorPrincipal}>
        <div className={lista_css.contenedorLista}>

          {usuarios.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <div className={lista_css.gridUsuarios}>
              {usuarios.map(usuario => (
                <div key={usuario.id} className={lista_css.tarjetaUsuario}>
                  <h3>{usuario.usuarios}</h3>
                  <p><strong>Correo:</strong> {usuario.correo}</p>
                  <Link to={`/usuario/${usuario.id}`} className={lista_css.botonDetalle}>
                    Ver detalle
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListaUsuarios;
