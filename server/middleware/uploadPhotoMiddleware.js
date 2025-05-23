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
    // First save with a temporary name
    const tempFilename = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 15)}${path.extname(file.originalname)}`;
    cb(null, tempFilename);
    
    // The actual file path will be determined after the file is saved
    // The multer.diskStorage will save the file with the temporary name
    // Then in the middleware function, we'll rename it based on the content hash
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
    
    // If no file was uploaded, continue to the next middleware
    if (!req.file) {
      return next();
    }
    
    try {
      // Get the temporary file path
      const tempFilePath = req.file.path;
      const fileExtension = path.extname(req.file.originalname);
      
      // Generate a hash-based filename from the file content
      const hashedFilename = generateUniqueFilename(tempFilePath, fileExtension);
      
      // Create the new file path
      const newFilePath = path.join(uploadDir, hashedFilename);
      
      // Rename the file
      fs.renameSync(tempFilePath, newFilePath);
      
      // Update the file information in the request
      req.file.filename = hashedFilename;
      req.file.path = newFilePath;
    } catch (error) {
      console.error("Error processing file:", error);
      // If there's an error, we'll continue with the original filename
    }
    
    next();
  });
};

module.exports = { uploadPhotoMiddleware };
