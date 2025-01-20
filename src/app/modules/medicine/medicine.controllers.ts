import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { userService } from "../user/user.services";
import { MedicineServices } from "./medicine.services";

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
export const MedicationControllers = {
  addMedicine,
};
