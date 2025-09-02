import React from 'react';
import { useNavigate } from "react-router-dom";


const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Página No Encontrada</h1>
            <p>Lo sentimos, la página que buscas no existe.</p>
        </div>
    );
}
export default NotFound;