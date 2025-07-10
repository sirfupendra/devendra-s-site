import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Replace these URLs with your own images
const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
];

function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
          draggable={false}
        />
      ))}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">Find Your Perfect Rental</h1>
        <p className="text-lg md:text-2xl mb-8 drop-shadow-lg">Discover amazing properties that feel like home</p>
        <div className="flex gap-4">
          <Link to="/properties">
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg shadow transition font-semibold text-lg">
              Browse Properties
            </button>
          </Link>
          <Link to="/contact">
            <button className="bg-white/80 hover:bg-white text-primary px-6 py-3 rounded-lg shadow transition font-semibold text-lg">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;