import React, { useEffect, useState } from "react";
import API from "../api";
import PropertyCard from "../components/PropertyCard";
import Header from "../components/Header";
import HeroSection from "./HeroSection";
import {
  Home,
  Handshake,
  BadgeCheck,
} from "lucide-react"; // Icons from lucide-react

const HomePage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/properties/featured");
      setProperties(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen scroll-smooth">
      <Header />
      <HeroSection />

      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
          Why Choose Rent Ease
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl text-center max-w-3xl mx-auto mb-12">
          Rental Ease is your trusted partner in finding the perfect rental property. With a wide range of listings, user-friendly tools, and expert guidance, we make the process seamless.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
            <Home className="w-10 h-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold text-primary mb-2">
              Quality Properties
            </h3>
            <p className="text-gray-600 text-base">
              We curate high-quality rental properties to help you find your ideal home.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
            <Handshake className="w-10 h-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold text-primary mb-2">
              Personal Service
            </h3>
            <p className="text-gray-600 text-base">
              Our team is here to assist you every step with personalized service and expert help.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
            <BadgeCheck className="w-10 h-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold text-primary mb-2">
              Transparent Process
            </h3>
            <p className="text-gray-600 text-base">
              We value transparency, giving you all the facts to make informed decisions.
            </p>
          </div>
        </div>

        {/* Featured Properties */}
        <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center mb-6">
          Our Featured Properties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {properties.map((p) => (
            <PropertyCard key={p._id} property={p} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <a
            href="/properties"
            className="inline-block bg-primary text-white px-6 py-3 rounded-xl shadow hover:bg-primary-dark transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
          >
            View All Properties
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
