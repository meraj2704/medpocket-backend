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

export interface TodayMedicineDosage extends ISlotStatus {
  _id: mongoose.Types.ObjectId;
  medicineName: string;
  type: string;
  afterMeal: boolean;
}

export interface IMedicineTracking {
  userId: mongoose.Types.ObjectId;
  medicineId: mongoose.Types.ObjectId;
  date: Date;
  slot: string;
  hasTaken: boolean;
}
