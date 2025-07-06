const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  bhk: String,
  furnishing: String,
  size: String,
  description: String,
  images: [String], // Cloudinary image URLs
  status: { type: String, default: "available" }, // available / rented
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Property", propertySchema);
