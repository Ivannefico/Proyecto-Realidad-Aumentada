import { useEffect , useState } from "react";
import { collection , getDocs } from "firebase/firestore";
import { db } from "../firebase";

export function useUsuarios(){ 

const col = collection (dblClick,"usuarios");
const snap = getDocs(col);
const dataUsuario = snap.docs.map( d=> ({ id: d.id, ...d.dataUsuario() }));

console.log(dataUsuario);

}