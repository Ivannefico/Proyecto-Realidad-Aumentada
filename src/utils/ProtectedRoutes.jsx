import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  // Recuperamos el usuario guardado en localStorage
  const user = JSON.parse(localStorage.getItem("usuario"));

  // Si existe usuario, mostramos el contenido; si no, redirigimos al login
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;