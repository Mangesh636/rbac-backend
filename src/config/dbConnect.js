import mongoose from "mongoose";
import { DB_URI } from "../constant/index.js";

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * @async
 * @function dbConnect
 *
 * @returns {Promise<void>} Logs a success message if the connection is established, or exits the process on failure.
 *
 * @throws {Error} If the database connection fails, logs the error and terminates the process.
 *
 * @example
 * // Ensure that the `DB_URI` environment variable is set:
 * process.env.DB_URI = "mongodb://localhost:27017/yourDatabaseName";
 *
 * // Call the function to connect to the database
 * dbConnect();
 */

export const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(DB_URI);
    console.log(
      `Database connected: ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
