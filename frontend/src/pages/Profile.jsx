import React from "react";

function Profile({ user }) {
  if (!user) return null;
  return (
    <div>
      <h1>Perfil</h1>
      <p>Usuario: {user.Usuario}</p>
      <p>Nombre: {user.Nombre}</p>
      <p>Email: {user.Email}</p>
      <p>Rol: {user.IdRol}</p>
    </div>
  );
}

export default Profile;
