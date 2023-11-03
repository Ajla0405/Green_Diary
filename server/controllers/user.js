import Users from "../models/Users.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await Users.find();
  res.json(user);
});

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};
