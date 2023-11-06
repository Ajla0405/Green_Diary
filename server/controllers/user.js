import Users from "../models/Users.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await Users.find().populate("savedPlants");
  res.json(user);
});

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id).populate("savedPlants");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const savePlantToUser = asyncHandler(async (req, res, next) => {
  const userId = req.uid;
  const plantId = req.params.plantId;

  const user = await Users.findByIdAndUpdate(
    userId,
    { $addToSet: { savedPlants: plantId } },
    { new: true, runValidators: true }
  ).populate("savedPlants");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

export const unsavePlantFromUser = asyncHandler(async (req, res, next) => {
  const userId = req.uid;
  const plantId = req.params.plantId;

  const user = await Users.findByIdAndUpdate(
    userId,
    { $pull: { savedPlants: plantId } },
    { new: true, runValidators: true }
  ).populate("savedPlants");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});
