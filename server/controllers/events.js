// const nodemailer = require("nodemailer");
// const schedule = require("node-schedule");

import Events from "../models/Events.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createEvent = asyncHandler(async (req, res, next) => {
  const { plantId, eventType, eventDate } = req.body;
  const userId = req.uid;

  const event = await Events.create({
    user: userId,
    plant: plantId,
    eventType,
    eventDate,
  });

  res.status(201).json(event);
});

export const getEventById = asyncHandler(async (req, res, next) => {
  const eventId = req.params.id;

  const event = await Events.findById(eventId)
    .populate("user")
    .populate("plant");

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

// function scheduleReminder(userId, plantId, eventType, eventDate, reminderDays) {

//   const reminderDate = new Date(eventDate);
//   reminderDate.setDate(reminderDate.getDate() + reminderDays);

//   const jobName = `reminder_${userId}_${plantId}_${eventType}_${eventDate}`;
// schedule.scheduleJob(jobName, reminderDate, function () {

//     sendEmailReminder(userId, plantId, eventType, eventDate);
//   });
// }

// function sendEmailReminder(userId, plantId, eventType, eventDate) {
//   const transporter = nodemailer.createTransport({
//     service: "YourEmailService",
//     auth: {
//       user: "your@email.com",
//       pass: "yourpassword",
//     },
//   });

//   const mailOptions = {
//     from: "your@email.com",
//     to: "recipient@email.com",
//     subject: "Reminder: Water Your Plant",
//     text: `Don't forget to water your plant (Plant ID: ${plantId}) - ${eventType} on ${eventDate}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Email error:", error);
//     } else {
//       console.log("Email sent:", info.response);
//     }
//   });
// }
