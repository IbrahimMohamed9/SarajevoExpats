const asyncHandler = require("express-async-handler");
const PlaceType = require("../models/placeTypeModel");
const { checkNotFound } = require("../utils");
const Place = require("../models/placeModel");

//@desc Get all place types
//@route /placeTypes
//@access public
const getAllPlaceTypes = asyncHandler(async (req, res) => {
  const placeType = await PlaceType.find();
  res.status(200).json(placeType);
});

//@desc Create new place type
//@route /placeTypes
//@access public
const createPlaceType = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const placeType = await PlaceType.findOne({ name: req.body.name });
  if (placeType) {
    res.status(400);
    throw new Error("Place type already exists");
  }

  const newPlaceType = await PlaceType.create({ ...req.body });

  res
    .status(201)
    .json({ message: "The place type added successfully", newPlaceType });
});

//@desc Delete place type by id
//@route /placeTypes/:id
//@access public
const deletePlaceTypeById = asyncHandler(async (req, res) => {
  const placeType = await PlaceType.findById(req.params.id);

  checkNotFound(placeType)(req, res, async () => {
    const places = await Place.find({ type: placeType.name });
    if (places.length > 0) {
      await Place.deleteMany({ type: placeType.name });
    }
    await PlaceType.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "The place type deleted successfully" });
  });
});

//@desc Update place type by id
//@route /placeTypes/:id
//@access public
const updatePlaceTypeById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  if (!name) {
    res.status(400);
    throw new Error("Name field is required");
  }

  const placeType = await PlaceType.findById(id);
  if (!placeType) {
    res.status(404);
    throw new Error("Place type not found");
  }

  if (placeType.name === name) {
    return res.status(200).json(placeType);
  }
  const updatedPlaceType = await PlaceType.findOneAndUpdate(
    { _id: id },
    { $set: { name: name } },
    { new: true }
  );

  res.status(200).json({
    message: "The place type updated successfully",
    updatedPlaceType,
  });
});

//@desc Get place type by id
//@route /placeTypes/:id
//@access public
const getPlaceTypeById = asyncHandler(async (req, res) => {
  const placeType = await PlaceType.findById(req.params.id);

  checkNotFound(placeType)(req, res, async () => {
    res.status(200).json(placeType);
  });
});

module.exports = {
  getAllPlaceTypes,
  createPlaceType,
  deletePlaceTypeById,
  updatePlaceTypeById,
  getPlaceTypeById,
};
