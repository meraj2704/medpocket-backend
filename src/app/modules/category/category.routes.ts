import { Router } from "express";
import upload from "../../config/multer.config";
import { CategoryController } from "./category.controller";
import { CategoryMiddleware } from "./category.middleware";

const router = Router();

router.post(
  "/category",
  upload.single("file"),
  CategoryMiddleware.createCategoryValidation,
  CategoryController.createCategory
);
router.get("/category", CategoryController.getCategories);
router.get("/category/:id", CategoryController.getSingleCategory);
router.delete("/category/:id", CategoryController.deleteCategory);
router.put(
  "/category/:id",
  upload.single("file"),
  CategoryMiddleware.updateCategoryValidation,
  CategoryController.updateCategory
);

export const categoryRouter = router;
