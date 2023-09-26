import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../components/Sidebar";
import NavBarCategorias from "../components/NavBarCategorias"

export default function CrearCategoria() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [bien, setBien] = useState(false);

  const onSubmit = async (dataP) => {
    const url = `https://api.heibeeps.site/products/createcategories`;
    try {
      const response = await axios.post(url, dataP);
      console.log(dataP);
      console.log(response.data);
      if (response.data) {
        setBien(true);

        toast.success('✅ La categoría se creó correctamente. ', {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {






            toast.error(`Error Creando Una nueva Categoria`, {
position: "bottom-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});

      console.error('Error submitting form:', error);
    }
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#2823bc', // Set the desired background color here
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };








  const generatePDF = () => {








    
  }

  return (
    <>
  
    <Sidebar />
    
<form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
  <div className="card">
    <div className="card-header text-center">
      <h1>CREAR CATEGORÍA</h1>
    </div>
    <div className="card-body">
       <NavBarCategorias />
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre de la categoría</label>
            <input
              type="text"
              className="form-control"
              {...register('nombre', { required: true })}
              placeholder="Nombre de la categoría"
            />
            {errors.nombre && <div className="text-danger">El campo no puede estar vacío</div>}
          </div>
          <button type="submit" className="btn btn-success">Crear Categoría</button>
        </div>
      </div>
    </div>
  </div>
</form>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
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