const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEventsFromInstagram,
  getPinnedEvents,
  deleteEventById,
  updateEventById,
  getEventById,
} = require("../controllers/eventController");
const { validateMongoId } = require("../utils");
const validateAdminToken = require("../middleware/validateAdminToken");

router
  .route("/")
  .get(getEvents)
  .post(validateAdminToken, getEventsFromInstagram);

router.route("/pinned").get(getPinnedEvents);

router.get("/:id", getEventById);
router
  .route("/:id")
  .all(validateAdminToken)
  .put(updateEventById)
  .delete(deleteEventById);

router.param("id", validateMongoId);

module.exports = router;
