const puppeteer = require("puppeteer");

let browser;
const initializeBrowser = async () => {
  try {
    if (!browser) {
      // browser = await puppeteer.launch({
      //   headless: true,
      //   args: ["--no-sandbox"],
      // });

      browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox"],
        product: "chrome",
        channel: "chrome",
      });
      return { browser, first: true };
    }
    return { browser, first: false };
  } catch (error) {
    console.error("Error launching browser:", error);
    throw new Error("Failed to initialize browser: " + error.message);
  }
};

module.exports = initializeBrowser;
