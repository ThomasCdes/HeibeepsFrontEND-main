import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/Inventario.css';
import Sidebar from '../components/Sidebar';

export default function ProductosResumidos() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.heibeeps.site/products/getall');
        setInventory(response.data.productos);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setIsLoading(false);
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

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredInventory.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        className={currentPage === number ? 'page-item active' : 'page-item'}
      >
        <a className="page-link" onClick={() => setCurrentPage(number)}>
          {number}
        </a>
      </li>
    );
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flexDirection: 'column' }}>
      <Sidebar style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '200px', backgroundColor: '#f0f0f0' }} />
      <p></p>

      <ul className="nav justify-content-end">
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
              <i className="fa-solid fa-bars fa-2xl" style={{ color: 'black' }}></i>
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

      <h1 style={{ fontWeight: 'bold', fontFamily: 'DM Sans' }}>Productos Resumidos</h1>

      <div className="container">
        <div className="row justify-content-start">
          {currentItems.map(item => (
            <div key={item.Producto_ID} className="col-12 col-sm-6 col-md-4 d-flex align-items-center">
              <div className="image-container">
                <img
                  src={item.imagen}
                  alt={item.Nombre}
                  style={{ width: '110px', height: '60px' }}
                  className="img-thumbnail img-fluid"
                />
                <div className="line-border"></div>
              </div>
              <div className="ml-3 w-100">
                <div>
                  <strong className="text-break">{item.Nombre}</strong>
                </div>
                <div>RD$ {item.Precio_neto}</div>
              </div>
            </div>
          ))}
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {renderPageNumbers}
          </ul>
        </nav>
      </div>
    </div>
  );
}
