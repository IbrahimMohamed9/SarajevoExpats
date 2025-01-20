async function login(page) {
  try {
    console.log("Logging into Instagram...");
    await page.goto("https://www.instagram.com/accounts/login/", {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    await page.waitForSelector(
      'input[aria-label="Phone number, username, or email"]'
    );

    await page.type(
      'input[aria-label="Phone number, username, or email"]',
      process.env.INSTAGRAM_USERNAME
    );
    console.log("Entered username");
    await page.type('input[name="password"]', process.env.INSTAGRAM_PASSWORD);
    console.log("Entered password");
    await page.click('button[type="submit"]');
    console.log("Login successful");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    await page
      .waitForSelector('svg[aria-label="Instagram"]', { timeout: 10000 })
      .catch(() => {
        throw new Error("Login failed - could not verify successful login");
      });
  } catch (error) {
    console.error("Instagram login failed:", error);
    throw error;
  }
}

module.exports = login;
