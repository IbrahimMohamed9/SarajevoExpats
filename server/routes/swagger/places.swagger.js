/**
 * @swagger
 * components:
 *   schemas:
 *     Place:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - pictures
 *         - link
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the place
 *         content:
 *           type: string
 *           description: Content or description of the place
 *         pictures:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs or paths to the place's pictures
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

/**
 * @swagger
 * /api/places/by-place-type/{placeType}:
 *   get:
 *     summary: Get places by place type
 *     description: Retrieves all places that match the specified place type
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: placeType
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of place to filter by (e.g., restaurant, cafe, park)
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Place'
 *       404:
 *         description: No places found for the specified type
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /api/places/{id}/images/{index}:
 *   delete:
 *     summary: Delete an image from a place by index
 *     tags: [Places]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place ID
 *       - in: path
 *         name: index
 *         schema:
 *           type: integer
 *         required: true
 *         description: The index of the image to delete
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image deleted successfully
 *                 place:
 *                   $ref: '#/components/schemas/Place'
 *       400:
 *         description: Invalid image index
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Place not found
 */

/**
 * @swagger
 * /api/places/{id}/images/reorder:
 *   put:
 *     summary: Reorder images in a place
 *     tags: [Places]
 *     security:
 *       - BearerAuth: []
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
 *             type: object
 *             required:
 *               - fromIndex
 *               - toIndex
 *             properties:
 *               fromIndex:
 *                 type: integer
 *                 description: The current index of the image
 *               toIndex:
 *                 type: integer
 *                 description: The new index for the image
 *     responses:
 *       200:
 *         description: Images reordered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Images reordered successfully
 *                 place:
 *                   $ref: '#/components/schemas/Place'
 *       400:
 *         description: Invalid index
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Place not found
 */
