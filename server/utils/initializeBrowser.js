const puppeteer = require("puppeteer");

let browser;
const initializeBrowser = async () => {
  try {
    // browser = await puppeteer.launch({
    //   headless: true,
    //   args: ["--no-sandbox"],
    // });

    if (!browser) {
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
  }
};

module.exports = initializeBrowser;
