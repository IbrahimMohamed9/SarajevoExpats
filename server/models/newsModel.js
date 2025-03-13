const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, require: [true, "Please add a title"] },
    content: { type: String, require: [true, "Please add a content"] },
    pictures: { type: [String], required: [true, "Please add the picture"] },
    pictureDescription: { type: String },
    sources: { type: String, require: [true, "Please add a sources"] },
    showInSlider: { type: Boolean, default: false },
    slidePriority: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const News = mongoose.model("News", newsSchema);
module.exports = News;
