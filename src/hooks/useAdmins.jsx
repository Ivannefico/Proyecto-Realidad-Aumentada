import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { updateDoc } from "firebase/firestore/lite";

export function useAdmins() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
    const obtenerAdmins = async () => {
        try {
        // Crear consulta: solo documentos con rol == "admin"
        const q = query(collection(db, "usuarios"), where("rol", "==", "admin"));
        const snap = await getDocs(q);

        // Mapear resultados
        const dataAdmin = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        }));

        setAdmins(dataAdmin);
        console.log("Admins:", dataAdmin);
        } catch (error) {
        console.error("Error al obtener admins:", error);
        }
    };

    obtenerAdmins();
    }, []);

    return admins;
}