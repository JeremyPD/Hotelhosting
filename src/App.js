import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';
import Admin_Register from './components/Admin_Register';
import Habitacion_Register from './components/Habitacion_Register';
import Home from "./components/Home";
import Login from './components/Login';
import Register from './components/Register';
import Success from './components/Success';

function App() {
  return (
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/success" element={<Success />} />
      <Route path="/admin_register" element={<Admin_Register />} />
      <Route path="/habitacion_register" element={<Habitacion_Register />} />
    </Routes>
  );
}

export default App;