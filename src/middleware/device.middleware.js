// Middleware to validate and track client devices
// Ensures every request comes from a registered and non-revoked device

const deviceStore = require("../storage/device.store");

module.exports = function requireDevice(req, res, next) {

  // Read custom device ID from request headers
  const deviceId = req.headers["x-device-id"];

  // If device ID is not provided, reject the request
  if (!deviceId) {
    return res.status(400).json({ error: "Device ID missing" });
  }

  // Register the device if it is seen for the first time
  deviceStore.register(deviceId);

  // Check whether this device has been revoked or blocked
  if (deviceStore.isRevoked(deviceId)) {
    return res.status(403).json({ error: "Device access revoked" });
  }

  // Attach device ID to request so it can be used in later handlers
  req.deviceId = deviceId;

  // Allow request to continue to the next middleware or route
  next();
};
