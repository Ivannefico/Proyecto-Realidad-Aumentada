import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import formuregis_css from "../css/Registro.module.css";
import { useUsuarios } from "../hooks/useUsuarios";
import logoNegro from "../img/logoNegro.png";
import cerrado from "../img/ojocerrado.png";
import abierto from "../img/ojoabierto.png";
import user from "../img/user.png";
import correo from "../img/correo.png";
import telefono from "../img/phone.png";


const Registro = () => {
    const navigate = useNavigate();
    const { crearUsuario } = useUsuarios();

    const [registro, setRegistro] = useState({
        usuarios: "",
        correo: "",
        telefono: "",
        contrasena: "",
        confirmarContrasena: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

    const handleChange = (e) => {
        setRegistro({ ...registro, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLoginRedirect = () => {
        navigate("/");
    };

    const handlePrivacyPolicy = () => {
        navigate("/privacypolicy");
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateEmail(registro.correo)) {
            setError("El correo electrónico no es válido");
            return;
        }

        if (registro.contrasena !== registro.confirmarContrasena) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);

        try {
            await crearUsuario({
                usuarios: registro.usuarios,
                correo: registro.correo,
                telefono: registro.telefono,
                contrasena: registro.contrasena,
                rol: "usuarios",
            });

            alert("Usuario registrado correctamente");
            setRegistro({
                usuarios: "",
                correo: "",
                telefono: "",
                contrasena: "",
                confirmarContrasena: "",
            });

            navigate("/", { replace: true });
        } catch (error) {
            console.error(error);
            setError("Ocurrió un error al registrar el usuario");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={formuregis_css.container}>
            {/* PANEL IZQUIERDO */}
            <div className={formuregis_css.left_panel}>
                <img
                    src={logoNegro}
                    alt="patita negra"
                    className={formuregis_css.background_image}
                />
            </div>

            {/* PANEL DERECHO */}
            <div className={`${formuregis_css.right_panel} ${formuregis_css.fadee_in}`}>
                


                {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSignIn} className={formuregis_css.form}>
                <div className={formuregis_css.text_container}>
                    <h2>
                        Te damos la bienvenida a <br /> “Scan cat”
                    </h2>

                    <p className={formuregis_css.login_text}>
                        ¿Ya tengo una cuenta?
                        <button
                            onClick={handleLoginRedirect}
                            className={formuregis_css.login_btn}
                        >
                            Iniciar Sesión
                        </button>
                    </p>
                </div>
                <div className={formuregis_css.formcajas}>
                    <div className={formuregis_css.input_group}>
                        <input
                            type="text"
                            name="usuarios"
                            placeholder="Nombre de usuario"
                            value={registro.usuarios}
                            onChange={handleChange}
                            required
                        />
                        <span className={formuregis_css.icon}><img src={user} alt="Usuario" /></span>
                    </div>

                    <div className={formuregis_css.input_group}>
                        <input
                            name="correo"
                            placeholder="Correo electrónico"
                            value={registro.correo}
                            onChange={handleChange}
                            required
                        />
                        <span className={formuregis_css.icon}><img src={correo} alt="Correo" /></span>
                    </div>

                    <div className={formuregis_css.input_group}>
                        <input
                            type="tel"
                            name="telefono"
                            placeholder="Número de teléfono"
                            value={registro.telefono}
                            onChange={handleChange}
                            required
                        />
                        <span className={formuregis_css.icon}><img src={telefono} alt="Teléfono" /></span>
                    </div>

                    <div className={formuregis_css.input_group}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="contrasena"
                            placeholder="Contraseña"
                            value={registro.contrasena}
                            onChange={handleChange}
                            required
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className={formuregis_css.password_toggle}
                        >
                            {showPassword ? (
                                <img src={abierto} alt="Ojo abierto" />
                            ) : (
                                <img src={cerrado} alt="Ojo cerrado" />
                            )}
                        </span>
                    </div>

                    <div className={formuregis_css.input_group}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmarContrasena"
                            placeholder="Confirma contraseña"
                            value={registro.confirmarContrasena}
                            onChange={handleChange}
                            required
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className={formuregis_css.password_toggle}
                        >
                            {showPassword ? (
                                <img src={abierto} alt="Ojo abierto" />
                            ) : (
                                <img src={cerrado} alt="Ojo cerrado" />
                            )}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className={formuregis_css.register_btn}
                        disabled={loading}
                    >
                        {loading ? "Registrando..." : "Regístrate ahora"}
                    </button>
            
                    <button
                        className={formuregis_css.policy}
                        onClick={handlePrivacyPolicy}
                    >
                        Información de servicios, política y avisos
                    </button>
                     </div> 
                </form>
            </div>
        </div>
    );
};

export default Registro;