import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";

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

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Usuarios</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        usuarios.map(usuario => (
          <div
            key={usuario.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              margin: "10px 0",
              padding: "10px",
              maxWidth: "400px"
            }}
          >
            <h3>{usuario.usuarios}</h3>
            <p><strong>Correo:</strong> {usuario.correo}</p>
            <Link to={`/usuario/${usuario.id}`}>Ver detalle</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaUsuarios;