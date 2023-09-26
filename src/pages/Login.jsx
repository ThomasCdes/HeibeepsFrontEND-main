import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://api.heibeeps.site/login/getuser", data);
      console.log(response.data);
      if (response.data) {
        navigate('/dashboard');
      } else {
        setLogin("Usuario o Contraseña incorrecta");
        console.log(login);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="row">
        <div className="col-md-8">
          <img
            className="img-fluid"
            src="https://photoinventario.nyc3.digitaloceanspaces.com/imgLogin%20(1).svg"
            alt="Logo"
          />
        </div>
        <div className="col-md-4">
          <div className="card shadow" style={{
            "padding-bottom": "13rem", "color": "#FF7C82"
          }}>
            <div className="card-body">
              <img src="https://photoinventario.nyc3.digitaloceanspaces.com/LOGO%20HEIDY.svg" alt="Logo Heidy" />
              <h2 className="text-center mb-5">¡Bienvenido de nuevo!</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    {...register('usuario', { required: true })}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">
                      El campo no puede estar vacío
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="pass" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    {...register('pass', { required: true })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      El campo no puede estar vacío
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <input type="submit" className="btn btn-primary container" style={{
                    backgroundColor: '#4318FF'
                  }} />
                  <p className='text-danger fw-bold'>{login}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
