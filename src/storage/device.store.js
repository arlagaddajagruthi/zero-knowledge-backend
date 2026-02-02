const devices = new Map();

module.exports = {
  register(deviceId) {
    if (!devices.has(deviceId)) {
      devices.set(deviceId, { revoked: false });
    }
  },

  revoke(deviceId) {
    if (devices.has(deviceId)) {
      devices.get(deviceId).revoked = true;
    }
  },

  isRevoked(deviceId) {
    return devices.has(deviceId) && devices.get(deviceId).revoked;
  },
};
