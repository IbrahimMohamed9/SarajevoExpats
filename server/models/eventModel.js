const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Please add the title"] },
    content: { type: String, required: [true, "Please add the content"] },
    picture: { type: String, required: [true, "Please add the picture"] },
    pictureDescription: { type: String },
    phone: { type: String },
    email: { type: String },
    url: { type: String, required: [true, "Please add the url"] },
    pinned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Event = mongoose.model("Events", eventSchema);
module.exports = Event;
