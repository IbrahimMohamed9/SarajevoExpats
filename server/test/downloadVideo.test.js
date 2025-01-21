const { downloadVideo } = require("../utils/downloadVideo");
const puppeteer = require("puppeteer");
const getPostDetails = require("../utils/instagram/postDetails");

async function testVideoDownload() {
  try {
    // Test 2: Blob URL conversion and download
    console.log("\nTesting blob URL conversion and download...");
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox"],
      product: "chrome",
      channel: "chrome",
    });
    const page = await browser.newPage();

    // Navigate to Instagram post
    const postUrl = "https://www.instagram.com/maptobe.app/p/C-8FxDzIUZM/";
    await getPostDetails(page, postUrl);

    await browser.close();
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the test
testVideoDownload();
