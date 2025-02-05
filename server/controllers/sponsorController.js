const Sponsor = require("../models/sponsorModel");
const asyncHandler = require("express-async-handler");
const { formatArrayDates } = require("../utils/formatDate");

// @desc    Get all sponsors
// @route   GET /api/sponsors
// @access  Public
const getSponsors = asyncHandler(async (req, res) => {
  const sponsors = await Sponsor.find().sort({
    priority: -1,
    pinned: -1,
    createdAt: -1,
  });
  const formattedSponsors = formatArrayDates(sponsors);
  res.status(200).json(formattedSponsors);
});

// @desc    Get single sponsor
// @route   GET /api/sponsors/:id
// @access  Public
const getSponsor = asyncHandler(async (req, res) => {
  const sponsor = await Sponsor.findById(req.params.id);
  if (!sponsor) {
    res.status(404);
    throw new Error("Sponsor not found");
  }
  res.status(200).json(sponsor);
});

// @desc    Create sponsor
// @route   POST /api/sponsors
// @access  Private
const createSponsor = asyncHandler(async (req, res) => {
  const { name, picture, priority, pinned } = req.body;

  if (!name || !picture) {
    res.status(400);
    throw new Error("Please provide name and picture");
  }

  const sponsor = await Sponsor.create({
    name,
    picture,
    priority,
    pinned,
  });

  res.status(201).json({ message: "Sponsor created successfully", sponsor });
});

// @desc    Update sponsor
// @route   PUT /api/sponsors/:id
// @access  Private
const updateSponsor = asyncHandler(async (req, res) => {
  const sponsor = await Sponsor.findById(req.params.id);

  if (!sponsor) {
    res.status(404);
    throw new Error("Sponsor not found");
  }

  const updatedSponsor = await Sponsor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedSponsor);
});

// @desc    Delete sponsor
// @route   DELETE /api/sponsors/:id
// @access  Private
const deleteSponsor = asyncHandler(async (req, res) => {
  const sponsor = await Sponsor.findById(req.params.id);

  if (!sponsor) {
    res.status(404);
    throw new Error("Sponsor not found");
  }

  await sponsor.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getSponsors,
  getSponsor,
  createSponsor,
  updateSponsor,
  deleteSponsor,
};
