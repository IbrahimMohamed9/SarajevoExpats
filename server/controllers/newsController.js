const asyncHandler = require("express-async-handler");
const News = require("../models/newsModel");
const { checkNotFound } = require("../utils");

//@desc Get all news
//@route /news
//@access public
const getAllNews = asyncHandler(async (req, res) => {
  const news = await News.find();
  res.status(200).json(news);
});

//@desc Create new news
//@route /news/
//@access public
const createNews = asyncHandler(async (req, res) => {
  const { title, content, picture, sources } = req.body;

  const validateRequiredFields = title && content && picture && sources;
  if (!validateRequiredFields) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const news = await News.create({ ...req.body });
  res.status(201).json({ message: "The event added successfully", news });
});

//@desc Get news by id
//@route /news/:id
//@access public
const getNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);

  checkNotFound(news)(req, res, () => {
    res.status(200).json(news);
  });
});

//@desc Delete news by id
//@route /news/:id
//@access public
const deleteNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);

  checkNotFound(news)(req, res, async () => {
    await News.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "News article deleted successfully." });
  });
});

//@desc Update news by id
//@route /news/:id
//@access public
const updateNewsById = asyncHandler(async (req, res) => {
  let news = await News.findById(req.params.id);

  checkNotFound(news)(req, res, async () => {
    news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(news);
  });
});

module.exports = {
  getAllNews,
  createNews,
  getNewsById,
  deleteNewsById,
  updateNewsById,
};
