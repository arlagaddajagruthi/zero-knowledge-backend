const express = require("express");
const router = express.Router();
const { verifyLogin } = require("../services/auth.service");

router.post("/login", (req, res) => {
  const { username, proof } = req.body;

  if (!username || !proof) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  const result = verifyLogin(username, proof);

  if (!result) {
    return res.status(401).json({ error: "Authentication failed" });
  }

  res.json({
    message: "Login successful",
    token: result.token,
  });
});

module.exports = router;
