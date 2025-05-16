const crypto = require("crypto");
const fs = require("fs");

/**
 * Generates a unique filename based on the file content hash
 * @param {string} filePath - The path to the file
 * @param {string} extension - The file extension including the dot
 * @returns {string} - The hashed filename with extension
 */
const generateUniqueFilename = (filePath, extension) => {
  try {
    // Read the file content
    const fileContent = fs.readFileSync(filePath);
    
    // Create a hash of the file content
    const hash = crypto.createHash("sha256").update(fileContent).digest("hex");
    
    // Return the hash with the extension
    return `${hash}${extension}`;
  } catch (error) {
    console.error("Error generating unique filename:", error);
    // Fallback to timestamp + random string if file reading fails
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${timestamp}_${randomString}${extension}`;
  }
};

module.exports = generateUniqueFilename;
