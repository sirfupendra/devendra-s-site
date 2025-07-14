import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            <Link to="/">Rental Ease</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
            {[
              { path: "/", label: "Home" },
              { path: "/properties", label: "Properties" },
              { path: "/contact", label: "Contact Us" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-gray-700 hover:text-blue-600 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}

            {/* Animated Admin Login */}
            <Link
              to="/admin/login"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-5 py-2 rounded-full shadow-lg transform hover:scale-105 hover:rotate-1 hover:shadow-2xl active:animate-ping transition-all duration-300"
            >
              Admin Login
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 p-2 focus:outline-none"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 transition-all duration-300">
            <div className="px-4 pt-3 pb-4 space-y-2 border-t border-gray-200 bg-white rounded-b-lg shadow">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition duration-200"
              >
                Home
              </Link>
              <Link
                to="/properties"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition duration-200"
              >
                Properties
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition duration-200"
              >
                Contact Us
              </Link>
              <Link
                to="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-3 py-2 rounded-full text-center shadow hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
