const express = require("express");
const router = express.Router();
const {
  getAllServiceTypes,
  createServiceType,
  deleteServiceTypeById,
  updateServiceTypeById,
  getServiceTypeById,
} = require("../controllers/serviceTypeController");
const { validateMongoId } = require("../utils");
const validateAdminToken = require("../middleware/validateAdminToken");

/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceType:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the service type
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /serviceTypes:
 *   get:
 *     summary: Returns all service types
 *     tags: [Service Types]
 *     responses:
 *       200:
 *         description: List of all service types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceType'
 *   post:
 *     summary: Create a new service type
 *     tags: [Service Types]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceType'
 *     responses:
 *       201:
 *         description: Service type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The service type added successfully
 *                 serviceType:
 *                   $ref: '#/components/schemas/ServiceType'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router
  .route("/")
  .get(getAllServiceTypes)
  .post(validateAdminToken, createServiceType);

/**
 * @swagger
 * /serviceTypes/{id}:
 *   get:
 *     summary: Get a service type by ID
 *     tags: [Service Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service type ID
 *     responses:
 *       200:
 *         description: Service type details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceType'
 *       404:
 *         description: Service type not found
 *   put:
 *     summary: Update a service type
 *     tags: [Service Types]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceType'
 *     responses:
 *       200:
 *         description: Service type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceType'
 *       404:
 *         description: Service type not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a service type
 *     tags: [Service Types]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service type ID
 *     responses:
 *       200:
 *         description: Service type deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The service type deleted successfully
 *       404:
 *         description: Service type not found
 *       401:
 *         description: Unauthorized
 */
router
  .route("/:id")
  .get(getServiceTypeById)
  .put(validateAdminToken, updateServiceTypeById)
  .delete(validateAdminToken, deleteServiceTypeById);

router.param("id", validateMongoId);

module.exports = router;
