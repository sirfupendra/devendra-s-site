import React, { useEffect, useState } from "react";
import API from "../api";
import PropertyCard from "../components/PropertyCard";
import Header from "../components/Header";
import HeroSection from "./HeroSection";

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/properties");
      setProperties(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <HeroSection />

      <section className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 text-center">
          Why Choose Rent Ease
        </h2>
        <p className="text-gray-600 text-base sm:text-lg mb-10 text-center">
          Rental Ease is your trusted partner in finding the perfect rental property. With a wide range of listings, user-friendly search tools, and expert guidance, we make the rental process seamless and stress-free. Whether you're looking for a cozy apartment or a spacious house, Rental Ease has you covered.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">Quality Properties</h3>
            <p className="text-gray-600 text-center text-sm sm:text-base">
              We curate a selection of high-quality rental properties to ensure you find the best fit for your needs.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">Personal Service</h3>
            <p className="text-gray-600 text-center text-sm sm:text-base">
              Our dedicated team is here to assist you every step of the way, providing personalized service and expert advice.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <h3 className="text-lg sm:text-xl font-semibold text-primary mb-2">Transparent Process</h3>
            <p className="text-gray-600 text-center text-sm sm:text-base">
              We believe in transparency, ensuring you have all the information you need to make informed decisions.
            </p>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6 text-center">
          Our Featured Properties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {properties.map((p) => (
            <PropertyCard key={p._id} property={p} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="/properties"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary-dark transition font-semibold text-base sm:text-lg"
          >
            View All Properties
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;