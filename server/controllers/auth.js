import Users from "../models/Users.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Plants from "../models/Plants.js";

//Register

export const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, username, email, password, date, userPhoto } =
    req.body;
  const existingUser = await Users.findOne({ email });
  if (existingUser)
    throw new ErrorResponse("An account with this Email already exists", 409);
  const hash = await bcrypt.hash(password, 10);
  const newUser = await Users.create({
    firstName,
    lastName,
    username,
    email,
    date,
    userPhoto,
    password: hash,
  });
  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.status(201).send({ token });
});

//Login

export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await Users.findOne({ email }).select("+password");
  if (!existingUser) throw new ErrorResponse("User does not exist", 404);

  const match = await bcrypt.compare(password, existingUser.password);
  if (!match) throw new ErrorResponse("Password is incorrect", 401);

  const token = jwt.sign({ uid: existingUser._id }, process.env.JWT_SECRET);
  res.cookie("token", token, { httpOnly: true, maxAge: 1800000 });
  res.status(200).send({ status: "success" });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await Users.findById(req.uid);
  res.json(user);
});

//logout

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).send({ status: "success" });
});

//savedPlant
export const savedPlant = asyncHandler(async (req, res, next) => {
  const favoritePlants = await Plants.find().populate("user");
  res.json(favoritePlants);
});

//savedPlantById

export const savedPlantById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const favoritePlantById = await Plants.findById(id).populate("user");
  if (!favoritePlantById)
    throw new ErrorResponse(`Plant with ${id} does not exist`, 404);
  res.send(favoritePlantById);
});
