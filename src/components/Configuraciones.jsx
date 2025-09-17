import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Configuraciones.module.css';

const Configuraciones = ({ titulo = "Configuraciones" }) => {
    const [notificaciones, setNotificaciones] = useState('');
    const [privacidad, setPrivacidad] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cambiarContrasena, setCambiarContrasena] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="config-container">
            <form onSubmit={handleSubmit} className="glass-form">
                <div className="title-form">
                    <h2>{titulo}</h2>
                </div>
                
                {/* Apartado para la privacidad del perfil */}
                <div className="group">
                    <div className="form-group">
                        <label>Privacidad:</label>
                        <div>
                            <label>
                                <p>Público - Cualquiera puede ver tu perfil</p>
                                <input
                                    type="radio"
                                    name="privacidad"
                                    value="publico"
                                    checked={privacidad === "publico"}
                                    onChange={() => setPrivacidad("publico")}
                                />
                            </label>
                            <label>
                                <p>Privado - Solo tú puedes ver tu perfil</p>
                                <input
                                    type="radio"
                                    name="privacidad"
                                    value="privado"
                                    checked={privacidad === "privado"}
                                    onChange={() => setPrivacidad("privado")}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Apartado para cambiar foto de perfil */}
                    <div className="form-group">
                        <label>Cambiar foto de perfil:</label>
                        <input
                            type="file"
                            onChange={(e) => setFotoPerfil(e.target.files[0])}
                        />
                        <div className="fotoPerfil">
                        </div>
                    </div>

                    {/* Apartado para activar notificaciones */}
                    <div className="form-group">
                        <label>Notificaciones:</label>
                        <div>
                            <label>
                                <p>Activadas</p>
                                <input
                                    type="radio"
                                    name="notificaciones"
                                    value="activadas"
                                    checked={notificaciones === "activadas"}
                                    onChange={() => setNotificaciones("activadas")}
                                />
                            </label>
                            <label>
                                <p>Desactivadas</p>
                                <input
                                    type="radio"
                                    name="notificaciones"
                                    value="desactivadas"
                                    checked={notificaciones === "desactivadas"}
                                    onChange={() => setNotificaciones("desactivadas")}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Cambiar correo:</label>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder="Nuevo correo electrónico"
                        />
                    </div>
                    <div className="form-group">
                        <label>Cambiar contraseña:</label>
                        <input
                            type="password"
                            value={cambiarContrasena}
                            onChange={(e) => setCambiarContrasena(e.target.value)}
                            placeholder="Nueva contraseña"
                        />
                    </div>
                    <div className="form-group">
                        <label>Cambiar teléfono:</label>
                        <input
                            type="tel"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder="Nuevo número de teléfono"
                        />
                    </div>
                </div>

                <button type="submit">Confirmar Cambios</button>
            </form>
        </div>
    );
};

export default  Configuraciones;