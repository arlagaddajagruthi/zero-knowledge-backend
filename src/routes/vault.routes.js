// Vault routes
// Handles encrypted vault upload, retrieval, and update
// The server only stores encrypted data and never sees plaintext secrets

const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/auth.middleware");
const requireDevice = require("../middleware/device.middleware");
const rateLimit = require("../middleware/rateLimit.middleware");
const vault = require("../storage/memory.store");

// Upload encrypted vault for the first time
router.post("/upload", requireAuth, requireDevice, rateLimit, (req, res) => {

  // Read encrypted vault from request body
  const { encryptedVault } = req.body;

  // Validate input
  if (!encryptedVault) {
    return res.status(400).json({ error: "Encrypted vault required" });
  }

  // Store encrypted vault (server remains blind to actual data)
  vault.encryptedVault = encryptedVault;

  // Initialize vault version for synchronization
  vault.version = 1;

  res.json({
    message: "Vault uploaded",
    version: vault.version,
  });
});

// Retrieve encrypted vault
router.get("/data", requireAuth, requireDevice, rateLimit, (req, res) => {

  // If vault is empty, return error
  if (!vault.encryptedVault) {
    return res.status(404).json({ error: "Vault empty" });
  }

  // Send encrypted vault back to client
  res.json({
    encryptedVault: vault.encryptedVault,
    version: vault.version,
  });
});

// Update encrypted vault with version conflict detection
router.post("/update", requireAuth, requireDevice, rateLimit, (req, res) => {

  // Extract encrypted vault and current version from client
  const { encryptedVault, version } = req.body;

  // Validate input fields
  if (!encryptedVault || version === undefined) {
    return res.status(400).json({ error: "Invalid request" });
  }

  // Prevent overwriting if client version is outdated
  if (version !== vault.version) {
    return res.status(409).json({
      error: "Version conflict",
      currentVersion: vault.version,
    });
  }

  // Update vault and increment version for synchronization
  vault.encryptedVault = encryptedVault;
  vault.version++;

  res.json({
    message: "Vault updated",
    newVersion: vault.version,
  });
});

module.exports = router;
