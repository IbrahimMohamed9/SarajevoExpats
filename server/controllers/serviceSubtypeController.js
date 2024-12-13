const asyncHandler = require("express-async-handler");
const ServiceSubtype = require("../models/serviceSubtypeModel");
const ServiceType = require("../models/serviceTypeModel");
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
const createServiceSubtype = asyncHandler(async (req, res) => {
  const { name, serviceType } = req.body;

  const requiredFields = {
    name,
    serviceType,
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

  // Check if service type exists
  const type = await ServiceType.findOne({ name: serviceType });
  if (!type) {
    res.status(400).json({
      message: "Invalid service type. Please provide a valid service type name",
    });
    throw new Error("Invalid service type. Please provide a valid service type name");
  }

  // Check if service subtype with same name already exists
  const existingSubtype = await ServiceSubtype.findOne({ name });
  if (existingSubtype) {
    res.status(400).json({
      message: "A service subtype with this name already exists",
    });
    throw new Error("A service subtype with this name already exists");
  }

  const serviceSubtype = await ServiceSubtype.create({
    name,
    serviceType,
  });

  res.status(201).json({
    message: "Service subtype created successfully",
    serviceSubtype,
  });
});

//@desc Delete service subtype by id
//@route /serviceSubtypes/:id
//@access public
const deleteServiceSubtypeById = asyncHandler(async (req, res) => {
  const serviceSubtype = await ServiceSubtype.findById(req.params.id);
  if (!serviceSubtype) {
    res.status(404).json({
      message: "Service subtype not found",
    });
    throw new Error("Service subtype not found");
  }

  await ServiceSubtype.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Service subtype removed successfully" });
});

//@desc Update service subtype by id
//@route /serviceSubtypes/:id
//@access public
const updateServiceSubtypeById = asyncHandler(async (req, res) => {
  const serviceSubtype = await ServiceSubtype.findById(req.params.id);
  if (!serviceSubtype) {
    res.status(404).json({
      message: "Service subtype not found",
    });
    throw new Error("Service subtype not found");
  }

  // If updating service type, validate it exists
  if (req.body.serviceType) {
    const type = await ServiceType.findOne({ name: req.body.serviceType });
    if (!type) {
      res.status(400).json({
        message: "Invalid service type. Please provide a valid service type name",
      });
      throw new Error("Invalid service type. Please provide a valid service type name");
    }
  }

  // If updating name, check for duplicates
  if (req.body.name && req.body.name !== serviceSubtype.name) {
    const existingSubtype = await ServiceSubtype.findOne({ name: req.body.name });
    if (existingSubtype) {
      res.status(400).json({
        message: "A service subtype with this name already exists",
      });
      throw new Error("A service subtype with this name already exists");
    }
  }

  const updatedServiceSubtype = await ServiceSubtype.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    message: "Service subtype updated successfully",
    serviceSubtype: updatedServiceSubtype,
  });
});

//@desc Get service subtype by id
//@route /serviceSubtypes/:id
//@access public
const getServiceSubtypeById = asyncHandler(async (req, res) => {
  const serviceSubtype = await ServiceSubtype.findById(req.params.id);

  checkNotFound(serviceSubtype)(req, res, async () => {
    res.status(200).json(serviceSubtype);
  });
});

//@desc Get all service subtypes with services
//@route /serviceSubtypes/with-services
//@access public
const getAllServiceSubtypesWithServices = asyncHandler(async (req, res) => {
  const serviceSubtypes = await ServiceSubtype.find();
  const Service = require("../models/serviceModel");

  const serviceSubtypesWithServices = await Promise.all(
    serviceSubtypes.map(async (subtype) => {
      const services = await Service.find({ serviceSubtype: subtype.name });
      return {
        _id: subtype._id,
        name: subtype.name,
        serviceType: subtype.serviceType,
        subData: services.map((service) => ({
          _id: service._id,
          name: service.name,
        })),
      };
    })
  );

  res.status(200).json(serviceSubtypesWithServices);
});

module.exports = {
  getAllServiceSubtypes,
  createServiceSubtype,
  deleteServiceSubtypeById,
  updateServiceSubtypeById,
  getServiceSubtypeById,
  getAllServiceSubtypesWithServices,
};
