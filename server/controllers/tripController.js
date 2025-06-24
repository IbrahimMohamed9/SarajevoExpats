const asyncHandler = require("express-async-handler");
const Trip = require("../models/tripModel");
const TripApplication = require("../models/tripApplicationModel");
const { checkNotFound } = require("../utils");
const { formatArrayDates, formatObjectDates } = require("../utils/formatDate");
const downloadImage = require("../utils/downloadImage");
const { logError } = require("../utils/logger");

//@desc Get all trips
//@route GET /api/trips
//@access public
const getTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find({ isActive: true }).sort({ startDate: 1 });
  const formattedTrips = formatArrayDates(trips);
  res.json(formattedTrips);
});

//@desc Get trip by ID
//@route GET /api/trips/:id
//@access public
const getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  checkNotFound(trip, "Trip");

  const formattedTrip = formatObjectDates(trip);
  res.status(200).json(formattedTrip);
});

//@desc Create new trip
//@route POST /api/trips
//@access private/admin
const createTrip = asyncHandler(async (req, res) => {
  const { title, content, repeatAt, lastDayToRegister, isActive, dayOfWeek } =
    req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  // Process pictures array
  let pictures = [];
  if (!req.body.pictures || !Array.isArray(req.body.pictures)) {
    res.status(400);
    throw new Error("Pictures must be an array");
  }
  pictures = req.body.pictures;

  const trip = await Trip.create({
    title,
    content,
    pictures,
    repeatAt: repeatAt || "None",
    lastDayToRegister: lastDayToRegister || 1,
    isActive: isActive ?? true,
    dayOfWeek: dayOfWeek || undefined,
  });

  res.status(201).json({
    message: "Trip created successfully",
    trip,
  });
});

//@desc Update trip by ID
//@route PUT /api/trips/:id
//@access private/admin
const updateTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  checkNotFound(trip, "Trip");

  let pictures = trip.pictures;
  if (!req.body.pictures || !Array.isArray(req.body.pictures)) {
    res.status(400);
    throw new Error("Pictures must be an array");
  }
  pictures = req.body.pictures;

  const updatedTrip = await Trip.findByIdAndUpdate(
    req.params.id,
    { ...req.body, pictures },
    { new: true }
  );

  res.json({
    message: "Trip updated successfully",
    trip: updatedTrip,
  });
});

//@desc Delete trip by ID
//@route DELETE /api/trips/:id
//@access private/admin
const deleteTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  checkNotFound(trip, "Trip");

  await trip.deleteOne();

  // Also delete all applications for this trip
  await TripApplication.deleteMany({ tripId: req.params.id });

  res.json({ message: "Trip and related applications deleted successfully" });
});

// Helper function to get available dates for a trip
const getAvailableDatesHelper = (trip) => {
  if (!trip.isActive) {
    return [];
  }

  const availableDates = [];
  const today = new Date();

  const minBookingDate = new Date(today);

  const endBoundary = new Date(today);
  endBoundary.setDate(endBoundary.getDate() + trip.lastDayToRegister);

  let currentDate = new Date(today);

  if (trip.dayOfWeek) {
    const dayIndex = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].indexOf(trip.dayOfWeek);

    while (currentDate.getDay() !== dayIndex) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  while (currentDate <= endBoundary) {
    const lastRegistrationDate = new Date(currentDate);
    lastRegistrationDate.setDate(
      lastRegistrationDate.getDate() + (trip.lastDayToRegister || 1)
    );

    if (currentDate >= minBookingDate && today <= lastRegistrationDate) {
      const dateString = currentDate.toISOString().split("T")[0];
      availableDates.push(dateString);
    }

    if (trip.repeatAt === "Weekly") {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (trip.repeatAt === "Monthly") {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else {
      if (availableDates.length === 0 && today >= minBookingDate) {
        const dateString = today.toISOString().split("T")[0];
        availableDates.push(dateString);
      }
      break;
    }
  }

  return availableDates;
};

//@desc Get available dates for a trip
//@route GET /api/trips/:id/available-dates
//@access public
const getAvailableDates = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  checkNotFound(trip, "Trip");

  const availableDates = getAvailableDatesHelper(trip);
  res.json(availableDates);
});

//@desc Apply for a trip
//@route POST /api/trips/:id/apply
//@access public
const applyForTrip = asyncHandler(async (req, res) => {
  const { name, email, phone, selectedDate } = req.body;

  if (!name || !email || !phone || !selectedDate) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const trip = await Trip.findById(req.params.id);
  checkNotFound(trip, "Trip");

  if (!trip.isActive) {
    res.status(400);
    throw new Error("This trip is not currently active");
  }
  const selectedDateObj = new Date(selectedDate);

  const availableDates = getAvailableDatesHelper(trip);

  const selectedDateString = selectedDateObj.toISOString().split("T")[0];

  const isDateAvailable = availableDates.includes(selectedDateString);

  if (!isDateAvailable) {
    res.status(400);
    throw new Error("The selected date is not available for this trip");
  }

  const application = await TripApplication.create({
    tripId: req.params.id,
    name,
    email,
    phone,
    selectedDate: selectedDateObj,
  });

  res.status(201).json({
    message: "Application submitted successfully",
    application,
  });
});

//@desc Get all applications for a trip
//@route GET /api/trips/:id/applications
//@access private/admin
const getTripApplications = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  checkNotFound(trip, "Trip");

  const applications = await TripApplication.find({
    tripId: req.params.id,
  }).sort({ createdAt: -1 });
  const formattedApplications = formatArrayDates(applications);

  res.json(formattedApplications);
});

module.exports = {
  getTrips,
  getTripById,
  createTrip,
  updateTripById,
  deleteTripById,
  getAvailableDates,
  applyForTrip,
  getTripApplications,
};
