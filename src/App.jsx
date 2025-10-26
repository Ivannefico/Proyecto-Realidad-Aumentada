import { BrowserRouter, Routes, Route } from "react-router-dom";
import Formulario from "./components/Formulario.jsx";
import Registro from "./components/Formulario_regist.jsx";
import Inicio from "./components/Inicio.jsx";
import Camara from "./components/Camara.jsx";
import Contacto from "./components/Contacto.jsx"
import NotFound from "./components/404.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import ListaUsuarios from "./components/ListaUsuarios.jsx";
import DetalleUsuarios from "./components/DetalleUsuarios.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario />} />
         <Route path="/registro" element={<Registro />} />
         <Route path="/privacypolicy" element={<PrivacyPolicy />} />

        <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Inicio />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/error404" element={<NotFound />} />
              <Route path="/camara" element={<Camara />} />
              <Route path="/listausuario" element={<ListaUsuarios />} />
              <Route path="/usuario/:id" element={<DetalleUsuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;