import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [modalImg, setModalImg] = useState(null);

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
            style={{ width: 300, height: 200, objectFit: "cover", borderRadius: 8, cursor: "pointer" }}
            onClick={() => setModalImg(img)}
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

      {/* Modal for large image */}
      {modalImg && (
        <div
          onClick={() => setModalImg(null)}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <img
            src={modalImg}
            alt="Large"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: 12,
              boxShadow: "0 4px 32px #0008",
              background: "#fff",
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;