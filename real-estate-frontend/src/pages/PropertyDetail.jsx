// src/pages/PropertyDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await API.get(`/properties/${id}`);
      setProperty(res.data);
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>{property.title}</h2>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        {property.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Property ${i}`}
            style={{ width: 300, height: 200, objectFit: "cover", borderRadius: 8 }}
          />
        ))}
      </div>
      <p><strong>Rent:</strong> ₹{property.price} / month</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>BHK:</strong> {property.bhk}</p>
      <p><strong>Size:</strong> {property.size}</p>
      <p><strong>Furnishing:</strong> {property.furnishing}</p>
      <p><strong>Status:</strong> {property.status}</p>
      <p><strong>Description:</strong> {property.description}</p>
    </div>
  );
};

export default PropertyDetail;
