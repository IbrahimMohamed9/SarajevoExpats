const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  pictures: {
    type: [String],
    required: [true, "Please add the picture"],
  },
  content: {
    type: String,
    required: [true, "Please add a description"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  dayOfWeek: {
    type: String,
    enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required: false,
  },
  repeatAt: {
    type: String,
    enum: ["None", "Weekly", "Monthly"],
    default: "None",
  },
  lastDayToRegister: {
    type: Number,
    default: 1,
    min: 0,
    description: "Number of days before the trip that registration closes",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
