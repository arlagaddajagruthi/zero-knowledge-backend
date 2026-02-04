const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const vaultRoutes = require("./routes/vault.routes");
const deviceRoutes = require("./routes/device.routes");
const healthRoutes = require("./routes/health.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/ping", (req, res) => {
  res.json({ message: "Backend running" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/vault", vaultRoutes);
app.use("/device", deviceRoutes);
app.use("/", healthRoutes);

// Error middleware (must be LAST)
app.use(errorHandler);

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
