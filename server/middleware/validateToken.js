const errorHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = errorHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;

  if (!(authHeader && authHeader.startsWith("Bearer"))) {
    console.log(req.header);
    res.status(401);
    throw new Error("User is not authorized or token is missing");
  }

  token = authHeader.split(" ")[1];
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
