import React from 'react'
import Header from '../components/Header'
import API from "../api";// Assuming you have an API utility for making requests

function Properties() {
  const [formData, setFormData] = React.useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bhk: '1',
  });
  const [properties, setProperties] = React.useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.get("/properties/filter", {
        params: {
          location: formData.location,
          minPrice: formData.minPrice,
          maxPrice: formData.maxPrice,
          bhk: formData.bhk,
        }
      });
      setProperties(res.data);
      console.log("Form submitted with data:", formData);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  return (
    <div>
      <Header />
      <h2>Property Listing</h2>
      <h4>Find Your Perfect rental from our collection</h4>
      <form onSubmit={handleSubmit}>
        <h3>Filter Properties</h3>
        <label>
          Location:
          <input type="text" name="location" onChange={handleChange} />
        </label>
        <label>
          Price Range:
          <input type="number" name="minPrice" placeholder="Min Price" onChange={handleChange} />
          <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleChange} />
        </label>
        <label>
          BHk:
          <select name="bhk" value={formData.bhk} onChange={handleChange}>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
            <option value="5">5 BHK</option>
          </select>
        </label>
        <button type="submit">Search</button>
      </form>

      {/* Display filtered properties */}
      <div>
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
              <h4>{property.title}</h4>
              <p>{property.location}</p>
              <p>₹{property.price}</p>
              <p>{property.bhk} BHK</p>
              {/* Add more property details as needed */}
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
}

export default Properties;