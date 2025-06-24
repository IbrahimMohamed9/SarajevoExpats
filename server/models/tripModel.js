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
  price: {
    type: Number,
    required: [true, "Please add a price"],
    min: [0, "Price cannot be negative"],
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
    enum: ["One-time", "Weekly", "Monthly"],
    default: "One-time",
  },
  tripDate: {
    type: Date,
    required: function() { return this.repeatAt === "One-time"; },
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
