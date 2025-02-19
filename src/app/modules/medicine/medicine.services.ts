import mongoose from "mongoose";
import { MedicationI, UpdateMedicationI } from "./medicine.interfaces";
import { MedicationModel, MedicineTrackingModel } from "./medicine.model";

const newMedicine = async (data: MedicationI) => {
  const medicine = await MedicationModel.create(data);
  return medicine;
};

const getMedicines = async (userId: mongoose.Types.ObjectId) => {
  const medicines = await MedicationModel.find({ userId });
  return medicines;
};
const todayMedicines = async (userId: mongoose.Types.ObjectId) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const medicines = await MedicationModel.find({
    userId,
    "duration.start": { $lte: today },
    "duration.end": { $gte: today },
  });

  // console.log("medicines (today):", medicines);
  return medicines;
};

const getTodayMedicineTracking = async (userId: mongoose.Types.ObjectId) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const medicineTracking = await MedicineTrackingModel.find({
    userId,
    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  console.log("today tracking medicine", medicineTracking);

  return medicineTracking;
};

const markAsTaken = async (
  userId: mongoose.Types.ObjectId,
  medicineId: mongoose.Types.ObjectId,
  slotName: string,
  hasTaken: boolean
) => {
  const today = new Date();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const medicineTracking = await MedicineTrackingModel.findOneAndUpdate(
    {
      userId,
      medicineId,
      date: { $gte: startOfDay, $lte: endOfDay },
    },
    {
      $set: { [`slots.${slotName}`]: hasTaken },
    },
    { upsert: true, new: true } // ✅ Creates entry if it doesn't exist
  );

  return medicineTracking;
};

const getAlreadyUpdatedOrNot = async (
  userId: mongoose.Types.ObjectId,
  medicineId: mongoose.Types.ObjectId,
  slot: string
) => {
  
};

const deleteMedicine = async (id: mongoose.Types.ObjectId) => {
  const deleteMedicine = await MedicationModel.findByIdAndDelete({ _id: id });
  return deleteMedicine;
};

const updateMedication = async (
  id: mongoose.Types.ObjectId,
  data: UpdateMedicationI
) => {
  const updatedMedicine = await MedicationModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedMedicine;
};

export const MedicineServices = {
  newMedicine,
  getMedicines,
  todayMedicines,
  deleteMedicine,
  updateMedication,
  getTodayMedicineTracking,
  markAsTaken,
};
