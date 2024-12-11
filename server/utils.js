const mongoose = require("mongoose");

const validateMongoId = (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "We couldn't find an entity with the specified ID.",
    });
  }
  next();
};

const checkNotFound = (element) => (req, res, next) => {
  if (!element) {
    return res.status(404).json({
      message: "We couldn't find an entity with the specified ID.",
    });
  }
  next();
};

module.exports = {
  validateMongoId,
  checkNotFound,
};
