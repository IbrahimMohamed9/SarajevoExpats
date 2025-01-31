const asyncHandler = require("express-async-handler");
const { checkNotFound } = require("../utils");
const QaA = require("../models/QaAModel");
const { formatArrayDates, formatObjectDates } = require("../utils/formatDate");

//@desc Get all QaAs
//@route GET /api/QaAs
//@access public
const getQaAs = asyncHandler(async (req, res) => {
  const qaas = await QaA.find().sort({
    priority: -1,
    pinned: -1,
    createdAt: -1,
  });
  const formattedQaas = formatArrayDates(qaas);
  res.status(200).json(formattedQaas);
});

//@desc Get QaA by Id
//@route /api/QaAs/:id
//@access public
const getQaAById = asyncHandler(async (req, res) => {
  const qaa = await QaA.findById(req.params.id);
  if (!qaa) {
    res.status(404);
    throw new Error("QaA not found");
  }
  const formattedQaa = formatObjectDates(qaa);
  res.status(200).json(formattedQaa);
});

//@desc Create new QaA
//@route /api/QaAs
//@access public
const createQaA = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;

  const requiredFields = {
    question,
    answer,
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

  const qaa = await QaA.create({
    question,
    answer,
  });

  res.status(201).json({ message: "The QaA added successfully", qaa });
});

//@desc Delete QaA by Id
//@route /api/QaAs/:id
//@access public
const deleteQaAById = asyncHandler(async (req, res) => {
  const qaa = await QaA.findById(req.params.id);
  checkNotFound(qaa)(req, res, async () => {
    await QaA.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "The QaA deleted successfully" });
  });
});

//@desc Update QaA by Id
//@route /api/QaAs/:id
//@access public
const updateQaAById = asyncHandler(async (req, res) => {
  let qaa = await QaA.findById(req.params.id);

  checkNotFound(qaa)(req, res, async () => {
    qaa = await QaA.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "The QaA updated successfully", qaa });
  });
});

module.exports = {
  getQaAs,
  getQaAById,
  createQaA,
  deleteQaAById,
  updateQaAById,
};
