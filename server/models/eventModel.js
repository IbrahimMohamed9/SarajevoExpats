const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  content: { type: String },
  images: { type: [String] },
  videos: { type: [String] },
  url: { type: String, unique: true, required: [true, "Please add a URL"] },
  date: { type: Date },
  pinned: { type: Boolean, default: false },
});

const Event = mongoose.model("Events", eventSchema);
module.exports = Event;
