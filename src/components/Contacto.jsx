import React from "react";
import "../css/Contacto.module.css"

const Contacto = () => {
    return (
        <div className="contacto-container">
            <h2 className="title">Contacto</h2>
            <section>
                <h3 className="subtitle">Quienes somos:</h3>
                <div>
                    <p>Joaquin Carrasco y Ezequiel Salazar: Desarrolladores Backend, Ivan Moreno y Facundo Barros: Desarrolladores Frontend, Sofia Araya y Juan Ferreyra: Diseñadores</p>
                    <p>Si tienes alguna pregunta, no dudes en contactarnos. Somos un equipo de profesionales listos para ayudarte.</p>
                    <ul>
                        <h3 className="subtitle">Nuestros datos de contacto:</h3>
                        <li>Email: <b>scanner.cat@gmail.com</b></li>
                        <li>Teléfono: <b>+123456789</b></li>
                    </ul>
                </div>
            </section>
            <form className="formulario">
                <div>
                    <label>Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label className="mensaje">Mensaje:</label>
                    <textarea id="mensaje" name="mensaje" required></textarea>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};
export default Contacto;
