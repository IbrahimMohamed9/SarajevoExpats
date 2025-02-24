/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - content
 *         - images
 *         - videos
 *         - url
 *         - timestamp
 *       properties:
 *         content:
 *           type: string
 *           description: The content/caption of the Instagram post
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs from the Instagram post
 *         videos:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of video URLs from the Instagram post
 *         url:
 *           type: string
 *           description: URL of the Instagram post
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the post was created
 *         pinned:
 *           type: boolean
 *           description: Whether the event is pinned to the top
 *           default: false
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/events:
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
 *     summary: Fetch and create new events from Instagram
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     description: Fetches recent posts from Instagram and creates them as events.
 *     responses:
 *       201:
 *         description: Events successfully created from Instagram posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The event added successfully
 *                 subEvents:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
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

/**
 * @swagger
 * /api/events/{url}:
 *   post:
 *     summary: Fetch and create new event from Instagram post
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     description: Fetches post from Instagram and creates it as event.
 *     responses:
 *       201:
 *         description: Event successfully created from Instagram posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The event added successfully
 *                 subEvents:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
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


/**
 * @swagger
 * /api/events/pinned:
 *   get:
 *     summary: Returns all pinned events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of pinned events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
/**
 * @swagger
 * /api/events/{id}:
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
/**
 * @swagger
 * /api/events/delete-image/{id}:
 *   delete:
 *     summary: Delete an image from an event
 *     tags: [Events]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - displayUrl
 *             properties:
 *               displayUrl:
 *                 type: string
 *                 description: URL of the image to delete
 *     responses:
 *       200:
 *         description: Image successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image deleted successfully
 *       400:
 *         description: Invalid input or image URL not found
 *       401:
 *         description: Unauthorized - Invalid or missing admin token
 *       404:
 *         description: Event not found
 */
