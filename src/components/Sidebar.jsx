import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../img/logo.png";
import '../CSS/SideBar.css';

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState(Array(4).fill(false));

  const linkStyles = {
    textDecoration: 'none',
    display: 'block',
    padding: '10px',
    borderRadius: '9px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  const activeLinkStyles = {
    backgroundColor: '#2823bc',
    color: 'white',
  };

  const buttonStyles = {
    backgroundColor: '#2823bc',
    color: 'white',
  };

  const handleMouseEnter = (index) => {
    const newActiveLink = Array(4).fill(false);
    newActiveLink[index] = true;
    setActiveLink(newActiveLink);
  };

  const handleMouseLeave = () => {
    setActiveLink(Array(4).fill(false));
  };

  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
        style={buttonStyles}
      >
        <i className="fas fa-bars"></i>
      </button>

      <div
        className="offcanvas offcanvas-start custom-sidebar"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ width: '225px' }}
      >
        <div className="offcanvas-header">
          <div className="sidebar-logo">
            <img className='img-fluid' src={logo} alt="" />
          </div>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <Link
              to="/dashboard"
              style={{ ...linkStyles, ...(activeLink[0] ? activeLinkStyles : {}) }}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fas fa-tachometer-alt color"></i>
              <span className='fs-4 color'>Dashboard</span>
            </Link>
            <Link
              to="/facturar"
              style={{ ...linkStyles, ...(activeLink[1] ? activeLinkStyles : {}) }}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fas fa-file-invoice color"></i>
              <span className='fs-4 color'> Facturar</span>
            </Link>
            <Link
              to="/inventario"
              style={{ ...linkStyles, ...(activeLink[2] ? activeLinkStyles : {}) }}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fas fa-box-open color"></i>
              <span className='fs-4 color'> Inventario</span>
            </Link>
            <Link
              to="/reporteria"
              style={{ ...linkStyles, ...(activeLink[3] ? activeLinkStyles : {}) }}
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
            >
              <i className="fas fa-chart-line color"></i>
              <span className='fs-4 color'> Reporteria </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}