import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { userService } from "../user/user.services";
import { MedicineServices } from "./medicine.services";
import mongoose from "mongoose";

const addMedicine = async (req: Request, res: Response) => {
  const { userId, medicineName, type, description, dosage, duration } =
    req.body;
  try {
    const newMedicineData = {
      userId,
      medicineName,
      type,
      description,
      dosage,
      duration,
    };

    const existUser = await userService.existUserWithId(userId);
    if (!existUser) {
      return sendErrorResponse(res, "User not found", [], 404);
    }

    const newMedicine = await MedicineServices.newMedicine(newMedicineData);
    if (!newMedicine) {
      return sendErrorResponse(res, "Failed to add medicine", [], 500);
    }
    return sendSuccessResponse(
      res,
      newMedicine,
      "Successfully added new medicine",
      201
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Failed to add medicine", [], 500);
  }
};

const getAllMedicine = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = new mongoose.Types.ObjectId(id);
  try {
    const userExist = await userService.existUserWithId(userId);
    if (!userExist) {
      return sendErrorResponse(res, "User not found", [], 404);
    }
    const medicines = await MedicineServices.getMedicines(userId);
    if (!medicines) {
      return sendErrorResponse(
        res,
        "No medicines found for this user",
        [],
        404
      );
    }
    return sendSuccessResponse(
      res,
      medicines,
      "Successfully fetched medicines",
      200
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Failed to fetch medicines", [], 500);
  }
};

const getTodayMedicines = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = new mongoose.Types.ObjectId(id);
  try {
    const userExist = await userService.existUserWithId(userId);
    if (!userExist) {
      return sendErrorResponse(res, "User not found", [], 404);
    }
    const todayMedicines = await MedicineServices.todayMedicines(userId);
    return sendSuccessResponse(
      res,
      todayMedicines,
      "Successfully fetched today medicines",
      200
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Failed to fetch today medicines", [], 500);
  }
};
export const MedicationControllers = {
  addMedicine,
  getAllMedicine,
  getTodayMedicines,
};
