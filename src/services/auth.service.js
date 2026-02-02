function verifyLogin(username, proof) {
  if (username === "testuser" && proof === "dummy-proof") {
    return {
      userId: "user-1",
      token: "dummy-jwt-token",
    };
  }
  return null;
}

module.exports = { verifyLogin };
