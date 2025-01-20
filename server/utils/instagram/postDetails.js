const timeAgoToTimestamp = require("../timeAgoToTimestamp");

async function getPostDetails(page, postUrl) {
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

  const timestamp = await timeAgoToTimestamp(rawDetails.timeText);

  return {
    ...rawDetails,
    timestamp,
  };
}

module.exports = getPostDetails;
