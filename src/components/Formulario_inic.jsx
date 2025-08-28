import React, {useState}from "react"; 
import {useNavigate} from "react-router-dom";

const Formulario_inic = ({titulo = "Formulario_inic"}) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        navigate("/inicio", {
            state: { nombre, apellido, correo, telefono, contrasena, confirmarContrasena }
        });
    };
    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/resultado", {
            state: { correo, contrasena }
        });
    };


    const flip = () => {
        const front = document.querySelector('.front');
        const back = document.querySelector('.back');
        front.style.transform = 'translateX(0%)';
        back.style.transform = 'translateX(120%)';
    };
    const flipBack = () => {
        const front = document.querySelector('.front');
        const back = document.querySelector('.back');
        front.style.transform = 'translateX(-120%)';
        back.style.transform = 'translateX(0%)';
    };

    return(
        <div className="form-container">
              /*Formulario Registro*/ 
            <form onSubmit={handleSignIn} className="glass-form front">
                <div className="title-form">
                    <h2>{titulo}</h2>
                    <p>¿Ya tienes una cuenta? <button type="button" onClick={flipBack}>Iniciar sesion</button></p>
                </div>
                
                <div className="img"></div>

                <div className="group">
                    
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                    required="required"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Escribe tu nombre"
                    />
                </div>

                <div className="form-group">
                    <label>Apellido</label>
                    <input
                    required="required"
                    type="text"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Escribe tu apellido"
                    />
                </div>

                <div className="form-group">
                    <label>Correo electronico</label>
                    <input
                    required="required"
                    type="text"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Escribe tu correo electronico"
                    />
                </div>

                <div className="form-group">
                    <label>Numero de telefono</label>
                    <input
                    required="required"
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Escribe tu telefono"
                    />
                </div>

                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                    required="required"
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    placeholder="Escribe tu contraseña"
                    />
                </div>

                <div className="form-group">
                    <label>Confirmar Contraseña</label>
                    <input
                    required="required"
                    type="password"
                     value={confirmarContrasena}
                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                    placeholder="Confirma tu contraseña"
                    />
                </div>
                

            <button type="submit">Enviar</button>
            <button type="button">Google</button>

        </div>
    </form>
    </div>
    )
}
export default Formulario_inic
