// Authentication service
// Verifies client login using a simplified proof-based approach
// In a real zero-knowledge system, this would involve cryptographic validation

function verifyLogin(username, proof) {

  // Temporary hardcoded check for demo purposes
  // Normally, this would verify a cryptographic proof instead of plain values
  if (username === "testuser" && proof === "dummy-proof") {
    return {
      userId: "user-1",

      // Dummy JWT token returned after successful authentication
      token: "dummy-jwt-token",
    };
  }

  // Return null if authentication fails
  return null;
}

module.exports = { verifyLogin };
