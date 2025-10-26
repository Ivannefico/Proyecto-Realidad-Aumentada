import React from "react";
import contacto_css from "../css/Contacto.module.css";

const Contacto = () => {
    return (
        <div className={contacto_css.contacto_container}>
            <h2 className={contacto_css.title}>Contacto</h2>
            <section className={contacto_css.info}>
                <h3 className={contacto_css.subtitle}>Quienes somos:</h3>
                <div className={contacto_css.descripcion}>
                    <p className={contacto_css.p}>Joaquin Carrasco y Ezequiel Salazar: Desarrolladores Backend</p>
                    <p className={contacto_css.p}>Ivan Moreno y Facundo Barros: Desarrolladores Frontend</p>
                    <p className={contacto_css.p}>Sofia Araya y Juan Ferreyra: Diseñadores</p>
                    <p className={contacto_css.p}>Fiorella Gazzola Grenier: Documentadora</p>
                    <p className={contacto_css.p}>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                    <p className={contacto_css.p}>Somos un equipo de profesionales listos para ayudarte.</p>
                    <div className={contacto_css.ul}>
                    <ul>
                        <h3 className={contacto_css.subtitle}>Nuestros datos de contacto:</h3>
                        <li className={contacto_css.li}>Email: <b>scanner.cat@gmail.com</b></li>
                        <li className={contacto_css.li}>Teléfono: <b>+123456789</b></li>
                    </ul>
                    </div>
                </div>
            </section>
            <form className={contacto_css.formulario}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label className={contacto_css.mensaje}>Mensaje:</label>
                    <textarea id="mensaje" name="mensaje" required></textarea>
                </div>
                <button type="submit" className={contacto_css.button}>Enviar</button>
            </form>
        </div>
    );
};
export default Contacto;
