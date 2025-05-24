import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserList({ user }) {
  const navigate = useNavigate();

  // Verificar si el usuario es administrador
  useEffect(() => {
    if (!user || user.IdRol !== 1) {
      // Redirigir si no es admin
      navigate("/perfil", { replace: true });
    }
  }, [user, navigate]); // Depende del usuario y navigate

  // Mientras verifica el rol o si no hay usuario aún
   if (!user || user.IdRol !== 1) {
     return null; // O podrías mostrar un spinner ligero
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
        <p>Este es un placeholder. Aquí se mostrará la lista de usuarios activos.</p>
        {/* Aquí irá la tabla o lista de usuarios */}
      </div>
    </div>
  );
} 