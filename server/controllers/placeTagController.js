const asyncHandler = require("express-async-handler");
const PlaceTag = require("../models/placeTagModel");
const Place = require("../models/placeModel");
const { checkNotFound } = require("../utils");

//@desc Get all tags
//@route GET /placeTags
//@access public
const getAllPlaceTags = asyncHandler(async (req, res) => {
  const tags = await PlaceTag.find().sort({ type: 1, tag: 1 });
  res.status(200).json(tags);
});

//@desc Get tags by place type
//@route GET /placeTags/by-place-type/:type
//@access public
const getTagsByPlaceType = asyncHandler(async (req, res) => {
  const tags = await PlaceTag.find({ type: req.params.type }).sort({ tag: 1 });
  res.status(200).json(tags);
});

//@desc Create new tag
//@route POST /placeTags
//@access private (admin)
const createPlaceTag = asyncHandler(async (req, res) => {
  const { type, tag } = req.body;

  // Check if required fields are provided
  if (!type || !tag) {
    res.status(400);
    throw new Error("Place type and tag are required fields");
  }

  // Check if tag already exists for this place type
  const existingTag = await PlaceTag.findOne({ type, tag });
  if (existingTag) {
    res.status(400);
    throw new Error("This tag already exists for the specified place type");
  }

  const placeTag = await PlaceTag.create({
    type,
    tag,
  });

  res.status(201).json({ message: "Tag added successfully", placeTag });
});

//@desc Update tag
//@route PUT /placeTags/:id
//@access private (admin)
const updatePlaceTag = asyncHandler(async (req, res) => {
  let placeTag = await PlaceTag.findById(req.params.id);

  checkNotFound(placeTag)(req, res, async () => {
    const oldTag = placeTag.tag;
    const oldPlaceType = placeTag.type;

    placeTag = await PlaceTag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // If the tag name has changed, update all places that use this tag
    if (oldTag !== placeTag.tag && oldPlaceType === placeTag.type) {
      await Place.updateMany(
        { type: oldPlaceType, tags: oldTag },
        { $set: { "tags.$": placeTag.tag } }
      );
    }

    res.status(200).json(placeTag);
  });
});

//@desc Delete tag
//@route DELETE /placeTags/:id
//@access private (admin)
const deletePlaceTag = asyncHandler(async (req, res) => {
  const placeTag = await PlaceTag.findById(req.params.id);

  checkNotFound(placeTag)(req, res, async () => {
    // Remove this tag from all places that have it
    await Place.updateMany(
      { type: placeTag.type, tags: placeTag.tag },
      { $pull: { tags: placeTag.tag } }
    );

    await PlaceTag.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Tag deleted successfully" });
  });
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

  // Check if tag exists for this place type
  const tagExists = await PlaceTag.findOne({ type: place.type, tag });
  if (!tagExists) {
    res.status(400);
    throw new Error(
      "This tag does not exist for the place type: " + place.type
    );
  }

  // Check if tag is already added to this place
  if (place.tags.includes(tag)) {
    res.status(400);
    throw new Error("This tag is already added to the place");
  }

  // Add tag to place
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

  // Check if place has this tag
  if (!place.tags.includes(tag)) {
    res.status(400);
    throw new Error("This place does not have the specified tag");
  }

  // Remove tag from place
  place.tags = place.tags.filter((t) => t !== tag);
  await place.save();

  res
    .status(200)
    .json({ message: "Tag removed from place successfully", place });
});

module.exports = {
  getAllPlaceTags,
  getTagsByPlaceType,
  createPlaceTag,
  updatePlaceTag,
  deletePlaceTag,
  addTagToPlace,
  removeTagFromPlace,
};
