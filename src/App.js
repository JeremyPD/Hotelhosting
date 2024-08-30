import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Admin_Register from './pages/Admin_Register';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import Success from './pages/Success';

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
    </Routes>
  );
}

export default App;