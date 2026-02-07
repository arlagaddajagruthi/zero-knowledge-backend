// Authentication routes
// Handles user login using zero-knowledge style proof verification

const express = require("express");
const router = express.Router();
const { verifyLogin } = require("../services/auth.service");

// Login endpoint
router.post("/login", (req, res) => {

  // Extract username and cryptographic proof from request body
  const { username, proof } = req.body;

  // Validate input fields
  if (!username || !proof) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  // Verify login using client-generated proof
  // The server never receives the actual password
  const result = verifyLogin(username, proof);

  // If verification fails, deny access
  if (!result) {
    return res.status(401).json({ error: "Authentication failed" });
  }

  // On successful authentication, return a session token
  res.json({
    message: "Login successful",
    token: result.token,
  });
});

module.exports = router;
