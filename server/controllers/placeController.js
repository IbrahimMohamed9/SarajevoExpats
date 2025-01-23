const asyncHandler = require("express-async-handler");
const Place = require("../models/placeModel");
const { checkNotFound } = require("../utils");
const PlaceType = require("../models/placeTypeModel");

//@desc Get all places
//@route /places
//@access public
const getAllPlaces = asyncHandler(async (req, res) => {
  const places = await Place.find().sort({ createdAt: -1 });

  res.status(200).json(places);
});

//@desc Get all under spacific placeType
//@route /places
//@access public
const getPlacesByPlaceType = asyncHandler(async (req, res) => {
  const places = await Place.find({ type: req.params.placeType });

  res.status(200).json(places);
});

//@desc Create new place
//@route /places
//@access public
const createPlace = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    picture,
    pictureDescription,
    type,
    phone,
    email,
    link,
  } = req.body;

  const requiredFields = {
    title,
    content,
    picture,
    type,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([field]) => field);

  if (missingFields.length > 0) {
    res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  const contactFields = { phone, email, link };
  const hasContactMethod = Object.values(contactFields).some((value) => value);

  if (!hasContactMethod) {
    res.status(400).json({
      message:
        "At least one contact method (phone, email, or link) is required",
    });
    throw new Error(
      "At least one contact method (phone, email, or link) is required"
    );
  }

  const placeType = await PlaceType.findOne({ name: type });
  if (!placeType) {
    res.status(400).json({
      message: "Invalid place type. Please provide a valid place type name",
    });
    throw new Error(
      "Invalid place type. Please provide a valid place type name"
    );
  }

  const place = await Place.create({
    title,
    content,
    picture,
    pictureDescription,
    type,
    phone,
    email,
    link,
  });

  res.status(201).json({ message: "The place added successfully", place });
});

//@desc Delete place by id
//@route /places/:id
//@access public
const deletePlaceById = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);

  checkNotFound(place)(req, res, async () => {
    await Place.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "The event deleted successfully" });
  });
});

//@desc Update place by id
//@route /places/:id
//@access public
const updatePlaceById = asyncHandler(async (req, res) => {
  let place = await Place.findById(req.params.id);

  checkNotFound(place)(req, res, async () => {
    place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(place);
  });
});

//@desc Get place by id
//@route /places/:id
//@access public
const getPlaceById = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);

  checkNotFound(place)(req, res, async () => {
    res.status(200).json(place);
  });
});

module.exports = {
  getAllPlaces,
  createPlace,
  deletePlaceById,
  updatePlaceById,
  getPlaceById,
  getPlacesByPlaceType,
};
