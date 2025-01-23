const crypto = require("crypto");

const generateUniqueFilename = (input, extension) => {
  const hash = crypto.createHash("md5").update(input).digest("hex");
  return `${hash}${extension}`;
};

module.exports = generateUniqueFilename;
