const multer = require("multer");
const path = require("path");
const fs = require("fs");
const generateUniqueFilename = require("../utils/generateUniqueFilename");

const uploadDir = path.join(__dirname, "../media/photos");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, generateUniqueFilename(file.originalname, path.extname(file.originalname)));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    !file.originalname.match(
      /\.(jpg|jpeg|png|gif|.bmp|.webp|.heif|.heic|.svg|.tif|.tiff)$/
    )
  ) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 0.5 * 1024 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

const uploadPhotoMiddleware = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File is too large. Maximum size is 0.5GB",
        });
      }
      return res.status(400).json({
        message: err.message,
      });
    } else if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    next();
  });
};

module.exports = { uploadPhotoMiddleware };
