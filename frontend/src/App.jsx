import React, { useState } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const [token, setToken] = useState(null);

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
    // Aquí podrías guardar en localStorage para persistencia
    // localStorage.setItem("token", newToken);
  };

  return (
    <div className="App">
      {!token ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <h1>Bienvenido a la app</h1>
          <p>Token: {token}</p>
          {/* Aquí vendría el resto de la app luego de autenticación */}
        </div>
      )}
    </div>
  );
}

export default App;