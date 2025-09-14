import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Hook para manejar usuarios
export function useUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

  // Leer usuarios desde Firestore
    useEffect(() => {
    const fetchUsuarios = async () => {
        try {
        const col = collection(db, "usuarios");
        const snap = await getDocs(col);
        const dataUsuario = snap.docs.map(d => ({
            id: d.id,
            ...d.data()
        }));
        setUsuarios(dataUsuario);
        } catch (error) {
        console.error("Error al obtener usuarios:", error);
        }
    };

    fetchUsuarios();
    }, []);

  // Crear usuario en Firestore
    const crearUsuario = async (nuevoUsuario) => {
    try {
        await addDoc(collection(db, "usuarios"), nuevoUsuario);
        console.log("Usuario creado con éxito");
    } catch (error) {
        console.error("Error al crear usuario:", error);
    }
    };

    return { usuarios, crearUsuario };
}