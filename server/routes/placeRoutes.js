const express = require("express");
const router = express.Router();
const validateAdminToken = require("../middleware/validateAdminToken");
const {
  getAllPlaces,
  getPlaceById,
  createPlace,
  createPlaceUserSubmit,
  updatePlaceById,
  deletePlaceById,
  getPlacesByPlaceType,
  deletePlaceImage,
  reorderPlaceImages,
  addTagToPlace,
  removeTagFromPlace,
  approvePlace,
} = require("../controllers/placeController");
const { validateMongoId } = require("../utils");

const decodeToken = require("../middleware/decodeToken");

router
  .route("/")
  .get(decodeToken, getAllPlaces)
  .post(validateAdminToken, createPlace);

const {
  uploadMultiplePhotosMiddleware,
} = require("../middleware/uploadMultiplePhotosMiddleware");

router.post(
  "/user-submit",
  uploadMultiplePhotosMiddleware,
  createPlaceUserSubmit
);

router.get("/by-place-type/:placeType", getPlacesByPlaceType);

router.get("/:id", decodeToken, getPlaceById);
router
  .route("/:id")
  .all(validateAdminToken)
  .put(updatePlaceById)
  .delete(deletePlaceById);

router.route("/:id/images").delete(validateAdminToken, deletePlaceImage);
router.route("/:id/images/reorder").put(validateAdminToken, reorderPlaceImages);

// New tag routes
router
  .route("/:id/tags")
  .post(validateAdminToken, addTagToPlace)
  .delete(validateAdminToken, removeTagFromPlace);

router.put("/:id/approve", validateAdminToken, approvePlace);

router.param("id", validateMongoId);

module.exports = router;
