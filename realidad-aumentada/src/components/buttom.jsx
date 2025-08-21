import React, { Children } from "react";
import {Link} from 'react-router-dom';


const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const buttom = ({
children, type, onClick,buttonStyle, buttomSize
}) => {
    const checkbuttonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkbuttonSize= SIZES.includes(buttomSize) ? buttomSize : SIZES[0];

    return(
        <Link to='/camara' classname='btn-mobile'>
            <buttom classname={'btn ${checkbuttonStyle} ${checkbuttonSize}'} onClick={onclick} type={type}>
                
                {children}
            </buttom>
        </Link>
    )
}