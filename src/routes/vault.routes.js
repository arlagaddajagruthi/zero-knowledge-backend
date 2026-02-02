const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/auth.middleware");
const requireDevice = require("../middleware/device.middleware");
const rateLimit = require("../middleware/rateLimit.middleware");
const vault = require("../storage/memory.store");

// Upload vault (Encrypted only)
router.post("/upload", requireAuth, requireDevice, rateLimit, (req, res) => {
  const { encryptedVault } = req.body;

  if (!encryptedVault) {
    return res.status(400).json({ error: "Encrypted vault required" });
  }

  vault.encryptedVault = encryptedVault;
  vault.version = 1;

  res.json({
    message: "Vault uploaded",
    version: vault.version,
  });
});

// Get vault
router.get("/data", requireAuth, requireDevice, rateLimit, (req, res) => {
  if (!vault.encryptedVault) {
    return res.status(404).json({ error: "Vault empty" });
  }

  res.json({
    encryptedVault: vault.encryptedVault,
    version: vault.version,
  });
});

// Update vault with version check
router.post("/update", requireAuth, requireDevice, rateLimit, (req, res) => {
  const { encryptedVault, version } = req.body;

  if (!encryptedVault || version === undefined) {
    return res.status(400).json({ error: "Invalid request" });
  }

  if (version !== vault.version) {
    return res.status(409).json({
      error: "Version conflict",
      currentVersion: vault.version,
    });
  }

  vault.encryptedVault = encryptedVault;
  vault.version++;

  res.json({
    message: "Vault updated",
    newVersion: vault.version,
  });
});

module.exports = router;
