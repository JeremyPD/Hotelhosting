import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin.js';
import Admin_Register from './components/Admin_Register.js';
import Habitacion_Register from './components/Habitacion_Register.js';
import Home from './components/Home.js';
import Informes from './components/Informes.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Scanner from './components/Scanner.js';
import Success from './components/Success.js';

function App() {
  return (
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/informes" element={<Informes />} />
      <Route path="/success" element={<Success />} />
      <Route path="/scanner" element={< Scanner />} />
      <Route path="/admin_register" element={<Admin_Register />} />
      <Route path="/habitacion_register" element={<Habitacion_Register />} />
    </Routes>
  );
}

export default App;