import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <div>
      <h2>Vista de Administrador</h2>
      <p>Bienvenido, administrador.</p>

      <Link to="/admin_register">
        <button>Registrar Nuevo Administrador</button>
      </Link>
    </div>
  );
}

export default Admin;
