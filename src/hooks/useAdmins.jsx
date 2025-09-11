import { useEffect , useState } from "react";
import { collection , getDocs } from "firebase/firestore";
import { db } from "../firebase";

export function useAdmins(){ 

const col = collection (dblClick,"administradores");
const snap = getDocs(col);
const dataAdmin = snap.docs.map( d=> ({ id: d.id, ...d.dataAdmin() }));

console.log(dataAdmin);

} 

export default useAdmins;