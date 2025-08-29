import React, {useState}from 'react';
import { Link} from 'react-router-dom';
import "../css/inicio.css";

function navbar(){
    state= {clicked: false};
    handleClick = () => {
    this.setState({clicked: !this.state.clicked})
    }
    render()
    {
        return(
            <>
            <header>
            <nav>
            <h1 className='Logo'>Scanner Cat</h1>
            <div>
              <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
               <li><a className="active" href="indexhtml">Home</a></li>
               <li><a href="indexhtml">Ayuda</a></li>
               <li><a href="indexhtml">Contacto</a></li>
               <li><a href="indexhtml">Nosotros</a></li>
              </ul>
            </div>

            <div id="mobile" onClick={this.handleClick}>
               <i id="bar" className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            </nav>
            </header>  
            </>
        )
    }
}
export default navbar
/*
function navbar() {
const [click, setClick] = useState(false);

const handleClick = () => setClick(!click);
const closeMobileMenu = () => setClick(false);
return (
    <>
    <nav className='navbar'>
        <div className="container">
            <Link to="/" className="navbar-logo">
            Scanner Cat
            </Link>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clink?'fas fa-time': 'fas fa-bars'}/>
            </div>
            <ul className={clink ? 'nav-menu active' : 'nav-menu'}>
                <li className="nav-item">
                    <Link to='/'className='nav-links'onClick={closeMobileMenu}>
                    Inicio
                    </Link>
                </li>
                 <li className="nav-item">
                    <Link to='/ayuda'className='nav-links'onClick={closeMobileMenu}>
                    Ayuda
                    </Link>
                </li>
                 <li className="nav-item">
                    <Link to='/contacto'className='nav-links'onClick={closeMobileMenu}>
                    Contacto
                    </Link>
                </li>
                 <li className="nav-item">
                    <Link to='/sobre-nosotros'className='nav-links'onClick={closeMobileMenu}>
                    Sobre Nosotros
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
    </>
  )
}
*/

