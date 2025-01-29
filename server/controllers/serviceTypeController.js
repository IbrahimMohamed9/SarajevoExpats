const asyncHandler = require("express-async-handler");
const ServiceType = require("../models/serviceTypeModel");
const { checkNotFound } = require("../utils");
const Service = require("../models/serviceModel");
const { formatArrayDates, formatObjectDates } = require("../utils/formatDate");

//@desc Get all service types
//@route /serviceTypes
//@access public
const getAllServiceTypes = asyncHandler(async (req, res) => {
  const serviceTypes = await ServiceType.find().sort({ createdAt: -1 });
  const formattedServiceTypes = formatArrayDates(serviceTypes);
  res.status(200).json(formattedServiceTypes);
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

  await Service.deleteMany({
    serviceType: serviceType.name,
  });

  await ServiceType.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Service type removed successfully" });
});

//@desc Update service type by id
//@route /serviceTypes/:id
//@access public
const updateServiceTypeById = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      message: "Name is required",
    });
    throw new Error("Name is required");
  }

  const serviceType = await ServiceType.findById(req.params.id);
  if (!serviceType) {
    res.status(404).json({
      message: "Service type not found",
    });
    throw new Error("Service type not found");
  }

  if (req.body.name === serviceType.name) {
    res.status(200).json({
      message: "Service type updated successfully",
      serviceType: serviceType,
    });
  }

  const existingType = await ServiceType.findOne({ name: req.body.name });
  if (existingType) {
    res.status(400).json({
      message: "A service type with this name already exists",
    });
    throw new Error("A service type with this name already exists");
  }

  const updatedServiceType = await ServiceType.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name } },
    { new: true }
  );

  res.status(200).json({
    message: "Service type updated successfully341",
    serviceType: updatedServiceType,
  });
});

//@desc Get service type by id
//@route /serviceTypes/:id
//@access public
const getServiceTypeById = asyncHandler(async (req, res) => {
  const serviceType = await ServiceType.findById(req.params.id);
  if (!serviceType) {
    res.status(404);
    throw new Error("Service type not found");
  }
  const formattedServiceType = formatObjectDates(serviceType);
  res.status(200).json(formattedServiceType);
});

//@desc Get all service types with services
//@route /serviceTypes/with-services
//@access public
const getAllServiceTypesWithServe = asyncHandler(async (req, res) => {
  const serviceTypes = await ServiceType.find();

  const serviceTypesWithServices = await Promise.all(
    serviceTypes.map(async (serviceType) => {
      const services = await Service.find({
        serviceType: serviceType.serviceType,
      });
      return {
        _id: serviceType._id,
        name: serviceType.name,
        createdAt: serviceType.createdAt,
        updatedAt: serviceType.updatedAt,
        subData: services,
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
  getAllServiceTypesWithServe,
};
