import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
//TEST
export default function DeleteandPut() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [producto, setProducto] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://api.heibeeps.site/products/getbyid', {
          producto_ID: id
        });
        setProducto(response.data.productos[0]);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: value,
    }));
  };

  const onSubmit = async (dataP) => {
    
    try {
         const payload = {
"producto_ID": id,
  "nombre": dataP.nombre ? dataP.nombre : producto.Nombre,
  "descripcion": dataP.descripcion ?  dataP.descripcion : producto.Descripcion ,
  "size": dataP.size ? dataP.size : producto.Size,
  "color": dataP.color ?   dataP.color : producto.Color,

  "cantidad_Disponible": dataP.cantidad_Disponible ? dataP.cantidad_Disponible : producto.Cantidad_Disponible,
  "precio": dataP.precio ? dataP.precio : producto.Precio_neto,
  "precio_bruto": dataP.precio_bruto ? dataP.precio_bruto : producto.Precio_bruto,




      
    }
      const response = await axios.post('https://api.heibeeps.site/products/updateproduct',
       payload );
       console.log(dataP);
           navigate('/inventario');
      if (response.data) {
        toast.success('✅ El producto se actualizó correctamente.', {
          position: "bottom-center",
          autoClose: 5000,
        });
        navigate('/inventario');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
 
  };

  const handleEliminar = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post('https://api.heibeeps.site/products/deleteproduct', {
          producto_ID: id
        });
        if (response.data) {
          Swal.fire('Borrado!', `El artículo ${producto.Nombre} se ha borrado correctamente`, 'success');
          navigate('/inventario');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    
      <div className="container">
      <Sidebar />

      <div className="container fs-1 text-bold text-center fw-bold">
        EDITAR O BORRAR ARTICULO
      </div>
      <div style={{ marginLeft: '110px', padding: '20px', marginRight: '0px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', borderRadius: '10px', padding: '10px', margin: '0 auto', width: '80%'}}>
            <div className="container">
              {/* Nombre */}
              <div className="mb-3">
                <label htmlFor="nombreInput" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreInput"
                  name="Nombre"
              
                  {...register("nombre")}
                />
                <input
                  type="text"
                  className="form-control text-muted mt-2 fw-bold"
                  value={producto.Nombre || ''}
                  readOnly
                />
              </div>

              {/* Descripción */}
              <div className="mb-3">
                <label htmlFor="descripcionInput" className="form-label">
                  Descripción
                </label>
                <textarea
                  className="form-control"
                  id="descripcionInput"
                  name="Descripcion"
                  rows="4"
                
                  {...register("descripcion")}
                />
                <textarea
                  className="form-control text-muted mt-2 fw-bold"
                  rows="4"
                  value={producto.Descripcion || ''}
                  readOnly
                />
              </div>

              <div className="row">
                {/* Size */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="sizeInput" className="form-label">
                    Size
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="sizeInput"
                    name="Size"
                 
                    {...register("size")}
                  />
                  <input
                    type="text"
                    className="form-control text-muted mt-2 fw-bold"
                    value={producto.Size || ''}
                    readOnly
                  />
                </div>

                {/* Color */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="colorInput" className="form-label">
                    Color
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="colorInput"
                    name="Color"
            
                    {...register("color")}
                  />
                  <input
                    type="text"
                    className="form-control text-muted mt-2 fw-bold"
                    value={producto.Color || ''}
                    readOnly
                  />
                </div>
              </div>

              <div className="row">
                {/* Precio Neto */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="precioNetoInput" className="form-label">
                    Precio Neto
                  </label>
                  <input
                  min="1"
                    type="number"
                    className="form-control"
                    id="precioNetoInput"
                    name="Precio_neto"
                  
                    {...register("precioNeto")}
                  />
                  <input
                    type="number" 
                    className="form-control text-muted mt-2 fw-bold"
                    value={producto.Precio_neto || ''}
                    readOnly
                  />
                </div>

                {/* Precio Bruto */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="precioBrutoInput" className="form-label">
                    Precio Bruto
                  </label>
                  <input
                  min="1"
                    type="number"
                    className="form-control"
                    id="precioBrutoInput"
                    name="Precio_bruto"
                 
                    {...register("precioBruto")}
                  />
                  <input
                    type="number"
                    className="form-control text-muted mt-2 fw-bold"
                    value={producto.Precio_bruto || ''}
                    readOnly
                  />
                </div>
              </div>

              {/* Cantidad Disponible */}
              <div className="mb-3">
                <label htmlFor="cantidadInput" className="form-label">
                  Cantidad Disponible
                </label>
                <input
                min="1"
                  type="number"
                  className="form-control"
                  id="cantidadInput"
            
              
                  {...register("cantidad_Disponible")}
                />
                <input
                  type="number"
                  className="form-control text-muted mt-2 fw-bold"
                  value={producto.Cantidad_Disponible || ''}
                  readOnly
                />
              </div>

              <div className="row">
                <div className="col">
                  <input type="submit" className="btn btn-primary w-100" value="Actualizar" />
                </div>
                <div className="col">
                  <button type="button" className="btn btn-danger w-100" onClick={handleEliminar}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}