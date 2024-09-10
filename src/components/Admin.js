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

      <Link to="/habitacion_register">
        <button>Crear Habitación</button>
      </Link>

      <Link to="/informes">
        <button>Informes</button>
      </Link>

      <Link to="/scanner">
        <button>Escanear archivo</button>
      </Link>
    </div>
  );
}

export default Admin;
