import express from "express";
import * as eventsController from "../controllers/events.js";
import verifyToken from "../middlewares/verifyToken.js";
import { Router } from "express";

const eventsRouter = express.Router();

eventsRouter.route("/").post(verifyToken, eventsController.createPost);
eventsRouter.route("/").get(verifyToken, eventsController.getAllEvents);
eventsRouter.route("/:id").get(verifyToken, eventsController.getEventById);

eventsRouter
  .route("/:id/update")
  .put(verifyToken, eventsController.updateEvent);
eventsRouter
  .route("/:id/delete")
  .delete(verifyToken, eventsController.deleteEvent);

export default eventsRouter;
