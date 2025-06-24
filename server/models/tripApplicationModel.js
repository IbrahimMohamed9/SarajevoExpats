const mongoose = require("mongoose");

const tripApplicationSchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: [true, "Trip ID is required"],
  },
  name: {
    type: String,
    required: [true, "Please add applicant's name"],
  },
  email: {
    type: String,
    required: [true, "Please add applicant's email"],
  },
  phone: {
    type: String,
    required: [true, "Please add applicant's phone number"],
  },
  selectedDate: { 
    type: Date,
    required: [true, "Please select a date for the trip"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TripApplication = mongoose.model(
  "TripApplication",
  tripApplicationSchema
);
module.exports = TripApplication;
