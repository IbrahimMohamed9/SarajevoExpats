const express = require("express");
const router = express.Router();
const {
  getAllServiceSubtypes,
  createServiceSubtypes,
  deleteServiceSubtypesById,
  updateServiceSubtypesById,
  getServiceSubtypesById,
} = require("../controllers/serviceSubtypeController");
const { validateMongoId } = require("../utils");

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
 */

/**
 * @swagger
 * /serviceSubtypes:
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
 */
router.route("/").get(getAllServiceSubtypes).post(createServiceSubtypes);

/**
 * @swagger
 * /serviceSubtypes/{id}:
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
 *   delete:
 *     summary: Delete a service subtype
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
 */
router
  .route("/:id")
  .get(getServiceSubtypesById)
  .put(updateServiceSubtypesById)
  .delete(deleteServiceSubtypesById);

router.param("id", validateMongoId);

module.exports = router;
