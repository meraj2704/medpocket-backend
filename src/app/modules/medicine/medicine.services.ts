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
const todayMedicines = async (userId: mongoose.Types.ObjectId) => {
  const today = new Date(); // Current date and time
  today.setUTCHours(0, 0, 0, 0); // Set to midnight UTC
  console.log("today (midnight UTC):", today);

  // Fetch medicines where the start date is on or before today and the end date is on or after today
  const medicines = await MedicationModel.find({
    userId,
    "duration.start": { $lte: today }, // Medicines starting on or before today
    "duration.end": { $gte: today }, // Medicines ending on or after today
  });

  console.log("medicines (today):", medicines);
  return medicines;
};

export const MedicineServices = {
  newMedicine,
  getMedicines,
  todayMedicines,
};
