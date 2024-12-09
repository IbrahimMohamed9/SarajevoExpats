const asyncHandler = require("express-async-handler");
const ServiceSubtype = require("../models/serviceSubtypeModel");
const { checkNotFound } = require("../utils");

//@desc Get all service subtypes
//@route /serviceSubtypes
//@access public
const getAllServiceSubtypes = asyncHandler(async (req, res) => {
  const serviceSubtype = await ServiceSubtype.find();

  res.status(200).json(serviceSubtype);
});

//@desc Create new service subtype
//@route /serviceSubtypes
//@access public
const createServiceSubtypes = asyncHandler(async (req, res) => {
  const { name, serviceType } = req.body;

  const validateRequiredFields = name && serviceType;
  if (!validateRequiredFields) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const serviceSubtype = await ServiceSubtype.create({ ...req.body });
  res.status(201).json({
    message: "The service subtype added successfully",
    serviceSubtype,
  });
});

//@desc Delete service subtype by id
//@route /serviceSubtypes/:id
//@access public
const deleteServiceSubtypesById = asyncHandler(async (req, res) => {
  const serviceSubtype = await ServiceSubtype.findById(req.params.id);

  checkNotFound(serviceSubtype)(req, res, async () => {
    await ServiceSubtype.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ message: "The service subtype deleted successfully" });
  });
});

//@desc Update service subtype by id
//@route /serviceSubtypes/:id
//@access public
const updateServiceSubtypesById = asyncHandler(async (req, res) => {
  let serviceSubtype = await ServiceSubtype.findById(req.params.id);

  checkNotFound(serviceSubtype)(req, res, async () => {
    serviceSubtype = await ServiceSubtype.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(serviceSubtype);
  });
});

//@desc Get service subtype by id
//@route /serviceSubtypes/:id
//@access public
const getServiceSubtypesById = asyncHandler(async (req, res) => {
  const serviceSubtype = await ServiceSubtype.findById(req.params.id);

  checkNotFound(serviceSubtype)(req, res, async () => {
    res.status(200).json(serviceSubtype);
  });
});

module.exports = {
  getAllServiceSubtypes,
  createServiceSubtypes,
  deleteServiceSubtypesById,
  updateServiceSubtypesById,
  getServiceSubtypesById,
};
