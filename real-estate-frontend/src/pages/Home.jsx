// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import PropertyCard from "../components/PropertyCard";

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/properties");
      setProperties(res.data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Available Rentals</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {properties.map((p) => (
          <PropertyCard key={p._id} property={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;
