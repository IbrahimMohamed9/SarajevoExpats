const jwt = require("jsonwebtoken");
const { extractToken } = require("../utils/tokenExtractor");

/**
 * Middleware to decode JWT token if present, but doesn't require authentication
 * Sets req.user if token is valid, otherwise continues without setting req.user
 */
const decodeToken = (req, res, next) => {
  try {
    const token = extractToken(req);

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      } catch (error) {
        console.log(
          "Invalid token provided, continuing as non-authenticated user"
        );
      }
    }

    next();
  } catch (error) {
    console.error("Error in decodeToken middleware:", error);
    next();
  }
};

module.exports = decodeToken;
