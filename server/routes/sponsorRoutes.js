const express = require("express");
const router = express.Router();
const {
  getSponsors,
  getSponsor,
  createSponsor,
  updateSponsor,
  deleteSponsor,
} = require("../controllers/sponsorController");
const validateAdminToken = require("../middleware/validateAdminToken");
const { validateMongoId } = require("../utils");

router.route("/").get(getSponsors).post(validateAdminToken, createSponsor);
router
  .route("/:id")
  .get(getSponsor)
  .put(validateAdminToken, updateSponsor)
  .delete(validateAdminToken, deleteSponsor);

router.param("id", validateMongoId);

module.exports = router;
