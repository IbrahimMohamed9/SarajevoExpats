const express = require("express");
const router = express.Router();
const { validateMongoId } = require("../utils");
const validateAdminToken = require("../middleware/validateAdminToken");
const {
  getAllServices,
  createService,
  deleteServiceById,
  updateServiceById,
  getServiceById,
  getServicesByServiceSubtype,
  getServicesByServiceType,
} = require("../controllers/serviceController");

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
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/services:
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
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized
 */
router.route("/").get(getAllServices).post(validateAdminToken, createService);

/**
 * @swagger
 * /api/services/by-service-subtype/{serviceSubtype}:
 *   get:
 *     summary: Get services by service subtype
 *     description: Retrieves all services that match the specified service subtype
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: serviceSubtype
 *         required: true
 *         schema:
 *           type: string
 *         description: Subtype of service to filter by (e.g., restaurant, cafe, park)
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 *       404:
 *         description: No services found for the specified type
 *       500:
 *         description: Server error
 */
router.get("/by-service-subtype/:serviceSubtype", getServicesByServiceSubtype);

/**
 * @swagger
 * /api/services/by-service-type/{serviceType}:
 *   get:
 *     summary: Get all services under a specific service type
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: serviceType
 *         schema:
 *           type: string
 *         required: true
 *         description: The service type to filter services by
 *     responses:
 *       200:
 *         description: List of services found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 *       404:
 *         description: No services or service subtypes found for the given service type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.get("/by-service-type/:serviceType", getServicesByServiceType);

/**
 * @swagger
 * /api/services/{id}:
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
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a service
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized
 */
router
  .route("/:id")
  .get(getServiceById)
  .put(validateAdminToken, updateServiceById)
  .delete(validateAdminToken, deleteServiceById);

router.param("id", validateMongoId);

module.exports = router;
