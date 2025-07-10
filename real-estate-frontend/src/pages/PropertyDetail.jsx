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

  if (!property) return <p className="text-center py-10 text-lg text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">{property.title}</h2>
      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {property.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Property ${i}`}
            className="w-full h-56 sm:h-64 object-cover rounded-lg shadow cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setModalImg(img)}
          />
        ))}
      </div>
      {/* Property Details */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-3">
        <div className="flex flex-wrap gap-4 mb-2">
          <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
            {property.bhk} BHK
          </span>
          <span className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
            {property.size} sqft
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {property.furnishing}
          </span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${property.status === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {property.status}
          </span>
        </div>
        <p className="text-xl font-bold text-primary mb-1">
          ₹{property.price} <span className="text-base font-normal text-gray-500">/ month</span>
        </p>
        <p className="text-gray-700 mb-1"><strong>Location:</strong> {property.location}</p>
        <p className="text-gray-700 mb-1"><strong>Description:</strong> {property.description}</p>
      </div>

      {/* Modal for large image */}
      {modalImg && (
        <div
          onClick={() => setModalImg(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <img
            src={modalImg}
            alt="Large"
            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl bg-white"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;