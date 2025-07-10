import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Rental Ease
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  // X icon
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger icon
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 mt-2 bg-white rounded-b-lg shadow">
              <Link
                to="/"
                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                to="/contact"
                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                to="/admin/login"
                className="block bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 mt-2"
                onClick={() => setMenuOpen(false)}
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