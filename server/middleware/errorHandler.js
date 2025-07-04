const fs = require("fs");
const { errorCode } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case errorCode.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
      });
      break;

    case errorCode.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
      });
      break;
    case errorCode.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
      });
      break;

    case errorCode.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
      });
      break;
    case errorCode.SERVER_ERROR:
      res.json({
        title: "SERVER Error",
        message: err.message,
      });
    default:
      res.json({
        title: "Unknown Error",
        message: err.message,
      });
      break;
  }

  const logEntry = ` [${new Date().toISOString()}] IP: ${req.ip} "${
    req.method
  } ${req.url}" ${statusCode} - ${err.message}\n Stack: ${err.stack}\n`;

  fs.appendFileSync("error.log", logEntry);
};

module.exports = errorHandler;
