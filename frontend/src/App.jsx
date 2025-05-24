import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import Profile from "./pages/Profile";
import { loginUser, getMyProfile } from "./services/api";

function App() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  async function handleLogin(usuario, contraseña) {
    const accessToken = await loginUser(usuario, contraseña);
    setToken(accessToken);
    const profile = await getMyProfile(accessToken);
    setUserData(profile);
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={!token ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/perfil" />}
          />

          <Route
            path="/perfil"
            element={token ? <Profile user={userData} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;