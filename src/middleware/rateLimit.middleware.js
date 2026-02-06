// Simple in-memory rate limiting middleware
// Limits how many requests a client IP can make within one minute

const requests = new Map();

module.exports = function rateLimit(req, res, next) {

  // Use client IP address as the unique key
  const key = req.ip;

  // Current timestamp
  const now = Date.now();

  // Initialize request history for this IP if it doesn't exist
  if (!requests.has(key)) {
    requests.set(key, []);
  }

  // Keep only timestamps from the last 60 seconds
  const timestamps = requests.get(key).filter(
    (time) => now - time < 60000
  );

  // Add current request time
  timestamps.push(now);

  // Update stored timestamps for this IP
  requests.set(key, timestamps);

  // If more than 10 requests are made within one minute, block the client
  if (timestamps.length > 10) {
    return res.status(429).json({
      error: "Rate limit exceeded",
    });
  }

  // Allow request to proceed if under limit
  next();
};
