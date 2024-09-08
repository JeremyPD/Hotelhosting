import { collection, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebase.js'; // Asegúrate de incluir la extensión .js

function Informes() {
  const [usuarios, setUsuarios] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [administradores, setAdministradores] = useState([]); // Nuevo estado para administradores
  const [loading, setLoading] = useState(false);  // Estado de carga
  const [error, setError] = useState(null);      // Estado de error
  const [mostrar, setMostrar] = useState("");    // Para controlar qué datos mostrar
  const [searchTerm, setSearchTerm] = useState(""); // Para el valor del buscador

  // Función para obtener los datos de Firestore
  const obtenerDatos = async (tipo) => {
    setLoading(true);
    setError(null);  // Reinicia el estado de error
    setMostrar(tipo); // Establece qué datos mostrar: 'usuarios', 'habitaciones' o 'administradores'

    try {
      if (tipo === 'usuarios') {
        console.log("Intentando obtener usuarios...");
        const usuariosCollection = collection(db, 'Usuario'); // Cambiado a 'Usuario'
        const usuariosSnapshot = await getDocs(usuariosCollection);
        const usuariosList = usuariosSnapshot.docs.map(doc => {
          console.log("Documento obtenido:", doc.data()); // Verificación individual de documentos
          return { id: doc.id, ...doc.data() };
        });
        console.log('Usuarios obtenidos:', usuariosList); // Depuración para ver los usuarios
        setUsuarios(usuariosList);
      } else if (tipo === 'habitaciones') {
        console.log("Intentando obtener habitaciones...");
        const habitacionesCollection = collection(db, 'Habitaciones');
        const habitacionesSnapshot = await getDocs(habitacionesCollection);
        const habitacionesList = habitacionesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Habitaciones obtenidas:', habitacionesList); // Depuración para ver las habitaciones
        setHabitaciones(habitacionesList);
      } else if (tipo === 'administradores') { // Nueva opción para administradores
        console.log("Intentando obtener administradores...");
        const administradoresCollection = collection(db, 'Admin'); // Cambiado a 'Admin'
        const administradoresSnapshot = await getDocs(administradoresCollection);
        const administradoresList = administradoresSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Administradores obtenidos:', administradoresList); // Depuración para ver los administradores
        setAdministradores(administradoresList);
      }
    } catch (error) {
      setError("Hubo un error al obtener los datos.");
      console.error("Error al obtener los datos: ", error);
    } finally {
      setLoading(false); // Detener el estado de carga
    }
  };

  // Filtrar los usuarios en base al término de búsqueda
  const usuariosFiltrados = usuarios.filter((usuario) =>
    Object.values(usuario).some((valor) =>
      valor && valor.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Filtrar las habitaciones en base al término de búsqueda
  const habitacionesFiltradas = habitaciones.filter((habitacion) =>
    Object.values(habitacion).some((valor) =>
      valor && valor.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Filtrar los administradores en base al término de búsqueda
  const administradoresFiltrados = administradores.filter((admin) =>
    Object.values(admin).some((valor) =>
      valor && valor.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <h2>Informes</h2>
      
      {/* Botones para seleccionar qué mostrar */}
      <button onClick={() => obtenerDatos('usuarios')}>Ver Usuarios</button>
      <button onClick={() => obtenerDatos('habitaciones')}>Ver Habitaciones</button>
      <button onClick={() => obtenerDatos('administradores')}>Ver Administradores</button> {/* Nuevo botón */}
      
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: "20px 0", padding: "10px", width: "300px" }}
      />

      {/* Estado de carga */}
      {loading && <p>Cargando datos...</p>}
      {/* Estado de error */}
      {error && <p>{error}</p>}

      {/* Mostrar los usuarios filtrados */}
      {mostrar === 'usuarios' && usuariosFiltrados.length > 0 && (
        <div>
          <h3>Usuarios Registrados</h3>
          <ul>
            {usuariosFiltrados.map((usuario) => (
              <li key={usuario.id}>
                <strong>Nombre:</strong> {usuario.nombre || "Sin nombre"} <br />
                <strong>DNI:</strong> {usuario.DNI || "Sin DNI"} <br />
                <strong>Correo:</strong> {usuario.correo || "Sin correo"} <br />
                <strong>Rol:</strong> {usuario.rol || "Sin rol"} <br />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mostrar las habitaciones filtradas */}
      {mostrar === 'habitaciones' && habitacionesFiltradas.length > 0 && (
        <div>
          <h3>Habitaciones Registradas</h3>
          <ul>
            {habitacionesFiltradas.map((habitacion) => (
              <li key={habitacion.id}>
                <strong>Tipo:</strong> {habitacion.tipo_h} <br />
                <strong>Número:</strong> {habitacion.numero_h} <br />
                <strong>Precio:</strong> {habitacion.precio} <br />
                <strong>Capacidad:</strong> {habitacion.capacidad} <br />
                <strong>Número de Camas:</strong> {habitacion.n_camas} <br />
                <strong>Descripción:</strong> {habitacion.descripcion} <br />
                <strong>ID Habitación:</strong> {habitacion.id_habitacion} <br />
                <strong>Estado:</strong> {habitacion.estado} <br />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mostrar los administradores filtrados */}
      {mostrar === 'administradores' && administradoresFiltrados.length > 0 && (
        <div>
          <h3>Administradores Registrados</h3>
          <ul>
            {administradoresFiltrados.map((admin) => (
              <li key={admin.id}>
                <strong>Nombre:</strong> {admin.nombre || "Sin nombre"} <br />
                <strong>Correo:</strong> {admin.correo || "Sin correo"} <br />
                <strong>Rol:</strong> {admin.rol || "Sin rol"} <br />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mensajes si no se encuentran datos */}
      {!loading && mostrar === 'usuarios' && usuariosFiltrados.length === 0 && <p>No se encontraron usuarios que coincidan con la búsqueda.</p>}
      {!loading && mostrar === 'habitaciones' && habitacionesFiltradas.length === 0 && <p>No se encontraron habitaciones que coincidan con la búsqueda.</p>}
      {!loading && mostrar === 'administradores' && administradoresFiltrados.length === 0 && <p>No se encontraron administradores que coincidan con la búsqueda.</p>}
    </div>
  );
}

export default Informes;
