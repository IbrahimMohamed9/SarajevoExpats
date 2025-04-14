const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventsFromInstagram,
  getPinnedEvents,
  deleteEventById,
  updateEventById,
  getEventById,
  getEventFromInstagram,
  deleteEventImage,
} = require("../controllers/eventController");
const { validateMongoId } = require("../utils");
const validateAdminToken = require("../middleware/validateAdminToken");

router
  .route("/")
  .get(getEvents)
  .post(validateAdminToken, getEventFromInstagram);

router.route("/:url").post(validateAdminToken, getEventsFromInstagram);

router.route("/pinned").get(getPinnedEvents);

router
  .route("/delete-image/:id")
  .all(validateAdminToken)
  .delete(deleteEventImage);

router.get("/:id", getEventById);
router
  .route("/:id")
  .all(validateAdminToken)
  .put(updateEventById)
  .delete(deleteEventById);

router.param("id", validateMongoId);

module.exports = router;
