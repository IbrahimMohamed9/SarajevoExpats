/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the news article
 *         content:
 *           type: string
 *           description: The content of the news article
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get all news articles
 *     tags: [News]
 *     responses:
 *       200:
 *         description: List of all news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *   post:
 *     summary: Create a new news article
 *     tags: [News]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       201:
 *         description: News article created successfully
 *       401:
 *         description: Not authorized
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Get a news article by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news article ID (must be a valid MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: News article details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *   put:
 *     summary: Update a news article
 *     tags: [News]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news article ID (must be a valid MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: News article updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: News article not found
 *   delete:
 *     summary: Delete a news article
 *     tags: [News]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news article ID (must be a valid MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: News article deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: News article not found
 */

/**
 * @swagger
 * /api/news/slides:
 *   get:
 *     summary: Get news articles for slider
 *     tags: [News]
 *     description: Retrieves news articles that are marked to be shown in the slider
 *     responses:
 *       200:
 *         description: List of news articles for slider
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/News'
 *                   - type: object
 *                     properties:
 *                       showInSlider:
 *                         type: boolean
 *                         description: Indicates if the news should be shown in slider
 *       500:
 *         description: Server error
 */
