import React, { useState } from "react";
import API from "../api";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await API.post("/auth/login", { email, password });
      setToken(res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setErr(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Admin Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow transition"
          >
            Login
          </button>
          {err && (
            <p className="mt-4 text-center text-red-600 text-sm">{err}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;