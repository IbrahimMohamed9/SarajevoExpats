const express = require("express");
const router = express.Router();
const validateAdminToken = require("../middleware/validateAdminToken");
const {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlaceById,
  deletePlaceById,
} = require("../controllers/placeController");
const { validateMongoId } = require("../utils");

/**
 * @swagger
 * components:
 *   schemas:
 *     Place:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - picture
 *         - link
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the place
 *         content:
 *           type: string
 *           description: Content or description of the place
 *         picture:
 *           type: string
 *           description: URL or path to the place's picture
 *         pictureDescription:
 *           type: string
 *           description: Description of the picture
 *         phone:
 *           type: string
 *           description: Contact phone number
 *         email:
 *           type: string
 *           description: Contact email address
 *         link:
 *           type: string
 *           description: External link or URL for the place
 *         type:
 *           type: string
 *           description: Type or category of the place
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/places:
 *   get:
 *     summary: Get all places
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: List of all places
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Place'
 *   post:
 *     summary: Create a new place
 *     tags: [Places]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Place'
 *     responses:
 *       201:
 *         description: Place created successfully
 *       401:
 *         description: Not authorized
 *       400:
 *         description: Invalid input
 */
router.route("/").get(getAllPlaces).post(validateAdminToken, createPlace);

/**
 * @swagger
 * /api/places/{id}:
 *   get:
 *     summary: Get a place by ID
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place ID (must be a valid MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Place details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *   put:
 *     summary: Update a place
 *     tags: [Places]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place ID (must be a valid MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Place'
 *     responses:
 *       200:
 *         description: Place updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Place not found
 *   delete:
 *     summary: Delete a place
 *     tags: [Places]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place ID (must be a valid MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Place deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Place not found
 */
router.get("/:id", getPlaceById);
router
  .route("/:id")
  .all(validateAdminToken)
  .put(updatePlaceById)
  .delete(deletePlaceById);

router.param("id", validateMongoId);

module.exports = router;
