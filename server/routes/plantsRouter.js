import express from "express";
import * as plantsController from "../controllers/plants.js";
import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";

const plantsRouter = express.Router();

plantsRouter.route("/").get(plantsController.getAllPlants);
plantsRouter.route("/:id").get(plantsController.getPlantById);
plantsRouter.route("/:id").post(verifyToken, plantsController.savedPlant);

export default plantsRouter;
