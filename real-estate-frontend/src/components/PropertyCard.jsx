import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8, cursor: "pointer" }}
      onClick={() => navigate(`/property/${property._id}`)}
    >
      <img
        src={property.images[0]}
        alt="property"
        style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8 }}
      />
      <h3>{property.title}</h3>
      <p><strong>₹{property.price}</strong> / month</p>
      <p>{property.location}</p>
    </div>
  );
};

export default PropertyCard;
