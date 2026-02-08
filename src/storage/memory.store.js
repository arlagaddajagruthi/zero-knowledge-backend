// In-memory vault storage
// Stores only encrypted vault data and its version for synchronization

module.exports = {

  // Holds the encrypted vault received from client devices
  encryptedVault: null,

  // Version number used to detect conflicts during updates
  version: 0,
};
