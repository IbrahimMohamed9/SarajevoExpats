const express = require("express");
const router = express.Router();
const {
  getAllPlaces,
  createPlaces,
  deletePlacesById,
  updatePlacesById,
  getPlacesById,
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
 *         - type
 *         - link
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the place
 *         content:
 *           type: string
 *           description: Description of the place
 *         picture:
 *           type: string
 *           description: URL of the place picture
 *         pictureDescription:
 *           type: string
 *           description: Description of the place picture
 *         phone:
 *           type: string
 *           description: Contact phone number (either phone or email must be provided)
 *         email:
 *           type: string
 *           description: Contact email address (either phone or email must be provided)
 *         type:
 *           type: string
 *           description: The type of the place (must exist in PlaceTypes collection)
 *         link:
 *           type: string
 *           description: URL for more information about the place
 */

/**
 * @swagger
 * /places:
 *   get:
 *     summary: Returns all places
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Place'
 *     responses:
 *       201:
 *         description: Place created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The place added successfully
 *                 place:
 *                   $ref: '#/components/schemas/Place'
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
router.route("/").get(getAllPlaces).post(createPlaces);

/**
 * @swagger
 * /places/{id}:
 *   get:
 *     summary: Get a place by ID
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place ID
 *     responses:
 *       200:
 *         description: Place details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       404:
 *         description: Place not found
 *   put:
 *     summary: Update a place
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Place'
 *     responses:
 *       200:
 *         description: Place updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       404:
 *         description: Place not found
 *   delete:
 *     summary: Delete a place
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place ID
 *     responses:
 *       200:
 *         description: Place deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The place deleted successfully
 *       404:
 *         description: Place not found
 */
router
  .route("/:id")
  .get(getPlacesById)
  .put(updatePlacesById)
  .delete(deletePlacesById);

router.param("id", validateMongoId);

module.exports = router;
