const asyncHandler = require("express-async-handler");
const News = require("../models/newsModel");
const { formatArrayDates, formatObjectDates } = require("../utils/formatDate");

//@desc Get all news
//@route GET /api/news
//@access Private
const getAllNews = asyncHandler(async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  const formattedNews = formatArrayDates(news);
  res.status(200).json(formattedNews);
});

//@desc Get all news
//@route GET /api/news
//@access Private
const getSliderNews = asyncHandler(async (req, res) => {
  const news = await News.find({ showInSlider: true }).sort({
    slidePriority: -1,
  });
  const formattedNews = formatArrayDates(news);
  res.status(200).json(formattedNews);
});

//@desc Create new news
//@route POST /api/news
//@access Private
const createNews = asyncHandler(async (req, res) => {
  const { title, content, pictures, pictureDescription, sources } = req.body;

  const requiredFields = {
    title,
    content,
    pictures,
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
    pictures,
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
    res.status(404);
    throw new Error("News not found");
  }
  const formattedNews = formatObjectDates(news);
  res.status(200).json(formattedNews);
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

//@desc Delete image from news
//@route DELETE /news/:id/images/:index
//@access private
const deleteNewsImage = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    res.status(404);
    throw new Error("News not found");
  }

  const index = parseInt(req.params.index);
  if (index < 0 || index >= news.pictures.length) {
    res.status(400);
    throw new Error("Invalid image index");
  }

  news.pictures.splice(index, 1);
  await news.save();

  res.status(200).json({ message: "Image deleted successfully", news });
});

//@desc Change image position in news
//@route PUT /news/:id/images/reorder
//@access private
const reorderNewsImages = asyncHandler(async (req, res) => {
  const { fromIndex, toIndex } = req.body;
  const news = await News.findById(req.params.id);

  if (!news) {
    res.status(404);
    throw new Error("News not found");
  }

  if (
    fromIndex < 0 ||
    fromIndex >= news.pictures.length ||
    toIndex < 0 ||
    toIndex >= news.pictures.length
  ) {
    res.status(400);
    throw new Error("Invalid index");
  }

  const [movedItem] = news.pictures.splice(fromIndex, 1);
  news.pictures.splice(toIndex, 0, movedItem);
  await news.save();

  res.status(200).json({ message: "Images reordered successfully", news });
});

module.exports = {
  getAllNews,
  createNews,
  getNewsById,
  deleteNewsById,
  updateNewsById,
  getSliderNews,
  deleteNewsImage,
  reorderNewsImages,
};
