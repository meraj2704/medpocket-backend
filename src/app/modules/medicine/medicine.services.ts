import { MedicationI } from "./medicine.interfaces";
import { MedicationModel } from "./medicine.model";

const newMedicine = async (data: MedicationI) => {
  const medicine = await MedicationModel.create(data);
  return medicine;
};
export const MedicineServices = {
  newMedicine,
};
