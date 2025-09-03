// src/components/PantallaDestino.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const PantallaDestino = () => {
    const location = useLocation();
    const { nombre, apellido, correo, telefono } = location.state || {};

    return (
        <div>
            <h2>Datos recibidos:</h2>
            <p>Nombre: {nombre}</p>
            <p>Apellido: {apellido}</p>
            <p>Correo: {correo}</p>
            <p>Telefono: {telefono}</p>
        </div>
    );
};

export default PantallaDestino;