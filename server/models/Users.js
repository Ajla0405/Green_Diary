import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "name is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastname is required"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userPhoto: {
    type: String,
    default: "../images/userPhoto.png",
  },
  savedPlant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plants",
  },
});

export default mongoose.model("Users", userSchema);
