import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-6">
      <h1 className="text-3xl font-bold mb-6">Bienvenido a Proyecto Login</h1>
      <p className="mb-6">Esta es la página principal.</p>
      <Link to="/login" className="text-blue-600 hover:underline">
        Ir a Iniciar Sesión
      </Link>
    </div>
  );
}