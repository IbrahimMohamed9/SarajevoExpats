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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

function validator() {
  return this.phone || this.email;
}

eventSchema
  .path("phone")
  .validate(validator, "At least one of phone or email must be provided");
eventSchema
  .path("email")
  .validate(validator, "At least one of phone or email must be provided");

const Event = mongoose.model("Events", eventSchema);
module.exports = Event;
