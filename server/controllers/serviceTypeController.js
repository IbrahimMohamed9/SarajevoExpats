const asyncHandler = require("express-async-handler");
const ServiceType = require("../models/serviceTypeModel");
const { checkNotFound } = require("../utils");
const ServiceSubtype = require("../models/serviceSubtypeModel");

//@desc Get all service types
//@route /serviceTypes
//@access public
const getAllServiceTypes = asyncHandler(async (req, res) => {
  const serviceTypes = await ServiceType.find();

  res.status(200).json(serviceTypes);
});

//@desc Get all service subtypes by service type
//@route /serviceTypes/:name
//@access public
const getAllServiceSubtypesByServiceType = asyncHandler(async (req, res) => {
  const serviceSubtypes = await ServiceSubtype.find({
    serviceType: req.params.name,
  });

  res.status(200).json(serviceSubtypes);
});

//@desc Create new service type
//@route /serviceTypes
//@access public
const createServiceType = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      message: "Name is required",
    });
    throw new Error("Name is required");
  }

  // Check if service type with same name already exists
  const existingType = await ServiceType.findOne({ name });
  if (existingType) {
    res.status(400).json({
      message: "A service type with this name already exists",
    });
    throw new Error("A service type with this name already exists");
  }

  const serviceType = await ServiceType.create({ name });

  res.status(201).json({
    message: "Service type created successfully",
    serviceType,
  });
});

//@desc Delete service type by id
//@route /serviceTypes/:id
//@access public
const deleteServiceTypeById = asyncHandler(async (req, res) => {
  const serviceType = await ServiceType.findById(req.params.id);
  if (!serviceType) {
    res.status(404).json({
      message: "Service type not found",
    });
    throw new Error("Service type not found");
  }

  await ServiceType.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Service type removed successfully" });
});

//@desc Update service type by id
//@route /serviceTypes/:id
//@access public
const updateServiceTypeById = asyncHandler(async (req, res) => {
  const serviceType = await ServiceType.findById(req.params.id);
  if (!serviceType) {
    res.status(404).json({
      message: "Service type not found",
    });
    throw new Error("Service type not found");
  }

  // If updating name, validate it's provided and unique
  if (req.body.name) {
    if (req.body.name !== serviceType.name) {
      const existingType = await ServiceType.findOne({ name: req.body.name });
      if (existingType) {
        res.status(400).json({
          message: "A service type with this name already exists",
        });
        throw new Error("A service type with this name already exists");
      }
    }
  } else {
    res.status(400).json({
      message: "Name is required",
    });
    throw new Error("Name is required");
  }

  const updatedServiceType = await ServiceType.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  res.status(200).json({
    message: "Service type updated successfully",
    serviceType: updatedServiceType,
  });
});

//@desc Get service type by id
//@route /serviceTypes/:id
//@access public
const getServiceTypeById = asyncHandler(async (req, res) => {
  const serviceType = await ServiceType.findById(req.params.id);

  checkNotFound(serviceType)(req, res, async () => {
    res.status(200).json(serviceType);
  });
});

//@desc Get all service types with services
//@route /serviceTypes/with-services
//@access public
const getAllServiceTypesWithSubtypes = asyncHandler(async (req, res) => {
  const serviceTypes = await ServiceType.find();
  const ServiceSubtype = require("../models/serviceSubtypeModel");

  const serviceTypesWithServices = await Promise.all(
    serviceTypes.map(async (serviceType) => {
      const subtypes = await ServiceSubtype.find({
        serviceType: serviceType.name,
      });
      return {
        _id: serviceType._id,
        name: serviceType.name,
        subData: subtypes,
      };
    })
  );

  res.status(200).json(serviceTypesWithServices);
});

module.exports = {
  getAllServiceTypes,
  createServiceType,
  deleteServiceTypeById,
  updateServiceTypeById,
  getServiceTypeById,
  getAllServiceTypesWithSubtypes,
  getAllServiceSubtypesByServiceType,
};
