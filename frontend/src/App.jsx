import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import Profile from "./pages/Profile";
import AddUser from "./pages/admin/AddUser";
import UserList from "./pages/admin/UserList";
import { loginUser, getMyProfile } from "./services/api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      if (token === null) setToken(storedToken);

      async function fetchProfile() {
        setLoadingUser(true);
        try {
          const profile = await getMyProfile(storedToken);
          setUserData(profile);
        } catch (error) {
          console.error("Error al cargar perfil:", error);
          localStorage.removeItem("token");
          setToken(null);
          setUserData(null);
          if (window.location.pathname !== "/" && window.location.pathname !== "/login") {
             navigate("/login");
          }
        } finally {
           setLoadingUser(false);
        }
      }
      if (!userData || (token && userData.token !== storedToken)) {
         fetchProfile();
      } else {
         setLoadingUser(false);
      }

    } else {
      if (token !== null) setToken(null);
      if (userData !== null) setUserData(null);
      setLoadingUser(false);

      if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
          navigate("/login");
      }
    }
  }, [token, navigate]);

  async function handleLogin(usuario, contraseña) {
    try {
      const accessToken = await loginUser(usuario, contraseña);
      localStorage.setItem("token", accessToken);
      setToken(accessToken);
      alert("Login exitoso");
      navigate("/perfil");
    } catch (error) {
      alert(error.message);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserData(null);
    navigate("/login");
  };

  // Componente de envoltura para rutas protegidas (requieren token y userData)
  function ProtectedRoute({ element }) {
    if (loadingUser) {
      return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;;
    }
    if (!token || !userData) {
      return <Navigate to="/login" replace />;
    }
    return element; // Si autenticado, renderiza el elemento de la ruta
  }

  // Componente de envoltura para rutas de admin (requieren token, userData y ser admin)
  function AdminProtectedRoute({ element }) {
    if (loadingUser) {
      return <div className="min-h-screen flex items-center justify-center">Verificando permisos...</div>;
    }
     if (!token || !userData) {
      return <Navigate to="/login" replace />;
    }
    if (userData?.IdRol !== 1) {
      return <Navigate to="/perfil" replace />;
    }
    return element; // Si es admin, renderiza el elemento de la ruta
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Routes>
        {/* Ruta de inicio - accesible para todos */}
        <Route path="/" element={<Home />} />

        {/* Ruta de Login - redirige a perfil si ya hay token y datos de usuario */}
        <Route
          path="/login"
          element={!token && !loadingUser ? <LoginForm onLogin={handleLogin} /> : (token && userData ? <Navigate to="/perfil" replace /> : <div className="min-h-screen flex items-center justify-center">Verificando sesión...</div>)}
        />

        {/* Ruta de Perfil - protegida usando ProtectedRoute */}
        <Route
          path="/perfil"
          element={<ProtectedRoute element={<Profile user={userData} onLogout={handleLogout} />} />}
        />

        {/* Rutas de Admin - protegidas usando AdminProtectedRoute */}
        <Route
          path="/admin/agregar-usuario"
          element={<AdminProtectedRoute element={<AddUser user={userData} />} />}
        />
        <Route
          path="/admin/usuarios"
          element={<AdminProtectedRoute element={<UserList user={userData} />} />}
        />

        {/* Si intenta acceder a cualquier otra ruta que no coincida, puedes redirigir o mostrar un 404 */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

      </Routes>
    </div>
  );
}

export default App;