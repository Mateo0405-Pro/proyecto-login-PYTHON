import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No estás autenticado");
        return;
      }
      try {
        const response = await fetch("http://localhost:8000/mi-perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al cargar perfil");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchProfile();
  }, []);

  if (!user) return <div>Cargando perfil...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
      <p><strong>Usuario:</strong> {user.Usuario}</p>
      <p><strong>Nombre:</strong> {user.Nombre}</p>
      <p><strong>Email:</strong> {user.Email}</p>
      <p><strong>Rol:</strong> {user.IdRol}</p>
    </div>
  );
}