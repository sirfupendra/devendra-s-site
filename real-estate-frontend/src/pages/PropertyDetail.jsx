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

  if (!property)
    return (
      <p className="text-center py-10 text-lg text-gray-500">Loading...</p>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Featured Image with Overlay */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-[22rem] md:h-[34rem] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center drop-shadow-lg">
            {property.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <span className="bg-white/90 text-black font-semibold px-4 py-2 rounded-full border border-gray-200 shadow-md">
              {property.bhk} BHK
            </span>
            <span className="bg-white/90 text-black font-semibold px-4 py-2 rounded-full border border-gray-200 shadow-md">
              {property.size} sqft
            </span>
            <span className="bg-white/90 text-black font-semibold px-4 py-2 rounded-full border border-gray-200 shadow-md">
              {property.furnishing}
            </span>
            <span
              className={`bg-white/90 font-semibold px-4 py-2 rounded-full border border-gray-200 shadow-md ${
                property.status === "available"
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {property.status}
            </span>
            {property.isFeatured && (
              <span className="bg-yellow-400 text-white font-bold px-4 py-2 rounded-full border border-yellow-300 shadow-md">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {property.images.slice(1).map((img, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden border border-gray-300 bg-white shadow hover:scale-105 transition-transform duration-200"
          >
            <img
              src={img}
              alt={`Property preview ${i + 1}`}
              className="w-40 h-28 object-cover cursor-pointer"
              onClick={() => setModalImg(img)}
            />
          </div>
        ))}
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3">
        <p className="text-2xl font-bold text-blue-700 mb-2">
          ₹{property.price}{" "}
          <span className="text-base font-normal text-gray-500">/ month</span>
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Location:</strong> {property.location}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Description:</strong> {property.description}
        </p>
      </div>

      {/* Modal for large image */}
      {modalImg && (
        <div
          onClick={() => setModalImg(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
        >
          <img
            src={modalImg}
            alt="Large view"
            className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl bg-white"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
