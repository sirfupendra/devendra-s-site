const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

const {
  addProperty,
  getAllProperties,
  deleteProperty,
  getProperty,
  updateProperty,
  getFeaturedProperties,
  getFilteredProperties, // Assuming this function is defined in propertyController
} = require("../controllers/propertyController");

// Public Routes
router.get("/", getAllProperties);
router.get("/featured",getFeaturedProperties);
router.get("/filter", getFilteredProperties); // Assuming this function is defined in propertyController
router.get("/:id", getProperty);

// Admin Protected Routes
router.post("/", auth, upload.array("images", 5), addProperty);
router.put("/:id", auth, updateProperty);
router.delete("/:id", auth, deleteProperty);

module.exports = router;
