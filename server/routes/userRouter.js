import express from "express";
import * as userController from "../controllers/user.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = express.Router();

userRouter.route("/").get(userController.getUser);
userRouter.route("/:id").get(userController.getUserById);
userRouter
  .route("/savedPlant/:plantId")
  .post(verifyToken, userController.savePlantToUser);

export default userRouter;
