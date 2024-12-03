import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/userModel.js";
import { JWT_SECRET } from "../constant/index.js";

/**
 * Function to Register a new user
 * @async
 * @function register
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing user data.
 * @param {string} req.body.username - The username of new user.
 * @param {string} req.body.password - The plain text password for the new user.
 * @param {string} req.body.role - The role of assigned to the new user (e.g., admin, manager or user).
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Promise<void>} Sends a response with the status and a message.
 *
 * @throws {Error} If there is an internal server error.
 *
 * @example
 * // Example of a request body
 * const req = {
 *   body: {
 *     username: "john",
 *     password: "john123",
 *     role: "manager"
 *   }
 * };
 */

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: `User registred with ${username}` });
  } catch (error) {
    console.error();
    res.status(500).json({ message: "Internal Server Error." });
  }
};

/**
 * Function to Login a existing user
 * @async
 * @function login
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing user data.
 * @param {string} req.body.username - The username of user to be logged in.
 * @param {string} req.body.password - The plain text password for the user to be logged in.
 * @param {Object} res - The HTTP response object.
 *
 * @returns {Promise<void>} Sends a response with the status and a message.
 *
 * @throws {Error} If there is an internal server error.
 *
 * @example
 * // Example of a request body
 * const req = {
 *   body: {
 *     username: "john",
 *     password: "john123"
 *   }
 * };
 */

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!username) {
      res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token: token });
  } catch (error) {
    console.error();
    res.status(500).json({ message: "Internal Server Error." });
  }
};
