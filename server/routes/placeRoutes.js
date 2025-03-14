const express = require("express");
const router = express.Router();
const validateAdminToken = require("../middleware/validateAdminToken");
const {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlaceById,
  deletePlaceById,
  getPlacesByPlaceType,
  deletePlaceImage,
  reorderPlaceImages,
} = require("../controllers/placeController");
const { validateMongoId } = require("../utils");

router.route("/").get(getAllPlaces).post(validateAdminToken, createPlace);

router.get("/by-place-type/:placeType", getPlacesByPlaceType);

router.get("/:id", getPlaceById);
router
  .route("/:id")
  .all(validateAdminToken)
  .put(updatePlaceById)
  .delete(deletePlaceById);

router.route("/:id/images").delete(validateAdminToken, deletePlaceImage);
router.route("/:id/images/reorder").put(validateAdminToken, reorderPlaceImages);

router.param("id", validateMongoId);

module.exports = router;
