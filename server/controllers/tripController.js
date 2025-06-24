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
  const {
    title,
    content,
    repeatAt,
    lastDayToRegister,
    isActive,
    dayOfWeek,
    tripDate,
  } = req.body;

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

  if (repeatAt === "One-time" && !tripDate) {
    res.status(400);
    throw new Error("Trip date is required for one-time trips");
  }

  const trip = await Trip.create({
    title,
    content,
    pictures,
    repeatAt: repeatAt || "One-time",
    lastDayToRegister: lastDayToRegister || 1,
    isActive: isActive ?? true,
    dayOfWeek: dayOfWeek || undefined,
    tripDate: repeatAt === "One-time" ? new Date(tripDate) : undefined,
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

  // Validate tripDate is provided when repeatAt is One-time
  if (req.body.repeatAt === "One-time" && !req.body.tripDate) {
    res.status(400);
    throw new Error("Trip date is required for one-time trips");
  }

  // Prepare update data
  const updateData = {
    ...req.body,
    pictures,
    // Convert tripDate to Date object if provided and repeatAt is One-time
    tripDate:
      req.body.repeatAt === "One-time" && req.body.tripDate
        ? new Date(req.body.tripDate)
        : undefined,
  };

  const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

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

//@desc Delete images from a trip
//@route DELETE /api/trips/:id/images
//@access private/admin
const deleteTripImages = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  checkNotFound(trip, "Trip");

  const { pictures } = req.body;

  if (!pictures || !Array.isArray(pictures) || pictures.length === 0) {
    res.status(400);
    throw new Error("Please provide an array of image URLs to delete");
  }

  const updatedPictures = trip.pictures.filter(
    (url) => !pictures.includes(url)
  );

  if (updatedPictures.length === 0) {
    res.status(400);
    throw new Error("Trip must have at least one image");
  }

  trip.pictures = updatedPictures;
  await trip.save();

  res.json({
    message: "Images deleted successfully",
    pictures: trip.pictures,
  });
});

//@desc Reorder images in a trip
//@route PUT /api/trips/:id/images/reorder
//@access private/admin
const reorderTripImages = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  checkNotFound(trip, "Trip");

  // Get the reordered image URLs from the request body
  const { images } = req.body;

  if (!images || !Array.isArray(images) || images.length === 0) {
    res.status(400);
    throw new Error("Please provide an array of image URLs");
  }

  // Validate that the images array contains all the same images as the trip
  if (images.length !== trip.pictures.length) {
    res.status(400);
    throw new Error(
      "The number of images doesn't match the trip's current images"
    );
  }

  // Check that all images in the request exist in the trip's pictures
  const allImagesExist = images.every((img) => trip.pictures.includes(img));
  const allOriginalImagesIncluded = trip.pictures.every((img) =>
    images.includes(img)
  );

  if (!allImagesExist || !allOriginalImagesIncluded) {
    res.status(400);
    throw new Error(
      "The provided images don't match the trip's current images"
    );
  }

  // Update the trip with the reordered images
  trip.pictures = images;
  await trip.save();

  res.json({
    message: "Images reordered successfully",
    pictures: trip.pictures,
  });
});

//@desc Get all trips with their applications
//@route GET /api/trips/with-applications
//@access private/admin
const getTripsWithApplications = asyncHandler(async (req, res) => {
  const trips = await Trip.find().sort({ createdAt: -1 });

  const tripsWithApplications = await Promise.all(
    trips.map(async (trip) => {
      const applications = await TripApplication.find({
        tripId: trip._id,
      }).sort({ createdAt: -1 });

      const formattedApplications = applications.map((app) => {
        const formattedDate = app.selectedDate
          ? new Date(app.selectedDate).toISOString().split("T")[0]
          : null;

        const formattedCreatedAt = app.createdAt
          ? new Date(app.createdAt).toISOString().split("T")[0]
          : null;

        return {
          _id: app._id,
          name: app.name,
          email: app.email,
          phone: app.phone,
          selectedDate: formattedDate,
          createdAt: formattedCreatedAt,
        };
      });

      return {
        _id: trip._id,
        title: trip.title,
        content: trip.content,
        pictures: trip.pictures,
        repeatAt: trip.repeatAt,
        lastDayToRegister: trip.lastDayToRegister,
        isActive: trip.isActive,
        dayOfWeek: trip.dayOfWeek,
        tripDate: trip.tripDate
          ? new Date(trip.tripDate).toISOString().split("T")[0]
          : null,
        createdAt: trip.createdAt,
        updatedAt: trip.updatedAt,
        subData: formattedApplications,
      };
    })
  );

  res.status(200).json(tripsWithApplications);
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
  deleteTripImages,
  reorderTripImages,
  getTripsWithApplications,
};
