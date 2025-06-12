import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Formulario.css";

const FormularioRegistro = ({ titulo = "Formulario Registro" }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Navegar a PantallaDestino y pasar los datos
        navigate("/resultado", {
            state: { nombre, apellido, correo, telefono }
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="glass-form">
                <div className="title-form">
                    <h2>{titulo}</h2>
                    <p>¿Ya tienes una cuenta? <a href="/iniciar-sesion">Iniciar sesion</a></p>
                </div>
                
                <div className="img">

                </div>
                <div className="group">
                    
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Escribe tu nombre"
                        />
                    </div>

                    <div className="form-group">
                        <label>Apellido</label>
                        <input
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            placeholder="Escribe tu apellido"
                        />
                    </div>

                    <div className="form-group">
                        <label>Correo electronico</label>
                        <input
                            type="text"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder="Escribe tu correo electronico"
                        />
                    </div>

                    <div className="form-group">
                        <label>Numero de telefono</label>
                        <input
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder="Escribe tu telefono"
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <input
                            type="password"
                            value={confirmarContrasena}
                            onChange={(e) => setConfirmarContrasena(e.target.value)}
                            placeholder="Confirma tu contraseña"
                        />
                    </div>

                    <div className="form-group">
                        <label>Foto de perfil</label>
                        <input
                            type="file"
                            value={fotoPerfil}
                            onChange={(e) => setFotoPerfil(e.target.files[0])}
                        />
                    </div>
                

                    <button type="submit">Enviar</button>
                    <button type="button">Google</button>

                </div>
            </form>
        </div>
    );
};

export default FormularioRegistro;