const express = require("express");
const router = express.Router();
const validateAdminToken = require("../middleware/validateAdminToken");
const { validateMongoId } = require("../utils");
const {
  getAllUsers,
  getUserById,
  registerUser,
  updateUserById,
  deleteUserById,
  loggedInUser,
  getMe,
} = require("../controllers/userController");
const ValidateAdminOrMeToken = require("../middleware/ValidateAdminOrMeToken");

router.route("/").get(validateAdminToken, getAllUsers).post(registerUser);

router.route("/me").get(ValidateAdminOrMeToken, getMe);

router.route("/login").post(loggedInUser);

router
  .route("/:id")
  .all(validateAdminToken)
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

router.param("id", validateMongoId);

module.exports = router;
