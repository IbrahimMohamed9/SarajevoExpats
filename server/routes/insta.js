const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");
const fetchPosts = require("../utils/instagram/fetchPosts");
require("dotenv").config();

/**
 * @swagger
 * tags:
 *   name: Instagram
 *   description: Instagram scraping operations
 */

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

    const posts = await fetchPosts(page);
    await browser.close();
    res.json(posts);
  } catch (error) {
    console.error("Error scraping recent Instagram posts:", error);
    res.status(500).json({ error: "Failed to fetch recent Instagram posts" });
  }
});

module.exports = router;
