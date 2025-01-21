const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const https = require("https");
const http = require("http");

const generateUniqueFilename = (input, extension) => {
  const hash = crypto.createHash("md5").update(input).digest("hex");
  return `${hash}${extension}`;
};

const getBlobAsBase64 = async (blobUrl) => {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting blob to base64:', error);
    return null;
  }
};

async function downloadVideo(input, isBase64 = false) {
  try {
    const filename = generateUniqueFilename(input, ".mp4");
    const mediaDir = path.join(__dirname, "../media/videos/instagram");

    // Create videos directory if it doesn't exist
    if (!fs.existsSync(mediaDir)) {
      fs.mkdirSync(mediaDir, { recursive: true });
    }

    const filePath = path.join(mediaDir, filename);

    if (isBase64) {
      // Handle base64 data
      const base64Data = input.split(";base64,").pop();
      fs.writeFileSync(filePath, base64Data, { encoding: "base64" });
      return `videos/instagram/${filename}`;
    } else if (input.startsWith("http")) {
      // Handle URL
      return new Promise((resolve, reject) => {
        const protocol = input.startsWith("https:") ? https : http;
        protocol
          .get(input, (response) => {
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
              resolve(`videos/instagram/${filename}`);
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
    } else {
      throw new Error(`Unsupported URL protocol: ${input}`);
    }
  } catch (error) {
    console.error("Error downloading video:", error);
    return null;
  }
}

module.exports = { downloadVideo, getBlobAsBase64 };
