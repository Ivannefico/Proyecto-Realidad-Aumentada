import React from "react";
import styles from "../css/PrivacyPolicy.module.css";


export default function PrivacyPolicy({ title = "Política de Privacidad", showToc = true }) {
return (
<main className={styles.container} aria-labelledby="policy-title">
<article className={styles.card}>
<h1 id="policy-title" className={styles.title}>{title}</h1>


{showToc && (
<nav className={styles.toc} aria-label="Tabla de contenidos">
<strong>Contenido</strong>
<ul>
<li><a href="#intro">1. Introducción</a></li>
<li><a href="#data-collected">2. Datos que recopilamos</a></li>
<li><a href="#use">3. Uso de los datos</a></li>
<li><a href="#sharing">4. Compartir datos</a></li>
<li><a href="#security">5. Seguridad</a></li>
<li><a href="#rights">6. Derechos del usuario</a></li>
<li><a href="#contact">7. Contacto</a></li>
</ul>
</nav>
)}


<section id="intro" className={styles.section}>
<h2>1. Introducción</h2>
<p>
Bienvenido. Esta Política de Privacidad describe cómo recopilamos, usamos y divulgamos
la información cuando usted utiliza nuestros servicios (el "Servicio"). Al usar el
Servicio acepta las prácticas descritas en esta política.
</p>
</section>


<section id="data-collected" className={styles.section}>
<h2>2. Datos que recopilamos</h2>
<ul>
<li><strong>Información que usted proporciona:</strong> nombre, correo electrónico, información de facturación, etc.</li>
<li><strong>Datos de uso:</strong> información sobre cómo utiliza el Servicio (páginas visitadas, tiempos, interacciones).</li>
<li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador y sistema operativo.</li>
</ul>
</section>


<section id="use" className={styles.section}>
<h2>3. Uso de los datos</h2>
<p>Usamos la información para:</p>
<ul>
<li>Proveer, operar y mantener el Servicio.</li>
<li>Mejorar, personalizar y ampliar el Servicio.</li>
<li>Comunicar actualizaciones, soporte y mensajes de seguridad.</li>
<li>Detectar y prevenir fraudes y abusos.</li>
</ul>
</section>


<section id="sharing" className={styles.section}>
<h2>4. Compartir datos</h2>
<p>
No vendemos su información personal. Podemos compartir datos con:
</p>
<ul>
<li>Proveedores de servicios que ayudan a operar el Servicio.</li>
<li>Autoridades legales si lo exige la ley.</li>
<li>En conexión con una fusión, adquisición o venta de activos.</li>
</ul>
</section>


<section id="security" className={styles.section}>
<h2>5. Seguridad</h2>
<p>
Implementamos medidas técnicas y organizativas razonables para proteger la información.
Sin embargo, ningún método de transmisión o almacenamiento electrónico es 100% seguro.
</p>
</section>


<section id="rights" className={styles.section}>
<h2>6. Derechos del usuario</h2>
<p>
Dependiendo de su jurisdicción, puede tener derechos para acceder, corregir, eliminar o
exportar sus datos. Para ejercer estos derechos, contáctenos en la sección de contacto.
</p>
</section>


<section id="contact" className={styles.section}>
<h2>7. Contacto</h2>
<p>
Si tiene preguntas o desea ejercer sus derechos, envíe un correo a: <a href="mailto:privacy@example.com">privacy@example.com</a>
</p>
</section>


<footer className={styles.footer}>
<p>Última actualización: {new Date().toLocaleDateString()}</p>
</footer>
</article>
</main>
);
}