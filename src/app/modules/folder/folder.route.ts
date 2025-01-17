import express from "express";
import upload from "../../config/multer.config";
import validate from "../../middlewares/validate";
import { FolderSchema } from "./folder.scema";
import { FolderControllers } from "./folder.controller";
const router = express.Router();

router.post(
  "/create-folder",
  upload.none(),
  validate(FolderSchema.folderSchema),
  FolderControllers.createFolder
);
router.get("/all-folders/:id", FolderControllers.getFolderByUser);
router.put("/update-folder/:id", FolderControllers.updateFolder);
router.delete("/delete-folder/:id", FolderControllers.deleteFolder);

export const FolderRouter = router;
12;
