import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';

function Admin_Register() {
  const [dni, setDni] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMINISTRADOR'); // Rol predefinido como ADMINISTRADOR
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Crear un nuevo usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar los datos en la colección "Admin" en Firestore
      await addDoc(collection(db, 'Admin'), {
        DNI: dni,
        nombre: name,
        correo: email,
        contraseña: password, // Recuerda: nunca guardes contraseñas en texto plano en producción
        rol: role,
      });

      navigate('/admin'); // Redirigir a la vista de Admin después de registrar un nuevo admin
    } catch (error) {
      setError('Error al registrar: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Registrar Nuevo Administrador</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar Administrador</button>
      </form>
    </div>
  );
}

export default Admin_Register;
