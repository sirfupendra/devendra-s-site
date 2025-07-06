const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Register route (use only once to create admin)
router.post("/register", register);

// Login route
router.post("/login", login);

module.exports = router;
