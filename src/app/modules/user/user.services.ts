import { User } from "../auth.ts/auth.models";
import { UserInfoI } from "./user.interface";

const profileSetup = async (
  user_id: string,
  data: UserInfoI,
  image_url?: string
) => {
  const { name, phone_number, blood_group, date_of_birth, gender } = data;
  const user = await User.findByIdAndUpdate(
    user_id,
    {
      name,
      phone_number,
      blood_group,
      date_of_birth,
      gender,
      image_url,
    },
    { new: true }
  );
  return user;
};

const editProfile = async (user_id: string, data: UserInfoI) => {
  console.log("edit data", data);
  const user = await User.findByIdAndUpdate(user_id, data, { new: true });
  if (!user) {
    return null;
  }
  return user;
};

export const userService = {
  profileSetup,
  editProfile,
};
