const express = require("express");
const router = express.Router();
const {
  getAllServices,
  createServices,
  deleteServicesById,
  updateServicesById,
  getServicesById,
} = require("../controllers/serviceController");
const { validateMongoId } = require("../utils");

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - name
 *         - content
 *         - picture
 *         - serviceSubtype
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the service
 *         content:
 *           type: string
 *           description: Description of the service
 *         picture:
 *           type: string
 *           description: URL of the service picture
 *         pictureDescription:
 *           type: string
 *           description: Description of the service picture
 *         phone:
 *           type: string
 *           description: Contact phone number for the service
 *         email:
 *           type: string
 *           description: Contact email address for the service
 *         serviceSubtype:
 *           type: string
 *           description: The subtype of the service (must exist in ServiceSubtypes collection)
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Returns all services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of all services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The service added successfully
 *                 service:
 *                   $ref: '#/components/schemas/Service'
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
router.route("/").get(getAllServices).post(createServices);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Service details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *   put:
 *     summary: Update a service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Service updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The service deleted successfully
 *       404:
 *         description: Service not found
 */
router
  .route("/:id")
  .get(getServicesById)
  .put(updateServicesById)
  .delete(deleteServicesById);

router.param("id", validateMongoId);

module.exports = router;
