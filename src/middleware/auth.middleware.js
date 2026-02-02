module.exports = function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  if (token !== "dummy-jwt-token") {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = { userId: "user-1" };
  next();
};
