import { SignupI } from "./auth.interface";
import { User } from "./auth.models";
import { AuthUtils } from "./auth.utils";

const signup = async (data: SignupI) => {
  const { email, password, name } = data;

  // Example: Check if user already exists (this part would depend on your database structure)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await AuthUtils.hashPassword(password);

  // Save the new user to the database (password should be hashed, etc.)
  const newUser = await User.create({ email, password: hashedPassword, name });

  return newUser;
};

export const AuthServices = {
  signup,
};
