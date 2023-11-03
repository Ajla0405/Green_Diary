import express from "express";
import * as userController from "../controllers/user.js";

const userRouter = express.Router();

userRouter.route("/").get(userController.getUser);
userRouter.route("/:id").get(userController.getUserById);

export default userRouter;
