import { Types } from "mongoose";
import { IFindFood } from "../modules/foods/food.interface";
import Foods from "../modules/foods/foods.models";
import Category from "../modules/category/category.model";
// ----------------------------------------
// -------------- Find Food by name ------- done
// ----------------------------------------
export const findFood = async (name: IFindFood) => {
  const food = await Foods.findOne({ name });
  console.log(name, food);
  return food;
};

// ----------------------------------------
// -------------- Find Food by id ---------    done
// ----------------------------------------

export const findFoodById = async (foodId: any) => {
  console.log("food Id ", foodId);
  if (!Types.ObjectId.isValid(foodId)) {
    console.error("Invalid foodId: ", foodId);
    return null;
  }
  const food = await Foods.findById(foodId);
  return food;
};

// ----------------------------------------
// ------------ Find category by id -------    done
// ----------------------------------------

export const findCategory = async (categoryId: any) => {
  console.log("category Id ", categoryId);

  if (!Types.ObjectId.isValid(categoryId)) {
    console.error("Invalid categoryId: ", categoryId);
    return null;
  }
  const category = await Category.findById(categoryId);
  console.log("category ", category);
  return category;
};

// ----------------------------------------
// ---------- Find category by name -------    done
// ----------------------------------------

export const findCategoryByName = async (name: string) => {
  console.log(name);
  const category = await Category.findOne({ name });
  return category;
};
