const express = require("express");
const router = express.Router();
const validateAdminToken = require("../middleware/validateAdminToken");
const { validateMongoId } = require("../utils");
const {
  getAllUsers,
  getUserById,
  registerUser,
  updateUserById,
  deleteUserById,
  loggedInUser,
  getMe,
} = require("../controllers/userController");
const ValidateAdminOrMeToken = require("../middleware/ValidateAdminOrMeToken");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users in the system
 *     description: Retrieve all the users stored in the system.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     description: Register a new user with a username, email, and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user's profile
 *     description: Retrieve the profile of the currently authenticated user
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Current user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate a user and get user data
 *     description: Login a user using email and password to receive authentication information.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by their ID
 *     description: Retrieve a user from the system by their unique ID.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - Admin token required
 *   put:
 *     summary: Update a user by their ID
 *     description: Update user details based on the provided user ID.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - Admin token required
 *   delete:
 *     summary: Delete a user by their ID
 *     description: Delete the user with the given ID.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - Admin token required
 */

router.route("/").get(validateAdminToken, getAllUsers).post(registerUser);

router.route("/me").get(ValidateAdminOrMeToken, getMe);

/**
 * @route GET /users/login
 * @description Authenticate a user and get user data
 * @access Public
 * @param {Object} req.body.email - The email of the user
 * @param {Object} req.body.password - The password of the user
 * @returns {Object} Authenticated user object
 */
router.route("/login").post(loggedInUser);

router
  .route("/:id")
  .all(validateAdminToken)
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

/**
 * Middleware to validate MongoDB ID parameter
 */
router.param("id", validateMongoId);

module.exports = router;
