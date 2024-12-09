const asyncHandler = require("express-async-handler");
const Place = require("../models/placeModel");
const { checkNotFound } = require("../utils");
const PlaceType = require("../models/placeTypeModel");

//@desc Get all places
//@route /places
//@access public
const getAllPlaces = asyncHandler(async (req, res) => {
  const places = await Place.find();

  res.status(200).json(places);
});

//@desc Create new place
//@route /places
//@access public
const createPlaces = asyncHandler(async (req, res) => {
  const { title, content, picture, link, type } = req.body;

  const validateRequiredFields = title && content && picture && type && link;
  if (!validateRequiredFields) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const placeType = await PlaceType.findOne({ name: type });
  if (!placeType) {
    res.status(400);
    throw new Error(
      "Invalid place type. Please provide a valid place type name"
    );
  }

  const place = await Place.create({ ...req.body });
  res.status(201).json({ message: "The place added successfully", place });
});

//@desc Delete place by id
//@route /places/:id
//@access public
const deletePlacesById = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);

  checkNotFound(place)(req, res, async () => {
    await Place.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "The event deleted successfully" });
  });
});

//@desc Update place by id
//@route /places/:id
//@access public
const updatePlacesById = asyncHandler(async (req, res) => {
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
const getPlacesById = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);

  checkNotFound(place)(req, res, async () => {
    res.status(200).json(place);
  });
});

module.exports = {
  getAllPlaces,
  createPlaces,
  deletePlacesById,
  updatePlacesById,
  getPlacesById,
};
