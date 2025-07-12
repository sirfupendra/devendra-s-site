import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bhk, setBhk] = useState("");
  const [properties, setProperties] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [allLocations, setAllLocations] = useState([]); // for suggestion

  // Fetch distinct locations for suggestions
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/properties/locations");
        const data = await res.json();
        setAllLocations(data);
      } catch (err) {
        console.error("Error fetching locations", err);
      }
    };
    fetchLocations();
  }, []);

  // Show suggestions as user types
  useEffect(() => {
    if (location.length === 0) {
      setSuggestions([]);
    } else {
      const filtered = allLocations.filter((loc) =>
        loc.toLowerCase().includes(location.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    }
  }, [location, allLocations]);

  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (bhk) params.append("bhk", bhk);

    try {
      const res = await fetch(
        `http://localhost:5000/api/properties/filter?${params}`
      );
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Find Your Dream Rental
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Location Input with Animation */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                location.length === 0 ? "animate-pulse bg-gray-100" : ""
              }`}
            />
            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow w-full max-h-40 overflow-y-auto">
                {suggestions.map((sugg, i) => (
                  <li
                    key={i}
                    className="p-2 hover:bg-blue-50 cursor-pointer text-sm"
                    onClick={() => {
                      setLocation(sugg);
                      setSuggestions([]);
                    }}
                  >
                    {sugg}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="BHK"
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="text-center mb-6">
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow transition"
          >
            🔍 Search
          </button>
        </div>

        {properties.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No properties found. Try adjusting your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
