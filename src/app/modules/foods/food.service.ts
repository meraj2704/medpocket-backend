import { Types } from "mongoose";
import { IFoods } from "./food.interface";
import Foods from "./foods.models";

//  ---------------------------------------------
//  ------------------ Create Food -------------- done
//  ---------------------------------------------

const createFood = async (foodData: any) => {
  try {
    console.log("called")
    const newFood: IFoods = new Foods(foodData);
    await newFood.save();
    console.log(newFood);
    return newFood;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating food");
  }
};


//  ---------------------------------------------
//  ------------------ Get Food --------------    done
//  ---------------------------------------------
const getFoods = async (id?: string) => {
  try {
    let foods;
    if (id) {
      foods = await Foods.findById(id);
    } else {
      foods = await Foods.find();
    }
    return foods;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting foods");
  }
};

//  ---------------------------------------------
//  ------------------ Delete Food --------------  ongoing
//  ---------------------------------------------

const deleteFood = async (id: string) => {
  try {
    const deleteFood = await Foods.findByIdAndDelete(id);
    if (!deleteFood) {
      throw new Error("Food not found");
    }
    return deleteFood;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting food");
  }
};


export const FoodService = {
  createFood,
  getFoods,
  deleteFood
};
