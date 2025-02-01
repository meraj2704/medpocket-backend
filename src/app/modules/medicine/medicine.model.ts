import mongoose, { Schema } from "mongoose";
import { DosageI, IMedicineTracking, MedicationI } from "./medicine.interfaces";

const DosageSchema = new Schema<DosageI>({
  morning: {
    take: { type: Boolean, default: false },
    afterMeal: { type: Boolean, default: false },
  },
  afternoon: {
    take: { type: Boolean, default: false },
    afterMeal: { type: Boolean, default: false },
  },
  evening: {
    take: { type: Boolean, default: false },
    afterMeal: { type: Boolean, default: false },
  },
});

const MedicineSchema = new Schema<MedicationI>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    medicineName: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    dosage: DosageSchema,
    duration: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const MedicationModel = mongoose.model<MedicationI>(
  "MedicationModel",
  MedicineSchema
);

const MedicineTrackingSchema = new Schema<IMedicineTracking>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  medicineId: {
    type: Schema.Types.ObjectId,
    ref: "MedicationModel",
    required: true,
  },
  date: { type: Date, required: true },
  slots: {
    morning: { hasTaken: { type: Boolean, default: false } },
    afterNoon: { hasTaken: { type: Boolean, default: false } },
    evening: { hasTaken: { type: Boolean, default: false } },
  },
});

export const MedicineTrackingModel = mongoose.model<IMedicineTracking>(
  "MedicineTrackingModel",
  MedicineTrackingSchema
);
