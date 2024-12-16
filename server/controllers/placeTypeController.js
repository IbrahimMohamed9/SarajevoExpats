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

//@desc Get all place types with places
//@route /placeTypes
//@access public
const getAllPlaceTypesWithPlaces = asyncHandler(async (req, res) => {
  const placeTypes = await PlaceType.find();

  const placeTypesWithPlaces = await Promise.all(
    placeTypes.map(async (placeType) => {
      const places = await Place.find({ type: placeType.name });
      return {
        _id: placeType._id,
        name: placeType.name,
        subData: places,
      };
    })
  );
  res.status(200).json(placeTypesWithPlaces);
});

//@desc Create new place type
//@route /placeTypes
//@access public
const createPlaceType = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Check which required fields are missing
  const requiredFields = { name };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([field]) => field);

  if (missingFields.length > 0) {
    res.status(400);
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  const checkPlaceType = await PlaceType.findOne({ name: req.body.name });
  if (checkPlaceType) {
    res.status(400);
    throw new Error("Place type already exists");
  }

  const placeType = await PlaceType.create({ ...req.body });

  res
    .status(201)
    .json({ message: "The place type added successfully", placeType });
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
    res.status(400).json({
      message: "Name is required field",
    });
    throw new Error("Name is required field");
  }

  const placeType = await PlaceType.findById(id);
  if (!placeType) {
    res.status(404).json({
      message: "Place type not found",
    });
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
  getAllPlaceTypesWithPlaces,
};
