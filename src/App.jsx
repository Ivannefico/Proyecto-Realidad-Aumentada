
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/formulario_inic.jsx";
import Registro from "./components/formulario_regist.jsx";
import Inicio from "./components/inicio.jsx";
import Contacto from "./components/contacto.jsx"
import NotFound from "./components/404.jsx";

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