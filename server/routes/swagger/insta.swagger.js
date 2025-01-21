/**
 * @swagger
 * tags:
 *   name: Instagram
 *   description: Instagram scraping operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InstagramPost:
 *       type: object
 *       properties:
 *         imageUrl:
 *           type: string
 *           description: URL of the Instagram post image
 *         postUrl:
 *           type: string
 *           description: URL of the Instagram post
 *         content:
 *           type: string
 *           description: Content/caption of the Instagram post
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the post was created
 */

/**
 * @swagger
 * /api/insta:
 *   get:
 *     tags:
 *       - Instagram
 *     summary: Launch Instagram browser instance
 *     description: Initializes a new Chrome browser instance using Puppeteer for Instagram automation
 *     responses:
 *       200:
 *         description: Browser instance successfully launched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Browser instance launched successfully"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to launch browser instance"
 */

/**
 * @swagger
 * /api/insta/recent:
 *   get:
 *     summary: Get recent Instagram posts
 *     tags: [Instagram]
 *     description: Retrieves recent posts from Instagram within the last two months
 *     responses:
 *       200:
 *         description: Successfully retrieved recent Instagram posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InstagramPost'
 *       429:
 *         description: Too many requests to Instagram
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Rate limit exceeded"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch Instagram posts"
 */
