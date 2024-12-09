const express = require("express");
const router = express.Router();
const {
  getAllPlaceTypes,
  createPlaceTypes,
  deletePlaceTypesById,
  updatePlaceTypesById,
  getPlaceTypesById,
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
 *           description: The name of the place type
 */

/**
 * @swagger
 * /placeTypes:
 *   get:
 *     summary: Returns all place types
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaceType'
 *     responses:
 *       201:
 *         description: Place type created successfully
 *       400:
 *         description: Invalid input data
 */
router.route("/").get(getAllPlaceTypes).post(createPlaceTypes);

/**
 * @swagger
 * /placeTypes/{id}:
 *   get:
 *     summary: Get a place type by ID
 *     tags: [Place Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place type ID
 *     responses:
 *       200:
 *         description: Place type details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlaceType'
 *       404:
 *         description: Place type not found
 *   put:
 *     summary: Update a place type
 *     tags: [Place Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place type ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaceType'
 *     responses:
 *       200:
 *         description: Place type updated successfully
 *       404:
 *         description: Place type not found
 *   delete:
 *     summary: Delete a place type
 *     tags: [Place Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place type ID
 *     responses:
 *       200:
 *         description: Place type deleted successfully
 *       404:
 *         description: Place type not found
 */
router
  .route("/:id")
  .get(getPlaceTypesById)
  .put(updatePlaceTypesById)
  .delete(deletePlaceTypesById);

router.param("id", validateMongoId);

module.exports = router;
