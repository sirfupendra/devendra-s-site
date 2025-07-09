// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import PropertyCard from "../components/PropertyCard";
import Header from "../components/Header";
import HeroSection from "./HeroSection";

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
     
      <Header />
      <HeroSection />
      <h2>why choose rent Ease</h2>
      <p>
        Rental Ease is your trusted partner in finding the perfect rental property. With a wide range of listings, user-friendly search tools, and expert guidance, we make the rental process seamless and stress-free. Whether you're looking for a cozy apartment or a spacious house, Rental Ease has you covered.
      </p>
      <div>
        <h3>Quality Properties</h3>
        <p>We curate a selection of high-quality rental properties to ensure you find the best fit for your needs.</p>
        <h3>Personal service</h3>
        <p>Our dedicated team is here to assist you every step of the way, providing personalized service and expert advice.</p>
        <h3>Transparent Process</h3>
        <p>We believe in transparency, ensuring you have all the information you need to make informed decisions.</p>

      </div>
      
      <h2>Our featured Properties</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {properties.map((p) => (
          <PropertyCard key={p._id} property={p} />
        ))}
      </div>
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <a href="/properties" style={{ textDecoration: "none", color: "#007bff" }}>
          View All Properties
        </a> 
        </div>
    </div>
  );
};

export default Home;
