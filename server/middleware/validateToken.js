const errorHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { extractToken } = require("../utils/tokenExtractor");

const validateToken = errorHandler(async (req, res, next) => {
  // Extract token using the utility function
  const token = extractToken(req);

  if (!token) {
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("User is not authorized");
    }
    req.user = decoded.user;
    next();
  });
});

module.exports = validateToken;
