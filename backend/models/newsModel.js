const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, require: [true, "Please add a title"] },
    content: { type: String, require: [true, "Please add a content"] },
    picture: { type: String, require: [true, "Please add a picture"] },
    pictureDescription: { type: String },
    sources: { type: String, require: [true, "Please add a sources"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("News", newsSchema);
