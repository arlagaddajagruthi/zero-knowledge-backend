// Main application entry point
// Sets up Express server, middleware, routes, and starts the backend

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const vaultRoutes = require("./routes/vault.routes");
const deviceRoutes = require("./routes/device.routes");
const healthRoutes = require("./routes/health.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Simple ping endpoint to verify server availability
app.get("/ping", (req, res) => {
  res.json({ message: "Backend running" });
});

// Register application routes
app.use("/auth", authRoutes);
app.use("/vault", vaultRoutes);
app.use("/device", deviceRoutes);
app.use("/", healthRoutes);

// Global error handling middleware (must be registered last)
app.use(errorHandler);

// Start Express server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
