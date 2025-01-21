const express = require("express");
const router = express.Router();
const {
  getAllServiceTypes,
  createServiceType,
  deleteServiceTypeById,
  updateServiceTypeById,
  getServiceTypeById,
  getAllServiceTypesWithSubtypes,
  getAllServiceSubtypesByServiceType,
} = require("../controllers/serviceTypeController");
const { validateMongoId } = require("../utils");
const validateAdminToken = require("../middleware/validateAdminToken");

router
  .route("/")
  .get(getAllServiceTypes)
  .post(validateAdminToken, createServiceType);

router.get("/with-subtypes", getAllServiceTypesWithSubtypes);

router.get("/subtypes/:name", getAllServiceSubtypesByServiceType);

router
  .route("/:id")
  .get(getServiceTypeById)
  .put(validateAdminToken, updateServiceTypeById)
  .delete(validateAdminToken, deleteServiceTypeById);

router.param("id", validateMongoId);

module.exports = router;
