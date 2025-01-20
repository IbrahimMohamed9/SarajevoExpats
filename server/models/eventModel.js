const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    content: { type: String },
    images: { type: [String] },
    videos: { type: [String] },
    url: { type: String },
    pinned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Events", eventSchema);
module.exports = Event;
