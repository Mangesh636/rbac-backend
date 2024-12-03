import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { dbConnect } from "./config/dbConnect.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";

const app = express();
dbConnect();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRouter);
app.use(userRouter);

// Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
