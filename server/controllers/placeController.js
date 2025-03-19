const asyncHandler = require("express-async-handler");
const Place = require("../models/placeModel");
const { checkNotFound } = require("../utils");
const PlaceType = require("../models/placeTypeModel");
const { formatArrayDates, formatObjectDates } = require("../utils/formatDate");

let orderByCreatedAtForAll = 1;
let orderByCreatedAtForType = 1;

//@desc Get all places
//@route /places
//@access public
const getAllPlaces = asyncHandler(async (req, res) => {
  const places = await Place.find().sort({
    priority: -1,
    pinned: -1,
    createdAt: orderByCreatedAtForAll,
  });
  orderByCreatedAtForAll = orderByCreatedAtForAll === 1 ? -1 : 1;

  const formattedPlaces = formatArrayDates(places);
  res.status(200).json(formattedPlaces);
});

//@desc Get all under spacific placeType
//@route /places
//@access public
const getPlacesByPlaceType = asyncHandler(async (req, res) => {
  const places = await Place.find({ type: req.params.placeType }).sort({
    priority: -1,
    pinned: -1,
    createdAt: orderByCreatedAtForType,
  });
  orderByCreatedAtForType = orderByCreatedAtForType === 1 ? -1 : 1;

  const formattedPlaces = formatArrayDates(places);
  res.status(200).json(formattedPlaces);
});

//@desc Create new place
//@route /places
//@access public
const createPlace = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    pictures,
    pictureDescription,
    type,
    phone,
    email,
    link,
  } = req.body;

  const requiredFields = {
    title,
    content,
    pictures,
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
    pictures,
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
  if (!place) {
    res.status(404);
    throw new Error("Place not found");
  }
  const formattedPlace = formatObjectDates(place);
  res.status(200).json(formattedPlace);
});

//@desc Delete image from place
//@route DELETE /places/:id/images
//@access private
const deletePlaceImage = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (!place) {
    res.status(404);
    throw new Error("Place not found");
  }

  const { imageUrl } = req.body;
  const index = place.pictures.findIndex((img) => img === imageUrl);
  if (index === -1) return res.status(404).send("Image not found");
  place.pictures.splice(index, 1);
  await place.save();

  res.status(200).json({ message: "Image deleted successfully", place });
});

//@desc Change image position in place
//@route PUT /places/:id/images/reorder
//@access private
const reorderPlaceImages = asyncHandler(async (req, res) => {
  const { images } = req.body;

  if (!images || !Array.isArray(images)) {
    res.status(400);
    throw new Error("Images array is required");
  }

  const place = await Place.findById(req.params.id);

  if (!place) {
    res.status(404);
    throw new Error("Place not found");
  }

  const existingUrls = place.pictures.map((img) => img);
  const allImagesExist = images.every((url) => existingUrls.includes(url));

  if (!allImagesExist) {
    res.status(400);
    throw new Error("One or more image URLs are invalid");
  }

  place.pictures = images;
  await place.save();

  res.status(200).json({ message: "Images reordered successfully", place });
});

//@desc Add category to place
//@route PUT /places/:id/categories
//@access private
const addCategoryToPlace = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (!place) {
    res.status(404);
    throw new Error("Place not found");
  }

  const categoryId = req.body.categoryId;
  place.categories = place.categories || [];
  if (toIndex >= place.categories.length) {
    toIndex = place.categories.length - 1;
  }
  place.categories.splice(toIndex, 0, categoryId);
  await place.save();

  res.status(200).json({ message: "Category added successfully", place });
});

//@desc Add tag to place
//@route POST /places/:id/tags
//@access private (admin)
const addTagToPlace = asyncHandler(async (req, res) => {
  const { tag } = req.body;
  
  if (!tag) {
    res.status(400);
    throw new Error("Tag name is required");
  }
  
  const place = await Place.findById(req.params.id);
  
  if (!place) {
    res.status(404);
    throw new Error("Place not found");
  }

  const PlaceTag = require("../models/placeTagModel");
  const tagExists = await PlaceTag.findOne({ placeType: place.type, tag });
  if (!tagExists) {
    res.status(400);
    throw new Error("This tag does not exist for the place type: " + place.type);
  }
  
  if (place.tags.includes(tag)) {
    res.status(400);
    throw new Error("This tag is already added to the place");
  }
  
  place.tags.push(tag);
  await place.save();
  
  res.status(200).json({ message: "Tag added to place successfully", place });
});

//@desc Remove tag from place
//@route DELETE /places/:id/tags
//@access private (admin)
const removeTagFromPlace = asyncHandler(async (req, res) => {
  const { tag } = req.body;
  
  if (!tag) {
    res.status(400);
    throw new Error("Tag name is required");
  }
  
  const place = await Place.findById(req.params.id);
  
  if (!place) {
    res.status(404);
    throw new Error("Place not found");
  }
  
  if (!place.tags.includes(tag)) {
    res.status(400);
    throw new Error("This place does not have the specified tag");
  }
  
  place.tags = place.tags.filter(t => t !== tag);
  await place.save();
  
  res.status(200).json({ message: "Tag removed from place successfully", place });
});

module.exports = {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlaceById,
  deletePlaceById,
  getPlacesByPlaceType,
  deletePlaceImage,
  reorderPlaceImages,
  addCategoryToPlace,
  addTagToPlace,
  removeTagFromPlace
};
