import React, { useState } from "react";
import API from "../api";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      setToken(res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setErr(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 400, margin: "auto" }}>
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "8px 0", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "8px 0", width: "100%" }}
      />
      <button onClick={handleLogin} style={{ marginTop: 10 }}>Login</button>
      {err && <p style={{ color: "red" }}>{err}</p>}
    </div>
  );
};

export default AdminLogin;
