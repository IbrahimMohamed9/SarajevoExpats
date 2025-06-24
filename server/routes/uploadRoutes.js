const {
  uploadPhotoMiddleware,
} = require("../middleware/uploadPhotoMiddleware");
const validateAdminToken = require("../middleware/validateAdminToken");
const express = require("express");
const { uploadPhoto } = require("../controllers/uploadController");

const router = express.Router();

router.post("/", validateAdminToken, uploadPhotoMiddleware, uploadPhoto);

module.exports = router;
