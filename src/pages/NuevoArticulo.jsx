import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Formulario() {
  const [image, setImage] = useState(null);
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.heibeeps.site/products/getcategories");
        setOpciones(response.data.categoria);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (dataP) => {
    const url = "https://api.heibeeps.site/products/createproduct";
    try {
      const formData = new FormData();

      for (const key in dataP) {
        formData.append(key, dataP[key]);
      }

      if (image) {
        formData.append("imagen", image);
      }

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      if(response.data){
        toast.success(`Producto Creado Corectamente` , {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
            toast.error(`Error Subiendo un nuevo Articulo`, {
position: "bottom-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});

      console.error("Error submitting form:", error);
    }
  };

  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <>
      <div className="dropdown bg-secondary d-flex justify-content-center align-items-center">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Categorias
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link to="/crearcategoria">
              <span className="dropdown-item">Crear Categoría</span>
            </Link>
          </li>
          <li>
            <Link to="/editarcategoria">
              <span className="dropdown-item">Editar Categoría</span>
            </Link>
          </li>
          <li>
            <Link to="/eliminarcategoria">
              <span className="dropdown-item">Eliminar Categoría</span>
            </Link>
          </li>
        </ul>
      </div>

      <Sidebar />

      <div className="container fs-1 text-bold text-center fw-bold">
        SUBIR ARTICULO
      </div>

      <div style={{ marginLeft: '110px', padding: '20px', marginRight: '0px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'white', borderRadius: '10px', padding: '10px', margin: '0 auto', width: '80%'}}>
            <div className="container">
              <div className="row">
                <div className="col">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" {...register("nombre")} />
                </div>
                <div className="col">
                  <label className="form-label">Cantidad Disponible</label>
                  <input type="number" className="form-control" {...register("cantidad_Disponible")} />
                </div>
              </div>
              <div className="row">
                <div className="">
                  <label htmlFor="floatingTextarea2">Descipcion</label>
                  <textarea className="form-control" id="floatingTextarea2" rows="6" {...register("descripcion")}/>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label className="form-label">
                    <span className="text-danger fw-bold">Precio Bruto</span> 
                  </label>
                  <input type="number" className="form-control" {...register("precio_bruto")} />
                </div>
                <div className="col">
                  <label className="form-label">
                    <span className="text-success fw-bold">Precio Neto</span> 
                  </label>
                  <input type="number" className="form-control" {...register("precio")} />
                </div>
                <div className="col">
                  <select className="form-select" {...register("categoria")}>
                    <option value="">Categoria</option>
                    {opciones.map((opcion) => (
                      <option key={opcion.Categoria_ID} value={opcion.Categoria_ID}>
                        {opcion.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col">
                  <label className="form-label">
                    <span className="">Color</span> 
                  </label>
                  <input type="text" className="form-control" {...register("color")} />
                </div>
                <div className="col">
                  <label className="form-label">
                    <span className="">Size</span> 
                  </label>
                  <input type="text" className="form-control" {...register("size")} />
                </div>
              </div>
              <label className="form-label">Imagen</label>
              <div className="input-group">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="myImage" className="form-label">Upload Image</label>
                        <input className="form-control" type="file" id="myImage" {...register("imagen")} onChange={onImageChange} accept="image/*" />
                      </div>
                      <div className="d-flex justify-content-center">
                        {image && <img src={URL.createObjectURL(image)} className="img-fluid rounded"  alt="" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-grid pt-3">
                {/* Estilos en línea para el botón Subir */}
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Subir"
                  style={{ backgroundColor: "#2823bc", color: "#ffffff" }}
                />
              </div>
            </div>
          </div>
        </form>
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
          theme="colored"
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



      </div> 
    </>
  );
}