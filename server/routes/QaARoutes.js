const express = require("express");
const router = express.Router();
const {
  getQaAs,
  createQaA,
  deleteQaAById,
  updateQaAById,
  getQaAById,
} = require("../controllers/QaAController");
const { validateMongoId } = require("../utils");
const validateAdminToken = require("../middleware/validateAdminToken");

router.route("/").get(getQaAs).post(validateAdminToken, createQaA);
router.get("/:id", getQaAById);
router
  .route("/:id")
  .all(validateAdminToken)
  .put(updateQaAById)
  .delete(deleteQaAById);

router.param("id", validateMongoId);

module.exports = router;
