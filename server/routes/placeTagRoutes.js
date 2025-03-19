const express = require("express");
const router = express.Router();
const validateAdminToken = require("../middleware/validateAdminToken");
const {
  getAllPlaceTags,
  getTagsByPlaceType,
  createPlaceTag,
  updatePlaceTag,
  deletePlaceTag
} = require("../controllers/placeTagController");
const { validateMongoId } = require("../utils");

// Public routes
router.get("/", getAllPlaceTags);
router.get("/by-place-type/:type", getTagsByPlaceType);

// Admin routes
router.post("/", validateAdminToken, createPlaceTag);

// Routes with ID parameter
router
  .route("/:id")
  .all(validateAdminToken)
  .put(updatePlaceTag)
  .delete(deletePlaceTag);

// Validate MongoDB IDs
router.param("id", validateMongoId);

module.exports = router;
