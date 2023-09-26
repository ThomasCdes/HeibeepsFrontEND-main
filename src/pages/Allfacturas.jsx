import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
// soy un loco?
export default function Allfacturas() {
  const [Facturas, setFacturas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFactura, setSelectedFactura] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const facturasPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://api.heibeeps.site/facturas/getallfacturas');
        setFacturas(response.data.facturas);
        setIsLoading(false);
      } catch (error) {
        console.error('Error Mangado de la factura:', error);
        setIsLoading(false);
      }
    };

    fetchData();

    if (selectedFactura !== null) {
      generatePDF(selectedFactura);
      setSelectedFactura(null);
    }
  }, [selectedFactura]);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const generatePDF = async facturaId => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.heibeeps.site/facturas/downloadpdf',
        data: { idFacturas: facturaId },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Factura_${facturaId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const createNewFactura = async () => {
    try {
      const response = await axios.post('https://api.heibeeps.site/facturas/createfactura');
      const newFacturaId = response.data.idFactura;
      setFacturas(prevFacturas => [...prevFacturas, { idFacturas: newFacturaId }]);
    } catch (error) {
      console.error('Error creating factura:', error);
    }
  };

  const filteredFacturas = Facturas.filter(factura =>
    factura.NombreCliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastFacturaIndex = currentPage * facturasPerPage;
  const firstFacturaIndex = lastFacturaIndex - facturasPerPage;
  const currentFacturas = filteredFacturas.slice(firstFacturaIndex, lastFacturaIndex);

  const totalPages = Math.ceil(filteredFacturas.length / facturasPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ flexDirection: 'column' }}>
      <Sidebar />
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          <ul className="nav justify-content-end">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </form>
          </ul>

          <h1 style={{ fontWeight: 'bold', fontFamily: 'DM Sans' }}>Facturas Emitidas</h1>

          <Link to="/crearfactura">
            <button className='btn btn-success mb-3' onClick={createNewFactura}>Emitir Factura</button>
          </Link>

          <table className="table">
            <thead>
              <tr>
                <th># Factura</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Importe</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentFacturas.map((factura, index) => (
                <tr key={index}>
                  <td>{factura.idFacturas}</td>
                  <td>{factura.NombreCliente}</td>
                  <td>{factura.Fecha}</td>
                  <td>RD${factura.Total}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => generatePDF(factura.idFacturas)}
                    >
                      <i className="fas fa-file-pdf"></i> Descargar
                    </button>
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
    </div>
  );
}
