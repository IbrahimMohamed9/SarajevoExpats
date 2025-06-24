const express = require("express");
const router = express.Router();
const {
  getTrips,
  getTripById,
  createTrip,
  updateTripById,
  deleteTripById,
  getAvailableDates,
  applyForTrip,
  getTripApplications,
  deleteTripImages,
  reorderTripImages,
  getTripsWithApplications,
} = require("../controllers/tripController");
const { validateMongoId } = require("../utils");
const validateAdminToken = require("../middleware/validateAdminToken");

router.route("/").get(getTrips).post(validateAdminToken, createTrip);

router.get("/with-applications", validateAdminToken, getTripsWithApplications);

router.get("/:id", getTripById);

router
  .route("/:id")
  .all(validateAdminToken)
  .put(updateTripById)
  .delete(deleteTripById);

router.get("/:id/available-dates", getAvailableDates);
router.post("/:id/apply", applyForTrip);
router.delete("/:id/images", validateAdminToken, deleteTripImages);
router.put("/:id/images/reorder", validateAdminToken, reorderTripImages);

router
  .route("/:id/applications")
  .all(validateAdminToken)
  .get(getTripApplications);

router.param("id", validateMongoId);

module.exports = router;
