
const express = require("express");
const router = express.Router();

/**
 * Health check endpoint
 * Used to verify that the backend server is running
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Zero Knowledge Vault Backend",
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
