import express from "express";
import { login, register } from "../controller/authController.js";

/**
 * Express router for authentication routes.
 * 
 * @description
 * This module defines routes for user authentication, including user registration and login.
 * 
 * @example
 * // Import the router in your server setup
 * import { authRouter } from './routes/authRoutes.js';
 * app.use(authRouter);
 * 
 * @route POST /auth/register
 * @description Register a new user.
 * @access Public
 * 
 * @route POST /auth/login
 * @description Log in a user.
 * @access Public
 */

// create the user router
export const authRouter = express.Router();

/**
 * Route for user registration.
 * @name POST /auth/register
 * @function
 * @memberof module:authRouter
 * @inner
 * @param {Function} register - Controller function for user registration.
 */
authRouter.post("/auth/register", register);

/**
 * Route for user login.
 * @name POST /auth/login
 * @function
 * @memberof module:authRouter
 * @inner
 * @param {Function} login - Controller function for user login.
 */
authRouter.post("/auth/login", login);
