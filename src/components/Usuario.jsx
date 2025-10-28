import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.jsx";

// Obtener todos los usuarios
export const getUsuarios = async () => {
  const querySnapshot = await getDocs(collection(db, "usuarios"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Agregar un usuario
export const addUsuario = async (newUsuario) => {
  await addDoc(collection(db, "usuarios"), newUsuario);
};

// Obtener por ID de usuario
async function getById(id) {
	const ref = doc(db, "usuarios", id);
	const d = await getDoc(ref);
	return d.exists() ? { id: d.id, ...d.data()} : null;
};

// Para ver si existe el dato
function listenById(id, cb, errCb) {
	const ref = doc(db, "usuarios", id);
	return onSnapshot(ref, (d) => {
	cb(d.exists() ? { id: d.id, ...d.data()} : null);
	}, errCb);
};