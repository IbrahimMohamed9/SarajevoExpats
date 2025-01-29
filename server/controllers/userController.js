const errorHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { formatArrayDates, formatObjectDates } = require("../utils/formatDate");

const getAllUsers = errorHandler(async (req, res) => {
  const users = await User.find().select("-password");
  const formattedUsers = formatArrayDates(users);
  res.status(200).json(formattedUsers);
});

const getUserById = errorHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const formattedUser = formatObjectDates(user);
  res.status(200).json(formattedUser);
});

const getMe = errorHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const formattedUser = formatObjectDates(user);
  res.status(200).json(formattedUser);
});

const registerUser = errorHandler(async (req, res) => {
  const { username, email, password, type } = req.body;

  const requiredFields = {
    username,
    email,
    password,
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

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      message: "User with this email already exists",
    });
    throw new Error("User with this email already exists");
  }

  // Validate password length
  if (password.length < 6) {
    res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
    throw new Error("Password must be at least 6 characters long");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    type,
  });

  if (user) {
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        type: user.type,
      },
    });
  }
});

const loggedInUser = errorHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are mandatory",
    });
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      message: "The email or password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        type: user.type,
      },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1000d",
    }
  );
  res.status(200).json({ token });
});

const updateUserById = errorHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    throw new Error("User not found");
  }

  // If password is being updated, hash it
  if (req.body.password) {
    if (req.body.password.length < 6) {
      res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
      throw new Error("Password must be at least 6 characters long");
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select("-password");

  res.status(200).json({ message: "User updated successfully", updatedUser });
});

const deleteUserById = errorHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "User removed successfully" });
});

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  updateUserById,
  deleteUserById,
  loggedInUser,
  getMe,
};
