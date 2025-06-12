import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formulario from "./components/Formulario";
import PantallaDestino from "./components/PantallaDestino";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Formulario titulo="Formulario Registro" />} />
                <Route path="/resultado" element={<PantallaDestino />} />
            </Routes>
        </Router>
    );
}

export default App;