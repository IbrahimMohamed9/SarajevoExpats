const mongoose = require("mongoose");
const { USER_TYPES } = require("../constants");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    type: {
      type: String,
      enum: Object.values(USER_TYPES),
      default: USER_TYPES.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
