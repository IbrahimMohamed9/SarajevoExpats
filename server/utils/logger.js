const fs = require('fs').promises;
const path = require('path');

const LOG_DIR = 'logs';
const ERROR_LOG_FILE = path.join(LOG_DIR, 'error.log');

// Ensure log directory exists
async function ensureLogDir() {
    try {
        await fs.mkdir(LOG_DIR, { recursive: true });
    } catch (err) {
        console.error('Failed to create log directory:', err);
    }
}

// Initialize logging
ensureLogDir();

async function logError(message, error) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n${error?.stack || error}\n\n`;
    
    try {
        await fs.appendFile(ERROR_LOG_FILE, logEntry);
    } catch (err) {
        console.error('Failed to write to error log:', err);
    }
}

module.exports = {
    logError
};
