const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  bhk: Number,
  furnishing: String,
  size: String,
  description: String,
  isFeatured: { type: Boolean, default: false }, // For featured properties
  images: [String], // Cloudinary image URLs
  status: { type: String, default: "available" }, // available / rented
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Property", propertySchema);
