import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { Link } from "react-router-dom";
import Sidebar from '../components/Sidebar';
//
export default function App() {
  const [facturas, setFacturas] = useState([]);
  const [gananciasTotales, setGananciasTotales] = useState("00000");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ventasDiariasResponse = await axios.get('https://api.heibeeps.site/dashboard/getventasdiarias');
        setGananciasTotales(ventasDiariasResponse.data.facturas[0].totalVendido);
        setChartData(ventasDiariasResponse.data.facturas.map(factura => ({
          fecha: factura.fecha.split('T')[0],
          totalVendido: factura.totalVendido
        })));
console.log(chartData)
        const facturasResponse = await axios.get('https://api.heibeeps.site/dashboard/getlastinvoice');
        setFacturas(facturasResponse.data.facturas);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Dashboard</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="fas fa-chart-line mr-2"></i>
                  Ganancias Hoy
                </h5>
                <h1>RD${gananciasTotales}</h1>

              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Ultimas 5 Facturas</h5>
                {facturas.map(factura => (
                  <div key={factura.idFacturas}>
                    <p>RD${factura.Total} - {factura.fecha_creacion_formato.split(' ')[1]} {factura.fecha_creacion_formato.split(' ')[2] } <p className='fw-bold'>({factura.MetodoPago})</p> 
                    </p>
                  </div>
                ))}
                <Link to="/facturar" className="btn btn-link">
                  Todas las Facturas <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="card mt-4">
              <div className="card-body d-flex align-items-center">
                <div className="rounded-circle bg-primary text-white mr-3" style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  H
                </div>
                <div>
                  <h5 className="mb-0 mb-2 ms-2">HEIBEEPS</h5>
                  <small className='ms-2'>Administrador</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            {/* Gráfico de Barras */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Ventas por Fecha</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalVendido" fill="#8884d8" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico de Líneas */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Tendencia de Ventas</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="totalVendido" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
{/* Gráfico de Líneas */}
      
            {/* <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Distribución de Ventas</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="totalVendido"
                      nameKey="fecha"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
