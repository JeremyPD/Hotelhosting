import React from 'react';
import '../styles/success_styles.css';

function Success() {
  return (
    <div className="success-container">
      <h2 className="success-title">Inicio de sesión exitoso</h2>
      <p className="success-message">
        Bienvenido, has iniciado sesión correctamente.
      </p>
    </div>
  );
}

export default Success;
