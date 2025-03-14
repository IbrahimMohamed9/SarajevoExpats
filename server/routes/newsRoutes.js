const express = require("express");
const router = express.Router();
const validateAdminToken = require("../middleware/validateAdminToken");
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNewsById,
  deleteNewsById,
  getSliderNews,
} = require("../controllers/newsController");
const { validateMongoId } = require("../utils");

router.route("/").get(getAllNews).post(validateAdminToken, createNews);
router.route("/slides").get(getSliderNews);
router.get("/:id", getNewsById);
router
  .route("/:id")
  .all(validateAdminToken)
  .put(updateNewsById)
  .delete(deleteNewsById);

router.param("id", validateMongoId);

module.exports = router;
