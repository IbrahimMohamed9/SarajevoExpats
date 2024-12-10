const express = require("express");
const router = express.Router();
const {
  getEvents,
  createEvent,
  deleteEventById,
  updateEventById,
  getEventById,
} = require("../controllers/eventController");
const { validateMongoId } = require("../utils");
const validateToken = require("../middleware/validateToken");

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - picture
 *         - url
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the event
 *         content:
 *           type: string
 *           description: Description of the event
 *         picture:
 *           type: string
 *           description: URL of the event picture
 *         pictureDescription:
 *           type: string
 *           description: Description of the event picture
 *         url:
 *           type: string
 *           description: URL for more information about the event
 *         phone:
 *           type: string
 *           description: Contact phone number (either phone or email must be provided)
 *         email:
 *           type: string
 *           description: Contact email address (either phone or email must be provided)
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Returns all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The event added successfully
 *                 event:
 *                   $ref: '#/components/schemas/Event'
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
router.route("/").get(getEvents).post(validateToken, createEvent);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID (must be a valid MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID (must be a valid MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID (must be a valid MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The event deleted successfully
 *       404:
 *         description: Event not found
 */
router.get("/:id", getEventById);
router
  .route("/:id")
  .all(validateToken)
  .put(updateEventById)
  .delete(deleteEventById);

router.param("id", validateMongoId);

module.exports = router;
