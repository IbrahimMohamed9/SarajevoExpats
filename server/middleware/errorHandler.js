const fs = require("fs");
const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "SERVER Error",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      res.json({
        title: "Unknown Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }

  const logEntry = ` [${new Date().toISOString()}] IP: ${req.ip} "${
    req.method
  } ${req.url}" ${statusCode} - ${err.message}\n Stack: ${err.stack}\n`;

  fs.appendFileSync("error.log", logEntry);
};

module.exports = errorHandler;
