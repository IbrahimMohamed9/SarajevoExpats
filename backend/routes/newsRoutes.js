const express = require("express");
const router = express.Router();
const {
  getAllNews,
  createNews,
  deleteNewsById,
  updateNewsById,
  getNewsById,
} = require("../controllers/newsController");
const { validateMongoId } = require("../utils");

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - picture
 *         - sources
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the news article
 *         content:
 *           type: string
 *           description: Content of the news article
 *         picture:
 *           type: string
 *           description: URL of the news picture
 *         pictureDescription:
 *           type: string
 *           description: Description of the news picture
 *         sources:
 *           type: string
 *           description: Source of the news article (e.g., Reuters, AP, etc.)
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Returns all news articles
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       201:
 *         description: News article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The news article added successfully
 *                 news:
 *                   $ref: '#/components/schemas/News'
 *       400:
 *         description: Invalid input data or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All fields are mandatory
 */
router.route("/").get(getAllNews).post(createNews);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get a news article by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news article ID
 *     responses:
 *       200:
 *         description: News article details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: News article not found
 *   put:
 *     summary: Update a news article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news article ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: News article updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: News article not found
 *   delete:
 *     summary: Delete a news article
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news article ID
 *     responses:
 *       200:
 *         description: News article deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The news article deleted successfully
 *       404:
 *         description: News article not found
 */
router
  .route("/:id")
  .get(getNewsById)
  .put(updateNewsById)
  .delete(deleteNewsById);

router.param("id", validateMongoId);

module.exports = router;
