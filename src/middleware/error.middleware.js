// Global error handling middleware
// Catches unexpected errors and sends a generic response to the client

function errorHandler(err, req, res, next) {

  // Log full error stack to the server console for debugging
  console.error(err.stack);

  // Send a generic error message to avoid exposing internal details
  res.status(500).json({
    error: "Internal server error"
  });
}

module.exports = errorHandler;
