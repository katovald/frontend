import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      await axios.post("http://localhost:3001/register", {
        username,
        password,
      });
      alert("Usuario registrado correactamente");
    } catch (error) {
      alert("Error al registrar usuario");
    }
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Autenticacion</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      {token && <p>Token: {token}</p>}
      <p>{message}</p>
    </div>
  );
};

export default Auth;
