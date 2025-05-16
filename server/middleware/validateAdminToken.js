const jwt = require("jsonwebtoken");
const { USER_TYPES } = require("../constants");
const { extractToken } = require("../utils/tokenExtractor");

const validateAdminToken = (req, res, next) => {
  // Allow requests from the server IP address without token
  // if (req.ip === "46.202.159.229") return next();

  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.user || decoded.user.type !== USER_TYPES.ADMIN) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.error("Token validation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = validateAdminToken;
