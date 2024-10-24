import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { sendResponse } from "../../utils/response";
import {
  findCategory,
  findFood,
  findFoodById,
} from "../../utils/findFunctions";
const foodSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  price: yup.number().required("price is required"),
  category_id: yup.string().required("Category Id is required"),
  quantity: yup.number().required("quantity is required"),
  unit: yup.string().required("unit is required"),
  description: yup.string(),
  image_url: yup.string(),
  image_path_name: yup.string(),
});

const foodCreateValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("validation on : ", req.body);
    await foodSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error: any) {
    const errorMessages = error.inner.map(
      (err: yup.ValidationError) => err.message
    );
    return sendResponse(res, 400, {
      success: false,
      message: errorMessages,
    });
  }
};

const foodUpdateValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, price, category_id, description } = req.body;
  try {
    const foodById = await findFoodById(id);
    if (!foodById) {
      return sendResponse(res, 404, {
        success: false,
        message: "Food not found",
      });
    }
    if (!name && !price && !category_id && !description) {
      return sendResponse(res, 400, {
        success: false,
        message: "At least one field is required",
      });
    }
    const existName = await findFood(name);
    if (existName) {
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
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getFooByIdValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const category = await findCategory(id);
    if (!category) {
      return sendResponse(res, 404, {
        success: false,
        message: "Category not found",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const FoodMiddleware = {
  foodCreateValidation,
  foodUpdateValidation,
  getFooByIdValidation,
};
