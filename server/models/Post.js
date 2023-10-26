import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plants",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },

  title: {
    type: String,
    required: [true, "Title is required"],
  },

  content: {
    type: String,
    required: [true, "Content is required"],
  },
  image: {
    type: String,
    required: [true, "Image url is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Post", postSchema);
