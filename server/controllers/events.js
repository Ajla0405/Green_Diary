import Events from "../models/Events.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createEvent = asyncHandler(async (req, res, next) => {
  const { plantId, eventType, eventDate } = req.body;
  const userId = req.uid;

  const event = await Events.create({
    user: userId,
    eventType,
    eventDate,
  });

  res.status(201).json(event);
});

export const getEventById = asyncHandler(async (req, res, next) => {
  const eventId = req.params.id;

  const event = await Events.findById(eventId).populate("user");

  if (!event) {
    return next(new ErrorResponse(`Event not found with ID ${eventId}`, 404));
  }

  res.status(200).json(event);
});

export const getAllEvents = asyncHandler(async (req, res, next) => {
  try {
    const events = await Events.find();

    if (!events.length) {
      throw { statusCode: 404, message: "Events not found" };
    }

    res.json(events);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message || "An error occurred while fetching the events.",
    });
    next(error);
  }
});

export const updateEvent = asyncHandler(async (req, res, next) => {
  const eventId = req.params.id;
  const eventData = req.body;

  const updatedEvent = await Events.findByIdAndUpdate(eventId, eventData, {
    new: true,
    runValidators: true,
  });

  if (!updatedEvent) {
    return next(new ErrorResponse(`Event not found with ID ${eventId}`, 404));
  }

  res.status(200).json(updatedEvent);
});

export const deleteEvent = asyncHandler(async (req, res, next) => {
  const eventId = req.params.id;

  const event = await Events.findById(eventId);

  if (!event) {
    return next(new ErrorResponse(`Event not found with ID ${eventId}`, 404));
  }

  await Events.findByIdAndDelete(eventId);

  res.json({ success: `Event with ID ${eventId} was deleted` });
});
