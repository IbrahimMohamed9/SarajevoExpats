const jwt = require("jsonwebtoken");
const { USER_TYPES } = require("../constants");

const validateAdminToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.user.type !== USER_TYPES.ADMIN) {
      return res.status(403).json({ error: "Admin access required", decoded });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Admin token validation error:", error);
    return res.status(401).json({ error: "Token validation failed" });
  }
};

module.exports = validateAdminToken;
