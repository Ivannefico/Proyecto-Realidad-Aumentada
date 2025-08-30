
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Formulario_inic.jsx";
import Registro from "./components/Formulario_regist.jsx";
import Inicio from "./components/inicio.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;