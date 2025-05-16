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
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the place
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
 * /api/places/user-submit:
 *   post:
 *     summary: Submit a new place as a non-authorized user
 *     description: Allows non-authorized users to submit a place which will be marked as unapproved until reviewed by an admin
 *     tags: [Places]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - type
 *               - files
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the place
 *               content:
 *                 type: string
 *                 description: Content or description of the place
 *               pictureDescription:
 *                 type: string
 *                 description: Description of the pictures
 *               type:
 *                 type: string
 *                 description: Type or category of the place
 *               phone:
 *                 type: string
 *                 description: Contact phone number (at least one contact method required)
 *               email:
 *                 type: string
 *                 description: Contact email address (at least one contact method required)
 *               link:
 *                 type: string
 *                 description: External link or URL for the place (at least one contact method required)
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Image files to upload (up to 10 files, maximum 0.5GB each)
 *     responses:
 *       201:
 *         description: Place submitted successfully for approval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Your place has been submitted for approval
 *                 place:
 *                   $ref: '#/components/schemas/Place'
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/places/by-place-type/{type}:
 *   get:
 *     summary: Get places by place type
 *     description: Retrieves all places that match the specified place type
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: type
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
 * /api/places/{id}/images:
 *   delete:
 *     summary: Delete an image from a place by URL
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
 *               - imageUrl
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 description: URL of the image to delete
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
 *         description: Invalid image URL
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Place not found
 */

/**
 * @swagger
 * /api/places/{id}/approve:
 *   put:
 *     summary: Approve a user-submitted place
 *     description: Approves a place that was submitted by a non-authorized user. If the place type doesn't exist, it will be created. If tags don't exist for the place type, they will be created.
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
 *     responses:
 *       200:
 *         description: Place approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Place approved successfully
 *                 place:
 *                   $ref: '#/components/schemas/Place'
 *       400:
 *         description: Place is already approved
 *       401:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Place not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/places/{id}/images/reorder:
 *   put:
 *     summary: Reorder images in a place
 *     description: Moves an image from one position to another. If the target position exceeds the array length, the image will be moved to the last position.
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
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of URLs of the images to move
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
 *         description: Invalid source index
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Place not found
 */
