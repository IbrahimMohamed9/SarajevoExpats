const express = require("express");
const router = express.Router();
const validateAdminToken = require("../middleware/validateAdminToken");
const {
  getAllNews,
  createNews,
  deleteNewsById,
  updateNewsById,
  getNewsById,
  getSliderNews,
  deleteNewsImage,
  reorderNewsImages,
} = require("../controllers/newsController");
const { validateMongoId } = require("../utils");

router.route("/").get(getAllNews).post(validateAdminToken, createNews);

router.get("/slider", getSliderNews);

router.get("/:id", getNewsById);
router
  .route("/:id")
  .all(validateAdminToken)
  .put(updateNewsById)
  .delete(deleteNewsById);

// Image management routes
router.delete("/:id/images/:index", validateAdminToken, deleteNewsImage);
router.put("/:id/images/reorder", validateAdminToken, reorderNewsImages);

router.param("id", validateMongoId);

module.exports = router;
