/**
 * @swagger
 * tags:
 *   name: Instagram
 *   description: Instagram scraping operations
 */

/**
 * @swagger
 * /api/instagram:
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
