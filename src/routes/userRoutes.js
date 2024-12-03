import express from "express";

import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

/**
 * Express router for user-related routes with role-based authorization.
 * 
 * @description
 * This module defines routes for user access with role-based authorization, including routes for "admin", 
 * "manager", and "user" roles. Each route has a corresponding middleware for token verification and role authorization.
 * 
 * @example
 * // Import the router in your server setup
 * import { userRouter } from './routes/userRoutes.js';
 * app.use(userRouter);
 * 
 * @route GET /admin
 * @description Access restricted to admin only.
 * @access Private (admin only)
 * 
 * @route GET /manager
 * @description Access restricted to admin and manager.
 * @access Private (admin and manager only)
 * 
 * @route GET /user
 * @description Access restricted to admin, manager, and user.
 * @access Private (admin, manager, and user only)
 */

// Create the userRouter
export const userRouter = express.Router();

/**
 * Route for admin-only access.
 * @name GET /admin
 * @function
 * @memberof module:userRouter
 * @inner
 * @param {Function} verifyToken - Middleware to verify JWT token.
 * @param {Function} authorizeRoles - Middleware to check if the user has the "admin" role.
 * @param {Function} (req, res) - Controller to handle the response.
 * @access Private (admin only)
 */

userRouter.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome admin" });
});

/**
 * Route for manager and admin access.
 * @name GET /manager
 * @function
 * @memberof module:userRouter
 * @inner
 * @param {Function} verifyToken - Middleware to verify JWT token.
 * @param {Function} authorizeRoles - Middleware to check if the user has the "admin" or "manager" role.
 * @param {Function} (req, res) - Controller to handle the response.
 * @access Private (admin and manager only)
 */

userRouter.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  (req, res) => {
    res.json({ message: "Welcome manager" });
  }
);

/**
 * Route for user, manager, and admin access.
 * @name GET /user
 * @function
 * @memberof module:userRouter
 * @inner
 * @param {Function} verifyToken - Middleware to verify JWT token.
 * @param {Function} authorizeRoles - Middleware to check if the user has the "admin", "manager", or "user" role.
 * @param {Function} (req, res) - Controller to handle the response.
 * @access Private (admin, manager, and user only)
 */

userRouter.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "Welcome user" });
  }
);
