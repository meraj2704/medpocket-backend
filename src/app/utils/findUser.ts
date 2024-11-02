import { User } from "../modules/auth.ts/auth.models";

export const findUserById = async (user_id: string) => {
  const user = await User.findOne({_id: user_id});
  return user;
};
