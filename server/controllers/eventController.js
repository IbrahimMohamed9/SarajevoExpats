const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");
const { checkNotFound } = require("../utils");

//@desc Get all events
//@route GET /api/events
//@access public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
});

//@desc Get all pinned events
//@route GET /api/events
//@access public
const getPinnedEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ pinned: true });
  res.status(200).json(events);
});

//@desc Get event by Id
//@route /api/events/:id
//@access public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  checkNotFound(event)(req, res, () => {
    res.status(200).json(event);
  });
});

//@desc Create new event
//@route /api/events
//@access public
const createEvent = asyncHandler(async (req, res) => {
  const { title, content, picture, pictureDescription, url, phone, email } =
    req.body;

  const requiredFields = {
    title,
    content,
    picture,
    url,
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

  const event = await Event.create({
    title,
    content,
    picture,
    pictureDescription,
    url,
    phone,
    email,
  });

  res.status(201).json({ message: "The event added successfully", event });
});

//@desc Delete event by Id
//@route /api/events/:id
//@access public
const deleteEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  checkNotFound(event)(req, res, async () => {
    await Event.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "The event deleted successfully" });
  });
});

//@desc Update event by Id
//@route /api/events/:id
//@access public
const updateEventById = asyncHandler(async (req, res) => {
  let event = await Event.findById(req.params.id);

  checkNotFound(event)(req, res, async () => {
    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "The event updated successfully", event });
  });
});

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  deleteEventById,
  getPinnedEvents,
  updateEventById,
};
