import { SignupI } from "./auth.interface";
import { User } from "./auth.models";
import { AuthUtils } from "./auth.utils";

const signup = async (data: SignupI) => {
  const { email, password, name } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await AuthUtils.hashPassword(password);
  const newUser = await User.create({ email, password: hashedPassword, name });
  return newUser;
};

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  console.log("login service", user);
  if (!user) return null;
  const isPasswordValid = await AuthUtils.comparePassword(
    password,
    user.password
  );
  if (!isPasswordValid) return null;
  return user;
};

const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

const updatePassword = async (email: string, newPassword: string) => {
  const hashedPassword = await AuthUtils.hashPassword(newPassword);
  return User.findOneAndUpdate(
    { email },
    { password: hashedPassword },
    { new: true }
  );
};

export const AuthServices = {
  signup,
  login,
  findUserByEmail,
  updatePassword,
};
