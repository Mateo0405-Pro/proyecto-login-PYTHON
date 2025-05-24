import React, { useState } from "react";
import { loginUser, getMyProfile } from "./services/api";
import LoginForm from "./components/LoginForm";
import Profile from "./pages/Profile";

function App() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  async function handleLogin(usuario, contraseña) {
    try {
      const accessToken = await loginUser(usuario, contraseña);
      setToken(accessToken);
      const profile = await getMyProfile(accessToken);
      setUserData(profile);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      {!token ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Profile user={userData} />
      )}
    </div>
  );
}

export default App;
