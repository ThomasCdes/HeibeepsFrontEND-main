import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../components/Sidebar";
import NavBarCategorias from "../components/NavBarCategorias";

export default function ActulizarCategoria() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [bien, setBien] = useState(false);
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
    const url = `https://api.heibeeps.site/products/editcategories`;
    try {
      const response = await axios.post(url, dataP);
      console.log(dataP);
      console.log(response.data);
      if (response.data) {
        setBien(true);

        toast.success('✅ La categoría se actualizó correctamente. ', {
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
      toast.error(`Error actualizando la categoría`, {
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
    backgroundColor: '#2823bc',
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
      <h1>ACTUALIZAR CATEGORÍA</h1>
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
          <div className="mb-3">
            <label htmlFor="nuevoNombre" className="form-label">Nuevo nombre de categoría</label>
            <input
              type="text"
              className="form-control"
              {...register('Nombre', { required: true })}
              placeholder="Nuevo nombre de categoría"
            />
            {errors.Nombre && <div className="text-danger">El campo no puede estar vacío</div>}
          </div>
          <button type="submit" className="btn btn-primary">Actualizar Categoría</button>
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
