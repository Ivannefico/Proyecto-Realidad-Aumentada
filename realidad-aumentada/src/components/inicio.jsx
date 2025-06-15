import React from 'react';
import { Link } from 'react-router-dom';

const MiAppRA = () => {
  return (
      <div style={{ margin: "0px", overflow: "hidden" }}>
        <header>
          <div className="titulo">
            <h1><a href="index.html">PEQTU</a></h1>
          </div>
          <div className="config">
            <a href="#">config</a>
          </div>
          <div className="login">
            <a href="#">login</a>
          </div>
        </header>
        <div className="lader">
          <div className="scan">
            <h2>escanear</h2>
          </div>
          <div className="historial">
            <h2>historial</h2>
          </div>
        </div>
        <div className="body">
          <h2>escanear en tiempo real</h2>
          <p>empieza a utilizar peqtu</p>
          <Link to="/camara">Camara</Link>
        </div>
      </div>
  );
};

export default MiAppRA;
