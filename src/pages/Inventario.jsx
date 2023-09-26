import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Inventario() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [alertedProducts, setAlertedProducts] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.heibeeps.site/products/getall');
        setInventory(response.data.productos);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredInventory = inventory.filter(item =>
    item.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredInventory.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getAlerts = () => {
    currentItems.forEach(item => {
      if (item.Cantidad_Disponible < 10 && !alertedProducts.has(item.Producto_ID)) {
        const difference = 10 - item.Cantidad_Disponible;
        toast.error(`Quedan Pocos artículo(s) de ${item.Nombre}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAlertedProducts(prevState => new Set([...prevState, item.Producto_ID]));
      }
    });
  };

  return (
    <div style={{ flexDirection: 'column' }}>
      <Sidebar
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: '200px',
          backgroundColor: '#f0f0f0',
        }}
      />
      <p></p>

      <ul className=" pb nav justify-content-end ">
        <form className="d-flex " role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
        <div className="row">
          <div
            className="col"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1px',
            }}
          >
            <Link to="/inventario">
              <i className="fa-solid fa-bars fa-2xl " style={{ color: 'black' }}></i>
            </Link>
          </div>
          <div
            className="col"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1px',
              marginRight: '10px',
            }}
          >
            <Link to="/productosresumidos">
              <i className="fa-solid fa-border-all fa-2xl" style={{ color: 'black' }}></i>
            </Link>
          </div>
        </div>
      </ul>

      <h1 style={{ fontWeight: 'bold', fontFamily: 'DM Sans' }}>Inventario</h1>
      <Link to="/newarticulo" style={{ textDecoration: 'none' }}>
        <span className='text-end' style={{ fontSize: '1.5rem', color: 'black', fontWeight: 'bold', display: 'block' }}>
          Agregar Articulo
        </span>
        <span className='text-end' style={{ fontSize: '1.5rem', color: 'black', fontWeight: 'bold', display: 'block' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="180" height="36" fill="#2823bc" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
        </span>
      </Link>
      {currentItems.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <>
          <table className="table ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Size</th>
                <th>Color</th>
                <th>Categoria</th>
                <th>Cantidad Disponible</th>
                <th>Precio Neto</th>
                <th>Precio bruto</th>
                <th>EDIT</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map(item => (
                <tr key={item.Producto_ID}>
                  <td>{item.Producto_ID}</td>
                  <td>{item.Nombre}</td>
                  <td>{item.Descripcion}</td>
                  <td>{item.Size}</td>
                  <td>{item.Color}</td>
                  <td>{item.Categoria}</td>
                  <td>{item.Cantidad_Disponible}</td>
                  <td>DOP${item.Precio_neto}</td>
                  <td>DOP${item.Precio_bruto}</td>
                  <td>
                    <Link to={`/editar/${item.Producto_ID}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageClick(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}

      {getAlerts()}
      <ToastContainer />
    </div>
  );
}
