import { collection, getDocs, addDoc } from "../firebase/firestore";
import { db } from "../firebase/firestore";

// Obtener todos los usuarios
export const getAdmins = async () => {
  const querySnapshot = await getDocs(collection(db, "admins"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Agregar un usuario
export const addAdmin = async (newAdmin) => {
  await addDoc(collection(db, "admins"), newAdmin);
};

// Obtener por ID de admin
async function getById(id) {
	const ref = doc(db, "admins", id);
	const d = await getDoc(ref);
	return d.exists() ? { id: d.id, ...d.data()} : null;
};

// Para ver si existe el dato
function listenById(id, cb, errCb) {
	const ref = doc(db, "admins", id);
	return onSnapshot(ref, (d) => {
	cb(d.exists() ? { id: d.id, ...d.data()} : null);
	}, errCb);
};