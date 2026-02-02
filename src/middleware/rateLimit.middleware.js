// src/middleware/rateLimit.middleware.js

const requests = new Map();

module.exports = function rateLimit(req, res, next) {
  const key = req.ip;
  const now = Date.now();

  if (!requests.has(key)) {
    requests.set(key, []);
  }

  const timestamps = requests.get(key).filter(
    (time) => now - time < 60000
  );

  timestamps.push(now);
  requests.set(key, timestamps);

  if (timestamps.length > 10) {
    return res.status(429).json({
      error: "Rate limit exceeded",
    });
  }

  next();
};
