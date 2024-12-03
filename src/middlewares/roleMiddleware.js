/**
 * Middleware to authorize user roles for accessing specific routes.
 *
 * @function authorizeRoles
 * @param {...string} allowedRoles - The roles permitted to access the route (e.g., "admin", "editor", "user").
 *
 * @returns {Function} A middleware function that checks the user's role.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.user - The user object attached to the request (populated by previous middleware like authentication).
 * @param {string} req.user.role - The role of the authenticated user.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function to call if the user is authorized.
 *
 * @throws {Error} Sends a 403 response with a message "Access denied" if the user's role is not in the allowedRoles list.
 *
 * @example
 * // Usage in an Express route
 * userRouter.get('/admin', authorizeRoles('admin'), (req, res) => {
 *   res.send('Welcome, Admin!');
 * });
 *
 * @example
 * // Example of a user object on `req.user`
 * req.user = {
 *   role: "admin"
 * };
 *
 * // Middleware checks if "admin" is in the allowedRoles
 * authorizeRoles('admin', 'manager')(req, res, next);
 */

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
