import { Request, Response } from "express";
import { findUserById } from "../../utils/findUser";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { User } from "../auth.ts/auth.models";
import { userService } from "./user.services";

const userProfileSetup = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  console.log("user id", user_id);
  try {
    const image_url = req.file ? req.file.path : undefined;
    const user = await findUserById(user_id);
    if (!user) {
      return sendErrorResponse(res, "User not found", 400);
    }
    const updated_user_info = await userService.profileSetup(
      user_id,
      req.body,
      image_url
    );
    const showData = {
      name: updated_user_info?.name,
      phone_number: updated_user_info?.phone_number,
      blood_group: updated_user_info?.blood_group,
      date_of_birth: updated_user_info?.date_of_birth,
      gender: updated_user_info?.gender,
    };
    return sendSuccessResponse(
      res,
      showData,
      "User profile updated successfully",
      200
    );
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, "Failed to update user profile", 500);
  }
};

const useProfileEdit = async (request: Request, response: Response) => {
  const { user_id } = request.params;
  const { email,...updatedData } = request.body;
  try {
    console.log("updated data: ", updatedData);
    const user = await findUserById(user_id);
    if (!user) {
      return sendErrorResponse(response, "User not found", 404);
    }
    if (request.file) {
      updatedData.image_url = request.file.path;
    }
    const updatedUser = await userService.editProfile(user_id, updatedData);

    return sendSuccessResponse(response, updatedUser, "success", 200);
  } catch (err) {
    console.error(err);
    console.log(err);
    return response.status(500).send("Failed to update user profile");
  }
};

const getProfile = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  try {
    const user = await findUserById(user_id);
    if (!user) {
      return sendErrorResponse(res, "User not found", 404);
    }
    const showData = {
      name: user.name,
      phone_number: user.phone_number,
      email: user.email,
      blood_group: user.blood_group,
      date_of_birth: user.date_of_birth,
      gender: user.gender,
    };
    return sendSuccessResponse(
      res,
      showData,
      "User profile retrieved successfully",
      200
    );
  } catch (error) {
    console.error(error);
    console.log(error);
    return sendErrorResponse(res, "Failed to retrieve user profile", 500);
  }
};

export const UserControllers = {
  userProfileSetup,
  useProfileEdit,
  getProfile,
};
