const fs = require("fs").promises;
const path = require("path");
const axios = require("axios");
const https = require("https");
const generateUniqueFilename = require("./generateUniqueFilename");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

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

const downloading = async (url, retries = 3) => {
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
      if (attempt === retries) throw error;
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
};

const downloadImage = async (url, instagram = false) => {
  try {
    if (!url.startsWith("https:")) {
      throw new Error(`Unsupported URL protocol: ${url}`);
    }

    const response = await downloading(url);
    const contentType = response.headers["content-type"];

    if (!contentType.includes("image/"))
      throw new Error(`Invalid content type: ${contentType}`);

    const extension =
      contentType.includes("jpeg") || contentType.includes("jpg")
        ? ".jpg"
        : contentType.includes("png")
        ? ".png"
        : ".webp";

    const filename = generateUniqueFilename(url, extension);
    const dirName = instagram
      ? process.env.instagram_photos_DIR
      : process.env.photos_DIR;

    const mediaDir = path.join(__dirname, "..", dirName);
    await fs.mkdir(mediaDir, { recursive: true });

    const filepath = path.join(mediaDir, filename);
    await fs.writeFile(filepath, response.data);

    return `${process.env.BASE_URL}/${dirName}/${filename}`;
  } catch (error) {
    console.error("Error downloading image:", error.message);
    return null;
  }
};

module.exports = downloadImage;
