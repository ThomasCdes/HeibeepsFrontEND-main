import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/crearcategoria" className="nav-link">
                Crear Categoría
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/editarcategoria" className="nav-link">
               Actualizar Categoría
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/eliminarcategoria" className="nav-link">
                Eliminar Categoría
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
