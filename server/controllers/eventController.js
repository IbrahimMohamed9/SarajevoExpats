const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");
const { checkNotFound } = require("../utils");
const { ApifyClient } = require("apify-client");
const downloadImage = require("../utils/downloadImage");
const downloadVideo = require("../utils/downloadVideo");
const { logError } = require("../utils/logger");

//@desc Get all events
//@route GET /api/events
//@access public
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort({ pinned: -1, date: -1 });

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
  try {
    async function fetchPosts() {
      const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
      });

      return await (async () => {
        const run = await client.task("de5yFFccfMMA4R7bW").call();

        const { items } = await client
          .dataset(run.defaultDatasetId)
          .listItems();
        return items;
      })();
    }

    const events = 1;

    if (!events || events.length === 0)
      return res
        .status(404)
        .json({ message: "No events found from Instagram" });

    const createdEvents = [];
    for (const event of events) {
      const eventExists = await Event.findOne({ url: event.url });
      if (eventExists) continue;

      const childPosts = await Promise.all(
        event.childPosts.map(async (post) => {
          try {
            if (!post.displayUrl && !post.videoUrl) {
              logError(`Missing URLs for child post: ${post.id}`);
              return null;
            }

            const [displayUrl, videoUrl] = await Promise.all([
              post.displayUrl
                ? downloadImage(post.displayUrl, true).catch((err) => {
                    logError(
                      `Error downloading image for post ${post.id}:`,
                      err
                    );
                    return null;
                  })
                : null,
              post.type === "Video" && post.videoUrl
                ? downloadVideo(post.videoUrl, true).catch((err) => {
                    logError(
                      `Error downloading video for post ${post.id}:`,
                      err
                    );
                    return null;
                  })
                : null,
            ]);

            return {
              type: post.type,
              displayUrl,
              videoUrl,
              alt: post.alt,
            };
          } catch (error) {
            logError(`Failed to process child post ${post.id}:`, error);
            return null;
          }
        })
      );

      let displayUrl = null;
      try {
        displayUrl = await downloadImage(event.displayUrl, true);
      } catch (err) {
        logError(`Error downloading main event image:`, err);
      }

      const newEvent = await Event.create({
        content: event.caption,
        url: event.url,
        displayUrl: displayUrl,
        date: event.timestamp,
        childPosts: childPosts,
        pinned: event.isPinned,
      });

      createdEvents.push(newEvent);
    }

    res.status(201).json({
      message: "Events added successfully",
      events: createdEvents,
    });
  } catch (error) {
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
