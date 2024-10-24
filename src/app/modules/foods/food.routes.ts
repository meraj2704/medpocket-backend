import { Router } from "express";
import { FoodController } from "./food.controller";
import upload from "../../config/multer.config";
import { FoodMiddleware } from "./food.middleware";

const router = Router();

router.post(
  "/food",
  upload.single("file"),
  FoodMiddleware.foodCreateValidation,
  FoodController.createFood
);
router.get("/food", FoodController.getAllFood);
router.get("/food/:id", FoodController.getSingleFood);
router.get(
  "/food/category/:id",
  FoodMiddleware.getFooByIdValidation,
  FoodController.getFoodByCategory
);
router.delete("/food/:id", FoodController.deleteFood);
router.put(
  "/food/:id",
  upload.single("images"),
  FoodMiddleware.foodUpdateValidation,
  FoodController.updateFood
);

export const foodRouter = router;
