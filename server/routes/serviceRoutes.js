const express = require("express");
const router = express.Router();
const { validateMongoId } = require("../utils");
const validateAdminToken = require("../middleware/validateAdminToken");
const {
  getAllServices,
  createService,
  deleteServiceById,
  updateServiceById,
  getServiceById,
  getServicesByServiceType,
} = require("../controllers/serviceController");

router.route("/").get(getAllServices).post(validateAdminToken, createService);

router.get("/by-service-type/:serviceType", getServicesByServiceType);

router
  .route("/:id")
  .get(getServiceById)
  .put(validateAdminToken, updateServiceById)
  .delete(validateAdminToken, deleteServiceById);

router.param("id", validateMongoId);

module.exports = router;
