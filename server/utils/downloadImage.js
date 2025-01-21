const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const crypto = require("crypto");
const https = require("https");
require("dotenv").config();

const generateUniqueFilename = (url, extension) => {
  const hash = crypto.createHash("md5").update(url).digest("hex");
  return `${hash}${extension}`;
};

const axiosInstance = axios.create({
  timeout: 30000,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    keepAlive: true,
    timeout: 30000,
  }),
  maxRedirects: 5,
  maxContentLength: 50 * 1024 * 1024,
});

const downloadWithRetry = async (url, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axiosInstance({
        url,
        responseType: "arraybuffer",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      return response;
    } catch (error) {
      console.error(
        `Attempt ${attempt}/${retries} failed for ${url}:`,
        error.message
      );
      if (attempt === retries) {
        throw error;
      }
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
};

const downloadImage = async (url) => {
  try {
    const response = await downloadWithRetry(url);

    const contentType = response.headers["content-type"];
    const extension = contentType.includes("jpeg") ? ".jpg" : ".webp";

    const filename = generateUniqueFilename(url, extension);
    const mediaDir = path.join(__dirname, "../media/photos/instagram");

    // Ensure the directory exists
    await fs.mkdir(mediaDir, { recursive: true });

    const filepath = path.join(mediaDir, filename);
    await fs.writeFile(filepath, response.data);

    // Return the relative path for the API
    return `${process.env.PHOTOS_URL}/instagram/${filename}`;
  } catch (error) {
    console.error("Error downloading image:", error.message);
    return null;
  }
};

module.exports = downloadImage;
