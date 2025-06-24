/**
 * @swagger
 * components:
 *   schemas:
 *     Sponsor:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the sponsor
 *         name:
 *           type: string
 *           description: The name of the sponsor
 *         picture:
 *           type: string
 *           description: URL of the sponsor's picture
 *         pictureDescription:
 *           type: string
 *           description: Description of the sponsor's picture
 *         priority:
 *           type: number
 *           description: Priority level for sorting (higher numbers appear first)
 *         pinned:
 *           type: boolean
 *           description: Whether the sponsor is pinned to the top
 *       required:
 *         - name
 *         - picture
 */

/**
 * @swagger
 * tags:
 *   name: Sponsors
 *   description: The sponsors managing API
 */

/**
 * @swagger
 * /api/sponsors:
 *   get:
 *     summary: Returns the list of all sponsors
 *     tags: [Sponsors]
 *     responses:
 *       200:
 *         description: The list of sponsors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sponsor'
 *   post:
 *     summary: Create a new sponsor
 *     tags: [Sponsors]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - picture
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the sponsor
 *               picture:
 *                 type: string
 *                 description: URL of the sponsor's picture
 *               pictureDescription:
 *                 type: string
 *                 description: Description of the sponsor's picture
 *               priority:
 *                 type: number
 *                 description: Priority level for sorting
 *               pinned:
 *                 type: boolean
 *                 description: Whether the sponsor is pinned to the top
 *     responses:
 *       201:
 *         description: The sponsor was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sponsor'
 *       400:
 *         description: Some required fields are missing
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */

/**
 * @swagger
 * /api/sponsors/{id}:
 *   get:
 *     summary: Get a sponsor by id
 *     tags: [Sponsors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The sponsor id
 *     responses:
 *       200:
 *         description: The sponsor description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sponsor'
 *       404:
 *         description: The sponsor was not found
 *
 *   put:
 *     summary: Update the sponsor by id
 *     tags: [Sponsors]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The sponsor id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the sponsor
 *               picture:
 *                 type: string
 *                 description: URL of the sponsor's picture
 *               pictureDescription:
 *                 type: string
 *                 description: Description of the sponsor's picture
 *               priority:
 *                 type: number
 *                 description: Priority level for sorting
 *               pinned:
 *                 type: boolean
 *                 description: Whether the sponsor is pinned to the top
 *     responses:
 *       200:
 *         description: The sponsor was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sponsor'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: The sponsor was not found
 *
 *   delete:
 *     summary: Remove the sponsor by id
 *     tags: [Sponsors]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The sponsor id
 *     responses:
 *       200:
 *         description: The sponsor was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The id of the deleted sponsor
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: The sponsor was not found
 */
