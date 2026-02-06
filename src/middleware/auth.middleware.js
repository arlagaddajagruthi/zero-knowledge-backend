// Middleware to protect routes that require authentication
// This checks whether the client has sent a valid authorization token

module.exports = function requireAuth(req, res, next) {

  // Read Authorization header from the incoming request
  const authHeader = req.headers.authorization;

  // If no Authorization header is present, block access
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  // Extract token from "Bearer <token>" format
  const token = authHeader.split(" ")[1];

  // For now, we compare against a dummy JWT token
  // (In real applications this would be verified using JWT libraries)
  if (token !== "dummy-jwt-token") {
    return res.status(401).json({ error: "Invalid token" });
  }

  // If token is valid, attach user info to the request object
  // This allows protected routes to know which user is making the request
  req.user = { userId: "user-1" };

  // Allow request to proceed to the next middleware or controller
  next();
};
