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
