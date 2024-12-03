import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant/index.js";

/**
 * Middleware to verify the JWT token from the authorization header.
 *
 * @function verifyToken
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.headers - The headers of the HTTP request.
 * @param {string} req.headers.Authorization - The authorization header containing the Bearer token.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function to call if verification succeeds.
 *
 * @returns {void} Sends a response with the status and a message in case of failure, or calls the `next` middleware on success.
 *
 * @throws {Error} If the token is invalid or missing, appropriate status codes and error messages are returned.
 *
 * @example
 * // Example of an authorization header
 * const req = {
 *   headers: {
 *     Authorization: "Bearer your_jwt_token_here"
 *   }
 * };
 *
 * // Usage in an Express route
 * userRouter.get('/admin', verifyToken, (req, res) => {
 *   res.send('Welcome admin!');
 * });
 */

export const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "authorization denied." });
        }

        try {
            const decode = jwt.verify(token, JWT_SECRET);
            req.user = decode;

            // remove below comment to view response data in console.
            // console.log("The decoed user is:", req.user);
            next();
        } catch (error) {
            console.error();
            res.status(400).json({ message: "Invalid token" });
        }
    } else {
        res.status(401).json({ message: "No Token provided, Unauthorized." });
    }
};
