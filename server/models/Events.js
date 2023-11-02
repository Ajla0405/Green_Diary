import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plants",
  },
  eventType: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Events", eventSchema);
