const asyncHandler = require("express-async-handler");
const News = require("../models/newsModel");

//@desc Get all news
//@route GET /api/news
//@access Private
const getAllNews = asyncHandler(async (req, res) => {
  const news = await News.find().sort({ timestamp: -1 });

  res.status(200).json(news);
});

//@desc Create new news
//@route POST /api/news
//@access Private
const createNews = asyncHandler(async (req, res) => {
  const { title, content, picture, pictureDescription, sources } = req.body;

  const requiredFields = {
    title,
    content,
    picture,
    sources,
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

  const news = await News.create({
    title,
    content,
    picture,
    pictureDescription,
    sources,
  });

  res.status(201).json({ message: "The news added successfully", news });
});

//@desc Get news by id
//@route GET /api/news/:id
//@access Public
const getNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    res.status(404).json({
      message: "News not found",
    });
    throw new Error("News not found");
  }

  res.status(200).json(news);
});

//@desc Delete news by id
//@route DELETE /api/news/:id
//@access Private
const deleteNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    res.status(404).json({
      message: "News not found",
    });
    throw new Error("News not found");
  }

  await News.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "News removed successfully" });
});

//@desc Update news by id
//@route PUT /api/news/:id
//@access Private
const updateNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    res.status(404).json({
      message: "News not found",
    });
    throw new Error("News not found");
  }

  const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ message: "News updated successfully", updatedNews });
});

module.exports = {
  getAllNews,
  createNews,
  getNewsById,
  deleteNewsById,
  updateNewsById,
};
