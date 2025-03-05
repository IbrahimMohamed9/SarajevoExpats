const mongoose = require("mongoose");

const consultations = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    citizenship: { type: String },
    message: { type: String },
    foundUsBy: { type: String },
  },
  {
    timestamps: true,
  }
);

const Consultation = mongoose.model("Consultations", consultations);
module.exports = Consultation;
