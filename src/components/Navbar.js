import React from 'react';
import { Link, navigate } from 'gatsby';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/">
          <img src="https://picsum.photos/81/81" alt="logo" />
        </Link>
        <Link to="/sobre-nosotros">Sobre nosotros</Link>
        <Link to="/aliados">Aliados</Link>
        <Link to="/eventos">Eventos</Link>
        <Link to="/formar-parte">Forma parte</Link>
        <button onClick={() => navigate('/contacto')}>Contáctanos</button>
      </div>
    </nav>
  )
}

export default Navbar