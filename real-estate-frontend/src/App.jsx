// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/AdminDashBoard";
import Properties from "./pages/Properties";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
         <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /> </PrivateRoute>}/>
        <Route path="/properties" element={<Properties />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      
    </Router>
  );
}

export default App;
