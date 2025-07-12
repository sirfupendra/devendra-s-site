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
    images: "",
  });
  const navigate = useNavigate();

  const fetchProperties = async () => {
    const res = await API.get("/properties");
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

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const urls = [];

    for (const file of files) {
      const url = await uploadToCloudinary(file);
      urls.push(url);
    }

    setFormData((prev) => ({
      ...prev,
      images: prev.images
        ? prev.images.split(",").concat(urls).join(",")
        : urls.join(","),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-700">Admin Dashboard</h2>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6 max-w-xl mx-auto mb-10">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Property" : "Add New Property"}
        </h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {Object.keys(formData)
            .filter((field) => field !== "images")
            .map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [field]: e.target.value }))
                }
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            ))}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              {editingId ? "Update Property" : "Add Property"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-md transition"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <h3 className="text-2xl font-semibold mb-4">All Properties</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((p) => (
          <div
            key={p._id}
            className="bg-white border border-gray-200 rounded-xl shadow p-4 flex flex-col"
          >
            <img
              src={p.images[0]}
              alt={p.title}
              className="w-full h-44 object-cover rounded-md mb-3"
            />
            <h4 className="text-lg font-bold mb-1">{p.title}</h4>
            <p className="text-gray-700 mb-2">
              ₹{p.price} | {p.location}
            </p>
            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
              >
                Delete
              </button>
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
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;