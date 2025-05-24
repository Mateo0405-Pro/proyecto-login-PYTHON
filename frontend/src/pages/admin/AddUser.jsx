import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddUser({ user }) {
  const navigate = useNavigate();

  // Verificar si el usuario es administrador
  useEffect(() => {
    if (!user || user.IdRol !== 1) {
      // Redirigir si no es admin
      navigate("/perfil", { replace: true });
    }
  }, [user, navigate]); // Depende del usuario y navigate

  const [formData, setFormData] = useState({
    usuario: '',
    contraseña: '',
    nombre: '',
    email: '',
    idRol: 2, // Default a usuario regular
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí irá la lógica para enviar los datos al backend
    alert('Funcionalidad de agregar usuario no implementada aún.');
    // Resetear formulario (opcional)
    // setFormData({ usuario: '', contraseña: '', nombre: '', email: '', idRol: 2 });
  };

  // Mientras verifica el rol o si no hay usuario aún
  if (!user || user.IdRol !== 1) {
     return null; // O podrías mostrar un spinner ligero
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar Nuevo Usuario</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              name="idRol"
              value={formData.idRol}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={1}>Administrador</option>
              <option value={2}>Usuario Regular</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Registrar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 