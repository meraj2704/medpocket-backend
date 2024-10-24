import { NextFunction, Request, Response } from "express";
import { IFoods } from "./food.interface";
import { FoodService } from "./food.service";
import { sendResponse } from "../../utils/response";
import { dataValidation } from "../../utils/dataValidation";
import { findCategory, findFood } from "../../utils/findFunctions";
import Foods from "./foods.models";

//  ---------------------------------------------
//  ------------------ Create Food --------------  done , remove redundancy
//  ---------------------------------------------
export const createFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("called");
  const { name, quantity, price, category_id, unit, description } = req.body;
  try {
    const existFoodName = await findFood(name);
    if (existFoodName) {
      return sendResponse(res, 400, {
        success: false,
        message: "Food already exists with this name",
      });
    }
    const existCategory = await findCategory(category_id);
    if (!existCategory) {
      return sendResponse(res, 400, {
        success: false,
        message: "Category not found",
      });
    }
console.log(existCategory)
    const image_url = req.file ? req.file.path : undefined;
    const image_path_name = req.file ? req.file.filename : undefined;
    const newFood = {
      name,
      quantity,
      price,
      category_id,
      category_name:existCategory.name,
      unit,
      description,
      image_url,
    };
    console.log(newFood)
    const result = await FoodService.createFood(newFood);
    return sendResponse(res, 201, {
      success: true,
      message: "Food created successfully",
      data: result,
    });
  } catch (error) {
    console.log("error");
    console.log(error);
    next(error);
  }
};

//  ---------------------------------------------
//  ------------------ Get all Food -------------- done
//  ---------------------------------------------

export const getAllFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await FoodService.getFoods();
    return sendResponse(res, 200, {
      success: true,
      message: "Foods retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log("error");
    console.log(error);
    next(error);
  }
};

//  ---------------------------------------------
//  ------------------ Get Single Food -------------- done
//  ---------------------------------------------

export const getSingleFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await FoodService.getFoods(id);
    if (!result) {
      return sendResponse(res, 404, {
        success: false,
        message: "Food not found",
      });
    }
    return sendResponse(res, 200, {
      success: true,
      message: "Foods retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//  ---------------------------------------------
//  ------------------ Delete Food --------------  ongoing
//  ---------------------------------------------

export const deleteFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    // const food = await Food.findByIdAndDelete(id);
    const result = await FoodService.deleteFood(id);
    if (!result) {
      return sendResponse(res, 404, {
        success: false,
        message: "Food not found",
      });
    }
    return sendResponse(res, 200, {
      success: true,
      message: "Foods deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//  ---------------------------------------------
//  ------------------ Update Food --------------  pending
//  ---------------------------------------------

export const updateFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, price, category_id, description } = req.body;
  try {
    const image_url = req.file ? req.file.path : undefined;
    const imageFileName = req.file ? req.file.filename : undefined;
    const updateData = {
      name,
      price,
      category_id,
      description,
      image_url,
      
    };
    const food = await Foods.findByIdAndUpdate(id, updateData, { new: true });
    return sendResponse(res, 200, {
      success: true,
      message: "Food updated successfully",
      data: food,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//  ---------------------------------------------
//  ------------------ GEt Food By Category --------------  pending
//  ---------------------------------------------

export const getFoodByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const foods = await Foods.find({ category_id: id });
    if (!foods) {
      return sendResponse(res, 404, {
        success: false,
        message: "Foods not found",
      });
    }
    return sendResponse(res, 200, {
      success: true,
      message: "Foods retrieved successfully",
      data: foods,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const FoodController = {
  createFood,
  getAllFood,
  getSingleFood,
  deleteFood,
  updateFood,
  getFoodByCategory,
};
