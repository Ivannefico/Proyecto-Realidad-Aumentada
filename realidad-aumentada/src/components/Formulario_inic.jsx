import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Formulario.css";

const Formulario_inic = ({ titulo = "Formulario_inic" }) => {
    return (
        <div className="form-container">
            /*Formulario Inicio*/ 
            <form onSubmit={handleLogin} className="glass-form back">
                <div className="title-form">
                    <h2>Iniciar Sesion</h2>
                    <p>¿No tienes una cuenta? <button type="button" onClick={flip}>Registrate</button></p>
                </div>
                <div className="form-group">
                    <label>Correo electronico</label>
                    <input
                        required="required"
                        type="text"
                        placeholder="Escribe tu correo electronico" 
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        required="required"
                        type="password"
                        placeholder="Escribe tu contraseña"
                    />
                </div>
                <button type="submit">Iniciar Sesion</button>
            
                <div className="img"></div>
            </form>
        </div>
        
    );
};

export default Formulario_inic;