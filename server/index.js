import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import "./db/server.js";
import mongoose from "mongoose";
import plantsRouter from "./routes/plantsRouter.js";
import authRouter from "./routes/authRouter.js";
import postsRouter from "./routes/postsRouter.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 8000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/plants", plantsRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
