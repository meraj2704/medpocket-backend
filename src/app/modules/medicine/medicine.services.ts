import mongoose from "mongoose";
import { MedicationI } from "./medicine.interfaces";
import { MedicationModel } from "./medicine.model";

const newMedicine = async (data: MedicationI) => {
  const medicine = await MedicationModel.create(data);
  return medicine;
};

const getMedicines = async (userId: mongoose.Types.ObjectId) => {
  const medicines = await MedicationModel.find({ userId });
  return medicines;
};
export const MedicineServices = {
  newMedicine,
  getMedicines,
};
