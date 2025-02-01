import express from "express";
import upload from "../../config/multer.config";
import validate from "../../middlewares/validate";
import { MedicineSchema } from "./medicine.schema";
import { MedicationControllers } from "./medicine.controllers";
const router = express.Router();

router.post(
  "/add-new-medicine",
  upload.none(),
  validate(MedicineSchema.medicineSchema),
  MedicationControllers.addMedicine
);

router.get("/get-all-medicines/:id", MedicationControllers.getAllMedicine);

router.get("/get-today-medicines/:id", MedicationControllers.getTodayMedicines);

router.delete("/delete-medicine/:id", MedicationControllers.deleteMedicine);

router.put("/update-medicine/:id", MedicationControllers.updateMedicine);

router.put(
  "/mark-as-taken",
  upload.none(),
  validate(MedicineSchema.markAsUpdateSchema),
  MedicationControllers.markAsTaken
);

export const MedicineRouter = router;
