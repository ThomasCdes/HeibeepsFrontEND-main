import React from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const año = fecha.getFullYear();
  const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año}`;

  const [invoiceConfirmed, setInvoiceConfirmed] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [factura, setFactura] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const { register, handleSubmit, reset } = useForm();

  const roundToTwo = (num) => {
    return +(Math.round(num + 'e+2') + 'e-2');
  };

  const getSubTotal = () => {
    return roundToTwo(selectedProducts.reduce((total, producto) => total + producto.Precio_bruto * producto.cantidad, 0));
  };

  const getTotalDiscount = () => {
    return roundToTwo(
      selectedProducts.reduce((total, producto) => total + (producto.Precio_bruto * producto.cantidad * (producto.descuento / 100)), 0)
    );
  };

  const getTotal = () => {
    return roundToTwo(getSubTotal() - getTotalDiscount());
  };

const generatePDF = async () => {
  try {
    const requestData = { idFacturas: factura };
    const response = await axios({
      method: 'post',
      url: 'https://api.heibeeps.site/facturas/generatepdf',
      data: requestData,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Factura_${factura}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Recargar la página después de descargar el PDF
    window.location.reload();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
  const onSubmit = async (data1) => {
    const payload = {
      nombreCliente: data1.cliente,
      fecha: fechaFormateada,
      idProductos: selectedProducts.map((producto) => producto.Producto_ID).join(','),
      productos: selectedProducts.map((producto) => producto.Nombre).join(','),
      sizes: selectedProducts.map((producto) => producto.Size).join(','),
      color: selectedProducts.map((producto) => producto.Color).join(','),
      cantidades: selectedProducts.map((producto) => producto.cantidad).join(','),
      subtotal: getSubTotal(),
      totalDescuento: getTotalDiscount(),
      total: getTotal(),
      precioNeto: selectedProducts.map((producto) => producto.Precio_bruto).join(','),
      metodoPago: paymentMethod,
      tipoBanco: selectedBank,
      notas: data1.notas,
      correoElectronico: data1.correoEletronico,
      Direccion: data1.Direccion,
    };

    try {
      const postResponse = await axios.post('https://api.heibeeps.site/facturas/createfacturas', payload);
      setInvoiceConfirmed(true);
      if (postResponse.data) {
        toast.success('Factura Creada Correctamente', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });

        reset();
        setSelectedProducts([]);
        setPaymentMethod('');
        setSelectedBank('');
      } else if (postResponse.data.status == 400) {
        console.log(postResponse.data.status);
      }
    } catch (error) {
      toast.error(`Error al crear la Factura ${factura}`, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      console.error('Error enviando los datos:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.heibeeps.site/products/getall');
        setInventory(response.data.productos);
        const invoice = await axios.get('https://api.heibeeps.site/facturas/getlastinvoice');
        setFactura(invoice.data.facturas[0].idFacturas + 1);
      } catch (error) {
        console.error('Error de api:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Sidebar />
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <h1 className="text-center my-4" style={{ fontWeight: 'bold', fontFamily: 'DM Sans' }}>
          Facturar
        </h1>
        <div className="row">
          <div className="col-md-6 form-group">
            <div>
              <label>Número de factura</label>
              <span className="fw-bold"> HB{factura}</span>
            </div>
            <div className="mt-3">
              <label>Fecha</label>
              <span className="fw-bold"> {fechaFormateada}</span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cliente
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del cliente"
              aria-label="Username"
              aria-describedby="basic-addon1"
              {...register('cliente')}
            />
            <span className="input-group-text" id="basic-addon2">
              Número
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Número del cliente"
              aria-label="Server"
              aria-describedby="basic-addon2"
              {...register('numero')}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Correo Eletronico
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Correo del cliente"
              aria-label="Username"
              aria-describedby="basic-addon1"
              {...register('correoEletronico')}
            />
            <span className="input-group-text" id="basic-addon2">
              Direccion
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Direccion del cliente"
              aria-label="Server"
              aria-describedby="basic-addon2"
              {...register('Direccion')}
            />
          </div>

          <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Trasferencia</option>
          </select>
          {paymentMethod === 'transferencia' && (
            <select className="form-select" value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
              <option value="Popular">Popular</option>
              <option value="BHD">BHD</option>
              <option value="Banreservas">Banreservas</option>
              <option value="Otro">Otro</option>
            </select>
          )}
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              rows="4"
              cols="50"
              {...register('notas')}
            ></textarea>
            <label htmlFor="floatingTextarea">Notas</label>
          </div>
        </div>
        <div className="form-group">
          <label>Producto</label>
          <Select
            options={inventory.map((producto) => ({
              value: producto.Producto_ID,
              label: `${producto.Nombre}: Size: ${producto.Size} - Color: ${producto.Color},Precio:$ ${producto.Precio_bruto}`,
              producto,
            }))}
            noOptionsMessage={() => 'No Hay articulos con ese nombre'}
            className="mb-3"
            onChange={(option) => {
              setSelectedProducts([...selectedProducts, { ...option.producto, cantidad: 1, descuento: 0 }]);
            }}
          />
        </div>
        <div className="form-group">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Size</th>
                <th scope="col">Color</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Descuento (%)</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.Nombre}</td>
                  <td>{producto.Size}</td>
                  <td>{producto.Color}</td>
                  <td className="fw-bold">{producto.Precio_bruto}</td>
                  <td>
                    <input
                      className="input-group-text"
                      type="number"
                      min="1"
                      value={producto.cantidad}
                      onChange={(e) => {
                        const newSelectedProducts = [...selectedProducts];
                        newSelectedProducts[index].cantidad = parseInt(e.target.value);
                        setSelectedProducts(newSelectedProducts);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      className="input-group-text"
                      type="number"
                      min="0"
                      max="100"
                      value={producto.descuento}
                      onChange={(e) => {
                        const newSelectedProducts = [...selectedProducts];
                        newSelectedProducts[index].descuento = parseInt(e.target.value);
                        setSelectedProducts(newSelectedProducts);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        const newSelectedProducts = [...selectedProducts];
                        newSelectedProducts.splice(index, 1);
                        setSelectedProducts(newSelectedProducts);
                      }}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end">
            <h5 className="fw-bold">Subtotal: ${getSubTotal()}</h5>
            <h5 className="text-danger fw-bold">Descuento: ${getTotalDiscount()}</h5>
            <h5 className="fw-bold text-success">Total: ${getTotal()}</h5>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <button type="submit" className="btn btn-success mt-3 w-100">
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {invoiceConfirmed && (
        <div className="container mt-3">
          <button onClick={generatePDF} className="btn btn-danger">
            <i className="fas fa-file-pdf"></i> Descargar Factura
          </button>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
