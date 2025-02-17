const jwt = require("jsonwebtoken");
const { USER_TYPES } = require("../constants");

const validateAdminToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const tokenFromCookie = req.cookies?.access_token;

    let token;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (tokenFromCookie) {
      token = tokenFromCookie.split(" ")[1];
    } else {
      const ip = req.ip; // Will now return the client's IP even behind a proxy
      const forwardedIp = req.headers['x-forwarded-for']; // For additional info
  
      console.log(`Your IP is: ${ip}, Forwarded IP: ${forwardedIp}`)
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
