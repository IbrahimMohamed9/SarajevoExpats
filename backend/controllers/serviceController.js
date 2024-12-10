const asyncHandler = require("express-async-handler");
const Service = require("../models/serviceModel");
const { checkNotFound } = require("../utils");

//@desc Get all services
//@route /services
//@access public
const getAllServices = asyncHandler(async (req, res) => {
  const service = await Service.find();

  res.status(200).json(service);
});

//@desc Create new service
//@route /services
//@access public
const createService = asyncHandler(async (req, res) => {
  const { name, content, picture, phone, email } = req.body;

  const validateRequiredFields = name && content && picture;
  if (!validateRequiredFields) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const validateoptionFields = phone && email;
  if (!validateoptionFields) {
    res.status(400);
    throw new Error("At least one of phone or email must be provided");
  }

  const service = await Service.create({ ...req.body });
  res.status(201).json({ message: "The service added successfully", service });
});

//@desc Delete service by id
//@route /services/:id
//@access public
const deleteServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  checkNotFound(service)(req, res, async () => {
    await Service.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "The service deleted successfully" });
  });
});

//@desc Update service by id
//@route /services/:id
//@access public
const updateServiceById = asyncHandler(async (req, res) => {
  let service = await Service.findById(req.params.id);

  checkNotFound(service)(req, res, async () => {
    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(service);
  });
});

//@desc Get service by id
//@route /services/:id
//@access public
const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  checkNotFound(service)(req, res, async () => {
    res.status(200).json(service);
  });
});

module.exports = {
  getAllServices,
  createService,
  deleteServiceById,
  updateServiceById,
  getServiceById,
};
