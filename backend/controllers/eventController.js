const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");
const { checkNotFound } = require("../utils");

//@desc Get all events
//@route /events
//@access public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
});

//@desc Get event by Id
//@route /events/:id
//@access public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  checkNotFound(event)(req, res, () => {
    res.status(200).json(event);
  });
});

//@desc Create new event
//@route /events
//@access public
const createEvent = asyncHandler(async (req, res) => {
  const { title, content, picture, url, phone, email } = req.body;

  const validateRequiredFields = title && content && picture && url;
  if (!validateRequiredFields) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const validateoptionFields = phone && email;
  if (!validateoptionFields) {
    res.status(400);
    throw new Error("At least one of phone or email must be provided");
  }

  const event = await Event.create({ ...req.body });
  res.status(201).json({ message: "The event added successfully", event });
});

//@desc Delete event by Id
//@route /events/:id
//@access public
const deleteEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  checkNotFound(event)(req, res, async () => {
    await Event.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "The event deleted successfully" });
  });
});

//@desc Update event by Id
//@route /events/:id
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
  updateEventById,
};
