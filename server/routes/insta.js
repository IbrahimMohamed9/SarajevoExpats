const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");
const fetchPosts = require("../utils/instagram/fetchPosts");
const login = require("../utils/instagram/login");
require("dotenv").config();

let browser;

router.route("/").get(async (req, res) => {
  browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
    product: "chrome",
    channel: "chrome",
  });
});

router.route("/recent").get(async (req, res) => {
  let browser;
  try {
    const page = await browser.newPage();

    await login(page);
    const posts = await fetchPosts(page);
    await browser.close();
    res.json(posts);
  } catch (error) {
    console.error("Error scraping recent Instagram posts:", error);
    res.status(500).json({ error: "Failed to fetch recent Instagram posts" });
  }
});

module.exports = router;
