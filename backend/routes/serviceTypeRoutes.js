const express = require("express");
const router = express.Router();
const {
  getAllServiceTypes,
  createServiceTypes,
  deleteServiceTypesById,
  updateServiceTypesById,
  getServiceTypesById,
} = require("../controllers/serviceTypeController");
const { validateMongoId } = require("../utils");

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
 */
router.route("/").get(getAllServiceTypes).post(createServiceTypes);

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
 *   delete:
 *     summary: Delete a service type
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
 */
router
  .route("/:id")
  .get(getServiceTypesById)
  .put(updateServiceTypesById)
  .delete(deleteServiceTypesById);

router.param("id", validateMongoId);

module.exports = router;
