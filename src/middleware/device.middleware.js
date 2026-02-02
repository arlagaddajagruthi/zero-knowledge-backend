const deviceStore = require("../storage/device.store");

module.exports = function requireDevice(req, res, next) {
  const deviceId = req.headers["x-device-id"];

  if (!deviceId) {
    return res.status(400).json({ error: "Device ID missing" });
  }

  deviceStore.register(deviceId);

  if (deviceStore.isRevoked(deviceId)) {
    return res.status(403).json({ error: "Device access revoked" });
  }

  req.deviceId = deviceId;
  next();
};
