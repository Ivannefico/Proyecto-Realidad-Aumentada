import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  // Recuperamos el usuario guardado en localStorage
  const user = JSON.parse(localStorage.getItem("usuario"));

  // Verificamos si existe y si está activo
  if (!user || user.activo === false) {
    // Si no hay usuario o está deshabilitado, redirigimos al login
    return <Navigate to="/" replace />;
  }

  // Usuario existe y está activo: mostramos el contenido protegido
  return <Outlet />;
};

export default ProtectedRoutes;
