const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth.middleware");
const deviceStore = require("../storage/device.store");

router.post("/revoke", requireAuth, (req, res) => {
  const { deviceId } = req.body;

  if (!deviceId) {
    return res.status(400).json({ error: "Device ID required" });
  }

  deviceStore.revoke(deviceId);

  res.json({
    message: "Device revoked successfully",
  });
});

module.exports = router;
