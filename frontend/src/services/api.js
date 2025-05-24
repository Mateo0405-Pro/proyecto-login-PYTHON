const API_URL = "http://127.0.0.1:8000";

export async function loginUser(usuario, contraseña) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, contraseña }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Error en login");
  }
  const data = await response.json();
  return data.access_token;
}

export async function getMyProfile(token) {
  const response = await fetch(`${API_URL}/mi-perfil`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("No autorizado o error al obtener perfil");
  }
  return response.json();
}