import express from "express";
import * as eventsController from "../controllers/events.js";
import verifyToken from "../middlewares/verifyToken.js";
import { Router } from "express";

const eventsRouter = express.Router();

eventsRouter
  .route("/create-event")
  .post(verifyToken, eventsController.createEvent);

eventsRouter
  .route("/get-event")
  .get(verifyToken, eventsController.getAllEvents);

eventsRouter
  .route("/get-event/:id")
  .get(verifyToken, eventsController.getEventById);

eventsRouter
  .route("/update-event/:id")
  .put(verifyToken, eventsController.updateEvent);

eventsRouter
  .route("/delete-event/:id")
  .delete(verifyToken, eventsController.deleteEvent);

export default eventsRouter;
