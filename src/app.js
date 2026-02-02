const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const vaultRoutes = require("./routes/vault.routes");
const deviceRoutes = require("./routes/device.routes");

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

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
