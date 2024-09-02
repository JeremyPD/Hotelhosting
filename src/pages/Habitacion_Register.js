import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

function Habitacion_Register() {
  const [tipo_h, setTipo_h] = useState('');
  const [numero_h, setNumero_h] = useState('');
  const [precio, setPrecio] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [n_camas, setN_camas] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [id_habitacion, setId_habitacion] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabitaciones = async () => {
      const querySnapshot = await getDocs(collection(db, 'Habitaciones'));
      const habitacionesCount = querySnapshot.size;
      const newId = String(habitacionesCount + 1).padStart(3, '0');
      setId_habitacion(newId);
    };

    fetchHabitaciones();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'Habitaciones'), {
        tipo_h,
        numero_h,
        precio,
        capacidad,
        n_camas,
        descripcion,
        id_habitacion,
        estado: 'vacío',
      });

      navigate('/admin');
    } catch (error) {
      setError('Error al registrar habitación: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Registrar Nueva Habitación</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Tipo de Habitación"
          value={tipo_h}
          onChange={(e) => setTipo_h(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número de Habitación"
          value={numero_h}
          onChange={(e) => setNumero_h(e.target.value)}
        />
        <input
          type="text"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Capacidad"
          value={capacidad}
          onChange={(e) => setCapacidad(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número de Camas"
          value={n_camas}
          onChange={(e) => setN_camas(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID de Habitación"
          value={id_habitacion}
          readOnly
        />
        <button type="submit">Registrar Habitación</button>
      </form>
    </div>
  );
}

export default Habitacion_Register;
