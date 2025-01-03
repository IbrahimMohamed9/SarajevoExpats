const express = require("express");
const router = express.Router();
const {
  getAllServiceSubtypes,
  createServiceSubtype,
  deleteServiceSubtypeById,
  updateServiceSubtypeById,
  getServiceSubtypeById,
  getAllServiceSubtypesWithServices,
} = require("../controllers/serviceSubtypeController");
const { validateMongoId } = require("../utils");
const validateAdminToken = require("../middleware/validateAdminToken");

/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceSubtype:
 *       type: object
 *       required:
 *         - name
 *         - serviceType
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the service subtype
 *         serviceType:
 *           type: string
 *           description: The ID of the parent service type (must exist in ServiceTypes collection)
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/serviceSubtypes:
 *   get:
 *     summary: Returns all service subtypes
 *     tags: [Service Subtypes]
 *     responses:
 *       200:
 *         description: List of all service subtypes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceSubtype'
 *   post:
 *     summary: Create a new service subtype
 *     tags: [Service Subtypes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceSubtype'
 *     responses:
 *       201:
 *         description: Service subtype created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The service subtype added successfully
 *                 serviceSubtype:
 *                   $ref: '#/components/schemas/ServiceSubtype'
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
 *       401:
 *         description: Unauthorized
 */
router
  .route("/")
  .get(getAllServiceSubtypes)
  .post(validateAdminToken, createServiceSubtype);

/**
 * @swagger
 * /api/serviceSubtypes/with-services:
 *   get:
 *     summary: Get all service subtypes with their services
 *     tags: [Service Subtypes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all service subtypes with their services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The service subtype ID
 *                   name:
 *                     type: string
 *                     description: The service subtype name
 *                   serviceType:
 *                     type: string
 *                     description: The associated service type
 *                   services:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The service ID
 *                         name:
 *                           type: string
 *                           description: The service name
 */

router.get(
  "/with-services",
  validateAdminToken,
  getAllServiceSubtypesWithServices
);

/**
 * @swagger
 * /api/serviceSubtypes/{id}:
 *   get:
 *     summary: Get a service subtype by ID
 *     tags: [Service Subtypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service subtype ID
 *     responses:
 *       200:
 *         description: Service subtype details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceSubtype'
 *       404:
 *         description: Service subtype not found
 *   put:
 *     summary: Update a service subtype
 *     tags: [Service Subtypes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service subtype ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceSubtype'
 *     responses:
 *       200:
 *         description: Service subtype updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceSubtype'
 *       404:
 *         description: Service subtype not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a service subtype
 *     tags: [Service Subtypes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service subtype ID
 *     responses:
 *       200:
 *         description: Service subtype deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: The service subtype deleted successfully
 *       404:
 *         description: Service subtype not found
 *       401:
 *         description: Unauthorized
 */
router
  .route("/:id")
  .get(getServiceSubtypeById)
  .put(validateAdminToken, updateServiceSubtypeById)
  .delete(validateAdminToken, deleteServiceSubtypeById);

router.param("id", validateMongoId);

module.exports = router;
