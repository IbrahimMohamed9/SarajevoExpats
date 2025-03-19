/**
 * @swagger
 * components:
 *   schemas:
 *     PlaceTag:
 *       type: object
 *       required:
 *         - type
 *         - tag
 *       properties:
 *         type:
 *           type: string
 *           description: The place type (must exist in PlaceTypes collection)
 *         tag:
 *           type: string
 *           description: The tag name
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/place-tags:
 *   get:
 *     summary: Get all place tags
 *     tags: [Place Tags]
 *     responses:
 *       200:
 *         description: List of all place tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlaceTag'
 *   post:
 *     summary: Create a new place tag
 *     tags: [Place Tags]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaceTag'
 *     responses:
 *       201:
 *         description: Place tag created successfully
 *       401:
 *         description: Not authorized
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/place-tags/by-place-type/{type}:
 *   get:
 *     summary: Get tags by place type
 *     description: Retrieves all tags that match the specified place type
 *     tags: [Place Tags]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of place to filter tags by
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlaceTag'
 *       404:
 *         description: No tags found for the specified place type
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/place-tags/{id}:
 *   put:
 *     summary: Update a place tag
 *     tags: [Place Tags]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place tag ID (must be a valid MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaceTag'
 *     responses:
 *       200:
 *         description: Place tag updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Place tag not found
 *   delete:
 *     summary: Delete a place tag
 *     tags: [Place Tags]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place tag ID (must be a valid MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Place tag deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Place tag not found
 */

/**
 * @swagger
 * /api/places/{id}/tags:
 *   post:
 *     summary: Add a tag to a place
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
 *             type: object
 *             required:
 *               - tag
 *             properties:
 *               tag:
 *                 type: string
 *                 description: The tag to add to the place
 *     responses:
 *       200:
 *         description: Tag added to place successfully
 *       400:
 *         description: Invalid input or tag already exists for this place
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Place not found
 *   delete:
 *     summary: Remove a tag from a place
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
 *             type: object
 *             required:
 *               - tag
 *             properties:
 *               tag:
 *                 type: string
 *                 description: The tag to remove from the place
 *     responses:
 *       200:
 *         description: Tag removed from place successfully
 *       400:
 *         description: Invalid input or place does not have this tag
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Place not found
 */
