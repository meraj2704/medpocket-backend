import mongoose from "mongoose";

export interface TimingI {
  take: boolean;
  afterMeal: boolean;
}

export interface DosageI {
  morning: TimingI;
  afternoon: TimingI;
  evening: TimingI;
}

export interface MedicationI {
  userId: mongoose.Types.ObjectId;
  medicineName: string;
  type: string;
  description: string;
  dosage: DosageI;
  duration: {
    start: Date;
    end: Date;
  };
}
export interface UpdateMedicationI {
  medicineName?: string;
  type?: string;
  description?: string;
  dosage?: DosageI;
  duration?: {
    start: Date;
    end: Date;
  };
}

interface ISlotStatus {
  hasTaken: boolean;
}

export interface IMedicineTracking {
  userID: mongoose.Types.ObjectId;
  medicineID: mongoose.Types.ObjectId;
  date: Date;
  slots: {
    morning: ISlotStatus;
    afterNoon: ISlotStatus;
    evening: ISlotStatus;
  };
}
