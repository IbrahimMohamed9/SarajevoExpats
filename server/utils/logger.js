const fs = require("fs").promises;
const path = require("path");

const ERROR_LOG_FILE = path.join(__dirname, "../error.log");

async function logError(message, error) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n${error?.stack || error}\n\n`;

  try {
    await fs.appendFile(ERROR_LOG_FILE, logEntry);
  } catch (err) {
    console.error("Failed to write to error log:", err);
  }
}

module.exports = {
  logError,
};
