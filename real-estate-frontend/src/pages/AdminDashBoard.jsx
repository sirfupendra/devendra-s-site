import React, { useEffect, useState } from "react";
import API from "../api";
import { getToken, removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

import { uploadToCloudinary } from "../utils/uploadToCloudinary";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    bhk: "",
    furnishing: "",
    size: "",
    description: "",
    isFeatured: false,
    status: "available",
    images: "", // comma-separated Cloudinary URLs
  });
  const navigate = useNavigate();

  const fetchProperties = async () => {
    const res = await API.get("/properties/featured");
    setProperties(res.data);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/properties/${id}`, {
        headers: { Authorization: getToken() },
      });
      fetchProperties();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, images: formData.images.split(",") };
      if (editingId) {
        await API.put(`/properties/${editingId}`, payload, {
          headers: { Authorization: getToken() },
        });
      } else {
        await API.post("/properties", payload, {
          headers: { Authorization: getToken() },
        });
      }
      fetchProperties();
      resetForm();
    } catch (err) {
      alert("Failed to submit");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      location: "",
      bhk: "",
      furnishing: "",
      size: "",
      description: "",
      isFeatured: false,
      status: "available",
      images: "",
    });
    setEditingId(null);
  };

  const logout = () => {
    removeToken();
    navigate("/admin/login");
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle file upload
  // In AdminDashBoard.jsx

const handleFileChange = async (e) => {
  const files = Array.from(e.target.files);
  const urls = [];

  for (const file of files) {
    const url = await uploadToCloudinary(file);
    urls.push(url);
  }

  // Combine existing images with new ones
  setFormData((prev) => ({
    ...prev,
    images: prev.images
      ? prev.images.split(",").concat(urls).join(",")
      : urls.join(","),
  }));
};

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <h3 style={{ marginTop: 24 }}>{editingId ? "Edit Property" : "Add New Property"}</h3>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxWidth: 400,
        }}
        onSubmit={handleSubmit}
      >
        {Object.keys(formData)
          .filter((field) => field !== "images")
          .map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field}
              value={formData[field]}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field]: e.target.value }))
              }
            />
          ))}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <button type="submit">
          {editingId ? "Update Property" : "Add Property"}
        </button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      <h3 style={{ marginTop: 40 }}>All Properties</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
        }}
      >
        {properties.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: 16,
              borderRadius: 8,
            }}
          >
            <img
              src={p.images[0]}
              alt={p.title}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <h4>{p.title}</h4>
            <p>
              ₹{p.price} | {p.location}
            </p>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
            <button
              onClick={() => {
                setEditingId(p._id);
                setFormData({
                  title: p.title,
                  price: p.price,
                  location: p.location,
                  bhk: p.bhk,
                  furnishing: p.furnishing,
                  size: p.size,
                  description: p.description,
                  isFeatured: p.isFeatured,
                  status: p.status,
                  images: p.images.join(","),
                });
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;