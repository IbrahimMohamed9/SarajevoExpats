const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add the name"] },
    picture: { type: String, required: [true, "Please add the picture"] },
    pictureDescription: { type: String },
    priority: { type: Number, default: 0 },
    pinned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Sponsor = mongoose.model("Sponsors", sponsorSchema);
module.exports = Sponsor;
