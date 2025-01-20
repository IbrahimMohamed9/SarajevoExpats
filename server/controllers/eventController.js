const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");
const { checkNotFound } = require("../utils");
const fetchPosts = require("../utils/instagram/fetchPosts");
const puppeteer = require("puppeteer");

//@desc Get all events
//@route GET /api/events
//@access public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort({ timestamp: -1 });
  res.json(events);
});

//@desc Get event by ID
//@route GET /api/events/:id
//@access public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  checkNotFound(event)(req, res, () => {
    res.status(200).json(event);
  });
});

//@desc Get pinned events
//@route GET /api/events/pinned
//@access public
const getPinnedEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ pinned: true }).sort({ timestamp: -1 });
  res.json(events);
});

//@desc Create new event from Instagram
//@route POST /api/events
//@access private/admin
const getEventsFromInstagram = asyncHandler(async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    const events = await fetchPosts(page);
    await browser.close();

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found from Instagram" });
    }

    let counter = 0;
    const createdEvents = [];

    for (const event of events) {
      const newEvent = await Event.create({
        content: event.content,
        images: event.images,
        videos: event.videos,
        url: event.postUrl,
        timestamp: event.timestamp,
        pinned: false,
      });

      createdEvents.push(newEvent);
      counter++;

      if (counter === 2) break;
    }

    res.status(201).json({
      message: "Events added successfully",
      events: createdEvents,
    });
  } catch (error) {
    if (browser) await browser.close();
    throw error;
  }
});

//@desc Delete event by ID
//@route DELETE /api/events/:id
//@access private/admin
const deleteEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  checkNotFound(event, "Event");

  await event.deleteOne();
  res.json({ message: "Event deleted successfully" });
});

//@desc Update event by ID
//@route PUT /api/events/:id
//@access private/admin
const updateEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  checkNotFound(event, "Event");

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedEvent);
});

module.exports = {
  getEvents,
  getEventById,
  getEventsFromInstagram,
  deleteEventById,
  getPinnedEvents,
  updateEventById,
};
