const timeAgoToTimestamp = require("../timeAgoToTimestamp");
const downloadImage = require("./downloadImage");
require("dotenv").config();

async function getPostDetails(page, postUrl) {
  try {
    await page.goto(postUrl, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    const rawDetails = await page.evaluate(async () => {
      const getAllImages = () => {
        const images = Array.from(
          document.querySelectorAll(
            "article div._aagv > img[class*='x5yr21d xu96u03 x10l6tqk']"
          )
        );
        return [...new Set(images.map((img) => img.src))];
      };

      const getAllVideos = () => {
        const videos = Array.from(
          document.querySelectorAll(
            "article div video[class*='x1lliihq x5yr21d xh8yej3']"
          )
        );
        return [...new Set(videos.map((video) => video.src))];
      };

      const clickNext = async () => {
        const nextButton = document.querySelector("button[aria-label='Next']");
        if (nextButton) {
          nextButton.click();
          await new Promise((resolve) => setTimeout(resolve, 500));
          return true;
        }
        return false;
      };

      const imageUrls = new Set();
      const videoUrls = new Set();

      getAllImages().forEach((img) => imageUrls.add(img));
      getAllVideos().forEach((video) => videoUrls.add(video));

      let hasMore = true;
      while (hasMore) {
        hasMore = await clickNext();
        if (hasMore) {
          getAllImages().forEach((img) => imageUrls.add(img));
          getAllVideos().forEach((video) => videoUrls.add(video));
        }
      }

      const timeElement = document.querySelector("time");
      const timeText = timeElement?.textContent || "";

      const contentElement =
        document.querySelector("h1") || document.querySelector("div._a9zs");
      const content = contentElement ? contentElement.textContent : "";

      return {
        content,
        timeText,
        images: [...Array.from(imageUrls)],
        videos: [...Array.from(videoUrls)],
      };
    });

    // Download all images
    const downloadedImages = await Promise.all(
      rawDetails.images.map((url) => downloadImage(url))
    );

    // Filter out failed downloads
    const validImages = downloadedImages.filter((path) => path !== null);
    console.log(`Successfully downloaded ${validImages.length} images`);

    const timestamp = await timeAgoToTimestamp(rawDetails.timeText);

    return {
      content: rawDetails.content,
      images: validImages,
      videos: rawDetails.videos,
      timestamp,
      postUrl,
    };
  } catch (error) {
    console.error("Error getting post details:", error);
    throw error;
  }
}

module.exports = getPostDetails;
