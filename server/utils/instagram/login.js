const delay = require("../delay");

async function login(page) {
  try {
    console.log("Logging into Instagram...");
    await page.goto("https://www.instagram.com/accounts/login/", {
      waitUntil: "networkidle0",
      timeout: 60000,
    });
    await delay(2000);
    console.log("Current URL:", page.url());

    await page.waitForSelector(
      'input[aria-label="Phone number, username, or email"]'
    );
    await page.type(
      'input[aria-label="Phone number, username, or email"]',
      process.env.INSTAGRAM_USERNAME
    );
    await page.type('input[name="password"]', process.env.INSTAGRAM_PASSWORD);
    await page.click('button[type="submit"]');
    await delay(8000);

    const currentUrl = page.url();
    if (
      !currentUrl.includes("instagram.com") ||
      currentUrl.includes("accounts/login")
    ) {
      throw new Error("Failed to reach Instagram feed after login");
    }

    console.log("Login successful");
  } catch (error) {
    console.error("Instagram login failed:", error);
    throw error;
  }
}

module.exports = login;
