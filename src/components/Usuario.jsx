import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

// Obtener todos los usuarios
export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Agregar un usuario
export const addUser = async (newUser) => {
  await addDoc(collection(db, "users"), newUser);
};