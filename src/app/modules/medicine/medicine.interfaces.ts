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
