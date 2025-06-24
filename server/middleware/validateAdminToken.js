const jwt = require("jsonwebtoken");
const { USER_TYPES } = require("../constants");
const { extractToken } = require("../utils/tokenExtractor");

const validateAdminToken = (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      if (jwtError instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }

    if (!decoded.user) {
      return res
        .status(403)
        .json({ message: "Access denied. Invalid token structure." });
    }

    if (decoded.user.type !== USER_TYPES.ADMIN) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = validateAdminToken;
