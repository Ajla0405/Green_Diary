import Plants from "../models/Plants.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

//without Login

export const getAllPlants = async (req, res, next) => {
  try {
    const plants = await Plants.find();
    // res.setHeader("Content-Type", "application/json");
    // res.send(JSON.stringify(plants));

    if (!plants.length) {
      throw { statusCode: 404, message: "Plants not found" };
    }
    res.json(plants);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message || "An error occurred while fetching the plants.",
    });
    next(error);
  }
};
export const getPlantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const plant = await Plants.findById(id);

    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.json(plant);
  } catch (error) {
    next(error);
  }
};

// //with Login

// export const getAllPlantsLogin = asyncHandler(async (req, res, next) => {
//   const plants = await Plants.find().populate("user");
//   res.json(plants);
// });

// export const getPlantByIdLogin = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   const plants = await Plants.findById(id).populate("user");
//   if (!plants) throw new ErrorResponse(`Plant with ${id} does not exist`, 404);
//   res.send(plants);
// });
