import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../components/Sidebar";
import NavBarCategorias from '../components/NavBarCategorias';

export default function EliminarCategoria() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.heibeeps.site/products/getcategories');
        setCategories(response.data.categoria);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (dataP) => {
    const url = `https://api.heibeeps.site/products/deletecategories`;
    try {
      const response = await axios.post(url, dataP);
      console.log(dataP);
      console.log(response.data);
      if (response.data) {
        toast.success('✅ La categoría se borró correctamente. ', {
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
      toast.error(`Error borrando la categoría`, {
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
    backgroundColor: '#d9534f', // Color rojo para indicar acción de borrar
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <>     
      <Sidebar />
<form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
  <div className="card">
    <div className="card-header text-center">
      <h1>ELIMINAR CATEGORÍA</h1>
    </div>
    <div className="card-body">
         <NavBarCategorias />
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="mb-3">
     
            <label htmlFor="categoria" className="form-label">Selecciona una categoría</label>
            <select {...register('id', { required: true })} className="form-select">
              {categories.map(category => (
                <option key={category.Categoria_ID} value={category.Categoria_ID}>
                  {category.Nombre}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-danger">Eliminar Categoría</button>
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
