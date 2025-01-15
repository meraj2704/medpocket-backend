import { Request, Response } from "express";
import { FolderServices } from "./folder.services";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { userService } from "../user/user.services";
import { IFolder } from "./folder.interface";
import mongoose from "mongoose";

const createFolder = async (req: Request, res: Response) => {
  const { name, user_id } = req.body;
  try {
    const userExist = await userService.existUserWithId(user_id);
    if (!userExist) {
      return sendErrorResponse(res, "User not found", [], 404);
    }
    const existWithName = await FolderServices.existFolderWithName(name);
    if (existWithName) {
      return sendErrorResponse(
        res,
        "Folder with the same name already exists",
        [],
        400
      );
    }
    const folderData = {
      user_id,
      name,
    };
    const folder = await FolderServices.createFolder(folderData);
    if (folder) {
      return sendSuccessResponse(
        res,
        folder,
        "New Folder Created successfully",
        201
      );
    } else {
      return sendErrorResponse(res, "Failed to create new folder", [], 500);
    }
  } catch (err) {
    console.error("Error creating folder: ", err);
    return sendErrorResponse(res, "Failed to create folder", [], 500);
  }
};

const getFolderByUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = new mongoose.Types.ObjectId(id);
  try {
    const userExist = await userService.existUserWithId(userId);
    if (!userExist) {
      return sendErrorResponse(res, "User not found", [], 404);
    }
    const folders = await FolderServices.foldersByUserId(userId);
    return sendSuccessResponse(
      res,
      folders || [],
      "Successfully fetched folders",
      200
    );
  } catch (err) {
    console.log("error", err);
    sendErrorResponse(res, "Failed to get folder", [], 500);
  }
};

const updateFolder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {name} = req.body;
  try {
    const folder = await FolderServices.folderUpdate(id, { name });
    if (!folder) {
      return sendErrorResponse(res, "Folder not found", [], 404);
    }
    return sendSuccessResponse(res, folder, "Folder updated successfully", 200);
  } catch (err) {
    console.error("Error updating folder: ", err);
    return sendErrorResponse(res, "Failed to update folder", [], 500);
  }
};

export const FolderControllers = {
  createFolder,
  getFolderByUser,
  updateFolder,
};
