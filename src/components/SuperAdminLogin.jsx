import React, { useState } from "react";

export default function SuperAdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "superadmin" && password === "superadmin@2025") {
      onLoginSuccess();
    } else {
      setError("Invalid superadmin credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>SuperAdmin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="SuperAdmin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="SuperAdmin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
