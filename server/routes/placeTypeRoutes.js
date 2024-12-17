const express = require("express");
const router = express.Router();
const validateAdminToken = require("../middleware/validateAdminToken");
const {
  getAllPlaceTypes,
  createPlaceType,
  deletePlaceTypeById,
  updatePlaceTypeById,
  getPlaceTypeById,
  getAllPlaceTypesWithPlaces,
} = require("../controllers/placeTypeController");
const { validateMongoId } = require("../utils");

/**
 * @swagger
 * components:
 *   schemas:
 *     PlaceType:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the place type
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/placeTypes:
 *   get:
 *     summary: Get all place types
 *     tags: [Place Types]
 *     responses:
 *       200:
 *         description: List of all place types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlaceType'
 *   post:
 *     summary: Create a new place type
 *     tags: [Place Types]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaceType'
 *     responses:
 *       201:
 *         description: Place type created successfully
 *       401:
 *         description: Not authorized
 *       400:
 *         description: Invalid input or place type already exists
 */
router
  .route("/")
  .get(getAllPlaceTypes)
  .post(validateAdminToken, createPlaceType);

/**
 * @swagger
 * /api/placeTypes/with-places:
 *   get:
 *     summary: Get all place types with their associated places
 *     tags: [Place Types]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all place types with places
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The place type ID
 *                   name:
 *                     type: string
 *                     description: The place type name
 *                   subData:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The place ID
 *                         name:
 *                           type: string
 *                           description: The place name
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
router.get("/with-places", validateAdminToken, getAllPlaceTypesWithPlaces);

/**
 * @swagger
 * /api/placeTypes/{id}:
 *   get:
 *     summary: Get a place type by ID
 *     tags: [Place Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place type ID (must be a valid MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Place type details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlaceType'
 *   put:
 *     summary: Update a place type
 *     tags: [Place Types]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place type ID (must be a valid MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaceType'
 *     responses:
 *       200:
 *         description: Place type updated successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Place type not found
 *       400:
 *         description: Place type with the same name already exists
 *   delete:
 *     summary: Delete a place type
 *     tags: [Place Types]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place type ID (must be a valid MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Place type deleted successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Place type not found
 */
router.get("/:id", getPlaceTypeById);
router
  .route("/:id")
  .all(validateAdminToken)
  .put(updatePlaceTypeById)
  .delete(deletePlaceTypeById);

router.param("id", validateMongoId);

module.exports = router;
