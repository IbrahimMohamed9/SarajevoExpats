const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const { USER_TYPES } = require("../constants");

const ValidateAdminOrMeToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await Users.findById(decoded.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isAdmin = user.type === USER_TYPES.ADMIN;
    const isResourceOwner = req.params.userId === user.id.toString();

    if (!isAdmin && !isResourceOwner) {
      return res.status(403).json({ error: "Access denied" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token validation error:", error);
    return res.status(401).json({ error: "Token validation failed" });
  }
};

module.exports = ValidateAdminOrMeToken;
