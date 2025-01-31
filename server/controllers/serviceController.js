const asyncHandler = require("express-async-handler");
const Service = require("../models/serviceModel");
const { checkNotFound } = require("../utils");
const { formatArrayDates, formatObjectDates } = require("../utils/formatDate");

let orderByCreatedAtForAll = 1;
let orderByCreatedAtForServiceType = 1;

//@desc Get all services
//@route /services
//@access public
const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({
    priority: -1,
    pinned: -1,
    createdAt: orderByCreatedAtForAll,
  });
  orderByCreatedAtForAll = orderByCreatedAtForAll === 1 ? -1 : 1;
  console.log(orderByCreatedAtForAll);

  const formattedServices = formatArrayDates(services);
  res.status(200).json(formattedServices);
});

//@desc Get all under spacific serviceType
//@route /services
//@access public
const getServicesByServiceType = asyncHandler(async (req, res) => {
  const services = await Service.find({
    serviceType: req.params.serviceType,
  }).sort({
    priority: -1,
    pinned: -1,
    createdAt: orderByCreatedAtForServiceType,
  });
  orderByCreatedAtForServiceType =
    orderByCreatedAtForServiceType === 1 ? -1 : 1;

  console.log(orderByCreatedAtForServiceType);

  if (!services.length) {
    res.status(404);
    throw new Error(
      `No service subtypes found for type: ${req.params.serviceType}`
    );
  }

  const formattedServices = formatArrayDates(services);
  res.status(200).json(formattedServices);
});

//@desc Create new service
//@route /services
//@access public
const createService = asyncHandler(async (req, res) => {
  const { name, content, picture, serviceType, phone, email } = req.body;

  const requiredFields = {
    name,
    content,
    picture,
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

  // Check if at least one contact method is provided
  const contactFields = { phone, email };
  const hasContactMethod = Object.values(contactFields).some((value) => value);

  if (!hasContactMethod) {
    res.status(400).json({
      message: "At least one contact method (phone or email) is required",
    });
    throw new Error("At least one contact method (phone or email) is required");
  }

  const service = await Service.create({ ...req.body });
  const formattedService = formatObjectDates(service);
  res.status(201).json({
    message: "The service added successfully",
    service: formattedService,
  });
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
  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }
  const formattedService = formatObjectDates(service);
  res.status(200).json(formattedService);
});

module.exports = {
  getAllServices,
  createService,
  deleteServiceById,
  updateServiceById,
  getServiceById,
  getServicesByServiceType,
};
