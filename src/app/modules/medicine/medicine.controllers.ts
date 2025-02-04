import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { userService } from "../user/user.services";
import { MedicineServices } from "./medicine.services";
import mongoose, { mongo } from "mongoose";
import { TodayMedicineDosage } from "./medicine.interfaces";
const addMedicine = async (req: Request, res: Response) => {
  const medicines = req.body;
  console.log("medicines", medicines);
  if (!Array.isArray(medicines)) {
    return sendErrorResponse(
      res,
      "Invalid data format. Expected an array.",
      [],
      400
    );
  }

  try {
    const addedMedicines = [];

    for (const medicineData of medicines) {
      const { userId, medicineName, type, description, dosage, duration } =
        medicineData;

      // Validate required fields
      if (!userId || !medicineName) {
        return sendErrorResponse(
          res,
          "Missing required fields: userId and medicineName are mandatory",
          [],
          400
        );
      }

      const existUser = await userService.existUserWithId(userId);
      if (!existUser) {
        return sendErrorResponse(
          res,
          `User with ID ${userId} not found`,
          [],
          404
        );
      }

      const newMedicineData = {
        userId,
        medicineName,
        type,
        description,
        dosage,
        duration,
      };

      const newMedicine = await MedicineServices.newMedicine(newMedicineData);

      if (newMedicine) {
        addedMedicines.push(newMedicine);
      }
    }

    if (addedMedicines.length === 0) {
      return sendErrorResponse(res, "No medicines were added", [], 500);
    }

    return sendSuccessResponse(
      res,
      addedMedicines,
      "Successfully added new medicines",
      201
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Failed to add medicines", [], 500);
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
    const trackingTodayMedicineData =
      await MedicineServices.getTodayMedicineTracking(userId);

    console.log("trackingTodayMedicineData", trackingTodayMedicineData);
    const medicinesDosage: {
      morning: TodayMedicineDosage[];
      afternoon: TodayMedicineDosage[];
      evening: TodayMedicineDosage[];
    } = {
      morning: [],
      afternoon: [],
      evening: [],
    };

    todayMedicines.forEach((item) => {
      console.log("item: ", item);

      const matchingTracking = trackingTodayMedicineData.find((tracking) =>
        item._id.equals(tracking.medicineId)
      );

      console.log("matching tracking", matchingTracking);

      if (item.dosage.morning.take) {
        const morningInfo = {
          _id: item._id,
          medicineName: item.medicineName,
          type: item.type,
          afterMeal: item.dosage.morning.afterMeal,
          hasTaken: matchingTracking?.slots.morning || false,
        };
        medicinesDosage.morning.push(morningInfo);
      }

      if (item.dosage.afternoon.take) {
        const afternoonInfo = {
          _id: item._id,
          medicineName: item.medicineName,
          type: item.type,
          afterMeal: item.dosage.afternoon.afterMeal,
          hasTaken: matchingTracking?.slots.afternoon || false,
        };
        medicinesDosage.afternoon.push(afternoonInfo);
      }

      if (item.dosage.evening.take) {
        const eveningInfo = {
          _id: item._id,
          medicineName: item.medicineName,
          type: item.type,
          afterMeal: item.dosage.evening.afterMeal,
          hasTaken: matchingTracking?.slots.evening || false,
        };
        medicinesDosage.evening.push(eveningInfo);
      }
    });

    return sendSuccessResponse(
      res,
      medicinesDosage,
      "Successfully fetched today medicines",
      200
    );
  } catch (err) {
    console.error(err);
    return sendErrorResponse(res, "Failed to fetch today medicines", [], 500);
  }
};

const markAsTaken = async (req: Request, res: Response) => {
  const { userId, medicineId, slotName, hasTaken } = req.body;
  const newUserId = new mongoose.Types.ObjectId(userId);
  const medicineIdObj = new mongoose.Types.ObjectId(medicineId);
  try {
    const updatedMedicineSlot = await MedicineServices.markAsTaken(
      newUserId,
      medicineIdObj,
      slotName,
      hasTaken
    );
    if (!updatedMedicineSlot) {
      return sendErrorResponse(res, "Medicine slot not found", [], 404);
    }
    return sendSuccessResponse(
      res,
      updatedMedicineSlot,
      "Medicine slot marked as taken",
      200
    ); return sendSuccessResponse(
      res,
      updatedMedicineSlot,
      "Medicine slot marked as taken",
      200
    );
  } catch (err) {
    console.error("Error updating medicine: ", err);
    return sendErrorResponse(res, "Failed to update medicine", [], 500);
  }
};

const deleteMedicine = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newId = new mongoose.Types.ObjectId(id);
  try {
    const medicine = await MedicineServices.deleteMedicine(newId);
    if (!medicine) {
      return sendErrorResponse(res, "Medicine not found", [], 404);
    }
    return sendSuccessResponse(res, [], "Successfully deleted medicine", 200);
  } catch (err) {
    console.error("Error deleting medicine: ", err);
    return sendErrorResponse(res, "Failed to delete medicine", [], 500);
  }
};

const updateMedicine = async (req: Request, res: Response) => {
  const { id } = req.params;
  const newId = new mongoose.Types.ObjectId(id);
  const { medicineName, type, description, dosage, duration } = req.body;
  try {
    const medicine = await MedicineServices.updateMedication(newId, {
      medicineName,
      type,
      description,
      dosage,
      duration,
    });
    if (!medicine) {
      return sendErrorResponse(res, "Medicine not found", [], 404);
    }
    return sendSuccessResponse(
      res,
      medicine,
      "Successfully updated medicine",
      200
    );
  } catch (err) {
    console.error("Error updating medicine: ", err);
    return sendErrorResponse(res, "Failed to update medicine", [], 500);
  }
};

export const MedicationControllers = {
  addMedicine,
  getAllMedicine,
  getTodayMedicines,
  deleteMedicine,
  updateMedicine,
  markAsTaken,
};
