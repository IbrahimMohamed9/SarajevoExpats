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

router
  .route("/")
  .get(getAllPlaceTypes)
  .post(validateAdminToken, createPlaceType);

router.get("/with-places", validateAdminToken, getAllPlaceTypesWithPlaces);

router.get("/:id", getPlaceTypeById);
router
  .route("/:id")
  .all(validateAdminToken)
  .put(updatePlaceTypeById)
  .delete(deletePlaceTypeById);

router.param("id", validateMongoId);

module.exports = router;
