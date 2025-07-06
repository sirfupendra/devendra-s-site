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
} = require("../controllers/propertyController");

// Public Routes
router.get("/", getAllProperties);
router.get("/:id", getProperty);

// Admin Protected Routes
router.post("/", auth, upload.array("images", 5), addProperty);
router.put("/:id", auth, updateProperty);
router.delete("/:id", auth, deleteProperty);

module.exports = router;
