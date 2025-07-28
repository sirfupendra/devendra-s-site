import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://www.team.propira.com/images/blog/extra_image/blogextra-1632566899.png",
  "https://www.adanirealty.com/-/media/project/realty/blogs/what-is-the-difference-between-a-villa-and-an-apartment_.ashx",
  "https://victoriarealtors.in/wp-content/uploads/2023/05/shutterstock_2066280941-1024x576.jpg",
];

function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000); // Wait 8s per image for smoother feel
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Background images */}
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity ease-in-out duration-[2000ms] ${
            idx === current ? "opacity-100 animate-kenBurns" : "opacity-0"
          }`}
          draggable={false}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4 max-w-screen-md mx-auto h-full">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Find Your Perfect Rental
        </h1>
        <p className="text-lg md:text-2xl mb-8 drop-shadow-lg">
          Discover amazing properties that feel like home
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/properties">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg">
              Browse Properties
            </button>
          </Link>
          <Link to="/contact">
            <button className="bg-white text-blue-700 hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
