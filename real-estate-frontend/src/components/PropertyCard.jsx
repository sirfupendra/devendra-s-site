import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 p-4 flex flex-col gap-3 hover:scale-[1.03] duration-200"
      onClick={() => navigate(`/property/${property._id}`)}
    >
      <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
        <img
          src={property.images?.[0] || "/placeholder.jpg"}
          alt={property.title}
          className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 truncate">{property.title}</h3>
        <p className="text-primary font-bold text-lg md:text-xl">
          ₹{property.price}
          <span className="text-sm font-normal text-gray-500"> / month</span>
        </p>
        <p className="text-gray-600 text-sm truncate">{property.location}</p>
      </div>
      <div className="flex gap-3 mt-2">
        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
          {property.bhk} BHK
        </span>
        <span className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
          {property.size} sqft
        </span>
        {property.isFeatured && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;