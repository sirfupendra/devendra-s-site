const multer = require("multer");
const storage = multer.memoryStorage(); // Store in memory before uploading to cloudinary
const upload = multer({ storage });
module.exports = upload;
