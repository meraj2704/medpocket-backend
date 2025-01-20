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

export const MedicineRouter = router;
