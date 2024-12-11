const asyncHandler = require("express-async-handler");
const ServiceType = require("../models/serviceTypeModel");
const { checkNotFound } = require("../utils");

//@desc Get all service types
//@route /serviceTypes
//@access public
const getAllServiceTypes = asyncHandler(async (req, res) => {
  const serviceType = await ServiceType.find();

  res.status(200).json(serviceType);
});

//@desc Create new service type
//@route /serviceTypes
//@access public
const createServiceType = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const serviceType = await ServiceType.create({ ...req.body });
  res.status(201).json({
    message: "The service type added successfully",
    serviceType,
  });
});

//@desc Delete service type by id
//@route /serviceTypes/:id
//@access public
const deleteServiceTypeById = asyncHandler(async (req, res) => {
  const serviceType = await ServiceType.findById(req.params.id);

  checkNotFound(serviceType)(req, res, async () => {
    await ServiceType.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "The service type deleted successfully" });
  });
});

//@desc Update service subtype by id
//@route /serviceTypes/:id
//@access public
const updateServiceTypeById = asyncHandler(async (req, res) => {
  let serviceType = await ServiceType.findById(req.params.id);
  if (!serviceType) {
    res.status(404);
    throw new Error("Service type not found");
  }

  const exists = await ServiceType.findOne({ name: req.body.name });
  if (exists) {
    res.status(400);
    throw new Error("Service type already exists");
  }

  serviceType = await ServiceType.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    {
      new: true,
    }
  );

  res.status(200).json(serviceType);
});

//@desc Get service subtype by id
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
};
