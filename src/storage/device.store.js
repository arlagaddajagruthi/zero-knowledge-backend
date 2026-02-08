// In-memory device store
// Keeps track of registered devices and whether they have been revoked

const devices = new Map();

module.exports = {

  // Register a device if it does not already exist
  register(deviceId) {
    if (!devices.has(deviceId)) {
      devices.set(deviceId, { revoked: false });
    }
  },

  // Revoke a device by marking it as blocked
  // Used when a device is lost or compromised
  revoke(deviceId) {
    if (devices.has(deviceId)) {
      devices.get(deviceId).revoked = true;
    }
  },

  // Check whether a device has been revoked
  isRevoked(deviceId) {
    return devices.has(deviceId) && devices.get(deviceId).revoked;
  },
};
