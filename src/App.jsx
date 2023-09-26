import {  Routes, Route } from "react-router-dom";
import { useEffect,useState } from "react";
import Dashboard from "./pages/Dashboard";
import Facturar from "./pages/Facturar";
import Inventario from "./pages/Inventario";

import NuevoArticulo from "./pages/NuevoArticulo";
import './CSS/App.css'
import DeleteandPut from "./pages/DeleteandPut";
import NotFoud from "./components/NotFoud";
import Reporteria from "./pages/Reporteria";
import CrearCategoria from "./pages/CrearCategoria";
import ProductosResumidos from "./pages/ProductosResumidos";
import Allfacturas from "./pages/Allfacturas";
import ActulizarCategoria from "./pages/ActualizarCategoria";
import EliminarCategoria from "./pages/EliminarCategoria";
import Login from "./pages/Login";
function App() {




  return (
    <>
   <Routes>
    {/*!ESTO SON LAS RUTAS DE CADA PARTE DE LA PAGINA*/}
    <Route path="/A" element={<div>hola</div>}/>
     <Route path="/dashboard" element={<Dashboard/>}/>
     <Route path="/facturar" element={<Allfacturas/>}/>
     <Route path="/inventario" element={<Inventario/>}/>
    <Route path="/reporteria" element={<Reporteria/>}/>
     <Route path="/newarticulo" element={<NuevoArticulo/>}/>
     <Route path="/editar/:id" element={<DeleteandPut  />}/>
     <Route path="/crearcategoria" element={<CrearCategoria/>}/>
     <Route path="/productosresumidos" element={<ProductosResumidos/>}/>
     <Route path="/crearfactura" element={<Facturar/>}/>
     <Route path="/editarcategoria" element={<ActulizarCategoria/>}/>
     <Route path="/eliminarcategoria" element={<EliminarCategoria/>}/>
    <Route path="/" element={<Login/>}/>
     <Route path="*" element={<NotFoud/>}/>
   </Routes>
    </>
  )
}

export default App
