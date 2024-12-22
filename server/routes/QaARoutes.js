const express = require("express");
const router = express.Router();
const {
  getQaAs,
  createQaA,
  deleteQaAById,
  updateQaAById,
  getQaAById,
} = require("../controllers/QaAController");
const { validateMongoId } = require("../utils");
const validateAdminToken = require("../middleware/validateAdminToken");

/**
 * @swagger
 * components:
 *   schemas:
 *     QaA:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         question:
 *           type: string
 *           description: The question text
 *         answer:
 *           type: string
 *           description: The answer text
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/qaas:
 *   get:
 *     summary: Returns all qaas
 *     tags: [qaas]
 *     responses:
 *       200:
 *         description: List of all qaas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/QaA'
 *   post:
 *     summary: Create a new QaA
 *     tags: [qaas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QaA'
 *     responses:
 *       201:
 *         description: QaA created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: QaA added successfully
 *                 qaa:
 *                   $ref: '#/components/schemas/QaA'
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
router.route("/").get(getQaAs).post(validateAdminToken, createQaA);

/**
 * @swagger
 * /api/qaas/{id}:
 *   get:
 *     summary: Get a QaA by ID
 *     tags: [qaas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The QaA ID (must be a valid MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: QaA details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QaA'
 *       404:
 *         description: QaA not found
 *   put:
 *     summary: Update a QaA
 *     tags: [qaas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The QaA ID (must be a valid MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QaA'
 *     responses:
 *       200:
 *         description: QaA updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QaA'
 *       404:
 *         description: QaA not found
 *   delete:
 *     summary: Delete a QaA
 *     tags: [qaas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The QaA ID (must be a valid MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: QaA deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: QaA deleted successfully
 *       404:
 *         description: QaA not found
 */
router.get("/:id", getQaAById);
router
  .route("/:id")
  .all(validateAdminToken)
  .put(updateQaAById)
  .delete(deleteQaAById);

router.param("id", validateMongoId);

module.exports = router;
