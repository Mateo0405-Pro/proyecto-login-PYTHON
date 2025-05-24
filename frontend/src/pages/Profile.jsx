import React from "react";
import { UserCircleIcon, EnvelopeIcon, ShieldCheckIcon, ArrowLeftOnRectangleIcon, UsersIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export default function Profile({ user, onLogout }) {
  // El usuario y la función de logout se reciben como props desde App.jsx
  // La lógica de carga y redirección si no hay usuario se maneja en App.jsx en la definición de la ruta /perfil

  if (!user) {
    // Esto no debería mostrarse si la ruta /perfil está protegida correctamente en App.jsx
    // Pero lo mantenemos como fallback o indicador de estado inesperado
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <div>Cargando o verificando sesión...</div>
      </div>
    );
  }

  const isAdmin = user.IdRol === 1;

  // Manejador de clic para enlaces de admin (solo para depuración)
  const handleAdminLinkClick = (path) => {
    console.log("Admin Link Clicked, attempting to navigate to:", path);
    // La navegación real ocurre por el componente <Link>
  };

   // Manejador de clic para el botón de cerrar sesión (solo para depuración)
   const handleLogoutClick = () => {
     console.log("Logout button clicked.");
     onLogout(); // Llama a la función de logout pasada como prop
   };


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Perfil de Usuario</h2>
              <button
                onClick={handleLogoutClick}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Contenido del Perfil (siempre visible en /perfil) */}
          <div className="px-6 py-8">
             {/* Mostrar siempre la info básica si el usuario está cargado */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
                {/* User Info */}
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <UserCircleIcon className="h-16 w-16 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{user.Nombre}</h3>
                      <p className="text-sm text-gray-500">@{user.Usuario}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <EnvelopeIcon className="h-8 w-8 text-blue-500" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Email</h3>
                      <p className="text-sm text-gray-500">{user.Email}</p>
                    </div>
                  </div>
                </div>

                {/* Role Info */}
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <ShieldCheckIcon className="h-8 w-8 text-blue-500" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Rol</h3>
                      <p className="text-sm text-gray-500">{isAdmin ? 'Administrador' : 'Usuario Regular'}</p>
                    </div>
                  </div>
                </div>

                 {/* Additional Info (visible to all) */}
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Información Adicional</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-500">Último acceso</p>
                      <p className="text-sm font-medium text-gray-900">Verificar con backend</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estado de la cuenta</p>
                      <p className="text-sm font-medium text-green-600">Activa</p>
                    </div>
                  </div>
                </div>

              </div>

            {/* Admin Section (conditionally rendered) */}
            {isAdmin && (
              <div className="mt-8 bg-blue-50 rounded-lg p-6 shadow-sm border border-blue-200">
                <h3 className="text-lg font-bold text-blue-800 mb-4">Funcionalidades de Administrador</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Registrar nuevo usuario */}
                  <Link to="/admin/agregar-usuario" className="flex items-center space-x-3 hover:text-blue-800 transition-colors duration-150" onClick={() => handleAdminLinkClick('/admin/agregar-usuario')}>
                    <PlusCircleIcon className="h-6 w-6 text-blue-600" />
                    <span className="font-medium">Registrar Usuario</span>
                  </Link>
                  {/* Ver todos los usuarios */}
                  <Link to="/admin/usuarios" className="flex items-center space-x-3 hover:text-blue-800 transition-colors duration-150" onClick={() => handleAdminLinkClick('/admin/usuarios')}>
                    <UsersIcon className="h-6 w-6 text-blue-600" />
                    <span className="font-medium">Ver Usuarios</span>
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}