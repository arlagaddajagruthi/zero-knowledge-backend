// Device management routes
// Allows authenticated users to revoke access for a specific device

const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth.middleware");
const deviceStore = require("../storage/device.store");

// Endpoint to revoke a device
// Only accessible by authenticated users
router.post("/revoke", requireAuth, (req, res) => {

  // Read device ID from request body
  const { deviceId } = req.body;

  // Validate input
  if (!deviceId) {
    return res.status(400).json({ error: "Device ID required" });
  }

  // Mark the device as revoked in the device store
  deviceStore.revoke(deviceId);

  // Send confirmation response
  res.json({
    message: "Device revoked successfully",
  });
});

module.exports = router;
