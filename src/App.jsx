
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Formulario_inic.jsx";
import Registro from "./components/Formulario_regist.jsx";
import Inicio from "./components/Inicio.jsx";
import Contacto from "./components/Contacto.jsx"
import NotFound from "./components/404.jsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/registro" element={<Registro />} />


              <Route path="/home" element={<Inicio />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/error404" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;