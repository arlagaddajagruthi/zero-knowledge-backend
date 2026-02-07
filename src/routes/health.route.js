// Health check route
// Used to confirm that the backend server is running properly

const express = require("express");
const router = express.Router();

/**
 * Health check endpoint
 * Returns basic server status information
 * Helpful for monitoring and debugging
 */
router.get("/health", (req, res) => {

  // Send success response with current server time
  res.status(200).json({
    status: "OK",
    service: "Zero Knowledge Vault Backend",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
