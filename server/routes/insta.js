const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

// Cache mechanism to store results and avoid too frequent scraping
let cachedData = null;
let lastFetch = null;
const CACHE_DURATION = 1800000; // 30 minutes in milliseconds

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
 *                       caption:
 *                         type: string
 *       429:
 *         description: Too many requests
 *       500:
 *         description: Internal server error
 */
router.route("/").get(async (req, res) => {
  try {
    // Check cache first
    if (cachedData && lastFetch && Date.now() - lastFetch < CACHE_DURATION) {
      return res.json(cachedData);
    }

    console.log("Starting Instagram scrape for maptobe.app");

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set viewport to desktop size
    await page.setViewport({ width: 1280, height: 800 });

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
        const caption = img.getAttribute("alt") || "";

        data.push({
          imageUrl: img.getAttribute("src"),
          postUrl: anchor
            ? "https://instagram.com" + anchor.getAttribute("href")
            : null,
          caption: caption,
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
 *                       caption:
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
  try {
    console.log("Starting Instagram scrape for recent posts");
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to the Instagram page
    await page.goto("https://www.instagram.com/maptobe.app/", {
      waitUntil: "networkidle0",
      timeout: 60000,
    });

    // Wait for posts to load
    await page.waitForSelector("article img", { timeout: 10000 });

    // Calculate the date from two months ago
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    // First get all post links
    const postLinks = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll("article a[href*='/p/']"));
      return anchors.map(a => a.href).filter((href, index, self) => self.indexOf(href) === index);
    });

    console.log(`Found ${postLinks.length} post links`);
    const processedPosts = [];

    // Process each post link
    for (const postUrl of postLinks) {
      try {
        console.log(`Processing post: ${postUrl}`);
        
        // Navigate to post page
        await page.goto(postUrl, {
          waitUntil: "networkidle0",
          timeout: 30000,
        });

        // Get post details
        const postDetails = await page.evaluate(() => {
          // Get all media elements (images and videos)
          const mediaElements = Array.from(document.querySelectorAll('img[src*="/p/"], video[src*="/p/"], source[src*="/p/"]'));
          const mediaUrls = new Set(); // Use Set to avoid duplicates
          
          mediaElements.forEach(element => {
            if (element.tagName.toLowerCase() === 'source' && element.src) {
              mediaUrls.add({ type: 'video', url: element.src });
            } else if (element.tagName.toLowerCase() === 'video' && element.src) {
              mediaUrls.add({ type: 'video', url: element.src });
            } else if (element.tagName.toLowerCase() === 'img' && element.src && !element.src.includes('profile')) {
              mediaUrls.add({ type: 'image', url: element.src });
            }
          });

          // Get time
          const timeElement = document.querySelector('time');
          const timeText = timeElement?.textContent || '';

          // Get caption
          const captionElement = document.querySelector('h1') || document.querySelector('div._a9zs');
          const caption = captionElement ? captionElement.textContent : '';

          return {
            timeText,
            caption,
            media: Array.from(mediaUrls)
          };
        });

        // Check if post is recent (less than 9 weeks)
        const timeText = postDetails.timeText.toLowerCase();
        const weekMatch = timeText.match(/(\d+)\s*w/);
        
        let isRecent = false;
        if (weekMatch) {
          const weeks = parseInt(weekMatch[1]);
          isRecent = weeks < 9;
        } else {
          isRecent = timeText.includes('d') || 
                    timeText.includes('h') || 
                    timeText.includes('m') ||
                    timeText.includes('just now');
        }

        if (isRecent && postDetails.media.length > 0) {
          processedPosts.push({
            postUrl,
            caption: postDetails.caption,
            timeAgo: postDetails.timeText,
            media: postDetails.media
          });
          console.log(`Added post from ${postDetails.timeText} ago with ${postDetails.media.length} media items`);
        }

      } catch (error) {
        console.error(`Error processing post ${postUrl}:`, error);
        continue;
      }
    }

    await browser.close();

    if (processedPosts.length > 0) {
      // Cache the results
      cachedData = { posts: processedPosts };
      lastFetch = Date.now();

      return res.json({
        posts: processedPosts,
        totalPosts: processedPosts.length,
        dateRange: {
          from: twoMonthsAgo.toISOString(),
          to: new Date().toISOString(),
        },
      });
    }

    res.json({
      posts: [],
      totalPosts: 0,
      dateRange: {
        from: twoMonthsAgo.toISOString(),
        to: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error scraping recent Instagram posts:", error);
    res.status(500).json({ error: "Failed to fetch recent Instagram posts" });
  }
});

module.exports = router;
