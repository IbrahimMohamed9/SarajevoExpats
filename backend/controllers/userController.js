const errorHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const getAllUsers = errorHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const getUserById = errorHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
});

const registerUser = errorHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("This email is unavailable");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  if (user)
    res
      .status(201)
      .json({ _id: user._id, username: user.username, email: user.email });
  else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

const loggedInUser = errorHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("The email or password is incorrect");
  }

  const token = jwt.sign(
    { user: { _id: user._id, email: user.email, username: user.usernames } },
    process.env.JWT_SECRET,
    {
      expiresIn: "5d",
    }
  );
  res.status(200).json({ token });
});

const updateUserById = errorHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(user);
});

const deleteUserById = errorHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json(user);
});

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  updateUserById,
  deleteUserById,
  loggedInUser,
};
