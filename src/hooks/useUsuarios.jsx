import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Hook para manejar usuarios
export function useUsuarios() {
    
    // lee datos de los usuarios 
    const [usuarios, setUsuarios] = useState([]);

    // Leer usuarios desde Firestore
    const leerUsuarios = async () => {
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
    useEffect(() => {
        leerUsuarios();
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

    //eliminar usuario
    const eliminarUsuario = async (id) => {
        try {
            await deleteDoc(doc(db, "usuarios", id));
            console.log("Usuario eliminado con éxito");
        await leerUsuarios(); // Recargar lista
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    //Actualiza usuario
    const actualizarUsuario = async (id, nuevosDatos) => {
        try {
            const refUsuario = doc(db, "usuarios", id);
            await update(refUsuario, nuevosDatos)
        }catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    }

    return { usuarios, crearUsuario, leerUsuarios, actualizarUsuario};
}