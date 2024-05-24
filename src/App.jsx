import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [idEdicionUsuario, setIdEdicionUsuario] = useState(null);
  const [nombreEdicionUsuario, setNombreEdicionUsuario] = useState('');

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then(data => {
        setUsuarios(data.results.map((usuario, index) => ({
          id: index,
          nombre: `${usuario.name.first} ${usuario.name.last}`,
          foto: usuario.picture.large
        })));
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  const generarUsuarioAleatorio = () => {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => {
        const nuevoUsuario = {
          id: usuarios.length,
          nombre: `${data.results[0].name.first} ${data.results[0].name.last}`,
          foto: data.results[0].picture.large
        };
        setUsuarios([...usuarios, nuevoUsuario]);
      })
      .catch(error => console.error('Error al obtener usuario aleatorio:', error));
  };

  const eliminarUsuario = (idUsuario) => {
    setUsuarios(usuarios.filter(usuario => usuario.id !== idUsuario));
  };

  const editarUsuario = (idUsuario) => {
    const usuarioAEditar = usuarios.find(usuario => usuario.id === idUsuario);
    setIdEdicionUsuario(idUsuario);
    setNombreEdicionUsuario(usuarioAEditar.nombre);
  };

  const guardarUsuarioEditado = () => {
    if (nombreEdicionUsuario) {
      setUsuarios(usuarios.map(usuario => {
        if (usuario.id === idEdicionUsuario) {
          return {
            ...usuario,
            nombre: nombreEdicionUsuario
          };
        }
        return usuario;
      }));
      setIdEdicionUsuario(null);
      setNombreEdicionUsuario('');
    } else {
      alert('Ingrese un nombre para el usuario.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Users</h1>
        <div className="lista-usuarios">
          {usuarios.map(usuario => (
            <div key={usuario.id} className="tarjeta-usuario">
              <img src={usuario.foto} alt="Usuario" />
              {idEdicionUsuario === usuario.id ? (
                <input
                  type="text"
                  value={nombreEdicionUsuario}
                  onChange={(e) => setNombreEdicionUsuario(e.target.value)}
                />
              ) : (
                <p>{usuario.nombre}</p>
              )}
              <div className="contenedor-botones">
                {idEdicionUsuario === usuario.id ? (
                  <button onClick={guardarUsuarioEditado}>Guardar</button>
                ) : (
                  <button onClick={() => editarUsuario(usuario.id)}>Editar</button>
                )}
                <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
        <div className="contenedor-agregar-usuario">
          <h2>Agregar Nuevo Usuario</h2>
          <button onClick={generarUsuarioAleatorio}>Generar Usuario Aleatorio</button>
        </div>
      </header>
    </div>
  );
}

export default App;