import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';

export default function LoginForm({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await onLogin(usuario, contraseña);
      alert("Login exitoso");
      navigate("/perfil"); // Redirige a perfil después de login
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
      <div className="mb-4">
        <UserIcon className="inline w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <LockClosedIcon className="inline w-5 h-5 text-gray-400 mr-2" />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Ingresar
      </button>
    </form>
  );
}