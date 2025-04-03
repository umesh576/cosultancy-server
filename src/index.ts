import express from "express";
// import dotenv from "dotenv";
import "dotenv/config";
import { connectDatabase } from "./config/database.config";
import userRoute from "./routes/user.routes";
import reviewRouter from "./routes/review.routes";
import ComProjectRoute from "./routes/comproject.routes";
import path from "path";
import { Request, Response, NextFunction } from "express";
import CustomError from "./middleware/errorHandler.middleware";
import giveProjectRoute from "./routes/giveProject.routes";
import feedbackRouter from "./routes/feedback.routes";
import serviceRoute from "./routes/service.routes";
import conatctRoutes from "./routes/contact.routes";
import cors from "cors";

const PORT = process.env.PORT || 2000;
const DB_URI = process.env.DB_URI;

connectDatabase(DB_URI);

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// serving static files
server.use(
  "/api/uploads",
  express.static(path.join(__dirname, "../", "uploads"))
);

server.use(cors({ origin: "http://localhost:3000" })); // Change 3000 if your frontend runs on a different port

console.log("👊 ~ index.ts:23 ~ __dirname:", __dirname);

server.use("/api/user", userRoute);
server.use("/api/review", reviewRouter);
server.use("/api/project", ComProjectRoute);
server.use("/api/giveproject", giveProjectRoute);
server.use("/api/feedback", feedbackRouter);
server.use("/api/service", serviceRoute);
server.use("/api/contact", conatctRoutes);

// handle not found path
server.all("*", (req: Request, res: Response, next: NextFunction) => {
  const message = `can not ${req.method} on ${req.originalUrl}`;

  const error = new CustomError(message, 404);
  next(error);
});

// error handler

server.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message || "Something went wrong";

  res.status(statusCode).json({
    status,
    success: false,
    message,
  });
});

server.listen(PORT, () => {
  console.log(`Localhost running at the port: http//localhost:${PORT}`);
});
