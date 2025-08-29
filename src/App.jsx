/*
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
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MiAppRA from './components/inicio';
import Camara from './components/camara';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MiAppRA />} />
        <Route path="/camara" element={<Camara />} />
      </Routes>
    </Router>
  );
}

export default App;

*/


/*
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Camara from './components/camara';
import MiAppRA from "./components/inicio";
import "./css/inicio.css";


export default function App(){
  return(
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<MiAppRA />} />
        <Route path="/camara" element={<Camara />} />
      </Routes>
    </Router>
    </div>
  )
}
*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formulario_inic from "./components/Formulario_inic";
import Formulario_regist from "./components/Formulario_regist";
import formulario from "./pages/formulario";
import PantallaDestino from "./components/PantallaDestino";
import Scaner from "./components/camara";
import MiAppRA from "./components/inicio";
import navbar  from "./components/navbar";


// Importando los estilos
import "./css/Formulario.css";
import "./css/camara.css";
import "./css/inicio.css";

function App() {
    return (
        <Router>
          <navbar/>
            <Routes>
                <Route path="/" element={<Formulario titulo="Bienvenido a Scanner Cat, ¡Registrate!" />} />
                <Route path="/camara" element={<Scaner />} />
                <Route path="/inicio" element={<MiAppRA />} />
                <Route path="/configuracion" element={<>Configuración</>} />
            </Routes>
        </Router>
    );
}

export default App;