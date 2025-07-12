const Property = require("../models/Property");
const cloudinary = require("../config/cloudinary");

// Add property
exports.addProperty = async (req, res) => {
  try {
    const {
      title,
      price,
      location,
      bhk,
      furnishing,
      size,
      description,
      isFeatured, // Optional field for featured properties
      status,
      images, // Expecting array of URLs
    } = req.body;

    const newProperty = new Property({
      title,
      price,
      location,
      bhk,
      furnishing,
      size,
      description,
      isFeatured: isFeatured || false, // Default to false if not provided
      images, // Save URLs directly
      status,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding property", error: err.message });
  }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Error fetching properties" });
  }
};

// Get featured properties
exports.getFeaturedProperties = async (req, res) => {
  try {
    const featuredProperties = await Property.find({ isFeatured: true }).sort({ createdAt: -1 });
    res.json(featuredProperties);
  } catch (err) {
    res.status(500).json({ message: "Error fetching featured properties" });
  }
};

// Get filtered properties
exports.getFilteredProperties = async (req, res) => {
  try {
    let { location, minPrice, maxPrice, bhk } = req.query;

    // Convert query params to appropriate types
    minPrice = minPrice ? Number(minPrice) : 0;
    maxPrice = maxPrice ? Number(maxPrice) : Number.MAX_SAFE_INTEGER;
    bhk = bhk ? Number(bhk) : undefined;

    // Build the query object
    const query = {
      price: { $gte: minPrice, $lte: maxPrice },
    };

    if (location) {
      query.location = new RegExp(location, "i"); // case-insensitive match
    }

    if (bhk) {
      query.bhk = bhk;
    }

    const filteredProperties = await Property.find(query).sort({ createdAt: -1 });

    res.status(200).json(filteredProperties);
  } catch (err) {
    console.error("Error in getFilteredProperties:", err);
    res.status(500).json({ message: "Error fetching filtered properties" });
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Property.distinct("location");
    res.status(200).json(locations);
  } catch (err) {
    console.error("Error fetching locations:", err);
    res.status(500).json({ message: "Server error" });
  }
};




// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting property" });
  }
};

// Get single property
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Property not found" });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
