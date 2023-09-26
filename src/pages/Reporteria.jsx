import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

export default function Reporteria() {
    const { register, handleSubmit } = useForm();
const onSubmit = async (data) => {
    console.log(data);

    // Construir la URL según la opción seleccionada en el dropdown "Intervalo"
    const url = `https://api.heibeeps.site/reporteria/${data.intervalo}`;

    try {
        const response = await axios({
            method: 'post',
            url: url,
            responseType: 'blob' // Indica que la respuesta debe ser tratada como un blob
        });

        // Crear un blob a partir de la respuesta
        const blob = new Blob([response.data], { type: 'application/xml' });

        // Crear un enlace temporal para la descarga
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `reporte_${data.intervalo}.xlsx`); // Nombre del archivo a descargar
        document.body.appendChild(link);
        link.click();
        link.remove();

    } catch (error) {
        console.error('Error al generar el reporte:', error);
    }
};
    return (
        <>
            <Sidebar />
            
            <div className="container ">
               <h1 style={{ fontWeight: 'bold', fontFamily: 'DM Sans' }}>Reporteria</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="form-group">
                                <label><i className="fas fa-calendar-alt  ">
                                    </i > <span className='ms-1'>Intervalo:</span></label>
                                <select className="form-control" {...register("intervalo")}>
                                    <option value="generarsemanales">Semanal</option>
                                    <option value="generarxml">Mensual</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="col-md-3">
                            <div className="form-group">
                                <label><i className="fas fa-file-alt mr-2"></i>
                                 <span className='ms-1'>Formato:</span></label>
                                <select className="form-control " {...register("formato")}>
                                    <option value="excel">Excel </option>
                                   <option className="dropdown-item disabled" value="pdf" disabled>PDF</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mt-4">
                                <button type="submit" className="btn btn-success">Generar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
