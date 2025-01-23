const fs = require("fs");
const path = require("path");
const https = require("https");
const generateUniqueFilename = require("./generateUniqueFilename");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

async function downloadVideo(url, instagram = false) {
  try {
    const filename = generateUniqueFilename(url, ".mp4");
    const dirName = instagram
      ? process.env.instagram_videos_DIR
      : process.env.videos_DIR;

    const mediaDir = path.join(__dirname, "..", dirName);
    if (!fs.existsSync(mediaDir)) {
      fs.mkdirSync(mediaDir, { recursive: true });
    }
    const filePath = path.join(mediaDir, filename);

    if (!url.startsWith("https:")) {
      throw new Error(`Unsupported URL protocol: ${url}`);
    }

    return new Promise((resolve, reject) => {
      https
        .get(url, (response) => {
          if (response.statusCode !== 200) {
            reject(
              new Error(`Failed to download video: ${response.statusCode}`)
            );
            return;
          }
          const fileStream = fs.createWriteStream(filePath);
          response.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            resolve(`${process.env.BASE_URL}/${dirName}/${filename}`);
          });
          fileStream.on("error", (err) => {
            fs.unlink(filePath, () => {});
            reject(err);
          });
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  } catch (error) {
    console.error("Error downloading video:", error);
    return null;
  }
}

module.exports = downloadVideo;
