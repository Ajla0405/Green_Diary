import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import "./db/server.js";
import mongoose from "mongoose";
import plantsRouter from "./routes/plantsRouter.js";
import authRouter from "./routes/authRouter.js";
import postsRouter from "./routes/postsRouter.js";
import cookieParser from "cookie-parser";
import eventsRouter from "./routes/eventsRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
const port = 8000;

app.use(
  cors({ origin: ["http://localhost:5173", "https://greendiary.netlify.app"] })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/plants", plantsRouter);
app.use("/users", userRouter);
app.use("/posts", postsRouter);
app.use("/events", eventsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
