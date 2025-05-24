import React from "react";

export default function Profile({ usuario }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Perfil</h2>
      <div className="space-y-3 text-gray-700">
        <p><span className="font-semibold">Usuario:</span> {usuario.Usuario}</p>
        <p><span className="font-semibold">Nombre:</span> {usuario.Nombre}</p>
        <p><span className="font-semibold">Email:</span> {usuario.Email}</p>
        <p><span className="font-semibold">Rol:</span> {usuario.IdRol}</p>
      </div>
    </div>
  );
}