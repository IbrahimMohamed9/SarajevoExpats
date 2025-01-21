const express = require("express");
const router = express.Router();
const fetchPosts = require("../utils/instagram/fetchPosts");
const login = require("../utils/instagram/login");
const initializeBrowser = require("../utils/initializeBrowser");
require("dotenv").config();

router.route("/recent").get(async (req, res) => {
  try {
    const { browser, first } = await initializeBrowser();
    if (!browser) {
      return res.status(400).json({
        error:
          "Browser instance not initialized. Please call /api/insta endpoint first",
      });
    }

    const page = await browser.newPage();
    if (first) {
      await login(page);
    }

    const posts = await fetchPosts(page, first);
    await page.close();
    res.json(posts);
  } catch (error) {
    console.error("Error scraping recent Instagram posts:", error);
    res.status(500).json({ error: "Failed to fetch recent Instagram posts" });
  }
});

module.exports = router;
