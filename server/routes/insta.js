const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");
const postsFromInstagram = require("../utils/instagram/fetchPosts");
require("dotenv").config();

/**
 * @swagger
 * tags:
 *   name: Instagram
 *   description: Instagram scraping operations
 */

/**
 * @swagger
 * /api/insta:
 *   get:
 *     summary: Get Instagram posts from maptobe.app
 *     tags: [Instagram]
 *     responses:
 *       200:
 *         description: Successfully retrieved Instagram posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       imageUrl:
 *                         type: string
 *                       postUrl:
 *                         type: string
 *                       content:
 *                         type: string
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
router.route("/").get(async (req, res) => {
  try {
    console.log("Starting Instagram scrape for maptobe.app");

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();

    // Login to Instagram first
    await loginToInstagram(page);

    // Navigate to the Instagram page
    await page.goto("https://www.instagram.com/maptobe.app/", {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // Wait for posts to load
    await page.waitForSelector("article img", { timeout: 10000 });

    // Scrape the posts
    const posts = await page.evaluate(() => {
      const articles = document.querySelectorAll("article img");
      const data = [];

      articles.forEach((img) => {
        const post = img.closest("article");
        if (!post) return;

        const anchor = post.querySelector("a");
        const content = img.getAttribute("alt") || "";

        data.push({
          imageUrl: img.getAttribute("src"),
          postUrl: anchor
            ? "https://instagram.com" + anchor.getAttribute("href")
            : null,
          content: content,
        });
      });

      return data.slice(0, 12); // Get only first 12 posts
    });

    await browser.close();

    // Cache the results
    cachedData = { posts };
    lastFetch = Date.now();

    return res.json(cachedData);
  } catch (error) {
    console.error("Error scraping Instagram:", {
      message: error.message,
      stack: error.stack,
    });

    // Check if it's a timeout error
    if (error.name === "TimeoutError") {
      return res.status(429).json({
        message: "Instagram is rate limiting requests. Please try again later.",
        error: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to fetch Instagram posts",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/insta/recent:
 *   get:
 *     summary: Get Instagram posts from the last two months
 *     tags: [Instagram]
 *     responses:
 *       200:
 *         description: Successfully retrieved recent Instagram posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       imageUrl:
 *                         type: string
 *                       postUrl:
 *                         type: string
 *                       content:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
router.route("/recent").get(async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    const posts = await postsFromInstagram(page);
    await browser.close();
    res.json(posts);
  } catch (error) {
    console.error("Error scraping recent Instagram posts:", error);
    res.status(500).json({ error: "Failed to fetch recent Instagram posts" });
  }
});

module.exports = router;
