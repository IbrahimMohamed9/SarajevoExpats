const express = require("express");
const router = express.Router();
const {
  getAllServiceSubtypes,
  createServiceSubtype,
  deleteServiceSubtypeById,
  updateServiceSubtypeById,
  getServiceSubtypeById,
  getAllServiceSubtypesWithServices,
} = require("../controllers/serviceSubtypeController");
const { validateMongoId } = require("../utils");
const validateAdminToken = require("../middleware/validateAdminToken");

router
  .route("/")
  .get(getAllServiceSubtypes)
  .post(validateAdminToken, createServiceSubtype);

router.get(
  "/with-services",
  validateAdminToken,
  getAllServiceSubtypesWithServices
);

router
  .route("/:id")
  .get(getServiceSubtypeById)
  .put(validateAdminToken, updateServiceSubtypeById)
  .delete(validateAdminToken, deleteServiceSubtypeById);

router.param("id", validateMongoId);

module.exports = router;
