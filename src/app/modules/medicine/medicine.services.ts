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
  console.log("today (midnight UTC):", today);

  const medicines = await MedicationModel.find({
    userId,
    "duration.start": { $lte: today },
    "duration.end": { $gte: today },
  });

  console.log("medicines (today):", medicines);
  return medicines;
};

const getTodayMedicineTracking = async(userId:mongoose.Types.ObjectId)=>{
  const today = new Date();
  const medicineTracking = await MedicineTrackingModel.find({userId, date:today});
  return medicineTracking;
}

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
  getTodayMedicineTracking
};
