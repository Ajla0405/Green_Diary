import { Router } from "express";
import * as authController from "../controllers/auth.js";
import * as plantsController from "../controllers/plants.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = Router();
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.logIn);
authRouter.post("/logout", verifyToken, authController.logout);
authRouter.get("/me", verifyToken, authController.getUser);
authRouter.get("/savedPlant", verifyToken, authController.savedPlant);
authRouter.get("/savedPlant/:id", verifyToken, authController.savedPlantById);

export default authRouter;
