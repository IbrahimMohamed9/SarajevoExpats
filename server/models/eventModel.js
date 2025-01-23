const mongoose = require("mongoose");

const childPostSchema = new mongoose.Schema(
  {
    type: { type: String },
    displayUrl: { type: String },
    alt: { type: String },
    videoUrl: { type: String },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema({
  content: { type: String },
  displayUrl: { type: String },
  url: { type: String, unique: true, required: [true, "Please add a URL"] },
  date: { type: Date },
  childPosts: [childPostSchema],
  pinned: { type: Boolean, default: false },
});

const Event = mongoose.model("Events", eventSchema);
module.exports = Event;
